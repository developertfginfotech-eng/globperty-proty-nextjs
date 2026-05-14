"use client";
import { useState } from "react";

const COUNTRIES = ["UAE","USA","Portugal","Australia","Turkey","Cyprus","Malta","Canada","Hungary","Latvia","Philippines","Malaysia"];

export default function MortgageCalculator() {
  const [form, setForm] = useState({
    propertyPrice: "", downPayment: "20", interestRate: "4.5",
    loanTermYears: "25", country: "",
  });
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

    setResult({
      monthlyPayment: monthly.toFixed(0),
      downPayment: dp.toFixed(0),
      loanAmount: P.toFixed(0),
      totalPaid: totalPaid.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      loanYears: form.loanTermYears,
    });
  };

  const fmt = (v) => parseFloat(v).toLocaleString();

  return (
    <section className="section-calculate flat-spacing-1">
      <div className="tf-container">
        <div className="box-calculate">

          <div style={{ background: "linear-gradient(90deg, #f0822d, #e56c1a)", padding: "20px 32px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }}>🏦</span>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>Mortgage Calculator</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>Estimate your monthly repayments and total cost of borrowing</div>
            </div>
          </div>

          <form className="form-pre-approved" onSubmit={e => { e.preventDefault(); calculate(); }}>
            <div className="row g-3" style={{ marginBottom: 24 }}>
              <div className="col-md-6">
                <label className="fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Property Price ($)</label>
                <fieldset>
                  <input type="number" className="form-control" placeholder="e.g. 500000" value={form.propertyPrice} onChange={e => set("propertyPrice", e.target.value)} style={{ height: 48 }} />
                </fieldset>
              </div>
              <div className="col-md-6">
                <label className="fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Down Payment (%)</label>
                <fieldset>
                  <input type="number" className="form-control" placeholder="e.g. 20" value={form.downPayment} onChange={e => set("downPayment", e.target.value)} style={{ height: 48 }} />
                </fieldset>
              </div>
              <div className="col-md-6">
                <label className="fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Annual Interest Rate (%)</label>
                <fieldset>
                  <input type="number" className="form-control" placeholder="e.g. 4.5" value={form.interestRate} onChange={e => set("interestRate", e.target.value)} style={{ height: 48 }} />
                </fieldset>
              </div>
              <div className="col-md-6">
                <label className="fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Loan Term</label>
                <fieldset>
                  <select className="form-control" value={form.loanTermYears} onChange={e => set("loanTermYears", e.target.value)} style={{ height: 48, background: "#fff" }}>
                    {[5,10,15,20,25,30].map(y => <option key={y} value={y}>{y} years</option>)}
                  </select>
                </fieldset>
              </div>
              <div className="col-md-6">
                <label className="fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Country (optional)</label>
                <fieldset>
                  <select className="form-control" value={form.country} onChange={e => set("country", e.target.value)} style={{ height: 48, background: "#fff" }}>
                    <option value="">Select country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </fieldset>
              </div>
            </div>

            <button type="submit" className="tf-btn bg-color-primary w-full" style={{ height: 54, fontSize: 16, fontWeight: 700, borderRadius: 10 }}>
              Calculate Monthly Payment <i className="icon-arrow-right2" />
            </button>

            {result && (
              <div style={{ marginTop: 32 }}>
                <div style={{ background: "linear-gradient(135deg, #f0822d 0%, #e56c1a 100%)", borderRadius: 14, padding: "28px 32px", textAlign: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 8, fontWeight: 500 }}>Estimated Monthly Payment</div>
                  <div style={{ fontSize: 44, fontWeight: 900, color: "#fff", letterSpacing: -1 }}>${fmt(result.monthlyPayment)}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 8 }}>Over {result.loanYears} years</div>
                </div>

                <div className="row g-3">
                  {[
                    { label: "Down Payment",   value: `$${fmt(result.downPayment)}`,   icon: "💳", color: "#16b286", bg: "#f0fdf4" },
                    { label: "Loan Amount",    value: `$${fmt(result.loanAmount)}`,    icon: "🏦", color: "#3b82f6", bg: "#eff6ff" },
                    { label: "Total Repaid",   value: `$${fmt(result.totalPaid)}`,     icon: "💰", color: "#8b5cf6", bg: "#f5f3ff" },
                    { label: "Total Interest", value: `$${fmt(result.totalInterest)}`, icon: "📊", color: "#ef4444", bg: "#fef2f2" },
                  ].map(card => (
                    <div key={card.label} className="col-6">
                      <div style={{ background: card.bg, borderRadius: 12, padding: "18px 20px", border: `1.5px solid ${card.color}22` }}>
                        <div style={{ fontSize: 20, marginBottom: 6 }}>{card.icon}</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: card.color, marginBottom: 3 }}>{card.value}</div>
                        <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>{card.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 20, textAlign: "center" }}>
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
