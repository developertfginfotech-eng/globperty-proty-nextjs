import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import RentalYieldCalculator from "@/components/tools/RentalYieldCalculator";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Rental Yield Calculator — Global Property Income | Globperty",
  description: "Calculate gross and net rental yields for property in UAE, Portugal, Australia and 9 more markets. Compare income returns, estimate break-even timelines and plan your buy-to-let investment.",
};

const HERO = {
  bgImage: "/images/section/page-title-3.jpg",
  badge: "Investment Tools — Free Calculator",
  titleWhite: "Rental Yield ",
  titleOrange: "Calculator",
  tagline: "Calculate your property's gross and net annual return across 12 countries. Know your yield before you invest.",
  tags: ["12 Countries", "Gross & Net Yield", "Market Benchmarks", "100% Free", "No Sign-up"],
  stats: [
    { value: "8.2%", label: "Avg UAE Yield" },
    { value: "6–9%", label: "Philippines Top" },
    { value: "5.1%", label: "Portugal Yield" },
    { value: "12",   label: "Countries Covered" },
  ],
  primaryCta:   { href: "/listings",  label: "Browse Investment Properties" },
  secondaryCta: { href: "/copilot",   label: "Ask AI Assistant" },
  snapshotTitle: "Average Rental Yields",
  snapshot: [
    { key: "UAE (Dubai)",   value: "6–9% p.a.",  color: "#f0822d" },
    { key: "Philippines",   value: "5–8% p.a.",  color: "#f0822d" },
    { key: "Malaysia",      value: "4–6% p.a.",  color: "#16b286" },
    { key: "Portugal",      value: "4–6% p.a.",  color: "#16b286" },
    { key: "Turkey",        value: "4–7% p.a.",  color: "#16b286" },
    { key: "Cyprus",        value: "3–5% p.a.",  color: "#fff" },
    { key: "Malta",         value: "3–5% p.a.",  color: "#fff" },
    { key: "Hungary",       value: "4–6% p.a.",  color: "#16b286" },
  ],
};

const STATS = [
  { number: "6-8",  suffix: "%",  label: "Dubai Avg. Gross Yield" },
  { number: "12",   suffix: "+",  label: "Markets Covered" },
  { number: "85",   suffix: "%",  label: "Net Yield Factor" },
];

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <div className="main-content" style={{ paddingTop: "60px" }}>

        {/* Calculator first */}
        <RentalYieldCalculator />

        {/* Facts section below */}
        <section className="section-box-team" style={{ padding: "60px 0" }}>
          <div className="tf-container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="content-inner">
                  <div className="heading-section mb-32">
                    <h2 className="title">Maximize Your <span className="text-color-primary">Global Rental Returns</span></h2>
                  </div>
                  <div className="content mb-40">
                    <p className="text-1 mb-16">
                      International rental yields vary dramatically. Dubai apartments average 6–8%, Portugal holiday lets achieve 5–7%, while South-East Asian markets like the Philippines can hit 8–10%. Understanding your gross yield versus net yield — after management and maintenance — is critical for any income-focused investment.
                    </p>
                    <p className="text-1 mb-28">
                      Globperty's rental yield calculator covers 12 markets, letting you compare income returns in seconds. Enter your property value and expected rent to see gross yield, net yield estimate, annual income and your break-even timeline.
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
              <div className="col-lg-6">
                <div style={{ position: "relative", height: 420, marginTop: 40 }}>
                  <div style={{ position: "absolute", left: 0, top: 0, width: "72%", height: 260, borderRadius: 16, overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.18)", zIndex: 2 }}>
                    <Image src="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=520&fit=crop" alt="Rental property" width={400} height={260} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ position: "absolute", right: 0, bottom: 0, width: "55%", height: 200, borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.15)", zIndex: 1 }}>
                    <Image src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop" alt="Apartment" width={300} height={200} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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
