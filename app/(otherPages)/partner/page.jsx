import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

export const metadata = {
  title: "Partner With Us — Relocation, Visa & Concierge Firms | Globperty",
  description: "Partner with Globperty as a relocation, visa or concierge service provider. Reach international property buyers who need end-to-end support.",
};

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80",
  badge: "Partner With Us — Relocation & Concierge Firms",
  titleWhite: "Partner ",
  titleOrange: "With Us",
  tagline: "Join the Globperty partner network as a relocation, visa, concierge or property management firm. Get referrals from international buyers who need end-to-end support.",
  tags: ["Relocation Firms", "Visa Consultants", "Concierge Services", "Property Management", "Global Buyers"],
  stats: [
    { value: "50K+", label: "Active Buyers" },
    { value: "12", label: "Countries" },
    { value: "End-to-End", label: "Buyer Support" },
    { value: "Referrals", label: "Direct to You" },
  ],
  primaryCta: { href: "/contact", label: "Become a Partner"},
  secondaryCta: { href: "/register", label: "Register Your Business"},
  snapshotTitle: "Partner Types",
  snapshot: [
    { key: "Relocation Firms",     value: "Welcome",               color: "#f0822d" },
    { key: "Visa Consultants",     value: "Welcome",               color: "#16b286" },
    { key: "Concierge Services",   value: "Welcome",               color: "#f0822d" },
    { key: "Property Management",  value: "Welcome",               color: "#16b286" },
    { key: "Directory Listing",    value: "Yes — Free",            color: "#fff" },
    { key: "Referral Method",      value: "Direct + Dashboard",    color: "#fff" },
  ],
};

const PARTNER_TYPES = [
  { icon: "🚚", title: "Relocation Firms", desc: "Help international buyers settle in their new country. School search, home setup, local registration and cultural orientation." },
  { icon: "🇺🇳", title: "Visa Consultants", desc: "Support buyers applying for golden visas, residency programmes and investor visas tied to their property purchases." },
  { icon: "🛎", title: "Concierge Services", desc: "Premium lifestyle management for high-net-worth buyers. Airport transfers, property management, personal assistance." },
  { icon: "🔑", title: "Property Management", desc: "Manage rental properties for overseas investors who purchase through Globperty and need day-to-day management." },
  { icon: "🏫", title: "Education Consultants", desc: "Connect relocating families with international schools. One of the top concerns for families moving abroad." },
  { icon: "🏥", title: "Healthcare Partners", desc: "Private health insurance providers and healthcare concierges for international residents and property investors." },
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
                Who Can <span style={{ color: "#f0822d" }}>Partner With Us?</span>
              </h2>
              <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 560, margin: "0 auto" }}>
                If your business serves international property buyers, we want to connect you with them.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
              {PARTNER_TYPES.map((p, i) => (
                <div key={i} style={{ background: "#f9fafb", borderRadius: 14, padding: "28px 24px", border: "1px solid #f3f4f6" }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{p.icon}</div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{p.title}</h4>
                  <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "56px 0", background: "linear-gradient(135deg, #f0822d 0%, #e06820 100%)" }}>
          <div className="tf-container" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Ready to Partner With Globperty?</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Contact our partnerships team to discuss how we can connect your services with our international buyer network.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ padding: "14px 32px", background: "#fff", color: "#f0822d", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none" }}>
                Get in Touch →
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
