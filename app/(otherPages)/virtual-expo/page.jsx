import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";

const EXPO_FEATURES = [
  { icon: "🎙", title: "Live Presentation Slot", desc: "Present your project live to hundreds of international investors in a 20-minute slot." },
  { icon: "🌐", title: "Global Audience", desc: "Reach HNW buyers from UAE, Europe, USA, Asia and beyond — all in one event." },
  { icon: "💬", title: "Live Q&A", desc: "Answer investor questions in real-time during your presentation." },
  { icon: "📹", title: "Recorded & Replayed", desc: "Your presentation stays on the Globperty platform for 30 days post-event." },
  { icon: "🤝", title: "1-on-1 Meetings", desc: "Book private video calls with interested investors during the expo day." },
  { icon: "📊", title: "Lead Reports", desc: "Receive a full list of attendees who viewed or interacted with your project." },
];

const UPCOMING = [
  { date: "June 2026", theme: "UAE & Gulf Investment Expo", spots: 8 },
  { date: "July 2026", theme: "European Golden Visa Showcase", spots: 12 },
  { date: "September 2026", theme: "Asia-Pacific Property Summit", spots: 10 },
];

export default function VirtualExpoPage() {
  return (
    <div id="wrapper">
      <Header1 />

      <div className="page-title style-2">
        <div className="tf-container">
          <div className="row justify-center">
            <div className="col-lg-8">
              <div className="content-inner">
                <div className="heading-title">
                  <h2 className="title">Exhibit at Virtual Expo</h2>
                  <ul className="breadcrumb justify-center">
                    <li><Link className="home fw-6 text-color-3" href="/">Home</Link></li>
                    <li>Virtual Expo</li>
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
              <span style={{ fontSize: 12, color: "#f0822d", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>🎪 Virtual Expo</span>
            </div>
            <h2 className="title">Present Your Project to Global Buyers — Live</h2>
            <p className="text-1">Globperty Virtual Expos connect developers and agents with serious international property investors in real time.</p>
          </div>

          {/* Features */}
          <div className="row g-4 mb-60">
            {EXPO_FEATURES.map(f => (
              <div key={f.title} className="col-md-4">
                <div style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #e5e7eb", height: "100%" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming expos */}
          <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.07)", border: "1px solid rgba(240,130,45,0.15)", overflow: "hidden", marginBottom: 48 }}>
            <div style={{ background: "linear-gradient(90deg,#f0822d,#e56c1a)", padding: "18px 32px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>📅</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Upcoming Expo Dates</span>
            </div>
            <div style={{ padding: "24px 32px" }}>
              <div className="row g-3">
                {UPCOMING.map(u => (
                  <div key={u.date} className="col-md-4">
                    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "20px", border: "1px solid #e5e7eb" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#f0822d", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>{u.date}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 10 }}>{u.theme}</div>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>
                        <span style={{ color: u.spots <= 5 ? "#ef4444" : "#16b286", fontWeight: 700 }}>{u.spots} spots left</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <p className="text-1 mb-16">Exhibitor slots are limited. Contact us to reserve your spot.</p>
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
