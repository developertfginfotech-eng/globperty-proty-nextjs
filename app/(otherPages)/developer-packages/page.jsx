import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

const HERO = {
  badge: "📦 Agents & Developers",
  titleWhite: "Grow Your Property Business ",
  titleOrange: "Globally",
  tagline: "List properties, get leads and showcase your projects to 50,000+ verified property buyers across 12 countries — all from one platform.",
  tags: ["Free during launch", "Verified agent badge", "Lead management", "Analytics dashboard", "AI-powered matching"],
  stats: [
    { value: "50K+", label: "Monthly buyers" },
    { value: "12", label: "Countries" },
    { value: "$420K", label: "Avg. budget" },
    { value: "Free", label: "Starter plan" },
  ],
  bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
  primaryCta: { href: "/contact", label: "🚀 Get Started" },
  secondaryCta: { href: "/contact", label: "💬 Talk to Sales" },
  snapshotTitle: "📦 Package Overview",
  snapshot: [
    { key: "Starter Plan", value: "Free (launch)", color: "#16b286" },
    { key: "Professional", value: "$149 / month", color: "#f0822d" },
    { key: "Developer", value: "$499 / month", color: "#8b5cf6" },
    { key: "Listings (Starter)", value: "5 properties" },
    { key: "Listings (Pro)", value: "Unlimited" },
    { key: "Lead Routing", value: "Direct to you" },
    { key: "Verified Badge", value: "Pro & above", color: "#f0822d" },
  ],
};

const PACKAGES = [
  {
    name: "Starter", price: "Free", period: "during launch", color: "#16b286",
    features: ["5 property listings", "Basic agent profile", "Email enquiries", "Standard search visibility", "Globperty badge"],
  },
  {
    name: "Professional", price: "$149", period: "/ month", color: "#f0822d", highlight: true,
    features: ["Unlimited listings", "Verified agent badge", "Priority search placement", "Lead management dashboard", "Analytics & reporting", "WhatsApp enquiry routing", "Social media promotion"],
  },
  {
    name: "Developer", price: "$499", period: "/ month", color: "#8b5cf6",
    features: ["Entire project showcase", "Off-plan launch campaigns", "Dedicated landing page", "VIP buyer introductions", "Virtual expo slot included", "Account manager", "Custom branding"],
  },
];

const BENEFITS = [
  { icon: "🌍", title: "Global Reach", desc: "Your listings seen by buyers from 100+ countries searching for investment properties." },
  { icon: "🏅", title: "Verified Badge", desc: "Build trust with the Globperty Verified badge and increase your enquiry rates." },
  { icon: "📊", title: "Real-time Analytics", desc: "Track views, saves, enquiries and conversions for every listing." },
  { icon: "🤖", title: "AI-Powered Matching", desc: "Our AI Copilot recommends your properties to matching buyers automatically." },
  { icon: "📞", title: "Direct Leads", desc: "All enquiries go straight to you — no middlemen, no commission sharing." },
  { icon: "🎪", title: "Virtual Expo Access", desc: "Present your projects live to international investors at our virtual expos." },
];

export default function DeveloperPackagesPage() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <section style={{ background: "#fff", padding: "60px 0 80px" }}>
        <div className="tf-container">

          <div className="heading-section text-center mb-48">
            <h2 className="title">Choose Your Plan</h2>
            <p className="text-1">From solo agents to major developers — scale at your own pace.</p>
          </div>

          <div className="row g-4 justify-center mb-60">
            {PACKAGES.map(pkg => (
              <div key={pkg.name} className="col-md-4">
                <div style={{ background: "#fff", borderRadius: 20, boxShadow: pkg.highlight ? "0 12px 48px rgba(240,130,45,0.15)" : "0 4px 20px rgba(0,0,0,0.07)", border: `2px solid ${pkg.highlight ? pkg.color : "#e5e7eb"}`, overflow: "hidden", height: "100%" }}>
                  {pkg.highlight && (
                    <div style={{ background: pkg.color, padding: "6px 16px", fontSize: 11, fontWeight: 700, color: "#fff", textAlign: "center", letterSpacing: 0.8 }}>⭐ MOST POPULAR</div>
                  )}
                  <div style={{ padding: "28px" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: pkg.color, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>{pkg.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 20 }}>
                      <span style={{ fontSize: 36, fontWeight: 900, color: "#111827" }}>{pkg.price}</span>
                      <span style={{ fontSize: 14, color: "#6b7280" }}>{pkg.period}</span>
                    </div>
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
                    <Link href="/contact" className={pkg.highlight ? "tf-btn bg-color-primary" : "tf-btn"} style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 700, ...(pkg.highlight ? {} : { color: pkg.color, border: `2px solid ${pkg.color}`, background: "transparent" }) }}>
                      Get Started →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="heading-section text-center mb-32">
            <h3 className="title" style={{ fontSize: 26 }}>Why List on Globperty?</h3>
          </div>
          <div className="row g-4">
            {BENEFITS.map(b => (
              <div key={b.title} className="col-md-4">
                <div style={{ background: "#f9fafb", borderRadius: 14, padding: "24px", border: "1px solid #e5e7eb" }}>
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
