import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import CostOfBuying from "@/components/tools/CostOfBuying";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Cost of Buying Calculator — Purchase Fees by Country | Globperty",
  description: "Calculate the full cost of buying property in UAE, Portugal, Australia, Turkey and 8 more countries. Stamp duty, agent fees, legal costs and land registration — know your true purchase budget.",
};

const HERO = {
  bgImage: "/images/section/page-title-1.jpg",
  badge: "Finance Tools — All Fees & Taxes",
  titleWhite: "Cost of Buying ",
  titleOrange: "Calculator",
  tagline: "Know your true purchase cost before you buy. Stamp duty, agent fees, legal costs and registration — calculated for 12 countries.",
  tags: ["12 Countries", "Stamp Duty", "Agent & Legal Fees", "Registration Costs", "True Total Cost"],
  stats: [
    { value: "12",   label: "Countries" },
    { value: "4%",   label: "UAE DLD Fee" },
    { value: "6.5%", label: "Portugal IMT" },
    { value: "5%",   label: "Australia Duty" },
  ],
  primaryCta:   { href: "/listings",      label: "Browse Global Properties" },
  secondaryCta: { href: "/rental-yield",  label: "Rental Yield Calculator" },
  snapshotTitle: "Transfer Fees by Country",
  snapshot: [
    { key: "UAE (DLD)",      value: "4% + 0.25%",  color: "#f0822d" },
    { key: "Portugal (IMT)", value: "Up to 6.5%",   color: "#f0822d" },
    { key: "Australia",      value: "3–5% (state)", color: "#16b286" },
    { key: "Turkey",         value: "4% title deed", color: "#16b286" },
    { key: "Malta",          value: "5% stamp duty", color: "#fff" },
    { key: "Cyprus",         value: "Up to 3.5%",    color: "#fff" },
    { key: "Malaysia",       value: "Up to 3%",      color: "#16b286" },
    { key: "Hungary",        value: "4% transfer",   color: "#fff" },
  ],
};

const STATS = [
  { number: "7-12", suffix: "%", label: "Typical Buying Costs" },
  { number: "12",   suffix: "",  label: "Countries Covered" },
  { number: "4",    suffix: "",  label: "Fee Types Calculated" },
];

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <div className="main-content" style={{ paddingTop: "60px" }}>

        {/* Calculator first */}
        <CostOfBuying />

        {/* Facts section below */}
        <section className="section-box-team" style={{ padding: "60px 0" }}>
          <div className="tf-container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="content-inner">
                  <div className="heading-section mb-32">
                    <h2 className="title">Know the <span className="text-color-primary">Full Cost Before You Buy</span></h2>
                  </div>
                  <div className="content mb-40">
                    <p className="text-1 mb-16">
                      The headline price is never what you actually pay. In the UAE, the DLD transfer fee alone adds 4% to any purchase. In Portugal, IMT plus stamp duty can reach 7.3%. In Cyprus, transfer fees can hit 8%. These costs can add $30,000–$80,000 to a $500,000 purchase — and catch buyers off guard at closing.
                    </p>
                    <p className="text-1 mb-28">
                      Our cost of buying calculator breaks down every fee — stamp duty, agent commission, legal fees and land registration — across all 12 Globperty markets, so you can budget your total outlay before you sign anything.
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
                    <Image src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=520&fit=crop" alt="Property purchase costs" fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                  <div style={{ position: "absolute", right: 0, bottom: 0, width: "55%", height: 200, borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.15)", zIndex: 1 }}>
                    <Image src="https://images.unsplash.com/photo-1582407947304-fd86f28f9a22?w=600&h=400&fit=crop" alt="Global real estate" fill style={{ objectFit: "cover" }} unoptimized />
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
