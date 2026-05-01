"use client";
import React, { useState } from "react";
import Image from "next/image";
import { register } from "@/utils/authApi";

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

const LockIcon = () => (
  <svg className="icon" width={18} height={18} viewBox="0 0 18 18" fill="none">
    <path d="M12.375 7.875V5.0625C12.375 4.16739 12.0194 3.30895 11.3865 2.67601C10.7535 2.04308 9.89511 1.6875 9 1.6875C8.10489 1.6875 7.24645 2.04308 6.61351 2.67601C5.98058 3.30895 5.625 4.16739 5.625 5.0625V7.875M5.0625 16.3125H12.9375C13.3851 16.3125 13.8143 16.1347 14.1307 15.8182C14.4472 15.5018 14.625 15.0726 14.625 14.625V9.5625C14.625 9.11495 14.4472 8.68573 14.1307 8.36926C13.8143 8.05279 13.3851 7.875 12.9375 7.875H5.0625C4.61495 7.875 4.18573 8.05279 3.86926 8.36926C3.55279 8.68573 3.375 9.11495 3.375 9.5625V14.625C3.375 15.0726 3.55279 15.5018 3.86926 15.8182C4.18573 16.1347 4.61495 16.3125 5.0625 16.3125Z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg className="icon" width={18} height={18} viewBox="0 0 18 18" fill="none">
    <path d="M13.4869 14.0435C12.9628 13.3497 12.2848 12.787 11.5063 12.3998C10.7277 12.0126 9.86989 11.8115 9.00038 11.8123C8.13086 11.8115 7.27304 12.0126 6.49449 12.3998C5.71594 12.787 5.03793 13.3497 4.51388 14.0435M13.4869 14.0435C14.5095 13.1339 15.2307 11.9349 15.5563 10.6056C15.8818 9.27625 15.7956 7.87934 15.309 6.60014C14.8224 5.32093 13.9584 4.21986 12.8317 3.44295C11.7049 2.66604 10.3686 2.25 9 2.25C7.63137 2.25 6.29508 2.66604 5.16833 3.44295C4.04158 4.21986 3.17762 5.32093 2.69103 6.60014C2.20443 7.87934 2.11819 9.27625 2.44374 10.6056C2.76929 11.9349 3.49125 13.1339 4.51388 14.0435M13.4869 14.0435C12.2524 15.1447 10.6546 15.7521 9.00038 15.7498C7.3459 15.7523 5.74855 15.1448 4.51388 14.0435M11.2504 7.31228C11.2504 7.90902 11.0133 8.48131 10.5914 8.90327C10.1694 9.32523 9.59711 9.56228 9.00038 9.56228C8.40364 9.56228 7.83134 9.32523 7.40939 8.90327C6.98743 8.48131 6.75038 7.90902 6.75038 7.31228C6.75038 6.71554 6.98743 6.14325 7.40939 5.72129C7.83134 5.29933 8.40364 5.06228 9.00038 5.06228C9.59711 5.06228 10.1694 5.29933 10.5914 5.72129C11.0133 6.14325 11.2504 6.71554 11.2504 7.31228Z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EmailIcon = () => (
  <svg className="icon" width={18} height={18} viewBox="0 0 18 18" fill="none">
    <path d="M16.3125 5.0625V12.9375C16.3125 13.3851 16.1347 13.8143 15.8182 14.1307C15.5018 14.4472 15.0726 14.625 14.625 14.625H3.375C2.92745 14.625 2.49822 14.4472 2.18176 14.1307C1.86529 13.8143 1.6875 13.3851 1.6875 12.9375V5.0625M16.3125 5.0625C16.3125 4.61495 16.1347 4.18573 15.8182 3.86926C15.5018 3.55279 15.0726 3.375 14.625 3.375H3.375C2.92745 3.375 2.49822 3.55279 2.18176 3.86926C1.86529 4.18573 1.6875 4.61495 1.6875 5.0625M16.3125 5.0625V5.24475C16.3125 5.53286 16.2388 5.81618 16.0983 6.06772C15.9578 6.31926 15.7553 6.53065 15.51 6.68175L9.885 10.143C9.61891 10.3069 9.31252 10.3937 9 10.3937C8.68748 10.3937 8.38109 10.3069 8.115 10.143L2.49 6.6825C2.24469 6.5314 2.04215 6.32001 1.90168 6.06847C1.7612 5.81693 1.68747 5.53361 1.6875 5.2455V5.0625" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeIcon = ({ open }) => open ? (
  <svg className="icon" width={18} height={18} viewBox="0 0 24 24" fill="none">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#A3ABB0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="#A3ABB0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
) : (
  <svg className="icon" width={18} height={18} viewBox="0 0 24 24" fill="none">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20C5 20 1 12 1 12a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="#A3ABB0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.73 10.73a3 3 0 004.54 4.54" stroke="#A3ABB0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "UAE",
    role: "buyer",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const countryCode = COUNTRY_CODES[form.country] || "+1";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        country: form.country,
        countryCode,
        role: form.role,
      });
      setSuccess("Account created successfully! You can now sign in.");
      setForm({ name: "", email: "", phone: "", country: "UAE", role: "buyer", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-account fade" id="modalRegister">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="flat-account">
            <div className="banner-account">
              <Image alt="banner" width={380} height={858} src="/images/section/banner-register.jpg" />
            </div>
            <form className="form-account" onSubmit={handleSubmit}>
              <div className="title-box">
                <h4>Register</h4>
                <span className="close-modal icon-close" data-bs-dismiss="modal" />
              </div>

              {error && (
                <div style={{ color: "#dc3545", fontSize: 13, marginBottom: 12, padding: "8px 12px", background: "#fff2f2", borderRadius: 6 }}>
                  {error}
                </div>
              )}
              {success && (
                <div style={{ color: "#198754", fontSize: 13, marginBottom: 12, padding: "8px 12px", background: "#f0fff4", borderRadius: 6 }}>
                  {success}
                </div>
              )}

              <div className="box">
                <fieldset className="box-fieldset">
                  <label htmlFor="reg-name">Full Name</label>
                  <div className="ip-field">
                    <UserIcon />
                    <input type="text" className="form-control" id="reg-name" name="name" placeholder="Enter your full name" value={form.name} onChange={handleChange} required />
                  </div>
                </fieldset>

                <fieldset className="box-fieldset">
                  <label htmlFor="reg-email">Email address</label>
                  <div className="ip-field">
                    <EmailIcon />
                    <input type="email" className="form-control" id="reg-email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
                  </div>
                </fieldset>

                <fieldset className="box-fieldset">
                  <label htmlFor="reg-phone">Phone</label>
                  <div className="ip-field" style={{ gap: 6 }}>
                    <span style={{ padding: "0 8px", color: "#5C5E61", fontSize: 13, whiteSpace: "nowrap", minWidth: 40 }}>{countryCode}</span>
                    <input type="tel" className="form-control" id="reg-phone" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} />
                  </div>
                </fieldset>

                <fieldset className="box-fieldset">
                  <label htmlFor="reg-country">Country</label>
                  <div className="ip-field">
                    <select className="form-control" id="reg-country" name="country" value={form.country} onChange={handleChange} style={{ border: "none", outline: "none", background: "transparent", width: "100%" }}>
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </fieldset>

                <fieldset className="box-fieldset">
                  <label htmlFor="reg-role">I am a</label>
                  <div className="ip-field">
                    <select className="form-control" id="reg-role" name="role" value={form.role} onChange={handleChange} style={{ border: "none", outline: "none", background: "transparent", width: "100%" }}>
                      <option value="buyer">Buyer / Tenant</option>
                      <option value="seller">Property Owner</option>
                      <option value="broker">Broker / Agent</option>
                    </select>
                  </div>
                </fieldset>

                <fieldset className="box-fieldset">
                  <label htmlFor="reg-pass">Password</label>
                  <div className="ip-field" style={{ position: "relative" }}>
                    <LockIcon />
                    <input type={showPassword ? "text" : "password"} className="form-control" id="reg-pass" name="password" placeholder="Your password" value={form.password} onChange={handleChange} required style={{ paddingRight: 36 }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </fieldset>

                <fieldset className="box-fieldset">
                  <label htmlFor="reg-confirm">Confirm password</label>
                  <div className="ip-field" style={{ position: "relative" }}>
                    <LockIcon />
                    <input type={showConfirm ? "text" : "password"} className="form-control" id="reg-confirm" name="confirmPassword" placeholder="Confirm password" value={form.confirmPassword} onChange={handleChange} required style={{ paddingRight: 36 }} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                </fieldset>
              </div>

              <div className="box box-btn">
                <button type="submit" className="tf-btn bg-color-primary w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Sign Up"}
                </button>
                <div className="text text-center">
                  Already have an account?{" "}
                  <a href="#modalLogin" data-bs-toggle="modal" className="text-color-primary">Sign In</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
