"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:4000";

function imgSrc(raw) {
  if (!raw) return "/images/home/house-db-1.jpg";
  if (raw.startsWith("http")) return raw;
  return `${BACKEND_URL}${raw}`;
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

const STATUS_STYLES = {
  pending: { bg: "#FFF7ED", color: "#f0822d", label: "Pending" },
  confirmed: { bg: "#ECFDF5", color: "#10B981", label: "Confirmed" },
  completed: { bg: "#F5F3FF", color: "#8B5CF6", label: "Completed" },
  cancelled: { bg: "#FEF2F2", color: "#EF4444", label: "Cancelled" },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[(status || "").toLowerCase()] || { bg: "#F3F4F6", color: "#6B7280", label: status || "Unknown" };
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20, textTransform: "capitalize" }}>
      {s.label}
    </span>
  );
}

export default function VisitSchedule() {
  const [role, setRole] = useState("");
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const isBuyer = role === "buyer" || role === "user";

  useEffect(() => {
    try { setRole(JSON.parse(localStorage.getItem("user") || "{}").role || ""); } catch {}
    apiClient.get("/tours/my-tours")
      .then((res) => {
        const raw = res.data;
        const list = Array.isArray(raw) ? raw : (Array.isArray(raw?.tours) ? raw.tours : (Array.isArray(raw?.data) ? raw.data : []));
        setTours(list);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleStatus = async (tourId, status) => {
    setUpdatingId(tourId);
    try {
      await apiClient.put(`/tours/${tourId}/status`, { status });
      setTours((prev) => prev.map((t) => t._id === tourId ? { ...t, status } : t));
    } catch {}
    setUpdatingId(null);
  };

  const handleDelete = async (tourId) => {
    if (!confirm("Cancel this visit?")) return;
    try {
      await apiClient.delete(`/tours/${tourId}`);
      setTours((prev) => prev.filter((t) => t._id !== tourId));
    } catch {}
  };

  const pending = tours.filter((t) => (t.status || "").toLowerCase() === "pending");
  const confirmed = tours.filter((t) => (t.status || "").toLowerCase() === "confirmed");
  const past = tours.filter((t) => ["completed", "cancelled"].includes((t.status || "").toLowerCase()));

  const SummaryCard = ({ label, value, color, bg }) => (
    <div style={{ background: bg, borderRadius: 10, padding: "14px 16px", borderLeft: `3px solid ${color}`, flex: 1 }}>
      <div style={{ fontSize: 24, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginTop: 2 }}>{label}</div>
    </div>
  );

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          <h3 className="title">{isBuyer ? "My Visits" : "Property Visits"}</h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
            <SummaryCard label="Total" value={tours.length} color="#3B82F6" bg="#EFF6FF" />
            <SummaryCard label="Pending" value={pending.length} color="#f0822d" bg="#FFF7ED" />
            <SummaryCard label="Confirmed" value={confirmed.length} color="#10B981" bg="#ECFDF5" />
            <SummaryCard label="Past" value={past.length} color="#8B5CF6" bg="#F5F3FF" />
          </div>

          {loading && <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading visits…</div>}

          {!loading && tours.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
              {isBuyer
                ? "No visits scheduled yet. Book a tour from any property page."
                : "No visit requests for your properties yet."}
            </div>
          )}

          {!loading && tours.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {tours.map((tour) => {
                const prop = tour.propertyId || {};
                const title = prop.propertyName || prop.title || "Property";
                const photo = imgSrc(prop.images?.[0]);
                const isUpdating = updatingId === tour._id;
                const isPending = (tour.status || "").toLowerCase() === "pending";
                const canCancel = isBuyer && isPending;
                const canManage = !isBuyer && isPending;

                return (
                  <div key={tour._id} style={{
                    background: "#fff",
                    border: "1px solid #eef0f3",
                    borderRadius: 12,
                    padding: 16,
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                  }}>
                    <img
                      src={photo}
                      alt={title}
                      onError={(e) => { e.target.src = "/images/home/house-db-1.jpg"; }}
                      style={{ width: 90, height: 66, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: "#1a2332", flex: 1, minWidth: 100 }}>{title}</span>
                        <StatusBadge status={tour.status} />
                      </div>
                      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 13, color: "#666", marginBottom: 8 }}>
                        <span>📅 {formatDate(tour.preferredDate)}</span>
                        <span>🕐 {tour.time}</span>
                        <span>🎥 {tour.tourType === "videochat" ? "Video Call" : "In-Person"}</span>
                        {!isBuyer && <span>👤 {tour.name} · {tour.email}</span>}
                      </div>
                      {tour.message && (
                        <div style={{ fontSize: 12, color: "#888", fontStyle: "italic", marginBottom: 8 }}>"{tour.message}"</div>
                      )}
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {canManage && (
                          <>
                            <button
                              onClick={() => handleStatus(tour._id, "confirmed")}
                              disabled={isUpdating}
                              style={{ fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 6, border: "none", background: "#10B981", color: "#fff", cursor: "pointer", opacity: isUpdating ? 0.6 : 1 }}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatus(tour._id, "cancelled")}
                              disabled={isUpdating}
                              style={{ fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 6, border: "none", background: "#FEF2F2", color: "#EF4444", cursor: "pointer", opacity: isUpdating ? 0.6 : 1 }}
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {isPending && (
                          <button
                            onClick={() => handleStatus(tour._id, "completed")}
                            disabled={isUpdating || isBuyer}
                            style={{ fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 6, border: "none", background: "#F5F3FF", color: "#8B5CF6", cursor: isBuyer ? "default" : "pointer", display: isBuyer ? "none" : "inline-block" }}
                          >
                            Mark Completed
                          </button>
                        )}
                        {canCancel && (
                          <button
                            onClick={() => handleDelete(tour._id)}
                            style={{ fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 6, border: "1px solid #eee", background: "#fff", color: "#888", cursor: "pointer" }}
                          >
                            Cancel Visit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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
