import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

export default function VisaPage({ visa }) {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={visa.hero} />

      <div className="main-content">

        {/* Overview */}
        <section style={{ padding: "64px 0 48px", background: "#fff" }}>
          <div className="tf-container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h2 style={{ fontSize: 30, fontWeight: 800, color: "#111827", marginBottom: 16 }}>
                  {visa.overviewTitle} <span style={{ color: "#f0822d" }}>{visa.overviewTitleOrange}</span>
                </h2>
                {visa.overview.map((p, i) => (
                  <p key={i} style={{ fontSize: 14.5, color: "#4b5563", lineHeight: 1.8, marginBottom: 14 }}>{p}</p>
                ))}
                <Link href="/contact" className="tf-btn bg-color-primary fw-7 pd-12" style={{ marginTop: 8, display: "inline-block" }}>
                  Speak to a Visa Expert
                </Link>
              </div>
              <div className="col-lg-6">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
                  {visa.quickFacts.map((f, i) => (
                    <div key={i} style={{ background: "#f9fafb", borderRadius: 12, padding: "20px 18px", border: "1px solid #f3f4f6" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{f.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: "#f0822d" }}>{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section style={{ padding: "56px 0", background: "#f9fafb" }}>
          <div className="tf-container">
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 36, textAlign: "center" }}>
              Key <span style={{ color: "#f0822d" }}>Requirements</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {visa.requirements.map((r, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "24px 20px", border: "1px solid #f3f4f6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{r.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{r.title}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section style={{ padding: "56px 0", background: "#fff" }}>
          <div className="tf-container">
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 36, textAlign: "center" }}>
              Application <span style={{ color: "#f0822d" }}>Process</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {visa.steps.map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "20px 12px" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#f0822d", color: "#fff", fontSize: 17, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 12.5, color: "#6b7280", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section style={{ padding: "56px 0", background: "#f9fafb" }}>
          <div className="tf-container">
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 32, textAlign: "center" }}>
              Why Choose <span style={{ color: "#f0822d" }}>{visa.country}?</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 860, margin: "0 auto" }}>
              {visa.benefits.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 18px", background: "#fff", borderRadius: 10, border: "1px solid #f3f4f6" }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#f0822d", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}><path d="M20 6L9 17l-5-5"/></svg>
                  </span>
                  <span style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "56px 0", background: "linear-gradient(135deg, #f0822d 0%, #e06820 100%)" }}>
          <div className="tf-container" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Ready to Apply for {visa.name}?</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Speak to our verified visa consultants for free guidance on eligibility and application.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ padding: "14px 32px", background: "#fff", color: "#f0822d", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none" }}>
                Get Free Consultation →
              </Link>
              <Link href="/visa-checker" style={{ padding: "14px 32px", background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                Check My Eligibility
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
