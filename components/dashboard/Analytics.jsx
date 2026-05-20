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

function listingQualityScore(p) {
  let score = 0;
  if (p.propertyName || p.title) score += 10;
  if (p.description && p.description.length > 80) score += 20;
  if (Array.isArray(p.images) && p.images.length >= 3) score += 25;
  else if (Array.isArray(p.images) && p.images.length >= 1) score += 12;
  if (p.price) score += 15;
  if (p.city || p.location || p.address) score += 10;
  if (p.beds || p.bedrooms) score += 5;
  if (p.baths || p.bathrooms) score += 5;
  if (p.size || p.area) score += 5;
  if (p.amenities && p.amenities.length > 0) score += 5;
  return Math.min(score, 100);
}

function QualityScore({ score }) {
  const color = score >= 80 ? "#10B981" : score >= 50 ? "#f0822d" : "#EF4444";
  const label = score >= 80 ? "Excellent" : score >= 50 ? "Good" : "Needs work";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color, minWidth: 70 }}>Score: {score}%</div>
      <div style={{ flex: 1, height: 5, background: "#f0f0f0", borderRadius: 3 }}>
        <div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: 3, transition: "width 0.5s" }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 600, color, minWidth: 60 }}>{label}</span>
    </div>
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

// ─── CRM Lead Status ─────────────────────────────────────────────────────────

const LEAD_STATUSES = ["New","Contacted","Visit Scheduled","Offer Received","Negotiating","Closed","Lost"];
const STATUS_COLORS = {
  "New": { bg:"#EFF6FF", color:"#3B82F6" },
  "Contacted": { bg:"#FFF7ED", color:"#f0822d" },
  "Visit Scheduled": { bg:"#F5F3FF", color:"#8B5CF6" },
  "Offer Received": { bg:"#ECFDF5", color:"#10B981" },
  "Negotiating": { bg:"#FFF7ED", color:"#d97706" },
  "Closed": { bg:"#ECFDF5", color:"#065f46" },
  "Lost": { bg:"#FEF2F2", color:"#EF4444" },
};

const CRM_KEY = "crm_leads_v1";
function loadCRM() { try { return JSON.parse(localStorage.getItem(CRM_KEY) || "{}"); } catch { return {}; } }
function saveCRM(data) { localStorage.setItem(CRM_KEY, JSON.stringify(data)); }

