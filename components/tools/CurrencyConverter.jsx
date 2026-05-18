"use client";
import { useState } from "react";

const RATES = {
  USD: 1, EUR: 0.92, GBP: 0.79, AED: 3.67, AUD: 1.53, CAD: 1.36,
  TRY: 32.1, MYR: 4.72, PHP: 56.8, HUF: 358.0, LVL: 0.64, MTL: 0.43,
  INR: 83.5, SGD: 1.34, JPY: 149.5, CHF: 0.90, CYP: 0.58,
};
const CURRENCY_NAMES = {
  USD: "US Dollar", EUR: "Euro", GBP: "British Pound", AED: "UAE Dirham",
  AUD: "Australian Dollar", CAD: "Canadian Dollar", TRY: "Turkish Lira",
  MYR: "Malaysian Ringgit", PHP: "Philippine Peso", HUF: "Hungarian Forint",
  LVL: "Latvian Lats", MTL: "Maltese Lira", INR: "Indian Rupee",
  SGD: "Singapore Dollar", JPY: "Japanese Yen", CHF: "Swiss Franc", CYP: "Cypriot Pound",
};

const Field = ({ label, icon, children }) => (
  <div>
    <label style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 13, fontWeight: 700, color: "#374151", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.5 }}>
      <span style={{ fontSize: 15 }}>{icon}</span> {label}
    </label>
    {children}
  </div>
);

const inputStyle = {
  height: 50, fontFamily: "inherit", fontSize: 15, fontWeight: 500, color: "#111827",
  background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: 10, paddingLeft: 16, width: "100%",
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100000");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("AED");

  const convert = (amt, f, t) => {
    const v = (parseFloat(amt) / RATES[f]) * RATES[t];
    return v.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const currencies = Object.keys(RATES);

  return (
    <section className="section-calculate flat-spacing-1" style={{ marginTop: 0 }}>
      <div className="tf-container">
        <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 60px rgba(0,0,0,0.12)", overflow: "hidden" }}>

          <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "40px 40px 36px" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "inline-block", background: "rgba(240,130,45,0.2)", color: "#f0822d", fontSize: 12, fontWeight: 700, borderRadius: 20, padding: "4px 14px", marginBottom: 14, fontFamily: "inherit", letterSpacing: 0.5 }}>
                💱 PROPERTY CURRENCY CONVERTER
              </span>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 8, fontFamily: "inherit" }}>Property Currency Converter</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontFamily: "inherit", margin: 0 }}>Instantly convert property prices across 17 investment currencies with indicative rates.</p>
            </div>
          </div>

          <form className="form-pre-approved" onSubmit={e => e.preventDefault()} style={{ padding: "32px 40px" }}>

            <div style={{ marginBottom: 24 }}>
              <Field label="Amount" icon="💵">
                <fieldset>
                  <input type="number" className="form-control" value={amount} onChange={e => setAmount(e.target.value)}
                    style={{ ...inputStyle, height: 54, fontSize: 20, fontWeight: 700 }} />
                </fieldset>
              </Field>
            </div>

            <div className="row g-3" style={{ alignItems: "flex-end", marginBottom: 28 }}>
              <div className="col-5">
                <Field label="From" icon="🔵">
                  <fieldset>
                    <select className="form-control" value={from} onChange={e => setFrom(e.target.value)} style={{ ...inputStyle }}>
                      {currencies.map(c => <option key={c} value={c}>{c} — {CURRENCY_NAMES[c]}</option>)}
                    </select>
                  </fieldset>
                </Field>
              </div>
              <div className="col-2 text-center" style={{ paddingBottom: 2 }}>
                <button type="button" onClick={() => { const tmp = from; setFrom(to); setTo(tmp); }}
                  style={{ width: 44, height: 44, borderRadius: "50%", border: "none", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", background: "linear-gradient(135deg, #f0822d 0%, #e56c1a 100%)", color: "#fff", boxShadow: "0 4px 12px rgba(240,130,45,0.4)", fontFamily: "inherit" }}>
                  ⇄
                </button>
              </div>
              <div className="col-5">
                <Field label="To" icon="🟠">
                  <fieldset>
                    <select className="form-control" value={to} onChange={e => setTo(e.target.value)} style={{ ...inputStyle }}>
                      {currencies.map(c => <option key={c} value={c}>{c} — {CURRENCY_NAMES[c]}</option>)}
                    </select>
                  </fieldset>
                </Field>
              </div>
            </div>

            <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: 14, padding: "16px 24px", textAlign: "center", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, fontFamily: "inherit" }}>
                {parseFloat(amount || 0).toLocaleString()} {from} equals
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#f0822d", letterSpacing: -0.5, fontFamily: "inherit" }}>
                {convert(amount || 0, from, to)} <span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{to}</span>
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "inherit" }}>
                1 {from} = {convert(1, from, to)} {to} &nbsp;·&nbsp; 1 {to} = {convert(1, to, from)} {from}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12, fontFamily: "inherit" }}>
                Quick Conversions — {amount || 0} {from}
              </div>
              <div className="row g-2">
                {["USD","EUR","GBP","AED","AUD","INR"].filter(c => c !== from).slice(0, 5).map(c => (
                  <div key={c} className="col-4">
                    <div style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: 12, padding: "14px 16px" }}>
                      <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, marginBottom: 4, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 0.5 }}>{c}</div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: "#111827", fontFamily: "inherit" }}>{convert(amount || 0, from, c)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 20, textAlign: "center", fontFamily: "inherit" }}>
              Rates are indicative. For live rates, consult your bank or broker.
            </p>
          </form>

        </div>
      </div>
    </section>
  );
}
