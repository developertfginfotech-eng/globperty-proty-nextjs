import Cta from "@/components/common/Cta";

import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import FilterTop from "@/components/properties/FilterTop";

import Properties2 from "@/components/properties/Properties2";
import React from "react";

export const metadata = {
  title:
    "Property List Top Search || Globperty - Real Estate React Nextjs Template",
  description: "Globperty - Real Estate React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header1 />
        <FilterTop />
        <div className="main-content">
          <Properties2 defaultGrid />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
