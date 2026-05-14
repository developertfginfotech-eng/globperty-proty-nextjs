import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";

const SERVICES = [
  { icon: "📜", title: "Property Conveyancing", desc: "Help buyers navigate title transfer, due diligence and completion in each country." },
  { icon: "🏛", title: "Golden Visa Applications", desc: "Guide investors through the legal process of residency by investment applications." },
  { icon: "🤝", title: "Contract Review", desc: "Review and advise on off-plan, resale and commercial property contracts." },
  { icon: "🌐", title: "Cross-Border Structuring", desc: "Set up company structures for foreign nationals buying investment property." },
  { icon: "⚖️", title: "Dispute Resolution", desc: "Represent clients in property-related legal disputes internationally." },
  { icon: "📋", title: "Notarial Services", desc: "Provide notarisation and apostille services for international property documents." },
];

export default function LegalPartnerPage() {
  return (
    <div id="wrapper">
      <Header1 />

      <div className="page-title style-2">
        <div className="tf-container">
          <div className="row justify-center">
            <div className="col-lg-8">
              <div className="content-inner">
                <div className="heading-title">
                  <h2 className="title">Legal Partner Sign Up</h2>
                  <ul className="breadcrumb justify-center">
                    <li><Link className="home fw-6 text-color-3" href="/">Home</Link></li>
                    <li>Legal Partner</li>
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
              <span style={{ fontSize: 12, color: "#f0822d", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>⚖️ Legal Partners</span>
            </div>
            <h2 className="title">Be the Go-To Legal Expert for Global Property Buyers</h2>
            <p className="text-1">International buyers need trusted legal guidance. Partner with Globperty to be their first call.</p>
          </div>

          {/* Services */}
          <div className="row g-4 mb-60">
            {SERVICES.map(s => (
              <div key={s.title} className="col-md-4">
                <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #e5e7eb", height: "100%" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ background: "#fff", borderRadius: 20, padding: "40px", border: "1px solid rgba(240,130,45,0.2)", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", marginBottom: 28 }}>
              {[
                { value: "12", label: "Countries covered" },
                { value: "5K+", label: "Buyers needing legal help monthly" },
                { value: "Verified", label: "Partner badge on your profile" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: "#f0822d" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 12 }}>Apply as a Legal Partner</h3>
            <p className="text-1 mb-24">We onboard qualified property lawyers and notaries in all 12 Globperty markets.</p>
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
