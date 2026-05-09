"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

function Properties4Inner({ defaultGrid }) {
  const searchParams  = useSearchParams();
  const typeParam     = (searchParams.get("type") || "").toLowerCase();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    getAllProperties()
      .then((all) => {
        if (!typeParam) { setProperties(all); return; }
        const keys = TYPE_KEYS[typeParam] || [typeParam];
        setProperties(
          all.filter((p) => keys.includes((p.propertyType || "").toLowerCase()))
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [typeParam]);

  const heading = typeParam
    ? typeParam.charAt(0).toUpperCase() + typeParam.slice(1)
    : "Property listing";

  return (
    <section className="section-property-layout">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="box-title">
              <h2>{heading}</h2>
              <div className="right">
                <ul className="nav-tab-filter group-layout" role="tablist" suppressHydrationWarning>
                  <LayoutHandler defaultGrid={defaultGrid} />
                </ul>
                <DropdownSelect
                  addtionalParentClass="select-filter list-sort"
                  options={["Sort by (Default)", "Newest", "Oldest"]}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
          <div className="col-lg-8">
            {loading ? (
              <p className="text-center py-60">Loading properties…</p>
            ) : (
              <>
                <div className="flat-animate-tab">
                  <div className="tab-content" suppressHydrationWarning>
                    <div
                      className={`tab-pane ${defaultGrid ? " active show" : ""}`}
                      id="gridLayout"
                      role="tabpanel"
                      suppressHydrationWarning
                    >
                      <div className="tf-grid-layout md-col-2">
                        <PropertyGridItems properties={properties} />
                      </div>
                    </div>
                    <div
                      className={`tab-pane ${!defaultGrid ? " active show" : ""}`}
                      id="listLayout"
                      role="tabpanel"
                      suppressHydrationWarning
                    >
                      <div className="wrap-list">
                        <PropertyListItems properties={properties} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wrap-pagination">
                  <p className="text-1">Showing {properties.length} result{properties.length !== 1 ? "s" : ""}.</p>
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
