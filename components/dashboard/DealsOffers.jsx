"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/utils/apiClient";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:4000";

function imgSrc(raw) {
  if (!raw) return "/images/home/house-db-1.jpg";
  if (raw.startsWith("http")) return raw;
  return `${BACKEND_URL}${raw}`;
}

// ─── Deal Tracker helpers ────────────────────────────────────────────────────

const COLUMNS = [
  { key: "shortlisted", label: "Shortlisted", color: "#3B82F6", bg: "#EFF6FF" },
  { key: "offerMade",   label: "Offer Made",  color: "#f0822d", bg: "#FFF7ED" },
  { key: "negotiating", label: "Negotiating", color: "#8B5CF6", bg: "#F5F3FF" },
  { key: "closed",      label: "Closed",      color: "#10B981", bg: "#ECFDF5" },
];

function DealCard({ item, colColor }) {
  const title = item.propertyName || item.title || "Untitled Property";
  const price = item.price
    ? `$${Number(item.price).toLocaleString()}`
    : item.offerPrice
    ? `$${Number(item.offerPrice).toLocaleString()}`
    : "—";
  const city = item.city || item.location || "—";
  const status = item.status || item.stage || "";
  const photo = imgSrc(item.images?.[0]);
  const href = item.propertyId
    ? `/property-detail-v1/${item.propertyId}`
    : item._id
    ? `/property-detail-v1/${item._id}`
    : "#";

  return (
    <div style={{
      background: "#fff",
      borderRadius: 10,
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      marginBottom: 10,
      overflow: "hidden",
      border: "1px solid #f0f0f0",
    }}>
      <img
        src={photo}
        alt={title}
        onError={(e) => { e.target.src = "/images/home/house-db-1.jpg"; }}
        style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }}
      />
      <div style={{ padding: "10px 12px 12px" }}>
        <Link href={href} style={{ fontWeight: 700, fontSize: 13, color: "#1a2332", lineHeight: 1.35, display: "block", textDecoration: "none", marginBottom: 4 }}>
          {title}
        </Link>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{city}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: "#1a2332" }}>{price}</span>
          {status && (
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              padding: "2px 7px",
              borderRadius: 20,
              background: colColor + "18",
              color: colColor,
              textTransform: "capitalize",
              letterSpacing: 0.3,
            }}>{status}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Manage Offers helpers ───────────────────────────────────────────────────

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

// ─── Main Component ──────────────────────────────────────────────────────────

