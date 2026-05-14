import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";

const PACKAGES = [
  {
    name: "Starter",
    price: "Free",
    period: "during launch",
    color: "#16b286",
    features: ["5 property listings", "Basic agent profile", "Email enquiries", "Standard search visibility", "Globperty badge"],
  },
  {
    name: "Professional",
    price: "$149",
    period: "/ month",
    color: "#f0822d",
    highlight: true,
    features: ["Unlimited listings", "Verified agent badge", "Priority search placement", "Lead management dashboard", "Analytics & reporting", "WhatsApp enquiry routing", "Social media promotion"],
  },
  {
    name: "Developer",
    price: "$499",
    period: "/ month",
    color: "#8b5cf6",
    features: ["Entire project showcase", "Off-plan launch campaigns", "Dedicated landing page", "VIP buyer introductions", "Virtual expo slot included", "Account manager", "Custom branding"],
  },
];

const BENEFITS = [
  { icon: "🌍", title: "Global Reach", desc: "Your listings seen by buyers from 100+ countries searching for investment properties." },
  { icon: "🏅", title: "Verified Badge", desc: "Get the Globperty Verified badge — builds trust and increases enquiry rates." },
  { icon: "📊", title: "Real-time Analytics", desc: "Track views, saves, enquiries and conversion rates for every listing." },
  { icon: "🤖", title: "AI-Powered Matching", desc: "Our AI Copilot recommends your properties to matching buyers automatically." },
  { icon: "📞", title: "Direct Leads", desc: "Buyer enquiries go straight to you — no middlemen, no commission sharing." },
  { icon: "🎪", title: "Virtual Expo Access", desc: "Present your projects live to international investors at our virtual expos." },
];

export default function DeveloperPackagesPage() {
  return (
    <div id="wrapper">
      <Header1 />

      <div className="page-title style-2">
        <div className="tf-container">
          <div className="row justify-center">
            <div className="col-lg-8">
              <div className="content-inner">
                <div className="heading-title">
                  <h2 className="title">Developer & Agent Packages</h2>
                  <ul className="breadcrumb justify-center">
                    <li><Link className="home fw-6 text-color-3" href="/">Home</Link></li>
                    <li>Developer Packages</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section style={{ background: "linear-gradient(135deg,#f8fafc 0%,#fff7ed 100%)", padding: "60px 0 80px" }}>
        <div className="tf-container">

          <div className="heading-section text-center mb-48">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(240,130,45,0.1)", border: "1px solid rgba(240,130,45,0.3)", borderRadius: 20, padding: "5px 16px", marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: "#f0822d", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>📦 For Agents & Developers</span>
            </div>
            <h2 className="title">Grow Your Real Estate Business Globally</h2>
            <p className="text-1">Choose the plan that fits your scale — from solo agents to major developers.</p>
          </div>

          {/* Pricing cards */}
          <div className="row g-4 justify-center mb-60">
            {PACKAGES.map(pkg => (
              <div key={pkg.name} className="col-md-4">
                <div style={{ background: "#fff", borderRadius: 20, boxShadow: pkg.highlight ? "0 12px 48px rgba(240,130,45,0.18)" : "0 4px 20px rgba(0,0,0,0.07)", border: `2px solid ${pkg.highlight ? pkg.color : "#e5e7eb"}`, overflow: "hidden", height: "100%", position: "relative" }}>
                  {pkg.highlight && (
                    <div style={{ background: pkg.color, padding: "6px 16px", fontSize: 11, fontWeight: 700, color: "#fff", textAlign: "center", letterSpacing: 0.8 }}>
                      ⭐ MOST POPULAR
                    </div>
                  )}
                  <div style={{ padding: "28px 28px 24px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: pkg.color, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>{pkg.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                      <span style={{ fontSize: 36, fontWeight: 900, color: "#111827" }}>{pkg.price}</span>
                      <span style={{ fontSize: 14, color: "#6b7280" }}>{pkg.period}</span>
                    </div>
                    <div style={{ height: 1, background: "#f3f4f6", margin: "20px 0" }} />
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                      {pkg.features.map(f => (
                        <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
                          <span style={{ width: 16, height: 16, borderRadius: "50%", background: `${pkg.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke={pkg.color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="tf-btn" style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 700, background: pkg.highlight ? pkg.color : "transparent", color: pkg.highlight ? "#fff" : pkg.color, border: `2px solid ${pkg.color}` }}>
                      Get Started →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits grid */}
          <div className="heading-section text-center mb-32">
            <h3 className="title" style={{ fontSize: 26 }}>Why List on Globperty?</h3>
          </div>
          <div className="row g-4">
            {BENEFITS.map(b => (
              <div key={b.title} className="col-md-4">
                <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #e5e7eb" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{b.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{b.title}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/contact" className="tf-btn bg-color-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 36px", borderRadius: 10, fontSize: 16, fontWeight: 700 }}>
              Talk to Our Sales Team →
            </Link>
          </div>

        </div>
      </section>

      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
