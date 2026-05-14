import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

const HERO = {
  badge: "🤝 Partnerships",
  titleWhite: "Grow Together ",
  titleOrange: "With Globperty",
  tagline: "We partner with relocation agencies, visa consultants, concierge services and more to deliver a complete end-to-end experience for global property buyers.",
  tags: ["Relocation agencies", "Visa consultants", "Concierge services", "Education consultants", "Property management"],
  stats: [
    { value: "12", label: "Countries" },
    { value: "50K+", label: "Monthly buyers" },
    { value: "6+", label: "Partner types" },
    { value: "Free", label: "Onboarding" },
  ],
  bgImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&q=80",
  primaryCta: { href: "/contact", label: "🤝 Apply to Partner" },
  secondaryCta: { href: "/contact", label: "📞 Talk to Our Team" },
  snapshotTitle: "🤝 What You Get",
  snapshot: [
    { key: "Co-branded page", value: "On Globperty", color: "#f0822d" },
    { key: "Lead referrals", value: "From buyer network", color: "#16b286" },
    { key: "AI integration", value: "Copilot recommendations" },
    { key: "Marketing", value: "Joint campaigns" },
    { key: "Reports", value: "Monthly performance" },
    { key: "Cost", value: "Revenue share" },
  ],
};

const PARTNER_TYPES = [
  { icon: "✈️", title: "Relocation Agencies", desc: "Help expats and international buyers settle in their new country with end-to-end relocation support." },
  { icon: "🛂", title: "Visa & Immigration Consultants", desc: "Guide buyers through Golden Visa, residency and citizenship by investment applications." },
  { icon: "🎁", title: "Concierge Services", desc: "Offer premium lifestyle, property management and after-sale services to global buyers." },
  { icon: "🏫", title: "Education Consultants", desc: "Help families choosing where to buy based on school access and university proximity." },
  { icon: "🚚", title: "International Removals", desc: "Connect buyers with trusted international moving and storage companies." },
  { icon: "🏨", title: "Property Management", desc: "Manage rental properties on behalf of overseas owners — collections, maintenance, reporting." },
];

const BENEFITS = [
  "Co-branded listing page on Globperty",
  "Referral leads from our buyer network",
  "Featured placement in relevant country pages",
  "Access to our Copilot AI recommendation engine",
  "Joint marketing campaigns and email promotions",
  "Monthly performance reports",
];

export default function PartnerPage() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <section style={{ background: "#fff", padding: "60px 0 80px" }}>
        <div className="tf-container">

          <div className="heading-section text-center mb-48">
            <h2 className="title">Who We Partner With</h2>
            <p className="text-1">From relocation agencies to visa consultants — if you serve global property buyers, we want to work with you.</p>
          </div>

          <div className="row g-4 mb-60">
            {PARTNER_TYPES.map(p => (
              <div key={p.title} className="col-md-4">
                <div style={{ background: "#f9fafb", borderRadius: 14, padding: "24px", border: "1px solid #e5e7eb", height: "100%" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{p.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "linear-gradient(135deg,#f8fafc 0%,#fff7ed 100%)", borderRadius: 20, padding: "40px 48px", border: "1px solid rgba(240,130,45,0.2)" }}>
            <div className="row" style={{ alignItems: "center" }}>
              <div className="col-md-7">
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 16 }}>What You Get as a Partner</h3>
                <div className="row g-2">
                  {BENEFITS.map((b, i) => (
                    <div key={i} className="col-12">
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#f0822d", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                        </span>
                        <span style={{ fontSize: 13, color: "#374151" }}>{b}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-5" style={{ textAlign: "center", paddingTop: 20 }}>
                <Link href="/contact" className="tf-btn bg-color-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 36px", borderRadius: 10, fontSize: 16, fontWeight: 700 }}>
                  Apply to Partner →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
