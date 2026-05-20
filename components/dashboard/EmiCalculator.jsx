"use client";
import React, { useState, useEffect } from "react";

const COUNTRIES = [
  { name: "UAE",         currency: "AED", symbol: "د.إ", flag: "🇦🇪", rate: 4.5,  stampDuty: 4.0, registration: 0.5 },
  { name: "USA",         currency: "USD", symbol: "$",   flag: "🇺🇸", rate: 7.5,  stampDuty: 1.0, registration: 0.5 },
  { name: "Portugal",    currency: "EUR", symbol: "€",   flag: "🇵🇹", rate: 4.0,  stampDuty: 0.8, registration: 0.3 },
  { name: "Canada",      currency: "CAD", symbol: "C$",  flag: "🇨🇦", rate: 6.5,  stampDuty: 1.5, registration: 0.5 },
  { name: "Australia",   currency: "AUD", symbol: "A$",  flag: "🇦🇺", rate: 6.0,  stampDuty: 4.0, registration: 0.5 },
  { name: "Turkey",      currency: "TRY", symbol: "₺",   flag: "🇹🇷", rate: 25.0, stampDuty: 4.0, registration: 0.5 },
  { name: "Cyprus",      currency: "EUR", symbol: "€",   flag: "🇨🇾", rate: 4.5,  stampDuty: 3.0, registration: 0.5 },
  { name: "Malta",       currency: "EUR", symbol: "€",   flag: "🇲🇹", rate: 4.0,  stampDuty: 5.0, registration: 1.0 },
  { name: "Hungary",     currency: "HUF", symbol: "Ft",  flag: "🇭🇺", rate: 8.0,  stampDuty: 4.0, registration: 0.5 },
  { name: "Latvia",      currency: "EUR", symbol: "€",   flag: "🇱🇻", rate: 5.0,  stampDuty: 2.0, registration: 0.5 },
  { name: "Philippines", currency: "PHP", symbol: "₱",   flag: "🇵🇭", rate: 8.0,  stampDuty: 1.5, registration: 0.5 },
  { name: "Malaysia",    currency: "MYR", symbol: "RM",  flag: "🇲🇾", rate: 4.5,  stampDuty: 1.0, registration: 0.5 },
];

// Approximate static rates vs USD (fallback when API fails)
const STATIC_RATES_USD = {
  USD: 1, AED: 3.674, EUR: 0.92, CAD: 1.37, AUD: 1.54,
  TRY: 33.0, HUF: 365, PHP: 57.0, MYR: 4.72,
  GBP: 0.79, INR: 84.0, SAR: 3.75, SGD: 1.35, JPY: 157,
};

function convertStatic(amount, from, to) {
  const fromRate = STATIC_RATES_USD[from] || 1;
  const toRate = STATIC_RATES_USD[to] || 1;
  return (amount / fromRate) * toRate;
}

const ALL_CURRENCIES = [...new Set([
  "AED","USD","EUR","CAD","AUD","TRY","HUF","PHP","MYR","GBP","INR","SAR","SGD","JPY"
])];

const CURRENCY_NAMES = {
  AED:"UAE Dirham", USD:"US Dollar", EUR:"Euro", CAD:"Canadian Dollar",
  AUD:"Australian Dollar", TRY:"Turkish Lira", HUF:"Hungarian Forint",
  PHP:"Philippine Peso", MYR:"Malaysian Ringgit", GBP:"British Pound",
  INR:"Indian Rupee", SAR:"Saudi Riyal", SGD:"Singapore Dollar", JPY:"Japanese Yen",
};

const inputStyle = {
  width:"100%", padding:"9px 14px", border:"1px solid #e0e3e8",
  borderRadius:8, fontSize:13, color:"#1a2332", outline:"none",
  background:"#fff", boxSizing:"border-box", fontFamily:"inherit",
};
const labelStyle = { fontSize:12, fontWeight:600, color:"#555", display:"block", marginBottom:4 };

