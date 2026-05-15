import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

export const metadata = {
  title: "Advertise on Globperty — Featured Listings & Banners",
  description: "Advertise on Globperty with featured listings, homepage banners, country-targeted campaigns and sponsored placements. Reach 50,000+ international property buyers.",
};

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=80",
  badge: "📣 Advertise — Featured Placements & Sponsorship",
  titleWhite: "Advertise on ",
  titleOrange: "Globperty",
  tagline: "Put your brand, listing or project in front of 50,000+ verified international property buyers. Homepage banners, featured listings, country-targeted ads and sponsorship packages.",
  tags: ["Homepage Banner", "Featured Listings", "Country Targeted", "Sponsored Content", "50K+ Buyers"],
  stats: [
    { value: "50K+", label: "Monthly Users" },
    { value: "12", label: "Countries" },
    { value: "Targeted", label: "by Country" },
    { value: "Premium", label: "Placement" },
  ],
  primaryCta: { href: "/contact", label: "📣 Get Advertising Rates" },
  secondaryCta: { href: "/register", label: "📋 Register Your Account" },
  snapshotTitle: "📣 Ad Formats",
  snapshot: [
    { key: "Homepage Banner",      value: "Hero + Mid-Page",       color: "#f0822d" },
    { key: "Featured Listings",    value: "Top of Category",       color: "#16b286" },
    { key: "Country Pages",        value: "Targeted Banner",       color: "#f0822d" },
    { key: "Sponsored Content",    value: "Articles + Guides",     color: "#16b286" },
    { key: "Email Campaigns",      value: "50K+ Buyer Database",   color: "#fff" },
    { key: "Expo Sponsorship",     value: "Branding + Presence",   color: "#fff" },
  ],
};

const AD_FORMATS = [
  { icon: "🖼", title: "Homepage Banner", desc: "Premium banner placement on the Globperty homepage. Seen by every visitor — highest impression volume." },
  { icon: "⭐", title: "Featured Listings", desc: "Your properties appear at the top of search results and category pages across all 12 countries." },
  { icon: "🌍", title: "Country-Targeted Ads", desc: "Banner and placement on specific country pages — e.g., show your Dubai project to all UAE-page visitors." },
  { icon: "✍️", title: "Sponsored Content", desc: "Co-branded articles, investment guides and market reports published on Globperty with your branding." },
  { icon: "📧", title: "Email Campaigns", desc: "Sponsored placement in Globperty's buyer newsletter — delivered to 50,000+ verified registered buyers." },
  { icon: "🎪", title: "Expo Sponsorship", desc: "Brand your slot at our virtual property expo — logo placement, welcome message and banner during all sessions." },
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
                Advertising <span style={{ color: "#f0822d" }}>Formats</span>
              </h2>
              <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 560, margin: "0 auto" }}>
                Choose the format that fits your goals — from high-volume brand awareness to targeted buyer acquisition.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
              {AD_FORMATS.map((f, i) => (
                <div key={i} style={{ background: "#f9fafb", borderRadius: 14, padding: "28px 24px", border: "1px solid #f3f4f6" }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{f.title}</h4>
                  <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "56px 0", background: "linear-gradient(135deg, #f0822d 0%, #e06820 100%)" }}>
          <div className="tf-container" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Get Your Advertising Rates</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Contact our media team for a custom advertising proposal tailored to your target market and budget.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ padding: "14px 32px", background: "#fff", color: "#f0822d", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none" }}>
                Request Media Kit →
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
