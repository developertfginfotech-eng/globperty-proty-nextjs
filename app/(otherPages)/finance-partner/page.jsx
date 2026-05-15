import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

export const metadata = {
  title: "Finance Partner Sign Up — Banks & Mortgage Firms | Globperty",
  description: "Partner with Globperty as a finance provider. Connect your mortgage, insurance or banking products with 50,000+ verified international property buyers.",
};

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=1400&q=80",
  badge: "🏦 Finance Partners — Banks, Mortgage & Insurance",
  titleWhite: "Finance Partner ",
  titleOrange: "Sign Up",
  tagline: "Connect your mortgage, banking or insurance products with 50,000+ verified property buyers actively searching across 12 countries. Co-branded placement and qualified referrals.",
  tags: ["Mortgage Firms", "Banks", "Insurance Providers", "Verified Buyer Leads", "Co-Branded"],
  stats: [
    { value: "50K+", label: "Active Buyers" },
    { value: "12", label: "Countries" },
    { value: "Verified", label: "Buyer Network" },
    { value: "Co-Brand", label: "Placement" },
  ],
  primaryCta: { href: "/contact", label: "🏦 Become a Finance Partner" },
  secondaryCta: { href: "/register", label: "📋 Register Your Firm" },
  snapshotTitle: "🏦 Partnership Benefits",
  snapshot: [
    { key: "Partner Listing",      value: "Finance Directory",     color: "#f0822d" },
    { key: "Co-Branded Tools",     value: "Mortgage Calculator",   color: "#16b286" },
    { key: "Lead Type",            value: "Pre-Qualified Buyers",  color: "#f0822d" },
    { key: "Buyer Stage",          value: "Active Purchase Intent",color: "#16b286" },
    { key: "Coverage",             value: "12 Countries",          color: "#fff" },
    { key: "Integration",          value: "API or Manual",         color: "#fff" },
  ],
};

const BENEFITS = [
  { icon: "🌍", title: "Global Buyer Access", desc: "Your finance products are visible to verified buyers from the UAE, UK, India, USA, Portugal and 9 more countries." },
  { icon: "🧮", title: "Calculator Co-Branding", desc: "Your logo and CTA appear on the Globperty mortgage calculator — one of the platform's most visited tools." },
  { icon: "📋", title: "Finance Directory Listing", desc: "Featured listing in the Globperty Finance Partners directory — buyers searching for mortgage and financing see your firm." },
  { icon: "💡", title: "Qualified Referrals", desc: "Buyers who express mortgage interest are referred directly to your team — pre-qualified by property value and country." },
  { icon: "📊", title: "Performance Dashboard", desc: "Track impressions, clicks and referrals from your partner dashboard with monthly reporting." },
  { icon: "🤝", title: "Co-Marketing", desc: "Joint email campaigns to our buyer database, social media mentions and event co-sponsorship opportunities." },
];

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <div className="main-content">

        <section style={{ padding: "64px 0 48px", background: "#fff" }}>
          <div className="tf-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#111827", marginBottom: 12 }}>
                Why Partner with <span style={{ color: "#f0822d" }}>Globperty?</span>
              </h2>
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

        <section style={{ padding: "56px 0", background: "linear-gradient(135deg, #f0822d 0%, #e06820 100%)" }}>
          <div className="tf-container" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Become a Globperty Finance Partner</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Contact our partnerships team to discuss co-branded placement and qualified buyer referrals for your firm.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ padding: "14px 32px", background: "#fff", color: "#f0822d", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none" }}>
                Contact Us →
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
