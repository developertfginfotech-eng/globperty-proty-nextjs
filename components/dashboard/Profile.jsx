"use client";
import React, { useEffect, useState, useRef } from "react";
import apiClient from "@/utils/apiClient";

const PREF_KEY = "buyer_prefs_v1";
function loadPrefs() { try { return JSON.parse(localStorage.getItem(PREF_KEY) || "{}"); } catch { return {}; } }

const PROP_TYPES = ["Apartment","Villa","Townhouse","Studio","Office","Land","Warehouse","Other"];

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:4000";

function avatarSrc(raw) {
  if (!raw) return null;
  if (raw.startsWith("http")) return raw;
  return `${BACKEND_URL}${raw}`;
}

function SectionHeader({ icon, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 12, borderBottom: "1.5px solid #f0f2f5" }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, background: "rgba(240,130,45,0.1)", color: "#f0822d", flexShrink: 0 }}>
        {icon}
      </span>
      <span style={{ fontSize: 15, fontWeight: 700, color: "#1a2332", letterSpacing: "-0.2px" }}>{title}</span>
    </div>
  );
}

function FormField({ label, required, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.6px" }}>
        {label}{required && <span style={{ color: "#f0822d", marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  height: 48, padding: "0 16px", borderRadius: 10, border: "1.5px solid #e5e7eb",
  fontSize: 14, color: "#1a2332", background: "#fff", outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s", width: "100%", boxSizing: "border-box",
  fontFamily: "inherit",
};
const readonlyStyle = { ...inputStyle, background: "#f5f6f8", color: "#9ca3af", cursor: "not-allowed" };

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [pwForm, setPwForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [pwMsg, setPwMsg] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [kycStatus, setKycStatus] = useState(null);
  const [prefs, setPrefs] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    setPrefs(loadPrefs());
    apiClient.get("/auth/profile")
      .then((res) => {
        const u = res.data.user;
        setProfile(u);
        if (u.avatar) setAvatarPreview(avatarSrc(u.avatar));
        setForm({
          name: u.name || "",
          email: u.email || "",
          phone: u.phone || "",
          country: u.country || "",
          description: u.description || "",
          agencyName: u.agencyName || "",
          position: u.position || "",
          job: u.job || "",
          officePhone: u.officePhone || "",
          officeAddress: u.officeAddress || "",
          location: u.location || "",
          facebook: u.facebook || "",
          twitter: u.twitter || "",
          linkedin: u.linkedin || "",
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    apiClient.get("/kyc/status")
      .then((res) => setKycStatus(res.data?.data?.status || res.data?.status || null))
      .catch(() => {});
  }, []);

  const setPref = (f) => (e) => {
    const next = { ...loadPrefs(), [f]: e.target.value };
    localStorage.setItem(PREF_KEY, JSON.stringify(next));
    setPrefs(next);
  };

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg("");
    try {
      if (avatarFile) {
        const fd = new FormData();
        fd.append("avatar", avatarFile);
        Object.keys(form).forEach((k) => fd.append(k, form[k]));
        await apiClient.put("/auth/profile", fd, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await apiClient.put("/auth/profile", form);
      }
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...stored, name: form.name }));
      setSaveMsg("Profile updated successfully.");
      setAvatarFile(null);
    } catch (err) {
      setSaveMsg(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwMsg("New passwords do not match.");
      return;
    }
    setPwSaving(true);
    setPwMsg("");
    try {
      await apiClient.put("/auth/change-password", {
        oldPassword: pwForm.oldPassword,
        newPassword: pwForm.newPassword,
      });
      setPwMsg("Password updated successfully.");
      setPwForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPwMsg(err?.response?.data?.message || "Failed to update password.");
    } finally {
      setPwSaving(false);
    }
  };

  const roleName = profile?.role
    ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
    : "Account";

  return (
    <div className="main-content style-2" style={{ flex: 1, minWidth: 0, width: "100%" }}>
      <div className="main-content-inner wrap-dashboard-content-2" style={{ width: "100%", boxSizing: "border-box" }}>
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <style jsx>{`
          .profile-input:focus {
            border-color: #f0822d !important;
            box-shadow: 0 0 0 3px rgba(240,130,45,0.12) !important;
          }
          .profile-input::placeholder { color: #c4c9d4; }
          .profile-card { background: #fff; border-radius: 14px; border: 1px solid #eef0f3; box-shadow: 0 1px 6px rgba(0,0,0,0.04); padding: 24px; margin-bottom: 16px; width: 100%; box-sizing: border-box; }
          .profile-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .profile-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
          @media (max-width: 768px) {
            .profile-grid-2 { grid-template-columns: 1fr; }
            .profile-grid-3 { grid-template-columns: 1fr; }
          }
          .save-btn {
            background: linear-gradient(135deg, #f0822d, #e56c1a);
            color: #fff; border: none; border-radius: 12px;
            padding: 14px 32px; font-size: 14px; font-weight: 700;
            cursor: pointer; transition: opacity 0.15s, transform 0.1s;
            display: inline-flex; align-items: center; gap: 8px;
          }
          .save-btn:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
          .save-btn:disabled { background: #d1d5db; cursor: not-allowed; }
          .profile-wrap { width: 100%; }
        `}</style>

        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h4 style={{ margin: 0, fontWeight: 800, color: "#1a2332", fontSize: 22 }}>My Profile</h4>
            <p style={{ margin: "4px 0 0", color: "#9ca3af", fontSize: 13 }}>Manage your personal information and preferences</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {kycStatus === "approved" && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#ECFDF5", color: "#10B981", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20, border: "1px solid #A7F3D0" }}>
                <svg width={12} height={12} viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                KYC Verified
              </span>
            )}
            {kycStatus === "pending" && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFF7ED", color: "#f0822d", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20, border: "1px solid #fed7aa" }}>
                ⏳ Verification Pending
              </span>
            )}
            {(!kycStatus || kycStatus === "rejected") && (
              <a href="/kyc-property-verification" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f0822d", color: "#fff", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20, textDecoration: "none" }}>
                🔒 Get KYC Verified
              </a>
            )}
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 64, textAlign: "center", color: "#9ca3af", fontSize: 15 }}>
            <div style={{ width: 40, height: 40, border: "3px solid #f0f2f5", borderTop: "3px solid #f0822d", borderRadius: "50%", margin: "0 auto 12px", animation: "spin 0.8s linear infinite" }} />
            Loading your profile…
          </div>
        ) : (
          <>
            {/* Avatar + account card */}
            <div className="profile-card" style={{ background: "linear-gradient(135deg, #1a2332 0%, #2d3a4d 100%)", border: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{ width: 96, height: 96, borderRadius: "50%", background: avatarPreview ? "transparent" : "linear-gradient(135deg,#f0822d,#e56c1a)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "3px solid rgba(255,255,255,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                    {avatarPreview
                      ? <img src={avatarPreview} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <span style={{ fontSize: 36, fontWeight: 800, color: "#fff" }}>{(profile?.name || "U")[0].toUpperCase()}</span>
                    }
                  </div>
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    style={{ position: "absolute", bottom: 2, right: 2, width: 30, height: 30, borderRadius: "50%", background: "#f0822d", border: "2px solid #fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(240,130,45,0.5)" }}>
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4, letterSpacing: "-0.3px" }}>{profile?.name || "Your Name"}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 10 }}>{profile?.email}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(240,130,45,0.2)", color: "#f0822d", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(240,130,45,0.3)" }}>
                      {roleName} Account
                    </span>
                    <button type="button" onClick={() => fileInputRef.current?.click()}
                      style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 14px", cursor: "pointer" }}>
                      Change Photo
                    </button>
                    {avatarFile && <span style={{ fontSize: 11, color: "#4ade80" }}>✓ Ready to save</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Information form */}
            <form onSubmit={handleSave}>
              <div className="profile-card">
                <SectionHeader
                  title="Personal Information"
                  icon={<svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                />
                <div className="profile-grid-2" style={{ marginBottom: 18 }}>
                  <FormField label="Full Name" required>
                    <input
                      type="text" value={form.name} onChange={set("name")} required
                      className="profile-input"
                      style={focusedField === "name" ? { ...inputStyle, borderColor: "#f0822d", boxShadow: "0 0 0 3px rgba(240,130,45,0.12)" } : inputStyle}
                      onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                      placeholder="Your full name"
                    />
                  </FormField>
                  <FormField label="Email Address">
                    <input type="email" value={form.email} style={readonlyStyle} readOnly placeholder="Email address" />
                  </FormField>
                </div>
                <div className="profile-grid-2" style={{ marginBottom: 18 }}>
                  <FormField label="Phone Number">
                    <input
                      type="text" value={form.phone} onChange={set("phone")}
                      className="profile-input"
                      style={focusedField === "phone" ? { ...inputStyle, borderColor: "#f0822d", boxShadow: "0 0 0 3px rgba(240,130,45,0.12)" } : inputStyle}
                      onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)}
                      placeholder="Your phone number"
                    />
                  </FormField>
                  <FormField label="Country">
                    <input
                      type="text" value={form.country} onChange={set("country")}
                      className="profile-input"
                      style={focusedField === "country" ? { ...inputStyle, borderColor: "#f0822d", boxShadow: "0 0 0 3px rgba(240,130,45,0.12)" } : inputStyle}
                      onFocus={() => setFocusedField("country")} onBlur={() => setFocusedField(null)}
                      placeholder="Country"
                    />
                  </FormField>
                </div>
                <FormField label="Bio / Description">
                  <textarea
                    value={form.description} onChange={set("description")} rows={4}
                    className="profile-input"
                    style={{ ...inputStyle, height: "auto", padding: "12px 16px", resize: "vertical", lineHeight: 1.6 }}
                    onFocus={() => setFocusedField("desc")} onBlur={() => setFocusedField(null)}
                    placeholder="Tell buyers about yourself…"
                  />
                </FormField>
              </div>

              {/* Professional Details */}
              <div className="profile-card">
                <SectionHeader
                  title="Professional Details"
                  icon={<svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>}
                />
                <div className="profile-grid-2" style={{ marginBottom: 18 }}>
                  <FormField label="Company / Agency">
                    <input type="text" value={form.agencyName} onChange={set("agencyName")} className="profile-input"
                      style={focusedField === "agency" ? { ...inputStyle, borderColor: "#f0822d", boxShadow: "0 0 0 3px rgba(240,130,45,0.12)" } : inputStyle}
                      onFocus={() => setFocusedField("agency")} onBlur={() => setFocusedField(null)} placeholder="Company name" />
                  </FormField>
                  <FormField label="Position / Title">
                    <input type="text" value={form.position} onChange={set("position")} className="profile-input"
                      style={focusedField === "pos" ? { ...inputStyle, borderColor: "#f0822d", boxShadow: "0 0 0 3px rgba(240,130,45,0.12)" } : inputStyle}
                      onFocus={() => setFocusedField("pos")} onBlur={() => setFocusedField(null)} placeholder="e.g. Senior Agent" />
                  </FormField>
                </div>
                <div className="profile-grid-2" style={{ marginBottom: 18 }}>
                  <FormField label="Job Type">
                    <input type="text" value={form.job} onChange={set("job")} className="profile-input"
                      style={focusedField === "job" ? { ...inputStyle, borderColor: "#f0822d", boxShadow: "0 0 0 3px rgba(240,130,45,0.12)" } : inputStyle}
                      onFocus={() => setFocusedField("job")} onBlur={() => setFocusedField(null)} placeholder="e.g. Real estate agent" />
                  </FormField>
                  <FormField label="Location">
                    <input type="text" value={form.location} onChange={set("location")} className="profile-input"
                      style={focusedField === "loc" ? { ...inputStyle, borderColor: "#f0822d", boxShadow: "0 0 0 3px rgba(240,130,45,0.12)" } : inputStyle}
                      onFocus={() => setFocusedField("loc")} onBlur={() => setFocusedField(null)} placeholder="City, Country" />
                  </FormField>
                </div>
                <div className="profile-grid-2">
                  <FormField label="Office Phone">
                    <input type="text" value={form.officePhone} onChange={set("officePhone")} className="profile-input"
                      style={focusedField === "offph" ? { ...inputStyle, borderColor: "#f0822d", boxShadow: "0 0 0 3px rgba(240,130,45,0.12)" } : inputStyle}
                      onFocus={() => setFocusedField("offph")} onBlur={() => setFocusedField(null)} placeholder="Office number" />
                  </FormField>
                  <FormField label="Office Address">
                    <input type="text" value={form.officeAddress} onChange={set("officeAddress")} className="profile-input"
                      style={focusedField === "offad" ? { ...inputStyle, borderColor: "#f0822d", boxShadow: "0 0 0 3px rgba(240,130,45,0.12)" } : inputStyle}
                      onFocus={() => setFocusedField("offad")} onBlur={() => setFocusedField(null)} placeholder="Office address" />
                  </FormField>
                </div>
              </div>

              {/* Social Links */}
              <div className="profile-card">
                <SectionHeader
                  title="Social Links"
                  icon={<svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { key: "facebook", label: "Facebook", icon: "f", placeholder: "https://facebook.com/yourprofile" },
                    { key: "twitter", label: "Twitter / X", icon: "𝕏", placeholder: "https://twitter.com/yourhandle" },
                    { key: "linkedin", label: "LinkedIn", icon: "in", placeholder: "https://linkedin.com/in/yourprofile" },
                  ].map(({ key, label, icon, placeholder }) => (
                    <FormField key={key} label={label}>
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 20, height: 20, borderRadius: 4, background: "#f0f2f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#6b7280" }}>
                          {icon}
                        </span>
                        <input type="text" value={form[key]} onChange={set(key)} className="profile-input"
                          style={focusedField === key ? { ...inputStyle, paddingLeft: 44, borderColor: "#f0822d", boxShadow: "0 0 0 3px rgba(240,130,45,0.12)" } : { ...inputStyle, paddingLeft: 44 }}
                          onFocus={() => setFocusedField(key)} onBlur={() => setFocusedField(null)}
                          placeholder={placeholder} />
                      </div>
                    </FormField>
                  ))}
                </div>
              </div>

              {/* Save button */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <button type="submit" className="save-btn" disabled={saving}>
                  {saving ? (
                    <>
                      <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", display: "inline-block" }} />
                      Saving…
                    </>
                  ) : (
                    <>
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                      Save Changes
                    </>
                  )}
                </button>
                {saveMsg && (
                  <span style={{ fontSize: 13, fontWeight: 600, color: saveMsg.includes("success") ? "#10B981" : "#ef4444" }}>
                    {saveMsg.includes("success") ? "✓" : "✗"} {saveMsg}
                  </span>
                )}
              </div>
            </form>

            {/* Buyer Preferences */}
            {(profile?.role === "buyer" || profile?.role === "user") && (
              <div className="profile-card">
                <SectionHeader
                  title="Property Preferences"
                  icon={<svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
                />
                <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 18, marginTop: -6 }}>These help us show you better-matched listings and price alerts.</p>
                <div className="profile-grid-2">
                  <FormField label="Budget Min ($)">
                    <input type="number" value={prefs.budgetMin || ""} onChange={setPref("budgetMin")} className="profile-input"
                      style={inputStyle} placeholder="e.g. 100,000" />
                  </FormField>
                  <FormField label="Budget Max ($)">
                    <input type="number" value={prefs.budgetMax || ""} onChange={setPref("budgetMax")} className="profile-input"
                      style={inputStyle} placeholder="e.g. 500,000" />
                  </FormField>
                  <FormField label="Property Type">
                    <select value={prefs.propertyType || ""} onChange={setPref("propertyType")} className="profile-input"
                      style={{ ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}>
                      <option value="">Any type</option>
                      {PROP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Preferred City">
                    <input type="text" value={prefs.preferredCity || ""} onChange={setPref("preferredCity")} className="profile-input"
                      style={inputStyle} placeholder="e.g. Dubai" />
                  </FormField>
                </div>
                <p style={{ fontSize: 11, color: "#d1d5db", marginTop: 14, marginBottom: 0 }}>Preferences are saved automatically as you type.</p>
              </div>
            )}

            {/* Change Password */}
            <form onSubmit={handlePassword}>
              <div className="profile-card">
                <SectionHeader
                  title="Change Password"
                  icon={<svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>}
                />
                <div className="profile-grid-3" style={{ marginBottom: 18 }}>
                  <FormField label="Current Password" required>
                    <input type="password" value={pwForm.oldPassword} className="profile-input"
                      onChange={(e) => setPwForm((p) => ({ ...p, oldPassword: e.target.value }))}
                      style={focusedField === "oldpw" ? { ...inputStyle, borderColor: "#f0822d", boxShadow: "0 0 0 3px rgba(240,130,45,0.12)" } : inputStyle}
                      onFocus={() => setFocusedField("oldpw")} onBlur={() => setFocusedField(null)}
                      placeholder="Current password" required />
                  </FormField>
                  <FormField label="New Password" required>
                    <input type="password" value={pwForm.newPassword} className="profile-input"
                      onChange={(e) => setPwForm((p) => ({ ...p, newPassword: e.target.value }))}
                      style={focusedField === "newpw" ? { ...inputStyle, borderColor: "#f0822d", boxShadow: "0 0 0 3px rgba(240,130,45,0.12)" } : inputStyle}
                      onFocus={() => setFocusedField("newpw")} onBlur={() => setFocusedField(null)}
                      placeholder="New password" required />
                  </FormField>
                  <FormField label="Confirm Password" required>
                    <input type="password" value={pwForm.confirmPassword} className="profile-input"
                      onChange={(e) => setPwForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                      style={focusedField === "conpw" ? { ...inputStyle, borderColor: "#f0822d", boxShadow: "0 0 0 3px rgba(240,130,45,0.12)" } : inputStyle}
                      onFocus={() => setFocusedField("conpw")} onBlur={() => setFocusedField(null)}
                      placeholder="Confirm new password" required />
                  </FormField>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <button type="submit" className="save-btn" disabled={pwSaving}>
                    {pwSaving ? "Updating…" : "Update Password"}
                  </button>
                  {pwMsg && (
                    <span style={{ fontSize: 13, fontWeight: 600, color: pwMsg.includes("success") ? "#10B981" : "#ef4444" }}>
                      {pwMsg.includes("success") ? "✓" : "✗"} {pwMsg}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </>
        )}

        <div className="footer-dashboard">
          <p>Copyright © {new Date().getFullYear()} Globperty</p>
          <ul className="list">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
      </div>
      <div className="overlay-dashboard" />
    </div>
  );
}
