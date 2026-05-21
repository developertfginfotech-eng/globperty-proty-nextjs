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

function StatusBadge({ status }) {
  const map = {
    active: { bg: "#ECFDF5", color: "#10B981" },
    pending: { bg: "#FFF7ED", color: "#f0822d" },
    sold: { bg: "#F5F3FF", color: "#8B5CF6" },
    inactive: { bg: "#F3F4F6", color: "#6B7280" },
  };
  const s = map[(status || "").toLowerCase()] || { bg: "#F3F4F6", color: "#6B7280" };
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      fontSize: 11,
      fontWeight: 600,
      padding: "2px 10px",
      borderRadius: 20,
      textTransform: "capitalize",
    }}>{status || "Unknown"}</span>
  );
}

function StatBox({ label, value, icon }) {
  return (
    <div style={{
      flex: 1,
      background: "#f8fafc",
      borderRadius: 8,
      padding: "10px 14px",
      textAlign: "center",
      border: "1px solid #eef0f3",
    }}>
      <div style={{ fontSize: 20, marginBottom: 2 }}>{icon}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "#1a2332" }}>{value}</div>
      <div style={{ fontSize: 11, color: "#888", fontWeight: 500 }}>{label}</div>
    </div>
  );
}

export default function ListingAnalytics() {
  const [role, setRole] = useState("");
  const [properties, setProperties] = useState([]);
  const [savesMap, setSavesMap] = useState({});
  const [leadsMap, setLeadsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let userRole = "";
    try { userRole = JSON.parse(localStorage.getItem("user") || "{}").role || ""; } catch {}
    setRole(userRole);

    if (userRole === "buyer" || userRole === "user") {
      setLoading(false);
      return;
    }

    Promise.allSettled([
      apiClient.get("/property/agent/properties"),
      apiClient.get("/favorites/my-properties"),
      apiClient.get("/leads"),
    ]).then(([propsRes, favsRes, inqRes]) => {
      const rawProps = propsRes.status === "fulfilled" ? propsRes.value.data : null;
      const props = Array.isArray(rawProps) ? rawProps : (Array.isArray(rawProps?.properties) ? rawProps.properties : []);

      const rawFavs = favsRes.status === "fulfilled" ? favsRes.value.data : null;
      const favs = Array.isArray(rawFavs) ? rawFavs : (Array.isArray(rawFavs?.favorites) ? rawFavs.favorites : []);

      const rawInqs = inqRes.status === "fulfilled" ? inqRes.value.data : null;
      const inqs = Array.isArray(rawInqs) ? rawInqs : (Array.isArray(rawInqs?.leads) ? rawInqs.leads : (Array.isArray(rawInqs?.data) ? rawInqs.data : []));

      // Build saves count per property
      const sm = {};
      favs.forEach((f) => {
        const pid = f.propertyId?._id || f.propertyId || f._id;
        if (pid) sm[pid] = (sm[pid] || 0) + 1;
      });

      // Build leads count per property
      const im = {};
      inqs.forEach((i) => {
        const pid = i.propertyId?._id || i.propertyId;
        if (pid) im[pid] = (im[pid] || 0) + 1;
      });

      setProperties(props);
      setSavesMap(sm);
      setLeadsMap(im);
    }).finally(() => setLoading(false));
  }, []);

  if (role === "buyer" || role === "user") {
    return (
      <div className="main-content w-100">
        <div className="main-content-inner">
          <div className="widget-box-2 wd-listing">
            <h3 className="title">Listing Analytics</h3>
            <div style={{ padding: "40px 20px", textAlign: "center", color: "#888", fontSize: 15 }}>
              Analytics is available for sellers and brokers only.
            </div>
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

  const totalViews = properties.reduce((s, p) => s + (p.viewCount || 0), 0);
  const totalSaves = Object.values(savesMap).reduce((s, v) => s + v, 0);
  const totalLeads = Object.values(leadsMap).reduce((s, v) => s + v, 0);
  const maxViews = Math.max(...properties.map((p) => p.viewCount || 0), 1);

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          <h3 className="title">Listing Analytics</h3>

          {/* Summary row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 28,
          }}>
            {[
              { label: "Total Listings", value: properties.length, color: "#3B82F6", bg: "#EFF6FF" },
              { label: "Total Views", value: totalViews, color: "#f0822d", bg: "#FFF7ED" },
              { label: "Total Saves", value: totalSaves, color: "#8B5CF6", bg: "#F5F3FF" },
              { label: "Total Leads", value: totalLeads, color: "#10B981", bg: "#ECFDF5" },
            ].map((s) => (
              <div key={s.label} style={{
                background: s.bg,
                borderRadius: 10,
                padding: "14px 16px",
                borderLeft: `3px solid ${s.color}`,
              }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {loading && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading analytics…</div>
          )}

          {!loading && properties.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
              No properties found. Add a listing to see analytics.
            </div>
          )}

          {!loading && properties.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {properties.map((p) => {
                const id = p._id;
                const title = p.propertyName || p.title || "Untitled";
                const saves = savesMap[id] || 0;
                const leadCount = leadsMap[id] || 0;
                const views = p.viewCount || 0;
                const viewPct = maxViews > 0 ? Math.round((views / maxViews) * 100) : 0;
                const photo = imgSrc(p.images?.[0]);

                return (
                  <div key={id} style={{
                    background: "#fff",
                    border: "1px solid #eef0f3",
                    borderRadius: 12,
                    padding: 16,
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}>
                    <img
                      src={photo}
                      alt={title}
                      onError={(e) => { e.target.src = "/images/home/house-db-1.jpg"; }}
                      style={{ width: 100, height: 72, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: "#1a2332", flex: 1, minWidth: 120 }}>{title}</span>
                        <StatusBadge status={p.status || p.adStatus} />
                      </div>

                      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                        <StatBox label="Views" value={views} icon="👁" />
                        <StatBox label="Saves" value={saves} icon="❤️" />
                        <StatBox label="Leads" value={leadCount} icon="💬" />
                      </div>

                      {/* Views bar */}
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888", marginBottom: 4 }}>
                          <span>Relative Views</span>
                          <span>{viewPct}%</span>
                        </div>
                        <div style={{ height: 5, background: "#f0f0f0", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{
                            height: "100%",
                            width: `${viewPct}%`,
                            background: "linear-gradient(90deg, #f0822d, #e56c1a)",
                            borderRadius: 3,
                            transition: "width 0.6s ease",
                          }} />
                        </div>
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
