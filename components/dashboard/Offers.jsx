"use client";
import React, { useEffect, useState } from "react";
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

function CounterForm({ offerId, onSubmit, onCancel, loading }) {
  const [counterPrice, setCounterPrice] = useState("");
  const [counterMessage, setCounterMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!counterPrice || isNaN(Number(counterPrice))) {
      alert("Please enter a valid counter price.");
      return;
    }
    onSubmit(offerId, Number(counterPrice), counterMessage);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: "#f9f9f9",
      border: "1px solid #e0e0e0",
      borderRadius: 8,
      padding: "16px 20px",
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      gap: 10,
    }}>
      <div style={{ fontWeight: 700, fontSize: 14, color: "#333", marginBottom: 4 }}>
        Make a Counter Offer
      </div>
      <input
        type="number"
        min={0}
        placeholder="Counter price ($)"
        value={counterPrice}
        onChange={(e) => setCounterPrice(e.target.value)}
        required
        style={{
          border: "1px solid #ddd",
          borderRadius: 6,
          padding: "8px 12px",
          fontSize: 14,
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
      <textarea
        placeholder="Optional message to the buyer…"
        value={counterMessage}
        onChange={(e) => setCounterMessage(e.target.value)}
        rows={3}
        style={{
          border: "1px solid #ddd",
          borderRadius: 6,
          padding: "8px 12px",
          fontSize: 13,
          resize: "vertical",
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#6c63ff",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 20px",
            fontWeight: 700,
            fontSize: 13,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Submitting…" : "Submit Counter"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          style={{
            background: "none",
            border: "1px solid #ccc",
            borderRadius: 6,
            padding: "8px 16px",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            color: "#555",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [role, setRole] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [counterOpenId, setCounterOpenId] = useState(null);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      setRole(u.role || "user");
    } catch {}

    apiClient.get("/offers/received")
      .then((res) => setOffers(res.data.offers || res.data || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (offerId, status) => {
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

  const handleCounter = async (offerId, counterPrice, counterMessage) => {
    setActionLoading(offerId + "countered");
    try {
      await apiClient.put(`/offers/${offerId}/status`, {
        status: "countered",
        counterPrice,
        counterMessage,
      });
      setOffers((prev) =>
        prev.map((o) =>
          o._id === offerId ? { ...o, status: "countered", counterPrice, counterMessage } : o
        )
      );
      setCounterOpenId(null);
    } catch {
      alert("Failed to send counter offer. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const isRestrictedRole = role === "buyer" || role === "user";

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          <h3 className="title">Received Offers</h3>

          {loading && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading…</div>
          )}

          {!loading && error && (
            <div style={{ padding: 40, textAlign: "center", color: "#e74c3c" }}>
              Failed to load. Try refreshing.
            </div>
          )}

          {!loading && !error && isRestrictedRole && (
            <div style={{
              margin: "20px 0",
              padding: "16px 20px",
              background: "#fff8f4",
              border: "1px solid #f0822d",
              borderRadius: 8,
              color: "#c0621a",
              fontWeight: 600,
              fontSize: 14,
            }}>
              This section is for sellers and brokers.
            </div>
          )}

          {!loading && !error && !isRestrictedRole && offers.length === 0 && (
            <div style={{ padding: 60, textAlign: "center", color: "#888" }}>
              <p style={{ margin: 0 }}>No offers received yet.</p>
            </div>
          )}

          {!loading && !error && !isRestrictedRole && offers.length > 0 && (
            <div className="wrap-table">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Buyer</th>
                      <th>Property</th>
                      <th>Offer Price</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map((offer) => {
                      const buyer = offer.buyerId || offer.buyer || {};
                      const buyerName = buyer.name || buyer.fullName || buyer.email || "Unknown Buyer";
                      const property = offer.propertyId || offer.property || {};
                      const propertyName = property.propertyName || property.title || "Untitled Property";
                      const offerPrice = offer.offerPrice != null
                        ? `$${Number(offer.offerPrice).toLocaleString()}`
                        : "—";
                      const isPending = offer.status === "pending";
                      const isCounterOpen = counterOpenId === offer._id;

                      return (
                        <React.Fragment key={offer._id}>
                          <tr className="file-delete">
                            <td>
                              <span style={{ fontWeight: 600, fontSize: 14, color: "#222" }}>
                                {buyerName}
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: 14, color: "#444" }}>{propertyName}</span>
                            </td>
                            <td>
                              <span style={{ fontWeight: 600, color: "#222" }}>{offerPrice}</span>
                            </td>
                            <td>
                              <span style={{ fontSize: 13, color: "#555" }}>
                                {timeAgo(offer.createdAt)}
                              </span>
                            </td>
                            <td>
                              <StatusBadge status={offer.status} />
                            </td>
                            <td>
                              {isPending ? (
                                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                  <button
                                    disabled={!!actionLoading}
                                    onClick={() => handleStatusChange(offer._id, "accepted")}
                                    style={{
                                      background: "#27ae60",
                                      color: "#fff",
                                      border: "none",
                                      borderRadius: 6,
                                      padding: "5px 14px",
                                      fontWeight: 700,
                                      fontSize: 12,
                                      cursor: actionLoading ? "not-allowed" : "pointer",
                                      opacity: actionLoading ? 0.7 : 1,
                                    }}
                                  >
                                    {actionLoading === offer._id + "accepted" ? "…" : "Accept"}
                                  </button>
                                  <button
                                    disabled={!!actionLoading}
                                    onClick={() => handleStatusChange(offer._id, "rejected")}
                                    style={{
                                      background: "#e74c3c",
                                      color: "#fff",
                                      border: "none",
                                      borderRadius: 6,
                                      padding: "5px 14px",
                                      fontWeight: 700,
                                      fontSize: 12,
                                      cursor: actionLoading ? "not-allowed" : "pointer",
                                      opacity: actionLoading ? 0.7 : 1,
                                    }}
                                  >
                                    {actionLoading === offer._id + "rejected" ? "…" : "Reject"}
                                  </button>
                                  <button
                                    disabled={!!actionLoading}
                                    onClick={() =>
                                      setCounterOpenId(isCounterOpen ? null : offer._id)
                                    }
                                    style={{
                                      background: "#6c63ff",
                                      color: "#fff",
                                      border: "none",
                                      borderRadius: 6,
                                      padding: "5px 14px",
                                      fontWeight: 700,
                                      fontSize: 12,
                                      cursor: actionLoading ? "not-allowed" : "pointer",
                                      opacity: actionLoading ? 0.7 : 1,
                                    }}
                                  >
                                    Counter
                                  </button>
                                </div>
                              ) : (
                                <StatusBadge status={offer.status} />
                              )}
                            </td>
                          </tr>

                          {isPending && isCounterOpen && (
                            <tr>
                              <td colSpan={6} style={{ padding: "4px 0 12px 0" }}>
                                <CounterForm
                                  offerId={offer._id}
                                  onSubmit={handleCounter}
                                  onCancel={() => setCounterOpenId(null)}
                                  loading={actionLoading === offer._id + "countered"}
                                />
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
