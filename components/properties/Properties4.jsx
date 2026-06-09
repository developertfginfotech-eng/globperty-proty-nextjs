"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LayoutHandler from "./LayoutHandler";
import DropdownSelect from "../common/DropdownSelect";
import PropertyGridItems from "./PropertyGridItems";
import PropertyListItems from "./PropertyListItems";
import Sidebar from "./Sidebar";
import { getAllProperties } from "@/utils/propertyApi";

const TYPE_KEYS = {
  apartment:     ["apartment", "apartments"],
  villa:         ["villa", "villas"],
  studio:        ["studio", "studios"],
  townhouse:     ["townhouse", "townhouses"],
  commercial:    ["commercial", "shop", "shops"],
  "family home": ["house", "houses", "family home"],
  penthouse:     ["penthouse"],
  "land / plot": ["land", "plot", "plots"],
};

function matchesType(property, typeParam) {
  if (!typeParam) return true;
  const keys = TYPE_KEYS[typeParam] || [typeParam];
  return keys.includes((property.propertyType || "").toLowerCase());
}

function matchesStatus(property, status) {
  if (!status) return true;
  const adType = (property.adType || "").toLowerCase();
  if (status === "rent") return adType.includes("rent") || adType.includes("lease");
  if (status === "buy")  return adType.includes("sale") || adType.includes("buy");
  if (status === "sell") return adType.includes("sale") || adType.includes("buy");
  return true;
}

function applyFilters(all, params) {
  const typeParam    = (params.get("type") || "").toLowerCase();
  const statusParam  = (params.get("status") || "").toLowerCase();
  const keyword      = (params.get("keyword") || "").toLowerCase();
  const location     = (params.get("location") || "").toLowerCase();
  const minPrice     = Number(params.get("minPrice")) || 0;
  const maxPrice     = Number(params.get("maxPrice")) || Infinity;
  const minSize      = Number(params.get("minSize")) || 0;
  const maxSize      = Number(params.get("maxSize")) || Infinity;
  const house        = (params.get("house") || "").toLowerCase();
  const beds         = params.get("beds") || "";
  const baths        = params.get("baths") || "";
  const sortBy       = params.get("sort") || "";

  let result = all.filter((p) => {
    if (!matchesType(p, typeParam)) return false;
    if (!matchesStatus(p, statusParam)) return false;

    if (keyword && ![p.title, p.description, p.location, p.city, p.country]
      .filter(Boolean).some(f => f.toLowerCase().includes(keyword))) return false;

    if (location && ![p.location, p.city, p.country, p.address]
      .filter(Boolean).some(f => f.toLowerCase().includes(location))) return false;

    const price = Number(p.price) || 0;
    if (minPrice > 0 && price < minPrice) return false;
    if (maxPrice < Infinity && price > maxPrice) return false;

    const sqft = Number(p.sqft) || 0;
    if (minSize > 0 && sqft < minSize) return false;
    if (maxSize < Infinity && sqft > maxSize) return false;

    if (house && house !== "any") {
      const typeMatch = TYPE_KEYS[house] || [house];
      if (!typeMatch.includes((p.propertyType || "").toLowerCase())) return false;
    }

    if (beds && beds !== "Any") {
      const bedNum = parseInt(beds);
      const pBeds = parseInt(p.beds) || 0;
      if (beds.includes("+")) { if (pBeds < bedNum) return false; }
      else if (pBeds !== bedNum) return false;
    }

    if (baths && baths !== "Any") {
      const bathNum = parseInt(baths);
      const pBaths = parseInt(p.baths) || 0;
      if (baths.includes("+")) { if (pBaths < bathNum) return false; }
      else if (pBaths !== bathNum) return false;
    }

    return true;
  });

  if (sortBy === "Newest") result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (sortBy === "Oldest") result = result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return result;
}

