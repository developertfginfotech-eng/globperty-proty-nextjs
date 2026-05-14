import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";

const AD_OPTIONS = [
  {
    icon: "⭐",
    title: "Featured Listings",
    desc: "Pin your properties at the top of search results and category pages.",
    price: "From $49 / month",
    color: "#f0822d",
  },
  {
    icon: "🖼",
    title: "Homepage Banner",
    desc: "Premium banner placement on our homepage seen by all visitors.",
    price: "From $299 / month",
    color: "#8b5cf6",
  },
  {
    icon: "📧",
    title: "Newsletter Sponsorship",
    desc: "Reach our subscriber base of property investors with a dedicated placement.",
    price: "From $199 / send",
    color: "#3b82f6",
  },
  {
    icon: "🌍",
    title: "Country Page Sponsorship",
    desc: "Become the featured agent or developer on a specific country page.",
    price: "From $149 / month",
    color: "#16b286",
  },
  {
    icon: "🤖",
    title: "AI Copilot Integration",
    desc: "Have our AI Copilot recommend your listings to matching buyers automatically.",
    price: "From $99 / month",
    color: "#ef4444",
  },
  {
    icon: "📱",
    title: "Social Media Promotion",
    desc: "Get your properties featured across Globperty's social media channels.",
    price: "From $79 / campaign",
    color: "#f59e0b",
  },
];

export default function AdvertisePage() {
  return (
    <div id="wrapper">
      <Header1 />

      <div className="page-title style-2">
        <div className="tf-container">
          <div className="row justify-center">
            <div className="col-lg-8">
              <div className="content-inner">
                <div className="heading-title">
                  <h2 className="title">Advertise on Globperty</h2>
                  <ul className="breadcrumb justify-center">
                    <li><Link className="home fw-6 text-color-3" href="/">Home</Link></li>
                    <li>Advertise</li>
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
              <span style={{ fontSize: 12, color: "#f0822d", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>📣 Advertising</span>
            </div>
            <h2 className="title">Put Your Brand in Front of Global Property Investors</h2>
            <p className="text-1">Multiple advertising formats to match every budget and goal — from featured listings to homepage takeovers.</p>
          </div>

          {/* Audience numbers */}
          <div className="row g-3 mb-60">
            {[
              { value: "200K+", label: "Monthly visitors" },
              { value: "50K+", label: "Active buyer accounts" },
              { value: "12", label: "Countries covered" },
              { value: "$420K", label: "Avg. buyer budget" },
            ].map(s => (
              <div key={s.label} className="col-6 col-md-3">
                <div style={{ background: "#fff", borderRadius: 14, padding: "22px 16px", textAlign: "center", border: "1px solid #e5e7eb" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#f0822d", marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Ad options */}
          <div className="heading-section mb-32">
            <h3 className="title" style={{ fontSize: 24 }}>Advertising Options</h3>
          </div>
          <div className="row g-4 mb-60">
            {AD_OPTIONS.map(ad => (
              <div key={ad.title} className="col-md-4">
                <div style={{ background: "#fff", borderRadius: 16, padding: "24px", border: "1px solid #e5e7eb", height: "100%" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{ad.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{ad.title}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 12 }}>{ad.desc}</div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: ad.color, background: `${ad.color}15`, borderRadius: 8, padding: "3px 10px" }}>{ad.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/contact" className="tf-btn bg-color-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 36px", borderRadius: 10, fontSize: 16, fontWeight: 700 }}>
              Request a Media Pack →
            </Link>
          </div>

        </div>
      </section>

      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
