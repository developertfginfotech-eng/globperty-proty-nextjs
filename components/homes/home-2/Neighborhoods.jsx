"use client";
import React, { useEffect, useState } from "react";
import { getCityCounts } from "@/utils/propertyApi";

export default function Neighborhoods() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getCityCounts()
      .then((data) => {
        const mapped = (data || []).slice(0, 7).map((item, i) => ({
          id: i + 1,
          imageSrc: item.image || "/images/section/location-9.jpg",
          city: item.city || "Unknown",
          properties: `${item.count || 0} Properties`,
        }));
        setLocations(mapped);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="section-neighborhoods">
      <div className="tf-container full">
        <div className="col-12">
          <div className="heading-section text-center mb-48">
            <h2 className="title">Explore The Neighborhoods</h2>
            <p className="text-1">Find your dream apartment with our listing</p>
          </div>
          {locations.length > 0 && (
            <div className="wrap-neighborhoods">
              {locations.map((location) => (
                <div key={location.id} className={`box-location hover-img item-${location.id}`}>
                  <div className="image-wrap">
                    <a href="#" style={{ position: "relative", display: "block" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={location.imageSrc}
                        alt={location.city}
                        style={{ width: "100%", height: "245px", objectFit: "cover", display: "block" }}
                      />
                    </a>
                  </div>
                  <div className="content">
                    <h6 className="text_white">{location.city}</h6>
                    <a href="#" className="text-1 tf-btn style-border pd-23 text_white">
                      {location.properties} <i className="icon-arrow-right" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