export default function DealsOffers() {
  const [activeTab, setActiveTab] = useState("deals");
  const [role, setRole] = useState("");

  // Deal Tracker state
  const [lanes, setLanes] = useState({ shortlisted: [], offerMade: [], negotiating: [], closed: [] });
  const [dealLoading, setDealLoading] = useState(true);

  // Manage Offers state
  const [offers, setOffers] = useState([]);
  const [offersLoading, setOffersLoading] = useState(true);
  const [offersError, setOffersError] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [counterOpenId, setCounterOpenId] = useState(null);

  useEffect(() => {
    let userRole = "";
    try {
      userRole = JSON.parse(localStorage.getItem("user") || "{}").role || "";
    } catch {}
    setRole(userRole);

    const isSeller = userRole && userRole !== "buyer" && userRole !== "user";
    const offersEndpoint = isSeller ? "/offers/received" : "/offers/my-offers";

    // Fetch Deal Tracker data
    Promise.allSettled([
      apiClient.get("/favorites"),
      apiClient.get(offersEndpoint),
    ]).then(([favRes, offersRes]) => {
      const rawFavs = favRes.status === "fulfilled" ? favRes.value.data : null;
      const favs = Array.isArray(rawFavs?.favorites) ? rawFavs.favorites : [];
      const rawOffers = offersRes.status === "fulfilled" ? offersRes.value.data : null;
      const dealOffers = Array.isArray(rawOffers)
        ? rawOffers
        : Array.isArray(rawOffers?.offers)
        ? rawOffers.offers
        : [];

      const shortlisted = favs.map((fav) => {
        const p = fav.propertyId || {};
        return {
          _id: fav._id,
          propertyId: p._id,
          propertyName: p.propertyName || p.title,
          price: p.price,
          city: p.city,
          images: p.images,
          status: "shortlisted",
          stage: "shortlisted",
        };
      });

      const offerMade = [];
      const negotiating = [];
      const closed = [];

      dealOffers.forEach((offer) => {
        const p = offer.propertyId || {};
        const card = {
          _id: offer._id,
          propertyId: typeof offer.propertyId === "string" ? offer.propertyId : p._id,
          propertyName: p.propertyName || p.title || offer.propertyTitle,
          price: p.price,
          offerPrice: offer.offerPrice,
          city: p.city,
          images: p.images,
          status: offer.status,
          stage: offer.status,
        };
        if (offer.status === "pending") offerMade.push(card);
        else if (offer.status === "countered") negotiating.push(card);
        else if (offer.status === "accepted") closed.push(card);
        else offerMade.push(card);
      });

      setLanes({ shortlisted, offerMade, negotiating, closed });
    }).finally(() => setDealLoading(false));

    // Fetch Manage Offers data (seller-only)
    if (isSeller) {
      apiClient.get("/offers/received")
        .then((res) => {
          const raw = res.data;
          const list = Array.isArray(raw)
            ? raw
            : Array.isArray(raw?.offers)
            ? raw.offers
            : [];
          setOffers(list);
        })
        .catch(() => setOffersError(true))
        .finally(() => setOffersLoading(false));
    } else {
      setOffersLoading(false);
    }
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
          o._id === offerId
            ? { ...o, status: "countered", counterPrice, counterMessage }
            : o
        )
      );
      setCounterOpenId(null);
    } catch {
      alert("Failed to send counter offer. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const isBuyer = role === "buyer" || role === "user";
  const dealTotal = Object.values(lanes).reduce((sum, arr) => sum + arr.length, 0);

  const tabStyle = (tabKey) => ({
    padding: "8px 22px",
    borderRadius: 20,
    border: "none",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    background: activeTab === tabKey ? "#f0822d" : "#f3f4f6",
    color: activeTab === tabKey ? "#fff" : "#555",
    transition: "background 0.2s, color 0.2s",
  });

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          {/* Tab buttons */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            <button style={tabStyle("deals")} onClick={() => setActiveTab("deals")}>
              Deal Tracker
            </button>
            {!isBuyer && (
              <button style={tabStyle("offers")} onClick={() => setActiveTab("offers")}>
                Manage Offers
              </button>
            )}
          </div>

          {/* ── Deal Tracker Tab ── */}
          {activeTab === "deals" && (
            <>
              <h3 className="title">Deal Tracker</h3>

              {/* Summary stat row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12,
                marginBottom: 28,
              }}>
                {COLUMNS.map((col) => (
                  <div key={col.key} style={{
                    background: col.bg,
                    borderRadius: 10,
                    padding: "14px 16px",
                    borderLeft: `3px solid ${col.color}`,
                  }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: col.color }}>{lanes[col.key].length}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginTop: 2 }}>{col.label}</div>
                  </div>
                ))}
              </div>

              {dealLoading && (
                <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading your deals…</div>
              )}

              {!dealLoading && dealTotal === 0 && (
                <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
                  No deals yet.{" "}
                  <Link href="/property-gird-left-sidebar" style={{ color: "#f0822d" }}>
                    Browse properties →
                  </Link>
                </div>
              )}

              {!dealLoading && (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 16,
                }} className="deal-tracker-grid">
                  {COLUMNS.map((col) => (
                    <div key={col.key} style={{
                      background: "#fafafa",
                      borderRadius: 12,
                      padding: "14px 12px",
                      minHeight: 200,
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 14,
                        paddingBottom: 10,
                        borderBottom: `2px solid ${col.color}`,
                      }}>
                        <span style={{ fontWeight: 700, fontSize: 13, color: "#1a2332" }}>{col.label}</span>
                        <span style={{
                          background: col.color,
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: 700,
                          borderRadius: 20,
                          padding: "1px 8px",
                          minWidth: 22,
                          textAlign: "center",
                        }}>{lanes[col.key].length}</span>
                      </div>

                      {lanes[col.key].length === 0 ? (
                        <div style={{ fontSize: 12, color: "#bbb", textAlign: "center", paddingTop: 20 }}>No deals here</div>
                      ) : (
                        lanes[col.key].map((item) => (
                          <DealCard key={item._id} item={item} colColor={col.color} />
                        ))
                      )}
                    </div>
                  ))}
                </div>
              )}

              <style jsx>{`
                @media (max-width: 600px) {
                  .deal-tracker-grid {
                    grid-template-columns: 1fr !important;
                  }
                }
              `}</style>
            </>
          )}

          {/* ── Manage Offers Tab ── */}
          {activeTab === "offers" && !isBuyer && (
            <>
              <h3 className="title">Received Offers</h3>

              {offersLoading && (
                <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading…</div>
              )}

              {!offersLoading && offersError && (
                <div style={{ padding: 40, textAlign: "center", color: "#e74c3c" }}>
                  Failed to load. Try refreshing.
                </div>
              )}

              {!offersLoading && !offersError && offers.length === 0 && (
                <div style={{ padding: 60, textAlign: "center", color: "#888" }}>
                  <p style={{ margin: 0 }}>No offers received yet.</p>
                </div>
              )}

              {!offersLoading && !offersError && offers.length > 0 && (
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
            </>
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
