"use client";
import { useState } from "react";

const COUNTRY_COSTS = {
  UAE:         { stampDuty: 4,   agentFee: 2,   legalFee: 0.5, registration: 0.25, label: "DLD Transfer Fee 4% + Registration" },
  Portugal:    { stampDuty: 6.5, agentFee: 3,   legalFee: 1,   registration: 0.8,  label: "IMT up to 6.5% + Stamp Duty 0.8%" },
  USA:         { stampDuty: 1.5, agentFee: 2.5, legalFee: 0.5, registration: 0.25, label: "Transfer tax varies by state" },
  Australia:   { stampDuty: 5,   agentFee: 2,   legalFee: 0.5, registration: 0.2,  label: "Stamp duty varies by state" },
  Turkey:      { stampDuty: 4,   agentFee: 2,   legalFee: 0.5, registration: 0.15, label: "Title deed fee 4%" },
  Cyprus:      { stampDuty: 3.5, agentFee: 3,   legalFee: 1,   registration: 0.5,  label: "Transfer fee up to 8% (50% discount)" },
  Malta:       { stampDuty: 5,   agentFee: 3.5, legalFee: 1,   registration: 0.1,  label: "Duty on documents 5%" },
  Canada:      { stampDuty: 2,   agentFee: 2.5, legalFee: 0.5, registration: 0.2,  label: "Land transfer tax varies by province" },
  Hungary:     { stampDuty: 4,   agentFee: 3,   legalFee: 0.5, registration: 0.1,  label: "Property transfer tax 4%" },
  Latvia:      { stampDuty: 2,   agentFee: 3,   legalFee: 0.5, registration: 0.5,  label: "Stamp duty 2%" },
  Philippines: { stampDuty: 1.5, agentFee: 5,   legalFee: 0.5, registration: 0.25, label: "DST 1.5% + Capital gains 6%" },
  Malaysia:    { stampDuty: 3,   agentFee: 3,   legalFee: 0.5, registration: 0.1,  label: "Stamp duty up to 3%" },
};

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

export default function CostOfBuying() {
  const [price, setPrice] = useState("300000");
  const [country, setCountry] = useState("UAE");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const P = parseFloat(price);
    if (!P) return;
    const c = COUNTRY_COSTS[country];
    const stamp = (P * c.stampDuty) / 100;
    const agent = (P * c.agentFee) / 100;
    const legal = (P * c.legalFee) / 100;
    const reg = (P * c.registration) / 100;
    const total = stamp + agent + legal + reg;
    setResult({ stamp, agent, legal, reg, total, totalCost: P + total, label: c.label,
      stampPct: c.stampDuty, agentPct: c.agentFee, legalPct: c.legalFee, regPct: c.registration });
  };

  const fmt = n => n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <section className="section-calculate flat-spacing-1" style={{ marginTop: 0 }}>
      <div className="tf-container">
        <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 60px rgba(0,0,0,0.12)", overflow: "hidden" }}>

          <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "40px 40px 36px" }}>
            <div>
              <span style={{ display: "inline-block", background: "rgba(240,130,45,0.2)", color: "#f0822d", fontSize: 12, fontWeight: 700, borderRadius: 20, padding: "4px 14px", marginBottom: 14, fontFamily: "inherit", letterSpacing: 0.5 }}>
                💰 COST OF BUYING CALCULATOR
              </span>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 8, fontFamily: "inherit" }}>Cost of Buying Calculator</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontFamily: "inherit", margin: 0 }}>See all purchase taxes and fees for your target country before you commit.</p>
            </div>
          </div>

          <form className="form-pre-approved" onSubmit={e => { e.preventDefault(); calculate(); }} style={{ padding: "32px 40px" }}>
            <div className="row g-3" style={{ marginBottom: 24 }}>
              <div className="col-md-6">
                <Field label="Property Price" icon="🏠" hint="Total purchase price in USD">
                  <fieldset style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, fontWeight: 700, color: "#6b7280", fontFamily: "inherit", zIndex: 1 }}>$</span>
                    <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)} placeholder="300,000" style={{ ...inputStyle, paddingLeft: 28 }} />
                  </fieldset>
                </Field>
              </div>
              <div className="col-md-6">
                <Field label="Country" icon="🌍" hint="Select your target investment market">
                  <fieldset>
                    <select className="form-control" value={country} onChange={e => setCountry(e.target.value)} style={{ ...inputStyle }}>
                      {Object.keys(COUNTRY_COSTS).map(c => <option key={c} value={c}>{c}</option>)}
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
              <span>Calculate Total Cost</span> <span style={{ fontSize: 18 }}>→</span>
            </button>

            {result && (
              <div style={{ marginTop: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#fff7ed,#fed7aa33)", border: "1px solid #fed7aa", borderRadius: 12, padding: "12px 18px", marginBottom: 20, fontSize: 13, color: "#92400e", fontFamily: "inherit" }}>
                  <span>ℹ️</span> {result.label}
                </div>

                <div className="row g-3 mb-16">
                  {[
                    { label: "Stamp / Transfer Duty", pct: result.stampPct, value: result.stamp, icon: "📋", color: "#ef4444", bg: "linear-gradient(135deg,#fef2f2,#fecaca33)" },
                    { label: "Agent Fee",             pct: result.agentPct, value: result.agent, icon: "🤝", color: "#f59e0b", bg: "linear-gradient(135deg,#fffbeb,#fde68a33)" },
                    { label: "Legal / Notary Fee",    pct: result.legalPct, value: result.legal, icon: "⚖️", color: "#3b82f6", bg: "linear-gradient(135deg,#eff6ff,#bfdbfe33)" },
                    { label: "Land Registration",     pct: result.regPct,   value: result.reg,   icon: "📁", color: "#8b5cf6", bg: "linear-gradient(135deg,#f5f3ff,#ddd6fe33)" },
                  ].map(row => (
                    <div key={row.label} className="col-6">
                      <div style={{ background: row.bg, borderRadius: 14, padding: "18px", border: `1.5px solid ${row.color}25` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                          <span style={{ fontSize: 22 }}>{row.icon}</span>
                          <span style={{ fontSize: 11, fontWeight: 700, color: row.color, background: `${row.color}15`, borderRadius: 10, padding: "2px 8px", fontFamily: "inherit" }}>{row.pct}%</span>
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: row.color, marginBottom: 4, fontFamily: "inherit" }}>${fmt(row.value)}</div>
                        <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.4 }}>{row.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: 16, padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: "inherit" }}>Total Extra Costs</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: "#f0822d", fontFamily: "inherit" }}>${fmt(result.total)}</div>
                  </div>
                  <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.15)" }} />
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: "inherit" }}>True Total Purchase Cost</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", fontFamily: "inherit" }}>${fmt(result.totalCost)}</div>
                  </div>
                </div>
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
