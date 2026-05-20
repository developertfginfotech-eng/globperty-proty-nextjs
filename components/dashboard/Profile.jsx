"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";

const PREF_KEY = "buyer_prefs_v1";
function loadPrefs() { try { return JSON.parse(localStorage.getItem(PREF_KEY) || "{}"); } catch { return {}; } }

const PROP_TYPES = ["Apartment","Villa","Townhouse","Studio","Office","Land","Warehouse","Other"];

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [pwForm, setPwForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [pwMsg, setPwMsg] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [kycStatus, setKycStatus] = useState(null);
  const [prefs, setPrefs] = useState({});

  useEffect(() => {
    setPrefs(loadPrefs());
    apiClient.get("/auth/profile")
      .then((res) => {
        const u = res.data.user;
        setProfile(u);
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

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg("");
    try {
      await apiClient.put("/auth/profile", form);
      // Update localStorage user name
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...stored, name: form.name }));
      setSaveMsg("Profile updated successfully.");
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

  return (
    <div className="main-content style-2">
      <div className="main-content-inner wrap-dashboard-content-2">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div className="widget-box-2">
          {/* Account type */}
          <div className="box">
            <h3 className="title">Account Settings</h3>
            <div className="box-agent-account">
              <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:10 }}>
                <h6 style={{ margin:0 }}>{profile ? `${profile.role?.charAt(0).toUpperCase()}${profile.role?.slice(1)} Account` : "Account"}</h6>
                {kycStatus === "approved" && (
                  <span style={{ display:"inline-flex", alignItems:"center", gap:4, background:"#ECFDF5", color:"#10B981", fontSize:12, fontWeight:700, padding:"3px 10px", borderRadius:20, border:"1px solid #10B981" }}>
                    ✓ Verified
                  </span>
                )}
                {kycStatus === "pending" && (
                  <span style={{ display:"inline-flex", alignItems:"center", gap:4, background:"#FFF7ED", color:"#f0822d", fontSize:12, fontWeight:700, padding:"3px 10px", borderRadius:20, border:"1px solid #f0822d" }}>
                    ⏳ Verification Pending
                  </span>
                )}
                {(!kycStatus || kycStatus === "rejected") && (
                  <a href="/documents" style={{ display:"inline-flex", alignItems:"center", gap:4, background:"#F3F4F6", color:"#6B7280", fontSize:12, fontWeight:700, padding:"3px 10px", borderRadius:20, border:"1px solid #e0e3e8", textDecoration:"none" }}>
                    🔒 Get Verified →
                  </a>
                )}
              </div>
              <p className="note" style={{ color: "#555", marginBottom: 0 }}>
                Your account type: <strong>{profile?.role || "—"}</strong>
                {profile?.email && <span style={{ marginLeft: 12, color: "#888" }}>{profile.email}</span>}
              </p>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: 32, textAlign: "center", color: "#888" }}>Loading profile…</div>
          ) : (
            <>
              {/* Information Form */}
              <h5 className="title">Information</h5>
              <form onSubmit={handleSave}>
                <fieldset className="box box-fieldset">
                  <label htmlFor="name">Full name:<span>*</span></label>
                  <input type="text" id="name" value={form.name} onChange={set("name")} className="form-control" required />
                </fieldset>

                <fieldset className="box box-fieldset">
                  <label>Email address:</label>
                  <input type="email" value={form.email} className="form-control" readOnly style={{ background: "#f9f9f9", color: "#888" }} />
                </fieldset>

                <fieldset className="box box-fieldset">
                  <label htmlFor="phone">Your Phone:</label>
                  <input type="text" id="phone" value={form.phone} onChange={set("phone")} className="form-control" />
                </fieldset>

                <fieldset className="box box-fieldset">
                  <label>Description:</label>
                  <textarea value={form.description} onChange={set("description")} rows={5} className="form-control" placeholder="Tell buyers about yourself…" />
                </fieldset>

                <fieldset className="box grid-layout-4 gap-30">
                  <div className="box-fieldset">
                    <label htmlFor="agency">Your Company:</label>
                    <input type="text" id="agency" value={form.agencyName} onChange={set("agencyName")} className="form-control" />
                  </div>
                  <div className="box-fieldset">
                    <label htmlFor="position">Position:</label>
                    <input type="text" id="position" value={form.position} onChange={set("position")} className="form-control" />
                  </div>
                  <div className="box-fieldset">
                    <label htmlFor="officePhone">Office Number:</label>
                    <input type="text" id="officePhone" value={form.officePhone} onChange={set("officePhone")} className="form-control" />
                  </div>
                  <div className="box-fieldset">
                    <label htmlFor="officeAddress">Office Address:</label>
                    <input type="text" id="officeAddress" value={form.officeAddress} onChange={set("officeAddress")} className="form-control" />
                  </div>
                </fieldset>

                <div className="box grid-layout-4 gap-30 box-info-2">
                  <div className="box-fieldset">
                    <label htmlFor="job">Job:</label>
                    <input type="text" id="job" value={form.job} onChange={set("job")} className="form-control" />
                  </div>
                  <div className="box-fieldset">
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" value={form.location} onChange={set("location")} className="form-control" />
                  </div>
                  <div className="box-fieldset">
                    <label htmlFor="country">Country:</label>
                    <input type="text" id="country" value={form.country} onChange={set("country")} className="form-control" />
                  </div>
                </div>

                <div className="box box-fieldset">
                  <label htmlFor="fb">Facebook:</label>
                  <input type="text" id="fb" value={form.facebook} onChange={set("facebook")} className="form-control" placeholder="https://facebook.com/…" />
                </div>
                <div className="box box-fieldset">
                  <label htmlFor="tw">Twitter / X:</label>
                  <input type="text" id="tw" value={form.twitter} onChange={set("twitter")} className="form-control" placeholder="https://twitter.com/…" />
                </div>
                <div className="box box-fieldset">
                  <label htmlFor="linkedin">LinkedIn:</label>
                  <input type="text" id="linkedin" value={form.linkedin} onChange={set("linkedin")} className="form-control" placeholder="https://linkedin.com/in/…" />
                </div>

                {saveMsg && (
                  <div style={{
                    padding: "10px 16px", borderRadius: 8, marginBottom: 12,
                    background: saveMsg.includes("success") ? "#d1fae5" : "#fee2e2",
                    color: saveMsg.includes("success") ? "#065f46" : "#991b1b",
                    fontSize: 14,
                  }}>
                    {saveMsg}
                  </div>
                )}

                <div className="box">
                  <button type="submit" className="tf-btn bg-color-primary pd-10" disabled={saving}>
                    {saving ? "Saving…" : "Save & Update"}
                  </button>
                </div>
              </form>

              {/* Buyer Preferences */}
              {(profile?.role === "buyer" || profile?.role === "user") && (
                <>
                  <h5 className="title" style={{ marginTop: 32 }}>Property Preferences</h5>
                  <div className="box" style={{ background:"#f8fafc", border:"1px solid #eef0f3", borderRadius:10, padding:20, marginBottom:24 }}>
                    <p style={{ fontSize:13, color:"#888", marginBottom:16 }}>These help us show you better-matched listings and price alerts.</p>
                    <div className="box grid-layout-4 gap-30">
                      <div className="box-fieldset">
                        <label>Budget Min ($):</label>
                        <input type="number" value={prefs.budgetMin || ""} onChange={setPref("budgetMin")} className="form-control" placeholder="e.g. 100000" />
                      </div>
                      <div className="box-fieldset">
                        <label>Budget Max ($):</label>
                        <input type="number" value={prefs.budgetMax || ""} onChange={setPref("budgetMax")} className="form-control" placeholder="e.g. 500000" />
                      </div>
                      <div className="box-fieldset">
                        <label>Property Type Interest:</label>
                        <select value={prefs.propertyType || ""} onChange={setPref("propertyType")} className="form-control">
                          <option value="">Any</option>
                          {PROP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="box-fieldset">
                        <label>Preferred City:</label>
                        <input type="text" value={prefs.preferredCity || ""} onChange={setPref("preferredCity")} className="form-control" placeholder="e.g. Dubai" />
                      </div>
                    </div>
                    <p style={{ fontSize:12, color:"#bbb", marginTop:12, marginBottom:0 }}>Preferences are saved automatically as you type.</p>
                  </div>
                </>
              )}

              {/* Change Password */}
              <h5 className="title" style={{ marginTop: 32 }}>Change password</h5>
              <form onSubmit={handlePassword}>
                <div className="box grid-layout-3 gap-30">
                  <div className="box-fieldset">
                    <label>Old Password:<span>*</span></label>
                    <div className="box-password">
                      <input type="password" className="form-contact" placeholder="Old password" value={pwForm.oldPassword} onChange={(e) => setPwForm((p) => ({ ...p, oldPassword: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="box-fieldset">
                    <label>New Password:<span>*</span></label>
                    <div className="box-password">
                      <input type="password" className="form-contact" placeholder="New password" value={pwForm.newPassword} onChange={(e) => setPwForm((p) => ({ ...p, newPassword: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="box-fieldset mb-30">
                    <label>Confirm Password:<span>*</span></label>
                    <div className="box-password">
                      <input type="password" className="form-contact" placeholder="Confirm password" value={pwForm.confirmPassword} onChange={(e) => setPwForm((p) => ({ ...p, confirmPassword: e.target.value }))} required />
                    </div>
                  </div>
                </div>

                {pwMsg && (
                  <div style={{
                    padding: "10px 16px", borderRadius: 8, marginBottom: 12,
                    background: pwMsg.includes("success") ? "#d1fae5" : "#fee2e2",
                    color: pwMsg.includes("success") ? "#065f46" : "#991b1b",
                    fontSize: 14,
                  }}>
                    {pwMsg}
                  </div>
                )}

                <div className="box">
                  <button type="submit" className="tf-btn bg-color-primary pd-20" disabled={pwSaving}>
                    {pwSaving ? "Updating…" : "Update Password"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

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