function fmt(n, sym) {
  const s = Number(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  return sym ? `${sym} ${s}` : s;
}

export default function EmiCalculator() {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [price, setPrice] = useState(500000);
  const [downPct, setDownPct] = useState(20);
  const [tenure, setTenure] = useState(20);
  const [rate, setRate] = useState(COUNTRIES[0].rate);
  const [exchangeRate, setExchangeRate] = useState(STATIC_RATES_USD.AED); // price is in USD, show in local

  const [emi, setEmi] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [stampDuty, setStampDuty] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [downAmount, setDownAmount] = useState(0);

  // Currency converter
  const [ccAmount, setCcAmount] = useState("");
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("AED");
  const [converted, setConverted] = useState(null);
  const [ccLoading, setCcLoading] = useState(false);
  const [ccError, setCcError] = useState("");
  const [rateSource, setRateSource] = useState("");

  // When country changes, update currency, rate, and fetch exchange rate
  const handleCountryChange = (e) => {
    const c = COUNTRIES.find((x) => x.name === e.target.value) || COUNTRIES[0];
    setCountry(c);
    setRate(c.rate);
    // Fetch exchange rate USD → local currency
    fetchExchangeRate("USD", c.currency);
    setToCur(c.currency);
  };

  // On mount fetch USD → AED
  useEffect(() => { fetchExchangeRate("USD", "AED"); }, []);

  const fetchExchangeRate = async (from, to) => {
    if (from === to) { setExchangeRate(1); return; }
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
      if (res.ok) {
        const data = await res.json();
        const r = data?.rates?.[to];
        if (r) { setExchangeRate(r); return; }
      }
    } catch {}
    // Fallback
    setExchangeRate(convertStatic(1, from, to));
  };

  useEffect(() => {
    const p = parseFloat(price) || 0;
    const dp = parseFloat(downPct) || 0;
    const r = (parseFloat(rate) || 0) / 12 / 100;
    const n = parseInt(tenure) * 12;
    const down = p * (dp / 100);
    const loan = p * (1 - dp / 100);
    const sd = p * (country.stampDuty / 100);
    const reg = p * (country.registration / 100);
    const tc = p + sd + reg;
    let monthlyEmi = 0;
    if (r > 0 && n > 0 && loan > 0) {
      const pow = Math.pow(1 + r, n);
      monthlyEmi = (loan * r * pow) / (pow - 1);
    } else if (r === 0 && n > 0 && loan > 0) {
      monthlyEmi = loan / n;
    }
    const tp = monthlyEmi * n;
    const ti = Math.max(0, tp - loan);
    setDownAmount(down);
    setLoanAmount(loan);
    setEmi(monthlyEmi);
    setTotalInterest(ti);
    setStampDuty(sd);
    setTotalCost(tc);
  }, [price, downPct, tenure, rate, country]);

  const handleConvert = async () => {
    const amt = parseFloat(ccAmount);
    if (!amt || amt <= 0) return;
    setCcLoading(true);
    setCcError("");
    setConverted(null);
    setRateSource("");

    // Try open.er-api.com
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${fromCur}`);
      if (res.ok) {
        const data = await res.json();
        const r = data?.rates?.[toCur];
        if (r != null) {
          setConverted(amt * r);
          setRateSource("Live rate via open.er-api.com");
          setCcLoading(false);
          return;
        }
      }
    } catch {}

    // Try frankfurter.app (supports EUR-based only)
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amt}&from=${fromCur}&to=${toCur}`);
      if (res.ok) {
        const data = await res.json();
        const r = data?.rates?.[toCur];
        if (r != null) {
          setConverted(r);
          setRateSource("Live rate via frankfurter.app");
          setCcLoading(false);
          return;
        }
      }
    } catch {}

    // Fallback to static rates
    const result = convertStatic(amt, fromCur, toCur);
    setConverted(result);
    setRateSource("Approximate rate (offline)");
    setCcLoading(false);
  };

  const sym = country.symbol;
  const x = exchangeRate;
  const loanBarPct = loanAmount + totalInterest > 0
    ? Math.round((loanAmount / (loanAmount + totalInterest)) * 100) : 70;

  const COUNTRY_PAIRS = COUNTRIES.map((c) => ({
    label: `USD → ${c.currency}`, from: "USD", to: c.currency, flag: c.flag
  })).filter((v, i, a) => a.findIndex((t) => t.label === v.label) === i);

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, alignItems:"start" }} className="emi-grid">

          {/* Section A — EMI Calculator */}
          <div className="widget-box-2 wd-listing">
            <h3 className="title">EMI Calculator</h3>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {/* Country selector */}
              <div>
                <label style={labelStyle}>Country / Market</label>
                <select value={country.name} onChange={handleCountryChange} style={inputStyle}>
                  {COUNTRIES.map((c) => (
                    <option key={c.name} value={c.name}>{c.flag} {c.name} ({c.currency})</option>
                  ))}
                </select>
              </div>

              {/* Info strip */}
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {[
                  { label: "Currency", val: country.currency },
                  { label: "Avg Interest", val: `${country.rate}% p.a.` },
                  { label: "Stamp Duty", val: `${country.stampDuty}%` },
                ].map((i) => (
                  <div key={i.label} style={{ fontSize:12, background:"#f8fafc", border:"1px solid #eef0f3", borderRadius:8, padding:"4px 10px" }}>
                    <span style={{ color:"#888" }}>{i.label}: </span>
                    <span style={{ fontWeight:700, color:"#1a2332" }}>{i.val}</span>
                  </div>
                ))}
              </div>

              {/* Property Price */}
              <div>
                <label style={labelStyle}>Property Price (USD)</label>
                <input type="number" value={price} min={0} onChange={(e) => setPrice(e.target.value)} style={inputStyle} />
                {x !== 1 && <div style={{ fontSize:11, color:"#888", marginTop:3 }}>≈ {sym} {fmt(price * x)}</div>}
              </div>

              {/* Down Payment */}
              <div>
                <label style={labelStyle}>
                  Down Payment: <strong>{downPct}%</strong>
                  <span style={{ color:"#888", fontWeight:400 }}> ({sym}{fmt(downAmount)})</span>
                </label>
                <input type="range" min={5} max={50} step={1} value={downPct}
                  onChange={(e) => setDownPct(Number(e.target.value))}
                  style={{ width:"100%", accentColor:"#f0822d" }} />
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#aaa", marginTop:2 }}>
                  <span>5%</span><span>50%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <label style={labelStyle}>Loan Tenure (Years)</label>
                <select value={tenure} onChange={(e) => setTenure(Number(e.target.value))} style={inputStyle}>
                  {[5,10,15,20,25,30].map((y) => <option key={y} value={y}>{y} Years</option>)}
                </select>
              </div>

              {/* Interest Rate */}
              <div>
                <label style={labelStyle}>Annual Interest Rate (%)</label>
                <input type="number" step={0.1} min={0} value={rate} onChange={(e) => setRate(e.target.value)} style={inputStyle} />
              </div>
            </div>

            {/* Results */}
            <div style={{ marginTop:20, background:"#FFF7ED", border:"1px solid #fde8cc", borderRadius:12, padding:"18px 16px" }}>
              <div style={{ fontSize:12, color:"#888", fontWeight:600, marginBottom:2 }}>Monthly EMI</div>
              <div style={{ fontSize:30, fontWeight:800, color:"#f0822d", marginBottom:2 }}>
                {x !== 1 ? `${sym} ${fmt(emi * x)}` : `${sym} ${fmt(emi)}`}
              </div>
              {x !== 1 && (
                <div style={{ fontSize:12, color:"#aaa", fontWeight:500, marginBottom:12 }}>
                  ≈ ${fmt(emi)} USD
                </div>
              )}

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
                {[
                  { label:"Loan Amount",       usd: loanAmount },
                  { label:"Total Interest",     usd: totalInterest },
                  { label:`Stamp Duty (${country.stampDuty}%)`, usd: stampDuty },
                  { label:"Total Cost to Buyer", usd: totalCost },
                ].map((s) => (
                  <div key={s.label} style={{ background:"#fff", borderRadius:8, padding:"9px 11px", border:"1px solid #f0e0cc" }}>
                    <div style={{ fontSize:11, color:"#999", marginBottom:2 }}>{s.label}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#1a2332" }}>
                      {x !== 1 ? `${sym} ${fmt(s.usd * x)}` : `${sym}${fmt(s.usd)}`}
                    </div>
                    {x !== 1 && <div style={{ fontSize:11, color:"#aaa", fontWeight:500 }}>${fmt(s.usd)} USD</div>}
                  </div>
                ))}
              </div>

              {/* Breakdown bar */}
              <div style={{ fontSize:11, color:"#888", marginBottom:5, fontWeight:600 }}>Payment Breakdown</div>
              <div style={{ display:"flex", height:8, borderRadius:6, overflow:"hidden", background:"#f0d5b0" }}>
                <div style={{ width:`${loanBarPct}%`, background:"#3b82f6", transition:"width 0.4s" }} />
                <div style={{ flex:1, background:"#f0822d" }} />
              </div>
              <div style={{ display:"flex", gap:14, marginTop:5 }}>
                <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, color:"#555" }}>
                  <span style={{ width:9, height:9, borderRadius:2, background:"#3b82f6", display:"inline-block" }} />
                  Principal ({loanBarPct}%)
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, color:"#555" }}>
                  <span style={{ width:9, height:9, borderRadius:2, background:"#f0822d", display:"inline-block" }} />
                  Interest ({100 - loanBarPct}%)
                </div>
              </div>
            </div>
            <div style={{ marginTop:8, fontSize:11, color:"#aaa" }}>
              * Stamp Duty {country.stampDuty}% + Registration {country.registration}% included in Total Cost. Rates are indicative.
            </div>
          </div>

          {/* Section B — Currency Converter */}
          <div className="widget-box-2 wd-listing">
            <h3 className="title">Currency Converter</h3>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div>
                <label style={labelStyle}>Amount</label>
                <input type="number" value={ccAmount} min={0}
                  onChange={(e) => setCcAmount(e.target.value)}
                  placeholder="Enter amount…" style={inputStyle} />
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:10, alignItems:"end" }}>
                <div>
                  <label style={labelStyle}>From</label>
                  <select value={fromCur} onChange={(e) => setFromCur(e.target.value)} style={inputStyle}>
                    {ALL_CURRENCIES.map((c) => (
                      <option key={c} value={c}>{c} — {CURRENCY_NAMES[c] || c}</option>
                    ))}
                  </select>
                </div>
                <div style={{ paddingBottom:8, fontSize:20, color:"#ccc", textAlign:"center", lineHeight:"38px", cursor:"pointer" }}
                  onClick={() => { const t = fromCur; setFromCur(toCur); setToCur(t); setConverted(null); }}>
                  ⇄
                </div>
                <div>
                  <label style={labelStyle}>To</label>
                  <select value={toCur} onChange={(e) => setToCur(e.target.value)} style={inputStyle}>
                    {ALL_CURRENCIES.map((c) => (
                      <option key={c} value={c}>{c} — {CURRENCY_NAMES[c] || c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button onClick={handleConvert} disabled={ccLoading || !ccAmount}
                style={{ background: ccLoading || !ccAmount ? "#e0e3e8" : "#f0822d", color:"#fff", border:"none", borderRadius:8, padding:"10px 0", fontSize:14, fontWeight:700, cursor: ccLoading || !ccAmount ? "not-allowed" : "pointer" }}>
                {ccLoading ? "Converting…" : "Convert"}
              </button>

              {ccError && (
                <div style={{ background:"#FEF2F2", border:"1px solid #fecaca", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#DC2626" }}>
                  {ccError}
                </div>
              )}

              {converted !== null && (
                <div style={{ background:"#F0FDF4", border:"1px solid #bbf7d0", borderRadius:12, padding:"18px 16px", textAlign:"center" }}>
                  <div style={{ fontSize:13, color:"#555", marginBottom:4 }}>{fmt(ccAmount)} {fromCur} =</div>
                  <div style={{ fontSize:28, fontWeight:800, color:"#10B981" }}>{fmt(converted)} {toCur}</div>
                  <div style={{ fontSize:11, color:"#aaa", marginTop:6 }}>{rateSource}</div>
                </div>
              )}
            </div>

            {/* Country quick pairs */}
            <div style={{ marginTop:20, background:"#f8fafc", border:"1px solid #eef0f3", borderRadius:10, padding:"12px 14px" }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#1a2332", marginBottom:8 }}>Platform Countries</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {COUNTRY_PAIRS.map((pair) => (
                  <button key={pair.label}
                    onClick={() => { setFromCur(pair.from); setToCur(pair.to); setConverted(null); setCcError(""); }}
                    style={{ fontSize:11, background:"#fff", border:"1px solid #e0e3e8", borderRadius:20, padding:"3px 10px", cursor:"pointer", color:"#555", fontWeight:500 }}>
                    {pair.flag} {pair.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Static rates reference */}
            <div style={{ marginTop:14, background:"#f8fafc", border:"1px solid #eef0f3", borderRadius:10, padding:"12px 14px" }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#1a2332", marginBottom:8 }}>Approximate Rates (1 USD)</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))", gap:6 }}>
                {COUNTRIES.map((c) => (
                  <div key={c.name} style={{ fontSize:11, color:"#555", background:"#fff", border:"1px solid #eee", borderRadius:6, padding:"4px 8px" }}>
                    <span style={{ marginRight:4 }}>{c.flag}</span>
                    <strong>{c.currency}</strong> {fmt(STATIC_RATES_USD[c.currency] || 1)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .emi-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        <div className="footer-dashboard">
          <p>Copyright © {new Date().getFullYear()} Globperty</p>
          <ul className="list">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
      </div>
      <div className="overlay-dashboard" />
    </div>
  );
}
