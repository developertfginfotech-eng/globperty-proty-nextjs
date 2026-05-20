"use client";
import React, { useEffect, useState, useCallback } from "react";
import apiClient from "@/utils/apiClient";

const LEAD_STATUSES = ["New","Contacted","Visit Scheduled","Offer Received","Negotiating","Closed","Lost"];
const STATUS_COLORS = {
  "New":              { bg:"#EFF6FF", color:"#3B82F6" },
  "Contacted":        { bg:"#FFF7ED", color:"#f0822d" },
  "Visit Scheduled":  { bg:"#F5F3FF", color:"#8B5CF6" },
  "Offer Received":   { bg:"#ECFDF5", color:"#10B981" },
  "Negotiating":      { bg:"#FEF3C7", color:"#D97706" },
  "Closed":           { bg:"#D1FAE5", color:"#065F46" },
  "Lost":             { bg:"#FEF2F2", color:"#EF4444" },
};
const SOURCE_COLORS = {
  "Inquiry": { bg:"#EFF6FF", color:"#3B82F6" },
  "Saved":   { bg:"#F5F3FF", color:"#8B5CF6" },
  "Visit":   { bg:"#FFF7ED", color:"#f0822d" },
  "Offer":   { bg:"#ECFDF5", color:"#10B981" },
};

