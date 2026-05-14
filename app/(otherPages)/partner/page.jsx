import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";

const PARTNER_TYPES = [
  { icon: "✈️", title: "Relocation Agencies", desc: "Help expats and international buyers settle in their new country with end-to-end relocation support." },
  { icon: "🛂", title: "Visa & Immigration Consultants", desc: "Guide buyers through Golden Visa, residency and citizenship by investment applications." },
  { icon: "🎁", title: "Concierge Services", desc: "Offer premium lifestyle, property management and after-sale services to global buyers." },
  { icon: "🏫", title: "Education Consultants", desc: "Help families choosing where to buy based on school access and university proximity." },
  { icon: "🚚", title: "International Removals", desc: "Connect buyers with trusted international moving and storage companies." },
  { icon: "🏨", title: "Property Management", desc: "Manage rental properties on behalf of overseas owners — collections, maintenance, reporting." },
];

const PARTNERSHIP_BENEFITS = [
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

      <div className="page-title style-2">
        <div className="tf-container">
          <div className="row justify-center">
            <div className="col-lg-8">
              <div className="content-inner">
                <div className="heading-title">
                  <h2 className="title">Partner With Us</h2>
                  <ul className="breadcrumb justify-center">
                    <li><Link className="home fw-6 text-color-3" href="/">Home</Link></li>
                    <li>Partner With Us</li>
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
              <span style={{ fontSize: 12, color: "#f0822d", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>🤝 Partnerships</span>
            </div>
            <h2 className="title">Grow Together With Globperty</h2>
            <p className="text-1">We partner with relocation agencies, visa consultants, concierge services and more to deliver a complete experience for global property buyers.</p>
          </div>

          {/* Partner types */}
          <div className="heading-section mb-28">
            <h3 className="title" style={{ fontSize: 24 }}>Who We Partner With</h3>
          </div>
          <div className="row g-4 mb-60">
            {PARTNER_TYPES.map(p => (
              <div key={p.title} className="col-md-4">
                <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #e5e7eb", height: "100%" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{p.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Partnership benefits */}
          <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.07)", border: "1px solid rgba(240,130,45,0.15)", overflow: "hidden", marginBottom: 48 }}>
            <div style={{ background: "linear-gradient(90deg,#f0822d,#e56c1a)", padding: "18px 32px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>🎁</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>What You Get as a Partner</span>
            </div>
            <div style={{ padding: "28px 32px" }}>
              <div className="row g-3">
                {PARTNERSHIP_BENEFITS.map((b, i) => (
                  <div key={i} className="col-md-6">
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
