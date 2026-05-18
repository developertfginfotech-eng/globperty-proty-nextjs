import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

export const metadata = {
  title: "Buy Verified Buyer Leads — Pay Per Lead | Globperty",
  description: "Buy verified property buyer leads on Globperty. KYC-confirmed, budget-qualified leads delivered to your inbox. Pay per lead, no monthly contract.",
};

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80",
  badge: "Buy Leads — Verified Buyer Enquiries",
  titleWhite: "Buy Verified ",
  titleOrange: "Buyer Leads",
  tagline: "Every lead is KYC-verified and budget-qualified. Pay only for real, identity-confirmed buyers who match your property type and price range.",
  tags: ["KYC Verified", "Budget Qualified", "Pay Per Lead", "No Contract", "WhatsApp Delivery"],
  stats: [
    { value: "KYC", label: "Verified Buyers" },
    { value: "Pay/Lead", label: "No Monthly Fee" },
    { value: "12", label: "Countries" },
    { value: "Real-Time", label: "Delivery" },
  ],
  primaryCta: { href: "/contact", label: "Start Buying Leads"},
  secondaryCta: { href: "/register", label: "Create Agent Account"},
  snapshotTitle: "Lead Quality Guarantee",
  snapshot: [
    { key: "Identity Verified",    value: "KYC Confirmed",         color: "#f0822d" },
    { key: "Budget Confirmed",     value: "Yes — Self-Declared",   color: "#16b286" },
    { key: "Delivery Method",      value: "Email + WhatsApp",      color: "#f0822d" },
    { key: "Lead Freshness",       value: "Real-Time",             color: "#16b286" },
    { key: "Duplicate Protection", value: "Yes",                   color: "#fff" },
    { key: "Refund Policy",        value: "Invalid Leads Credited", color: "#fff" },
  ],
};

const HOW_IT_WORKS = [
  { title: "Set Your Criteria", desc: "Choose property type, location, budget range and buyer nationality. Only matching leads reach you." },
  { title: "Leads Delivered Instantly", desc: "When a verified buyer submits an enquiry matching your criteria, you receive it by email and WhatsApp immediately." },
  { title: "Pay Per Lead", desc: "No monthly subscription. You pay only for leads received. Credits never expire." },
  { title: "Track & Convert", desc: "Manage all leads from your Globperty dashboard. Log calls, add notes and track conversion rates." },
];

const LEAD_TYPES = [
  { icon: "🏠", title: "Residential Buyers", desc: "Budget-qualified buyers looking for apartments, villas and townhouses to purchase." },
  { icon: "💼", title: "Investment Buyers", desc: "International investors seeking rental yield or capital appreciation opportunities." },
  { icon: "🏗", title: "Off-Plan Enquiries", desc: "Buyers specifically searching for pre-launch and under-construction projects." },
  { icon: "🔑", title: "Rental Tenants", desc: "Verified tenants searching for long-term rental properties in your market." },
  { icon: "🌍", title: "Relocation Buyers", desc: "Buyers actively relocating — highest purchase intent, time-sensitive enquiries." },
  { icon: "🏢", title: "Commercial Buyers", desc: "Business buyers and investors seeking offices, retail and commercial spaces." },
];

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <div className="main-content">

        {/* How it works */}
        <section style={{ padding: "64px 0 48px", background: "#fff" }}>
          <div className="tf-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#111827", marginBottom: 12 }}>
                How <span style={{ color: "#f0822d" }}>Lead Buying Works</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {HOW_IT_WORKS.map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "24px 16px" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#f0822d", color: "#fff", fontSize: 18, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>{String(i + 1).padStart(2, "0")}</div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{s.title}</h4>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Types */}
        <section style={{ padding: "56px 0", background: "#f9fafb" }}>
          <div className="tf-container">
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 10 }}>
                Types of <span style={{ color: "#f0822d" }}>Buyer Leads</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {LEAD_TYPES.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "20px", background: "#fff", borderRadius: 12, border: "1px solid #f3f4f6" }}>
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

        {/* CTA */}
        <section style={{ padding: "56px 0", background: "linear-gradient(135deg, #f0822d 0%, #e06820 100%)" }}>
          <div className="tf-container" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Start Receiving Verified Leads Today</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Talk to our team to set up your lead criteria and start buying qualified buyer enquiries.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ padding: "14px 32px", background: "#fff", color: "#f0822d", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none" }}>
                Get Started →
              </Link>
              <Link href="/register" style={{ padding: "14px 32px", background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                Create Agent Account
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
