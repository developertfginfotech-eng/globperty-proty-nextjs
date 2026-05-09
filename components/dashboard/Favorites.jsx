"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    apiClient.get("/favorites")
      .then((res) => setFavorites(res.data.favorites || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (propertyId, favId) => {
    if (!confirm("Remove from favorites?")) return;
    setRemoving(favId);
    try {
      await apiClient.delete(`/favorites/${propertyId}`);
      setFavorites((prev) => prev.filter((f) => f._id !== favId));
    } catch {
      alert("Failed to remove from favorites.");
    } finally {
      setRemoving(null);
    }
  };

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          <h3 className="title">My Favorites</h3>

          {loading && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading your favorites…</div>
          )}

          {!loading && favorites.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
              No favorites yet.{" "}
              <Link href="/property-gird-left-sidebar" style={{ color: "#f96b25" }}>
                Browse properties →
              </Link>
            </div>
          )}

          {!loading && favorites.length > 0 && (
            <div className="wrap-table">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Listing</th>
                      <th>Saved On</th>
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
                        <tr key={fav._id} className="file-delete">
                          <td>
                            <div className="listing-box">
                              <div className="images">
                                <img
                                  alt={title}
                                  src={photo}
                                  width={100}
                                  height={70}
                                  style={{ objectFit: "cover", borderRadius: 6 }}
                                  onError={(e) => { e.target.src = "/images/home/house-db-1.jpg"; }}
                                />
                              </div>
                              <div className="content">
                                <div className="title">
                                  <Link href={`/property-detail-v1/${p._id}`} className="link">
                                    {title}
                                  </Link>
                                </div>
                                <div className="text-date" style={{ fontSize: 13, color: "#888" }}>
                                  {location}
                                </div>
                                <div className="text-btn text-color-primary" style={{ fontWeight: 600 }}>
                                  {price}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ fontSize: 13, color: "#555" }}>{formatDate(fav.createdAt)}</span>
                          </td>
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
                                  disabled={removing === fav._id}
                                  onClick={() => handleRemove(p._id, fav._id)}
                                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: removing === fav._id ? "#ccc" : "inherit", padding: 0 }}
                                >
                                  <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <path d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  {removing === fav._id ? "Removing…" : "Remove"}
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
