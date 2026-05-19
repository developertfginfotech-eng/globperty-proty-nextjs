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

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── ListingAnalytics helpers ────────────────────────────────────────────────

function AnalyticsStatusBadge({ status }) {
  const map = {
    active:   { bg: "#ECFDF5", color: "#10B981" },
    pending:  { bg: "#FFF7ED", color: "#f0822d" },
    sold:     { bg: "#F5F3FF", color: "#8B5CF6" },
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

// ─── CRM Leads helpers ───────────────────────────────────────────────────────

function InteractionChip({ label }) {
  const styles = {
    Inquiry: { bg: "#EFF6FF", color: "#3B82F6" },
    Saved:   { bg: "#F5F3FF", color: "#8B5CF6" },
  };
  const s = styles[label] || { bg: "#F3F4F6", color: "#6B7280" };
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      fontSize: 11,
      fontWeight: 600,
      padding: "2px 9px",
      borderRadius: 20,
      marginRight: 4,
      display: "inline-block",
    }}>{label}</span>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  // ListingAnalytics state
  const [properties, setProperties] = useState([]);
  const [savesMap, setSavesMap] = useState({});
  const [inquiriesMap, setInquiriesMap] = useState({});

  // CRM Leads state
  const [leads, setLeads] = useState([]);
  const [propertyCount, setPropertyCount] = useState(0);

  useEffect(() => {
    let userRole = "";
    try {
      userRole = JSON.parse(localStorage.getItem("user") || "{}").role || "";
    } catch {}
    setRole(userRole);

    if (userRole === "buyer" || userRole === "user") {
      setLoading(false);
      return;
    }

    // Fetch all data needed for both tabs in one go
    Promise.allSettled([
      apiClient.get("/property/agent/properties"),
      apiClient.get("/favorites/my-properties"),
      apiClient.get("/inquiries"),
    ]).then(([propsRes, favsRes, inqRes]) => {
      const rawProps = propsRes.status === "fulfilled" ? propsRes.value.data : null;
      const props = Array.isArray(rawProps)
        ? rawProps
        : Array.isArray(rawProps?.properties)
        ? rawProps.properties
        : [];

      const rawFavs = favsRes.status === "fulfilled" ? favsRes.value.data : null;
      const favs = Array.isArray(rawFavs)
        ? rawFavs
        : Array.isArray(rawFavs?.favorites)
        ? rawFavs.favorites
        : [];

      const rawInqs = inqRes.status === "fulfilled" ? inqRes.value.data : null;
      const inqs = Array.isArray(rawInqs)
        ? rawInqs
        : Array.isArray(rawInqs?.inquiries)
        ? rawInqs.inquiries
        : Array.isArray(rawInqs?.data)
        ? rawInqs.data
        : [];

      // ── Analytics: saves & inquiries per property ──
      const sm = {};
      favs.forEach((f) => {
        const pid = f.propertyId?._id || f.propertyId || f._id;
        if (pid) sm[pid] = (sm[pid] || 0) + 1;
      });

      const im = {};
      inqs.forEach((i) => {
        const pid = i.propertyId?._id || i.propertyId;
        if (pid) im[pid] = (im[pid] || 0) + 1;
      });

      setProperties(props);
      setSavesMap(sm);
      setInquiriesMap(im);
      setPropertyCount(props.length);

      // ── Leads: build merged leads map ──
      const propNameMap = {};
      props.forEach((p) => { propNameMap[p._id] = p.propertyName || p.title || "Untitled"; });

      const leadsMap = {};

      const getKey = (item) => {
        const buyer = item.buyerId || item.userId || item.user;
        if (typeof buyer === "object" && buyer !== null) return buyer.email || buyer._id;
        return buyer || item.email || "unknown";
      };

      inqs.forEach((inq) => {
        const key = getKey(inq);
        const buyer = inq.buyerId || inq.userId || inq.user || {};
        const pid = inq.propertyId?._id || inq.propertyId;
        if (!leadsMap[key]) {
          leadsMap[key] = {
            key,
            name: buyer.name || buyer.fullName || inq.name || "Unknown",
            email: buyer.email || inq.email || key,
            propertyName: propNameMap[pid] || inq.propertyId?.propertyName || "—",
            interactions: [],
            lastSeen: inq.createdAt,
          };
        }
        if (!leadsMap[key].interactions.includes("Inquiry")) {
          leadsMap[key].interactions.push("Inquiry");
        }
        if (inq.createdAt > leadsMap[key].lastSeen) leadsMap[key].lastSeen = inq.createdAt;
      });

      favs.forEach((fav) => {
        const key = getKey(fav);
        const buyer = fav.buyerId || fav.userId || fav.user || {};
        const pid = fav.propertyId?._id || fav.propertyId;
        if (!leadsMap[key]) {
          leadsMap[key] = {
            key,
            name: buyer.name || buyer.fullName || "Unknown",
            email: buyer.email || key,
            propertyName: propNameMap[pid] || fav.propertyId?.propertyName || "—",
            interactions: [],
            lastSeen: fav.createdAt,
          };
        }
        if (!leadsMap[key].interactions.includes("Saved")) {
          leadsMap[key].interactions.push("Saved");
        }
        if (fav.createdAt > leadsMap[key].lastSeen) leadsMap[key].lastSeen = fav.createdAt;
      });

      setLeads(
        Object.values(leadsMap).sort((a, b) =>
          (b.lastSeen || "") > (a.lastSeen || "") ? 1 : -1
        )
      );
    }).finally(() => setLoading(false));
  }, []);

  // Buyer / user: show access-restricted message, no tabs
  if (role === "buyer" || role === "user") {
    return (
      <div className="main-content w-100">
        <div className="main-content-inner">
          <div className="widget-box-2 wd-listing">
            <h3 className="title">Analytics</h3>
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
              This section is for sellers and brokers only.
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

  const totalViews = properties.reduce((s, p) => s + (p.viewCount || 0), 0);
  const totalSaves = Object.values(savesMap).reduce((s, v) => s + v, 0);
  const totalInquiries = Object.values(inquiriesMap).reduce((s, v) => s + v, 0);
  const maxViews = Math.max(...properties.map((p) => p.viewCount || 0), 1);

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          {/* Tab buttons */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            <button style={tabStyle("analytics")} onClick={() => setActiveTab("analytics")}>
              Listing Analytics
            </button>
            <button style={tabStyle("leads")} onClick={() => setActiveTab("leads")}>
              CRM Leads
            </button>
          </div>

          {/* ── Listing Analytics Tab ── */}
          {activeTab === "analytics" && (
            <>
              <h3 className="title">Listing Analytics</h3>

              {/* Summary row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12,
                marginBottom: 28,
              }}>
                {[
                  { label: "Total Listings",  value: properties.length, color: "#3B82F6", bg: "#EFF6FF" },
                  { label: "Total Views",      value: totalViews,        color: "#f0822d", bg: "#FFF7ED" },
                  { label: "Total Saves",      value: totalSaves,        color: "#8B5CF6", bg: "#F5F3FF" },
                  { label: "Total Inquiries",  value: totalInquiries,    color: "#10B981", bg: "#ECFDF5" },
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
                    const inquiries = inquiriesMap[id] || 0;
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
                            <AnalyticsStatusBadge status={p.status || p.adStatus} />
                          </div>

                          <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                            <StatBox label="Views"     value={views}     icon="👁" />
                            <StatBox label="Saves"     value={saves}     icon="❤️" />
                            <StatBox label="Inquiries" value={inquiries} icon="💬" />
                          </div>

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
            </>
          )}

          {/* ── CRM Leads Tab ── */}
          {activeTab === "leads" && (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                <h3 className="title" style={{ margin: 0 }}>CRM Leads</h3>
                {!loading && (
                  <span style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>
                    {leads.length} leads across {propertyCount} {propertyCount === 1 ? "property" : "properties"}
                  </span>
                )}
              </div>

              {loading && (
                <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading leads…</div>
              )}

              {!loading && leads.length === 0 && (
                <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
                  No leads yet. Leads appear when buyers inquire or save your properties.
                </div>
              )}

              {!loading && leads.length > 0 && (
                <div className="wrap-table">
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Property</th>
                          <th>Interactions</th>
                          <th>Last Activity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr key={lead.key}>
                            <td>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: "50%",
                                  background: "linear-gradient(135deg, #f0822d, #e56c1a)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}>
                                  <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>
                                    {(lead.name || "?")[0].toUpperCase()}
                                  </span>
                                </div>
                                <span style={{ fontWeight: 600, fontSize: 13, color: "#1a2332" }}>{lead.name}</span>
                              </div>
                            </td>
                            <td>
                              <span style={{ fontSize: 13, color: "#555" }}>{lead.email}</span>
                            </td>
                            <td>
                              <span style={{ fontSize: 13, color: "#333", fontWeight: 500 }}>{lead.propertyName}</span>
                            </td>
                            <td>
                              {lead.interactions.map((i) => <InteractionChip key={i} label={i} />)}
                            </td>
                            <td>
                              <span style={{ fontSize: 13, color: "#888" }}>{formatDate(lead.lastSeen)}</span>
                            </td>
                          </tr>
                        ))}
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
