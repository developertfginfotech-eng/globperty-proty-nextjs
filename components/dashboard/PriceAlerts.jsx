"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";

const PROPERTY_TYPES = ["Apartment", "Villa", "Office", "Land", "Townhouse", "Studio"];

function AlertCard({ alert, onDelete }) {
  const p = alert.params || {};
  const chips = [];
  if (p.city) chips.push(`📍 ${p.city}`);
  if (p.propertyType) chips.push(`🏠 ${p.propertyType}`);
  if (p.minPrice || p.maxPrice) {
    const min = p.minPrice ? `$${Number(p.minPrice).toLocaleString()}` : "";
    const max = p.maxPrice ? `$${Number(p.maxPrice).toLocaleString()}` : "";
    chips.push(`💰 ${min}${min && max ? " – " : ""}${max}`);
  }
  if (p.beds) chips.push(`🛏 ${p.beds}+ beds`);
  if (p.baths) chips.push(`🚿 ${p.baths}+ baths`);

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #eef0f3",
      borderRadius: 12,
      padding: "14px 16px",
      display: "flex",
      alignItems: "flex-start",
      gap: 14,
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: "#FFF7ED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 20 }}>🔔</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#1a2332", marginBottom: 6 }}>{alert.title}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          {chips.map((c, i) => (
            <span key={i} style={{ fontSize: 12, background: "#f8f9fb", border: "1px solid #eee", borderRadius: 20, padding: "2px 10px", color: "#555", fontWeight: 500 }}>{c}</span>
          ))}
          {chips.length === 0 && <span style={{ fontSize: 12, color: "#bbb" }}>No filters set</span>}
        </div>
        <div style={{ fontSize: 11, color: "#bbb" }}>
          Created {new Date(alert.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </div>
      </div>
      <button
        onClick={() => onDelete(alert._id)}
        style={{ background: "#FEF2F2", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "#EF4444", fontSize: 13, fontWeight: 600, flexShrink: 0 }}
      >
        Remove
      </button>
    </div>
  );
}

export default function PriceAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", city: "", propertyType: "", minPrice: "", maxPrice: "", beds: "" });

  useEffect(() => {
    apiClient.get("/saved-searches")
      .then((res) => {
        const raw = res.data;
        const list = Array.isArray(raw?.savedSearches) ? raw.savedSearches : (Array.isArray(raw) ? raw : []);
        setAlerts(list);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/saved-searches/${id}`);
      setAlerts((prev) => prev.filter((a) => a._id !== id));
    } catch {}
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const params = {};
      if (form.city) params.city = form.city;
      if (form.propertyType) params.propertyType = form.propertyType;
      if (form.minPrice) params.minPrice = Number(form.minPrice);
      if (form.maxPrice) params.maxPrice = Number(form.maxPrice);
      if (form.beds) params.beds = Number(form.beds);

      const res = await apiClient.post("/saved-searches", { title: form.title, params });
      const created = res.data?.savedSearch;
      if (created) setAlerts((prev) => [created, ...prev]);
      setForm({ title: "", city: "", propertyType: "", minPrice: "", maxPrice: "", beds: "" });
      setShowForm(false);
    } catch {}
    setSaving(false);
  };

  const set = (f) => (e) => setForm((prev) => ({ ...prev, [f]: e.target.value }));

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #e0e3e8",
    borderRadius: 8,
    fontSize: 13,
    color: "#1a2332",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
  };

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            <h3 className="title" style={{ margin: 0 }}>Price Alerts</h3>
            <button
              onClick={() => setShowForm((v) => !v)}
              style={{ background: "#f0822d", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
            >
              {showForm ? "Cancel" : "+ New Alert"}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleCreate} style={{
              background: "#f8fafc",
              border: "1px solid #eef0f3",
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#1a2332", marginBottom: 16 }}>Create Price Alert</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 4 }}>Alert Name *</label>
                  <input value={form.title} onChange={set("title")} placeholder="e.g. Dubai Apartments" style={inputStyle} required />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 4 }}>City</label>
                  <input value={form.city} onChange={set("city")} placeholder="e.g. Dubai" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 4 }}>Property Type</label>
                  <select value={form.propertyType} onChange={set("propertyType")} style={inputStyle}>
                    <option value="">Any</option>
                    {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 4 }}>Min Price ($)</label>
                  <input type="number" value={form.minPrice} onChange={set("minPrice")} placeholder="0" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 4 }}>Max Price ($)</label>
                  <input type="number" value={form.maxPrice} onChange={set("maxPrice")} placeholder="Any" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 4 }}>Min Bedrooms</label>
                  <select value={form.beds} onChange={set("beds")} style={inputStyle}>
                    <option value="">Any</option>
                    {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}+</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ background: "#f0822d", color: "#fff", border: "none", borderRadius: 8, padding: "9px 22px", fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? "Saving…" : "Save Alert"}
                </button>
              </div>
            </form>
          )}

          {loading && <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading alerts…</div>}

          {!loading && alerts.length === 0 && !showForm && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
              No price alerts yet. Create one to get notified when matching properties are listed.
            </div>
          )}

          {!loading && alerts.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {alerts.map((a) => <AlertCard key={a._id} alert={a} onDelete={handleDelete} />)}
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
