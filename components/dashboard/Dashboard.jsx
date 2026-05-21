"use client";
import React, { useEffect, useState } from "react";
import LineChart from "./Chart";
import Link from "next/link";
import apiClient from "@/utils/apiClient";
import { getAgentProperties } from "@/utils/propertyApi";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:4000";

function imgSrc(raw) {
  if (!raw) return "/images/home/house-db-1.jpg";
  if (raw.startsWith("http")) return raw;
  return `${BACKEND_URL}${raw}`;
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

// ─── Buyer dashboard ────────────────────────────────────────────────────────

function BuyerDashboard() {
  const [favorites, setFavorites] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      apiClient.get("/favorites"),
      apiClient.get("/offers/my-offers"),
    ]).then(([favsRes, offersRes]) => {
      if (favsRes.status === "fulfilled")
        setFavorites(favsRes.value.data.favorites || []);
      if (offersRes.status === "fulfilled") {
        const raw = offersRes.value.data;
        setOffers(Array.isArray(raw?.offers) ? raw.offers : Array.isArray(raw) ? raw : []);
      }
      setLoading(false);
    });
  }, []);

  const activeOffers = Array.isArray(offers) ? offers.filter((o) => o.status === "pending" || o.status === "countered") : [];

  const statCards = [
    {
      label: "Saved Properties", value: loading ? "—" : favorites.length,
      href: "/my-favorites", color: "#ef4444", lightBg: "rgba(239,68,68,0.08)",
      icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    },
    {
      label: "Offers Made", value: loading ? "—" : offers.length,
      href: "/my-offers", color: "#f0822d", lightBg: "rgba(240,130,45,0.08)",
      icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#f0822d" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    },
    {
      label: "Active Offers", value: loading ? "—" : activeOffers.length,
      href: "/my-offers", color: "#8b5cf6", lightBg: "rgba(139,92,246,0.08)",
      icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    },
    {
      label: "Deal Tracker", value: "View",
      href: "/deal-tracker", color: "#10b981", lightBg: "rgba(16,185,129,0.08)",
      icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l4-8 4 3 4-6 4 2"/></svg>,
    },
  ];

  return (
    <>
      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} style={{ textDecoration: "none" }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #e8eaf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", transition: "all 0.2s", cursor: "pointer", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: card.color, borderRadius: "16px 16px 0 0" }} />
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: card.lightBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {card.icon}
                </div>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 4 }}><polyline points="9 18 15 12 9 6"/></svg>
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#111827", letterSpacing: "-1px", lineHeight: 1, marginBottom: 6 }}>{card.value}</div>
              <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="row">
        <div className="col-xl-9">
          {/* Saved Properties */}
          <div className="widget-box-2 wd-listing mb-24" style={{ borderRadius: 16, border: "1px solid #e8eaf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 4, height: 20, background: "#f0822d", borderRadius: 2 }} />
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111827" }}>My Favorites</h3>
              </div>
              <Link href="/my-favorites" style={{ fontSize: 12, fontWeight: 700, color: "#f0822d", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>View all <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></Link>
            </div>
            {loading ? (
              <div style={{ padding: 32, textAlign: "center", color: "#888" }}>Loading…</div>
            ) : favorites.length === 0 ? (
              <div style={{ padding: 32, textAlign: "center", color: "#888" }}>
                No favorites yet. <Link href="/property-gird-left-sidebar" style={{ color: "#f96b25" }}>Browse properties →</Link>
              </div>
            ) : (
              <div className="wrap-table">
                <div className="table-responsive">
                  <table>
                    <thead><tr><th>Listing</th><th>Saved</th><th>Action</th></tr></thead>
                    <tbody>
                      {favorites.slice(0, 5).map((fav) => {
                        const p = fav.propertyId;
                        if (!p) return null;
                        const title = p.propertyName || p.title || "Untitled";
                        const photo = imgSrc(p.images?.[0]);
                        const price = p.price ? `$${Number(p.price).toLocaleString()}` : "—";
                        const location = [p.city, p.country].filter(Boolean).join(", ");
                        return (
                          <tr key={fav._id}>
                            <td>
                              <div className="listing-box">
                                <div className="images">
                                  <img alt={title} src={photo} width={100} height={70}
                                    style={{ objectFit: "cover", borderRadius: 6 }}
                                    onError={(e) => { e.target.src = "/images/home/house-db-1.jpg"; }} />
                                </div>
                                <div className="content">
                                  <div className="title">
                                    <Link href={`/property-detail-v1/${p._id}`} className="link">{title}</Link>
                                  </div>
                                  <div className="text-date" style={{ fontSize: 13, color: "#888" }}>{location}</div>
                                  <div className="text-btn text-color-primary" style={{ fontWeight: 600 }}>{price}</div>
                                </div>
                              </div>
                            </td>
                            <td><span style={{ fontSize: 13, color: "#888" }}>{timeAgo(fav.createdAt)}</span></td>
                            <td>
                              <ul className="list-action">
                                <li>
                                  <Link href={`/property-detail-v1/${p._id}`} className="item">
                                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none"><path d="M2 8s2.667-5.333 6-5.333S14 8 14 8s-2.667 5.333-6 5.333S2 8 2 8z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="8" r="2" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    View
                                  </Link>
                                </li>
                              </ul>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Recent Offers */}
          <div className="widget-box-2 wd-listing" style={{ borderRadius: 16, border: "1px solid #e8eaf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 4, height: 20, background: "#f0822d", borderRadius: 2 }} />
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111827" }}>My Offers</h3>
              </div>
              <Link href="/my-offers" style={{ fontSize: 12, fontWeight: 700, color: "#f0822d", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>View all <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></Link>
            </div>
            {loading ? (
              <div style={{ padding: 32, textAlign: "center", color: "#888" }}>Loading…</div>
            ) : offers.length === 0 ? (
              <div style={{ padding: 32, textAlign: "center", color: "#888" }}>
                No offers yet. <Link href="/property-gird-left-sidebar" style={{ color: "#f96b25" }}>Find a property →</Link>
              </div>
            ) : (
              <div className="wrap-table">
                <div className="table-responsive">
                  <table>
                    <thead><tr><th>Property</th><th>Offer Price</th><th>Status</th><th>Date</th></tr></thead>
                    <tbody>
                      {offers.slice(0, 5).map((offer) => {
                        const p = offer.propertyId || {};
                        const title = p.propertyName || p.title || offer.propertyTitle || "Untitled";
                        const statusColors = { pending: "#f0822d", accepted: "#10b981", rejected: "#ef4444", countered: "#8b5cf6" };
                        const sc = statusColors[offer.status] || "#888";
                        return (
                          <tr key={offer._id}>
                            <td><span style={{ fontWeight: 600 }}>{title}</span></td>
                            <td><span style={{ fontWeight: 700, color: "#111827" }}>${Number(offer.offerPrice).toLocaleString()}</span></td>
                            <td>
                              <span style={{ background: sc + "18", color: sc, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, textTransform: "capitalize" }}>
                                {offer.status}
                              </span>
                            </td>
                            <td><span style={{ fontSize: 12, color: "#888" }}>{timeAgo(offer.createdAt)}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-xl-3">
          {/* Quick links */}
          <div className="widget-box-2 mess-box" style={{ borderRadius: 16, border: "1px solid #e8eaf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ width: 4, height: 18, background: "#f0822d", borderRadius: 2 }} />
              <h5 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#111827" }}>Quick Links</h5>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Browse Properties", href: "/property-gird-left-sidebar", color: "#f0822d" },
                { label: "My Saved Properties", href: "/my-favorites", color: "#ef4444" },
                { label: "My Offers", href: "/my-offers", color: "#8b5cf6" },
                { label: "Deal Tracker", href: "/deal-tracker", color: "#10b981" },
                { label: "Notifications", href: "/notifications", color: "#3b82f6" },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: "#f8fafc", textDecoration: "none", border: "1px solid #eef0f3" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: l.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{l.label}</span>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }}><polyline points="9 18 15 12 9 6"/></svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Seller/Broker dashboard ─────────────────────────────────────────────────

const NOTIF_ICONS = { offer: "💰", tour: "📅", property: "🏠", message: "💬", system: "🔔" };

function SellerDashboard({ role, kycStatus }) {
  const [stats, setStats] = useState({ totalProperties: 0, totalFavorites: 0, totalReviews: 0 });
  const [pendingCount, setPendingCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [leads, setLeads] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      apiClient.get("/dashboard/stats"),
      getAgentProperties(),
      apiClient.get("/favorites"),
      apiClient.get("/leads"),
      apiClient.get("/reviews/my-properties"),
      apiClient.get("/notifications"),
    ]).then(([statsRes, propsRes, favsRes, inqRes, revRes, notifRes]) => {
      if (statsRes.status === "fulfilled") setStats(statsRes.value.data.stats || {});
      if (propsRes.status === "fulfilled") setPendingCount(propsRes.value.filter((p) => p.status === "pending").length);
      if (favsRes.status === "fulfilled") setFavorites(favsRes.value.data.favorites || []);
      if (inqRes.status === "fulfilled") setLeads((inqRes.value.data.data || []).slice(0, 4));
      if (revRes.status === "fulfilled") setReviews((revRes.value.data.reviews || []).slice(0, 5));
      if (notifRes.status === "fulfilled") {
        const raw = notifRes.value.data;
        setNotifications((Array.isArray(raw) ? raw : (raw?.notifications || [])).slice(0, 4));
      }
      setLoading(false);
    });
  }, []);

  const statCards = [
    {
      label: "My Listings", value: loading ? "—" : stats.totalProperties ?? 0,
      href: "/my-property", color: "#f0822d", lightBg: "rgba(240,130,45,0.08)",
      icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#f0822d" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
    },
    {
      label: "Pending Approval", value: loading ? "—" : pendingCount,
      href: "/my-property", color: "#8b5cf6", lightBg: "rgba(139,92,246,0.08)",
      icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    },
    {
      label: "Saved by Buyers", value: loading ? "—" : stats.totalFavorites ?? 0,
      href: "/listing-analytics", color: "#ef4444", lightBg: "rgba(239,68,68,0.08)",
      icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    },
    {
      label: "Reviews", value: loading ? "—" : stats.totalReviews ?? 0,
      href: "/review", color: "#10b981", lightBg: "rgba(16,185,129,0.08)",
      icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    },
  ];

  return (
    <>
      {/* KYC banner */}
      {role !== "admin" && role !== "super_admin" && kycStatus && kycStatus !== "verified" && (() => {
        const cfg = {
          pending:     { bg: "linear-gradient(135deg,#eff6ff,#dbeafe)", border: "#93c5fd", iconBg: "#3b82f6", label: "KYC Under Review",  sub: "Your documents are being verified. We'll notify you once approved.", icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
          rejected:    { bg: "linear-gradient(135deg,#fef2f2,#fee2e2)", border: "#fca5a5", iconBg: "#ef4444", label: "KYC Rejected",       sub: "Your KYC was rejected. Please resubmit your documents.", icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> },
          unsubmitted: { bg: "linear-gradient(135deg,#fffbeb,#fef3c7)", border: "#fbbf24", iconBg: "#f59e0b", label: "KYC Not Completed", sub: "Complete identity verification to list properties on Globperty.", icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
        };
        const c = cfg[kycStatus] || cfg.unsubmitted;
        return (
          <div style={{ marginBottom: 24, padding: "16px 20px", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, background: c.bg, border: `1.5px solid ${c.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#111827", marginBottom: 2 }}>{c.label}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{c.sub}</div>
              </div>
            </div>
            {kycStatus !== "pending" && (
              <Link href="/kyc-property-verification" style={{ background: "#f0822d", color: "#fff", padding: "9px 20px", borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 6 }}>
                {kycStatus === "rejected" ? "Resubmit KYC" : "Complete KYC"}
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
            )}
          </div>
        );
      })()}

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} style={{ textDecoration: "none" }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #e8eaf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", transition: "all 0.2s", cursor: "pointer", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: card.color, borderRadius: "16px 16px 0 0" }} />
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: card.lightBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {card.icon}
                </div>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 4 }}><polyline points="9 18 15 12 9 6"/></svg>
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#111827", letterSpacing: "-1px", lineHeight: 1, marginBottom: 6 }}>{card.value}</div>
              <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="row">
        <div className="col-xl-9">
          {/* My Favorites */}
          <div className="widget-box-2 wd-listing mb-24" style={{ borderRadius: 16, border: "1px solid #e8eaf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 4, height: 20, background: "#f0822d", borderRadius: 2 }} />
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111827" }}>Saved by Buyers</h3>
              </div>
              <Link href="/listing-analytics" style={{ fontSize: 12, fontWeight: 700, color: "#f0822d", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>Analytics <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></Link>
            </div>
            {loading ? (
              <div style={{ padding: 32, textAlign: "center", color: "#888" }}>Loading…</div>
            ) : favorites.length === 0 ? (
              <div style={{ padding: 32, textAlign: "center", color: "#888" }}>No buyers have saved your properties yet.</div>
            ) : (
              <div className="wrap-table">
                <div className="table-responsive">
                  <table>
                    <thead><tr><th>Listing</th><th>Saved</th><th>Action</th></tr></thead>
                    <tbody>
                      {favorites.slice(0, 5).map((fav) => {
                        const p = fav.propertyId;
                        if (!p) return null;
                        const title = p.propertyName || p.title || "Untitled";
                        const photo = imgSrc(p.images?.[0]);
                        const price = p.price ? `$${Number(p.price).toLocaleString()}` : "—";
                        const location = [p.city, p.country].filter(Boolean).join(", ");
                        return (
                          <tr key={fav._id}>
                            <td>
                              <div className="listing-box">
                                <div className="images">
                                  <img alt={title} src={photo} width={100} height={70} style={{ objectFit: "cover", borderRadius: 6 }} onError={(e) => { e.target.src = "/images/home/house-db-1.jpg"; }} />
                                </div>
                                <div className="content">
                                  <div className="title"><Link href={`/property-detail-v1/${p._id}`} className="link">{title}</Link></div>
                                  <div className="text-date" style={{ fontSize: 13, color: "#888" }}>{location}</div>
                                  <div className="text-btn text-color-primary" style={{ fontWeight: 600 }}>{price}</div>
                                </div>
                              </div>
                            </td>
                            <td><span style={{ fontSize: 13, color: "#888" }}>{timeAgo(fav.createdAt)}</span></td>
                            <td>
                              <ul className="list-action">
                                <li>
                                  <Link href={`/property-detail-v1/${p._id}`} className="item">
                                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none"><path d="M2 8s2.667-5.333 6-5.333S14 8 14 8s-2.667 5.333-6 5.333S2 8 2 8z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="8" r="2" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    View
                                  </Link>
                                </li>
                              </ul>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Chart */}
          <div className="widget-box-2 wd-chart" style={{ borderRadius: 16, border: "1px solid #e8eaf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "18px 24px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ width: 4, height: 20, background: "#f0822d", borderRadius: 2 }} />
              <h5 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111827" }}>Page Visits</h5>
            </div>
            <div className="chart-box"><LineChart /></div>
          </div>
        </div>

        <div className="col-xl-3">
          {/* Messages */}
          <div className="widget-box-2 mess-box mb-20" style={{ borderRadius: 16, border: "1px solid #e8eaf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ width: 4, height: 18, background: "#f0822d", borderRadius: 2 }} />
              <h5 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#111827" }}>Messages</h5>
            </div>
            {loading ? (
              <div style={{ padding: 16, color: "#888", fontSize: 13 }}>Loading…</div>
            ) : leads.length === 0 ? (
              <div style={{ padding: 16, color: "#888", fontSize: 13 }}>No messages yet.</div>
            ) : (
              <ul className="list-mess">
                {leads.map((lead) => (
                  <li key={lead._id} className="mess-item">
                    <div className="user-box">
                      <div className="avatar">
                        <div style={{ width: 51, height: 51, borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, color: "#555" }}>
                          {(lead.inquirerName || "?")[0].toUpperCase()}
                        </div>
                      </div>
                      <div className="content">
                        <div className="name fw-6">{lead.inquirerName || "Guest"}</div>
                        <span className="caption-2 text-variant-3">{timeAgo(lead.createdAt)}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "#555", marginTop: 6, lineHeight: 1.5 }}>
                      {lead.message?.slice(0, 100)}{lead.message?.length > 100 ? "…" : ""}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Reviews */}
          <div className="widget-box-2 mess-box" style={{ borderRadius: 16, border: "1px solid #e8eaf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ width: 4, height: 18, background: "#f0822d", borderRadius: 2 }} />
              <h5 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#111827" }}>Recent Reviews</h5>
            </div>
            {loading ? (
              <div style={{ padding: 16, color: "#888", fontSize: 13 }}>Loading…</div>
            ) : reviews.length === 0 ? (
              <div style={{ padding: 16, color: "#888", fontSize: 13 }}>No reviews yet.</div>
            ) : (
              <ul className="list-mess">
                {reviews.map((rev) => (
                  <li key={rev._id} className="mess-item">
                    <div className="user-box">
                      <div className="avatar">
                        <div style={{ width: 51, height: 51, borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, color: "#555" }}>
                          {(rev.userId?.name || "?")[0].toUpperCase()}
                        </div>
                      </div>
                      <div className="content">
                        <div className="name fw-6">{rev.userId?.name || "Anonymous"}</div>
                        <span className="caption-2 text-variant-3">{timeAgo(rev.createdAt)}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "#555", marginTop: 6, lineHeight: 1.5 }}>
                      {rev.comment?.slice(0, 100)}{rev.comment?.length > 100 ? "…" : ""}
                    </p>
                    <div className="ratings">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className="icon-star" style={{ color: i < (rev.rating || 5) ? "#f59e0b" : "#d1d5db" }} />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent Notifications */}
          <div className="widget-box-2 mess-box mt-20" style={{ borderRadius: 16, border: "1px solid #e8eaf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden", marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ width: 4, height: 18, background: "#f0822d", borderRadius: 2 }} />
              <h5 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#111827" }}>Notifications</h5>
            </div>
            {loading ? (
              <div style={{ padding: 16, color: "#888", fontSize: 13 }}>Loading…</div>
            ) : notifications.length === 0 ? (
              <div style={{ padding: 16, color: "#888", fontSize: 13 }}>No notifications yet.</div>
            ) : (
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {notifications.map((n) => (
                  <li key={n._id} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "12px 16px",
                    borderBottom: "1px solid #f9fafb",
                    background: n.isRead ? "transparent" : "rgba(240,130,45,0.04)",
                    borderLeft: n.isRead ? "none" : "3px solid #f0822d",
                  }}>
                    <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{NOTIF_ICONS[n.type] || "🔔"}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: n.isRead ? 500 : 700, color: "#111827", lineHeight: 1.4 }}>{n.title}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{timeAgo(n.createdAt)}</div>
                    </div>
                    {!n.isRead && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f0822d", flexShrink: 0, marginTop: 5 }} />}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Root component ──────────────────────────────────────────────────────────

export default function Dashboard() {
  const [role, setRole] = useState(null);
  const [kycStatus, setKycStatus] = useState(null);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      setRole(u.role || "buyer");
    } catch {
      setRole("buyer");
    }
  }, []);

  useEffect(() => {
    if (!role || role === "buyer" || role === "user") return;
    apiClient.get("/kyc/status")
      .then((res) => setKycStatus(res.data?.kyc?.status || "unsubmitted"))
      .catch(() => setKycStatus("unsubmitted"));
  }, [role]);

  const isBuyer = role === "buyer" || role === "user";

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        {role === null ? (
          <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading…</div>
        ) : isBuyer ? (
          <BuyerDashboard />
        ) : (
          <SellerDashboard role={role} kycStatus={kycStatus} />
        )}

        <div className="row">
          <div className="col-xl-9">
            <div className="footer-dashboard">
              <p>Copyright © {new Date().getFullYear()} Globperty</p>
              <ul className="list">
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay-dashboard" />
    </div>
  );
}
