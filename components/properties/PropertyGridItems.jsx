"use client";
import { properties11 } from "@/data/properties";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import apiClient from "@/utils/apiClient";

function stop(e) { e.preventDefault(); }

export default function PropertyGridItems({ showItems, properties: propsProp }) {
  const items = propsProp ?? properties11.slice(0, showItems ?? properties11.length);
  const [saved, setSaved] = useState({});
  const [compared, setCompared] = useState({});

  const toggleFav = async (id, e) => {
    e.preventDefault();
    try {
      if (saved[id]) {
        await apiClient.delete(`/favorites/${id}`);
        setSaved(s => ({ ...s, [id]: false }));
      } else {
        await apiClient.post("/favorites", { propertyId: id });
        setSaved(s => ({ ...s, [id]: true }));
      }
    } catch { /* not logged in */ }
  };

  const toggleCompare = (id, e) => {
    e.preventDefault();
    setCompared(c => ({ ...c, [id]: !c[id] }));
    // store in sessionStorage for a compare page
    const list = JSON.parse(sessionStorage.getItem("compareList") || "[]");
    if (list.includes(id)) {
      sessionStorage.setItem("compareList", JSON.stringify(list.filter(x => x !== id)));
    } else if (list.length < 4) {
      sessionStorage.setItem("compareList", JSON.stringify([...list, id]));
    }
  };
  return (
    <>
      {items.map((property) => (
        <div className="box-house hover-img" key={property.id}>
          <div className="image-wrap" style={{ height: 240, overflow: "hidden" }}>
            <Link href={`/property-detail-v1/${property.id}`} style={{ display: "block", height: "100%" }}>
              <Image
                className="lazyload"
                alt={property.title || ""}
                src={property.imageSrc || "/images/property/placeholder.jpg"}
                width={600}
                height={240}
                unoptimized
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Link>
            <ul className="box-tag flex gap-8">
              {property.featured && (
                <li className="flat-tag text-4 bg-main fw-6 text_white">Featured</li>
              )}
              {(property.forSale || property.adType) && (
                <li className="flat-tag text-4 bg-3 fw-6 text_white">
                  {property.adType || "For Sale"}
                </li>
              )}
            </ul>
            <div className="list-btn flex gap-8">
              <a href="#" onClick={(e) => toggleFav(property.id, e)} className={`btn-icon save hover-tooltip${saved[property.id] ? " active" : ""}`}>
                <i className="icon-save" />
                <span className="tooltip">{saved[property.id] ? "Saved!" : "Add Favorite"}</span>
              </a>
              <a href="#" onClick={stop} className="btn-icon find hover-tooltip">
                <i className="icon-find-plus" />
                <span className="tooltip">Quick View</span>
              </a>
            </div>
          </div>
          <div className="content">
            <h5 className="title">
              <Link href={`/property-detail-v1/${property.id}`}>
                {property.title}
              </Link>
            </h5>
            <p className="location text-1 flex items-center gap-6">
              <i className="icon-location" /> {property.location}
            </p>
            <ul className="meta-list flex">
              <li className="text-1 flex">
                <span>{property.beds}</span>Beds
              </li>
              <li className="text-1 flex">
                <span>{property.baths}</span>Baths
              </li>
              <li className="text-1 flex">
                <span>{property.sqft}</span>Sqft
              </li>
            </ul>
            <div className="bot flex justify-between items-center">
              <h5 className="price">${property.price}</h5>
              <div className="wrap-btn flex">
                <a href="#" onClick={(e) => toggleCompare(property.id, e)} className="compare flex gap-8 items-center text-1" style={{ color: compared[property.id] ? "#f0822d" : "" }}>
                  <i className="icon-compare" />
                  {compared[property.id] ? "Added ✓" : "Compare"}
                </a>
                <Link
                  href={`/property-detail-v1/${property.id}`}
                  className="tf-btn style-border pd-4"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