function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
}
function timeAgo(d) {
  if (!d) return "—";
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s/60)}m ago`;
  if (s < 86400) return `${Math.floor(s/3600)}h ago`;
  return `${Math.floor(s/86400)}d ago`;
}

function Chip({ label, colors }) {
  const s = colors || { bg:"#F3F4F6", color:"#6B7280" };
  return (
    <span style={{ background:s.bg, color:s.color, fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:20, display:"inline-block", whiteSpace:"nowrap" }}>
      {label}
    </span>
  );
}

function StatCard({ label, value, color, bg }) {
  return (
    <div style={{ background:bg||"#F8FAFC", borderRadius:12, padding:"16px 20px", borderLeft:`3px solid ${color}`, flex:1, minWidth:120 }}>
      <div style={{ fontSize:22, fontWeight:800, color }}>{value}</div>
      <div style={{ fontSize:12, color:"#888", marginTop:2 }}>{label}</div>
    </div>
  );
}

// ─── Lead Pipeline Tab ────────────────────────────────────────────────────────
function LeadPipeline({ leads, loading, crm, onUpdateCrm, saving }) {
  const [expandedKey, setExpandedKey] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [reminderInput, setReminderInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const openExpand = (key) => {
    if (expandedKey === key) { setExpandedKey(null); return; }
    const d = crm[key] || {};
    setNoteInput(d.note || "");
    setReminderInput(d.reminder ? new Date(d.reminder).toISOString().slice(0,16) : "");
    setExpandedKey(key);
  };

  const filtered = leads.filter((l) => {
    const d = crm[l.key] || {};
    const status = d.status || "New";
    if (filter !== "All" && status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || (l.propertyName||"").toLowerCase().includes(q);
    }
    return true;
  });

  const counts = {};
  leads.forEach((l) => {
    const s = (crm[l.key] || {}).status || "New";
    counts[s] = (counts[s] || 0) + 1;
  });
  const hot = (counts["Negotiating"]||0) + (counts["Offer Received"]||0);

  if (loading) return <div style={{ padding:60, textAlign:"center", color:"#aaa" }}>Loading leads…</div>;

  return (
    <>
      {/* Stats */}
      <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
        <StatCard label="Total Leads" value={leads.length} color="#3B82F6" bg="#EFF6FF" />
        <StatCard label="New" value={counts["New"]||0} color="#f0822d" bg="#FFF7ED" />
        <StatCard label="Hot (Negotiating)" value={hot} color="#D97706" bg="#FEF3C7" />
        <StatCard label="Closed" value={counts["Closed"]||0} color="#10B981" bg="#ECFDF5" />
      </div>

      {/* Filters row */}
      <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, property…"
          style={{ flex:1, minWidth:180, padding:"8px 14px", border:"1px solid #e0e3e8", borderRadius:8, fontSize:13, outline:"none" }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding:"8px 14px", border:"1px solid #e0e3e8", borderRadius:8, fontSize:13, outline:"none", background:"#fff", cursor:"pointer" }}
        >
          <option value="All">All Statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s} {counts[s]?`(${counts[s]})`:""}</option>)}
        </select>
      </div>

      {filtered.length === 0 && (
        <div style={{ padding:40, textAlign:"center", color:"#aaa", fontSize:14 }}>
          {leads.length === 0 ? "No leads yet. They appear when buyers inquire, save, or visit your properties." : "No leads match your filter."}
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {filtered.map((lead) => {
          const d = crm[lead.key] || {};
          const status = d.status || "New";
          const sc = STATUS_COLORS[status] || STATUS_COLORS["New"];
          const isOpen = expandedKey === lead.key;
          const hasReminder = d.reminder && !d.reminderFired && new Date(d.reminder) > new Date();
          const isSaving = saving[lead.key];

          return (
            <div key={lead.key} style={{ background:"#fff", border:"1px solid #eef0f3", borderRadius:12, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              {/* Row */}
              <div
                onClick={() => openExpand(lead.key)}
                style={{ padding:"14px 18px", display:"flex", alignItems:"center", gap:12, flexWrap:"wrap", cursor:"pointer", transition:"background 0.15s" }}
              >
                {/* Avatar */}
                <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#f0822d,#e56c1a)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:14, fontWeight:800, color:"#fff" }}>{(lead.name||"?")[0].toUpperCase()}</span>
                </div>

                {/* Name + email */}
                <div style={{ minWidth:140, flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:13, color:"#1a2332" }}>{lead.name}</div>
                  <div style={{ fontSize:11, color:"#aaa" }}>{lead.email}</div>
                </div>

                {/* Property */}
                <div style={{ fontSize:12, color:"#555", minWidth:100, flex:1 }}>{lead.propertyName || "—"}</div>

                {/* Sources */}
                <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                  {(lead.sources || lead.interactions || []).map((src) => (
                    <Chip key={src} label={src} colors={SOURCE_COLORS[src]} />
                  ))}
                </div>

                {/* Status dropdown */}
                <select
                  value={status}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => { e.stopPropagation(); onUpdateCrm(lead.key, { status: e.target.value }); }}
                  style={{ fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:20, border:"none", background:sc.bg, color:sc.color, cursor:"pointer", outline:"none" }}
                >
                  {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>

                {/* Reminder badge */}
                {hasReminder && (
                  <span style={{ fontSize:10, background:"#FFF7ED", color:"#f0822d", padding:"2px 8px", borderRadius:20, fontWeight:700, flexShrink:0 }}>
                    🔔 {new Date(d.reminder).toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                  </span>
                )}

                <span style={{ fontSize:11, color:"#bbb", flexShrink:0 }}>{timeAgo(lead.lastSeen)}</span>
                <span style={{ fontSize:14, color:"#ccc" }}>{isOpen ? "▲" : "▼"}</span>
              </div>

              {/* Expanded panel */}
              {isOpen && (
                <div style={{ borderTop:"1px solid #f0f0f0", padding:"16px 18px", background:"#fafafa", display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  {/* Notes */}
                  <div>
                    <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:6 }}>Lead Notes</label>
                    <textarea
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      placeholder="e.g. 'wants possession by March', 'offered 10% below asking'…"
                      rows={3}
                      style={{ width:"100%", fontSize:12, padding:"8px 10px", border:"1px solid #e0e3e8", borderRadius:8, resize:"vertical", outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}
                    />
                    <button
                      onClick={() => onUpdateCrm(lead.key, { note: noteInput })}
                      disabled={isSaving}
                      style={{ marginTop:6, fontSize:12, fontWeight:700, background: isSaving?"#e0e3e8":"#f0822d", color:"#fff", border:"none", borderRadius:6, padding:"5px 14px", cursor: isSaving?"not-allowed":"pointer" }}
                    >
                      {isSaving ? "Saving…" : "Save Note"}
                    </button>
                    {d.note && (
                      <div style={{ marginTop:8, fontSize:12, color:"#555", fontStyle:"italic", background:"#fff", border:"1px solid #eee", borderRadius:6, padding:"6px 10px" }}>
                        {d.note}
                      </div>
                    )}
                  </div>

                  {/* Reminder */}
                  <div>
                    <label style={{ fontSize:12, fontWeight:700, color:"#555", display:"block", marginBottom:6 }}>Follow-up Reminder</label>
                    <input
                      type="datetime-local"
                      value={reminderInput}
                      onChange={(e) => setReminderInput(e.target.value)}
                      style={{ width:"100%", fontSize:12, padding:"8px 10px", border:"1px solid #e0e3e8", borderRadius:8, outline:"none", boxSizing:"border-box" }}
                    />
                    <button
                      onClick={() => onUpdateCrm(lead.key, { reminder: reminderInput || null, reminderFired: false })}
                      disabled={isSaving}
                      style={{ marginTop:6, fontSize:12, fontWeight:700, background: isSaving?"#e0e3e8":"#8B5CF6", color:"#fff", border:"none", borderRadius:6, padding:"5px 14px", cursor: isSaving?"not-allowed":"pointer" }}
                    >
                      {isSaving ? "Saving…" : "Set Reminder"}
                    </button>
                    {d.reminder && (
                      <div style={{ marginTop:8, fontSize:12, color:"#8B5CF6", fontWeight:600 }}>
                        🔔 {new Date(d.reminder).toLocaleString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}
                        {d.reminderFired && <span style={{ marginLeft:6, color:"#10B981" }}>✓ Fired</span>}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── Enquiry Inbox Tab ────────────────────────────────────────────────────────
function EnquiryInbox() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [replyId, setReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    Promise.allSettled([
      apiClient.get("/inquiries"),
      apiClient.get("/tours/my-tours"),
      apiClient.get("/offers/received"),
    ]).then(([inqRes, tourRes, offerRes]) => {
      const inqs = (inqRes.status==="fulfilled" ? (inqRes.value.data?.data || inqRes.value.data) : []) || [];
      const tours = (tourRes.status==="fulfilled" ? (tourRes.value.data?.tours || tourRes.value.data?.data || tourRes.value.data) : []) || [];
      const offers = (offerRes.status==="fulfilled" ? (offerRes.value.data?.data || offerRes.value.data) : []) || [];

      const merged = [
        ...(Array.isArray(inqs) ? inqs : []).map((i) => ({ ...i, _type:"Inquiry", _at: i.updatedAt || i.createdAt })),
        ...(Array.isArray(tours) ? tours : []).map((t) => ({ ...t, _type:"Visit", _at: t.updatedAt || t.createdAt })),
        ...(Array.isArray(offers) ? offers : []).map((o) => ({ ...o, _type:"Offer", _at: o.updatedAt || o.createdAt })),
      ].sort((a,b) => new Date(b._at) - new Date(a._at));

      setItems(merged);
    }).finally(() => setLoading(false));
  }, []);

  const sendReply = async (id) => {
    if (!replyText.trim()) return;
    setReplying(true);
    try {
      await apiClient.post(`/inquiries/${id}/message`, { content: replyText });
      setReplyText("");
      setReplyId(null);
    } catch {}
    setReplying(false);
  };

  const filtered = filter === "All" ? items : items.filter((i) => i._type === filter);
  const typeCounts = { Inquiry: 0, Visit: 0, Offer: 0 };
  items.forEach((i) => { typeCounts[i._type] = (typeCounts[i._type]||0) + 1; });

  const typeColors = { Inquiry:"#3B82F6", Visit:"#f0822d", Offer:"#10B981" };
  const typeBgs   = { Inquiry:"#EFF6FF", Visit:"#FFF7ED", Offer:"#ECFDF5" };

  if (loading) return <div style={{ padding:60, textAlign:"center", color:"#aaa" }}>Loading inbox…</div>;

  return (
    <>
      {/* Filter tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {["All","Inquiry","Visit","Offer"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding:"7px 18px", borderRadius:20, border:"none", fontSize:13, fontWeight:700, cursor:"pointer",
              background: filter===t ? "#f0822d" : "#f3f4f6",
              color: filter===t ? "#fff" : "#555",
            }}
          >
            {t} {t!=="All" && `(${typeCounts[t]||0})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding:40, textAlign:"center", color:"#aaa" }}>No items in this category.</div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {filtered.map((item) => {
          const col = typeColors[item._type] || "#6B7280";
          const bg  = typeBgs[item._type]  || "#F3F4F6";
          const isExpanded = replyId === item._id;

          // Extract display fields based on type
          let who = "", what = "", status = "", lastMsg = "";
          if (item._type === "Inquiry") {
            who = item.inquirerName || item.buyerId?.name || "Buyer";
            what = item.propertyId?.propertyName || item.propertyTitle || "Property";
            status = item.status || "open";
            const msgs = item.messages || [];
            lastMsg = msgs.length ? msgs[msgs.length-1].content : "";
          } else if (item._type === "Visit") {
            who = item.buyerName || item.buyerId?.name || "Buyer";
            what = item.propertyId?.propertyName || item.propertyName || "Property";
            status = item.status || "pending";
          } else if (item._type === "Offer") {
            who = item.buyerId?.name || "Buyer";
            what = item.propertyId?.propertyName || "Property";
            status = item.status || "pending";
            lastMsg = item.price ? `$${Number(item.price).toLocaleString()}` : "";
          }

          return (
            <div key={`${item._type}_${item._id}`} style={{ background:"#fff", border:"1px solid #eef0f3", borderRadius:12, overflow:"hidden" }}>
              <div
                onClick={() => { setReplyId(isExpanded ? null : item._id); setReplyText(""); }}
                style={{ padding:"12px 16px", display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer" }}
              >
                {/* Type chip */}
                <span style={{ background:bg, color:col, fontSize:10, fontWeight:800, padding:"3px 8px", borderRadius:20, flexShrink:0, marginTop:2 }}>
                  {item._type.toUpperCase()}
                </span>

                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontWeight:700, fontSize:13, color:"#1a2332" }}>{who}</span>
                    <span style={{ fontSize:11, color:"#bbb" }}>{timeAgo(item._at)}</span>
                  </div>
                  <div style={{ fontSize:12, color:"#888", marginTop:1 }}>{what}</div>
                  {lastMsg && <div style={{ fontSize:12, color:"#aaa", marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{lastMsg}</div>}
                </div>

                <span style={{
                  fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20, flexShrink:0,
                  background: status==="replied"||status==="confirmed"||status==="accepted" ? "#ECFDF5" : status==="rejected"||status==="cancelled" ? "#FEF2F2" : "#FFF7ED",
                  color: status==="replied"||status==="confirmed"||status==="accepted" ? "#10B981" : status==="rejected"||status==="cancelled" ? "#EF4444" : "#f0822d",
                  textTransform:"capitalize",
                }}>
                  {status}
                </span>
              </div>

              {/* Inline reply (inquiries only) */}
              {isExpanded && item._type === "Inquiry" && (
                <div style={{ borderTop:"1px solid #f0f0f0", padding:"12px 16px", background:"#fafafa" }}>
                  {/* Show thread */}
                  {(item.messages||[]).slice(-3).map((m,i) => (
                    <div key={i} style={{ marginBottom:8, display:"flex", gap:8 }}>
                      <span style={{ fontSize:11, fontWeight:700, color: m.sender==="agent"?"#f0822d":"#3B82F6", minWidth:48, flexShrink:0 }}>
                        {m.sender==="agent"?"You":"Buyer"}:
                      </span>
                      <span style={{ fontSize:12, color:"#555", lineHeight:1.5 }}>{m.content}</span>
                    </div>
                  ))}
                  <div style={{ display:"flex", gap:8, marginTop:8 }}>
                    <input
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => e.key==="Enter" && sendReply(item._id)}
                      placeholder="Type a reply…"
                      style={{ flex:1, padding:"8px 12px", border:"1px solid #e0e3e8", borderRadius:8, fontSize:13, outline:"none" }}
                    />
                    <button
                      onClick={() => sendReply(item._id)}
                      disabled={replying || !replyText.trim()}
                      style={{ background: replying||!replyText.trim()?"#e0e3e8":"#f0822d", color:"#fff", border:"none", borderRadius:8, padding:"0 16px", fontSize:13, fontWeight:700, cursor:"pointer" }}
                    >
                      {replying ? "…" : "Send"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── Admin Panel Tab ──────────────────────────────────────────────────────────
function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("users");

  useEffect(() => {
    Promise.allSettled([
      apiClient.get("/auth/admin/users"),
      apiClient.get("/property/admin/pending"),
    ]).then(([uRes, lRes]) => {
      const u = uRes.status==="fulfilled" ? (uRes.value.data?.users || uRes.value.data?.data || uRes.value.data) : [];
      const l = lRes.status==="fulfilled" ? (lRes.value.data?.properties || lRes.value.data?.data || lRes.value.data) : [];
      setUsers(Array.isArray(u) ? u : []);
      setListings(Array.isArray(l) ? l : []);
    }).finally(() => setLoading(false));
  }, []);

  const approve = async (id) => {
    await apiClient.put(`/property/admin/approve/${id}`);
    setListings((p) => p.filter((l) => l._id !== id));
  };
  const reject = async (id) => {
    await apiClient.put(`/property/admin/reject/${id}`);
    setListings((p) => p.filter((l) => l._id !== id));
  };
  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    await apiClient.delete(`/auth/admin/users/${id}`);
    setUsers((p) => p.filter((u) => u._id !== id));
  };

  if (loading) return <div style={{ padding:60, textAlign:"center", color:"#aaa" }}>Loading admin data…</div>;

  return (
    <>
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {[["users","Users"], ["listings","Pending Listings"]].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)}
            style={{ padding:"7px 18px", borderRadius:20, border:"none", fontSize:13, fontWeight:700, cursor:"pointer", background:tab===k?"#f0822d":"#f3f4f6", color:tab===k?"#fff":"#555" }}>
            {l}
          </button>
        ))}
      </div>

      {tab === "users" && (
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background:"#f8fafc" }}>
                {["Name","Email","Role","Joined","Action"].map((h) => (
                  <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontWeight:700, color:"#555", borderBottom:"1px solid #eef0f3" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom:"1px solid #f5f5f5" }}>
                  <td style={{ padding:"10px 14px", fontWeight:600 }}>{u.name}</td>
                  <td style={{ padding:"10px 14px", color:"#888" }}>{u.email}</td>
                  <td style={{ padding:"10px 14px" }}>
                    <span style={{ fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:20, background: u.role==="admin"?"#FEF3C7": u.role==="agent"?"#EFF6FF":"#F5F3FF", color: u.role==="admin"?"#D97706": u.role==="agent"?"#3B82F6":"#8B5CF6" }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding:"10px 14px", color:"#aaa" }}>{fmtDate(u.createdAt)}</td>
                  <td style={{ padding:"10px 14px" }}>
                    <button onClick={() => deleteUser(u._id)} style={{ fontSize:11, color:"#EF4444", background:"#FEF2F2", border:"1px solid #fecaca", borderRadius:6, padding:"3px 10px", cursor:"pointer", fontWeight:600 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "listings" && (
        listings.length === 0 ? (
          <div style={{ padding:40, textAlign:"center", color:"#aaa" }}>No pending listings.</div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {listings.map((l) => (
              <div key={l._id} style={{ background:"#fff", border:"1px solid #eef0f3", borderRadius:10, padding:"14px 18px", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                <div style={{ flex:1, minWidth:140 }}>
                  <div style={{ fontWeight:700, fontSize:13, color:"#1a2332" }}>{l.propertyName||l.title||"Untitled"}</div>
                  <div style={{ fontSize:12, color:"#888" }}>{l.city}, {l.country} · ${Number(l.price||0).toLocaleString()}</div>
                  <div style={{ fontSize:11, color:"#bbb" }}>{l.userId?.name||"Unknown seller"} · {fmtDate(l.createdAt)}</div>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => approve(l._id)} style={{ fontSize:12, fontWeight:700, background:"#ECFDF5", color:"#10B981", border:"1px solid #bbf7d0", borderRadius:8, padding:"6px 14px", cursor:"pointer" }}>Approve</button>
                  <button onClick={() => reject(l._id)} style={{ fontSize:12, fontWeight:700, background:"#FEF2F2", color:"#EF4444", border:"1px solid #fecaca", borderRadius:8, padding:"6px 14px", cursor:"pointer" }}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </>
  );
}

// ─── Main CRM Component ───────────────────────────────────────────────────────
export default function CRM() {
  const [role, setRole] = useState("");
  const [activeTab, setActiveTab] = useState("leads");
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [crm, setCrm] = useState({});
  const [saving, setSaving] = useState({});

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      setRole(u.role || "");
    } catch {}
  }, []);

  // Fetch leads from backend
  useEffect(() => {
    Promise.allSettled([
      apiClient.get("/property/agent/properties"),
      apiClient.get("/inquiries"),
      apiClient.get("/favorites/my-properties"),
      apiClient.get("/tours/my-tours"),
      apiClient.get("/offers/received"),
      apiClient.get("/leads/meta"),
    ]).then(([propsRes, inqRes, favsRes, toursRes, offersRes, metaRes]) => {
      const props = extractArr(propsRes, ["properties","data"]);
      const inqs  = extractArr(inqRes,  ["data","inquiries"]);
      const favs  = extractArr(favsRes, ["favorites","data"]);
      const tours = extractArr(toursRes,["tours","data"]);
      const offrs = extractArr(offersRes,["data","offers"]);

      // Load CRM metadata
      const meta = metaRes.status==="fulfilled" ? (metaRes.value.data?.data || {}) : {};
      setCrm(meta);

      const propMap = {};
      props.forEach((p) => { propMap[p._id] = p.propertyName || p.title || "—"; });

      const leadsMap = {};
      const addLead = (item, src) => {
        const buyer = item.buyerId || item.userId || item.user || {};
        const key = (typeof buyer==="object" ? (buyer.email||buyer._id) : buyer) || item.email || item.inquirerEmail || "unknown";
        if (!leadsMap[key]) {
          leadsMap[key] = {
            key,
            name: buyer.name || buyer.fullName || item.inquirerName || item.buyerName || "Unknown",
            email: buyer.email || item.email || item.inquirerEmail || key,
            propertyName: propMap[item.propertyId?._id || item.propertyId] || item.propertyId?.propertyName || item.propertyName || "—",
            sources: [],
            lastSeen: item.updatedAt || item.createdAt,
          };
        }
        if (!leadsMap[key].sources.includes(src)) leadsMap[key].sources.push(src);
        const t = item.updatedAt || item.createdAt;
        if (t > leadsMap[key].lastSeen) leadsMap[key].lastSeen = t;
      };

      inqs.forEach((i)  => addLead(i, "Inquiry"));
      favs.forEach((f)  => addLead(f, "Saved"));
      tours.forEach((t) => addLead(t, "Visit"));
      offrs.forEach((o) => addLead(o, "Offer"));

      setLeads(Object.values(leadsMap).sort((a,b) => (b.lastSeen||"") > (a.lastSeen||"") ? 1 : -1));
    }).finally(() => setLeadsLoading(false));
  }, []);

  const updateCrm = async (key, patch) => {
    setCrm((prev) => ({ ...prev, [key]: { ...(prev[key]||{}), ...patch } }));
    setSaving((s) => ({ ...s, [key]: true }));
    try {
      await apiClient.put(`/leads/meta/${encodeURIComponent(key)}`, patch);
    } catch {}
    setSaving((s) => ({ ...s, [key]: false }));
  };

  const tabBtn = (key, label) => (
    <button
      onClick={() => setActiveTab(key)}
      style={{ padding:"8px 22px", borderRadius:20, border:"none", fontSize:14, fontWeight:700, cursor:"pointer", background:activeTab===key?"#f0822d":"#f3f4f6", color:activeTab===key?"#fff":"#555", transition:"0.2s" }}
    >
      {label}
    </button>
  );

  if (role === "buyer" || role === "user") {
    return (
      <div className="main-content w-100">
        <div className="main-content-inner">
          <div className="widget-box-2 wd-listing" style={{ padding:60, textAlign:"center", color:"#aaa" }}>
            CRM is available for sellers, agents, brokers, and admins.
          </div>
        </div>
        <div className="overlay-dashboard" />
      </div>
    );
  }

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
            <h3 className="title" style={{ margin:0 }}>CRM Dashboard</h3>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {tabBtn("leads", "Lead Pipeline")}
              {tabBtn("inbox", "Enquiry Inbox")}
              {role === "admin" && tabBtn("admin", "Admin Panel")}
            </div>
          </div>

          {activeTab === "leads" && (
            <LeadPipeline
              leads={leads}
              loading={leadsLoading}
              crm={crm}
              onUpdateCrm={updateCrm}
              saving={saving}
            />
          )}
          {activeTab === "inbox" && <EnquiryInbox />}
          {activeTab === "admin" && role === "admin" && <AdminPanel />}
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

// Helper to extract array from various API response shapes
function extractArr(res, keys) {
  if (res.status !== "fulfilled") return [];
  const d = res.value.data;
  for (const k of keys) { if (Array.isArray(d?.[k])) return d[k]; }
  return Array.isArray(d) ? d : [];
}