function LeadsTab({ leads, loading, propertyCount }) {
  const [crm, setCrm] = useState({});
  const [expandedKey, setExpandedKey] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [reminderInput, setReminderInput] = useState("");

  useEffect(() => { setCrm(loadCRM()); }, []);

  const updateCRM = (key, patch) => {
    const next = { ...loadCRM(), [key]: { ...(loadCRM()[key] || {}), ...patch } };
    saveCRM(next);
    setCrm(next);
  };

  const openExpand = (key) => {
    if (expandedKey === key) { setExpandedKey(null); return; }
    const d = loadCRM()[key] || {};
    setNoteInput(d.note || "");
    setReminderInput(d.reminder || "");
    setExpandedKey(key);
  };

  const saveNote = (key) => { updateCRM(key, { note: noteInput }); };
  const saveReminder = (key) => { updateCRM(key, { reminder: reminderInput }); };

  const sourceLabel = (interactions) => {
    if (interactions.includes("Inquiry") && interactions.includes("Saved")) return "Inquiry + Saved";
    if (interactions.includes("Inquiry")) return "Inquiry";
    if (interactions.includes("Saved")) return "Saved";
    return "—";
  };

  return (
    <>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:20 }}>
        <h3 className="title" style={{ margin:0 }}>CRM Leads</h3>
        {!loading && <span style={{ fontSize:13, color:"#888", fontWeight:500 }}>{leads.length} leads · {propertyCount} {propertyCount===1?"property":"properties"}</span>}
      </div>

      {loading && <div style={{ padding:40, textAlign:"center", color:"#888" }}>Loading leads…</div>}
      {!loading && leads.length === 0 && <div style={{ padding:40, textAlign:"center", color:"#888" }}>No leads yet. Leads appear when buyers inquire or save your properties.</div>}

      {!loading && leads.length > 0 && (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {leads.map((lead) => {
            const d = crm[lead.key] || {};
            const status = d.status || "New";
            const sc = STATUS_COLORS[status] || STATUS_COLORS["New"];
            const isOpen = expandedKey === lead.key;
            const hasReminder = d.reminder && new Date(d.reminder) > new Date();
            return (
              <div key={lead.key} style={{ background:"#fff", border:"1px solid #eef0f3", borderRadius:12, overflow:"hidden" }}>
                <div style={{ padding:"12px 16px", display:"flex", alignItems:"center", gap:12, flexWrap:"wrap", cursor:"pointer" }} onClick={() => openExpand(lead.key)}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#f0822d,#e56c1a)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:13, fontWeight:800, color:"#fff" }}>{(lead.name||"?")[0].toUpperCase()}</span>
                  </div>
                  <div style={{ flex:1, minWidth:120 }}>
                    <div style={{ fontWeight:700, fontSize:13, color:"#1a2332" }}>{lead.name}</div>
                    <div style={{ fontSize:12, color:"#888" }}>{lead.email}</div>
                  </div>
                  <div style={{ fontSize:12, color:"#555", minWidth:100 }}>{lead.propertyName}</div>
                  <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
                    {lead.interactions.map((i) => <InteractionChip key={i} label={i} />)}
                    <span style={{ fontSize:11, background:"#f3f4f6", color:"#888", padding:"2px 8px", borderRadius:20 }}>{sourceLabel(lead.interactions)}</span>
                  </div>
                  <select
                    value={status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => { e.stopPropagation(); updateCRM(lead.key, { status: e.target.value }); }}
                    style={{ fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:20, border:"none", background:sc.bg, color:sc.color, cursor:"pointer", outline:"none" }}
                  >
                    {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {hasReminder && <span style={{ fontSize:10, background:"#FFF7ED", color:"#f0822d", padding:"2px 7px", borderRadius:20, fontWeight:700 }}>🔔 {new Date(d.reminder).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>}
                  <span style={{ fontSize:12, color:"#bbb" }}>{formatDate(lead.lastSeen)}</span>
                  <span style={{ fontSize:16, color:"#bbb" }}>{isOpen ? "▲" : "▼"}</span>
                </div>

                {isOpen && (
                  <div style={{ borderTop:"1px solid #f0f0f0", padding:"14px 16px", background:"#fafafa", display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <div>
                      <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:6 }}>Lead Notes</label>
                      <textarea
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="Add context — e.g. 'wants possession by March', 'offered 10% below asking'…"
                        rows={3}
                        style={{ width:"100%", fontSize:12, padding:"8px 10px", border:"1px solid #e0e3e8", borderRadius:8, resize:"vertical", outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}
                      />
                      <button onClick={() => saveNote(lead.key)} style={{ marginTop:6, fontSize:12, fontWeight:700, background:"#f0822d", color:"#fff", border:"none", borderRadius:6, padding:"5px 14px", cursor:"pointer" }}>Save Note</button>
                      {d.note && <div style={{ marginTop:8, fontSize:12, color:"#555", fontStyle:"italic", background:"#fff", border:"1px solid #eee", borderRadius:6, padding:"6px 10px" }}>{d.note}</div>}
                    </div>
                    <div>
                      <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:6 }}>Follow-up Reminder</label>
                      <input
                        type="datetime-local"
                        value={reminderInput}
                        onChange={(e) => setReminderInput(e.target.value)}
                        style={{ width:"100%", fontSize:12, padding:"8px 10px", border:"1px solid #e0e3e8", borderRadius:8, outline:"none", boxSizing:"border-box" }}
                      />
                      <button onClick={() => saveReminder(lead.key)} style={{ marginTop:6, fontSize:12, fontWeight:700, background:"#8B5CF6", color:"#fff", border:"none", borderRadius:6, padding:"5px 14px", cursor:"pointer" }}>Set Reminder</button>
                      {d.reminder && <div style={{ marginTop:8, fontSize:12, color:"#8B5CF6", fontWeight:600 }}>🔔 Reminder: {new Date(d.reminder).toLocaleString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
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

  // Market Intelligence state
  const [marketCity, setMarketCity] = useState("Dubai");
  const [marketData, setMarketData] = useState(null);
  const [marketLoading, setMarketLoading] = useState(false);

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

  const [marketError, setMarketError] = useState("");

  const fetchMarket = async (city) => {
    if (!city.trim()) return;
    setMarketLoading(true);
    setMarketError("");
    setMarketData(null);
    try {
      const res = await apiClient.get(`/market-intelligence/overview?city=${encodeURIComponent(city.trim())}`);
      const d = res.data?.data || res.data || null;
      setMarketData(d);
    } catch (err) {
      const msg = err?.response?.data?.message || "";
      setMarketError(msg || "No data found for this city. Try a different city name.");
    }
    setMarketLoading(false);
  };

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
            <button style={tabStyle("market")} onClick={() => { setActiveTab("market"); if (!marketData) fetchMarket(marketCity); }}>
              Market Reference
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

                          <div style={{ marginBottom: 10 }}>
                            <div style={{ fontSize: 11, color: "#888", marginBottom: 4, fontWeight: 600 }}>Listing Quality</div>
                            <QualityScore score={listingQualityScore(p)} />
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

          {/* ── Market Reference Tab ── */}
          {activeTab === "market" && (
            <>
              <h3 className="title">Market Price Reference</h3>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
                <input
                  value={marketCity}
                  onChange={(e) => setMarketCity(e.target.value)}
                  placeholder="Enter city (e.g. Dubai)"
                  style={{ flex: 1, minWidth: 160, padding: "8px 14px", border: "1px solid #e0e3e8", borderRadius: 8, fontSize: 13, outline: "none" }}
                  onKeyDown={(e) => e.key === "Enter" && fetchMarket(marketCity)}
                />
                <button
                  onClick={() => fetchMarket(marketCity)}
                  style={{ background: "#f0822d", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                >
                  Search
                </button>
              </div>

              {marketLoading && <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading market data…</div>}

              {!marketLoading && marketError && (
                <div style={{ padding: "20px 24px", background: "#FEF2F2", border: "1px solid #EF4444", borderRadius: 10, color: "#EF4444", fontSize: 14, fontWeight: 600 }}>
                  {marketError}
                </div>
              )}

              {!marketLoading && !marketData && !marketError && (
                <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
                  Enter a city name and click Search to view market data.
                </div>
              )}

              {!marketLoading && marketData && (() => {
                const ps = marketData.priceStats || {};
                const dist = marketData.distribution || {};
                const propTypes = dist.propertyTypes || {};
                const adTypes = dist.adTypes || {};
                return (
                  <div>
                    {/* Location header */}
                    <div style={{ marginBottom: 20, fontSize: 13, color: "#888" }}>
                      Showing data for <strong style={{ color: "#1a2332" }}>{marketData.location?.city || marketCity}</strong>
                      {" · "}{marketData.totalListings} active listings
                      {marketData.listingGrowth !== undefined && (
                        <span style={{ marginLeft: 8, color: marketData.listingGrowth >= 0 ? "#10B981" : "#EF4444", fontWeight: 600 }}>
                          {marketData.listingGrowth >= 0 ? "▲" : "▼"} {Math.abs(marketData.listingGrowth)}% vs last month
                        </span>
                      )}
                    </div>

                    {/* Stat cards */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, marginBottom: 24 }}>
                      {[
                        { label: "Avg Price", value: ps.average ? `$${Number(ps.average).toLocaleString()}` : "—", color: "#3B82F6", bg: "#EFF6FF" },
                        { label: "Median Price", value: ps.median ? `$${Number(ps.median).toLocaleString()}` : "—", color: "#f0822d", bg: "#FFF7ED" },
                        { label: "Total Listings", value: marketData.totalListings ?? "—", color: "#10B981", bg: "#ECFDF5" },
                        { label: "Avg Price/sqft", value: ps.avgPricePerSqft ? `$${Number(ps.avgPricePerSqft).toLocaleString()}` : "—", color: "#8B5CF6", bg: "#F5F3FF" },
                        { label: "Min Price", value: ps.min ? `$${Number(ps.min).toLocaleString()}` : "—", color: "#6B7280", bg: "#F3F4F6" },
                        { label: "Max Price", value: ps.max ? `$${Number(ps.max).toLocaleString()}` : "—", color: "#6B7280", bg: "#F3F4F6" },
                      ].map((s) => (
                        <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: "14px 16px", borderLeft: `3px solid ${s.color}` }}>
                          <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginTop: 2 }}>{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      {/* Property type breakdown */}
                      {Object.keys(propTypes).length > 0 && (
                        <div style={{ background: "#f8fafc", border: "1px solid #eef0f3", borderRadius: 12, padding: 16 }}>
                          <div style={{ fontWeight: 700, fontSize: 13, color: "#1a2332", marginBottom: 12 }}>Property Types</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {Object.entries(propTypes).map(([type, count]) => {
                              const total = Object.values(propTypes).reduce((s, v) => s + v, 0);
                              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                              return (
                                <div key={type}>
                                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#555", marginBottom: 4 }}>
                                    <span style={{ fontWeight: 600 }}>{type || "Other"}</span>
                                    <span>{count} ({pct}%)</span>
                                  </div>
                                  <div style={{ height: 5, background: "#eee", borderRadius: 3 }}>
                                    <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#f0822d,#e56c1a)", borderRadius: 3 }} />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* For Sale vs Rent */}
                      {(adTypes.rent !== undefined || adTypes.resale !== undefined) && (
                        <div style={{ background: "#f8fafc", border: "1px solid #eef0f3", borderRadius: 12, padding: 16 }}>
                          <div style={{ fontWeight: 700, fontSize: 13, color: "#1a2332", marginBottom: 12 }}>Sale vs Rent</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {[
                              { label: "For Sale", value: adTypes.resale || 0, color: "#3B82F6" },
                              { label: "For Rent", value: adTypes.rent || 0, color: "#10B981" },
                            ].map(({ label, value, color }) => {
                              const total = (adTypes.resale || 0) + (adTypes.rent || 0);
                              const pct = total > 0 ? Math.round((value / total) * 100) : 0;
                              return (
                                <div key={label}>
                                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#555", marginBottom: 4 }}>
                                    <span style={{ fontWeight: 600 }}>{label}</span>
                                    <span>{value} ({pct}%)</span>
                                  </div>
                                  <div style={{ height: 5, background: "#eee", borderRadius: 3 }}>
                                    <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3 }} />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {marketData.insights && (
                      <div style={{ background: "#ECFDF5", border: "1px solid #10B981", borderRadius: 12, padding: 16 }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#10B981", marginBottom: 8 }}>AI Market Insights</div>
                        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{marketData.insights}</div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </>
          )}

          {/* ── CRM Leads Tab ── */}
          {activeTab === "leads" && (
            <LeadsTab leads={leads} loading={loading} propertyCount={propertyCount} />
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
