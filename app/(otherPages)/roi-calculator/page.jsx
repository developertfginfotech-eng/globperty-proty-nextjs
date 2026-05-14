import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import RoiCalculator from "@/components/tools/RoiCalculator";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata = { title: "ROI & Capital Growth Estimator — Globperty" };

const HERO = {
  bgImage: "/images/section/page-title-4.jpg",
  badge: "📈 Investment Tools — 5 & 10 Year Projections",
  titleWhite: "ROI & Capital Growth ",
  titleOrange: "Estimator",
  tagline: "Project your 5–10 year property investment returns including rental income and capital appreciation across global markets.",
  tags: ["Capital Growth", "Rental Income", "Annualised ROI", "Multi-Country", "AI Market Data"],
  stats: [
    { value: "10yr", label: "Max Projection" },
    { value: "2x–4x", label: "Avg Capital Growth" },
    { value: "12+", label: "Markets Covered" },
    { value: "Live", label: "Market Hotspots" },
  ],
  primaryCta: { href: "/listings", label: "🏠 Browse Investment Properties" },
  secondaryCta: { href: "/copilot", label: "🤖 AI Investment Advice" },
  snapshotTitle: "📈 Market Growth Indicators",
  snapshot: [
    { key: "UAE Avg Growth", value: "↑ 7–12% p.a.", color: "#f0822d" },
    { key: "Portugal", value: "↑ 5–8% p.a.", color: "#16b286" },
    { key: "Turkey", value: "↑ 8–15% p.a.", color: "#f0822d" },
    { key: "Malaysia", value: "↑ 4–6% p.a.", color: "#16b286" },
    { key: "Philippines", value: "↑ 6–9% p.a.", color: "#16b286" },
    { key: "Canada", value: "↑ 4–7% p.a.", color: "#16b286" },
    { key: "Australia", value: "↑ 5–8% p.a.", color: "#16b286" },
    { key: "Best Market 2025", value: "UAE / Turkey", color: "#f0822d" },
  ],
};

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />
      <div className="main-content">
        <RoiCalculator />
      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
