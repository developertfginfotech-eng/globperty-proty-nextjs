"use client";
import React, { useEffect, useState, useCallback } from "react";
import apiClient from "@/utils/apiClient";

const LEAD_STATUSES = ["New","Contacted","Visit Scheduled","Offer Received","Negotiating","Closed","Lost"];
const STATUS_COLORS = {
  "New":             { bg:"#EFF6FF", color:"#3B82F6", dot:"#3B82F6" },
  "Contacted":       { bg:"#FFF7ED", color:"#f0822d", dot:"#f0822d" },
  "Visit Scheduled": { bg:"#F5F3FF", color:"#8B5CF6", dot:"#8B5CF6" },
  "Offer Received":  { bg:"#ECFDF5", color:"#10B981", dot:"#10B981" },
  "Negotiating":     { bg:"#FEF3C7", color:"#D97706", dot:"#D97706" },
  "Closed":          { bg:"#D1FAE5", color:"#065F46", dot:"#10B981" },
  "Lost":            { bg:"#FEF2F2", color:"#EF4444", dot:"#EF4444" },
};
const SOURCE_COLORS = {
  "Lead":   { bg:"#EFF6FF", color:"#3B82F6" },
  "Saved":  { bg:"#F5F3FF", color:"#8B5CF6" },
  "Visit":  { bg:"#FFF7ED", color:"#f0822d" },
  "Offer":  { bg:"#ECFDF5", color:"#10B981" },
  "Manual": { bg:"#F3F4F6", color:"#6B7280" },
};

const EMAIL_TEMPLATES = [
  {
    id: "intro",
    label: "Introduction",
    subject: "Hello from {agentName} — {propertyName}",
    body: `Hi {leadName},\n\nThank you for your interest in {propertyName}. My name is {agentName} and I'm here to help you through every step of the process.\n\nI'd love to schedule a quick call or property visit at your convenience. Please let me know what works best for you.\n\nBest regards,\n{agentName}`,
  },
  {
    id: "followup",
    label: "Follow-up Check-in",
    subject: "Following up — {propertyName}",
    body: `Hi {leadName},\n\nI wanted to follow up on your enquiry about {propertyName}. Have you had a chance to consider it further?\n\nI'm happy to answer any questions or arrange a viewing at a time that suits you.\n\nLooking forward to hearing from you.\n\nBest regards,\n{agentName}`,
  },
  {
    id: "visit",
    label: "Schedule a Visit",
    subject: "Let's schedule a visit — {propertyName}",
    body: `Hi {leadName},\n\nI'd like to invite you for an in-person viewing of {propertyName}. Seeing the property firsthand will give you a much better feel for it.\n\nCould you let me know your preferred date and time? I'm flexible and happy to accommodate your schedule.\n\nBest regards,\n{agentName}`,
  },
  {
    id: "offer",
    label: "Offer Follow-up",
    subject: "Update on your offer — {propertyName}",
    body: `Hi {leadName},\n\nI wanted to give you an update regarding the offer on {propertyName}. We are currently reviewing it and I will keep you posted on any developments.\n\nDo not hesitate to reach out if you have questions or wish to discuss your position further.\n\nBest regards,\n{agentName}`,
  },
  {
    id: "closing",
    label: "Closing Nudge",
    subject: "Don't miss out — {propertyName}",
    body: `Hi {leadName},\n\nI just wanted to let you know that there has been renewed interest in {propertyName}. I would not want you to miss out on this opportunity.\n\nIf you are still interested, now would be a great time to move forward. I am here to guide you.\n\nBest regards,\n{agentName}`,
  },
];

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
function fillTemplate(str, vars) {
  return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] || `{${k}}`);
}

function Chip({ label, colors }) {
  const s = colors || { bg:"#F3F4F6", color:"#6B7280" };
  return (
    <span style={{ background:s.bg, color:s.color, fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:20, display:"inline-block", whiteSpace:"nowrap" }}>
      {label}
    </span>
  );
}

