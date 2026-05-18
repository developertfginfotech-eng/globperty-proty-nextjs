"use client";
import { useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;
const COUNTRIES = ["UAE","USA","Portugal","Australia","Turkey","Cyprus","Malta","Canada","Hungary","Latvia","Philippines","Malaysia"];

const Field = ({ label, children, hint }) => (
  <div>
    <label style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 13, fontWeight: 700, color: "#374151", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.5 }}>
      {label}
    </label>
    {children}
    {hint && <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 5, fontFamily: "inherit" }}>{hint}</p>}
  </div>
);

const inputStyle = {
  height: 50, fontFamily: "inherit", fontSize: 15, fontWeight: 500, color: "#111827",
  background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: 10, paddingLeft: 16, width: "100%",
};

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
    <section className="section-calculate flat-spacing-1" style={{ marginTop: 0 }}>
      <div className="tf-container">
        <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 60px rgba(0,0,0,0.12)", overflow: "hidden" }}>

          <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "40px 40px 36px" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "inline-block", background: "rgba(240,130,45,0.2)", color: "#f0822d", fontSize: 12, fontWeight: 700, borderRadius: 20, padding: "4px 14px", marginBottom: 14, fontFamily: "inherit", letterSpacing: 0.5 }}>
                ROI & CAPITAL GROWTH ESTIMATOR
              </span>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 6, fontFamily: "inherit" }}>ROI & Capital Growth Estimator</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontFamily: "inherit", margin: 0 }}>Project your 5–10 year property investment returns with combined capital gain and rental income.</p>
            </div>
          </div>

          <form className="form-pre-approved" onSubmit={e => { e.preventDefault(); calculate(); }} style={{ padding: "32px 40px" }}>
            <div className="row g-3" style={{ marginBottom: 24 }}>
              <div className="col-md-6">
                <Field label="Purchase Price" hint="Total property acquisition cost">
                  <fieldset style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, fontWeight: 700, color: "#6b7280", fontFamily: "inherit", zIndex: 1 }}>$</span>
                    <input type="number" className="form-control" placeholder="400,000" value={form.purchasePrice} onChange={e => set("purchasePrice", e.target.value)}
                      style={{ ...inputStyle, paddingLeft: 28 }} />
                  </fieldset>
                </Field>
              </div>
              <div className="col-md-6">
                <Field label="Annual Rental Income" hint="Expected yearly rent received">
                  <fieldset style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, fontWeight: 700, color: "#6b7280", fontFamily: "inherit", zIndex: 1 }}>$</span>
                    <input type="number" className="form-control" placeholder="24,000" value={form.annualRent} onChange={e => set("annualRent", e.target.value)}
                      style={{ ...inputStyle, paddingLeft: 28 }} />
                  </fieldset>
                </Field>
              </div>
              <div className="col-md-6">
                <Field label="Annual Growth %" hint="Expected yearly price appreciation">
                  <fieldset style={{ position: "relative" }}>
                    <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, fontWeight: 700, color: "#6b7280", fontFamily: "inherit", zIndex: 1 }}>%</span>
                    <input type="number" className="form-control" placeholder="5" value={form.annualGrowth} onChange={e => set("annualGrowth", e.target.value)}
                      style={{ ...inputStyle, paddingRight: 30 }} />
                  </fieldset>
                </Field>
              </div>
              <div className="col-md-6">
                <Field label="Investment Period">
                  <fieldset>
                    <select className="form-control" value={form.years} onChange={e => set("years", e.target.value)} style={{ ...inputStyle }}>
                      {[3,5,7,10].map(y => <option key={y} value={y}>{y} years</option>)}
                    </select>
                  </fieldset>
                </Field>
              </div>
              <div className="col-md-6">
                <Field label="Country" hint="Optional — for market context">
                  <fieldset>
                    <select className="form-control" value={form.country} onChange={e => set("country", e.target.value)} style={{ ...inputStyle }}>
                      <option value="">Select country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </fieldset>
                </Field>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", height: 54, fontSize: 16, fontWeight: 700, borderRadius: 12, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
              background: loading ? "#f4a261" : "linear-gradient(135deg, #f0822d 0%, #e56c1a 100%)",
              color: "#fff", boxShadow: "0 4px 20px rgba(240,130,45,0.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}>
              {loading ? "Estimating…" : <><span>Estimate ROI</span> <span style={{ fontSize: 18 }}>→</span></>}
            </button>

            {result && (
              <div style={{ marginTop: 32 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14, fontFamily: "inherit" }}>Your Projection</div>
                <div className="row g-3 mb-20">
                  {[
                    { label: `Value in ${form.years}yrs`, value: `$${result.futureValue}`,       color: "#16b286", bg: "linear-gradient(135deg,#f0fdf4,#dcfce7)" },
                    { label: "Capital Gain",               value: `$${result.capitalGain}`,       color: "#f0822d", bg: "linear-gradient(135deg,#fff7ed,#fed7aa33)" },
                    { label: "Total Rental Income",        value: `$${result.totalRentalIncome}`, color: "#3b82f6", bg: "linear-gradient(135deg,#eff6ff,#bfdbfe33)" },
                    { label: "Total Return",               value: `$${result.totalReturn}`,       color: "#8b5cf6", bg: "linear-gradient(135deg,#f5f3ff,#ddd6fe33)" },
                    { label: "Total ROI",                  value: `${result.totalRoi}%`,          color: "#ef4444", bg: "linear-gradient(135deg,#fef2f2,#fecaca33)" },
                    { label: "Annualised ROI",             value: `${result.annualisedRoi}%`,     color: "#f59e0b", bg: "linear-gradient(135deg,#fffbeb,#fde68a33)" },
                  ].map(card => (
                    <div key={card.label} className="col-4">
                      <div style={{ background: card.bg, borderRadius: 14, padding: "16px", border: `1.5px solid ${card.color}25`, textAlign: "center" }}>
                        <div style={{ fontSize: 16, fontWeight: 900, color: card.color, marginBottom: 3, fontFamily: "inherit" }}>{card.value}</div>
                        <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.4 }}>{card.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {hotspots && hotspots.length > 0 && (
                  <div style={{ background: "linear-gradient(135deg,#fff7ed,#fed7aa33)", borderRadius: 12, padding: "20px 24px", border: "1px solid #fed7aa" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 12, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.5 }}>Top Investment Markets</div>
                    <div className="row g-2">
                      {hotspots.map((h, i) => (
                        <div key={i} className="col-4">
                          <div style={{ background: "#fff", borderRadius: 10, padding: "10px 14px", border: "1px solid #fed7aa" }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", fontFamily: "inherit" }}>{h.city || h.location || `Market ${i+1}`}</div>
                            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, fontFamily: "inherit" }}>Score: {h.investmentScore || h.score || "—"}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 20, textAlign: "center", fontFamily: "inherit" }}>
                  Projections are estimates. Past market performance does not guarantee future results.
                </p>
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
