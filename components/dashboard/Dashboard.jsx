"use client";
import React, { useEffect, useState } from "react";
import LineChart from "./Chart";
import Link from "next/link";
import Image from "next/image";
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

export default function Dashboard() {
  const [stats, setStats] = useState({ totalProperties: 0, totalFavorites: 0, totalReviews: 0 });
  const [pendingCount, setPendingCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kycStatus, setKycStatus] = useState(null); // null | 'unsubmitted' | 'pending' | 'verified' | 'rejected'
  const [role, setRole] = useState("");

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      setRole(u.role || "");
    } catch {}
  }, []);

  useEffect(() => {
    if (!role || role === "buyer") return;
    apiClient.get("/kyc/status")
      .then(res => {
        const s = res.data?.kyc?.status;
        setKycStatus(s || "unsubmitted");
      })
      .catch(() => setKycStatus("unsubmitted"));
  }, [role]);

  useEffect(() => {
    Promise.allSettled([
      apiClient.get("/dashboard/stats"),
      getAgentProperties(),
      apiClient.get("/favorites"),
      apiClient.get("/inquiries"),
      apiClient.get("/reviews/my-properties"),
    ]).then(([statsRes, propsRes, favsRes, inqRes, revRes]) => {
      if (statsRes.status === "fulfilled") {
        setStats(statsRes.value.data.stats || {});
      }
      if (propsRes.status === "fulfilled") {
        const pending = propsRes.value.filter((p) => p.status === "pending").length;
        setPendingCount(pending);
      }
      if (favsRes.status === "fulfilled") {
        setFavorites(favsRes.value.data.favorites || []);
      }
      if (inqRes.status === "fulfilled") {
        setInquiries((inqRes.value.data.data || []).slice(0, 4));
      }
      if (revRes.status === "fulfilled") {
        setReviews((revRes.value.data.reviews || []).slice(0, 5));
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        {/* KYC status banner */}
        {role && role !== "buyer" && role !== "admin" && role !== "super_admin" && kycStatus && kycStatus !== "verified" && (() => {
          const cfg = {
            pending:       { bg: "linear-gradient(135deg,#eff6ff,#dbeafe)", border: "#93c5fd", iconBg: "#3b82f6", label: "KYC Under Review",   sub: "Your documents are being verified. We'll notify you once approved.", icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
            rejected:      { bg: "linear-gradient(135deg,#fef2f2,#fee2e2)", border: "#fca5a5", iconBg: "#ef4444", label: "KYC Rejected",        sub: "Your KYC was rejected. Please resubmit your documents.", icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> },
            unsubmitted:   { bg: "linear-gradient(135deg,#fffbeb,#fef3c7)", border: "#fbbf24", iconBg: "#f59e0b", label: "KYC Not Completed",   sub: "Complete identity verification to list properties on Globperty.", icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
          };
          const c = cfg[kycStatus] || cfg.unsubmitted;
          return (
            <div style={{ marginBottom: 24, padding: "16px 20px", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, background: c.bg, border: `1.5px solid ${c.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 2px 8px ${c.border}` }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#111827", marginBottom: 2, letterSpacing: "-0.1px" }}>{c.label}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{c.sub}</div>
                </div>
              </div>
              {kycStatus !== "pending" && (
                <Link href="/kyc-property-verification" style={{ background: "#f0822d", color: "#fff", padding: "9px 20px", borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(240,130,45,0.35)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  {kycStatus === "rejected" ? "Resubmit KYC" : "Complete KYC"}
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </Link>
              )}
            </div>
          );
        })()}

        {/* Stats counters */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            {
              label: "My Listings", value: loading ? "—" : stats.totalProperties ?? 0, href: "/my-property",
              color: "#f0822d", lightBg: "rgba(240,130,45,0.08)",
              icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#f0822d" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
            },
            {
              label: "Pending", value: loading ? "—" : pendingCount, href: "/my-property",
              color: "#8b5cf6", lightBg: "rgba(139,92,246,0.08)",
              icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
            },
            {
              label: "Favorites", value: loading ? "—" : stats.totalFavorites ?? 0, href: "/my-favorites",
              color: "#ef4444", lightBg: "rgba(239,68,68,0.08)",
              icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
            },
            {
              label: "Reviews", value: loading ? "—" : stats.totalReviews ?? 0, href: "/review",
              color: "#10b981", lightBg: "rgba(16,185,129,0.08)",
              icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
            },
          ].map(card => (
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
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111827", letterSpacing: "-0.2px" }}>My Favorites</h3>
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
                      <thead>
                        <tr>
                          <th>Listing</th>
                          <th>Saved</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {favorites.map((fav) => {
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
                                      <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                                        <path d="M2 8s2.667-5.333 6-5.333S14 8 14 8s-2.667 5.333-6 5.333S2 8 2 8z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="8" cy="8" r="2" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                      View
                                    </Link>
                                  </li>
                                  <li>
                                    <button
                                      className="item"
                                      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#A3ABB0", padding: 0 }}
                                      onClick={async () => {
                                        await apiClient.delete(`/favorites/${p._id}`);
                                        setFavorites((prev) => prev.filter((f) => f._id !== fav._id));
                                      }}
                                    >
                                      <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                                        <path d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                      Remove
                                    </button>
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
                <h5 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111827", letterSpacing: "-0.2px" }}>Page Visits</h5>
              </div>
              <div className="chart-box">
                <LineChart />
              </div>
            </div>
          </div>

          <div className="col-xl-3">
            {/* Messages / Inquiries */}
            <div className="widget-box-2 mess-box mb-20" style={{ borderRadius: 16, border: "1px solid #e8eaf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ width: 4, height: 18, background: "#f0822d", borderRadius: 2 }} />
                <h5 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#111827" }}>Messages</h5>
              </div>
              {loading ? (
                <div style={{ padding: 16, color: "#888", fontSize: 13 }}>Loading…</div>
              ) : inquiries.length === 0 ? (
                <div style={{ padding: 16, color: "#888", fontSize: 13 }}>No messages yet.</div>
              ) : (
                <ul className="list-mess">
                  {inquiries.map((inq) => (
                    <li key={inq._id} className="mess-item">
                      <div className="user-box">
                        <div className="avatar">
                          <div style={{ width: 51, height: 51, borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, color: "#555" }}>
                            {(inq.inquirerName || "?")[0].toUpperCase()}
                          </div>
                        </div>
                        <div className="content">
                          <div className="name fw-6">{inq.inquirerName || "Guest"}</div>
                          <span className="caption-2 text-variant-3">{timeAgo(inq.createdAt)}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: 13, color: "#555", marginTop: 6, lineHeight: 1.5 }}>
                        {inq.message?.slice(0, 100)}{inq.message?.length > 100 ? "…" : ""}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recent Reviews */}
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
          </div>
        </div>

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
