"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function RoleBadge({ role }) {
  const map = {
    buyer:  { bg: "#EFF6FF", color: "#3B82F6" },
    seller: { bg: "#FFF7ED", color: "#f0822d" },
    broker: { bg: "#F5F3FF", color: "#8B5CF6" },
    admin:  { bg: "#ECFDF5", color: "#10B981" },
  };
  const s = map[(role || "").toLowerCase()] || { bg: "#F3F4F6", color: "#6B7280" };
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      fontSize: 11,
      fontWeight: 700,
      padding: "2px 10px",
      borderRadius: 20,
      textTransform: "capitalize",
    }}>
      {role || "unknown"}
    </span>
  );
}

function KycBadge({ status }) {
  const map = {
    pending:  { bg: "#FFF7ED", color: "#f0822d" },
    approved: { bg: "#ECFDF5", color: "#10B981" },
    rejected: { bg: "#FEF2F2", color: "#EF4444" },
  };
  const s = map[(status || "").toLowerCase()] || { bg: "#F3F4F6", color: "#6B7280" };
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      fontSize: 11,
      fontWeight: 700,
      padding: "2px 10px",
      borderRadius: 20,
      textTransform: "capitalize",
    }}>
      {status || "unknown"}
    </span>
  );
}

function StatCard({ label, value, color, bg }) {
  return (
    <div style={{
      background: bg,
      borderRadius: 10,
      padding: "14px 16px",
      borderLeft: `3px solid ${color}`,
      flex: 1,
      minWidth: 110,
    }}>
      <div style={{ fontSize: 26, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginTop: 2 }}>{label}</div>
    </div>
  );
}

