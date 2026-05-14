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
    <section style={{ background: "linear-gradient(135deg, #f8fafc 0%, #fff7ed 100%)", padding: "60px 0 80px" }}>
      <div className="tf-container">
        <div className="row justify-center">
          <div className="col-lg-8">

            <div className="heading-section text-center mb-48">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(240,130,45,0.1)", border: "1px solid rgba(240,130,45,0.3)", borderRadius: 20, padding: "5px 16px", marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: "#f0822d", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>💱 Finance Tool</span>
              </div>
              <h2 className="title">Currency Converter</h2>
              <p className="text-1">Live exchange rates for 17 property investment currencies.</p>
            </div>

            <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(240,130,45,0.15)", overflow: "hidden" }}>
              <div style={{ background: "linear-gradient(90deg, #f0822d, #e56c1a)", padding: "18px 32px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>💱</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Convert Property Price</span>
              </div>

              <div style={{ padding: "32px" }}>
                <label className="text-1 fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Amount</label>
                <fieldset style={{ marginBottom: 24 }}>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    style={{ height: 52, fontSize: 20, fontWeight: 700 }}
                  />
                </fieldset>

                <div className="row g-3 mb-28" style={{ alignItems: "center" }}>
                  <div className="col-5">
                    <label className="text-1 fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>From</label>
                    <fieldset>
                      <select className="form-control" value={from} onChange={e => setFrom(e.target.value)} style={{ height: 48, background: "#fff" }}>
                        {currencies.map(c => <option key={c} value={c}>{c} — {CURRENCY_NAMES[c]}</option>)}
                      </select>
                    </fieldset>
                  </div>
                  <div className="col-2 text-center" style={{ paddingTop: 28 }}>
                    <button
                      onClick={() => { const tmp = from; setFrom(to); setTo(tmp); }}
                      className="tf-btn bg-color-primary"
                      style={{ width: 44, height: 44, borderRadius: "50%", padding: 0, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}
                    >⇄</button>
                  </div>
                  <div className="col-5">
                    <label className="text-1 fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>To</label>
                    <fieldset>
                      <select className="form-control" value={to} onChange={e => setTo(e.target.value)} style={{ height: 48, background: "#fff" }}>
                        {currencies.map(c => <option key={c} value={c}>{c} — {CURRENCY_NAMES[c]}</option>)}
                      </select>
                    </fieldset>
                  </div>
                </div>

                {/* Result */}
                <div style={{ background: "linear-gradient(135deg, #f0822d 0%, #e56c1a 100%)", borderRadius: 14, padding: "28px 32px", textAlign: "center", marginBottom: 24 }}>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 8, fontWeight: 500 }}>
                    {parseFloat(amount || 0).toLocaleString()} {from} =
                  </div>
                  <div style={{ fontSize: 40, fontWeight: 900, color: "#fff", letterSpacing: -1 }}>
                    {convert(amount || 0, from, to)} <span style={{ fontSize: 22, fontWeight: 600 }}>{to}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 10 }}>
                    1 {from} = {convert(1, from, to)} {to} &nbsp;·&nbsp; 1 {to} = {convert(1, to, from)} {from}
                  </div>
                </div>

                {/* Quick grid */}
                <div>
                  <div className="text-1 fw-6 mb-12" style={{ color: "#374151", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.8 }}>
                    Quick Conversions — {amount || 0} {from}
                  </div>
                  <div className="row g-2">
                    {["USD","EUR","GBP","AED","AUD","INR"].filter(c => c !== from).slice(0, 6).map(c => (
                      <div key={c} className="col-4">
                        <div style={{ background: "#f8fafc", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "12px 14px" }}>
                          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, marginBottom: 3 }}>{c}</div>
                          <div style={{ fontSize: 15, fontWeight: 800, color: "#111827" }}>{convert(amount || 0, from, c)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 20, textAlign: "center" }}>
                  Rates are indicative. For live rates, consult your bank or broker.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
