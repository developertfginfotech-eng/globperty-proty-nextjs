"use client";
import { useState } from "react";
import Image from "next/image";

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
    <section className="section-calculate flat-spacing-1">
      <div className="tf-container">
        <div className="box-calculate" style={{ background: "#fff", boxShadow: "0 8px 60px rgba(0,0,0,0.15)" }}>

          <div style={{ position: "relative", overflow: "hidden", maxHeight: 320 }}>
            <Image
              src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=320&fit=crop"
              alt="Property currency converter"
              width={1200}
              height={320}
              style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }}
            />
          </div>

          <form className="form-pre-approved" onSubmit={e => e.preventDefault()}>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 6 }}>Property Currency Converter</h3>
              <p className="text-1" style={{ color: "#6b7280" }}>Instantly convert property prices across 17 investment currencies with indicative rates.</p>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>Amount</label>
              <fieldset>
                <input
                  type="number"
                  className="form-control"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  style={{ height: 52, fontSize: 20, fontWeight: 700 }}
                />
              </fieldset>
            </div>

            <div className="row g-3" style={{ alignItems: "center", marginBottom: 28 }}>
              <div className="col-5">
                <label className="fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>From</label>
                <fieldset>
                  <select className="form-control" value={from} onChange={e => setFrom(e.target.value)} style={{ height: 48, background: "#fff" }}>
                    {currencies.map(c => <option key={c} value={c}>{c} — {CURRENCY_NAMES[c]}</option>)}
                  </select>
                </fieldset>
              </div>
              <div className="col-2 text-center" style={{ paddingTop: 28 }}>
                <button
                  type="button"
                  onClick={() => { const tmp = from; setFrom(to); setTo(tmp); }}
                  className="tf-btn bg-color-primary"
                  style={{ width: 44, height: 44, borderRadius: "50%", padding: 0, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}
                >⇄</button>
              </div>
              <div className="col-5">
                <label className="fw-6" style={{ display: "block", marginBottom: 8, color: "#374151" }}>To</label>
                <fieldset>
                  <select className="form-control" value={to} onChange={e => setTo(e.target.value)} style={{ height: 48, background: "#fff" }}>
                    {currencies.map(c => <option key={c} value={c}>{c} — {CURRENCY_NAMES[c]}</option>)}
                  </select>
                </fieldset>
              </div>
            </div>

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

            <div>
              <div className="fw-6" style={{ color: "#374151", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 12 }}>
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
          </form>

        </div>
      </div>
    </section>
  );
}
