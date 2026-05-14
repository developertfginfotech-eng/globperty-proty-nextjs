import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import CurrencyConverter from "@/components/tools/CurrencyConverter";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata = { title: "Currency Converter — Globperty" };

const HERO = {
  bgImage: "/images/section/page-title-5.jpg",
  badge: "💱 Finance Tools — 17 Currencies",
  titleWhite: "Property Currency ",
  titleOrange: "Converter",
  tagline: "Convert property prices instantly across 17 investment currencies. USD, EUR, AED, GBP and more — tailored for global real estate buyers.",
  tags: ["17 Currencies", "Real Estate Focused", "Instant Conversion", "USD · EUR · AED · GBP", "Free"],
  stats: [
    { value: "17", label: "Currencies" },
    { value: "AED 3.67", label: "1 USD = AED" },
    { value: "€0.92", label: "1 USD = EUR" },
    { value: "₹83.5", label: "1 USD = INR" },
  ],
  primaryCta: { href: "/listings", label: "🏠 Browse Global Properties" },
  secondaryCta: { href: "/cost-of-buying", label: "💰 Cost of Buying Calculator" },
  snapshotTitle: "💱 Key Exchange Rates (USD)",
  snapshot: [
    { key: "UAE Dirham (AED)", value: "3.67", color: "#f0822d" },
    { key: "Euro (EUR)", value: "0.92", color: "#16b286" },
    { key: "British Pound (GBP)", value: "0.79", color: "#16b286" },
    { key: "Australian Dollar (AUD)", value: "1.53", color: "#fff" },
    { key: "Canadian Dollar (CAD)", value: "1.36", color: "#fff" },
    { key: "Indian Rupee (INR)", value: "83.5", color: "#fff" },
    { key: "Malaysian Ringgit (MYR)", value: "4.72", color: "#fff" },
    { key: "Turkish Lira (TRY)", value: "32.1", color: "#fff" },
  ],
};

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />
      <div className="main-content">
        <CurrencyConverter />
      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
