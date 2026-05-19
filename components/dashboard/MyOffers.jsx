"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/utils/apiClient";

function timeAgo(date) {
  const secs = Math.floor((Date.now() - new Date(date)) / 1000);
  if (secs < 60) return "just now";
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}

const STATUS_STYLES = {
  pending:   { background: "#f0822d" },
  accepted:  { background: "#27ae60" },
  rejected:  { background: "#e74c3c" },
  countered: { background: "#6c63ff" },
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || { background: "#888" };
  return (
    <span style={{
      padding: "3px 10px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 700,
      color: "#fff",
      textTransform: "capitalize",
      ...style,
    }}>
      {status}
    </span>
  );
}

export default function MyOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    apiClient.get("/offers/my-offers")
      .then((res) => setOffers(res.data.offers || res.data || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleCounterResponse = async (offerId, status) => {
    setActionLoading(offerId + status);
    try {
      await apiClient.put(`/offers/${offerId}/status`, { status });
      setOffers((prev) =>
        prev.map((o) => (o._id === offerId ? { ...o, status } : o))
      );
    } catch {
      alert("Failed to update offer. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          <h3 className="title">My Offers</h3>

          {loading && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading…</div>
          )}

          {!loading && error && (
            <div style={{ padding: 40, textAlign: "center", color: "#e74c3c" }}>
              Failed to load. Try refreshing.
            </div>
          )}

          {!loading && !error && offers.length === 0 && (
            <div style={{ padding: 60, textAlign: "center", color: "#888" }}>
              <p style={{ marginBottom: 12 }}>You haven't submitted any offers yet.</p>
              <Link href="/listings" style={{ color: "#f0822d", fontWeight: 600 }}>
                Browse listings →
              </Link>
            </div>
          )}

          {!loading && !error && offers.length > 0 && (
            <div className="wrap-table">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Offer Price</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map((offer) => {
                      const property = offer.propertyId || offer.property || {};
                      const propertyName = property.propertyName || property.title || "Untitled Property";
                      const propertyId = property._id || offer.propertyId;
                      const offerPrice = offer.offerPrice != null
                        ? `$${Number(offer.offerPrice).toLocaleString()}`
                        : "—";

                      return (
                        <React.Fragment key={offer._id}>
                          <tr className="file-delete">
                            <td>
                              <div className="listing-box">
                                <div className="content">
                                  <div className="title">
                                    {propertyId ? (
                                      <Link href={`/property-detail-v1/${propertyId}`} className="link">
                                        {propertyName}
                                      </Link>
                                    ) : (
                                      <span>{propertyName}</span>
                                    )}
                                  </div>
                                  {(property.city || property.country) && (
                                    <div style={{ fontSize: 12, color: "#888" }}>
                                      {[property.city, property.country].filter(Boolean).join(", ")}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>
                              <span style={{ fontWeight: 600, color: "#222" }}>{offerPrice}</span>
                            </td>
                            <td>
                              <StatusBadge status={offer.status} />
                            </td>
                            <td>
                              <span style={{ fontSize: 13, color: "#555" }}>
                                {timeAgo(offer.createdAt)}
                              </span>
                            </td>
                          </tr>

                          {offer.status === "countered" && (
                            <tr>
                              <td colSpan={4} style={{ padding: 0 }}>
                                <div style={{
                                  margin: "0 0 12px 0",
                                  padding: "14px 20px",
                                  background: "#eef4ff",
                                  border: "1px solid #6c63ff",
                                  borderRadius: 8,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  flexWrap: "wrap",
                                  gap: 12,
                                }}>
                                  <div>
                                    <span style={{ fontWeight: 700, color: "#6c63ff", marginRight: 8 }}>
                                      Counter offer:
                                    </span>
                                    {offer.counterPrice != null && (
                                      <span style={{ fontWeight: 600, marginRight: 8 }}>
                                        ${Number(offer.counterPrice).toLocaleString()}
                                      </span>
                                    )}
                                    {offer.counterMessage && (
                                      <span style={{ color: "#555", fontSize: 13 }}>
                                        — {offer.counterMessage}
                                      </span>
                                    )}
                                  </div>
                                  <div style={{ display: "flex", gap: 8 }}>
                                    <button
                                      disabled={!!actionLoading}
                                      onClick={() => handleCounterResponse(offer._id, "accepted")}
                                      style={{
                                        background: "#27ae60",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: 6,
                                        padding: "7px 18px",
                                        fontWeight: 700,
                                        fontSize: 13,
                                        cursor: actionLoading ? "not-allowed" : "pointer",
                                        opacity: actionLoading ? 0.7 : 1,
                                      }}
                                    >
                                      {actionLoading === offer._id + "accepted" ? "…" : "Accept Counter"}
                                    </button>
                                    <button
                                      disabled={!!actionLoading}
                                      onClick={() => handleCounterResponse(offer._id, "rejected")}
                                      style={{
                                        background: "#e74c3c",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: 6,
                                        padding: "7px 18px",
                                        fontWeight: 700,
                                        fontSize: 13,
                                        cursor: actionLoading ? "not-allowed" : "pointer",
                                        opacity: actionLoading ? 0.7 : 1,
                                      }}
                                    >
                                      {actionLoading === offer._id + "rejected" ? "…" : "Decline"}
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
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