// ─── Follow-up Email Modal ────────────────────────────────────────────────────
function EmailModal({ lead, agentName, onClose }) {
  const [templateId, setTemplateId] = useState("intro");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const vars = { leadName: lead.name, propertyName: lead.propertyName || "the property", agentName: agentName || "Agent" };

  useEffect(() => {
    const tpl = EMAIL_TEMPLATES.find((t) => t.id === templateId);
    if (tpl) {
      setSubject(fillTemplate(tpl.subject, vars));
      setBody(fillTemplate(tpl.body, vars));
    }
  }, [templateId, lead.name, lead.propertyName, agentName]);

  const openGmail = () => {
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openMailto = () => {
    const a = document.createElement("a");
    a.href = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    a.click();
  };

  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:9998 }} />
      <div style={{ position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)", zIndex:9999, background:"#fff", borderRadius:16, padding:"28px 28px 24px", width:"100%", maxWidth:560, boxShadow:"0 24px 60px rgba(0,0,0,0.18)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <div>
            <h4 style={{ margin:0, fontWeight:800, fontSize:16, color:"#1a2332" }}>Send Follow-up Email</h4>
            <p style={{ margin:"3px 0 0", fontSize:12, color:"#9ca3af" }}>To: {lead.name} · {lead.email}</p>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#9ca3af", lineHeight:1 }}>✕</button>
        </div>

        {/* Template picker */}
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.6px", display:"block", marginBottom:8 }}>Email Template</label>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {EMAIL_TEMPLATES.map((t) => (
              <button key={t.id} onClick={() => setTemplateId(t.id)}
                style={{ padding:"5px 12px", borderRadius:20, fontSize:12, fontWeight:600, cursor:"pointer", border:"1.5px solid", borderColor: templateId===t.id ? "#f0822d" : "#e5e7eb", background: templateId===t.id ? "rgba(240,130,45,0.08)" : "#fff", color: templateId===t.id ? "#f0822d" : "#6b7280" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subject */}
        <div style={{ marginBottom:12 }}>
          <label style={{ fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.6px", display:"block", marginBottom:6 }}>Subject</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)}
            style={{ width:"100%", padding:"10px 14px", border:"1.5px solid #e5e7eb", borderRadius:10, fontSize:13, outline:"none", boxSizing:"border-box" }} />
        </div>

        {/* Body */}
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.6px", display:"block", marginBottom:6 }}>Message</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={7}
            style={{ width:"100%", padding:"10px 14px", border:"1.5px solid #e5e7eb", borderRadius:10, fontSize:13, outline:"none", resize:"vertical", boxSizing:"border-box", fontFamily:"inherit", lineHeight:1.6 }} />
        </div>

        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", flexWrap:"wrap" }}>
          <button onClick={onClose} style={{ padding:"10px 20px", border:"1.5px solid #e5e7eb", borderRadius:10, background:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", color:"#6b7280" }}>Cancel</button>
          <button onClick={openMailto}
            style={{ padding:"10px 18px", border:"1.5px solid #e5e7eb", borderRadius:10, background:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", color:"#6b7280", display:"flex", alignItems:"center", gap:6 }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email App
          </button>
          <button onClick={openGmail}
            style={{ padding:"10px 24px", background:"linear-gradient(135deg,#f0822d,#e56c1a)", color:"#fff", border:"none", borderRadius:10, fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Open in Gmail
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Add Lead Modal ───────────────────────────────────────────────────────────
function AddLeadModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", propertyName:"", source:"Manual", status:"New", note:"" });
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    onAdd(form);
    onClose();
  };

  const inputStyle = { width:"100%", padding:"10px 14px", border:"1.5px solid #e5e7eb", borderRadius:10, fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };
  const labelStyle = { fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.6px", display:"block", marginBottom:6 };

  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:9998 }} />
      <div style={{ position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)", zIndex:9999, background:"#fff", borderRadius:16, padding:"28px", width:"100%", maxWidth:500, boxShadow:"0 24px 60px rgba(0,0,0,0.18)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
          <h4 style={{ margin:0, fontWeight:800, fontSize:17, color:"#1a2332" }}>Add Lead Manually</h4>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#9ca3af" }}>✕</button>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
          <div>
            <label style={labelStyle}>Full Name *</label>
            <input value={form.name} onChange={set("name")} placeholder="John Smith" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email *</label>
            <input type="email" value={form.email} onChange={set("email")} placeholder="john@email.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input value={form.phone} onChange={set("phone")} placeholder="+971 50 000 0000" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Property Interest</label>
            <input value={form.propertyName} onChange={set("propertyName")} placeholder="Property name or type" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Source</label>
            <select value={form.source} onChange={set("source")} style={{ ...inputStyle, appearance:"none" }}>
              {["Manual","Lead","Referral","Social Media","Walk-in","Cold Call"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Initial Status</label>
            <select value={form.status} onChange={set("status")} style={{ ...inputStyle, appearance:"none" }}>
              {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom:20 }}>
          <label style={labelStyle}>Notes</label>
          <textarea value={form.note} onChange={set("note")} rows={3} placeholder="Initial notes about this lead…"
            style={{ ...inputStyle, height:"auto", resize:"vertical", lineHeight:1.6 }} />
        </div>

        <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
          <button onClick={onClose} style={{ padding:"10px 20px", border:"1.5px solid #e5e7eb", borderRadius:10, background:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", color:"#6b7280" }}>Cancel</button>
          <button onClick={handleAdd} disabled={!form.name || !form.email}
            style={{ padding:"10px 24px", background: !form.name||!form.email ? "#d1d5db" : "linear-gradient(135deg,#f0822d,#e56c1a)", color:"#fff", border:"none", borderRadius:10, fontSize:13, fontWeight:700, cursor: !form.name||!form.email ? "not-allowed":"pointer" }}>
            Add Lead
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Lead Pipeline Tab ────────────────────────────────────────────────────────
function LeadPipeline({ leads, loading, crm, onUpdateCrm, saving, agentName, onAddLead }) {
  const [expandedKey, setExpandedKey] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [reminderInput, setReminderInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showEmail, setShowEmail] = useState(null);
  const [showAddLead, setShowAddLead] = useState(false);

  const openExpand = (key) => {
    if (expandedKey === key) { setExpandedKey(null); return; }
    const d = crm[key] || {};
    setNoteInput(d.note || "");
    setReminderInput(d.reminder ? new Date(d.reminder).toISOString().slice(0,16) : "");
    setExpandedKey(key);
  };

  const setQuickReminder = (key, days) => {
    const dt = new Date();
    dt.setDate(dt.getDate() + days);
    dt.setHours(9, 0, 0, 0);
    const iso = dt.toISOString().slice(0,16);
    setReminderInput(iso);
    onUpdateCrm(key, { reminder: iso, reminderFired: false });
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
  const pipelineStages = LEAD_STATUSES.filter((s) => s !== "Lost");

  if (loading) return <div style={{ padding:60, textAlign:"center", color:"#aaa" }}>Loading leads…</div>;

  return (
    <>
      {showEmail && <EmailModal lead={showEmail} agentName={agentName} onClose={() => setShowEmail(null)} />}
      {showAddLead && <AddLeadModal onClose={() => setShowAddLead(false)} onAdd={onAddLead} />}

      {/* Stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
        {[
          { label:"Total Leads", value:leads.length, color:"#3B82F6", bg:"#EFF6FF" },
          { label:"New", value:counts["New"]||0, color:"#f0822d", bg:"#FFF7ED" },
          { label:"Hot Leads", value:hot, color:"#D97706", bg:"#FEF3C7" },
          { label:"Closed Won", value:counts["Closed"]||0, color:"#10B981", bg:"#ECFDF5" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} style={{ background:bg, borderRadius:12, padding:"16px 18px", borderLeft:`3px solid ${color}` }}>
            <div style={{ fontSize:24, fontWeight:900, color, letterSpacing:"-1px" }}>{value}</div>
            <div style={{ fontSize:12, color:"#888", marginTop:2, fontWeight:600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline progress bar */}
      <div style={{ background:"#f8fafc", border:"1px solid #eef0f3", borderRadius:12, padding:"14px 18px", marginBottom:20 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:10 }}>Pipeline Overview</div>
        <div style={{ display:"flex", gap:4 }}>
          {pipelineStages.map((stage) => {
            const c = counts[stage] || 0;
            const total = leads.filter((l) => (crm[l.key]?.status||"New") !== "Lost").length || 1;
            const pct = Math.max(c / total * 100, c > 0 ? 4 : 0);
            const sc = STATUS_COLORS[stage];
            return (
              <div key={stage} onClick={() => setFilter(filter === stage ? "All" : stage)}
                style={{ flex: pct || 0.5, minWidth:0, cursor:"pointer", transition:"opacity 0.15s", opacity: filter !== "All" && filter !== stage ? 0.4 : 1 }}>
                <div style={{ height:8, background:sc.color, borderRadius:4, marginBottom:4, opacity: c > 0 ? 1 : 0.15 }} />
                <div style={{ fontSize:10, fontWeight:700, color:sc.color, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{stage}</div>
                <div style={{ fontSize:11, fontWeight:800, color:"#1a2332" }}>{c}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search + filter + add */}
      <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ flex:1, minWidth:180, position:"relative" }}>
          <svg style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }} width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, property…"
            style={{ width:"100%", padding:"9px 14px 9px 34px", border:"1.5px solid #e5e7eb", borderRadius:10, fontSize:13, outline:"none", boxSizing:"border-box" }} />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}
          style={{ padding:"9px 14px", border:"1.5px solid #e5e7eb", borderRadius:10, fontSize:13, outline:"none", background:"#fff", cursor:"pointer" }}>
          <option value="All">All Statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s} {counts[s]?`(${counts[s]})`:""}</option>)}
        </select>
        <button onClick={() => setShowAddLead(true)}
          style={{ padding:"9px 18px", background:"linear-gradient(135deg,#f0822d,#e56c1a)", color:"#fff", border:"none", borderRadius:10, fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6, whiteSpace:"nowrap" }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Lead
        </button>
      </div>

      {filtered.length === 0 && (
        <div style={{ padding:48, textAlign:"center", color:"#9ca3af", fontSize:14, background:"#f8fafc", borderRadius:12, border:"1px dashed #e5e7eb" }}>
          <div style={{ fontSize:32, marginBottom:10 }}>📋</div>
          {leads.length === 0
            ? "No leads yet. They appear when buyers enquire, save, or visit your properties. You can also add leads manually."
            : "No leads match your filter."}
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {filtered.map((lead) => {
          const d = crm[lead.key] || {};
          const status = d.status || "New";
          const sc = STATUS_COLORS[status] || STATUS_COLORS["New"];
          const isOpen = expandedKey === lead.key;
          const hasReminder = d.reminder && new Date(d.reminder) > new Date();
          const isSaving = saving[lead.key];
          const stageIdx = LEAD_STATUSES.indexOf(status);

          return (
            <div key={lead.key} style={{ background:"#fff", border:`1px solid ${isOpen ? "#f0822d33" : "#eef0f3"}`, borderRadius:14, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", transition:"border-color 0.2s" }}>
              {/* Lead row */}
              <div onClick={() => openExpand(lead.key)}
                style={{ padding:"14px 18px", display:"flex", alignItems:"center", gap:14, cursor:"pointer", flexWrap:"wrap" }}>
                {/* Status dot + avatar */}
                <div style={{ position:"relative", flexShrink:0 }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:`linear-gradient(135deg,${sc.dot},${sc.dot}88)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:16, fontWeight:800, color:"#fff" }}>{(lead.name||"?")[0].toUpperCase()}</span>
                  </div>
                </div>

                {/* Name + email */}
                <div style={{ minWidth:130, flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:"#1a2332" }}>{lead.name}</div>
                  <div style={{ fontSize:12, color:"#9ca3af" }}>{lead.email}</div>
                  {lead.phone && <div style={{ fontSize:11, color:"#9ca3af" }}>{lead.phone}</div>}
                </div>

                {/* Property */}
                <div style={{ fontSize:12, color:"#555", minWidth:100, flex:1 }}>
                  <div style={{ fontWeight:600, color:"#374151" }}>{lead.propertyName || "—"}</div>
                  <div style={{ fontSize:11, color:"#9ca3af", marginTop:1 }}>{timeAgo(lead.lastSeen)}</div>
                </div>

                {/* Sources */}
                <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                  {(lead.sources || []).map((src) => (
                    <Chip key={src} label={src} colors={SOURCE_COLORS[src]} />
                  ))}
                </div>

                {/* Status select */}
                <select value={status} onClick={(e) => e.stopPropagation()}
                  onChange={(e) => { e.stopPropagation(); onUpdateCrm(lead.key, { status: e.target.value }); }}
                  style={{ fontSize:11, fontWeight:700, padding:"5px 12px", borderRadius:20, border:`1.5px solid ${sc.dot}33`, background:sc.bg, color:sc.color, cursor:"pointer", outline:"none" }}>
                  {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>

                {/* Reminder badge */}
                {hasReminder && (
                  <span style={{ fontSize:10, background:"#FFF7ED", color:"#f0822d", padding:"3px 10px", borderRadius:20, fontWeight:700, flexShrink:0 }}>
                    🔔 {new Date(d.reminder).toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                  </span>
                )}

                {/* Actions */}
                <div style={{ display:"flex", gap:6, flexShrink:0 }} onClick={(e) => e.stopPropagation()}>
                  <a href={`mailto:${lead.email}`} title="Send email"
                    style={{ width:30, height:30, borderRadius:8, background:"#EFF6FF", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none" }}>
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </a>
                  <button onClick={() => setShowEmail(lead)} title="Follow-up template"
                    style={{ width:30, height:30, borderRadius:8, background:"#FFF7ED", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#f0822d" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  </button>
                  {lead.phone && (
                    <a href={`tel:${lead.phone}`} title="Call"
                      style={{ width:30, height:30, borderRadius:8, background:"#ECFDF5", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none" }}>
                      <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v3-.08z"/></svg>
                    </a>
                  )}
                </div>

                <span style={{ fontSize:13, color:"#d1d5db", flexShrink:0 }}>{isOpen ? "▲" : "▼"}</span>
              </div>

              {/* Pipeline stage bar */}
              {isOpen && (
                <div style={{ padding:"0 18px 0", background:"#fafbfc", borderTop:"1px solid #f5f5f5" }}>
                  <div style={{ display:"flex", gap:0, marginTop:12, marginBottom:12 }}>
                    {LEAD_STATUSES.filter((s) => s !== "Lost").map((s, i) => {
                      const active = LEAD_STATUSES.indexOf(status);
                      const isActive = i <= active && status !== "Lost";
                      const isCurrent = s === status;
                      const sc2 = STATUS_COLORS[s];
                      return (
                        <div key={s} onClick={() => onUpdateCrm(lead.key, { status: s })} title={s}
                          style={{ flex:1, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                          <div style={{ width:"100%", height:4, background: isActive ? "#f0822d" : "#e5e7eb", borderRadius: i===0?"4px 0 0 4px":i===5?"0 4px 4px 0":"0", transition:"background 0.2s" }} />
                          <div style={{ width:8, height:8, borderRadius:"50%", background: isCurrent ? "#f0822d" : isActive ? "#fed7aa" : "#e5e7eb", transition:"0.2s" }} />
                          <div style={{ fontSize:9, fontWeight:700, color: isCurrent ? "#f0822d" : "#9ca3af", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:70, textAlign:"center" }}>{s}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Expanded panel */}
              {isOpen && (
                <div style={{ borderTop:"1px solid #f0f0f0", padding:"18px 18px 20px", background:"#fafbfc", display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
                  {/* Notes */}
                  <div>
                    <label style={{ fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.6px", display:"block", marginBottom:8 }}>📝 Notes</label>
                    <textarea value={noteInput} onChange={(e) => setNoteInput(e.target.value)}
                      placeholder="e.g. 'Wants 3-bed, budget under $500k', 'Follow up after Eid'…"
                      rows={4}
                      style={{ width:"100%", fontSize:13, padding:"10px 12px", border:"1.5px solid #e5e7eb", borderRadius:10, resize:"none", outline:"none", boxSizing:"border-box", fontFamily:"inherit", lineHeight:1.6 }} />
                    <button onClick={() => onUpdateCrm(lead.key, { note: noteInput })} disabled={isSaving}
                      style={{ marginTop:8, fontSize:12, fontWeight:700, background: isSaving?"#e0e3e8":"#f0822d", color:"#fff", border:"none", borderRadius:8, padding:"7px 16px", cursor: isSaving?"not-allowed":"pointer", display:"flex", alignItems:"center", gap:6 }}>
                      {isSaving ? "Saving…" : "Save Note"}
                    </button>
                    {d.note && (
                      <div style={{ marginTop:10, fontSize:12, color:"#555", fontStyle:"italic", background:"#fff", border:"1px solid #eee", borderRadius:8, padding:"8px 12px", lineHeight:1.6 }}>
                        {d.note}
                      </div>
                    )}
                  </div>

                  {/* Follow-up reminder */}
                  <div>
                    <label style={{ fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.6px", display:"block", marginBottom:8 }}>🔔 Follow-up Reminder</label>

                    {/* Quick presets */}
                    <div style={{ display:"flex", gap:6, marginBottom:10, flexWrap:"wrap" }}>
                      {[["Tomorrow", 1], ["3 Days", 3], ["1 Week", 7], ["2 Weeks", 14]].map(([label, days]) => (
                        <button key={days} onClick={() => setQuickReminder(lead.key, days)}
                          style={{ fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:20, border:"1.5px solid #e5e7eb", background:"#fff", color:"#555", cursor:"pointer" }}>
                          {label}
                        </button>
                      ))}
                    </div>

                    <input type="datetime-local" value={reminderInput} onChange={(e) => setReminderInput(e.target.value)}
                      style={{ width:"100%", fontSize:13, padding:"9px 12px", border:"1.5px solid #e5e7eb", borderRadius:10, outline:"none", boxSizing:"border-box" }} />
                    <button onClick={() => onUpdateCrm(lead.key, { reminder: reminderInput || null, reminderFired: false })} disabled={isSaving}
                      style={{ marginTop:8, fontSize:12, fontWeight:700, background: isSaving?"#e0e3e8":"#8B5CF6", color:"#fff", border:"none", borderRadius:8, padding:"7px 16px", cursor: isSaving?"not-allowed":"pointer" }}>
                      {isSaving ? "Saving…" : "Set Reminder"}
                    </button>
                    {d.reminder && (
                      <div style={{ marginTop:10, fontSize:12, color:"#8B5CF6", fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
                        🔔 {new Date(d.reminder).toLocaleString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}
                        {d.reminderFired && <span style={{ color:"#10B981" }}>✓ Fired</span>}
                        <button onClick={() => onUpdateCrm(lead.key, { reminder: null })}
                          style={{ fontSize:10, color:"#ef4444", background:"none", border:"none", cursor:"pointer", padding:0, marginLeft:4 }}>Remove</button>
                      </div>
                    )}

                    {/* Follow-up email shortcut */}
                    <button onClick={() => setShowEmail(lead)}
                      style={{ marginTop:14, width:"100%", padding:"9px", border:"1.5px solid #fed7aa", borderRadius:10, background:"#FFF7ED", color:"#f0822d", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                      <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      Compose Follow-up Email
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
      apiClient.get("/leads"),
      apiClient.get("/tours/my-tours"),
      apiClient.get("/offers/received"),
    ]).then(([inqRes, tourRes, offerRes]) => {
      const inqs = (inqRes.status==="fulfilled" ? (inqRes.value.data?.data || inqRes.value.data) : []) || [];
      const tours = (tourRes.status==="fulfilled" ? (tourRes.value.data?.tours || tourRes.value.data?.data || tourRes.value.data) : []) || [];
      const offers = (offerRes.status==="fulfilled" ? (offerRes.value.data?.data || offerRes.value.data) : []) || [];

      const merged = [
        ...(Array.isArray(inqs) ? inqs : []).map((i) => ({ ...i, _type:"Lead", _at: i.updatedAt || i.createdAt })),
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
      await apiClient.post(`/leads/${id}/message`, { content: replyText });
      setReplyText("");
      setReplyId(null);
    } catch {}
    setReplying(false);
  };

  const filtered = filter === "All" ? items : items.filter((i) => i._type === filter);
  const typeCounts = { Lead: 0, Visit: 0, Offer: 0 };
  items.forEach((i) => { typeCounts[i._type] = (typeCounts[i._type]||0) + 1; });

  const typeColors = { Lead:"#3B82F6", Visit:"#f0822d", Offer:"#10B981" };
  const typeBgs   = { Lead:"#EFF6FF", Visit:"#FFF7ED", Offer:"#ECFDF5" };

  if (loading) return <div style={{ padding:60, textAlign:"center", color:"#aaa" }}>Loading inbox…</div>;

  return (
    <>
      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {["All","Lead","Visit","Offer"].map((t) => (
          <button key={t} onClick={() => setFilter(t)}
            style={{ padding:"8px 18px", borderRadius:20, border:"none", fontSize:13, fontWeight:700, cursor:"pointer", background: filter===t?"#f0822d":"#f3f4f6", color: filter===t?"#fff":"#555" }}>
            {t} {t!=="All" && `(${typeCounts[t]||0})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding:48, textAlign:"center", color:"#9ca3af", fontSize:14, background:"#f8fafc", borderRadius:12, border:"1px dashed #e5e7eb" }}>
          <div style={{ fontSize:32, marginBottom:10 }}>📬</div>
          No items in this category.
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {filtered.map((item) => {
          const col = typeColors[item._type] || "#6B7280";
          const bg  = typeBgs[item._type]  || "#F3F4F6";
          const isExpanded = replyId === item._id;

          let who = "", what = "", status = "", lastMsg = "";
          if (item._type === "Lead") {
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
            lastMsg = item.price ? `Offer: $${Number(item.price).toLocaleString()}` : "";
          }

          const statusBg = status==="replied"||status==="confirmed"||status==="accepted" ? "#ECFDF5" : status==="rejected"||status==="cancelled" ? "#FEF2F2" : "#FFF7ED";
          const statusColor = status==="replied"||status==="confirmed"||status==="accepted" ? "#10B981" : status==="rejected"||status==="cancelled" ? "#EF4444" : "#f0822d";

          return (
            <div key={`${item._type}_${item._id}`} style={{ background:"#fff", border:"1px solid #eef0f3", borderRadius:14, overflow:"hidden" }}>
              <div onClick={() => { setReplyId(isExpanded ? null : item._id); setReplyText(""); }}
                style={{ padding:"14px 18px", display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer" }}>
                <span style={{ background:bg, color:col, fontSize:10, fontWeight:800, padding:"4px 10px", borderRadius:20, flexShrink:0, marginTop:2 }}>
                  {item._type.toUpperCase()}
                </span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontWeight:700, fontSize:14, color:"#1a2332" }}>{who}</span>
                    <span style={{ fontSize:11, color:"#bbb" }}>{timeAgo(item._at)}</span>
                  </div>
                  <div style={{ fontSize:12, color:"#6b7280", marginTop:2 }}>{what}</div>
                  {lastMsg && <div style={{ fontSize:12, color:"#9ca3af", marginTop:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{lastMsg}</div>}
                </div>
                <span style={{ fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:20, flexShrink:0, background:statusBg, color:statusColor, textTransform:"capitalize" }}>{status}</span>
              </div>

              {isExpanded && item._type === "Lead" && (
                <div style={{ borderTop:"1px solid #f0f0f0", padding:"14px 18px", background:"#fafafa" }}>
                  {(item.messages||[]).slice(-4).map((m, i) => (
                    <div key={i} style={{ marginBottom:10, display:"flex", gap:10, alignItems:"flex-start" }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background: m.sender==="agent"?"#f0822d":"#3B82F6", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <span style={{ fontSize:11, fontWeight:800, color:"#fff" }}>{m.sender==="agent"?"A":"B"}</span>
                      </div>
                      <div style={{ background: m.sender==="agent"?"#FFF7ED":"#EFF6FF", borderRadius:10, padding:"8px 12px", flex:1 }}>
                        <div style={{ fontSize:11, fontWeight:700, color: m.sender==="agent"?"#f0822d":"#3B82F6", marginBottom:3 }}>{m.sender==="agent"?"You":"Buyer"}</div>
                        <div style={{ fontSize:13, color:"#374151", lineHeight:1.5 }}>{m.content}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ display:"flex", gap:8, marginTop:10 }}>
                    <input value={replyText} onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => e.key==="Enter" && sendReply(item._id)}
                      placeholder="Type a reply… (Enter to send)"
                      style={{ flex:1, padding:"10px 14px", border:"1.5px solid #e5e7eb", borderRadius:10, fontSize:13, outline:"none" }} />
                    <button onClick={() => sendReply(item._id)} disabled={replying || !replyText.trim()}
                      style={{ background: replying||!replyText.trim()?"#e5e7eb":"#f0822d", color:"#fff", border:"none", borderRadius:10, padding:"0 20px", fontSize:13, fontWeight:700, cursor:"pointer" }}>
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
  const [tab, setTab] = useState("listings");

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

  const approve = async (id) => { await apiClient.put(`/property/admin/approve/${id}`); setListings((p) => p.filter((l) => l._id !== id)); };
  const reject = async (id) => { await apiClient.put(`/property/admin/reject/${id}`); setListings((p) => p.filter((l) => l._id !== id)); };
  const deleteUser = async (id) => { if (!confirm("Delete this user?")) return; await apiClient.delete(`/auth/admin/users/${id}`); setUsers((p) => p.filter((u) => u._id !== id)); };

  if (loading) return <div style={{ padding:60, textAlign:"center", color:"#aaa" }}>Loading admin data…</div>;

  return (
    <>
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {[["listings",`Pending Listings (${listings.length})`], ["users",`Users (${users.length})`]].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)}
            style={{ padding:"8px 18px", borderRadius:20, border:"none", fontSize:13, fontWeight:700, cursor:"pointer", background:tab===k?"#f0822d":"#f3f4f6", color:tab===k?"#fff":"#555" }}>
            {l}
          </button>
        ))}
      </div>

      {tab === "listings" && (
        listings.length === 0
          ? <div style={{ padding:48, textAlign:"center", color:"#9ca3af", background:"#f8fafc", borderRadius:12, border:"1px dashed #e5e7eb" }}>✅ No pending listings to review.</div>
          : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {listings.map((l) => (
                <div key={l._id} style={{ background:"#fff", border:"1px solid #eef0f3", borderRadius:12, padding:"16px 18px", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                  <div style={{ flex:1, minWidth:140 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:"#1a2332" }}>{l.propertyName||l.title||"Untitled"}</div>
                    <div style={{ fontSize:12, color:"#6b7280", marginTop:2 }}>{l.city}, {l.country} · <strong>${Number(l.price||0).toLocaleString()}</strong></div>
                    <div style={{ fontSize:11, color:"#9ca3af", marginTop:1 }}>{l.userId?.name||"Unknown seller"} · {fmtDate(l.createdAt)}</div>
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={() => approve(l._id)} style={{ fontSize:12, fontWeight:700, background:"#ECFDF5", color:"#10B981", border:"1px solid #bbf7d0", borderRadius:8, padding:"7px 16px", cursor:"pointer" }}>✓ Approve</button>
                    <button onClick={() => reject(l._id)} style={{ fontSize:12, fontWeight:700, background:"#FEF2F2", color:"#EF4444", border:"1px solid #fecaca", borderRadius:8, padding:"7px 16px", cursor:"pointer" }}>✗ Reject</button>
                  </div>
                </div>
              ))}
            </div>
      )}

      {tab === "users" && (
        <div style={{ overflowX:"auto", borderRadius:12, border:"1px solid #eef0f3" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background:"#f8fafc" }}>
                {["User","Email","Role","Joined","Action"].map((h) => (
                  <th key={h} style={{ padding:"12px 16px", textAlign:"left", fontWeight:700, color:"#6b7280", borderBottom:"1px solid #eef0f3", fontSize:11, textTransform:"uppercase", letterSpacing:"0.5px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom:"1px solid #f5f7fa" }}>
                  <td style={{ padding:"12px 16px", fontWeight:700, color:"#1a2332" }}>{u.name}</td>
                  <td style={{ padding:"12px 16px", color:"#6b7280" }}>{u.email}</td>
                  <td style={{ padding:"12px 16px" }}>
                    <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, background: u.role==="admin"?"#FEF3C7": u.role==="agent"?"#EFF6FF":"#F5F3FF", color: u.role==="admin"?"#D97706": u.role==="agent"?"#3B82F6":"#8B5CF6" }}>{u.role}</span>
                  </td>
                  <td style={{ padding:"12px 16px", color:"#9ca3af" }}>{fmtDate(u.createdAt)}</td>
                  <td style={{ padding:"12px 16px" }}>
                    <button onClick={() => deleteUser(u._id)} style={{ fontSize:11, color:"#EF4444", background:"#FEF2F2", border:"1px solid #fecaca", borderRadius:6, padding:"4px 12px", cursor:"pointer", fontWeight:700 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// ─── Main CRM Component ───────────────────────────────────────────────────────
function extractArr(res, keys) {
  if (res.status !== "fulfilled") return [];
  const d = res.value.data;
  for (const k of keys) { if (Array.isArray(d?.[k])) return d[k]; }
  return Array.isArray(d) ? d : [];
}

export default function CRM() {
  const [role, setRole] = useState("");
  const [agentName, setAgentName] = useState("");
  const [activeTab, setActiveTab] = useState("leads");
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [crm, setCrm] = useState({});
  const [saving, setSaving] = useState({});

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      setRole(u.role || "");
      setAgentName(u.name || "");
    } catch {}
  }, []);

  useEffect(() => {
    Promise.allSettled([
      apiClient.get("/property/agent/properties"),
      apiClient.get("/leads"),
      apiClient.get("/favorites/my-properties"),
      apiClient.get("/tours/my-tours"),
      apiClient.get("/offers/received"),
      apiClient.get("/leads/meta"),
    ]).then(([propsRes, inqRes, favsRes, toursRes, offersRes, metaRes]) => {
      const props = extractArr(propsRes, ["properties","data"]);
      const inqs  = extractArr(inqRes,  ["data","leads"]);
      const favs  = extractArr(favsRes, ["favorites","data"]);
      const tours = extractArr(toursRes,["tours","data"]);
      const offrs = extractArr(offersRes,["data","offers"]);
      const meta  = metaRes.status==="fulfilled" ? (metaRes.value.data?.data || {}) : {};
      setCrm(meta);

      const propMap = {};
      props.forEach((p) => { propMap[p._id] = p.propertyName || p.title || "—"; });

      const leadsMap = {};
      const addLead = (item, src) => {
        const buyer = item.buyerId || item.userId || item.user || {};
        const key = (typeof buyer==="object" ? (buyer.email||buyer._id) : buyer) || item.email || item.inquirerEmail || "unknown";
        if (!leadsMap[key]) {
          leadsMap[key] = { key, name: buyer.name || buyer.fullName || item.inquirerName || item.buyerName || "Unknown", email: buyer.email || item.email || item.inquirerEmail || key, phone: buyer.phone || "", propertyName: propMap[item.propertyId?._id || item.propertyId] || item.propertyId?.propertyName || item.propertyName || "—", sources: [], lastSeen: item.updatedAt || item.createdAt };
        }
        if (!leadsMap[key].sources.includes(src)) leadsMap[key].sources.push(src);
        const t = item.updatedAt || item.createdAt;
        if (t > leadsMap[key].lastSeen) leadsMap[key].lastSeen = t;
      };
      inqs.forEach((i)  => addLead(i, "Lead"));
      favs.forEach((f)  => addLead(f, "Saved"));
      tours.forEach((t) => addLead(t, "Visit"));
      offrs.forEach((o) => addLead(o, "Offer"));

      setLeads(Object.values(leadsMap).sort((a,b) => (b.lastSeen||"") > (a.lastSeen||"") ? 1 : -1));
    }).finally(() => setLeadsLoading(false));
  }, []);

  const updateCrm = async (key, patch) => {
    setCrm((prev) => ({ ...prev, [key]: { ...(prev[key]||{}), ...patch } }));
    setSaving((s) => ({ ...s, [key]: true }));
    try { await apiClient.put(`/leads/meta/${encodeURIComponent(key)}`, patch); } catch {}
    setSaving((s) => ({ ...s, [key]: false }));
  };

  const handleAddLead = (form) => {
    const key = form.email;
    setLeads((prev) => [{
      key, name: form.name, email: form.email, phone: form.phone,
      propertyName: form.propertyName, sources: [form.source], lastSeen: new Date().toISOString(),
    }, ...prev.filter((l) => l.key !== key)]);
    updateCrm(key, { status: form.status, note: form.note });
  };

  if (role === "buyer" || role === "user") {
    return (
      <div className="main-content w-100" style={{ flex:1 }}>
        <div className="main-content-inner" style={{ paddingTop:40, textAlign:"center", color:"#9ca3af" }}>
          CRM is available for sellers, agents, brokers, and admins.
        </div>
        <div className="overlay-dashboard" />
      </div>
    );
  }

  const tabs = [
    { key:"leads", label:"Lead Pipeline" },
    { key:"inbox", label:"Lead Inbox" },
    ...(role === "admin" ? [{ key:"admin", label:"Admin Panel" }] : []),
  ];

  return (
    <div className="main-content w-100" style={{ flex:1, minWidth:0 }}>
      <div className="main-content-inner" style={{ width:"100%", boxSizing:"border-box" }}>
        <div className="button-show-hide show-mb"><span className="body-1">Show Dashboard</span></div>

        {/* Page header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
          <div>
            <h4 style={{ margin:0, fontWeight:800, color:"#1a2332", fontSize:22, letterSpacing:"-0.3px" }}>CRM Dashboard</h4>
            <p style={{ margin:"4px 0 0", color:"#9ca3af", fontSize:13 }}>Manage leads, follow-ups, and enquiries in one place</p>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                style={{ padding:"9px 20px", borderRadius:22, border:"none", fontSize:13, fontWeight:700, cursor:"pointer", background: activeTab===t.key ? "linear-gradient(135deg,#f0822d,#e56c1a)" : "#f3f4f6", color: activeTab===t.key ? "#fff" : "#555", transition:"0.2s", boxShadow: activeTab===t.key ? "0 3px 10px rgba(240,130,45,0.3)" : "none" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background:"#fff", borderRadius:16, border:"1px solid #eef0f3", boxShadow:"0 2px 12px rgba(0,0,0,0.04)", padding:24 }}>
          {activeTab === "leads" && (
            <LeadPipeline leads={leads} loading={leadsLoading} crm={crm} onUpdateCrm={updateCrm} saving={saving} agentName={agentName} onAddLead={handleAddLead} />
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
