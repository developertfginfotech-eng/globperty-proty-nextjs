"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header1 from "@/components/headers/Header1";
import { register } from "@/utils/authApi";
import { useRouter } from "next/navigation";

const COUNTRIES = [
  "UAE", "USA", "UK", "Australia", "Canada", "Portugal", "Turkey", "Cyprus",
  "Malta", "Hungary", "Latvia", "Philippines", "Malaysia", "Singapore", "India",
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia",
  "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bolivia",
  "Bosnia", "Brazil", "Bulgaria", "Cambodia", "Cameroon", "Chile", "China", "Colombia",
  "Congo", "Costa Rica", "Croatia", "Cuba", "Czech Republic", "Denmark",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia",
  "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Guatemala",
  "Honduras", "Hong Kong", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait",
  "Kyrgyzstan", "Lebanon", "Libya", "Lithuania", "Luxembourg", "Macau",
  "Maldives", "Mauritius", "Mexico", "Moldova", "Mongolia", "Morocco",
  "Mozambique", "Myanmar", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
  "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Paraguay",
  "Peru", "Poland", "Qatar", "Romania", "Russia", "Saudi Arabia", "Senegal",
  "Serbia", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea",
  "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Tunisia", "Turkmenistan", "Uganda",
  "Ukraine", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zimbabwe",
];
const COUNTRY_CODES = {
  UAE: "+971", USA: "+1", UK: "+44", Australia: "+61", Canada: "+1",
  Portugal: "+351", Turkey: "+90", Cyprus: "+357", Malta: "+356", Hungary: "+36",
  Latvia: "+371", Philippines: "+63", Malaysia: "+60", Singapore: "+65", India: "+91",
  Afghanistan: "+93", Albania: "+355", Algeria: "+213", Andorra: "+376", Angola: "+244",
  Argentina: "+54", Armenia: "+374", Austria: "+43", Azerbaijan: "+994", Bahrain: "+973",
  Bangladesh: "+880", Belarus: "+375", Belgium: "+32", Bolivia: "+591", Bosnia: "+387",
  Brazil: "+55", Bulgaria: "+359", Cambodia: "+855", Cameroon: "+237", Chile: "+56",
  China: "+86", Colombia: "+57", Congo: "+243", "Costa Rica": "+506", Croatia: "+385",
  Cuba: "+53", "Czech Republic": "+420", Denmark: "+45", "Dominican Republic": "+1-809",
  Ecuador: "+593", Egypt: "+20", "El Salvador": "+503", Estonia: "+372", Ethiopia: "+251",
  Finland: "+358", France: "+33", Georgia: "+995", Germany: "+49", Ghana: "+233",
  Greece: "+30", Guatemala: "+502", Honduras: "+504", "Hong Kong": "+852",
  Indonesia: "+62", Iran: "+98", Iraq: "+964", Ireland: "+353", Israel: "+972",
  Italy: "+39", Jamaica: "+1-876", Japan: "+81", Jordan: "+962", Kazakhstan: "+7",
  Kenya: "+254", Kuwait: "+965", Kyrgyzstan: "+996", Lebanon: "+961", Libya: "+218",
  Lithuania: "+370", Luxembourg: "+352", Macau: "+853", Maldives: "+960",
  Mauritius: "+230", Mexico: "+52", Moldova: "+373", Mongolia: "+976", Morocco: "+212",
  Mozambique: "+258", Myanmar: "+95", Nepal: "+977", Netherlands: "+31",
  "New Zealand": "+64", Nicaragua: "+505", Nigeria: "+234", Norway: "+47", Oman: "+968",
  Pakistan: "+92", Palestine: "+970", Panama: "+507", Paraguay: "+595", Peru: "+51",
  Poland: "+48", Qatar: "+974", Romania: "+40", Russia: "+7", "Saudi Arabia": "+966",
  Senegal: "+221", Serbia: "+381", Slovakia: "+421", Slovenia: "+386", Somalia: "+252",
  "South Africa": "+27", "South Korea": "+82", Spain: "+34", "Sri Lanka": "+94",
  Sudan: "+249", Sweden: "+46", Switzerland: "+41", Syria: "+963", Taiwan: "+886",
  Tajikistan: "+992", Tanzania: "+255", Thailand: "+66", Tunisia: "+216",
  Turkmenistan: "+993", Uganda: "+256", Ukraine: "+380", Uruguay: "+598",
  Uzbekistan: "+998", Venezuela: "+58", Vietnam: "+84", Yemen: "+967", Zimbabwe: "+263",
};

