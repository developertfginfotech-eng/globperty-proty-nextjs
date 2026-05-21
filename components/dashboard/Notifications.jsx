"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";

function timeAgo(date) {
  const secs = Math.floor((Date.now() - new Date(date)) / 1000);
  if (secs < 60) return "just now";
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}

function typeIcon(type) {
  switch (type) {
    case "offer": return "💰";
    case "tour": return "📅";
    case "kyc": return "🔒";
    case "new_lead": return "💬";
    case "lead": return "👤";
    default: return "🔔";
  }
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [notifRes, countRes] = await Promise.all([
          apiClient.get("/notifications"),
          apiClient.get("/notifications/unread-count"),
        ]);
        setNotifications(notifRes.data.notifications || notifRes.data || []);
        setUnreadCount(countRes.data.count ?? 0);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await apiClient.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      // silently fail
    }
  };

  const handleMarkAllRead = async () => {
    setMarkingAll(true);
    try {
      await apiClient.put("/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {
      alert("Failed to mark all as read.");
    } finally {
      setMarkingAll(false);
    }
  };

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <h3 className="title" style={{ margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
              Notifications
              {unreadCount > 0 && (
                <span style={{
                  background: "#f0822d",
                  color: "#fff",
                  borderRadius: 20,
                  padding: "2px 10px",
                  fontSize: 13,
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}>
                  {unreadCount}
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                disabled={markingAll}
                style={{
                  background: "none",
                  border: "1px solid #f0822d",
                  color: "#f0822d",
                  borderRadius: 6,
                  padding: "6px 16px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: markingAll ? "not-allowed" : "pointer",
                  opacity: markingAll ? 0.6 : 1,
                }}
              >
                {markingAll ? "Marking…" : "Mark all read"}
              </button>
            )}
          </div>

          {loading && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading…</div>
          )}

          {!loading && error && (
            <div style={{ padding: 40, textAlign: "center", color: "#e74c3c" }}>
              Failed to load. Try refreshing.
            </div>
          )}

          {!loading && !error && notifications.length === 0 && (
            <div style={{ padding: 60, textAlign: "center", color: "#888" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔔</div>
              <p style={{ margin: 0, fontSize: 15 }}>No notifications yet</p>
            </div>
          )}

          {!loading && !error && notifications.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => !n.isRead && handleMarkRead(n._id)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "14px 16px",
                    borderBottom: "1px solid #f0f0f0",
                    borderLeft: n.isRead ? "3px solid transparent" : "3px solid #f0822d",
                    background: n.isRead ? "#fff" : "#fff8f4",
                    cursor: n.isRead ? "default" : "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>
                    {typeIcon(n.type)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: n.isRead ? 500 : 700, fontSize: 14, color: "#222", marginBottom: 3 }}>
                      {n.title || "Notification"}
                    </div>
                    <div style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>
                      {n.message || n.body || ""}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, fontSize: 12, color: "#aaa", whiteSpace: "nowrap", marginTop: 2 }}>
                    {timeAgo(n.createdAt)}
                  </div>
                </div>
              ))}
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
