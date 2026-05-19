"use client";
import React, { useState, useEffect } from "react";
import { getSavedSearches, deleteSavedSearch } from "@/utils/savedSearchApi";

const TrashIcon = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function formatParams(params = {}) {
  if (!params || typeof params !== "object") return "—";
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => (
      <span key={k} style={{ marginRight: 6 }}>
        {k}: <span className="fw-6">{String(v)}</span> |
      </span>
    ));
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function SaveSearch() {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    getSavedSearches()
      .then(setSearches)
      .catch(() => setError("Failed to load saved searches."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this saved search?")) return;
    setDeletingId(id);
    try {
      await deleteSavedSearch(id);
      setSearches((prev) => prev.filter((s) => s._id !== id && s.id !== id));
    } catch {
      alert("Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="main-content w-100">
      <div className="main-content-inner style-3">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>
        <div className="widget-box-2 wd-listing">
          <h3 className="title">My Saved Searches</h3>
          <div className="tf-new-listing w-100">
            <div className="new-listing wrap-table">
              <div className="table-content">
                <div className="wrap-listing table-responsive">

                  {loading && (
                    <div style={{ padding: "40px 0", textAlign: "center", color: "#6b7280" }}>
                      Loading saved searches…
                    </div>
                  )}

                  {!loading && error && (
                    <div style={{ padding: "32px 0", textAlign: "center", color: "#dc2626" }}>{error}</div>
                  )}

                  {!loading && !error && searches.length === 0 && (
                    <div style={{ padding: "48px 0", textAlign: "center", color: "#9ca3af" }}>
                      <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 12 }}>
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      <p style={{ margin: 0, fontSize: 14 }}>No saved searches yet. Save a search from the listings page.</p>
                    </div>
                  )}

                  {!loading && !error && searches.length > 0 && (
                    <table className="table-save-search">
                      <thead>
                        <tr>
                          <th className="fw-6">Title</th>
                          <th className="fw-6">Parameters</th>
                          <th className="fw-6">Email</th>
                          <th className="fw-6">Date Saved</th>
                          <th className="fw-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searches.map((s) => {
                          const id = s._id || s.id;
                          return (
                            <tr key={id} className="file-delete">
                              <td>
                                <a href={`/listings?${new URLSearchParams(s.params || {}).toString()}`}>
                                  {s.title || s.name || "Saved Search"}
                                </a>
                              </td>
                              <td>
                                <div>{formatParams(s.params || s.parameters || s.filters)}</div>
                              </td>
                              <td>
                                <div>{s.email || s.userEmail || "—"}</div>
                              </td>
                              <td>
                                <div>{formatDate(s.createdAt || s.date)}</div>
                              </td>
                              <td>
                                <ul className="list-action">
                                  <li>
                                    <a
                                      className="remove-file item"
                                      style={{ cursor: deletingId === id ? "wait" : "pointer", opacity: deletingId === id ? 0.5 : 1 }}
                                      onClick={() => handleDelete(id)}
                                    >
                                      <TrashIcon />
                                      {deletingId === id ? "Deleting…" : "Delete"}
                                    </a>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}

                </div>
              </div>
            </div>
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
