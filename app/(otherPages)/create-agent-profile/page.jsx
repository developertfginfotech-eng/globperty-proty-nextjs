import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

export const metadata = {
  title: "Create Agent Profile — Get Verified on Globperty",
  description: "Build your verified agent profile on Globperty. Get a public profile, verified badge, and connect with 50,000+ international buyers.",
};

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1400&q=80",
  badge: "Agent Profiles — Build Your Brand",
  titleWhite: "Create Your Verified ",
  titleOrange: "Agent Profile",
  tagline: "Get a public-facing agent profile with verified badge on Globperty. Showcase your listings, expertise and track record to 50,000+ international property buyers.",
  tags: ["Verified Badge", "Public Profile", "50K+ Buyers", "Free to Create", "Lead Generation"],
  stats: [
    { value: "50K+", label: "Active Buyers" },
    { value: "Free", label: "Profile Setup" },
    { value: "12", label: "Countries" },
    { value: "24h", label: "Profile Live" },
  ],
  primaryCta: { href: "/register", label: "Create My Profile — Free"},
  secondaryCta: { href: "/contact", label: "Talk to Our Team"},
  snapshotTitle: "Profile Features",
  snapshot: [
    { key: "Verified Badge",     value: "KYC Verified",       color: "#f0822d" },
    { key: "Public Profile URL", value: "globperty.com/agent/you", color: "#16b286" },
    { key: "Listed Properties",  value: "Unlimited",          color: "#f0822d" },
    { key: "Reviews & Ratings",  value: "Yes",                color: "#16b286" },
    { key: "Lead Notifications", value: "Email + Dashboard",  color: "#fff" },
    { key: "Profile Go-Live",    value: "Within 24 Hours",    color: "#fff" },
  ],
};

const FEATURES = [
  { icon: "✅", title: "Verified Agent Badge", desc: "Complete your KYC to earn the Globperty verified badge — displayed on your profile and all listings to build trust with buyers." },
  { icon: "🌍", title: "Global Visibility", desc: "Your profile is visible to verified buyers from the UAE, UK, India, USA, Portugal and 8 more countries searching on Globperty." },
  { icon: "📋", title: "Listing Showcase", desc: "All your property listings appear on your profile page. Buyers can browse your portfolio, enquire and contact you directly." },
  { icon: "⭐", title: "Reviews & Ratings", desc: "Collect verified reviews from past clients. A strong review profile is the #1 factor buyers use to choose an agent." },
  { icon: "📊", title: "Analytics Dashboard", desc: "See how many buyers viewed your profile, saved your listings, and submitted enquiries — updated in real time." },
  { icon: "🔗", title: "Shareable Profile Link", desc: "Get your own branded profile URL (globperty.com/agents/yourname) to share on WhatsApp, Instagram and your business card." },
];

const STEPS = [
  { title: "Register as Agent", desc: "Sign up on Globperty and select Broker / Agent as your account type during registration." },
  { title: "Complete KYC", desc: "Upload your ID and agent licence (where applicable). Our team verifies documents within 48 hours." },
  { title: "Fill Your Profile", desc: "Add your photo, bio, languages, specialisations, areas covered and social links." },
  { title: "Profile Goes Live", desc: "Your verified profile is published and visible to all buyers and property seekers on Globperty." },
];

export default function Page() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <div className="main-content">

        {/* Features */}
        <section style={{ padding: "64px 0 48px", background: "#fff" }}>
          <div className="tf-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#111827", marginBottom: 12 }}>
                What Your <span style={{ color: "#f0822d" }}>Profile Includes</span>
              </h2>
              <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 560, margin: "0 auto" }}>
                Everything you need to build credibility and generate leads from global buyers.
              </p>
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

        {/* Steps */}
        <section style={{ padding: "56px 0", background: "#f9fafb" }}>
          <div className="tf-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 10 }}>
                Get Live in <span style={{ color: "#f0822d" }}>4 Steps</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 24 }}>
              {STEPS.map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "24px 16px" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#f0822d", color: "#fff", fontSize: 18, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>{String(i + 1).padStart(2, "0")}</div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{s.title}</h4>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "56px 0", background: "linear-gradient(135deg, #f0822d 0%, #e06820 100%)" }}>
          <div className="tf-container" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Ready to Build Your Agent Profile?</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Join hundreds of verified agents already connecting with global buyers on Globperty.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/register" style={{ padding: "14px 32px", background: "#fff", color: "#f0822d", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none" }}>
                Create Free Profile →
              </Link>
              <Link href="/contact" style={{ padding: "14px 32px", background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 15, borderRadius: 10, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                Talk to Our Team
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
