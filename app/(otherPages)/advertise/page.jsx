import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

const HERO = {
  badge: "📣 Advertising",
  titleWhite: "Put Your Brand in Front of ",
  titleOrange: "Global Investors",
  tagline: "Multiple advertising formats to match every budget and goal — from featured listings to homepage takeovers. Reach 200,000+ monthly property investors.",
  tags: ["Featured listings", "Homepage banners", "Newsletter sponsorship", "Country page sponsorship", "AI Copilot integration"],
  stats: [
    { value: "200K+", label: "Monthly visitors" },
    { value: "50K+", label: "Active buyers" },
    { value: "$420K", label: "Avg. buyer budget" },
    { value: "12", label: "Countries" },
  ],
  bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
  primaryCta: { href: "/contact", label: "📣 Request Media Pack" },
  secondaryCta: { href: "/contact", label: "💬 Talk to Advertising Team" },
  snapshotTitle: "📣 Ad Formats",
  snapshot: [
    { key: "Featured Listings", value: "From $49 / month", color: "#f0822d" },
    { key: "Homepage Banner", value: "From $299 / month", color: "#8b5cf6" },
    { key: "Newsletter Sponsor", value: "From $199 / send", color: "#3b82f6" },
    { key: "Country Page", value: "From $149 / month", color: "#16b286" },
    { key: "AI Copilot", value: "From $99 / month", color: "#ef4444" },
    { key: "Social Media", value: "From $79 / campaign", color: "#f59e0b" },
  ],
};

const AD_OPTIONS = [
  { icon: "⭐", title: "Featured Listings", desc: "Pin your properties at the top of search results and category pages.", price: "From $49 / month", color: "#f0822d" },
  { icon: "🖼", title: "Homepage Banner", desc: "Premium banner placement on our homepage seen by all visitors.", price: "From $299 / month", color: "#8b5cf6" },
  { icon: "📧", title: "Newsletter Sponsorship", desc: "Reach our subscriber base of property investors with a dedicated placement.", price: "From $199 / send", color: "#3b82f6" },
  { icon: "🌍", title: "Country Page Sponsorship", desc: "Become the featured agent or developer on a specific country page.", price: "From $149 / month", color: "#16b286" },
  { icon: "🤖", title: "AI Copilot Integration", desc: "Have our AI assistant recommend your listings to matching buyers automatically.", price: "From $99 / month", color: "#ef4444" },
  { icon: "📱", title: "Social Media Promotion", desc: "Get your properties featured across Globperty's social media channels.", price: "From $79 / campaign", color: "#f59e0b" },
];

export default function AdvertisePage() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <section style={{ background: "#fff", padding: "60px 0 80px" }}>
        <div className="tf-container">

          <div className="heading-section text-center mb-48">
            <h2 className="title">Advertising Options</h2>
            <p className="text-1">Multiple formats to suit every goal and budget.</p>
          </div>

          <div className="row g-4 mb-48">
            {AD_OPTIONS.map(ad => (
              <div key={ad.title} className="col-md-4">
                <div style={{ background: "#f9fafb", borderRadius: 16, padding: "24px", border: "1px solid #e5e7eb", height: "100%" }}>
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
