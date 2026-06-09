import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

export const metadata = {
  title: "Exhibit at Globperty Virtual Expo — Reach Global Buyers Live",
  description: "Present your property project live to international buyers at the Globperty Virtual Property Expo. Pre-qualified audiences, interactive sessions.",
};

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80",
  badge: "Virtual Property Expo — Live Global Reach",
  titleWhite: "Exhibit at the ",
  titleOrange: "Virtual Expo",
  tagline: "Present your property project live to thousands of pre-qualified international buyers. Interactive Q&A, real-time enquiries and global brand exposure — from anywhere in the world.",
  tags: ["Live Presentations", "Pre-Qualified Buyers", "Interactive Q&A", "12 Countries", "Real-Time Leads"],
  stats: [
    { value: "50K+", label: "Registered Buyers" },
    { value: "Live", label: "Presentation" },
    { value: "12", label: "Countries" },
    { value: "Real-Time", label: "Enquiries" },
  ],
  primaryCta: { href: "/contact", label: "Reserve Your Expo Slot"},
  secondaryCta: { href: "/register", label: "Register as Exhibitor"},
  snapshotTitle: "Expo at a Glance",
  snapshot: [
    { key: "Session Format",       value: "Live + Recorded",       color: "#f0822d" },
    { key: "Audience",             value: "Verified Buyers Only",  color: "#16b286" },
    { key: "Duration",             value: "30–60 Min Slots",       color: "#f0822d" },
    { key: "Q&A",                  value: "Live Chat + Video",     color: "#16b286" },
    { key: "Lead Capture",         value: "Instant + Post-Event",  color: "#fff" },
    { key: "Recording Access",     value: "30 Days Post-Event",    color: "#fff" },
  ],
};

const FEATURES = [
  { icon: "🎥", title: "Live Presentation Slot", desc: "Present your project with slides, videos and 3D walkthroughs to a live, international audience." },
  { icon: "💬", title: "Interactive Q&A", desc: "Buyers ask questions live via chat and video. High-intent sessions lead to faster deal closures." },
  { icon: "📥", title: "Instant Lead Capture", desc: "Interested buyers submit enquiries during your session. Leads delivered to your inbox in real time." },
  { icon: "🌍", title: "Global Buyer Audience", desc: "Your presentation reaches registered buyers from the UAE, UK, India, USA, Europe and Southeast Asia." },
  { icon: "📹", title: "Recording & Replay", desc: "Your session is recorded and available on your project page for 30 days — extended reach after the event." },
  { icon: "🏆", title: "Brand Exposure", desc: "Exhibitor listing on the Globperty expo page, email campaigns and social media promotion before the event." },
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
                What You Get as an <span style={{ color: "#f0822d" }}>Exhibitor</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 28 }}>
              {FEATURES.map((f, i) => (
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
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Reserve Your Expo Slot</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Slots are limited per expo. Contact our team to check availability and secure your presentation slot.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ padding: "14px 32px", background: "#fff", color: "#f0822d", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none" }}>
                Reserve Slot →
              </Link>
              <Link href="/developer-packages" style={{ padding: "14px 32px", background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                View Developer Packages
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
