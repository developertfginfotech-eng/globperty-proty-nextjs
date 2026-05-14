import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";

const PARTNER_TYPES = [
  { icon: "🏦", title: "Banks & Lenders", desc: "Offer mortgage and financing solutions to property buyers across our 12 markets." },
  { icon: "🏠", title: "Mortgage Brokers", desc: "Connect with buyers who need cross-border financing and investment loans." },
  { icon: "🛡", title: "Insurance Providers", desc: "Provide property, title and life insurance products to global buyers." },
  { icon: "💼", title: "Wealth Managers", desc: "Help HNW clients structure real estate investment portfolios internationally." },
];

const BENEFITS = [
  { icon: "👥", label: "50,000+ monthly active buyers" },
  { icon: "🌍", label: "100+ countries represented" },
  { icon: "💰", label: "Avg. property value $420K" },
  { icon: "📈", label: "60% are first-time cross-border buyers" },
];

export default function FinancePartnerPage() {
  return (
    <div id="wrapper">
      <Header1 />

      <div className="page-title style-2">
        <div className="tf-container">
          <div className="row justify-center">
            <div className="col-lg-8">
              <div className="content-inner">
                <div className="heading-title">
                  <h2 className="title">Finance Partner Sign Up</h2>
                  <ul className="breadcrumb justify-center">
                    <li><Link className="home fw-6 text-color-3" href="/">Home</Link></li>
                    <li>Finance Partner</li>
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
              <span style={{ fontSize: 12, color: "#f0822d", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>🏦 Finance Partners</span>
            </div>
            <h2 className="title">Reach Property Buyers Who Need Financing</h2>
            <p className="text-1">Partner with Globperty to be the preferred finance provider for cross-border real estate buyers.</p>
          </div>

          {/* Audience stats */}
          <div className="row g-3 mb-60">
            {BENEFITS.map(b => (
              <div key={b.label} className="col-6 col-md-3">
                <div style={{ background: "#fff", borderRadius: 14, padding: "22px 16px", textAlign: "center", border: "1px solid #e5e7eb" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{b.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", lineHeight: 1.5 }}>{b.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Partner types */}
          <div className="heading-section mb-32">
            <h3 className="title" style={{ fontSize: 24 }}>Who Can Partner With Us?</h3>
          </div>
          <div className="row g-4 mb-60">
            {PARTNER_TYPES.map(p => (
              <div key={p.title} className="col-md-6">
                <div style={{ background: "#fff", borderRadius: 16, padding: "24px 28px", border: "1px solid #e5e7eb", display: "flex", gap: 16 }}>
                  <span style={{ fontSize: 32, flexShrink: 0 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{p.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: 20, padding: "40px", border: "1px solid rgba(240,130,45,0.2)", textAlign: "center" }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 12 }}>Ready to Partner?</h3>
            <p className="text-1 mb-24">Fill in your details and our partnership team will be in touch within 2 business days.</p>
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
