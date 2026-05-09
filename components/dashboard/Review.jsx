"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function Stars({ rating = 5 }) {
  const stars = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className="ratings">
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={i < stars ? "icon-star" : "icon-star-empty"} />
      ))}
    </div>
  );
}

function Initials({ name }) {
  const parts = (name || "?").trim().split(" ");
  const letters = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : (parts[0][0] || "?");
  return (
    <div style={{
      width: 51, height: 51, borderRadius: "50%",
      background: "#f96b25", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: 18, flexShrink: 0,
    }}>
      {letters.toUpperCase()}
    </div>
  );
}

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/reviews/my-properties")
      .then((res) => setReviews(res.data.reviews || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="main-content w-100">
      <div className="main-content-inner style-3">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 mess-box">
          <h3 className="title">Recent Reviews</h3>

          {loading && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading reviews…</div>
          )}

          {!loading && reviews.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
              No reviews yet on your properties.
            </div>
          )}

          {!loading && reviews.length > 0 && (
            <ul className="list-mess">
              {reviews.map((review) => {
                const name = review.userId?.name || "Anonymous";
                const propertyTitle = review.propertyId?.propertyName || review.propertyId?.title || "";
                return (
                  <li key={review._id} className="mess-item">
                    <div className="user-box">
                      <div className="avatar">
                        <Initials name={name} />
                      </div>
                      <div className="content justify-content-start">
                        <div className="name fw-6">{name}</div>
                        <span className="caption-2 text-variant-3">{formatDate(review.createdAt)}</span>
                        {propertyTitle && (
                          <span className="caption-2 text-variant-3" style={{ marginLeft: 8, color: "#f96b25" }}>
                            on {propertyTitle}
                          </span>
                        )}
                      </div>
                    </div>
                    {review.comment && <p>{review.comment}</p>}
                    <Stars rating={review.rating} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="footer-dashboard">
          <p>Copyright © {new Date().getFullYear()} Globperty</p>
          <ul className="list">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
      </div>
      <div className="overlay-dashboard" />
    </div>
  );
}
