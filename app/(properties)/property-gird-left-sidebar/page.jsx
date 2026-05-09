import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import FilterTop from "@/components/properties/FilterTop";
import Properties4Client from "@/components/properties/Properties4Client";
import React from "react";

export const metadata = {
  title: "Property Listings | Globperty",
  description: "Browse and filter properties on Globperty.",
};

export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header2 />
        <FilterTop />
        <div className="main-content">
          <Properties4Client defaultGrid />
          <Cta />
        </div>
        <Footer1 logo="/images/logo/globperty-logo.svg" />
      </div>
    </>
  );
}
