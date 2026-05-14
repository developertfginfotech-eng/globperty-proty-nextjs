import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";

const HERO = {
  badge: "🎪 Virtual Expo",
  titleWhite: "Present Your Project to ",
  titleOrange: "Global Buyers — Live",
  tagline: "Globperty Virtual Expos connect developers and agents with serious international property investors in real time, with live Q&A and 1-on-1 meeting slots.",
  tags: ["Live presentation", "Global audience", "Live Q&A", "Recorded replay", "1-on-1 investor meetings", "Lead reports"],
  stats: [
    { value: "500+", label: "Investors per expo" },
    { value: "3×", label: "Expos per year" },
    { value: "20 min", label: "Presentation slot" },
    { value: "30 days", label: "Replay online" },
  ],
  bgImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80",
  primaryCta: { href: "/contact", label: "🎪 Reserve My Slot" },
  secondaryCta: { href: "/contact", label: "📅 View Upcoming Dates" },
  snapshotTitle: "📅 Upcoming Expos",
  snapshot: [
    { key: "June 2026", value: "UAE & Gulf Expo", color: "#f0822d" },
    { key: "July 2026", value: "EU Golden Visa Show", color: "#16b286" },
    { key: "Sep 2026", value: "Asia-Pacific Summit", color: "#8b5cf6" },
    { key: "Slots available", value: "Limited — 8–12 per expo" },
    { key: "Audience", value: "500+ verified investors" },
    { key: "Format", value: "Live + recorded replay" },
  ],
};

const EXPO_FEATURES = [
  { icon: "🎙", title: "Live Presentation Slot", desc: "Present your project live to hundreds of international investors in a 20-minute slot." },
  { icon: "🌐", title: "Global Audience", desc: "Reach HNW buyers from UAE, Europe, USA, Asia and beyond — all in one event." },
  { icon: "💬", title: "Live Q&A", desc: "Answer investor questions in real-time during your presentation slot." },
  { icon: "📹", title: "Recorded & Replayed", desc: "Your presentation stays on the Globperty platform for 30 days post-event." },
  { icon: "🤝", title: "1-on-1 Meetings", desc: "Book private video calls with interested investors during the expo day." },
  { icon: "📊", title: "Lead Reports", desc: "Receive a full list of attendees who viewed or interacted with your project." },
];

const UPCOMING = [
  { date: "June 2026", theme: "UAE & Gulf Investment Expo", spots: 8, color: "#f0822d" },
  { date: "July 2026", theme: "European Golden Visa Showcase", spots: 12, color: "#16b286" },
  { date: "September 2026", theme: "Asia-Pacific Property Summit", spots: 10, color: "#8b5cf6" },
];

export default function VirtualExpoPage() {
  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <section style={{ background: "#fff", padding: "60px 0 80px" }}>
        <div className="tf-container">

          <div className="heading-section text-center mb-48">
            <h2 className="title">What's Included in Your Expo Slot</h2>
          </div>

          <div className="row g-4 mb-60">
            {EXPO_FEATURES.map(f => (
              <div key={f.title} className="col-md-4">
                <div style={{ background: "#f9fafb", borderRadius: 14, padding: "24px", border: "1px solid #e5e7eb", height: "100%" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="heading-section mb-28">
            <h3 className="title" style={{ fontSize: 26 }}>Upcoming Expo Dates</h3>
          </div>
          <div className="row g-4 mb-48">
            {UPCOMING.map(u => (
              <div key={u.date} className="col-md-4">
                <div style={{ background: "#f9fafb", borderRadius: 16, padding: "28px 24px", border: `2px solid ${u.color}30` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: u.color, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>{u.date}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 12 }}>{u.theme}</div>
                  <div style={{ fontSize: 13, color: u.spots <= 5 ? "#ef4444" : "#16b286", fontWeight: 600 }}>
                    {u.spots} exhibitor spots left
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <p className="text-1" style={{ marginBottom: 16 }}>Exhibitor slots are limited. Contact us to reserve your spot.</p>
            <Link href="/contact" className="tf-btn bg-color-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 36px", borderRadius: 10, fontSize: 16, fontWeight: 700 }}>
              Reserve My Expo Slot →
            </Link>
          </div>

        </div>
      </section>

      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
