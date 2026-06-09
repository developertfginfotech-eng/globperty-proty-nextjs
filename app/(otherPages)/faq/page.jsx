import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Cta from "@/components/otherPages/faq/Cta";
import Faqs from "@/components/otherPages/faq/Faqs";
import ToolPageHero from "@/components/tools/ToolPageHero";
import React from "react";

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=80",
  badge: "Help Centre",
  titleWhite: "Frequently Asked ",
  titleOrange: "Questions",
  tagline: "Everything you need to know about Globperty — buying, selling, listing, KYC, safety, and more.",
  tags: ["Quick Answers", "KYC Guide", "Listings Help", "Safety & Trust"],
  stats: [
    { value: "24/7", label: "Support" },
    { value: "100+", label: "Countries" },
    { value: "50+", label: "Currencies" },
    { value: "GDPR", label: "Compliant" },
  ],
  primaryCta: { href: "/contact", label: "Contact Support" },
  secondaryCta: { href: "/register", label: "Get Started" },
};

export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header1 />
        <div className="main-content">
          <ToolPageHero config={HERO} />
          <Faqs />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
