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

    setResult({ futureValue: futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      capitalGain: capitalGain.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      totalRentalIncome: totalRentalIncome.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      totalReturn: totalReturn.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      totalRoi, annualisedRoi });
    setHotspots(hs);
    setLoading(false);
  };

  const FIELDS = [
    { key: "purchasePrice", label: "Purchase Price ($)", placeholder: "e.g. 400000" },
    { key: "annualRent",    label: "Annual Rental Income ($)", placeholder: "e.g. 24000" },
    { key: "annualGrowth",  label: "Annual Growth (%)", placeholder: "e.g. 5" },
    { key: "years",         label: "Investment Period (years)", placeholder: "e.g. 5" },
  ];

  return (
    <section style={{ background: "linear-gradient(135deg, #f8fafc 0%, #fff7ed 100%)", padding: "60px 0 80px" }}>
      <div className="tf-container">
        <div className="row justify-center">
          <div className="col-lg-9">

            <div className="heading-section text-center mb-48">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(240,130,45,0.1)", border: "1px solid rgba(240,130,45,0.3)", borderRadius: 20, padding: "5px 16px", marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: "#f0822d", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>📈 Investment Tool</span>
              </div>
              <h2 className="title">ROI & Capital Growth Estimator</h2>
              <p className="text-1">Project your 5–10 year property investment returns.</p>
            </div>

            <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(240,130,45,0.15)", overflow: "hidden" }}>
              <div style={{ background: "linear-gradient(90deg, #f0822d, #e56c1a)", padding: "18px 32px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>📈</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Enter Investment Details</span>
              </div>

              <div style={{ padding: "32px" }}>
                <div className="row g-3 mb-20">
                  {FIELDS.map(f => (
                    <div key={f.key} className="col-md-6">
                      <label className="text-1 fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>{f.label}</label>
                      <fieldset>
                        <input type="number" className="form-control" placeholder={f.placeholder} value={form[f.key]}
                          onChange={e => set(f.key, e.target.value)} style={{ height: 48 }} />
                      </fieldset>
                    </div>
                  ))}
                  <div className="col-md-6">
                    <label className="text-1 fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Country (optional)</label>
                    <fieldset>
                      <select className="form-control" value={form.country} onChange={e => set("country", e.target.value)} style={{ height: 48, background: "#fff" }}>
                        <option value="">Select country</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </fieldset>
                  </div>
                </div>

                <button onClick={calculate} disabled={loading} className="tf-btn bg-color-primary w-full"
                  style={{ height: 54, fontSize: 16, fontWeight: 700, borderRadius: 10, opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Estimating…" : "Estimate ROI"} <i className="icon-arrow-right2" />
                </button>

                {result && (
                  <div style={{ marginTop: 32 }}>
                    <div className="row g-3 mb-20">
                      {[
                        { label: `Value in ${form.years || 5} yrs`, value: `$${result.futureValue}`, icon: "🏠", color: "#16b286", bg: "#f0fdf4" },
                        { label: "Capital Gain",          value: `$${result.capitalGain}`,       icon: "📈", color: "#f0822d", bg: "#fff7ed" },
                        { label: "Total Rental Income",   value: `$${result.totalRentalIncome}`, icon: "💰", color: "#3b82f6", bg: "#eff6ff" },
                        { label: "Total Return",          value: `$${result.totalReturn}`,       icon: "💎", color: "#8b5cf6", bg: "#f5f3ff" },
                        { label: "Total ROI",             value: `${result.totalRoi}%`,          icon: "📊", color: "#ef4444", bg: "#fef2f2" },
                        { label: "Annualised ROI",        value: `${result.annualisedRoi}%`,     icon: "⚡", color: "#f59e0b", bg: "#fffbeb" },
                      ].map(card => (
                        <div key={card.label} className="col-4">
                          <div style={{ background: card.bg, borderRadius: 12, padding: "16px", border: `1.5px solid ${card.color}22` }}>
                            <div style={{ fontSize: 20, marginBottom: 6 }}>{card.icon}</div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: card.color, marginBottom: 3 }}>{card.value}</div>
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
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
