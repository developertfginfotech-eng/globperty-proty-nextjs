"use client";
import { useEffect, useState } from "react";
import React from "react";
import { getAllProperties } from "@/utils/propertyApi";

const TYPES = [
  { key: ["apartment", "apartments"], label: "Apartment", icon: "icon-apartment1" },
  { key: ["villa", "villas"], label: "Villa", icon: "icon-villa" },
  { key: ["studio", "studios"], label: "Studio", icon: "icon-studio" },
  { key: ["townhouse", "townhouses"], label: "Townhouse", icon: "icon-townhouse" },
  { key: ["commercial", "shop", "shops"], label: "Commercial", icon: "icon-commercial" },
  { key: ["house", "houses", "family home"], label: "Family Home", icon: "icon-villa" },
  { key: ["penthouse"], label: "Penthouse", icon: "icon-apartment1" },
  { key: ["land", "plot", "plots"], label: "Land / Plot", icon: "icon-villa" },
];

export default function Categories() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    getAllProperties()
      .then((props) => {
        const map = {};
        props.forEach((p) => {
          const t = (p.propertyType || "").toLowerCase();
          map[t] = (map[t] || 0) + 1;
        });
        setCounts(map);
      })
      .catch(console.error);
  }, []);

  const getCount = (keys) =>
    keys.reduce((sum, k) => sum + (counts[k] || 0), 0);

  return (
    <section className="section-categories style-2 tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center mb-48">
              <h2 className="title">Property Type</h2>
              <p className="text-1">
                Thousands of luxury home enthusiasts just like you visit our website.
              </p>
            </div>
            <div
              className="tf-layout-mobile-sm sm-col-2 xl-col-4 lg-col-3 d-none d-sm-flex"
              style={{ gap: 15, flexWrap: "wrap" }}
            >
              {TYPES.map((type) => {
                const count = getCount(type.key);
                return (
                  <div key={type.label} style={{ flex: "0 0 calc(25% - 12px)" }}>
                    <a href="#" className="categories-item style-2">
                      <div className="icon-box">
                        <i className={`icon ${type.icon}`} />
                      </div>
                      <div className="content">
                        <h5 className="mb-10">{type.label}</h5>
                        <p>
                          <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                            <path d="M11.25 1.5H4.5C4.10218 1.5 3.72064 1.65804 3.43934 1.93934C3.15804 2.22064 3 2.60218 3 3V15C3 15.3978 3.15804 15.7794 3.43934 16.0607C3.72064 16.342 4.10218 16.5 4.5 16.5H13.5C13.8978 16.5 14.2794 16.342 14.5607 16.0607C14.842 15.7794 15 15.3978 15 15V5.25L11.25 1.5Z" stroke="#5C5E61" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.5 1.5V4.5C10.5 4.89782 10.658 5.27936 10.9393 5.56066C11.2206 5.84196 11.6022 6 12 6H15" stroke="#5C5E61" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.5 6.75H6" stroke="#5C5E61" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 9.75H6" stroke="#5C5E61" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 12.75H6" stroke="#5C5E61" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {count > 0 ? `${count} listings for sale` : "0 listings"}
                        </p>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Mobile swiper */}
            <div className="d-sm-none">
              {TYPES.map((type) => {
                const count = getCount(type.key);
                return (
                  <a key={type.label} href="#" className="categories-item style-2 mb-15">
                    <div className="icon-box">
                      <i className={`icon ${type.icon}`} />
                    </div>
                    <div className="content">
                      <h5 className="mb-10">{type.label}</h5>
                      <p>{count > 0 ? `${count} listings` : "0 listings"}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
