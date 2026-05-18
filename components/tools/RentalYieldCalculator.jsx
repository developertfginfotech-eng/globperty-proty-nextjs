"use client";
import { useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;
const COUNTRIES = ["UAE","USA","Portugal","Australia","Turkey","Cyprus","Malta","Canada","Hungary","Latvia","Philippines","Malaysia"];
const TYPES = ["Apartment","Villa","House","Penthouse","Commercial","Land"];

const Field = ({ label, icon, children, hint }) => (
  <div>
    <label style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 13, fontWeight: 700, color: "#374151", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.5 }}>
      <span style={{ fontSize: 15 }}>{icon}</span> {label}
    </label>
    {children}
    {hint && <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 5, fontFamily: "inherit" }}>{hint}</p>}
  </div>
);

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

  const inputStyle = {
    height: 50,
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 500,
    color: "#111827",
    background: "#f9fafb",
    border: "1.5px solid #e5e7eb",
    borderRadius: 10,
    paddingLeft: 16,
    width: "100%",
    outline: "none",
  };

  return (
    <section className="section-calculate flat-spacing-1" style={{ marginTop: 0 }}>
      <div className="tf-container">
        <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 60px rgba(0,0,0,0.12)", overflow: "hidden" }}>

          {/* Card header */}
          <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "40px 40px 36px" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "inline-block", background: "rgba(240,130,45,0.2)", color: "#f0822d", fontSize: 12, fontWeight: 700, borderRadius: 20, padding: "4px 14px", marginBottom: 14, fontFamily: "inherit", letterSpacing: 0.5 }}>
                📊 RENTAL YIELD CALCULATOR
              </span>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 8, fontFamily: "inherit" }}>Calculate Rental Yield</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontFamily: "inherit", margin: 0 }}>Discover your gross and net annual return across 12 global markets.</p>
            </div>
          </div>

          {/* Form body */}
          <form className="form-pre-approved" onSubmit={e => { e.preventDefault(); calculate(); }} style={{ padding: "32px 40px" }}>

            <div className="row g-3" style={{ marginBottom: 24 }}>
              <div className="col-md-6">
                <Field label="Property Value" icon="🏠" hint="Enter the purchase price in USD">
                  <fieldset style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, fontWeight: 700, color: "#6b7280", fontFamily: "inherit", zIndex: 1 }}>$</span>
                    <input type="number" className="form-control" placeholder="500,000" value={form.propertyValue} onChange={e => set("propertyValue", e.target.value)}
                      style={{ ...inputStyle, paddingLeft: 28 }} />
                  </fieldset>
                </Field>
              </div>
              <div className="col-md-6">
                <Field label="Monthly Rent" icon="💰" hint="Expected monthly rental income">
                  <fieldset style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, fontWeight: 700, color: "#6b7280", fontFamily: "inherit", zIndex: 1 }}>$</span>
                    <input type="number" className="form-control" placeholder="2,500" value={form.monthlyRent} onChange={e => set("monthlyRent", e.target.value)}
                      style={{ ...inputStyle, paddingLeft: 28 }} />
                  </fieldset>
                </Field>
              </div>
              <div className="col-md-6">
                <Field label="Country" icon="🌍" hint="Optional — for market comparison">
                  <fieldset>
                    <select className="form-control" value={form.country} onChange={e => set("country", e.target.value)} style={{ ...inputStyle }}>
                      <option value="">Select country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </fieldset>
                </Field>
              </div>
              <div className="col-md-6">
                <Field label="Property Type" icon="🏢">
                  <fieldset>
                    <select className="form-control" value={form.type} onChange={e => set("type", e.target.value)} style={{ ...inputStyle }}>
                      {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </fieldset>
                </Field>
              </div>
            </div>

            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#dc2626", fontFamily: "inherit" }}>
                ⚠️ {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width: "100%", height: 54, fontSize: 16, fontWeight: 700, borderRadius: 12, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
              background: loading ? "#f4a261" : "linear-gradient(135deg, #f0822d 0%, #e56c1a 100%)",
              color: "#fff", boxShadow: "0 4px 20px rgba(240,130,45,0.4)", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}>
              {loading ? "Calculating…" : <><span>Calculate Yield</span> <span style={{ fontSize: 18 }}>→</span></>}
            </button>

            {result && (
              <div style={{ marginTop: 32 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14, fontFamily: "inherit" }}>Your Results</div>
                <div className="row g-3 mb-20">
                  {[
                    { label: "Gross Yield",          value: `${result.grossYield}%`,  icon: "📈", color: "#16b286", bg: "linear-gradient(135deg,#f0fdf4,#dcfce7)" },
                    { label: "Net Yield (est.)",     value: `${result.netYield}%`,    icon: "💰", color: "#f0822d", bg: "linear-gradient(135deg,#fff7ed,#fed7aa33)" },
                    { label: "Annual Rental Income", value: `$${result.annualRent}`,  icon: "🏠", color: "#3b82f6", bg: "linear-gradient(135deg,#eff6ff,#bfdbfe33)" },
                    { label: "Break-even (months)",  value: result.monthsToBreakEven, icon: "⏱", color: "#8b5cf6", bg: "linear-gradient(135deg,#f5f3ff,#ddd6fe33)" },
                  ].map(card => (
                    <div key={card.label} className="col-6">
                      <div style={{ background: card.bg, borderRadius: 14, padding: "20px", border: `1.5px solid ${card.color}25`, textAlign: "center" }}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
                        <div style={{ fontSize: 26, fontWeight: 900, color: card.color, marginBottom: 4, fontFamily: "inherit" }}>{card.value}</div>
                        <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.5 }}>{card.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {result.marketYield && (
                  <div style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", borderRadius: 12, padding: "16px 20px", border: "1.5px solid #16b28630", display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 28 }}>📍</span>
                    <div>
                      <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2, fontFamily: "inherit", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>Market Average — {form.country}</div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: "#16b286", fontFamily: "inherit" }}>{result.marketYield}%</div>
                    </div>
                  </div>
                )}

                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 20, textAlign: "center", fontFamily: "inherit" }}>
                  Net yield estimated at 85% of gross. Actual returns may vary by market conditions.
                </p>
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
