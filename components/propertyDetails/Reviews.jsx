"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";

function StarRating({ rating, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          style={{ background: "none", border: "none", cursor: onChange ? "pointer" : "default", padding: 0 }}
        >
          <i
            className="icon-star"
            style={{ color: star <= (hovered || rating) ? "#f0822d" : "#d1d5db", fontSize: 14 }}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewItem({ review }) {
  const name = review.userId?.name || "Anonymous";
  const initial = name[0]?.toUpperCase() || "?";
  const date = new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <li>
      <div className="comment-item">
        <div className="image-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#f0822d,#e56c1a)", flexShrink: 0 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{initial}</span>
        </div>
        <div className="content">
          <div className="user">
            <div className="author">
              <h6 className="name">{name}</h6>
              <div className="time">{date}</div>
            </div>
            <div className="ratings">
              <StarRating rating={review.rating} />
            </div>
          </div>
          <div className="comment">
            {review.title && <p style={{ fontWeight: 600, marginBottom: 4 }}>{review.title}</p>}
            <p>{review.comment}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Reviews({ propertyId }) {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");
  const [form, setForm] = useState({ rating: 0, title: "", comment: "" });

  const isLoggedIn = () => { try { return !!localStorage.getItem("authToken"); } catch { return false; } };

  useEffect(() => {
    if (!propertyId) return;
    apiClient.get(`/reviews/property/${propertyId}`)
      .then((res) => {
        setReviews(Array.isArray(res.data?.reviews) ? res.data.reviews : []);
        setAvgRating(res.data?.avgRating || 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [propertyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.rating) { setSubmitMsg("Please select a rating."); return; }
    if (!form.comment.trim()) { setSubmitMsg("Please write a review."); return; }
    setSubmitting(true);
    setSubmitMsg("");
    try {
      const res = await apiClient.post("/reviews", {
        propertyId,
        rating: form.rating,
        title: form.title,
        comment: form.comment,
      });
      setReviews((prev) => [res.data.review, ...prev]);
      setForm({ rating: 0, title: "", comment: "" });
      setSubmitMsg("Review posted successfully!");
    } catch (err) {
      setSubmitMsg(err?.response?.data?.message || "Failed to post review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="wrap-comment">
        <h4 className="title">
          Guest Reviews
          {avgRating > 0 && (
            <span style={{ fontSize: 14, fontWeight: 600, color: "#f0822d", marginLeft: 12 }}>
              ★ {Number(avgRating).toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
            </span>
          )}
        </h4>

        {loading ? (
          <p style={{ color: "#888", fontSize: 14 }}>Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <p style={{ color: "#aaa", fontSize: 14, padding: "12px 0" }}>No reviews yet. Be the first to review!</p>
        ) : (
          <ul className="comment-list">
            {reviews.map((r) => (
              <ReviewItem key={r._id} review={r} />
            ))}
          </ul>
        )}
      </div>

      <div className="box-send">
        <div className="heading-box">
          <h4 className="title fw-7">Add Review</h4>
          <p>Your email address will not be published</p>
        </div>

        {!isLoggedIn() ? (
          <div style={{ padding: "16px 20px", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, color: "#92400e", fontSize: 14 }}>
            Please <a href="/login" style={{ color: "#f0822d", fontWeight: 700 }}>log in</a> to post a review.
          </div>
        ) : (
          <form className="form-add-review" onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Your Rating *</label>
              <StarRating rating={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
            </div>

            <fieldset className="name" style={{ marginBottom: 16 }}>
              <label className="text-1 fw-6" htmlFor="rev-title">Title (optional)</label>
              <input
                type="text"
                id="rev-title"
                className="tf-input style-2"
                placeholder="Summary of your experience"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </fieldset>

            <fieldset className="message">
              <label className="text-1 fw-6" htmlFor="rev-comment">Review *</label>
              <textarea
                id="rev-comment"
                className="tf-input"
                rows={4}
                placeholder="Share your experience with this property…"
                value={form.comment}
                onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                required
              />
            </fieldset>

            {submitMsg && (
              <div style={{
                padding: "10px 16px", borderRadius: 8, marginBottom: 12, fontSize: 13,
                background: submitMsg.includes("success") ? "#d1fae5" : "#fee2e2",
                color: submitMsg.includes("success") ? "#065f46" : "#991b1b",
              }}>
                {submitMsg}
              </div>
            )}

            <button className="tf-btn bg-color-primary pd-24 fw-7" type="submit" disabled={submitting}>
              {submitting ? "Posting…" : "Post Review"} <i className="icon-arrow-right-2 fw-4" />
            </button>
          </form>
        )}
      </div>
    </>
  );
}
