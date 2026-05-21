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

function timeAgo(date) {
  if (!date) return "—";
  const secs = Math.floor((Date.now() - new Date(date)) / 1000);
  if (secs < 60) return "just now";
  if (secs < 3600) return `${Math.floor(secs / 60)} min ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)} hr ago`;
  if (secs < 604800) return `${Math.floor(secs / 86400)} day${Math.floor(secs / 86400) > 1 ? "s" : ""} ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function TypeChip({ type }) {
  const styles = {
    Lead:  { bg: "#EFF6FF", color: "#3B82F6" },
    Visit: { bg: "#FFF7ED", color: "#f0822d" },
    Offer: { bg: "#ECFDF5", color: "#10B981" },
  };
  const s = styles[type] || { bg: "#F3F4F6", color: "#6B7280" };
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      fontSize: 11,
      fontWeight: 700,
      padding: "2px 10px",
      borderRadius: 20,
      flexShrink: 0,
    }}>
      {type}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    open:     { bg: "#EFF6FF", color: "#3B82F6" },
    replied:  { bg: "#ECFDF5", color: "#10B981" },
    pending:  { bg: "#FFF7ED", color: "#f0822d" },
    accepted: { bg: "#ECFDF5", color: "#10B981" },
    rejected: { bg: "#FEF2F2", color: "#EF4444" },
    confirmed:{ bg: "#ECFDF5", color: "#10B981" },
    cancelled:{ bg: "#FEF2F2", color: "#EF4444" },
    completed:{ bg: "#F5F3FF", color: "#8B5CF6" },
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
      flexShrink: 0,
    }}>
      {status || "unknown"}
    </span>
  );
}

function SummaryChip({ label, count, color, bg }) {
  return (
    <div style={{
      background: bg,
      borderRadius: 10,
      padding: "12px 16px",
      borderLeft: `3px solid ${color}`,
      flex: 1,
      minWidth: 110,
    }}>
      <div style={{ fontSize: 22, fontWeight: 800, color }}>{count}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginTop: 2 }}>{label}</div>
    </div>
  );
}

function MessageThread({ messages, leadId, onReplySent }) {
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!replyText.trim() || sending) return;
    setSending(true);
    try {
      const res = await apiClient.post(`/leads/${leadId}/reply`, { message: replyText.trim() });
      const updated = res.data?.lead || res.data;
      onReplySent(updated);
      setReplyText("");
    } catch {
      alert("Failed to send reply. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ marginTop: 12, borderTop: "1px solid #f0f0f0", paddingTop: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 280, overflowY: "auto", marginBottom: 12 }}>
        {(messages || []).map((msg, i) => {
          const isAgent = msg.sender === "agent";
          return (
            <div key={i} style={{ display: "flex", justifyContent: isAgent ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "75%",
                background: isAgent ? "#f0822d" : "#f1f3f6",
                color: isAgent ? "#fff" : "#1a2332",
                borderRadius: isAgent ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                padding: "8px 12px",
                fontSize: 13,
                lineHeight: 1.5,
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.7, marginBottom: 3 }}>
                  {msg.senderName || (isAgent ? "Agent" : "User")}
                </div>
                {msg.content}
                <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4, textAlign: isAgent ? "right" : "left" }}>
                  {timeAgo(msg.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          placeholder="Type a reply…"
          rows={2}
          disabled={sending}
          style={{
            flex: 1,
            border: "1px solid #e0e3e8",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 13,
            resize: "none",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={handleSend}
          disabled={sending || !replyText.trim()}
          style={{
            background: sending || !replyText.trim() ? "#e0e3e8" : "#f0822d",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0 16px",
            fontWeight: 700,
            fontSize: 13,
            cursor: sending || !replyText.trim() ? "default" : "pointer",
            flexShrink: 0,
          }}
        >
          {sending ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}

const TABS = ["All", "Leads", "Visits", "Offers"];

export default function Inbox() {
  const [role, setRole] = useState(null);
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    let userRole = "";
    try { userRole = JSON.parse(localStorage.getItem("user") || "{}").role || ""; } catch {}
    setRole(userRole);

    const offersEndpoint = userRole === "buyer" || userRole === "user"
      ? "/offers/my-offers"
      : "/offers/received";

    Promise.allSettled([
      apiClient.get("/leads"),
      apiClient.get("/tours/my-tours"),
      apiClient.get(offersEndpoint),
    ]).then(([inqRes, tourRes, offerRes]) => {
      const items = [];

      // Leads
      if (inqRes.status === "fulfilled") {
        const raw = inqRes.value.data;
        const list = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : (Array.isArray(raw?.leads) ? raw.leads : []));
        list.forEach((inq) => {
          const lastMsg = (inq.messages || []).slice(-1)[0];
          items.push({
            _id: inq._id,
            type: "Lead",
            propertyName: inq.propertyId?.propertyName || "Property",
            thumbnail: inq.propertyId?.images?.[0],
            personName: inq.inquirerName || "Unknown",
            personEmail: inq.inquirerEmail || "",
            preview: lastMsg?.content
              ? (lastMsg.content.length > 60 ? lastMsg.content.slice(0, 60) + "…" : lastMsg.content)
              : "No messages yet",
            status: inq.status || "open",
            unread: !inq.isReadByAgent,
            date: inq.updatedAt || inq.createdAt,
            messages: inq.messages || [],
            rawLead: inq,
          });
        });
      }

      // Tours
      if (tourRes.status === "fulfilled") {
        const raw = tourRes.value.data;
        const list = Array.isArray(raw) ? raw : (Array.isArray(raw?.tours) ? raw.tours : (Array.isArray(raw?.data) ? raw.data : []));
        list.forEach((tour) => {
          const dateStr = tour.preferredDate
            ? new Date(tour.preferredDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : "—";
          const typeLabel = tour.tourType === "videochat" ? "Video Call" : "In-Person";
          items.push({
            _id: tour._id,
            type: "Visit",
            propertyName: tour.propertyId?.propertyName || "Property",
            thumbnail: tour.propertyId?.images?.[0],
            personName: tour.name || "Unknown",
            personEmail: tour.email || "",
            preview: `${dateStr} at ${tour.time || "—"} · ${typeLabel}`,
            status: tour.status || "pending",
            unread: false,
            date: tour.createdAt,
          });
        });
      }

      // Offers
      if (offerRes.status === "fulfilled") {
        const raw = offerRes.value.data;
        const list = Array.isArray(raw) ? raw : (Array.isArray(raw?.offers) ? raw.offers : (Array.isArray(raw?.data) ? raw.data : []));
        list.forEach((offer) => {
          const buyer = offer.buyerId || offer.buyer || {};
          items.push({
            _id: offer._id,
            type: "Offer",
            propertyName: offer.propertyId?.propertyName || "Property",
            thumbnail: offer.propertyId?.images?.[0],
            personName: buyer.name || buyer.fullName || buyer.email || "Unknown",
            personEmail: buyer.email || "",
            preview: `$${Number(offer.offerPrice || 0).toLocaleString()} · ${offer.status || "pending"}`,
            status: offer.status || "pending",
            unread: false,
            date: offer.createdAt,
          });
        });
      }

      // Sort by date descending
      items.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFeed(items);
    }).finally(() => setLoading(false));
  }, []);

  const handleReplySent = (leadId, updatedLead) => {
    setFeed((prev) =>
      prev.map((item) => {
        if (item._id !== leadId || item.type !== "Lead") return item;
        const msgs = updatedLead?.messages || item.messages;
        const lastMsg = msgs.slice(-1)[0];
        return {
          ...item,
          messages: msgs,
          preview: lastMsg?.content
            ? (lastMsg.content.length > 60 ? lastMsg.content.slice(0, 60) + "…" : lastMsg.content)
            : item.preview,
          status: "replied",
          unread: false,
        };
      })
    );
  };

  const leads = feed.filter((i) => i.type === "Lead");
  const visits = feed.filter((i) => i.type === "Visit");
  const offers = feed.filter((i) => i.type === "Offer");
  const unreadCount = leads.filter((i) => i.unread).length;

  const filtered = activeTab === "All" ? feed
    : activeTab === "Leads" ? leads
    : activeTab === "Visits" ? visits
    : offers;

  const isSeller = role && role !== "buyer" && role !== "user";

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          <h3 className="title">Inbox</h3>

          {/* Summary chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
            <SummaryChip label="Total" count={feed.length} color="#6B7280" bg="#F3F4F6" />
            <SummaryChip label="Unread Leads" count={unreadCount} color="#3B82F6" bg="#EFF6FF" />
            <SummaryChip label="Visits" count={visits.length} color="#f0822d" bg="#FFF7ED" />
            <SummaryChip label="Offers" count={offers.length} color="#10B981" bg="#ECFDF5" />
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "2px solid #f0f0f0" }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === tab ? "2px solid #f0822d" : "2px solid transparent",
                  marginBottom: -2,
                  padding: "8px 16px",
                  fontWeight: activeTab === tab ? 700 : 500,
                  fontSize: 14,
                  color: activeTab === tab ? "#f0822d" : "#666",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {tab}
                {tab === "Leads" && leads.length > 0 && (
                  <span style={{ marginLeft: 6, background: "#EFF6FF", color: "#3B82F6", fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 20 }}>
                    {leads.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading && (
            <div style={{ padding: 48, textAlign: "center", color: "#888" }}>Loading inbox…</div>
          )}

          {!loading && filtered.length === 0 && (
            <div style={{ padding: 48, textAlign: "center", color: "#888" }}>
              Nothing here yet.
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map((item) => {
                const isExpanded = expandedId === item._id;
                const thumb = imgSrc(item.thumbnail);
                const canExpand = item.type === "Lead" && isSeller;

                return (
                  <div key={item._id + item.type} style={{
                    background: item.unread ? "#FFFBF5" : "#fff",
                    border: `1px solid ${item.unread ? "#f0822d33" : "#eef0f3"}`,
                    borderRadius: 12,
                    padding: 16,
                    transition: "box-shadow 0.15s",
                  }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      {/* Thumbnail */}
                      <img
                        src={thumb}
                        alt={item.propertyName}
                        onError={(e) => { e.target.src = "/images/home/house-db-1.jpg"; }}
                        style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
                      />

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                          <TypeChip type={item.type} />
                          <span style={{ fontWeight: 700, fontSize: 14, color: "#1a2332", flex: 1, minWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {item.propertyName}
                          </span>
                          <StatusBadge status={item.status} />
                          {item.unread && (
                            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f0822d", flexShrink: 0 }} />
                          )}
                        </div>
                        <div style={{ fontSize: 13, color: "#555", fontWeight: 600, marginBottom: 2 }}>
                          {item.personName}
                          {item.personEmail && (
                            <span style={{ fontWeight: 400, color: "#888", marginLeft: 6 }}>· {item.personEmail}</span>
                          )}
                        </div>
                        <div style={{ fontSize: 13, color: "#777", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.preview}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                          <span style={{ fontSize: 12, color: "#aaa" }}>{timeAgo(item.date)}</span>
                          {canExpand && (
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : item._id)}
                              style={{
                                background: "none",
                                border: "1px solid #e0e3e8",
                                borderRadius: 6,
                                padding: "3px 12px",
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#555",
                                cursor: "pointer",
                              }}
                            >
                              {isExpanded ? "Collapse" : "View Thread"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded thread (seller + lead only) */}
                    {canExpand && isExpanded && (
                      <MessageThread
                        messages={item.messages}
                        leadId={item._id}
                        onReplySent={(updated) => handleReplySent(item._id, updated)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="footer-dashboard">
          <p>Copyright &copy; {new Date().getFullYear()} Globperty</p>
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
