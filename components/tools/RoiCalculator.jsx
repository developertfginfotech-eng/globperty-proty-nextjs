"use client";
import { useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;
const COUNTRIES = ["UAE","USA","Portugal","Australia","Turkey","Cyprus","Malta","Canada","Hungary","Latvia","Philippines","Malaysia"];

export default function RoiCalculator() {
  const [form, setForm] = useState({ purchasePrice: "", annualRent: "", annualGrowth: "5", years: "5", country: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hotspots, setHotspots] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = async () => {
    if (!form.purchasePrice) return;
    setLoading(true); setResult(null);
    const P = parseFloat(form.purchasePrice);
    const rent = parseFloat(form.annualRent) || 0;
    const g = parseFloat(form.annualGrowth) / 100;
    const n = parseInt(form.years);
    const futureValue = P * Math.pow(1 + g, n);
    const capitalGain = futureValue - P;
    const totalRentalIncome = rent * n;
    const totalReturn = capitalGain + totalRentalIncome;
    const totalRoi = ((totalReturn / P) * 100).toFixed(1);
    const annualisedRoi = (((Math.pow(1 + totalReturn / P, 1 / n)) - 1) * 100).toFixed(2);

    let hs = null;
    try {
      const res = await axios.get(`${API}/market-intelligence/investment-hotspots`, { timeout: 5000 });
      hs = (res.data?.data || res.data?.hotspots || []).slice(0, 3);
    } catch {}

    setResult({
      futureValue: futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      capitalGain: capitalGain.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      totalRentalIncome: totalRentalIncome.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      totalReturn: totalReturn.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      totalRoi, annualisedRoi,
    });
    setHotspots(hs);
    setLoading(false);
  };

  return (
    <section className="section-calculate flat-spacing-1">
      <div className="tf-container">
        <div className="box-calculate" style={{ background: "#fff", boxShadow: "0 8px 60px rgba(0,0,0,0.15)" }}>

          <div style={{ background: "linear-gradient(90deg, #f0822d, #e56c1a)", padding: "20px 32px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }}>📈</span>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>ROI & Capital Growth Estimator</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>Project your 5–10 year property investment returns</div>
            </div>
          </div>

          <form className="form-pre-approved" onSubmit={e => { e.preventDefault(); calculate(); }}>
            <div className="row g-3" style={{ marginBottom: 24 }}>
              <div className="col-md-6">
                <label className="fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Purchase Price ($)</label>
                <fieldset>
                  <input type="number" className="form-control" placeholder="e.g. 400000" value={form.purchasePrice} onChange={e => set("purchasePrice", e.target.value)} style={{ height: 48 }} />
                </fieldset>
              </div>
              <div className="col-md-6">
                <label className="fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Annual Rental Income ($)</label>
                <fieldset>
                  <input type="number" className="form-control" placeholder="e.g. 24000" value={form.annualRent} onChange={e => set("annualRent", e.target.value)} style={{ height: 48 }} />
                </fieldset>
              </div>
              <div className="col-md-6">
                <label className="fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Annual Growth (%)</label>
                <fieldset>
                  <input type="number" className="form-control" placeholder="e.g. 5" value={form.annualGrowth} onChange={e => set("annualGrowth", e.target.value)} style={{ height: 48 }} />
                </fieldset>
              </div>
              <div className="col-md-6">
                <label className="fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Investment Period (years)</label>
                <fieldset>
                  <select className="form-control" value={form.years} onChange={e => set("years", e.target.value)} style={{ height: 48, background: "#fff" }}>
                    {[3,5,7,10].map(y => <option key={y} value={y}>{y} years</option>)}
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

            <button type="submit" disabled={loading} className="tf-btn bg-color-primary w-full" style={{ height: 54, fontSize: 16, fontWeight: 700, borderRadius: 10, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Estimating…" : "Estimate ROI"} <i className="icon-arrow-right2" />
            </button>

            {result && (
              <div style={{ marginTop: 32 }}>
                <div className="row g-3 mb-20">
                  {[
                    { label: `Value in ${form.years}yrs`, value: `$${result.futureValue}`,       icon: "🏠", color: "#16b286", bg: "#f0fdf4" },
                    { label: "Capital Gain",               value: `$${result.capitalGain}`,       icon: "📈", color: "#f0822d", bg: "#fff7ed" },
                    { label: "Total Rental Income",        value: `$${result.totalRentalIncome}`, icon: "💰", color: "#3b82f6", bg: "#eff6ff" },
                    { label: "Total Return",               value: `$${result.totalReturn}`,       icon: "💎", color: "#8b5cf6", bg: "#f5f3ff" },
                    { label: "Total ROI",                  value: `${result.totalRoi}%`,          icon: "📊", color: "#ef4444", bg: "#fef2f2" },
                    { label: "Annualised ROI",             value: `${result.annualisedRoi}%`,     icon: "⚡", color: "#f59e0b", bg: "#fffbeb" },
                  ].map(card => (
                    <div key={card.label} className="col-4">
                      <div style={{ background: card.bg, borderRadius: 12, padding: "16px", border: `1.5px solid ${card.color}22` }}>
                        <div style={{ fontSize: 20, marginBottom: 6 }}>{card.icon}</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: card.color, marginBottom: 3 }}>{card.value}</div>
                        <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>{card.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {hotspots && hotspots.length > 0 && (
                  <div style={{ background: "#fff7ed", borderRadius: 12, padding: "20px 24px", border: "1px solid #fed7aa" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 12 }}>🔥 Top Investment Markets Right Now</div>
                    <div className="row g-2">
                      {hotspots.map((h, i) => (
                        <div key={i} className="col-4">
                          <div style={{ background: "#fff", borderRadius: 8, padding: "10px 14px", border: "1px solid #fed7aa" }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e" }}>{h.city || h.location || `Market ${i+1}`}</div>
                            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>Score: {h.investmentScore || h.score || "—"}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 20, textAlign: "center" }}>
                  Projections are estimates based on the growth rate you enter. Past market performance does not guarantee future results.
                </p>
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
