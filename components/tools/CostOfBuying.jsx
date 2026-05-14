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
    <section className="section-calculate" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #fff7ed 100%)", padding: "60px 0 80px" }}>
      <div className="tf-container">
        <div className="row justify-center">
          <div className="col-lg-8">

            {/* Section header */}
            <div className="heading-section text-center mb-48">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(240,130,45,0.1)", border: "1px solid rgba(240,130,45,0.3)", borderRadius: 20, padding: "5px 16px", marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: "#f0822d", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>💰 Finance Tool</span>
              </div>
              <h2 className="title">Cost of Buying Calculator</h2>
              <p className="text-1">All purchase fees & taxes by country — know your true buying cost.</p>
            </div>

            {/* Calculator card */}
            <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(240,130,45,0.15)", overflow: "hidden" }}>

              {/* Card header strip */}
              <div style={{ background: "linear-gradient(90deg, #f0822d, #e56c1a)", padding: "18px 32px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>🏠</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Enter Property Details</span>
              </div>

              <div style={{ padding: "32px" }}>
                <div className="row g-3 mb-24">
                  <div className="col-md-6">
                    <label className="text-1 fw-6 mb-8" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Property Price ($)</label>
                    <fieldset>
                      <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="e.g. 300000"
                        style={{ height: 52, fontSize: 15, fontWeight: 600 }}
                      />
                    </fieldset>
                  </div>
                  <div className="col-md-6">
                    <label className="text-1 fw-6 mb-8" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Country</label>
                    <fieldset>
                      <select
                        className="form-control"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        style={{ height: 52, fontSize: 15, background: "#fff" }}
                      >
                        {Object.keys(COUNTRY_COSTS).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </fieldset>
                  </div>
                </div>

                <button
                  onClick={calculate}
                  className="tf-btn bg-color-primary w-full"
                  style={{ height: 54, fontSize: 16, fontWeight: 700, borderRadius: 10 }}
                >
                  Calculate Total Cost <i className="icon-search" />
                </button>

                {result && (
                  <div style={{ marginTop: 32 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "10px 16px", marginBottom: 20, fontSize: 13, color: "#92400e" }}>
                      <span>ℹ️</span> {result.label}
                    </div>

                    <div className="row g-3 mb-16">
                      {[
                        { label: `Stamp / Transfer Duty`, pct: result.stampPct, value: result.stamp, icon: "📋", color: "#ef4444", bg: "#fef2f2" },
                        { label: `Agent Fee`,             pct: result.agentPct, value: result.agent, icon: "🤝", color: "#f59e0b", bg: "#fffbeb" },
                        { label: `Legal / Notary Fee`,    pct: result.legalPct, value: result.legal, icon: "⚖️", color: "#3b82f6", bg: "#eff6ff" },
                        { label: `Land Registration`,     pct: result.regPct,   value: result.reg,   icon: "📁", color: "#8b5cf6", bg: "#f5f3ff" },
                      ].map(row => (
                        <div key={row.label} className="col-6">
                          <div style={{ background: row.bg, borderRadius: 12, padding: "16px", border: `1.5px solid ${row.color}22` }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                              <span style={{ fontSize: 18 }}>{row.icon}</span>
                              <span style={{ fontSize: 11, fontWeight: 700, color: row.color, background: `${row.color}15`, borderRadius: 10, padding: "2px 8px" }}>{row.pct}%</span>
                            </div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: row.color, marginBottom: 2 }}>${fmt(row.value)}</div>
                            <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>{row.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total strip */}
                    <div style={{ background: "linear-gradient(135deg, #f0822d 0%, #e56c1a 100%)", borderRadius: 14, padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 4, fontWeight: 500 }}>Total Extra Costs</div>
                        <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>${fmt(result.total)}</div>
                      </div>
                      <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.25)" }} />
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 4, fontWeight: 500 }}>True Total Purchase Cost</div>
                        <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>${fmt(result.totalCost)}</div>
                      </div>
                    </div>
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
