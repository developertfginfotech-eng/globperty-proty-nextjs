"use client";
import { useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;
const COUNTRIES = ["UAE","USA","Portugal","Australia","Turkey","Cyprus","Malta","Canada","Hungary","Latvia","Philippines","Malaysia"];
const TYPES = ["Apartment","Villa","House","Penthouse","Commercial","Land"];

export default function RentalYieldCalculator() {
  const [form, setForm] = useState({ propertyValue: "", monthlyRent: "", country: "", type: "Apartment" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = async () => {
    if (!form.propertyValue || !form.monthlyRent) { setError("Please fill property value and monthly rent."); return; }
    setError(""); setLoading(true); setResult(null);

    const annualRent = parseFloat(form.monthlyRent) * 12;
    const value = parseFloat(form.propertyValue);
    const grossYield = ((annualRent / value) * 100).toFixed(2);
    const netYield = (((annualRent * 0.85) / value) * 100).toFixed(2);
    const monthsToBreakEven = (value / parseFloat(form.monthlyRent)).toFixed(0);

    let marketYield = null;
    try {
      const res = await axios.get(`${API}/market-intelligence/investment-hotspots`, { params: { country: form.country }, timeout: 5000 });
      const hotspots = res.data?.data || res.data?.hotspots || [];
      if (hotspots.length > 0) marketYield = hotspots[0]?.rentalYield || hotspots[0]?.avgYield || null;
    } catch {}

    setResult({ grossYield, netYield, annualRent: annualRent.toLocaleString(), monthsToBreakEven, marketYield });
    setLoading(false);
  };

  return (
    <section style={{ background: "linear-gradient(135deg, #f8fafc 0%, #fff7ed 100%)", padding: "60px 0 80px" }}>
      <div className="tf-container">
        <div className="row justify-center">
          <div className="col-lg-9">

            <div className="heading-section text-center mb-48">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(240,130,45,0.1)", border: "1px solid rgba(240,130,45,0.3)", borderRadius: 20, padding: "5px 16px", marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: "#f0822d", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>📊 Investment Tool</span>
              </div>
              <h2 className="title">Rental Yield Calculator</h2>
              <p className="text-1">Calculate your gross and net annual return across 12 global markets.</p>
            </div>

            <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(240,130,45,0.15)", overflow: "hidden" }}>
              <div style={{ background: "linear-gradient(90deg, #f0822d, #e56c1a)", padding: "18px 32px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>📊</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Enter Property Details</span>
              </div>

              <div style={{ padding: "32px" }}>
                <div className="row g-3 mb-20">
                  <div className="col-md-6">
                    <label className="text-1 fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Property Value ($)</label>
                    <fieldset>
                      <input type="number" className="form-control" placeholder="e.g. 500000" value={form.propertyValue} onChange={e => set("propertyValue", e.target.value)} style={{ height: 48 }} />
                    </fieldset>
                  </div>
                  <div className="col-md-6">
                    <label className="text-1 fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Monthly Rent ($)</label>
                    <fieldset>
                      <input type="number" className="form-control" placeholder="e.g. 2500" value={form.monthlyRent} onChange={e => set("monthlyRent", e.target.value)} style={{ height: 48 }} />
                    </fieldset>
                  </div>
                  <div className="col-md-6">
                    <label className="text-1 fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Country (optional)</label>
                    <fieldset>
                      <select className="form-control" value={form.country} onChange={e => set("country", e.target.value)} style={{ height: 48, background: "#fff" }}>
                        <option value="">Select country</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </fieldset>
                  </div>
                  <div className="col-md-6">
                    <label className="text-1 fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Property Type</label>
                    <fieldset>
                      <select className="form-control" value={form.type} onChange={e => set("type", e.target.value)} style={{ height: 48, background: "#fff" }}>
                        {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </fieldset>
                  </div>
                </div>

                {error && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 16 }}>{error}</p>}

                <button onClick={calculate} disabled={loading} className="tf-btn bg-color-primary w-full" style={{ height: 54, fontSize: 16, fontWeight: 700, borderRadius: 10, opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Calculating…" : "Calculate Yield"} <i className="icon-arrow-right2" />
                </button>

                {result && (
                  <div style={{ marginTop: 32 }}>
                    <div className="row g-3 mb-20">
                      {[
                        { label: "Gross Yield",          value: `${result.grossYield}%`,    icon: "📈", color: "#16b286", bg: "#f0fdf4" },
                        { label: "Net Yield (est.)",     value: `${result.netYield}%`,      icon: "💰", color: "#f0822d", bg: "#fff7ed" },
                        { label: "Annual Rental Income", value: `$${result.annualRent}`,    icon: "🏠", color: "#3b82f6", bg: "#eff6ff" },
                        { label: "Break-even (months)",  value: result.monthsToBreakEven,   icon: "⏱", color: "#8b5cf6", bg: "#f5f3ff" },
                      ].map(card => (
                        <div key={card.label} className="col-6">
                          <div style={{ background: card.bg, borderRadius: 12, padding: "18px 20px", border: `1.5px solid ${card.color}22` }}>
                            <div style={{ fontSize: 20, marginBottom: 6 }}>{card.icon}</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: card.color, marginBottom: 3 }}>{card.value}</div>
                            <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>{card.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {result.marketYield && (
                      <div style={{ background: "#f0fdf4", borderRadius: 12, padding: "16px 20px", border: "1.5px solid #16b28622", display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 24 }}>📍</span>
                        <div>
                          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 2 }}>Market Average Yield — {form.country}</div>
                          <div style={{ fontSize: 20, fontWeight: 800, color: "#16b286" }}>{result.marketYield}%</div>
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
