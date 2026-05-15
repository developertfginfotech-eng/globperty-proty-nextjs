import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import RoiCalculator from "@/components/tools/RoiCalculator";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

export const metadata = {
  title: "ROI & Capital Growth Estimator — Global Property Investment | Globperty",
  description: "Project your 5–10 year property investment returns with combined capital appreciation and rental income across 12 global markets. Compare annualised ROI for UAE, Portugal, Australia and more.",
};

const HERO = {
  bgImage: "/images/section/page-title-4.jpg",
  badge: "📈 Investment Tools — 5 & 10 Year Projections",
  titleWhite: "ROI & Capital Growth ",
  titleOrange: "Estimator",
  tagline: "Project your 5–10 year property investment returns including rental income and capital appreciation across global markets.",
  tags: ["Capital Growth", "Rental Income", "Annualised ROI", "Multi-Country", "AI Market Data"],
  stats: [
    { value: "10yr",   label: "Max Projection" },
    { value: "2x–4x", label: "Avg Capital Growth" },
    { value: "12+",   label: "Markets Covered" },
    { value: "Live",  label: "Market Hotspots" },
  ],
  primaryCta:   { href: "/listings", label: "🏠 Browse Investment Properties" },
  secondaryCta: { href: "/copilot",  label: "🤖 AI Investment Advice" },
  snapshotTitle: "📈 Market Growth Indicators",
  snapshot: [
    { key: "UAE Avg Growth",   value: "↑ 7–12% p.a.", color: "#f0822d" },
    { key: "Portugal",         value: "↑ 5–8% p.a.",  color: "#16b286" },
    { key: "Turkey",           value: "↑ 8–15% p.a.", color: "#f0822d" },
    { key: "Malaysia",         value: "↑ 4–6% p.a.",  color: "#16b286" },
    { key: "Philippines",      value: "↑ 6–9% p.a.",  color: "#16b286" },
    { key: "Canada",           value: "↑ 4–7% p.a.",  color: "#16b286" },
    { key: "Australia",        value: "↑ 5–8% p.a.",  color: "#16b286" },
    { key: "Best Market 2025", value: "UAE / Turkey",  color: "#f0822d" },
  ],
};

const STATS = [
  { number: "8-10", suffix: "%",    label: "UAE Annual Price Growth" },
  { number: "10",   suffix: " yrs", label: "Recommended Horizon" },
  { number: "12",   suffix: "+",    label: "Markets Tracked" },
];

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <div className="main-content">

        {/* Calculator first */}
        <RoiCalculator />

        {/* Facts section below */}
        <section className="section-box-team" style={{ padding: "60px 0" }}>
          <div className="tf-container">
            <div className="row justify-center">
              <div className="col-lg-8">
                <div className="content-inner">
                  <div className="heading-section mb-32">
                    <h2 className="title">Plan Your <span className="text-color-primary">Long-Term Investment Returns</span></h2>
                  </div>
                  <div className="content mb-40">
                    <p className="text-1 mb-16">
                      Property investment success comes from combining rental income with capital appreciation over time. In Dubai, property prices have grown 8–10% annually in recent years. Portugal Golden Visa properties show consistent 5–7% capital growth. Your holding period matters as much as the initial yield.
                    </p>
                    <p className="text-1 mb-28">
                      Our ROI estimator combines capital growth projections with rental income across your chosen investment period — giving you total return, annualised ROI and future property value in a single view across 12 global markets.
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
