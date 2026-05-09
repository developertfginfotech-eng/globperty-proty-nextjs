"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header2 from "@/components/headers/Header2";
import Footer1 from "@/components/footers/Footer1";
import { getAllProperties } from "@/utils/propertyApi";

const TYPE_KEYS = {
  apartment:   ["apartment", "apartments"],
  villa:       ["villa", "villas"],
  studio:      ["studio", "studios"],
  townhouse:   ["townhouse", "townhouses"],
  commercial:  ["commercial", "shop", "shops"],
  "family home": ["house", "houses", "family home"],
  penthouse:   ["penthouse"],
  "land / plot": ["land", "plot", "plots"],
};

function ListingsContent() {
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
    : "All Properties";

  return (
    <section className="section-property-layout tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section mb-48">
              <h2 className="title">{heading} Listings</h2>
              <p className="text-1">
                {loading ? "Loading…" : `${properties.length} propert${properties.length === 1 ? "y" : "ies"} found`}
              </p>
            </div>

            {loading ? (
              <p className="text-center py-60">Loading properties…</p>
            ) : properties.length === 0 ? (
              <p className="text-center py-60">No properties found for this type.</p>
            ) : (
              <div
                className="tf-layout-mobile-sm sm-col-2 xl-col-4 lg-col-3 d-flex flex-wrap"
                style={{ gap: 24 }}
              >
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className="box-house hover-img"
                    style={{ flex: "0 0 calc(25% - 18px)", minWidth: 240 }}
                  >
                    <div className="image-wrap">
                      <Link href={`/property-detail-v1/${property.id}`}>
                        <Image
                          alt={property.title}
                          src={property.imageSrc || "/images/property/placeholder.jpg"}
                          width={600}
                          height={400}
                          style={{ objectFit: "cover", width: "100%", height: 220 }}
                          unoptimized
                        />
                      </Link>
                      <ul className="box-tag flex gap-8">
                        <li className="flat-tag text-4 bg-3 fw-6 text_white">
                          {property.adType}
                        </li>
                      </ul>
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
                        <li className="text-1 flex"><span>{property.beds}</span>Beds</li>
                        <li className="text-1 flex"><span>{property.baths}</span>Baths</li>
                        <li className="text-1 flex"><span>{property.sqft}</span>Sqft</li>
                      </ul>
                      <div className="bot flex justify-between items-center">
                        <h5 className="price">${Number(property.price).toLocaleString()}</h5>
                        <Link href={`/property-detail-v1/${property.id}`} className="tf-btn style-border pd-4">
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ListingsPage() {
  return (
    <div id="wrapper">
      <Header2 />
      <div className="main-content" style={{ paddingTop: 100 }}>
        <Suspense fallback={<p className="text-center py-60">Loading…</p>}>
          <ListingsContent />
        </Suspense>
      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
