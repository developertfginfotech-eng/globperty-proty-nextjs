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

const COLUMNS = [
  { key: "shortlisted", label: "Shortlisted", color: "#3B82F6", bg: "#EFF6FF" },
  { key: "offerMade", label: "Offer Made", color: "#f0822d", bg: "#FFF7ED" },
  { key: "negotiating", label: "Negotiating", color: "#8B5CF6", bg: "#F5F3FF" },
  { key: "closed", label: "Closed", color: "#10B981", bg: "#ECFDF5" },
];

function DealCard({ item, colColor }) {
  const title = item.propertyName || item.title || "Untitled Property";
  const price = item.price ? `$${Number(item.price).toLocaleString()}` : item.offerPrice ? `$${Number(item.offerPrice).toLocaleString()}` : "—";
  const city = item.city || item.location || "—";
  const status = item.status || item.stage || "";
  const photo = imgSrc(item.images?.[0]);
  const href = item.propertyId ? `/property-detail-v1/${item.propertyId}` : item._id ? `/property-detail-v1/${item._id}` : "#";

  return (
    <div style={{
      background: "#fff",
      borderRadius: 10,
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      marginBottom: 10,
      overflow: "hidden",
      border: "1px solid #f0f0f0",
    }}>
      <img
        src={photo}
        alt={title}
        onError={(e) => { e.target.src = "/images/home/house-db-1.jpg"; }}
        style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }}
      />
      <div style={{ padding: "10px 12px 12px" }}>
        <Link href={href} style={{ fontWeight: 700, fontSize: 13, color: "#1a2332", lineHeight: 1.35, display: "block", textDecoration: "none", marginBottom: 4 }}>
          {title}
        </Link>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{city}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: "#1a2332" }}>{price}</span>
          {status && (
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              padding: "2px 7px",
              borderRadius: 20,
              background: colColor + "18",
              color: colColor,
              textTransform: "capitalize",
              letterSpacing: 0.3,
            }}>{status}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DealTracker() {
  const [lanes, setLanes] = useState({ shortlisted: [], offerMade: [], negotiating: [], closed: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let role = "";
    try { role = JSON.parse(localStorage.getItem("user") || "{}").role || ""; } catch {}
    const isSeller = role && role !== "buyer" && role !== "user";
    const offersEndpoint = isSeller ? "/offers/received" : "/offers/my-offers";

    Promise.allSettled([
      apiClient.get("/favorites"),
      apiClient.get(offersEndpoint),
    ]).then(([favRes, offersRes]) => {
      const favs = favRes.status === "fulfilled" ? (favRes.value.data.favorites || []) : [];
      const offers = offersRes.status === "fulfilled" ? (offersRes.value.data.offers || offersRes.value.data || []) : [];

      const shortlisted = favs.map((fav) => {
        const p = fav.propertyId || {};
        return {
          _id: fav._id,
          propertyId: p._id,
          propertyName: p.propertyName || p.title,
          price: p.price,
          city: p.city,
          images: p.images,
          status: "shortlisted",
          stage: "shortlisted",
        };
      });

      const offerMade = [];
      const negotiating = [];
      const closed = [];

      offers.forEach((offer) => {
        const p = offer.propertyId || {};
        const card = {
          _id: offer._id,
          propertyId: typeof offer.propertyId === "string" ? offer.propertyId : p._id,
          propertyName: p.propertyName || p.title || offer.propertyTitle,
          price: p.price,
          offerPrice: offer.offerPrice,
          city: p.city,
          images: p.images,
          status: offer.status,
          stage: offer.status,
        };
        if (offer.status === "pending") offerMade.push(card);
        else if (offer.status === "countered") negotiating.push(card);
        else if (offer.status === "accepted") closed.push(card);
        else offerMade.push(card);
      });

      setLanes({ shortlisted, offerMade, negotiating, closed });
    }).finally(() => setLoading(false));
  }, []);

  const total = Object.values(lanes).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2 wd-listing">
          <h3 className="title">Deal Tracker</h3>

          {/* Summary stat row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 28,
          }}>
            {COLUMNS.map((col) => (
              <div key={col.key} style={{
                background: col.bg,
                borderRadius: 10,
                padding: "14px 16px",
                borderLeft: `3px solid ${col.color}`,
              }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: col.color }}>{lanes[col.key].length}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginTop: 2 }}>{col.label}</div>
              </div>
            ))}
          </div>

          {loading && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Loading your deals…</div>
          )}

          {!loading && total === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "#888" }}>
              No deals yet.{" "}
              <Link href="/property-gird-left-sidebar" style={{ color: "#f0822d" }}>
                Browse properties →
              </Link>
            </div>
          )}

          {!loading && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }} className="deal-tracker-grid">
              {COLUMNS.map((col) => (
                <div key={col.key} style={{
                  background: "#fafafa",
                  borderRadius: 12,
                  padding: "14px 12px",
                  minHeight: 200,
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 14,
                    paddingBottom: 10,
                    borderBottom: `2px solid ${col.color}`,
                  }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "#1a2332" }}>{col.label}</span>
                    <span style={{
                      background: col.color,
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                      borderRadius: 20,
                      padding: "1px 8px",
                      minWidth: 22,
                      textAlign: "center",
                    }}>{lanes[col.key].length}</span>
                  </div>

                  {lanes[col.key].length === 0 ? (
                    <div style={{ fontSize: 12, color: "#bbb", textAlign: "center", paddingTop: 20 }}>No deals here</div>
                  ) : (
                    lanes[col.key].map((item) => (
                      <DealCard key={item._id} item={item} colColor={col.color} />
                    ))
                  )}
                </div>
              ))}
            </div>
          )}

          <style jsx>{`
            @media (max-width: 600px) {
              .deal-tracker-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
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
