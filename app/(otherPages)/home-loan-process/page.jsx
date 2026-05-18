import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import MortgageCalculator from "@/components/tools/MortgageCalculator";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Mortgage Calculator — Global Property Finance | Globperty",
  description: "Calculate your mortgage repayments for property in UAE, Portugal, Turkey, Australia and 9 more countries. Compare rates, estimate monthly payments and plan your global property investment.",
};

const HERO = {
  bgImage: "/images/section/page-title-2.jpg",
  badge: "Finance Tools — Mortgage Calculator",
  titleWhite: "Calculate Mortgage ",
  titleOrange: "Payments",
  tagline: "Estimate your monthly repayments for property in UAE, Portugal, Australia and 9 more markets. Compare rates and plan your budget before you commit.",
  tags: ["12 Countries", "Monthly Repayments", "Rate Comparison", "USD · AED · EUR", "Free"],
  stats: [
    { value: "2.5%",  label: "Lowest UAE Rate" },
    { value: "25yr",  label: "Max Loan Term" },
    { value: "12+",   label: "Markets Covered" },
    { value: "80%",   label: "Max UAE LTV" },
  ],
  primaryCta:   { href: "/listings",      label: "Browse Global Properties" },
  secondaryCta: { href: "/rental-yield",  label: "Rental Yield Calculator" },
  snapshotTitle: "Mortgage Rates by Country",
  snapshot: [
    { key: "UAE",         value: "2.5–4% p.a.",  color: "#f0822d" },
    { key: "Portugal",    value: "3–5% p.a.",     color: "#16b286" },
    { key: "Turkey",      value: "8–12% p.a.",    color: "#16b286" },
    { key: "Australia",   value: "5.5–7% p.a.",   color: "#fff" },
    { key: "Canada",      value: "5–6.5% p.a.",   color: "#fff" },
    { key: "Malaysia",    value: "3.5–4.5% p.a.", color: "#16b286" },
    { key: "Cyprus",      value: "3–5% p.a.",     color: "#fff" },
    { key: "Best Rate",   value: "UAE / Malaysia", color: "#f0822d" },
  ],
};

const STATS = [
  { number: "12",  suffix: "+", label: "Countries Covered" },
  { number: "50K", suffix: "+", label: "Active Buyers" },
  { number: "2.5", suffix: "%", label: "Lowest UAE Rate" },
];

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <div className="main-content" style={{ paddingTop: "60px" }}>

        {/* Calculator first */}
        <MortgageCalculator />

        {/* Facts section below */}
        <section className="section-box-team" style={{ padding: "60px 0" }}>
          <div className="tf-container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="content-inner">
                  <div className="heading-section mb-32">
                    <h2 className="title">We Help You Finance <span className="text-color-primary">Globally</span></h2>
                  </div>
                  <div className="content mb-40">
                    <p className="text-1 mb-16">
                      Securing a mortgage on an international property can be complex — currency exposure, varying residency rules, different lender requirements per country. Globperty's free mortgage calculator gives you instant monthly repayment estimates across 12 markets so you can plan before you commit.
                    </p>
                    <p className="text-1 mb-28">
                      Whether you're buying a UAE investment apartment, a Portugal Golden Visa property or a holiday home in Cyprus, our tool helps you compare true borrowing costs in seconds.
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
                    <Image src="https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?w=800&h=520&fit=crop" alt="Mortgage financing" fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                  <div style={{ position: "absolute", right: 0, bottom: 0, width: "55%", height: 200, borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.15)", zIndex: 1 }}>
                    <Image src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop" alt="Global property" fill style={{ objectFit: "cover" }} unoptimized />
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
