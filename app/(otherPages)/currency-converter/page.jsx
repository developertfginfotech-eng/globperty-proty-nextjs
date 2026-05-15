import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import CurrencyConverter from "@/components/tools/CurrencyConverter";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

export const metadata = {
  title: "Property Currency Converter — 17 Currencies | Globperty",
  description: "Convert property prices across 17 investment currencies including AED, USD, EUR, GBP, AUD and more. Plan your international property budget and understand real buying power before you negotiate.",
};

const HERO = {
  bgImage: "/images/section/page-title-5.jpg",
  badge: "💱 Finance Tools — 17 Currencies",
  titleWhite: "Property Currency ",
  titleOrange: "Converter",
  tagline: "Convert property prices instantly across 17 investment currencies. USD, EUR, AED, GBP and more — tailored for global real estate buyers.",
  tags: ["17 Currencies", "Real Estate Focused", "Instant Conversion", "USD · EUR · AED · GBP", "Free"],
  stats: [
    { value: "17",       label: "Currencies" },
    { value: "AED 3.67", label: "1 USD = AED" },
    { value: "€0.92",    label: "1 USD = EUR" },
    { value: "₹83.5",    label: "1 USD = INR" },
  ],
  primaryCta:   { href: "/listings",      label: "🏠 Browse Global Properties" },
  secondaryCta: { href: "/rental-yield",  label: "📊 Rental Yield Calculator" },
  snapshotTitle: "💱 Key Exchange Rates",
  snapshot: [
    { key: "1 USD → AED",  value: "3.674",   color: "#f0822d" },
    { key: "1 USD → EUR",  value: "0.918",   color: "#16b286" },
    { key: "1 USD → GBP",  value: "0.787",   color: "#f0822d" },
    { key: "1 USD → INR",  value: "83.50",   color: "#16b286" },
    { key: "1 USD → SGD",  value: "1.345",   color: "#fff" },
    { key: "1 USD → MYR",  value: "4.720",   color: "#fff" },
    { key: "1 USD → TRY",  value: "32.15",   color: "#16b286" },
    { key: "1 USD → AUD",  value: "1.540",   color: "#fff" },
  ],
};

const STATS = [
  { number: "17",   suffix: "",    label: "Currencies Covered" },
  { number: "12",   suffix: "",    label: "Investment Markets" },
  { number: "5-10", suffix: "%",   label: "Typical FX Swing" },
];

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <div className="main-content">

        {/* Calculator first */}
        <CurrencyConverter />

        {/* Facts section below */}
        <section className="section-box-team" style={{ padding: "60px 0" }}>
          <div className="tf-container">
            <div className="row justify-center">
              <div className="col-lg-8">
                <div className="content-inner">
                  <div className="heading-section mb-32">
                    <h2 className="title">Convert Property Prices <span className="text-color-primary">Across 17 Currencies</span></h2>
                  </div>
                  <div className="content mb-40">
                    <p className="text-1 mb-16">
                      Buying international property means thinking in multiple currencies. A $500,000 Dubai apartment is AED 1.8M, €460,000 or £395,000. Exchange rate movements of 5–10% can make or break a deal — especially for buyers funding purchases from a foreign currency account.
                    </p>
                    <p className="text-1 mb-28">
                      Globperty's property currency converter covers 17 investment currencies from AED to JPY, giving you instant conversions, quick rate comparisons and a clear picture of your true buying power before you negotiate or transfer funds.
                    </p>
                    <Link href="/copilot" className="tf-btn bg-color-primary fw-7 pd-12">
                      Talk to AI Advisor
                    </Link>
                  </div>
                  <div className="wrap-counter" style={{ display: "flex", gap: 40, flexWrap: "wrap", marginTop: 8 }}>
                    {STATS.map((s, i) => (
                      <div key={i} className="counter-item style-2">
                        <div className="count">
                          <div style={{ fontSize: 30, fontWeight: 900, color: "#f0822d" }}>{s.number}{s.suffix}</div>
                          <p className="text-4" style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{s.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
