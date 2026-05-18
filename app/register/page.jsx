"use client";
import React, { useState } from "react";
import Link from "next/link";
import { register } from "@/utils/authApi";
import { useRouter } from "next/navigation";

const COUNTRIES = [
  "UAE", "USA", "Portugal", "Canada", "Australia",
  "Turkey", "Cyprus", "Malta", "Hungary", "Latvia",
  "Philippines", "Malaysia",
];
const COUNTRY_CODES = {
  UAE: "+971", USA: "+1", Portugal: "+351", Canada: "+1", Australia: "+61",
  Turkey: "+90", Cyprus: "+357", Malta: "+356", Hungary: "+36", Latvia: "+371",
  Philippines: "+63", Malaysia: "+60",
};

const EyeIcon = ({ open }) => open ? (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const STATS = [
  { value: "50K+", label: "Active Buyers" },
  { value: "12",   label: "Countries" },
  { value: "Free", label: "To Join" },
];

const AGENT_SECTIONS = [
  {
    title: "AGENTS & DEVELOPERS",
    items: [
      { label: "List Your Property",      sub: "Free during launch phase",           href: "/add-property" },
      { label: "Create Agent Profile",    sub: "Verified badge & public profile",     href: "/create-agent-profile" },
      { label: "Agent Dashboard",         sub: "Manage listings, leads & analytics",  href: "/dashboard" },
      { label: "Developer Packages",      sub: "Promote entire projects & launches",  href: "/developer-packages" },
      { label: "Buy Leads",               sub: "Pay per verified buyer lead",          href: "/buy-leads" },
      { label: "Exhibit at Virtual Expo", sub: "Present to global buyers live",        href: "/virtual-expo" },
    ],
  },
  {
    title: "BUSINESS PARTNERS",
    items: [
      { label: "Finance Partner Sign Up", sub: "Banks, mortgage & insurance firms",        href: "/finance-partner" },
      { label: "Legal Partner Sign Up",   sub: "Property lawyers & notaries",              href: "/legal-partner" },
      { label: "Advertise on Globperty",  sub: "Featured listings, banners & sponsorship", href: "/advertise" },
      { label: "Partner With Us",         sub: "Relocation, visa & concierge firms",       href: "/partner" },
    ],
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "UAE", role: "buyer", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const countryCode = COUNTRY_CODES[form.country] || "+1";
  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    setLoading(true);
    setError("");
    try {
      await register({ name: form.name, email: form.email, password: form.password, phone: form.phone, country: form.country, countryCode, role: form.role });
      if (form.role === "broker" || form.role === "seller") {
        window.location.href = "/kyc-property-verification";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wrapper">
      <div style={{ minHeight: "100vh", display: "flex" }}>

        {/* Left panel */}
        <div style={{
          flex: "0 0 44%",
          backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "44px 48px",
          overflowY: "auto",
          overflowX: "hidden",
        }}>
          {/* Gradient overlay */}
          <div style={{ position: "fixed", top: 0, left: 0, width: "44%", height: "100%", background: "linear-gradient(160deg, rgba(10,18,35,0.93) 0%, rgba(20,40,50,0.85) 60%, rgba(240,130,45,0.18) 100%)", pointerEvents: "none", zIndex: 0 }} />

          {/* Top: Logo */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#f0822d", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>Globperty</span>
            </Link>
          </div>

          {/* Middle: Headline + features */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", lineHeight: 1.25, marginBottom: 12 }}>
                Your Global<br />
                <span style={{ color: "#f0822d" }}>Real Estate Platform</span>
              </h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 320 }}>
                Join 50,000+ buyers, sellers and agents across 12 countries. Free to register.
              </p>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
              {STATS.map(s => (
                <div key={s.value} style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#f0822d", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Agent & Partner links — display only, not clickable */}
            {AGENT_SECTIONS.map(section => (
              <div key={section.title} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 9.5, fontWeight: 800, color: "#f0822d", letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 8 }}>
                  {section.title}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {section.items.map(item => (
                    <div key={item.href}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 14px", borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", transition: "all 0.15s", cursor: "default" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(240,130,45,0.14)"; e.currentTarget.style.borderColor = "rgba(240,130,45,0.35)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}
                    >
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{item.label}</div>
                        <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.3 }}>{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom: Already have account */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#f0822d", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div style={{ width: "100%", maxWidth: 430 }}>

            {/* Header */}
            <div style={{ marginBottom: 28, textAlign: "center" }}>
              <h3 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 6, fontFamily: "'Lexend', sans-serif" }}>Create Account</h3>
              <p style={{ fontSize: 14, color: "#9ca3af" }}>Free forever. No credit card required.</p>
            </div>

            <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 4px 40px rgba(0,0,0,0.07)", border: "1px solid #f0f0f0", padding: "32px 32px" }}>

              {error && (
                <div style={{ color: "#dc3545", fontSize: 13, marginBottom: 16, padding: "10px 14px", background: "#fff2f2", borderRadius: 8, border: "1px solid #fecaca" }}>{error}</div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Role selector */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>I am a</label>
                  <div style={{ display: "flex", gap: 8, background: "#f3f4f6", borderRadius: 12, padding: 4 }}>
                    {[
                      { value: "buyer",  label: "Buyer" },
                      { value: "seller", label: "Seller" },
                      { value: "broker", label: "Agent" },
                    ].map(opt => (
                      <button key={opt.value} type="button" onClick={() => setForm(f => ({ ...f, role: opt.value }))}
                        style={{
                          flex: 1, padding: "9px 8px", borderRadius: 9, border: "none",
                          background: form.role === opt.value ? "#fff" : "transparent",
                          boxShadow: form.role === opt.value ? "0 1px 6px rgba(0,0,0,0.1)" : "none",
                          cursor: "pointer", fontSize: 13, fontWeight: 700,
                          color: form.role === opt.value ? "#f0822d" : "#9ca3af",
                          transition: "all 0.15s",
                        }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full Name */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Full Name</label>
                  <input type="text" className="form-control" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required
                    style={{ borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, height: 46 }} />
                </div>

                {/* Email */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Email Address</label>
                  <input type="email" className="form-control" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required
                    style={{ borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, height: 46 }} />
                </div>

                {/* Country + Phone */}
                <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                  <div style={{ flex: "0 0 150px" }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Country</label>
                    <select className="form-control" name="country" value={form.country} onChange={handleChange}
                      style={{ borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 13, height: 46, fontFamily: "inherit" }}>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Phone</label>
                    <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e5e7eb", borderRadius: 10, background: "#fff", overflow: "hidden", height: 46 }}>
                      <span style={{ padding: "0 10px", color: "#374151", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", borderRight: "1.5px solid #e5e7eb", height: "100%", display: "flex", alignItems: "center" }}>{countryCode}</span>
                      <input type="tel" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange}
                        style={{ flex: 1, border: "none", outline: "none", background: "transparent", padding: "0 12px", fontSize: 13, fontFamily: "inherit", height: "100%" }} />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPassword ? "text" : "password"} className="form-control" name="password" placeholder="Create a password" value={form.password} onChange={handleChange} required
                      style={{ borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, height: 46, paddingRight: 44 }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: 22 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>Confirm Password</label>
                  <div style={{ position: "relative" }}>
                    <input type={showConfirm ? "text" : "password"} className="form-control" name="confirmPassword" placeholder="Confirm password" value={form.confirmPassword} onChange={handleChange} required
                      style={{ borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, height: 46, paddingRight: 44 }} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  style={{ width: "100%", height: 50, background: "linear-gradient(90deg, #f0822d, #e56c1a)", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, color: "#fff", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginBottom: 16, letterSpacing: 0.3 }}>
                  {loading ? "Creating account…" : "Create Free Account"}
                </button>

                <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af" }}>
                  Already have an account?{" "}
                  <Link href="/login" style={{ color: "#f0822d", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
                </p>
              </form>
            </div>

            <p style={{ textAlign: "center", fontSize: 11, color: "#d1d5db", marginTop: 20, lineHeight: 1.6 }}>
              By registering you agree to our{" "}
              <Link href="/terms" style={{ color: "#9ca3af", textDecoration: "underline" }}>Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" style={{ color: "#9ca3af", textDecoration: "underline" }}>Privacy Policy</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
