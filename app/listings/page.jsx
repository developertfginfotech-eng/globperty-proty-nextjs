"use client";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import FilterTop from "@/components/properties/FilterTop";
import Properties4Client from "@/components/properties/Properties4Client";
import Cta from "@/components/common/Cta";
import { Suspense } from "react";

export default function ListingsPage() {
  return (
    <div id="wrapper">
      <Header1 />
      <Suspense fallback={null}>
        <FilterTop />
      </Suspense>
      <div className="main-content">
        <Suspense fallback={<p className="text-center py-60">Loading…</p>}>
          <Properties4Client defaultGrid />
        </Suspense>
        <Cta />
      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
