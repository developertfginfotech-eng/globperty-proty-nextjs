"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const STATUS_OPTIONS  = ["Any Status", "buy", "rent", "sell"];
const TYPE_OPTIONS    = ["Any Type", "Apartment", "Villa", "Studio", "Townhouse", "Commercial", "Penthouse", "Land / Plot"];
const BATH_OPTIONS    = ["Any Baths", "1", "2", "3", "4+"];
const BED_OPTIONS     = ["Any Beds", "1", "2", "3", "4", "5+"];

function FilterTopInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [status,  setStatus]  = useState(searchParams.get("status")  || "");
  const [type,    setType]    = useState(searchParams.get("type")    || "");
  const [baths,   setBaths]   = useState(searchParams.get("baths")   || "");
  const [beds,    setBeds]    = useState(searchParams.get("beds")    || "");
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (status && status !== "Any Status")  params.set("status",  status);
    if (type   && type   !== "Any Type")    params.set("type",    type.toLowerCase());
    if (baths  && baths  !== "Any Baths")   params.set("baths",   baths);
    if (beds   && beds   !== "Any Beds")    params.set("beds",    beds);
    // keep existing location param if present
    const loc = searchParams.get("location");
    if (loc) params.set("location", loc);
    router.push(`/listings?${params.toString()}`);
  };

  const selectStyle = {
    height: 46,
    border: "1.5px solid #e5e7eb",
    borderRadius: 8,
    padding: "0 12px",
    fontSize: 14,
    background: "#fff",
    color: "#374151",
    cursor: "pointer",
    outline: "none",
  };

  return (
    <section className="flat-title style-2" style={{ paddingTop: 10 }}>
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-inner">
              <ul className="breadcrumb">
                <li><Link className="home fw-6 text-color-3" href="/">Home</Link></li>
                <li>Property Listing</li>
              </ul>
            </div>

            {isMobile ? (
              /* ── Mobile layout: keyword + 2×2 grid ── */
              <form onSubmit={handleSearch} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 14px" }}>
                <input
                  type="text"
                  placeholder="Address, City, country..."
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  style={{ width: "100%", height: 44, fontSize: 14, border: "1px solid #e5e7eb", borderRadius: 8, padding: "0 14px", marginBottom: 8, boxSizing: "border-box", outline: "none" }}
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <select value={status} onChange={e => setStatus(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
                    {STATUS_OPTIONS.map(o => <option key={o} value={o === "Any Status" ? "" : o}>{o === "buy" ? "For Sale" : o === "rent" ? "For Rent" : o === "sell" ? "Sell" : o}</option>)}
                  </select>
                  <select value={type} onChange={e => setType(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
                    {TYPE_OPTIONS.map(o => <option key={o} value={o === "Any Type" ? "" : o.toLowerCase()}>{o}</option>)}
                  </select>
                  <select value={baths} onChange={e => setBaths(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
                    {BATH_OPTIONS.map(o => <option key={o} value={o === "Any Baths" ? "" : o}>{o === "Any Baths" ? "Baths" : `${o} Bath${o === "1" ? "" : "s"}`}</option>)}
                  </select>
                  <select value={beds} onChange={e => setBeds(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
                    {BED_OPTIONS.map(o => <option key={o} value={o === "Any Beds" ? "" : o}>{o === "Any Beds" ? "Beds" : `${o} Bed${o === "1" ? "" : "s"}`}</option>)}
                  </select>
                  <button type="submit" className="tf-btn bg-color-primary fw-6" style={{ gridColumn: "1 / -1", height: 46, borderRadius: 8, fontSize: 15, fontWeight: 700 }}>
                    Search <i className="icon-MagnifyingGlass fw-6" />
                  </button>
                </div>
              </form>
            ) : (
              /* ── Desktop layout: single flex row ── */
              <form className="wg-filter style-2 relative" onSubmit={handleSearch}>
                <div className="form-title style-2" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "nowrap" }}>
                  <div style={{ flex: "1 1 220px", minWidth: 180 }}>
                    <input type="text" placeholder="Address, City, country..." value={keyword} onChange={e => setKeyword(e.target.value)} style={{ height: 46, fontSize: 14, width: "100%" }} />
                  </div>
                  <select value={status} onChange={e => setStatus(e.target.value)} style={selectStyle}>
                    {STATUS_OPTIONS.map(o => <option key={o} value={o === "Any Status" ? "" : o}>{o === "buy" ? "For Sale" : o === "rent" ? "For Rent" : o === "sell" ? "Sell" : o}</option>)}
                  </select>
                  <select value={type} onChange={e => setType(e.target.value)} style={selectStyle}>
                    {TYPE_OPTIONS.map(o => <option key={o} value={o === "Any Type" ? "" : o.toLowerCase()}>{o}</option>)}
                  </select>
                  <select value={baths} onChange={e => setBaths(e.target.value)} style={selectStyle}>
                    {BATH_OPTIONS.map(o => <option key={o} value={o === "Any Baths" ? "" : o}>{o === "Any Baths" ? "Baths" : `${o} Bath${o === "1" ? "" : "s"}`}</option>)}
                  </select>
                  <select value={beds} onChange={e => setBeds(e.target.value)} style={selectStyle}>
                    {BED_OPTIONS.map(o => <option key={o} value={o === "Any Beds" ? "" : o}>{o === "Any Beds" ? "Beds" : `${o} Bed${o === "1" ? "" : "s"}`}</option>)}
                  </select>
                  <div className="wrap-btn">
                    <button type="submit" className="tf-btn bg-color-primary pd-3 fw-6" style={{ height: 46, padding: "0 28px", whiteSpace: "nowrap", borderRadius: 8 }}>
                      Search <i className="icon-MagnifyingGlass fw-6" />
                    </button>
                  </div>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

export default function FilterTop() {
  return (
    <Suspense fallback={null}>
      <FilterTopInner />
    </Suspense>
  );
}
