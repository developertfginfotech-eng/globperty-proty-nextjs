import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import MortgageCalculator from "@/components/tools/MortgageCalculator";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata = { title: "Mortgage Calculator — Globperty" };

const HERO = {
  bgImage: "/images/section/page-title-loan.jpg",
  badge: "🏦 Finance Tool — Mortgage Calculator",
  titleWhite: "Calculate Your ",
  titleOrange: "Monthly Repayments",
  tagline: "Estimate your mortgage repayments across 12 global markets. Enter your property price, down payment and interest rate to see your monthly cost instantly.",
  tags: ["Monthly repayments", "Total interest", "Loan breakdown", "Multi-country", "25+ year terms"],
  stats: [
    { value: "25yr", label: "Max loan term" },
    { value: "2.5%", label: "UAE fixed rate" },
    { value: "3.5%", label: "EU avg rate" },
    { value: "Free", label: "No sign-up" },
  ],
  primaryCta: { href: "/listings", label: "🏠 Browse Investment Properties" },
  secondaryCta: { href: "/copilot", label: "🤖 Ask AI Advisor" },
  snapshotTitle: "🏦 Typical Mortgage Rates",
  snapshot: [
    { key: "UAE",         value: "2.5–4.5% p.a.", color: "#f0822d" },
    { key: "Portugal",    value: "3.5–5.5% p.a.", color: "#16b286" },
    { key: "Turkey",      value: "25–40% p.a.",   color: "#ef4444" },
    { key: "Cyprus",      value: "3.0–5.0% p.a.", color: "#16b286" },
    { key: "Malta",       value: "3.0–5.5% p.a.", color: "#16b286" },
    { key: "Canada",      value: "4.5–6.0% p.a.", color: "#fff" },
    { key: "Australia",   value: "5.5–7.0% p.a.", color: "#fff" },
    { key: "Hungary",     value: "6.0–9.0% p.a.", color: "#fff" },
  ],
};

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />
      <div className="main-content">
        <MortgageCalculator />
      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
