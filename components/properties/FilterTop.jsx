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
    <section className="flat-title style-2" style={{ paddingTop: 90 }}>
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-inner">
              <ul className="breadcrumb">
                <li><Link className="home fw-6 text-color-3" href="/">Home</Link></li>
                <li>Property Listing</li>
              </ul>
            </div>

            <form className="wg-filter style-2 relative" onSubmit={handleSearch}>
              <div className="form-title style-2" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>

                {/* Keyword */}
                <fieldset style={{ flex: "1 1 220px", minWidth: 180 }}>
                  <input
                    type="text"
                    placeholder="Address, City, country..."
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    style={{ height: 46, fontSize: 14 }}
                  />
                </fieldset>

                {/* Status */}
                <select value={status} onChange={e => setStatus(e.target.value)} style={selectStyle}>
                  {STATUS_OPTIONS.map(o => (
                    <option key={o} value={o === "Any Status" ? "" : o}>
                      {o === "buy" ? "For Sale" : o === "rent" ? "For Rent" : o === "sell" ? "Sell" : o}
                    </option>
                  ))}
                </select>

                {/* Type */}
                <select value={type} onChange={e => setType(e.target.value)} style={selectStyle}>
                  {TYPE_OPTIONS.map(o => (
                    <option key={o} value={o === "Any Type" ? "" : o.toLowerCase()}>{o}</option>
                  ))}
                </select>

                {/* Baths */}
                <select value={baths} onChange={e => setBaths(e.target.value)} style={selectStyle}>
                  {BATH_OPTIONS.map(o => (
                    <option key={o} value={o === "Any Baths" ? "" : o}>{o === "Any Baths" ? "Baths" : `${o} Bath${o === "1" ? "" : "s"}`}</option>
                  ))}
                </select>

                {/* Beds */}
                <select value={beds} onChange={e => setBeds(e.target.value)} style={selectStyle}>
                  {BED_OPTIONS.map(o => (
                    <option key={o} value={o === "Any Beds" ? "" : o}>{o === "Any Beds" ? "Beds" : `${o} Bed${o === "1" ? "" : "s"}`}</option>
                  ))}
                </select>

                <div className="wrap-btn" style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button type="submit" className="tf-btn bg-color-primary pd-3 fw-6" style={{ height: 46, padding: "0 28px", whiteSpace: "nowrap", borderRadius: 8 }}>
                    Search <i className="icon-MagnifyingGlass fw-6" />
                  </button>
                </div>
              </div>
            </form>

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
