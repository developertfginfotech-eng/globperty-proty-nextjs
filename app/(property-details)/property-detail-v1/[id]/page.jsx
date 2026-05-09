"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header2 from "@/components/headers/Header2";
import Footer1 from "@/components/footers/Footer1";
import Slider1 from "@/components/propertyDetails/sliders/Slider1";
import Details1 from "@/components/propertyDetails/Details1";
import { getPropertyById } from "@/utils/propertyApi";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getPropertyById(id)
      .then(setProperty)
      .catch(() => setError("Property not found."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div id="wrapper">
        <Header2 />
        <div style={{ padding: "160px 0", textAlign: "center", color: "#888", fontSize: 18 }}>
          Loading property...
        </div>
        <Footer1 logo="/images/logo/globperty-logo.svg" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div id="wrapper">
        <Header2 />
        <div style={{ padding: "160px 0", textAlign: "center", color: "#991b1b", fontSize: 18 }}>
          {error || "Property not found."}
        </div>
        <Footer1 logo="/images/logo/globperty-logo.svg" />
      </div>
    );
  }

  return (
    <div id="wrapper">
      <Header2 />
      <div className="main-content" style={{ paddingTop: 80 }}>
        <Slider1 images={property.images} title={property.title} />
        <Details1 property={property} />
      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
