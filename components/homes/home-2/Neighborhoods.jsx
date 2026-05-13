"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllProperties } from "@/utils/propertyApi";

const COUNTRY_ORDER = [
  "UAE", "USA", "Portugal", "Canada", "Australia",
  "Turkey", "Cyprus", "Malta", "Hungary", "Latvia",
  "Philippines", "Malaysia",
];

const COUNTRY_IMAGES = {
  UAE:         "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  USA:         "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80",
  Portugal:    "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80",
  Canada:      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80",
  Australia:   "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80",
  Turkey:      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
  Cyprus:      "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=600&q=80",
  Malta:       "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&q=80",
  Hungary:     "https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?w=600&q=80",
  Latvia:      "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=600&q=80",
  Philippines: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&q=80",
  Malaysia:    "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
};

const SLUG_MAP = {
  UAE: "uae", USA: "usa", Portugal: "portugal", Canada: "canada",
  Australia: "australia", Turkey: "turkey", Cyprus: "cyprus", Malta: "malta",
  Hungary: "hungary", Latvia: "latvia", Philippines: "philippines", Malaysia: "malaysia",
};

const GRID_7  = `"aa bb cc dd" "ee ff ff gg"`;
const GRID_12 = `"aa bb cc dd" "ee ff ff gg" "hh ii ii jj" ". kk ll ."`;

export default function Neighborhoods() {
  const router = useRouter();
  const [counts, setCounts]     = useState({});
  const [showAll, setShowAll]   = useState(false);

  useEffect(() => {
    getAllProperties()
      .then((props) => {
        const map = {};
        (props || []).forEach((p) => {
          const country = (p.country || "").trim();
          if (country) map[country] = (map[country] || 0) + 1;
        });
        setCounts(map);
      })
      .catch(console.error);
  }, []);

  const visible = showAll ? COUNTRY_ORDER : COUNTRY_ORDER.slice(0, 7);

  return (
    <section className="section-neighborhoods" style={{ paddingTop: "80px" }}>
      <div className="tf-container full">
        <div className="col-12">
          <div className="heading-section text-center mb-48">
            <h2 className="title">Explore The Countries</h2>
            <p className="text-1">Find your dream apartment with our listing</p>
          </div>

          <div
            className="wrap-neighborhoods"
            style={{ gridTemplateAreas: showAll ? GRID_12 : GRID_7 }}
          >
            {visible.map((country, idx) => {
              const slug = SLUG_MAP[country];
              const href = slug ? `/countries/${slug}` : `/listings?location=${encodeURIComponent(country)}`;
              return (
                <div key={country} className={`box-location hover-img item-${idx + 1}`} style={{ cursor: "pointer" }} onClick={() => router.push(href)}>
                  <div className="image-wrap">
                    <div style={{ position: "relative", display: "block" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={COUNTRY_IMAGES[country]}
                        alt={country}
                        style={{ width: "100%", height: "245px", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  </div>
                  <div className="content">
                    <h6 className="text_white">{country}</h6>
                    <div className="text-1 tf-btn style-border pd-23 text_white" style={{ cursor: "pointer" }}>
                      {counts[country] ?? 0} Properties <i className="icon-arrow-right" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
            <button
              onClick={() => setShowAll((v) => !v)}
              className="tf-btn style-border pd-23"
            >
              {showAll ? "Less" : "More"} <i className={`icon-arrow-${showAll ? "up" : "right"}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
