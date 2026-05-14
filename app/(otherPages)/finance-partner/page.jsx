import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

const HERO = {
  badge: "🏦 Finance Partners",
  titleWhite: "Reach Property Buyers Who ",
  titleOrange: "Need Financing",
  tagline: "Partner with Globperty to be the preferred finance provider for cross-border property buyers — mortgage, insurance, wealth management and more.",
  tags: ["Mortgage brokers", "Banks & lenders", "Insurance providers", "Wealth managers", "50K+ monthly buyers"],
  stats: [
    { value: "50K+", label: "Monthly buyers" },
    { value: "$420K", label: "Avg. budget" },
    { value: "60%", label: "Need financing" },
    { value: "12", label: "Countries" },
  ],
  bgImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1400&q=80",
  primaryCta: { href: "/contact", label: "🏦 Apply to Partner" },
  secondaryCta: { href: "/contact", label: "📞 Talk to Our Team" },
  snapshotTitle: "🏦 Partner Benefits",
  snapshot: [
    { key: "Lead referrals", value: "From buyer network", color: "#f0822d" },
    { key: "Co-branded page", value: "On Globperty", color: "#16b286" },
    { key: "Country pages", value: "Featured placement" },
    { key: "AI integration", value: "Copilot referrals" },
    { key: "Onboarding", value: "Within 5 business days" },
    { key: "Cost", value: "Revenue share model" },
  ],
};

const PARTNER_TYPES = [
  { icon: "🏦", title: "Banks & Lenders", desc: "Offer mortgage and financing solutions to property buyers across our 12 markets." },
  { icon: "🏠", title: "Mortgage Brokers", desc: "Connect with buyers who need cross-border financing and investment loans." },
  { icon: "🛡", title: "Insurance Providers", desc: "Provide property, title and life insurance products to global buyers." },
  { icon: "💼", title: "Wealth Managers", desc: "Help HNW clients structure real estate investment portfolios internationally." },
];

const BENEFITS = [
  { icon: "🌍", title: "Global Buyer Base", desc: "Access 50,000+ verified buyers actively searching for property to finance." },
  { icon: "🤖", title: "AI Copilot Integration", desc: "Be recommended by our AI assistant when buyers ask about financing options." },
  { icon: "📊", title: "Performance Reports", desc: "Monthly reports on referrals, conversions and revenue generated." },
  { icon: "🏅", title: "Verified Partner Badge", desc: "Display the Globperty Finance Partner badge on your website and materials." },
];

export default function FinancePartnerPage() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <section style={{ background: "#fff", padding: "60px 0 80px" }}>
        <div className="tf-container">

          <div className="heading-section text-center mb-48">
            <h2 className="title">Who Can Partner With Us?</h2>
            <p className="text-1">We work with banks, brokers, insurers and wealth managers across all our markets.</p>
          </div>

          <div className="row g-4 mb-60">
            {PARTNER_TYPES.map(p => (
              <div key={p.title} className="col-md-6">
                <div style={{ background: "#f9fafb", borderRadius: 16, padding: "28px", border: "1px solid #e5e7eb", display: "flex", gap: 16 }}>
                  <span style={{ fontSize: 36, flexShrink: 0 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{p.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="heading-section text-center mb-32">
            <h3 className="title" style={{ fontSize: 26 }}>Partnership Benefits</h3>
          </div>
          <div className="row g-4 mb-48">
            {BENEFITS.map(b => (
              <div key={b.title} className="col-md-3 col-6">
                <div style={{ background: "#f9fafb", borderRadius: 14, padding: "24px", border: "1px solid #e5e7eb", textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{b.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{b.title}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/contact" className="tf-btn bg-color-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 36px", borderRadius: 10, fontSize: 16, fontWeight: 700 }}>
              Apply to Partner →
            </Link>
          </div>

        </div>
      </section>

      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
