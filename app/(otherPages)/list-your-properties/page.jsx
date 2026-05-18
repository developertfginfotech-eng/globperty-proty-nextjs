import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

export const metadata = {
  title: "List Your Property — Free During Launch | Globperty",
  description: "List your property on Globperty and reach 50,000+ verified global buyers across 12 countries. Free during our launch phase for agents, developers and private sellers.",
};

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80",
  badge: "List Your Property — Free During Launch",
  titleWhite: "Reach Global Buyers ",
  titleOrange: "For Free",
  tagline: "List your property on Globperty and connect with 50,000+ verified international buyers across 12 countries. No upfront cost during our launch phase.",
  tags: ["Free During Launch", "50K+ Buyers", "12 Countries", "Verified Enquiries", "AI-Powered Matching"],
  stats: [
    { value: "50K+", label: "Active Buyers" },
    { value: "12",   label: "Countries" },
    { value: "Free", label: "During Launch" },
    { value: "24h",  label: "Listing Live" },
  ],
  primaryCta:  { href: "/register", label: "Start Listing Now — Free"},
  secondaryCta: { href: "/contact", label: "Talk to Our Team"},
  snapshotTitle: "Who Can List?",
  snapshot: [
    { key: "Private Sellers",    value: "100% Free",       color: "#f0822d" },
    { key: "Agents & Brokers",   value: "Free + Premium",  color: "#16b286" },
    { key: "Developers",         value: "Project Packages", color: "#f0822d" },
    { key: "Property Managers",  value: "Rental Listings", color: "#16b286" },
    { key: "Listing Go-Live",    value: "Within 24 hours", color: "#fff" },
    { key: "Enquiry Delivery",   value: "Email + Dashboard", color: "#fff" },
  ],
};

const BENEFITS = [
  { icon: "🌍", title: "Global Reach", desc: "Your property is visible to verified buyers from UAE, UK, India, USA, Portugal and 8 more countries — all on one platform." },
  { icon: "🤖", title: "AI-Powered Matching", desc: "Our AI matches your listing with buyers whose budget, location preference and property type align — more qualified enquiries, less noise." },
  { icon: "✅", title: "Verified Buyer Network", desc: "All buyer accounts are KYC-verified. You receive enquiries from real, identity-confirmed investors and home buyers." },
  { icon: "📊", title: "Listing Analytics", desc: "Track views, saves, enquiries and compare your listing performance against similar properties in your market." },
  { icon: "💰", title: "Free During Launch", desc: "List unlimited properties at no cost during our platform launch. No credit card, no hidden fees." },
  { icon: "📱", title: "Agent Dashboard", desc: "Manage all your listings, respond to enquiries and track leads from one clean dashboard — desktop and mobile." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Create Your Account", desc: "Register as an agent, developer or private seller. Complete your KYC verification in minutes." },
  { step: "02", title: "Add Your Property", desc: "Upload photos, set your price, add details and choose your target buyer countries." },
  { step: "03", title: "Go Live Within 24h", desc: "Our team reviews and approves listings within 24 hours. Your property is then live to global buyers." },
  { step: "04", title: "Receive Verified Enquiries", desc: "Get direct enquiries from verified buyers via email, WhatsApp or your Globperty dashboard." },
];

const LISTING_TYPES = [
  { icon: "🏢", title: "Apartments & Flats",  desc: "Studio to penthouse, city centre to beachfront." },
  { icon: "🏡", title: "Villas & Houses",      desc: "Detached, semi-detached, townhouses and more." },
  { icon: "🏗",  title: "Off-Plan Projects",   desc: "Pre-launch and under-construction developments." },
  { icon: "🏬", title: "Commercial Property",  desc: "Offices, retail, warehouses and industrial units." },
  { icon: "🌿", title: "Land & Plots",         desc: "Development land, agricultural and investment plots." },
  { icon: "🔑", title: "Rental Properties",    desc: "Long-term and short-stay rental listings." },
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
                Why List on <span style={{ color: "#f0822d" }}>Globperty?</span>
              </h2>
              <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 560, margin: "0 auto" }}>
                We connect your property with the right international buyer — faster, smarter and for free.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
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

        {/* How it works */}
        <section style={{ padding: "56px 0", background: "#f9fafb" }}>
          <div className="tf-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 10 }}>How It <span style={{ color: "#f0822d" }}>Works</span></h2>
              <p style={{ fontSize: 15, color: "#6b7280" }}>List your property in 4 simple steps</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {HOW_IT_WORKS.map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "24px 16px" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#f0822d", color: "#fff", fontSize: 18, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>{s.step}</div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{s.title}</h4>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you can list */}
        <section style={{ padding: "56px 0", background: "#fff" }}>
          <div className="tf-container">
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 10 }}>What You Can <span style={{ color: "#f0822d" }}>List</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {LISTING_TYPES.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "20px", background: "#f9fafb", borderRadius: 12, border: "1px solid #f3f4f6" }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{t.title}</div>
                    <div style={{ fontSize: 12.5, color: "#6b7280", lineHeight: 1.5 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section style={{ padding: "56px 0", background: "linear-gradient(135deg, #f0822d 0%, #e06820 100%)" }}>
          <div className="tf-container">
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 14 }}>Ready to List Your Property?</h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
                Join hundreds of agents and developers already reaching global buyers on Globperty — free during launch.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/register" style={{ padding: "14px 32px", background: "#fff", color: "#f0822d", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none" }}>
                  Create Free Account →
                </Link>
                <Link href="/contact" style={{ padding: "14px 32px", background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                  Talk to Our Team
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
