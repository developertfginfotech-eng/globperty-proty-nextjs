"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAgentProperties, deleteProperty } from "@/utils/propertyApi";

const STATUS_COLORS = {
  approved: { bg: "#d1fae5", color: "#065f46", label: "Approved" },
  pending:  { bg: "#fef9c3", color: "#854d0e", label: "Pending" },
  rejected: { bg: "#fee2e2", color: "#991b1b", label: "Rejected" },
};

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:4000";

export default function Property() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    getAgentProperties()
      .then((data) => { setProperties(data); setFiltered(data); })
      .catch(() => setError("Failed to load your properties."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = properties;
    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }
    if (search.trim()) {
      result = result.filter((p) =>
        p.title?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
  }, [search, statusFilter, properties]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete property.");
    } finally {
      setDeleting(null);
    }
  };

  const getImageSrc = (p) => {
    if (!p.imageSrc) return "/images/home/house-db-1.jpg";
    if (p.imageSrc.startsWith("http")) return p.imageSrc;
    return `${BACKEND_URL}${p.imageSrc}`;
  };

  return (
    <div className="main-content w-100">
      <div className="main-content-inner wrap-dashboard-content">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="row">
          <div className="col-md-3">
            <fieldset className="box-fieldset">
              <label>Post Status:</label>
              <select
                className="form-control"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 12px" }}
              >
                <option value="all">All</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </fieldset>
          </div>
          <div className="col-md-9">
            <fieldset className="box-fieldset">
              <label>Search:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </fieldset>
          </div>
        </div>

        <div className="widget-box-2 wd-listing mt-20">
          <h3 className="title">My Properties</h3>

          {loading && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading your properties…</div>
          )}

          {error && (
            <div style={{ padding: 20, background: "#fee2e2", borderRadius: 8, color: "#991b1b", marginBottom: 16 }}>{error}</div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
              {properties.length === 0
                ? <>No properties yet. <Link href="/add-property" style={{ color: "#f96b25" }}>Add your first property →</Link></>
                : "No properties match your filter."}
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="wrap-table">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Listing</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((property) => {
                      const statusKey = property.status?.toLowerCase() || "pending";
                      const badge = STATUS_COLORS[statusKey] || STATUS_COLORS.pending;
                      return (
                        <tr key={property.id}>
                          <td>
                            <div className="listing-box">
                              <div className="images">
                                <img
                                  alt={property.title}
                                  src={getImageSrc(property)}
                                  width={100}
                                  height={70}
                                  style={{ objectFit: "cover", borderRadius: 6 }}
                                  onError={(e) => { e.target.src = "/images/home/house-db-1.jpg"; }}
                                />
                              </div>
                              <div className="content">
                                <div className="title">
                                  <Link href={`/property-detail-v1/${property.id}`} className="link">
                                    {property.title || "Untitled"}
                                  </Link>
                                </div>
                                <div className="text-date" style={{ fontSize: 13, color: "#888" }}>
                                  {property.location || `${property.city || ""}`}
                                </div>
                                <div className="text-btn text-color-primary" style={{ fontWeight: 600 }}>
                                  ${(property.price || 0).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="status-wrap">
                              <span style={{
                                display: "inline-block",
                                background: badge.bg,
                                color: badge.color,
                                borderRadius: 20,
                                padding: "4px 14px",
                                fontSize: 13,
                                fontWeight: 600,
                              }}>
                                {badge.label}
                              </span>
                              {statusKey === "pending" && (
                                <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>
                                  Awaiting admin approval
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            <ul className="list-action">
                              <li>
                                <Link href={`/add-property?edit=${property.id}`} className="item">
                                  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.2413 2.9915L12.366 1.86616C12.6005 1.63171 12.9184 1.5 13.25 1.5C13.5816 1.5 13.8995 1.63171 14.134 1.86616C14.3685 2.10062 14.5002 2.4186 14.5002 2.75016C14.5002 3.08173 14.3685 3.39971 14.134 3.63416L4.55467 13.2135C4.20222 13.5657 3.76758 13.8246 3.29 13.9668L1.5 14.5002L2.03333 12.7102C2.17552 12.2326 2.43442 11.7979 2.78667 11.4455L11.242 2.9915H11.2413ZM11.2413 2.9915L13 4.75016" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <button
                                  className="item"
                                  onClick={() => handleDelete(property.id)}
                                  disabled={deleting === property.id}
                                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: deleting === property.id ? "#ccc" : "inherit" }}
                                >
                                  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  {deleting === property.id ? "Deleting…" : "Delete"}
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
