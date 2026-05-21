"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function InteractionChip({ label }) {
  const styles = {
    Lead:     { bg: "#EFF6FF", color: "#3B82F6" },
    Saved:    { bg: "#F5F3FF", color: "#8B5CF6" },
    Assigned: { bg: "#DCFCE7", color: "#16A34A" },
  };
  const s = styles[label] || { bg: "#F3F4F6", color: "#6B7280" };
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      fontSize: 11,
      fontWeight: 600,
      padding: "2px 9px",
      borderRadius: 20,
      marginRight: 4,
      display: "inline-block",
    }}>{label}</span>
  );
}

export default function Leads() {
  const [role, setRole] = useState("");
  const [leads, setLeads] = useState([]);
  const [propertyCount, setPropertyCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let userRole = "";
    try { userRole = JSON.parse(localStorage.getItem("user") || "{}").role || ""; } catch {}
    setRole(userRole);

    if (userRole === "buyer" || userRole === "user") {
      setLoading(false);
      return;
    }

    Promise.allSettled([
      apiClient.get("/property/agent/properties"),
      apiClient.get("/leads"),
    ]).then(([propsRes, leadsRes]) => {
      const rawProps = propsRes.status === "fulfilled" ? propsRes.value.data : null;
      const props = Array.isArray(rawProps) ? rawProps : (Array.isArray(rawProps?.properties) ? rawProps.properties : []);
      setPropertyCount(props.length);

      const rawLeads = leadsRes.status === "fulfilled" ? leadsRes.value.data : null;
      const assignedLeads = Array.isArray(rawLeads)
        ? rawLeads
        : (Array.isArray(rawLeads?.leads) ? rawLeads.leads : (Array.isArray(rawLeads?.data) ? rawLeads.data : []));

      const mapped = assignedLeads.map((l) => {
        const buyer = l.buyerId || {};
        return {
          key: l._id,
          name: buyer.name || l.inquirerName || "Unknown",
          email: buyer.email || l.inquirerEmail || "—",
          propertyName: l.propertyTitle || l.propertyId?.propertyName || l.propertyId?.title || "—",
          city: l.propertyId?.city || "",
          firstMessage: l.messages?.[0]?.content || "—",
          assignedAt: l.assignedAt,
          lastSeen: l.updatedAt || l.createdAt,
        };
      });

      setLeads(mapped.sort((a, b) => (b.assignedAt || b.lastSeen || "") > (a.assignedAt || a.lastSeen || "") ? 1 : -1));
    }).finally(() => setLoading(false));
  }, []);

  if (role === "buyer" || role === "user") {
    return (
      <div className="main-content w-100">
        <div className="main-content-inner">
          <div className="widget-box-2 wd-listing">
            <h3 className="title">CRM Leads</h3>
            <div style={{ padding: "40px 20px", textAlign: "center", color: "#888", fontSize: 15 }}>
              This section is for sellers and brokers.
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

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            <h3 className="title" style={{ margin: 0 }}>My Assigned Leads</h3>
            {!loading && (
              <span style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>
                {leads.length} {leads.length === 1 ? "lead" : "leads"} assigned by admin
              </span>
            )}
          </div>

          {loading && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading leads…</div>
          )}

          {/* Info banner */}
          <div style={{
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 16,
            fontSize: 13,
            color: "#1D4ED8",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <span style={{ fontSize: 16 }}>ℹ️</span>
            Leads are assigned to you by the admin. Contact support if you need more leads.
          </div>

          {!loading && leads.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
              No leads assigned to you yet. Admin will assign leads to you.
            </div>
          )}

          {!loading && leads.length > 0 && (
            <div className="wrap-table">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Buyer</th>
                      <th>Property</th>
                      <th>Message</th>
                      <th>Assigned On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.key}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                              width: 34,
                              height: 34,
                              borderRadius: "50%",
                              background: "linear-gradient(135deg, #f0822d, #e56c1a)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}>
                              <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>
                                {(lead.name || "?")[0].toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 13, color: "#1a2332" }}>{lead.name}</div>
                              <div style={{ fontSize: 11, color: "#888" }}>{lead.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: 13, color: "#333", fontWeight: 500 }}>{lead.propertyName}</div>
                          {lead.city && <div style={{ fontSize: 11, color: "#888" }}>{lead.city}</div>}
                        </td>
                        <td>
                          <span style={{ fontSize: 13, color: "#555", display: "block", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {lead.firstMessage}
                          </span>
                        </td>
                        <td>
                          <InteractionChip label="Assigned" />
                          <div style={{ fontSize: 11, color: "#888", marginTop: 3 }}>{formatDate(lead.assignedAt || lead.lastSeen)}</div>
                        </td>
                      </tr>
                    ))}
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
