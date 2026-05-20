"use client";
import React, { useState, useRef, useEffect } from "react";
import apiClient from "@/utils/apiClient";

const SUGGESTIONS = [
  "What's the market like in Dubai right now?",
  "How do I make an offer on a property?",
  "What documents do I need to buy a property?",
  "Compare villas vs apartments for investment",
];

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 14,
    }}>
      {!isUser && (
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #f0822d, #e56c1a)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 10, alignSelf: "flex-end" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
        </div>
      )}
      <div style={{
        maxWidth: "72%",
        background: isUser ? "#f0822d" : "#f8fafc",
        color: isUser ? "#fff" : "#1a2332",
        borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        padding: "10px 14px",
        fontSize: 14,
        lineHeight: 1.55,
        border: isUser ? "none" : "1px solid #eef0f3",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}>
        {msg.content}
        {msg.loading && <span style={{ opacity: 0.5 }}>▌</span>}
      </div>
    </div>
  );
}

export default function Messages() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your Globperty AI assistant. Ask me anything about properties, market trends, buying/selling advice, or use the quick suggestions below." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text) => {
    const query = (text || input).trim();
    if (!query || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setLoading(true);
    const loadingId = Date.now();
    setMessages((prev) => [...prev, { role: "assistant", content: "", loading: true, id: loadingId }]);

    try {
      const res = await apiClient.post("/chat/query", { message: query });
      const reply = res.data?.response || res.data?.reply || res.data?.data?.response || "I couldn't get a response. Please try again.";
      setMessages((prev) => prev.map((m) => m.id === loadingId ? { role: "assistant", content: reply } : m));
    } catch {
      setMessages((prev) => prev.map((m) => m.id === loadingId ? { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again." } : m));
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg, #f0822d, #e56c1a)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(240,130,45,0.35)" }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <div>
              <h3 className="title" style={{ margin: 0 }}>AI Property Assistant</h3>
              <div style={{ fontSize: 12, color: "#10B981", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} /> Online
              </div>
            </div>
          </div>

          {/* Chat area */}
          <div style={{
            background: "#f8fafc",
            border: "1px solid #eef0f3",
            borderRadius: 12,
            padding: "16px 16px 12px",
            minHeight: 380,
            maxHeight: 460,
            overflowY: "auto",
            marginBottom: 16,
            display: "flex",
            flexDirection: "column",
          }}>
            {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{ fontSize: 12, fontWeight: 500, padding: "6px 12px", border: "1px solid #e0e3e8", borderRadius: 20, background: "#fff", color: "#555", cursor: "pointer" }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ display: "flex", gap: 10 }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything about properties…"
              rows={2}
              disabled={loading}
              style={{
                flex: 1,
                padding: "10px 14px",
                border: "1px solid #e0e3e8",
                borderRadius: 10,
                fontSize: 14,
                color: "#1a2332",
                resize: "none",
                outline: "none",
                fontFamily: "inherit",
                background: loading ? "#f8f8f8" : "#fff",
              }}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              style={{
                background: loading || !input.trim() ? "#e0e3e8" : "#f0822d",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "0 18px",
                cursor: loading || !input.trim() ? "default" : "pointer",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                flexShrink: 0,
              }}
            >
              ➤
            </button>
          </div>
          <div style={{ fontSize: 11, color: "#bbb", textAlign: "center", marginTop: 8 }}>
            AI assistant — responses are informational only
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