// ─── Users Tab ────────────────────────────────────────────────────────────────
function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    apiClient.get("/auth/admin/users")
      .then((res) => {
        const raw = res.data;
        setUsers(Array.isArray(raw) ? raw : (Array.isArray(raw?.users) ? raw.users : []));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    setDeletingId(userId);
    try {
      await apiClient.delete(`/auth/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch {
      alert("Failed to delete user. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const total   = users.length;
  const buyers  = users.filter((u) => u.role === "buyer").length;
  const sellers = users.filter((u) => u.role === "seller").length;
  const brokers = users.filter((u) => u.role === "broker").length;

  return (
    <div>
      {/* Stat cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <StatCard label="Total Users"  value={total}   color="#6B7280" bg="#F3F4F6" />
        <StatCard label="Buyers"       value={buyers}  color="#3B82F6" bg="#EFF6FF" />
        <StatCard label="Sellers"      value={sellers} color="#f0822d" bg="#FFF7ED" />
        <StatCard label="Brokers"      value={brokers} color="#8B5CF6" bg="#F5F3FF" />
      </div>

      {loading && <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading users…</div>}

      {!loading && users.length === 0 && (
        <div style={{ padding: 40, textAlign: "center", color: "#888" }}>No users found.</div>
      )}

      {!loading && users.length > 0 && (
        <div className="wrap-table">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="file-delete">
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #f0822d, #e56c1a)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>
                            {(user.name || "?")[0].toUpperCase()}
                          </span>
                        </div>
                        <span style={{ fontWeight: 600, fontSize: 13, color: "#1a2332" }}>
                          {user.name || "—"}
                        </span>
                      </div>
                    </td>
                    <td><span style={{ fontSize: 13, color: "#555" }}>{user.email || "—"}</span></td>
                    <td><RoleBadge role={user.role} /></td>
                    <td><span style={{ fontSize: 13, color: "#888" }}>{formatDate(user.createdAt)}</span></td>
                    <td>
                      <button
                        onClick={() => handleDelete(user._id)}
                        disabled={!!deletingId}
                        style={{
                          background: "#FEF2F2",
                          color: "#EF4444",
                          border: "1px solid #fecaca",
                          borderRadius: 6,
                          padding: "4px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: deletingId ? "not-allowed" : "pointer",
                          opacity: deletingId === user._id ? 0.6 : 1,
                        }}
                      >
                        {deletingId === user._id ? "…" : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Pending Listings Tab ─────────────────────────────────────────────────────
function PendingListingsTab() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    apiClient.get("/property/admin/pending")
      .then((res) => {
        const raw = res.data;
        setProperties(Array.isArray(raw) ? raw : (Array.isArray(raw?.properties) ? raw.properties : []));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleAction = async (propId, action) => {
    setActionId(propId + action);
    try {
      await apiClient.put(`/property/admin/${action}/${propId}`);
      setProperties((prev) => prev.filter((p) => p._id !== propId));
    } catch {
      alert(`Failed to ${action} property. Please try again.`);
    } finally {
      setActionId(null);
    }
  };

  return (
    <div>
      {loading && <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading listings…</div>}

      {!loading && properties.length === 0 && (
        <div style={{ padding: 40, textAlign: "center", color: "#888" }}>No pending listings.</div>
      )}

      {!loading && properties.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {properties.map((prop) => {
            const title = prop.propertyName || prop.title || "Untitled";
            const sellerName = prop.seller?.name || prop.createdBy?.name || "Unknown Seller";
            const price = prop.price != null ? `$${Number(prop.price).toLocaleString()}` : "—";
            const isActing = actionId && actionId.startsWith(prop._id);

            return (
              <div key={prop._id} style={{
                background: "#fff",
                border: "1px solid #eef0f3",
                borderRadius: 12,
                padding: "16px 20px",
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                flexWrap: "wrap",
              }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1a2332", marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13, color: "#666", marginBottom: 2 }}>
                    {prop.city && <span style={{ marginRight: 12 }}>{prop.city}</span>}
                    <span style={{ fontWeight: 600, color: "#f0822d" }}>{price}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    Seller: <span style={{ fontWeight: 600, color: "#555" }}>{sellerName}</span>
                    <span style={{ marginLeft: 12 }}>Listed: {formatDate(prop.createdAt)}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                  <button
                    onClick={() => handleAction(prop._id, "approve")}
                    disabled={!!actionId}
                    style={{
                      background: "#ECFDF5",
                      color: "#10B981",
                      border: "1px solid #a7f3d0",
                      borderRadius: 6,
                      padding: "6px 16px",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: isActing ? "not-allowed" : "pointer",
                      opacity: isActing ? 0.6 : 1,
                    }}
                  >
                    {actionId === prop._id + "approve" ? "…" : "Approve"}
                  </button>
                  <button
                    onClick={() => handleAction(prop._id, "reject")}
                    disabled={!!actionId}
                    style={{
                      background: "#FEF2F2",
                      color: "#EF4444",
                      border: "1px solid #fecaca",
                      borderRadius: 6,
                      padding: "6px 16px",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: isActing ? "not-allowed" : "pointer",
                      opacity: isActing ? 0.6 : 1,
                    }}
                  >
                    {actionId === prop._id + "reject" ? "…" : "Reject"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── KYC Tab ──────────────────────────────────────────────────────────────────
function KycTab() {
  const [kycs, setKycs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    apiClient.get("/kyc/all")
      .then((res) => {
        const raw = res.data;
        setKycs(Array.isArray(raw) ? raw : (Array.isArray(raw?.kycs) ? raw.kycs : []));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleVerify = async (kycId, status) => {
    setActionId(kycId + status);
    try {
      await apiClient.put(`/kyc/verify/${kycId}`, { status });
      setKycs((prev) =>
        prev.map((k) => k._id === kycId ? { ...k, status } : k)
      );
    } catch {
      alert(`Failed to update KYC status. Please try again.`);
    } finally {
      setActionId(null);
    }
  };

  return (
    <div>
      {loading && <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading KYC requests…</div>}

      {!loading && kycs.length === 0 && (
        <div style={{ padding: 40, textAlign: "center", color: "#888" }}>No KYC submissions found.</div>
      )}

      {!loading && kycs.length > 0 && (
        <div className="wrap-table">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Account Type</th>
                  <th>Country</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {kycs.map((kyc) => {
                  const user = kyc.userId || {};
                  const userName = user.name || user.fullName || "Unknown";
                  const userEmail = user.email || "";
                  const isPending = (kyc.status || "").toLowerCase() === "pending";
                  const isActing = actionId && actionId.startsWith(kyc._id);

                  return (
                    <tr key={kyc._id} className="file-delete">
                      <td>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13, color: "#1a2332" }}>{userName}</div>
                          {userEmail && <div style={{ fontSize: 11, color: "#888" }}>{userEmail}</div>}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: 13, color: "#555", textTransform: "capitalize" }}>
                          {kyc.accountType || "—"}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: 13, color: "#555" }}>{kyc.country || "—"}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: 13, color: "#888" }}>{formatDate(kyc.createdAt)}</span>
                      </td>
                      <td><KycBadge status={kyc.status} /></td>
                      <td>
                        {isPending ? (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button
                              onClick={() => handleVerify(kyc._id, "approved")}
                              disabled={!!actionId}
                              style={{
                                background: "#ECFDF5",
                                color: "#10B981",
                                border: "1px solid #a7f3d0",
                                borderRadius: 6,
                                padding: "4px 12px",
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: isActing ? "not-allowed" : "pointer",
                                opacity: isActing ? 0.6 : 1,
                              }}
                            >
                              {actionId === kyc._id + "approved" ? "…" : "Verify"}
                            </button>
                            <button
                              onClick={() => handleVerify(kyc._id, "rejected")}
                              disabled={!!actionId}
                              style={{
                                background: "#FEF2F2",
                                color: "#EF4444",
                                border: "1px solid #fecaca",
                                borderRadius: 6,
                                padding: "4px 12px",
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: isActing ? "not-allowed" : "pointer",
                                opacity: isActing ? 0.6 : 1,
                              }}
                            >
                              {actionId === kyc._id + "rejected" ? "…" : "Reject"}
                            </button>
                          </div>
                        ) : (
                          <KycBadge status={kyc.status} />
                        )}
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
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const CRM_TABS = ["Users", "Pending Listings", "KYC"];

export default function AdminCRM() {
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState("Users");

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      setRole(u.role || "");
    } catch {
      setRole("");
    }
  }, []);

  if (role === null) {
    return (
      <div className="main-content w-100">
        <div className="main-content-inner">
          <div className="widget-box-2 wd-listing">
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading…</div>
          </div>
        </div>
        <div className="overlay-dashboard" />
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <div className="main-content w-100">
        <div className="main-content-inner">
          <div className="widget-box-2 wd-listing">
            <h3 className="title">Admin CRM</h3>
            <div style={{
              margin: "20px 0",
              padding: "20px 24px",
              background: "#FEF2F2",
              border: "1px solid #fecaca",
              borderRadius: 10,
              color: "#EF4444",
              fontWeight: 600,
              fontSize: 15,
              textAlign: "center",
            }}>
              Admin access only. You do not have permission to view this page.
            </div>
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

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          <h3 className="title">Admin CRM</h3>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "2px solid #f0f0f0" }}>
            {CRM_TABS.map((tab) => (
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
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Users"            && <UsersTab />}
          {activeTab === "Pending Listings" && <PendingListingsTab />}
          {activeTab === "KYC"              && <KycTab />}
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
