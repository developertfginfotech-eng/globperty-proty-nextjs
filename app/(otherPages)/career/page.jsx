import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Benefits from "@/components/otherPages/career/Benefits";
import Jobs from "@/components/otherPages/career/Jobs";
import Reviews from "@/components/otherPages/career/Reviews";
import ToolPageHero from "@/components/tools/ToolPageHero";
import React from "react";

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80",
  badge: "We're Hiring — Join the Team",
  titleWhite: "Build the Future of ",
  titleOrange: "Global Real Estate",
  tagline: "We're looking for bold thinkers, passionate builders, and people who believe that real estate should have no borders.",
  tags: ["Remote First", "Global Team", "Equity Options", "Flexible Hours"],
  stats: [
    { value: "4", label: "Continents" },
    { value: "28", label: "Countries" },
    { value: "Remote", label: "First" },
    { value: "🏆", label: "PropTech #1" },
  ],
  primaryCta: { href: "#open-roles", label: "View Open Roles" },
  secondaryCta: { href: "mailto:careers@globperty.com", label: "Send Your CV" },
};

export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header1 />
        <ToolPageHero config={HERO} />
        <div className="main-content">
          <Jobs />
          <Benefits />
          <Reviews />
          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
