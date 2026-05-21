"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import apiClient from "@/utils/apiClient";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:4000";

function imgSrc(raw) {
  if (!raw) return "/images/home/house-db-1.jpg";
  if (typeof raw === "string" && raw.startsWith("http")) return raw;
  if (Array.isArray(raw)) return imgSrc(raw[0]);
  return `${BACKEND_URL}${raw}`;
}

function renderMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

function timeAgo(date) {
  if (!date) return "";
  const secs = Math.floor((Date.now() - new Date(date)) / 1000);
  if (secs < 60) return "just now";
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function DirectMessages() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);
  const [threadLoading, setThreadLoading] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [role, setRole] = useState("");
  const [myName, setMyName] = useState("");
  const [search, setSearch] = useState("");
  const [polling, setPolling] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      setRole(u.role || "");
      setMyName(u.name || "");
    } catch {}
  }, []);

  const fetchThreads = useCallback(async () => {
    try {
      const res = await apiClient.get("/inquiries");
      const data = res.data?.data;
      setThreads(Array.isArray(data) ? data : []);
    } catch {
      setThreads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  // Poll active thread every 8s for new messages
  useEffect(() => {
    if (!selected) return;
    const id = setInterval(async () => {
      try {
        const res = await apiClient.get(`/inquiries/${selected}`);
        if (res.data?.data) {
          setSelectedThread(res.data.data);
          setThreads((prev) =>
            prev.map((t) => (t._id === selected ? { ...t, ...res.data.data } : t))
          );
        }
      } catch {}
    }, 8000);
    return () => clearInterval(id);
  }, [selected]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedThread?.messages]);

  const openThread = async (thread) => {
    setSelected(thread._id);
    setThreadLoading(true);
    setInput("");
    try {
      const res = await apiClient.get(`/inquiries/${thread._id}`);
      setSelectedThread(res.data?.data || thread);
    } catch {
      setSelectedThread(thread);
    } finally {
      setThreadLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || sending || !selected) return;
    setSending(true);
    setInput("");
    // Optimistic
    const optimistic = {
      _id: `opt_${Date.now()}`,
      sender: role === "agent" || role === "seller" || role === "broker" ? "agent" : "user",
      senderName: myName || "You",
      content: text,
      createdAt: new Date().toISOString(),
    };
    setSelectedThread((prev) => ({
      ...prev,
      messages: [...(prev?.messages || []), optimistic],
    }));
    try {
      const res = await apiClient.post(`/inquiries/${selected}/message`, { content: text });
      if (res.data?.data) {
        setSelectedThread(res.data.data);
        setThreads((prev) =>
          prev.map((t) => (t._id === selected ? { ...t, updatedAt: new Date().toISOString() } : t))
        );
      }
    } catch {
      // revert optimistic on failure
      setSelectedThread((prev) => ({
        ...prev,
        messages: prev.messages.filter((m) => m._id !== optimistic._id),
      }));
      setInput(text);
    } finally {
      setSending(false);
    }
  };

  const isSelf = (msg) => {
    const isAgent = role === "agent" || role === "seller" || role === "broker" || role === "admin";
    return isAgent ? msg.sender === "agent" : msg.sender === "user";
  };

  const filteredThreads = threads.filter((t) => {
    const q = search.toLowerCase();
    if (!q) return true;
    const title = (t.propertyId?.propertyName || t.propertyTitle || "").toLowerCase();
    const name = (t.inquirerName || t.buyerId?.name || "").toLowerCase();
    return title.includes(q) || name.includes(q);
  });

  const getOtherName = (t) => {
    const isAgent = role === "agent" || role === "seller" || role === "broker" || role === "admin";
    if (isAgent) return t.inquirerName || t.buyerId?.name || "Buyer";
    return t.agentId?.name || "Agent";
  };

  const lastMessage = (t) => {
    const msgs = t.messages || [];
    if (!msgs.length) return "";
    return msgs[msgs.length - 1].content;
  };

  return (
    <div className="main-content style-2" style={{ flex: 1, minWidth: 0, width: "100%" }}>
      <div className="main-content-inner wrap-dashboard-content-2" style={{ width: "100%", boxSizing: "border-box" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          height: "calc(100vh - 180px)",
          minHeight: 520,
          border: "1px solid #eef0f3",
          borderRadius: 14,
          overflow: "hidden",
          background: "#fff",
        }} className="dm-grid">

          {/* ── LEFT: Thread list ── */}
          <div style={{ borderRight: "1px solid #eef0f3", display: "flex", flexDirection: "column", background: "#fafbfc" }}>
            <div style={{ padding: "16px 14px 10px", borderBottom: "1px solid #eef0f3" }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 800, color: "#1a2332" }}>Messages</h3>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations…"
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #e0e3e8", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" }}
              />
            </div>

            <div style={{ flex: 1, overflowY: "auto" }}>
              {loading && (
                <div style={{ padding: 32, textAlign: "center", color: "#aaa", fontSize: 13 }}>Loading…</div>
              )}
              {!loading && filteredThreads.length === 0 && (
                <div style={{ padding: 32, textAlign: "center", color: "#aaa", fontSize: 13 }}>
                  {search ? "No conversations match your search." : "No conversations yet."}
                </div>
              )}
              {filteredThreads.map((t) => {
                const isSelected = selected === t._id;
                const prop = t.propertyId;
                const thumb = imgSrc(prop?.images);
                return (
                  <div
                    key={t._id}
                    onClick={() => openThread(t)}
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: "12px 14px",
                      cursor: "pointer",
                      background: isSelected ? "#FFF7ED" : "transparent",
                      borderLeft: isSelected ? "3px solid #f0822d" : "3px solid transparent",
                      borderBottom: "1px solid #f5f5f5",
                      transition: "background 0.15s",
                    }}
                  >
                    <img src={thumb} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#1a2332", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>
                          {getOtherName(t)}
                        </span>
                        <span style={{ fontSize: 10, color: "#bbb", flexShrink: 0 }}>{timeAgo(t.updatedAt)}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {prop?.propertyName || t.propertyTitle || "Property"}
                      </div>
                      <div style={{ fontSize: 11, color: "#aaa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 1 }}>
                        {lastMessage(t) || "No messages yet"}
                      </div>
                    </div>
                    {t.status === "open" && !t.isReadByAgent && (role === "agent" || role === "seller") && (
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f0822d", flexShrink: 0, marginTop: 4 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Chat panel ── */}
          {!selected ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#aaa", gap: 12 }}>
              <div style={{ fontSize: 48 }}>💬</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Select a conversation</div>
              <div style={{ fontSize: 12 }}>Pick a thread from the left to start chatting</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              {/* Chat header */}
              {selectedThread && (
                <div style={{ padding: "12px 20px", borderBottom: "1px solid #eef0f3", display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src={imgSrc(selectedThread.propertyId?.images)}
                    alt=""
                    style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }}
                  />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2332" }}>{getOtherName(selectedThread)}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>
                      {selectedThread.propertyId?.propertyName || selectedThread.propertyTitle || "Property"} · {selectedThread.propertyId?.city || ""}
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                      background: selectedThread.status === "replied" ? "#ECFDF5" : "#EFF6FF",
                      color: selectedThread.status === "replied" ? "#10B981" : "#3B82F6",
                    }}>
                      {selectedThread.status === "replied" ? "Replied" : "Open"}
                    </span>
                  </div>
                </div>
              )}

              {/* Messages area */}
              <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 12px" }}>
                {threadLoading ? (
                  <div style={{ textAlign: "center", color: "#aaa", paddingTop: 40 }}>Loading messages…</div>
                ) : (selectedThread?.messages || []).length === 0 ? (
                  <div style={{ textAlign: "center", color: "#aaa", paddingTop: 40 }}>No messages yet. Say hello!</div>
                ) : (
                  (selectedThread?.messages || []).map((msg, i) => {
                    const self = isSelf(msg);
                    return (
                      <div key={msg._id || i} style={{ display: "flex", justifyContent: self ? "flex-end" : "flex-start", marginBottom: 12 }}>
                        {!self && (
                          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#3B82F6,#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 8, alignSelf: "flex-end" }}>
                            <span style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>{(msg.senderName || "?")[0].toUpperCase()}</span>
                          </div>
                        )}
                        <div style={{ maxWidth: "68%" }}>
                          {!self && <div style={{ fontSize: 10, color: "#aaa", marginBottom: 3, fontWeight: 600 }}>{msg.senderName}</div>}
                          <div
                            dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                            style={{
                              background: self ? "#f0822d" : "#f3f4f6",
                              color: self ? "#fff" : "#1a2332",
                              borderRadius: self ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                              padding: "10px 14px",
                              fontSize: 13,
                              lineHeight: 1.6,
                              wordBreak: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          />
                          <div style={{ fontSize: 10, color: "#ccc", marginTop: 3, textAlign: self ? "right" : "left" }}>
                            {timeAgo(msg.createdAt)}
                          </div>
                        </div>
                        {self && (
                          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#f0822d,#e56c1a)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 8, alignSelf: "flex-end" }}>
                            <span style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>{(myName || "Y")[0].toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input area */}
              <div style={{ padding: "12px 16px", borderTop: "1px solid #eef0f3", display: "flex", gap: 10, alignItems: "flex-end" }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Type a message… (Enter to send)"
                  rows={2}
                  disabled={sending}
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    border: "1px solid #e0e3e8",
                    borderRadius: 10,
                    fontSize: 13,
                    resize: "none",
                    outline: "none",
                    fontFamily: "inherit",
                    background: sending ? "#f8f8f8" : "#fff",
                    color: "#1a2332",
                  }}
                />
                <button
                  onClick={send}
                  disabled={sending || !input.trim()}
                  style={{
                    background: sending || !input.trim() ? "#e0e3e8" : "#f0822d",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "0 18px",
                    height: 44,
                    fontSize: 18,
                    cursor: sending || !input.trim() ? "default" : "pointer",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ➤
                </button>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .dm-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        <div className="footer-dashboard" style={{ marginTop: 20 }}>
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
