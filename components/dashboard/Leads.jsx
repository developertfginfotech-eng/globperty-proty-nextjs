"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function InteractionChip({ label }) {
  const styles = {
    Inquiry: { bg: "#EFF6FF", color: "#3B82F6" },
    Saved: { bg: "#F5F3FF", color: "#8B5CF6" },
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
      apiClient.get("/inquiries"),
      apiClient.get("/favorites/my-properties"),
    ]).then(([propsRes, inqRes, favsRes]) => {
      const props = propsRes.status === "fulfilled"
        ? (propsRes.value.data.properties || propsRes.value.data || [])
        : [];
      const inqs = inqRes.status === "fulfilled"
        ? (inqRes.value.data.inquiries || inqRes.value.data || [])
        : [];
      const favs = favsRes.status === "fulfilled"
        ? (favsRes.value.data.favorites || favsRes.value.data || [])
        : [];

      setPropertyCount(props.length);

      // Build a map of propertyId -> propertyName
      const propNameMap = {};
      props.forEach((p) => { propNameMap[p._id] = p.propertyName || p.title || "Untitled"; });

      // Merge leads by email/buyerId
      const leadsMap = {};

      const getKey = (item) => {
        const buyer = item.buyerId || item.userId || item.user;
        if (typeof buyer === "object" && buyer !== null) return buyer.email || buyer._id;
        return buyer || item.email || "unknown";
      };

      inqs.forEach((inq) => {
        const key = getKey(inq);
        const buyer = inq.buyerId || inq.userId || inq.user || {};
        const pid = inq.propertyId?._id || inq.propertyId;
        if (!leadsMap[key]) {
          leadsMap[key] = {
            key,
            name: buyer.name || buyer.fullName || inq.name || "Unknown",
            email: buyer.email || inq.email || key,
            propertyName: propNameMap[pid] || inq.propertyId?.propertyName || "—",
            interactions: [],
            lastSeen: inq.createdAt,
          };
        }
        if (!leadsMap[key].interactions.includes("Inquiry")) {
          leadsMap[key].interactions.push("Inquiry");
        }
        if (inq.createdAt > leadsMap[key].lastSeen) leadsMap[key].lastSeen = inq.createdAt;
      });

      favs.forEach((fav) => {
        const key = getKey(fav);
        const buyer = fav.buyerId || fav.userId || fav.user || {};
        const pid = fav.propertyId?._id || fav.propertyId;
        if (!leadsMap[key]) {
          leadsMap[key] = {
            key,
            name: buyer.name || buyer.fullName || "Unknown",
            email: buyer.email || key,
            propertyName: propNameMap[pid] || fav.propertyId?.propertyName || "—",
            interactions: [],
            lastSeen: fav.createdAt,
          };
        }
        if (!leadsMap[key].interactions.includes("Saved")) {
          leadsMap[key].interactions.push("Saved");
        }
        if (fav.createdAt > leadsMap[key].lastSeen) leadsMap[key].lastSeen = fav.createdAt;
      });

      setLeads(Object.values(leadsMap).sort((a, b) => (b.lastSeen || "") > (a.lastSeen || "") ? 1 : -1));
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
            <h3 className="title" style={{ margin: 0 }}>CRM Leads</h3>
            {!loading && (
              <span style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>
                {leads.length} leads across {propertyCount} {propertyCount === 1 ? "property" : "properties"}
              </span>
            )}
          </div>

          {loading && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading leads…</div>
          )}

          {!loading && leads.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
              No leads yet. Leads appear when buyers inquire or save your properties.
            </div>
          )}

          {!loading && leads.length > 0 && (
            <div className="wrap-table">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Property</th>
                      <th>Interactions</th>
                      <th>Last Activity</th>
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
                            <span style={{ fontWeight: 600, fontSize: 13, color: "#1a2332" }}>{lead.name}</span>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: 13, color: "#555" }}>{lead.email}</span>
                        </td>
                        <td>
                          <span style={{ fontSize: 13, color: "#333", fontWeight: 500 }}>{lead.propertyName}</span>
                        </td>
                        <td>
                          {lead.interactions.map((i) => <InteractionChip key={i} label={i} />)}
                        </td>
                        <td>
                          <span style={{ fontSize: 13, color: "#888" }}>{formatDate(lead.lastSeen)}</span>
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
