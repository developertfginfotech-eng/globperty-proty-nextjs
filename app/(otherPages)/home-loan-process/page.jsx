import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import MortgageCalculator from "@/components/tools/MortgageCalculator";
import Cta from "@/components/common/Cta";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Mortgage Calculator — Global Property Finance | Globperty",
  description: "Calculate your mortgage repayments for property in UAE, Portugal, Turkey, Australia and 9 more countries. Compare rates, estimate monthly payments and plan your global property investment.",
};

const STATS = [
  { icon: "icon-home-1", number: "12", suffix: "+", label: "Countries Covered" },
  { icon: "icon-user-1", number: "50K", suffix: "+", label: "Active Buyers" },
  { icon: "icon-shield-1", number: "2.5", suffix: "%", label: "Lowest UAE Rate" },
];

const STEPS = [
  {
    num: "01",
    title: "Check Your Eligibility",
    desc: "Review residency requirements, minimum deposit levels and lender criteria for your target country. UAE requires 20–25% down, Portugal from 30% for non-residents.",
  },
  {
    num: "02",
    title: "Compare Rates by Country",
    desc: "Interest rates vary widely across markets — UAE fixed rates start at 2.5%, EU averages 3.5–5.5%, Turkey can reach 40%+. Use our calculator to compare monthly costs.",
  },
  {
    num: "03",
    title: "Apply With Expert Help",
    desc: "Connect with our vetted finance partners in each market. They handle the paperwork, currency transfers and legal requirements so you can close with confidence.",
  },
];

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />

      {/* Banner */}
      <div className="page-title style-2">
        <div className="tf-container">
          <div className="row justify-center">
            <div className="col-lg-8">
              <div className="content-inner">
                <div className="heading-title">
                  <h2 className="title">Mortgage Calculator</h2>
                  <ul className="breadcrumb justify-center">
                    <li><Link className="home fw-6 text-color-3" href="/">Home</Link></li>
                    <li>Mortgage Calculator</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content">

        {/* Facts / Help section */}
        <section className="section-box-team tf-spacing-1">
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
                  <div className="wrap-counter" style={{ display: "flex", gap: 32, flexWrap: "wrap", marginTop: 8 }}>
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
                <div className="wrap-image" style={{ position: "relative", height: 420, marginTop: 40 }}>
                  <div style={{ position: "absolute", left: 0, top: 0, width: "72%", borderRadius: 16, overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.18)", zIndex: 2 }}>
                    <Image src="/images/section/section-box-team.jpg" alt="Global property investment" width={400} height={340} style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                  <div style={{ position: "absolute", right: 0, bottom: 0, width: "55%", borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.15)", zIndex: 1 }}>
                    <Image src="/images/section/section-box-team-2.jpg" alt="Luxury interior" width={300} height={260} style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process / Steps section */}
        <section className="section-selling-home style-2 tf-spacing-1" style={{ background: "#fff7ed", padding: "60px 0" }}>
          <div className="tf-container">
            <div className="heading-section text-center mb-48">
              <h2 className="title">How International Mortgages Work</h2>
              <p className="text-1">From eligibility to approval — understand the 3-step process for financing property abroad.</p>
            </div>
            <div className="row g-4">
              {STEPS.map((s) => (
                <div key={s.num} className="col-md-4">
                  <div style={{ background: "#fff", borderRadius: 16, padding: "32px 24px", height: "100%", border: "1px solid rgba(240,130,45,0.15)", position: "relative" }}>
                    <span style={{ fontSize: 52, fontWeight: 900, color: "rgba(240,130,45,0.12)", lineHeight: 1, display: "block", marginBottom: 8 }}>{s.num}</span>
                    <div style={{ width: 56, height: 56, background: "rgba(240,130,45,0.1)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <i className="icon-home-1" style={{ fontSize: 24, color: "#f0822d" }} />
                    </div>
                    <h5 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 10 }}>{s.title}</h5>
                    <p className="text-1" style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calculator */}
        <MortgageCalculator />

        <Cta />
      </div>

      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
