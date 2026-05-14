"use client";
import Slider from "rc-slider";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PROPERTY_TYPES = ["Any", "Apartment", "Villa", "Studio", "Townhouse", "Commercial", "Family Home", "Penthouse", "Land / Plot"];
const BED_OPTIONS = ["Any", "1", "2", "3", "4", "5+"];
const BATH_OPTIONS = ["Any", "1", "2", "3", "4+"];

function SidebarInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 10000000,
  ]);
  const [sizeRange, setSizeRange] = useState([
    Number(searchParams.get("minSize")) || 0,
    Number(searchParams.get("maxSize")) || 50000,
  ]);
  const [propertyType, setPropertyType] = useState(searchParams.get("house") || "Any");
  const [beds, setBeds] = useState(searchParams.get("beds") || "Any");
  const [baths, setBaths] = useState(searchParams.get("baths") || "Any");
  const [status, setStatus] = useState(searchParams.get("status") || "Any");

  const STATUS_OPTIONS = ["Any", "buy", "rent", "sell"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchParams.get("type")) params.set("type", searchParams.get("type"));
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (location.trim()) params.set("location", location.trim());
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0]);
    if (priceRange[1] < 10000000) params.set("maxPrice", priceRange[1]);
    if (sizeRange[0] > 0) params.set("minSize", sizeRange[0]);
    if (sizeRange[1] < 50000) params.set("maxSize", sizeRange[1]);
    if (propertyType && propertyType !== "Any") params.set("house", propertyType);
    if (beds && beds !== "Any") params.set("beds", beds);
    if (baths && baths !== "Any") params.set("baths", baths);
    if (status && status !== "Any") params.set("status", status);
    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    setKeyword(""); setLocation("");
    setPriceRange([0, 10000000]); setSizeRange([0, 50000]);
    setPropertyType("Any"); setBeds("Any"); setBaths("Any"); setStatus("Any");
    const params = new URLSearchParams();
    if (searchParams.get("type")) params.set("type", searchParams.get("type"));
    router.push(`?${params.toString()}`);
  };

  const formatPrice = (v) => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : v >= 1000 ? `$${(v/1000).toFixed(0)}K` : `$${v}`;

  return (
    <div className="tf-sidebar">
      <form className="form-advanced-search mb-30" onSubmit={handleSubmit}>
        <h4 className="heading-title mb-30">Advanced Search</h4>

        <fieldset className="mb-12">
          <input
            type="text"
            className="form-control"
            placeholder="Type keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="icon"><i className="icon-location1" /></div>
        </fieldset>

        <fieldset className="mb-30">
          <input
            type="text"
            className="form-control"
            placeholder="Location (city, country…)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className="icon"><i className="icon-search" /></div>
        </fieldset>

        <div className="widget-range mb-30">
          <div className="box-title-price mb-10">
            <div className="caption-price text-12">
              <span>Price: {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}</span>
            </div>
          </div>
          <Slider range max={10000000} min={0} step={10000} value={priceRange} onChange={setPriceRange} />
        </div>

        <div className="group-select mb-30">
          <div className="box-select mb-12">
            <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} style={{ height: 44, borderRadius: 6, border: "1px solid #e5e7eb", padding: "0 12px" }}>
              {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o === "Any" ? "Status: Any" : o === "buy" ? "For Sale" : o === "rent" ? "For Rent" : "Sell / List"}</option>)}
            </select>
          </div>
          <div className="box-select mb-12">
            <select className="form-control" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} style={{ height: 44, borderRadius: 6, border: "1px solid #e5e7eb", padding: "0 12px" }}>
              {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t === "Any" ? "Property Type" : t}</option>)}
            </select>
          </div>
          <div className="box-select mb-12">
            <select className="form-control" value={beds} onChange={(e) => setBeds(e.target.value)} style={{ height: 44, borderRadius: 6, border: "1px solid #e5e7eb", padding: "0 12px" }}>
              {BED_OPTIONS.map(o => <option key={o} value={o}>{o === "Any" ? "Beds: Any" : `${o} Bed${o === "1" ? "" : "s"}`}</option>)}
            </select>
          </div>
          <div className="box-select mb-12">
            <select className="form-control" value={baths} onChange={(e) => setBaths(e.target.value)} style={{ height: 44, borderRadius: 6, border: "1px solid #e5e7eb", padding: "0 12px" }}>
              {BATH_OPTIONS.map(o => <option key={o} value={o}>{o === "Any" ? "Baths: Any" : `${o} Bath${o === "1" ? "" : "s"}`}</option>)}
            </select>
          </div>
        </div>

        <div className="widget-price style-2 mb-30">
          <div className="box-title-price mb-10">
            <span className="title-price">Size (sqft):</span>
            <div className="caption-price">
              <span>{sizeRange[0].toLocaleString()} – {sizeRange[1].toLocaleString()}</span>
            </div>
          </div>
          <Slider range max={50000} min={0} step={100} value={sizeRange} onChange={setSizeRange} />
        </div>

        <button type="submit" className="tf-btn bg-color-primary w-full mb-12">
          Search Property <i className="icon-search" />
        </button>
        <button type="button" onClick={handleReset} style={{ width: "100%", background: "none", border: "1px solid #e5e7eb", borderRadius: 6, padding: "10px", fontSize: 13, color: "#6b7280", cursor: "pointer" }}>
          Reset Filters
        </button>
      </form>

      <div className="sidebar-item sidebar-featured style-2 pb-36 mb-28">
        <h4 className="sidebar-title mb-28">Featured Listings</h4>
        <ul>
          <li className="box-listings style-2 hover-img">
            <div className="content">
              <p style={{ color: "#9ca3af", fontSize: 13 }}>No featured listings yet.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <Suspense fallback={<div style={{ padding: 20, color: "#9ca3af" }}>Loading filters…</div>}>
      <SidebarInner />
    </Suspense>
  );
}
