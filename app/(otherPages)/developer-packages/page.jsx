import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

export const metadata = {
  title: "Developer Packages — Promote Your Project Globally | Globperty",
  description: "Promote your property development project to 50,000+ international buyers. Featured listings, banner ads, virtual expo and AI-matched leads.",
};

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
  badge: "Developer Packages — Global Project Promotion",
  titleWhite: "Promote Your ",
  titleOrange: "Development Project",
  tagline: "Reach 50,000+ international buyers with your off-plan or completed development. Dedicated project page, AI-matched leads, banner ads and virtual expo presence.",
  tags: ["Project Page", "AI Matching", "Banner Ads", "Virtual Expo", "50K+ Buyers"],
  stats: [
    { value: "50K+", label: "Int'l Buyers" },
    { value: "12", label: "Countries" },
    { value: "AI", label: "Lead Matching" },
    { value: "Live", label: "Virtual Expo" },
  ],
  primaryCta: { href: "/contact", label: "Get a Developer Package"},
  secondaryCta: { href: "/register", label: "Register as Developer"},
  snapshotTitle: "Package Highlights",
  snapshot: [
    { key: "Dedicated Project Page",  value: "Branded + SEO",         color: "#f0822d" },
    { key: "AI Buyer Matching",       value: "Budget + Location",     color: "#16b286" },
    { key: "Featured Placement",      value: "Homepage + Category",   color: "#f0822d" },
    { key: "Banner Advertising",      value: "Targeted by Country",   color: "#16b286" },
    { key: "Virtual Expo Slot",       value: "Live Presentation",     color: "#fff" },
    { key: "Lead Dashboard",          value: "Real-Time Analytics",   color: "#fff" },
  ],
};

const PACKAGES = [
  {
    name: "Launch", price: "Contact Us", color: "#f9fafb", border: "#f3f4f6",
    features: ["Dedicated project page", "Up to 20 unit listings", "Standard placement", "Email lead delivery", "Basic analytics"],
  },
  {
    name: "Featured", price: "Contact Us", color: "#fff7ed", border: "#f0822d", badge: "Most Popular",
    features: ["Everything in Launch", "Homepage featured slot", "AI buyer matching", "Category banner ad", "Priority support", "Enquiry dashboard"],
  },
  {
    name: "Premier", price: "Contact Us", color: "#f9fafb", border: "#f3f4f6",
    features: ["Everything in Featured", "Virtual Expo presentation", "Dedicated account manager", "Country-targeted campaigns", "WhatsApp lead delivery", "Performance reports"],
  },
];

const BENEFITS = [
  { icon: "🌍", title: "International Reach", desc: "Your project reaches buyers from the UAE, UK, India, USA, Portugal and 9 more countries on one platform." },
  { icon: "🤖", title: "AI Buyer Matching", desc: "Our AI matches your project units with buyers by budget, preferred location and property type for higher conversion." },
  { icon: "🎪", title: "Virtual Expo Access", desc: "Present your project live to global buyers in our virtual property expo — high intent, pre-qualified audiences." },
  { icon: "📊", title: "Full Analytics", desc: "Track project page views, unit saves, enquiries and buyer origin countries in your developer dashboard." },
];

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <div className="main-content">

        {/* Benefits */}
        <section style={{ padding: "64px 0 48px", background: "#fff" }}>
          <div className="tf-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#111827", marginBottom: 12 }}>
                Why Developers Choose <span style={{ color: "#f0822d" }}>Globperty</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28, maxWidth: 860, margin: "0 auto" }}>
              {BENEFITS.map((b, i) => (
                <div key={i} style={{ background: "#f9fafb", borderRadius: 14, padding: "28px 24px", border: "1px solid #f3f4f6" }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{b.icon}</div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{b.title}</h4>
                  <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section style={{ padding: "56px 0", background: "#f9fafb" }}>
          <div className="tf-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 10 }}>
                Developer <span style={{ color: "#f0822d" }}>Packages</span>
              </h2>
              <p style={{ fontSize: 15, color: "#6b7280" }}>Contact us for custom pricing tailored to your project size and target markets.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 900, margin: "0 auto" }}>
              {PACKAGES.map((p, i) => (
                <div key={i} style={{ background: p.color, borderRadius: 16, padding: "32px 24px", border: `2px solid ${p.border}`, position: "relative" }}>
                  {p.badge && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#f0822d", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 20 }}>{p.badge}</div>}
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{p.name}</h3>
                  <div style={{ fontSize: 14, color: "#f0822d", fontWeight: 700, marginBottom: 20 }}>{p.price}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                    {p.features.map((f, j) => (
                      <li key={j} style={{ fontSize: 13.5, color: "#374151", marginBottom: 8, paddingLeft: 20, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: "#f0822d" }}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" style={{ display: "block", textAlign: "center", padding: "11px 0", background: i === 1 ? "#f0822d" : "#111827", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 8, textDecoration: "none" }}>
                    Get This Package
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "56px 0", background: "linear-gradient(135deg, #f0822d 0%, #e06820 100%)" }}>
          <div className="tf-container" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Ready to Launch Your Project Globally?</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
              Talk to our developer relations team and get a custom package for your project size and target markets.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ padding: "14px 32px", background: "#fff", color: "#f0822d", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none" }}>
                Request a Package →
              </Link>
              <Link href="/register" style={{ padding: "14px 32px", background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                Register as Developer
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
