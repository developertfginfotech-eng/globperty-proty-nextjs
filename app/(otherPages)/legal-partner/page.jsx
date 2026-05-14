import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

const HERO = {
  badge: "⚖️ Legal Partners",
  titleWhite: "Be the Go-To Legal Expert for ",
  titleOrange: "Global Property Buyers",
  tagline: "International buyers need trusted legal guidance at every step. Partner with Globperty to be the first call for thousands of cross-border property investors.",
  tags: ["Conveyancing", "Golden Visa applications", "Contract review", "Cross-border structuring", "Notarial services"],
  stats: [
    { value: "5K+", label: "Legal enquiries / month" },
    { value: "12", label: "Markets" },
    { value: "Verified", label: "Partner badge" },
    { value: "Free", label: "Onboarding" },
  ],
  bgImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=80",
  primaryCta: { href: "/contact", label: "⚖️ Apply Now" },
  secondaryCta: { href: "/contact", label: "📞 Talk to Us" },
  snapshotTitle: "⚖️ Partner Profile",
  snapshot: [
    { key: "Buyer enquiries", value: "5,000+ / month", color: "#f0822d" },
    { key: "Countries", value: "12 active markets" },
    { key: "Services needed", value: "Conveyancing, visa, notary" },
    { key: "Partner badge", value: "Verified Legal Partner", color: "#16b286" },
    { key: "Leads", value: "Direct referrals" },
    { key: "Onboarding", value: "Within 5 business days" },
  ],
};

const SERVICES = [
  { icon: "📜", title: "Property Conveyancing", desc: "Help buyers navigate title transfer, due diligence and completion in each country." },
  { icon: "🏛", title: "Golden Visa Applications", desc: "Guide investors through the legal process of residency by investment." },
  { icon: "🤝", title: "Contract Review", desc: "Review and advise on off-plan, resale and commercial property contracts." },
  { icon: "🌐", title: "Cross-Border Structuring", desc: "Set up company structures for foreign nationals buying investment property." },
  { icon: "⚖️", title: "Dispute Resolution", desc: "Represent clients in property-related legal disputes internationally." },
  { icon: "📋", title: "Notarial Services", desc: "Provide notarisation and apostille services for international property documents." },
];

export default function LegalPartnerPage() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <section style={{ background: "#fff", padding: "60px 0 80px" }}>
        <div className="tf-container">

          <div className="heading-section text-center mb-48">
            <h2 className="title">Services We Refer Buyers For</h2>
            <p className="text-1">Our buyers need qualified legal support across every stage of their purchase.</p>
          </div>

          <div className="row g-4 mb-60">
            {SERVICES.map(s => (
              <div key={s.title} className="col-md-4">
                <div style={{ background: "#f9fafb", borderRadius: 14, padding: "24px", border: "1px solid #e5e7eb", height: "100%" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "linear-gradient(135deg,#f8fafc 0%,#fff7ed 100%)", borderRadius: 20, padding: "40px", border: "1px solid rgba(240,130,45,0.2)", textAlign: "center" }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 12 }}>Ready to Apply as a Legal Partner?</h3>
            <p className="text-1" style={{ marginBottom: 24 }}>We onboard qualified property lawyers and notaries in all 12 Globperty markets.</p>
            <Link href="/contact" className="tf-btn bg-color-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 36px", borderRadius: 10, fontSize: 16, fontWeight: 700 }}>
              Apply Now →
            </Link>
          </div>

        </div>
      </section>

      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
