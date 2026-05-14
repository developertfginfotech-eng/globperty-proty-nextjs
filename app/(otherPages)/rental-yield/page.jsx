import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import RentalYieldCalculator from "@/components/tools/RentalYieldCalculator";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata = { title: "Rental Yield Calculator — Globperty" };

const HERO = {
  bgImage: "/images/section/page-title-3.jpg",
  badge: "📊 Investment Tools — Free Calculator",
  titleWhite: "Rental Yield ",
  titleOrange: "Calculator",
  tagline: "Calculate your property's gross and net annual return across 12 countries. Know your yield before you invest.",
  tags: ["12 Countries", "Gross & Net Yield", "Market Benchmarks", "100% Free", "No Sign-up"],
  stats: [
    { value: "8.2%", label: "Avg UAE Yield" },
    { value: "6–9%", label: "Philippines Top" },
    { value: "5.1%", label: "Portugal Yield" },
    { value: "12", label: "Countries Covered" },
  ],
  primaryCta: { href: "/listings", label: "🏠 Browse Investment Properties" },
  secondaryCta: { href: "/copilot", label: "🤖 Ask AI Assistant" },
  snapshotTitle: "📊 Average Rental Yields",
  snapshot: [
    { key: "UAE (Dubai)", value: "6–9% p.a.", color: "#f0822d" },
    { key: "Philippines", value: "5–8% p.a.", color: "#f0822d" },
    { key: "Malaysia", value: "4–6% p.a.", color: "#16b286" },
    { key: "Portugal", value: "4–6% p.a.", color: "#16b286" },
    { key: "Turkey", value: "4–7% p.a.", color: "#16b286" },
    { key: "Cyprus", value: "3–5% p.a.", color: "#fff" },
    { key: "Malta", value: "3–5% p.a.", color: "#fff" },
    { key: "Hungary", value: "4–6% p.a.", color: "#16b286" },
  ],
};

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />
      <div className="main-content">
        <RentalYieldCalculator />
      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
