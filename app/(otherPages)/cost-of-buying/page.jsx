import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import CostOfBuying from "@/components/tools/CostOfBuying";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata = { title: "Cost of Buying Calculator — Globperty" };

const HERO = {
  bgImage: "/images/section/page-title-1.jpg",
  badge: "💰 Finance Tools — All Fees & Taxes",
  titleWhite: "Cost of Buying ",
  titleOrange: "Calculator",
  tagline: "Know your true purchase cost before you buy. Stamp duty, agent fees, legal costs and registration — calculated for 12 countries.",
  tags: ["12 Countries", "Stamp Duty", "Agent & Legal Fees", "Registration Costs", "True Total Cost"],
  stats: [
    { value: "12", label: "Countries" },
    { value: "4%", label: "UAE DLD Fee" },
    { value: "6.5%", label: "Portugal IMT" },
    { value: "5%", label: "Australia Duty" },
  ],
  primaryCta: { href: "/listings", label: "🏠 Browse Global Properties" },
  secondaryCta: { href: "/rental-yield", label: "📊 Rental Yield Calculator" },
  snapshotTitle: "💰 Transfer Fees by Country",
  snapshot: [
    { key: "UAE (DLD)", value: "4% + 0.25%", color: "#f0822d" },
    { key: "Portugal (IMT)", value: "Up to 6.5%", color: "#f0822d" },
    { key: "Australia", value: "3–5% (state)", color: "#16b286" },
    { key: "Turkey", value: "4% title deed", color: "#16b286" },
    { key: "Malta", value: "5% stamp duty", color: "#fff" },
    { key: "Cyprus", value: "Up to 3.5%", color: "#fff" },
    { key: "Malaysia", value: "Up to 3%", color: "#16b286" },
    { key: "Hungary", value: "4% transfer", color: "#fff" },
  ],
};

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />
      <div className="main-content">
        <CostOfBuying />
      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
