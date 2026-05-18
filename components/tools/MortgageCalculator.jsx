"use client";
import { useState } from "react";

const COUNTRIES = ["UAE","USA","Portugal","Australia","Turkey","Cyprus","Malta","Canada","Hungary","Latvia","Philippines","Malaysia"];

const Field = ({ label, icon, children, hint }) => (
  <div>
    <label style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 13, fontWeight: 700, color: "#374151", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.5 }}>
      <span style={{ fontSize: 15 }}>{icon}</span> {label}
    </label>
    {children}
    {hint && <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 5, fontFamily: "inherit" }}>{hint}</p>}
  </div>
);

const inputStyle = {
  height: 50, fontFamily: "inherit", fontSize: 15, fontWeight: 500, color: "#111827",
  background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: 10, paddingLeft: 16, width: "100%",
};

export default function MortgageCalculator() {
  const [form, setForm] = useState({ propertyPrice: "", downPayment: "20", interestRate: "4.5", loanTermYears: "25", country: "" });
  const [result, setResult] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = () => {
    const price = parseFloat(form.propertyPrice);
    const dpPct = parseFloat(form.downPayment) / 100;
    const r = parseFloat(form.interestRate) / 100 / 12;
    const n = parseInt(form.loanTermYears) * 12;
    if (!price || !r || !n) return;
    const dp = price * dpPct;
    const P = price - dp;
    const monthly = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - P;
    setResult({ monthlyPayment: monthly.toFixed(0), downPayment: dp.toFixed(0), loanAmount: P.toFixed(0), totalPaid: totalPaid.toFixed(0), totalInterest: totalInterest.toFixed(0), loanYears: form.loanTermYears });
  };

  const fmt = (v) => parseFloat(v).toLocaleString();

  return (
    <section className="section-calculate flat-spacing-1" style={{ marginTop: 0 }}>
      <div className="tf-container">
        <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 60px rgba(0,0,0,0.12)", overflow: "hidden" }}>

          <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "40px 40px 36px" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "inline-block", background: "rgba(240,130,45,0.2)", color: "#f0822d", fontSize: 12, fontWeight: 700, borderRadius: 20, padding: "4px 14px", marginBottom: 14, fontFamily: "inherit", letterSpacing: 0.5 }}>
                🏦 MORTGAGE CALCULATOR
              </span>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 6, fontFamily: "inherit" }}>Calculate Mortgage Payments</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontFamily: "inherit", margin: 0 }}>Estimate your monthly repayment with our easy-to-use loan calculator.</p>
            </div>
          </div>

          <form className="form-pre-approved" onSubmit={e => { e.preventDefault(); calculate(); }} style={{ padding: "32px 40px" }}>
            <div className="row g-3" style={{ marginBottom: 24 }}>
              <div className="col-md-6">
                <Field label="Property Price" icon="🏠" hint="Total purchase price">
                  <fieldset style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, fontWeight: 700, color: "#6b7280", fontFamily: "inherit", zIndex: 1 }}>$</span>
                    <input type="number" className="form-control" placeholder="500,000" value={form.propertyPrice} onChange={e => set("propertyPrice", e.target.value)} style={{ ...inputStyle, paddingLeft: 28 }} />
                  </fieldset>
                </Field>
              </div>
              <div className="col-md-6">
                <Field label="Down Payment %" icon="💳" hint="Percentage of property price upfront">
                  <fieldset style={{ position: "relative" }}>
                    <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, fontWeight: 700, color: "#6b7280", fontFamily: "inherit", zIndex: 1 }}>%</span>
                    <input type="number" className="form-control" placeholder="20" value={form.downPayment} onChange={e => set("downPayment", e.target.value)} style={{ ...inputStyle, paddingRight: 30 }} />
                  </fieldset>
                </Field>
              </div>
              <div className="col-md-6">
                <Field label="Annual Interest Rate" icon="📊" hint="Your expected mortgage rate">
                  <fieldset style={{ position: "relative" }}>
                    <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, fontWeight: 700, color: "#6b7280", fontFamily: "inherit", zIndex: 1 }}>%</span>
                    <input type="number" className="form-control" placeholder="4.5" value={form.interestRate} onChange={e => set("interestRate", e.target.value)} style={{ ...inputStyle, paddingRight: 30 }} />
                  </fieldset>
                </Field>
              </div>
              <div className="col-md-6">
                <Field label="Loan Term" icon="⏳">
                  <fieldset>
                    <select className="form-control" value={form.loanTermYears} onChange={e => set("loanTermYears", e.target.value)} style={{ ...inputStyle }}>
                      {[5,10,15,20,25,30].map(y => <option key={y} value={y}>{y} years</option>)}
                    </select>
                  </fieldset>
                </Field>
              </div>
              <div className="col-md-6">
                <Field label="Country" icon="🌍" hint="Optional — for rate context">
                  <fieldset>
                    <select className="form-control" value={form.country} onChange={e => set("country", e.target.value)} style={{ ...inputStyle }}>
                      <option value="">Select country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </fieldset>
                </Field>
              </div>
            </div>

            <button type="submit" style={{
              width: "100%", height: 54, fontSize: 16, fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", fontFamily: "inherit",
              background: "linear-gradient(135deg, #f0822d 0%, #e56c1a 100%)",
              color: "#fff", boxShadow: "0 4px 20px rgba(240,130,45,0.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}>
              <span>Calculate Monthly Payment</span> <span style={{ fontSize: 18 }}>→</span>
            </button>

            {result && (
              <div style={{ marginTop: 32 }}>
                <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: 16, padding: "28px 32px", textAlign: "center", marginBottom: 24 }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, fontFamily: "inherit" }}>Estimated Monthly Payment</div>
                  <div style={{ fontSize: 52, fontWeight: 900, color: "#f0822d", letterSpacing: -2, fontFamily: "inherit" }}>${fmt(result.monthlyPayment)}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 8, fontFamily: "inherit" }}>Over {result.loanYears} years</div>
                </div>

                <div className="row g-3">
                  {[
                    { label: "Down Payment",   value: `$${fmt(result.downPayment)}`,   icon: "💳", color: "#16b286", bg: "linear-gradient(135deg,#f0fdf4,#dcfce7)" },
                    { label: "Loan Amount",    value: `$${fmt(result.loanAmount)}`,    icon: "🏦", color: "#3b82f6", bg: "linear-gradient(135deg,#eff6ff,#bfdbfe33)" },
                    { label: "Total Repaid",   value: `$${fmt(result.totalPaid)}`,     icon: "💰", color: "#8b5cf6", bg: "linear-gradient(135deg,#f5f3ff,#ddd6fe33)" },
                    { label: "Total Interest", value: `$${fmt(result.totalInterest)}`, icon: "📊", color: "#ef4444", bg: "linear-gradient(135deg,#fef2f2,#fecaca33)" },
                  ].map(card => (
                    <div key={card.label} className="col-6">
                      <div style={{ background: card.bg, borderRadius: 14, padding: "20px", border: `1.5px solid ${card.color}25`, textAlign: "center" }}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: card.color, marginBottom: 4, fontFamily: "inherit" }}>{card.value}</div>
                        <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.5 }}>{card.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 20, textAlign: "center", fontFamily: "inherit" }}>
                  Calculations are estimates. Actual repayments may vary based on lender conditions and fees.
                </p>
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
