import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

export const metadata = {
  title: "Legal Partner Sign Up — Property Lawyers & Notaries | Globperty",
  description: "Partner with Globperty as a legal services provider. Reach international property buyers needing conveyancing, contract review and legal advice across 12 countries.",
};

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=80",
  badge: "Legal Partners — Property Lawyers & Notaries",
  titleWhite: "Legal Partner ",
  titleOrange: "Sign Up",
  tagline: "Connect your property law firm or notary practice with international buyers needing legal services across 12 countries. Verified referrals from active buyers.",
  tags: ["Property Lawyers", "Notaries", "Conveyancing", "International Buyers", "Verified Referrals"],
  stats: [
    { value: "50K+", label: "Active Buyers" },
    { value: "12", label: "Countries" },
    { value: "Legal", label: "Service Directory" },
    { value: "Verified", label: "Referrals" },
  ],
  primaryCta: { href: "/contact", label: "Become a Legal Partner"},
  secondaryCta: { href: "/register", label: "Register Your Firm"},
  snapshotTitle: "Partnership Benefits",
  snapshot: [
    { key: "Legal Directory",      value: "Featured Listing",      color: "#f0822d" },
    { key: "Buyer Stage",          value: "Due Diligence Phase",   color: "#16b286" },
    { key: "Lead Quality",         value: "Purchase-Ready",        color: "#f0822d" },
    { key: "Coverage",             value: "12 Countries",          color: "#16b286" },
    { key: "Profile Page",         value: "Firm + Specialisation", color: "#fff" },
    { key: "Verification",         value: "Law Society Check",     color: "#fff" },
  ],
};

const BENEFITS = [
  { icon: "🌍", title: "International Client Reach", desc: "Your firm is visible to buyers from the UAE, UK, India, USA and 8 more countries — all needing local legal expertise." },
  { icon: "⚖️", title: "Legal Directory Listing", desc: "Featured in the Globperty Legal Partners directory filtered by country and specialisation — buyers find you at point of need." },
  { icon: "🔍", title: "Verified Firm Profile", desc: "Your firm profile includes specialisations, countries covered, languages spoken and verified credentials." },
  { icon: "💡", title: "Purchase-Stage Referrals", desc: "Buyers referred to legal partners are in active due diligence or contract stage — highest intent, ready to instruct." },
  { icon: "🤝", title: "Co-Marketing Access", desc: "Inclusion in Globperty buyer guides, country-specific legal checklists and email campaigns to our buyer database." },
  { icon: "📊", title: "Referral Tracking", desc: "Track all referrals and enquiries from your partner dashboard with monthly reporting." },
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
                Why Join the <span style={{ color: "#f0822d" }}>Globperty Legal Network?</span>
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
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Join the Globperty Legal Partner Network</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Contact our partnerships team to register your firm and start receiving qualified buyer referrals.
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