function Properties4Inner({ defaultGrid }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [allProperties, setAllProperties] = useState([]);
  const [filtered, setFiltered]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleSort = (val) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "Sort by (Default)") params.delete("sort");
    else params.set("sort", val);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    getAllProperties()
      .then((all) => { setAllProperties(all); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(applyFilters(allProperties, searchParams));
  }, [allProperties, searchParams]);

  const typeParam   = (searchParams.get("type") || "").toLowerCase();
  const statusParam = (searchParams.get("status") || "").toLowerCase();
  const locationParam = (searchParams.get("location") || "").toLowerCase();

  const headingParts = [];
  if (statusParam === "rent") headingParts.push("Properties for Rent");
  else if (statusParam === "buy") headingParts.push("Properties for Sale");
  else if (statusParam === "sell") headingParts.push("List for Sale");
  else headingParts.push("Property listing");
  if (typeParam) headingParts[0] = `${typeParam.charAt(0).toUpperCase() + typeParam.slice(1)} — ${headingParts[0]}`;
  if (locationParam) headingParts[0] += ` in ${locationParam.toUpperCase()}`;
  const heading = headingParts[0];

  return (
    <section className="section-property-layout">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="box-title">
              <h2>{heading}</h2>
              <div className="right" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Mobile filter toggle button — only on small screens */}
                {mobileFilterOpen !== undefined && (
                  <style>{`@media (max-width: 991px) { .prop-filter-btn { display: inline-flex !important; } }`}</style>
                )}
                <button
                  className="prop-filter-btn"
                  onClick={() => setMobileFilterOpen(v => !v)}
                  style={{ display: "none", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: "#f0822d", color: "#fff", border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
                  Filters
                </button>
                <ul className="nav-tab-filter group-layout" role="tablist" suppressHydrationWarning>
                  <LayoutHandler defaultGrid={defaultGrid} />
                </ul>
                <DropdownSelect
                  addtionalParentClass="select-filter list-sort"
                  options={["Sort by (Default)", "Newest", "Oldest"]}
                  selectedValue={searchParams.get("sort") || "Sort by (Default)"}
                  onChange={handleSort}
                />
              </div>
            </div>
          </div>

          {/* Mobile filter drawer */}
          {mobileFilterOpen && (
            <div style={{ display: "block" }}>
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1040 }} onClick={() => setMobileFilterOpen(false)} />
              <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: "min(320px, 90vw)", background: "#fff", zIndex: 1050, overflowY: "auto", padding: "16px", boxShadow: "4px 0 20px rgba(0,0,0,0.15)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>Filters</span>
                  <button onClick={() => setMobileFilterOpen(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#6b7280" }}>✕</button>
                </div>
                <Sidebar />
              </div>
            </div>
          )}

          <div className="col-lg-4 d-none d-lg-block">
            <Sidebar />
          </div>
          <div className="col-lg-8 col-12">
            {loading ? (
              <p className="text-center py-60">Loading properties…</p>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <h5 style={{ color: "#374151", marginBottom: 8 }}>No properties found</h5>
                <p style={{ fontSize: 14 }}>Try adjusting your filters or reset to see all listings.</p>
              </div>
            ) : (
              <>
                <div className="flat-animate-tab">
                  <div className="tab-content" suppressHydrationWarning>
                    <div className={`tab-pane ${defaultGrid ? " active show" : ""}`} id="gridLayout" role="tabpanel" suppressHydrationWarning>
                      <div className="tf-grid-layout md-col-2">
                        <PropertyGridItems properties={filtered} />
                      </div>
                    </div>
                    <div className={`tab-pane ${!defaultGrid ? " active show" : ""}`} id="listLayout" role="tabpanel" suppressHydrationWarning>
                      <div className="wrap-list">
                        <PropertyListItems properties={filtered} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wrap-pagination">
                  <p className="text-1">Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Properties4({ defaultGrid = false }) {
  return (
    <Suspense fallback={<p className="text-center py-60">Loading…</p>}>
      <Properties4Inner defaultGrid={defaultGrid} />
    </Suspense>
  );
}
