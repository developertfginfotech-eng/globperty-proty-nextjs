import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";

const LEAD_TYPES = [
  { icon: "🏠", title: "Property Buyer Leads", desc: "Verified buyers actively searching to purchase in your target markets.", price: "From $15 / lead", color: "#f0822d" },
  { icon: "🔑", title: "Rental Enquiry Leads", desc: "Tenants looking for long-term or short-term rentals in specific areas.", price: "From $8 / lead", color: "#16b286" },
  { icon: "🌍", title: "Golden Visa Investor Leads", desc: "High-net-worth individuals seeking residency through property investment.", price: "From $45 / lead", color: "#8b5cf6" },
  { icon: "🏗", title: "Off-Plan Project Leads", desc: "Early-stage investors interested in upcoming launches and pre-sale.", price: "From $25 / lead", color: "#3b82f6" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Choose Your Target", desc: "Select country, budget range, property type and buyer profile." },
  { step: "02", title: "Set Your Budget", desc: "Pay only for the leads you want — no monthly commitments required." },
  { step: "03", title: "Receive Verified Leads", desc: "We verify each enquiry before sending it directly to your inbox or CRM." },
  { step: "04", title: "Close Deals Faster", desc: "Connect directly with motivated buyers — no platform middlemen." },
];

export default function BuyLeadsPage() {
  return (
    <div id="wrapper">
      <Header1 />

      <div className="page-title style-2">
        <div className="tf-container">
          <div className="row justify-center">
            <div className="col-lg-8">
              <div className="content-inner">
                <div className="heading-title">
                  <h2 className="title">Buy Verified Property Leads</h2>
                  <ul className="breadcrumb justify-center">
                    <li><Link className="home fw-6 text-color-3" href="/">Home</Link></li>
                    <li>Buy Leads</li>
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
              <span style={{ fontSize: 12, color: "#f0822d", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>💡 Lead Generation</span>
            </div>
            <h2 className="title">Connect With Motivated Buyers Worldwide</h2>
            <p className="text-1">Stop waiting for enquiries. Buy pre-qualified leads from real buyers actively searching on Globperty.</p>
          </div>

          {/* Stats */}
          <div className="row g-3 mb-60">
            {[
              { value: "50K+", label: "Monthly active buyers" },
              { value: "100+", label: "Countries represented" },
              { value: "92%", label: "Lead verification rate" },
              { value: "48h", label: "Average response time" },
            ].map(s => (
              <div key={s.label} className="col-6 col-md-3">
                <div style={{ background: "#fff", borderRadius: 14, padding: "24px 20px", textAlign: "center", border: "1px solid #e5e7eb" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#f0822d", marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Lead types */}
          <div className="heading-section mb-32">
            <h3 className="title" style={{ fontSize: 24 }}>Lead Types Available</h3>
          </div>
          <div className="row g-4 mb-60">
            {LEAD_TYPES.map(lt => (
              <div key={lt.title} className="col-md-6">
                <div style={{ background: "#fff", borderRadius: 16, padding: "24px 28px", border: "1px solid #e5e7eb", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 32, flexShrink: 0 }}>{lt.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{lt.title}</div>
                    <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 10 }}>{lt.desc}</div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: lt.color, background: `${lt.color}15`, borderRadius: 8, padding: "3px 10px" }}>{lt.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="heading-section text-center mb-32">
            <h3 className="title" style={{ fontSize: 24 }}>How It Works</h3>
          </div>
          <div className="row g-4 mb-48">
            {HOW_IT_WORKS.map(h => (
              <div key={h.step} className="col-md-3 col-6">
                <div style={{ textAlign: "center", padding: "20px 16px" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#f0822d,#e56c1a)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 15, fontWeight: 800, color: "#fff" }}>{h.step}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{h.title}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>{h.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/contact" className="tf-btn bg-color-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 36px", borderRadius: 10, fontSize: 16, fontWeight: 700 }}>
              Start Buying Leads →
            </Link>
          </div>

        </div>
      </section>

      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