const UserIcon = () => (
  <svg className="icon" width={18} height={18} viewBox="0 0 18 18" fill="none">
    <path d="M13.4869 14.0435C12.9628 13.3497 12.2848 12.787 11.5063 12.3998C10.7277 12.0126 9.86989 11.8115 9.00038 11.8123C8.13086 11.8115 7.27304 12.0126 6.49449 12.3998C5.71594 12.787 5.03793 13.3497 4.51388 14.0435M13.4869 14.0435C14.5095 13.1339 15.2307 11.9349 15.5563 10.6056C15.8818 9.27625 15.7956 7.87934 15.309 6.60014C14.8224 5.32093 13.9584 4.21986 12.8317 3.44295C11.7049 2.66604 10.3686 2.25 9 2.25C7.63137 2.25 6.29508 2.66604 5.16833 3.44295C4.04158 4.21986 3.17762 5.32093 2.69103 6.60014C2.20443 7.87934 2.11819 9.27625 2.44374 10.6056C2.76929 11.9349 3.49125 13.1339 4.51388 14.0435M13.4869 14.0435C12.2524 15.1447 10.6546 15.7521 9.00038 15.7498C7.3459 15.7523 5.74855 15.1448 4.51388 14.0435M11.2504 7.31228C11.2504 7.90902 11.0133 8.48131 10.5914 8.90327C10.1694 9.32523 9.59711 9.56228 9.00038 9.56228C8.40364 9.56228 7.83134 9.32523 7.40939 8.90327C6.98743 8.48131 6.75038 7.90902 6.75038 7.31228C6.75038 6.71554 6.98743 6.14325 7.40939 5.72129C7.83134 5.29933 8.40364 5.06228 9.00038 5.06228C9.59711 5.06228 10.1694 5.29933 10.5914 5.72129C11.0133 6.14325 11.2504 6.71554 11.2504 7.31228Z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const EmailIcon = () => (
  <svg className="icon" width={18} height={18} viewBox="0 0 18 18" fill="none">
    <path d="M16.3125 5.0625V12.9375C16.3125 13.3851 16.1347 13.8143 15.8182 14.1307C15.5018 14.4472 15.0726 14.625 14.625 14.625H3.375C2.92745 14.625 2.49822 14.4472 2.18176 14.1307C1.86529 13.8143 1.6875 13.3851 1.6875 12.9375V5.0625M16.3125 5.0625C16.3125 4.61495 16.1347 4.18573 15.8182 3.86926C15.5018 3.55279 15.0726 3.375 14.625 3.375H3.375C2.92745 3.375 2.49822 3.55279 2.18176 3.86926C1.86529 4.18573 1.6875 4.61495 1.6875 5.0625M16.3125 5.0625V5.24475C16.3125 5.53286 16.2388 5.81618 16.0983 6.06772C15.9578 6.31926 15.7553 6.53065 15.51 6.68175L9.885 10.143C9.61891 10.3069 9.31252 10.3937 9 10.3937C8.68748 10.3937 8.38109 10.3069 8.115 10.143L2.49 6.6825C2.24469 6.5314 2.04215 6.32001 1.90168 6.06847C1.7612 5.81693 1.68747 5.53361 1.6875 5.2455V5.0625" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const LockIcon = () => (
  <svg className="icon" width={18} height={18} viewBox="0 0 18 18" fill="none">
    <path d="M12.375 7.875V5.0625C12.375 4.16739 12.0194 3.30895 11.3865 2.67601C10.7535 2.04308 9.89511 1.6875 9 1.6875C8.10489 1.6875 7.24645 2.04308 6.61351 2.67601C5.98058 3.30895 5.625 4.16739 5.625 5.0625V7.875M5.0625 16.3125H12.9375C13.3851 16.3125 13.8143 16.1347 14.1307 15.8182C14.4472 15.5018 14.625 15.0726 14.625 14.625V9.5625C14.625 9.11495 14.4472 8.68573 14.1307 8.36926C13.8143 8.05279 13.3851 7.875 12.9375 7.875H5.0625C4.61495 7.875 4.18573 8.05279 3.86926 8.36926C3.55279 8.68573 3.375 9.11495 3.375 9.5625V14.625C3.375 15.0726 3.55279 15.5018 3.86926 15.8182C4.18573 16.1347 4.61495 16.3125 5.0625 16.3125Z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const EyeIcon = ({ open }) => open ? (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#A3ABB0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#A3ABB0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const FEATURES = [
  "List properties for free during our launch phase",
  "Get a verified agent badge and public profile",
  "Access buyer leads from 100+ countries",
  "Track analytics: views, enquiries, shortlists",
  "Golden Visa & residency programme tools",
  "AI-powered property matching for your clients",
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
      <Header1 />
      <div style={{ minHeight: "calc(100vh - 80px)", display: "flex" }}>

        {/* Left panel */}
        <div style={{
          flex: "0 0 42%",
          backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 48px",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(15,23,42,0.88) 0%, rgba(15,32,39,0.82) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 40, textDecoration: "none" }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>Globperty</span>
            </Link>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: 12 }}>
              Start Your Journey with<br />
              <span style={{ color: "#f0822d" }}>Globperty Today</span>
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 32, lineHeight: 1.7 }}>
              Join our global real estate platform and reach buyers worldwide.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {FEATURES.map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#f0822d", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </span>
                  <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.82)", lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div style={{ width: "100%", maxWidth: 440 }}>
            <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 30px rgba(0,0,0,0.08)", padding: "36px 36px" }}>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 6 }}>Sign Up</h3>
              <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>Create your free Globperty account.</p>

              {error && (
                <div style={{ color: "#dc3545", fontSize: 13, marginBottom: 16, padding: "10px 14px", background: "#fff2f2", borderRadius: 8, border: "1px solid #fecaca" }}>{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <fieldset className="box-fieldset" style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>I am a</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[{ value: "buyer", label: "Buyer" }, { value: "seller", label: "Seller" }].map(opt => (
                      <button key={opt.value} type="button" onClick={() => setForm(f => ({ ...f, role: opt.value }))}
                        style={{ flex: 1, padding: "10px", borderRadius: 8, border: `2px solid ${form.role === opt.value ? "#f0822d" : "#e5e7eb"}`, background: form.role === opt.value ? "#fff7ed" : "#f9fafb", cursor: "pointer", fontSize: 13, fontWeight: 700, color: form.role === opt.value ? "#f0822d" : "#374151" }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="box-fieldset" style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Full Name</label>
                  <div className="ip-field"><UserIcon /><input type="text" className="form-control" name="name" placeholder="Enter your full name" value={form.name} onChange={handleChange} required /></div>
                </fieldset>

                <fieldset className="box-fieldset" style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Email address</label>
                  <div className="ip-field"><EmailIcon /><input type="email" className="form-control" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required /></div>
                </fieldset>

                <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                  <fieldset className="box-fieldset" style={{ flex: "0 0 160px" }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Country</label>
                    <div className="ip-field" style={{ padding: "0 8px" }}>
                      <select className="form-control" name="country" value={form.country} onChange={handleChange} style={{ border: "none", outline: "none", background: "transparent", width: "100%", fontSize: 13, fontFamily: "inherit" }}>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </fieldset>
                  <fieldset className="box-fieldset" style={{ flex: 1 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Phone</label>
                    <div className="ip-field" style={{ gap: 4 }}>
                      <span style={{ padding: "0 6px", color: "#5C5E61", fontSize: 12, whiteSpace: "nowrap" }}>{countryCode}</span>
                      <input type="tel" className="form-control" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} style={{ fontFamily: "inherit", fontSize: 13 }} />
                    </div>
                  </fieldset>
                </div>

                <fieldset className="box-fieldset" style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Password</label>
                  <div className="ip-field" style={{ position: "relative" }}>
                    <LockIcon />
                    <input type={showPassword ? "text" : "password"} className="form-control" name="password" placeholder="Create a password" value={form.password} onChange={handleChange} required style={{ paddingRight: 36 }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </fieldset>

                <fieldset className="box-fieldset" style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Confirm Password</label>
                  <div className="ip-field" style={{ position: "relative" }}>
                    <LockIcon />
                    <input type={showConfirm ? "text" : "password"} className="form-control" name="confirmPassword" placeholder="Confirm password" value={form.confirmPassword} onChange={handleChange} required style={{ paddingRight: 36 }} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                </fieldset>

                <button type="submit" className="tf-btn bg-color-primary w-100" disabled={loading} style={{ height: 48, fontSize: 15, fontWeight: 700, borderRadius: 10, marginBottom: 16 }}>
                  {loading ? "Creating account..." : "Sign Up"}
                </button>

                <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280" }}>
                  Already have an account?{" "}
                  <Link href="/login" style={{ color: "#f0822d", fontWeight: 600, textDecoration: "none" }}>Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
