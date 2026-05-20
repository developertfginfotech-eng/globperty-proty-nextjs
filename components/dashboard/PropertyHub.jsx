"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/utils/apiClient";
import { getAgentProperties, deleteProperty } from "@/utils/propertyApi";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:4000";

function imgSrc(raw) {
  if (!raw) return "/images/home/house-db-1.jpg";
  if (raw.startsWith("http")) return raw;
  return `${BACKEND_URL}${raw}`;
}

function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ─── My Properties ───────────────────────────────────────────────────────────

const PROP_STATUS = {
  approved: { bg: "#d1fae5", color: "#065f46", label: "Approved" },
  pending:  { bg: "#fef9c3", color: "#854d0e", label: "Pending" },
  rejected: { bg: "#fee2e2", color: "#991b1b", label: "Rejected" },
};

function MyPropertiesTab() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    getAgentProperties()
      .then((data) => { setProperties(data); setFiltered(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let r = properties;
    if (statusFilter !== "all") r = r.filter((p) => p.status === statusFilter);
    if (search.trim()) r = r.filter((p) => p.title?.toLowerCase().includes(search.toLowerCase()));
    setFiltered(r);
  }, [search, statusFilter, properties]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete property.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, minWidth: 130 }}
        >
          <option value="all">All Statuses</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 180, padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none" }}
        />
        <Link href="/add-property" style={{ padding: "8px 18px", background: "#f0822d", color: "#fff", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
          + Add Property
        </Link>
      </div>

      {loading && <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading your properties…</div>}

      {!loading && filtered.length === 0 && (
        <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
          {properties.length === 0
            ? <>No properties yet. <Link href="/add-property" style={{ color: "#f96b25" }}>Add your first property →</Link></>
            : "No properties match your filter."}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="wrap-table">
          <div className="table-responsive">
            <table>
              <thead>
                <tr><th>Listing</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const key = (p.status || "pending").toLowerCase();
                  const badge = PROP_STATUS[key] || PROP_STATUS.pending;
                  const photo = p.imageSrc
                    ? (p.imageSrc.startsWith("http") ? p.imageSrc : `${BACKEND_URL}${p.imageSrc}`)
                    : "/images/home/house-db-1.jpg";
                  return (
                    <tr key={p.id}>
                      <td>
                        <div className="listing-box">
                          <div className="images">
                            <img alt={p.title} src={photo} width={100} height={70} style={{ objectFit: "cover", borderRadius: 6 }} onError={(e) => { e.target.src = "/images/home/house-db-1.jpg"; }} />
                          </div>
                          <div className="content">
                            <div className="title">
                              <Link href={`/property-detail-v1/${p.id}`} className="link">{p.title || "Untitled"}</Link>
                            </div>
                            <div style={{ fontSize: 13, color: "#888" }}>{p.location || p.city || ""}</div>
                            <div className="text-btn text-color-primary" style={{ fontWeight: 600 }}>${(p.price || 0).toLocaleString()}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ background: badge.bg, color: badge.color, borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 600, display: "inline-block" }}>{badge.label}</span>
                        {key === "pending" && <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>Awaiting approval</div>}
                      </td>
                      <td>
                        <ul className="list-action">
                          <li>
                            <Link href={`/add-property?edit=${p.id}`} className="item">
                              <svg width={16} height={16} viewBox="0 0 16 16" fill="none"><path d="M11.2413 2.9915L12.366 1.86616C12.6005 1.63171 12.9184 1.5 13.25 1.5C13.5816 1.5 13.8995 1.63171 14.134 1.86616C14.3685 2.10062 14.5002 2.4186 14.5002 2.75016C14.5002 3.08173 14.3685 3.39971 14.134 3.63416L4.55467 13.2135C4.20222 13.5657 3.76758 13.8246 3.29 13.9668L1.5 14.5002L2.03333 12.7102C2.17552 12.2326 2.43442 11.7979 2.78667 11.4455L11.242 2.9915H11.2413ZM11.2413 2.9915L13 4.75016" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              Edit
                            </Link>
                          </li>
                          <li>
                            <button className="item" onClick={() => handleDelete(p.id)} disabled={deleting === p.id} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: deleting === p.id ? "#ccc" : "inherit" }}>
                              <svg width={16} height={16} viewBox="0 0 16 16" fill="none"><path d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              {deleting === p.id ? "Deleting…" : "Delete"}
                            </button>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Visits ──────────────────────────────────────────────────────────────────

const VISIT_STATUS = {
  pending:   { bg: "#FFF7ED", color: "#f0822d", label: "Pending" },
  confirmed: { bg: "#ECFDF5", color: "#10B981", label: "Confirmed" },
  completed: { bg: "#F5F3FF", color: "#8B5CF6", label: "Completed" },
  cancelled: { bg: "#FEF2F2", color: "#EF4444", label: "Cancelled" },
};

function VisitsTab({ role }) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const isBuyer = role === "buyer" || role === "user";

  useEffect(() => {
    apiClient.get("/tours/my-tours")
      .then((res) => {
        const raw = res.data;
        setTours(Array.isArray(raw) ? raw : Array.isArray(raw?.tours) ? raw.tours : Array.isArray(raw?.data) ? raw.data : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await apiClient.put(`/tours/${id}/status`, { status });
      setTours((prev) => prev.map((t) => t._id === id ? { ...t, status } : t));
    } catch {}
    setUpdatingId(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Cancel this visit?")) return;
    try {
      await apiClient.delete(`/tours/${id}`);
      setTours((prev) => prev.filter((t) => t._id !== id));
    } catch {}
  };

  const pending = tours.filter((t) => t.status?.toLowerCase() === "pending");
  const confirmed = tours.filter((t) => t.status?.toLowerCase() === "confirmed");
  const past = tours.filter((t) => ["completed", "cancelled"].includes(t.status?.toLowerCase()));

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total", value: tours.length, color: "#3B82F6", bg: "#EFF6FF" },
          { label: "Pending", value: pending.length, color: "#f0822d", bg: "#FFF7ED" },
          { label: "Confirmed", value: confirmed.length, color: "#10B981", bg: "#ECFDF5" },
          { label: "Past", value: past.length, color: "#8B5CF6", bg: "#F5F3FF" },
        ].map((s) => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: "14px 16px", borderLeft: `3px solid ${s.color}` }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {loading && <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading visits…</div>}
      {!loading && tours.length === 0 && (
        <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
          {isBuyer ? "No visits scheduled yet." : "No visit requests yet."}
        </div>
      )}

      {!loading && tours.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tours.map((tour) => {
            const prop = tour.propertyId || {};
            const title = prop.propertyName || prop.title || "Property";
            const photo = imgSrc(prop.images?.[0]);
            const statusKey = (tour.status || "pending").toLowerCase();
            const badge = VISIT_STATUS[statusKey] || { bg: "#F3F4F6", color: "#6B7280", label: tour.status };
            const isPending = statusKey === "pending";
            const isUpdating = updatingId === tour._id;

            return (
              <div key={tour._id} style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 12, padding: 16, display: "flex", gap: 14, alignItems: "flex-start" }}>
                <img src={photo} alt={title} onError={(e) => { e.target.src = "/images/home/house-db-1.jpg"; }} style={{ width: 90, height: 66, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "#1a2332", flex: 1 }}>{title}</span>
                    <span style={{ background: badge.bg, color: badge.color, fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20 }}>{badge.label}</span>
                  </div>
                  <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 13, color: "#666", marginBottom: 8 }}>
                    <span>📅 {fmtDate(tour.preferredDate)}</span>
                    <span>🕐 {tour.time}</span>
                    <span>🎥 {tour.tourType === "videochat" ? "Video Call" : "In-Person"}</span>
                    {!isBuyer && <span>👤 {tour.name} · {tour.email}</span>}
                  </div>
                  {tour.message && <div style={{ fontSize: 12, color: "#888", fontStyle: "italic", marginBottom: 8 }}>"{tour.message}"</div>}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {!isBuyer && isPending && (
                      <>
                        <button onClick={() => handleStatus(tour._id, "confirmed")} disabled={isUpdating} style={{ fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 6, border: "none", background: "#10B981", color: "#fff", cursor: "pointer", opacity: isUpdating ? 0.6 : 1 }}>Confirm</button>
                        <button onClick={() => handleStatus(tour._id, "cancelled")} disabled={isUpdating} style={{ fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 6, border: "none", background: "#FEF2F2", color: "#EF4444", cursor: "pointer", opacity: isUpdating ? 0.6 : 1 }}>Decline</button>
                        <button onClick={() => handleStatus(tour._id, "completed")} disabled={isUpdating} style={{ fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 6, border: "none", background: "#F5F3FF", color: "#8B5CF6", cursor: "pointer" }}>Mark Completed</button>
                      </>
                    )}
                    {isBuyer && isPending && (
                      <button onClick={() => handleDelete(tour._id)} style={{ fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 6, border: "1px solid #eee", background: "#fff", color: "#888", cursor: "pointer" }}>Cancel Visit</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

// ─── Favourites ───────────────────────────────────────────────────────────────

const NOTES_KEY = "fav_notes_v1";
function loadNotes() { try { return JSON.parse(localStorage.getItem(NOTES_KEY) || "{}"); } catch { return {}; } }
function persistNote(pid, val) { const n = loadNotes(); if (val) n[pid] = val; else delete n[pid]; localStorage.setItem(NOTES_KEY, JSON.stringify(n)); }

function FavouritesTab() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);
  const [notes, setNotes] = useState({});
  const [editingNote, setEditingNote] = useState(null);
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => { setNotes(loadNotes()); }, []);

  useEffect(() => {
    apiClient.get("/favorites")
      .then((res) => setFavorites(res.data.favorites || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openNote = (pid) => { setEditingNote(pid); setNoteInput(notes[pid] || ""); };
  const saveNoteLocal = (pid) => { persistNote(pid, noteInput.trim()); setNotes(loadNotes()); setEditingNote(null); };

  const handleRemove = async (propertyId, favId) => {
    if (!confirm("Remove from favorites?")) return;
    setRemoving(favId);
    try {
      await apiClient.delete(`/favorites/${propertyId}`);
      setFavorites((prev) => prev.filter((f) => f._id !== favId));
    } catch {
      alert("Failed to remove from favorites.");
    } finally {
      setRemoving(null);
    }
  };

  return (
    <>
      {loading && <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading favorites…</div>}
      {!loading && favorites.length === 0 && (
        <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
          No favorites yet. <Link href="/property-gird-left-sidebar" style={{ color: "#f96b25" }}>Browse properties →</Link>
        </div>
      )}
      {!loading && favorites.length > 0 && (
        <div className="wrap-table">
          <div className="table-responsive">
            <table>
              <thead><tr><th>Listing</th><th>My Note</th><th>Saved On</th><th>Action</th></tr></thead>
              <tbody>
                {favorites.map((fav) => {
                  const p = fav.propertyId;
                  if (!p) return null;
                  const title = p.propertyName || p.title || "Untitled";
                  const photo = imgSrc(p.images?.[0]);
                  const price = p.price ? `$${Number(p.price).toLocaleString()}` : "—";
                  const location = [p.city, p.country].filter(Boolean).join(", ");
                  const existingNote = notes[p._id];
                  return (
                    <tr key={fav._id}>
                      <td>
                        <div className="listing-box">
                          <div className="images">
                            <img alt={title} src={photo} width={100} height={70} style={{ objectFit: "cover", borderRadius: 6 }} onError={(e) => { e.target.src = "/images/home/house-db-1.jpg"; }} />
                          </div>
                          <div className="content">
                            <div className="title"><Link href={`/property-detail-v1/${p._id}`} className="link">{title}</Link></div>
                            <div style={{ fontSize: 13, color: "#888" }}>{location}</div>
                            <div className="text-btn text-color-primary" style={{ fontWeight: 600 }}>{price}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ minWidth: 160 }}>
                        {editingNote === p._id ? (
                          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                            <input autoFocus value={noteInput} onChange={(e) => setNoteInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") saveNoteLocal(p._id); if (e.key === "Escape") setEditingNote(null); }} placeholder="Add a note…" style={{ flex: 1, fontSize: 12, padding: "5px 8px", border: "1px solid #e0e3e8", borderRadius: 6, outline: "none" }} />
                            <button onClick={() => saveNoteLocal(p._id)} style={{ fontSize: 11, background: "#f0822d", color: "#fff", border: "none", borderRadius: 5, padding: "4px 8px", cursor: "pointer" }}>Save</button>
                            <button onClick={() => setEditingNote(null)} style={{ fontSize: 11, background: "#f3f4f6", color: "#888", border: "none", borderRadius: 5, padding: "4px 8px", cursor: "pointer" }}>✕</button>
                          </div>
                        ) : (
                          <div style={{ cursor: "pointer" }} onClick={() => openNote(p._id)}>
                            {existingNote
                              ? <span style={{ fontSize: 12, color: "#555", fontStyle: "italic", background: "#FFF7ED", padding: "3px 8px", borderRadius: 6, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{existingNote}</span>
                              : <span style={{ fontSize: 12, color: "#bbb" }}>+ Add note</span>}
                          </div>
                        )}
                      </td>
                      <td><span style={{ fontSize: 13, color: "#555" }}>{fmtDate(fav.createdAt)}</span></td>
                      <td>
                        <ul className="list-action">
                          <li><Link href={`/property-detail-v1/${p._id}`} className="item"><svg width={16} height={16} viewBox="0 0 16 16" fill="none"><path d="M2 8s2.667-5.333 6-5.333S14 8 14 8s-2.667 5.333-6 5.333S2 8 2 8z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="8" r="2" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round"/></svg>View</Link></li>
                          <li>
                            <button className="item" disabled={removing === fav._id} onClick={() => handleRemove(p._id, fav._id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: removing === fav._id ? "#ccc" : "inherit", padding: 0 }}>
                              <svg width={16} height={16} viewBox="0 0 16 16" fill="none"><path d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              {removing === fav._id ? "Removing…" : "Remove"}
                            </button>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

function Stars({ rating = 5 }) {
  const n = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className="ratings">
      {Array.from({ length: 5 }, (_, i) => <i key={i} className={i < n ? "icon-star" : "icon-star-empty"} />)}
    </div>
  );
}

function ReviewsTab() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/reviews/my-properties")
      .then((res) => setReviews(res.data.reviews || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading && <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading reviews…</div>}
      {!loading && reviews.length === 0 && <div style={{ padding: 40, textAlign: "center", color: "#888" }}>No reviews yet on your properties.</div>}
      {!loading && reviews.length > 0 && (
        <ul className="list-mess" style={{ margin: 0, padding: 0 }}>
          {reviews.map((review) => {
            const name = review.userId?.name || "Anonymous";
            const propertyTitle = review.propertyId?.propertyName || review.propertyId?.title || "";
            const parts = (name || "?").trim().split(" ");
            const letters = parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0][0] || "?");
            return (
              <li key={review._id} className="mess-item">
                <div className="user-box">
                  <div className="avatar">
                    <div style={{ width: 51, height: 51, borderRadius: "50%", background: "#f96b25", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
                      {letters.toUpperCase()}
                    </div>
                  </div>
                  <div className="content justify-content-start">
                    <div className="name fw-6">{name}</div>
                    <span className="caption-2 text-variant-3">{fmtDate(review.createdAt)}</span>
                    {propertyTitle && <span className="caption-2 text-variant-3" style={{ marginLeft: 8, color: "#f96b25" }}>on {propertyTitle}</span>}
                  </div>
                </div>
                {review.comment && <p>{review.comment}</p>}
                <Stars rating={review.rating} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const TABS = [
  { key: "properties", label: "My Properties" },
  { key: "visits",     label: "Visits" },
  { key: "favourites", label: "Favourites" },
  { key: "reviews",    label: "Reviews" },
];

export default function PropertyHub() {
  const [activeTab, setActiveTab] = useState("properties");
  const [role, setRole] = useState("");

  useEffect(() => {
    try { setRole(JSON.parse(localStorage.getItem("user") || "{}").role || ""); } catch {}
  }, []);

  const isBuyer = role === "buyer" || role === "user";

  const visibleTabs = isBuyer
    ? TABS.filter((t) => t.key !== "properties")
    : TABS;

  const tabStyle = (key) => ({
    padding: "8px 20px",
    borderRadius: 20,
    border: "none",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    background: activeTab === key ? "#f0822d" : "#f3f4f6",
    color: activeTab === key ? "#fff" : "#555",
    transition: "background 0.2s, color 0.2s",
    whiteSpace: "nowrap",
  });

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          {/* Tabs */}
          <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
            {visibleTabs.map((t) => (
              <button key={t.key} style={tabStyle(t.key)} onClick={() => setActiveTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === "properties" && !isBuyer && <MyPropertiesTab />}
          {activeTab === "visits"     && <VisitsTab role={role} />}
          {activeTab === "favourites" && <FavouritesTab />}
          {activeTab === "reviews"    && !isBuyer && <ReviewsTab />}
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
