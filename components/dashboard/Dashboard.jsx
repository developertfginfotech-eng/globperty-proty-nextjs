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
        {role && role !== "buyer" && kycStatus && kycStatus !== "verified" && (
          <div style={{
            marginBottom: 24,
            padding: "14px 20px",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            background: kycStatus === "pending" ? "#eff6ff" : kycStatus === "rejected" ? "#fee2e2" : "#fef9c3",
            border: `1.5px solid ${kycStatus === "pending" ? "#93c5fd" : kycStatus === "rejected" ? "#fca5a5" : "#fbbf24"}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>
                {kycStatus === "pending" ? "⏳" : kycStatus === "rejected" ? "❌" : "⚠️"}
              </span>
              <div>
                <strong style={{ fontSize: 15, color: "#1a1a1a" }}>
                  {kycStatus === "pending" ? "KYC Under Review" : kycStatus === "rejected" ? "KYC Rejected" : "KYC Not Completed"}
                </strong>
                <p style={{ margin: 0, fontSize: 13, color: "#555" }}>
                  {kycStatus === "pending"
                    ? "Your documents are being reviewed. You'll be notified once approved."
                    : kycStatus === "rejected"
                    ? "Your KYC was rejected. Please resubmit your documents."
                    : "Complete KYC verification to list properties on Globperty."}
                </p>
              </div>
            </div>
            {kycStatus !== "pending" && (
              <Link href="/kyc-property-verification" style={{ background: "#eb6753", color: "#fff", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                {kycStatus === "rejected" ? "Resubmit KYC →" : "Complete KYC →"}
              </Link>
            )}
          </div>
        )}

        {/* Stats counters */}
        <div className="flat-counter-v2 tf-counter">
          <div className="counter-box">
            <div className="box-icon">
              <span className="icon">
                <svg width={36} height={36} viewBox="0 0 36 36" fill="none">
                  <path d="M22.5 3H9C8.20435 3 7.44129 3.31607 6.87868 3.87868C6.31607 4.44129 6 5.20435 6 6V30C6 30.7956 6.31607 31.5587 6.87868 32.1213C7.44129 32.6839 8.20435 33 9 33H27C27.7956 33 28.5587 32.6839 29.1213 32.1213C29.6839 31.5587 30 30.7956 30 30V10.5L22.5 3Z" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 3V9C21 9.79565 21.3161 10.5587 21.8787 11.1213C22.4413 11.6839 23.2044 12 24 12H30" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 19.5H15" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 19.5H24" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 25.5H15" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 25.5H24" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="content-box">
              <div className="title-count text-variant-1">Your listing</div>
              <div className="box-count d-flex align-items-end">
                <div className="number">{loading ? "—" : stats.totalProperties ?? 0}</div>
              </div>
            </div>
          </div>

          <div className="counter-box">
            <div className="box-icon">
              <span className="icon">
                <svg width={36} height={36} viewBox="0 0 36 36" fill="none">
                  <path d="M18.5061 32.991C15.4409 33.0945 12.4177 32.2559 9.84374 30.5882C7.26982 28.9206 5.26894 26.504 4.11073 23.6642C2.95253 20.8243 2.69265 17.6977 3.36614 14.7056C4.03962 11.7135 5.61409 8.9998 7.87737 6.9301C10.1407 4.86039 12.984 3.5342 16.0242 3.13022C19.0644 2.72624 22.1554 3.2639 24.8807 4.67074C27.6059 6.07757 29.8344 8.28598 31.2659 10.9984C32.6974 13.7107 33.263 16.7967 32.8866 19.8405" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 9V18L21 19.5" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 27L27 33L33 27" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M27 21V33" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="content-box">
              <div className="title-count text-variant-1">Pending</div>
              <div className="box-count d-flex align-items-end">
                <div className="number">{loading ? "—" : String(pendingCount).padStart(2, "0")}</div>
              </div>
            </div>
          </div>

          <div className="counter-box">
            <div className="box-icon">
              <span className="icon">
                <svg width={36} height={36} viewBox="0 0 36 36" fill="none">
                  <path d="M6 33H27C27.7956 33 28.5587 32.6839 29.1213 32.1213C29.6839 31.5587 30 30.7956 30 30V10.5L22.5 3H9C8.20435 3 7.44129 3.31607 6.87868 3.87868C6.31607 4.44129 6 5.20435 6 6V9" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 3V9C21 9.79565 21.3161 10.5587 21.8787 11.1213C22.4413 11.6839 23.2044 12 24 12H30" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.4348 16.05C14.9224 15.5384 14.2692 15.191 13.5586 15.0521C12.848 14.9132 12.1121 14.989 11.4448 15.27C11.0098 15.45 10.6048 15.72 10.2748 16.065L9.74976 16.575L9.22476 16.065C8.71531 15.5539 8.0656 15.2055 7.35797 15.064C6.65033 14.9225 5.9166 14.9942 5.24976 15.27C4.79976 15.45 4.40976 15.72 4.06476 16.065C2.63976 17.475 2.56476 19.86 4.36476 21.675L9.74976 27L15.1498 21.675C16.9498 19.86 16.8598 17.475 15.4348 16.065V16.05Z" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="content-box">
              <div className="title-count text-variant-1">Favorites</div>
              <div className="d-flex align-items-end">
                <div className="number">{loading ? "—" : String(stats.totalFavorites ?? 0).padStart(2, "0")}</div>
              </div>
            </div>
          </div>

          <div className="counter-box">
            <div className="box-icon">
              <span className="icon">
                <svg width={36} height={36} viewBox="0 0 36 36" fill="none">
                  <path d="M31.5 22.5C31.5 23.2956 31.1839 24.0587 30.6213 24.6213C30.0587 25.1839 29.2956 25.5 28.5 25.5H10.5L4.5 31.5V7.5C4.5 6.70435 4.81607 5.94129 5.37868 5.37868C5.94129 4.81607 6.70435 4.5 7.5 4.5H28.5C29.2956 4.5 30.0587 4.81607 30.6213 5.37868C31.1839 5.94129 31.5 6.70435 31.5 7.5V22.5Z" stroke="#F1913D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="content-box">
              <div className="title-count text-variant-1">Reviews</div>
              <div className="d-flex align-items-end">
                <div className="number">{loading ? "—" : stats.totalReviews ?? 0}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-9">
            {/* My Favorites */}
            <div className="widget-box-2 wd-listing mb-24">
              <h3 className="title">My Favorites</h3>
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
            <div className="widget-box-2 wd-chart">
              <h5 className="title">Page Inside</h5>
              <div className="chart-box">
                <LineChart />
              </div>
            </div>
          </div>

          <div className="col-xl-3">
            {/* Messages / Inquiries */}
            <div className="widget-box-2 mess-box mb-20">
              <h5 className="title">Messages</h5>
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
            <div className="widget-box-2 mess-box">
              <h5 className="title">Recent Reviews</h5>
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
