"use client";
import React, { useState, useEffect } from "react";

const CURRENCIES = ["USD", "AED", "EUR", "GBP", "INR", "SAR", "SGD", "AUD", "CAD", "JPY"];

const inputStyle = {
  width: "100%",
  padding: "9px 14px",
  border: "1px solid #e0e3e8",
  borderRadius: 8,
  fontSize: 13,
  color: "#1a2332",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle = {
  fontSize: 12,
  fontWeight: 600,
  color: "#555",
  display: "block",
  marginBottom: 4,
};

function fmt(n) {
  return Number(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export default function EmiCalculator() {
  // EMI state
  const [price, setPrice] = useState(500000);
  const [downPct, setDownPct] = useState(20);
  const [tenure, setTenure] = useState(20);
  const [rate, setRate] = useState(7.5);

  // Calculated results
  const [emi, setEmi] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [stampDuty, setStampDuty] = useState(0);
  const [registration, setRegistration] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [downAmount, setDownAmount] = useState(0);

  // Currency converter state
  const [ccAmount, setCcAmount] = useState(500000);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("AED");
  const [converted, setConverted] = useState(null);
  const [ccLoading, setCcLoading] = useState(false);
  const [ccError, setCcError] = useState("");

  useEffect(() => {
    const p = parseFloat(price) || 0;
    const dp = parseFloat(downPct) || 0;
    const r = (parseFloat(rate) || 0) / 12 / 100;
    const n = parseInt(tenure) * 12;

    const down = p * (dp / 100);
    const loan = p * (1 - dp / 100);
    const sd = p * 0.02;
    const reg = p * 0.01;
    const tc = p + sd + reg;

    let monthlyEmi = 0;
    if (r > 0 && n > 0 && loan > 0) {
      const pow = Math.pow(1 + r, n);
      monthlyEmi = (loan * r * pow) / (pow - 1);
    } else if (r === 0 && n > 0 && loan > 0) {
      monthlyEmi = loan / n;
    }

    const tp = monthlyEmi * n;
    const ti = tp - loan;

    setDownAmount(down);
    setLoanAmount(loan);
    setEmi(monthlyEmi);
    setTotalPayment(tp);
    setTotalInterest(ti > 0 ? ti : 0);
    setStampDuty(sd);
    setRegistration(reg);
    setTotalCost(tc);
  }, [price, downPct, tenure, rate]);

  const handleConvert = async () => {
    if (!ccAmount || ccAmount <= 0) return;
    setCcLoading(true);
    setCcError("");
    setConverted(null);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${ccAmount}&from=${fromCur}&to=${toCur}`
      );
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const result = data.rates?.[toCur];
      if (result == null) throw new Error("Currency not found");
      setConverted(result);
    } catch (err) {
      setCcError("Failed to fetch exchange rate. Please try again.");
    } finally {
      setCcLoading(false);
    }
  };

  const loanBarPct = loanAmount + totalInterest > 0
    ? Math.round((loanAmount / (loanAmount + totalInterest)) * 100)
    : 70;

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}
          className="emi-grid"
        >
          {/* Section A — EMI Calculator */}
          <div className="widget-box-2 wd-listing">
            <h3 className="title">EMI Calculator</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Property Price */}
              <div>
                <label style={labelStyle}>Property Price ($)</label>
                <input
                  type="number"
                  value={price}
                  min={0}
                  onChange={(e) => setPrice(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Down Payment */}
              <div>
                <label style={labelStyle}>
                  Down Payment: <strong>{downPct}%</strong>
                  {" "}
                  <span style={{ color: "#888", fontWeight: 400 }}>
                    (${fmt(downAmount)})
                  </span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={1}
                  value={downPct}
                  onChange={(e) => setDownPct(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#f0822d" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#aaa", marginTop: 2 }}>
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <label style={labelStyle}>Loan Tenure (Years)</label>
                <select value={tenure} onChange={(e) => setTenure(Number(e.target.value))} style={inputStyle}>
                  {[5, 10, 15, 20, 25, 30].map((y) => (
                    <option key={y} value={y}>{y} Years</option>
                  ))}
                </select>
              </div>

              {/* Annual Interest Rate */}
              <div>
                <label style={labelStyle}>Annual Interest Rate (%)</label>
                <input
                  type="number"
                  step={0.1}
                  min={0}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Results box */}
            <div style={{
              marginTop: 24,
              background: "#FFF7ED",
              border: "1px solid #fde8cc",
              borderRadius: 12,
              padding: "20px 18px",
            }}>
              <div style={{ fontSize: 12, color: "#888", fontWeight: 600, marginBottom: 4 }}>Monthly EMI</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#f0822d", marginBottom: 16 }}>
                ${fmt(emi)}
              </div>

              {/* 2×2 stat grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
                {[
                  { label: "Loan Amount", value: `$${fmt(loanAmount)}` },
                  { label: "Total Interest", value: `$${fmt(totalInterest)}` },
                  { label: "Stamp Duty (2%)", value: `$${fmt(stampDuty)}` },
                  { label: "Total Cost to Buyer", value: `$${fmt(totalCost)}` },
                ].map((s) => (
                  <div key={s.label} style={{
                    background: "#fff",
                    borderRadius: 8,
                    padding: "10px 12px",
                    border: "1px solid #f0e0cc",
                  }}>
                    <div style={{ fontSize: 11, color: "#999", marginBottom: 3 }}>{s.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2332" }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Breakdown bar */}
              <div>
                <div style={{ fontSize: 11, color: "#888", marginBottom: 6, fontWeight: 600 }}>
                  Payment Breakdown
                </div>
                <div style={{ display: "flex", height: 10, borderRadius: 6, overflow: "hidden", background: "#f0d5b0" }}>
                  <div style={{ width: `${loanBarPct}%`, background: "#3b82f6", transition: "width 0.4s" }} />
                  <div style={{ flex: 1, background: "#f0822d" }} />
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#555" }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: "#3b82f6", display: "inline-block" }} />
                    Principal ({loanBarPct}%)
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#555" }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: "#f0822d", display: "inline-block" }} />
                    Interest ({100 - loanBarPct}%)
                  </div>
                </div>
              </div>
            </div>

            {/* Registration note */}
            <div style={{ marginTop: 10, fontSize: 11, color: "#aaa" }}>
              * Stamp Duty 2% + Registration 1% of property price included in Total Cost.
            </div>
          </div>

          {/* Section B — Currency Converter */}
          <div className="widget-box-2 wd-listing">
            <h3 className="title">Currency Converter</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Amount</label>
                <input
                  type="number"
                  value={ccAmount}
                  min={0}
                  onChange={(e) => setCcAmount(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 10, alignItems: "end" }}>
                <div>
                  <label style={labelStyle}>From</label>
                  <select value={fromCur} onChange={(e) => setFromCur(e.target.value)} style={inputStyle}>
                    {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ paddingBottom: 8, fontSize: 18, color: "#ccc", textAlign: "center", lineHeight: "38px" }}>⇄</div>
                <div>
                  <label style={labelStyle}>To</label>
                  <select value={toCur} onChange={(e) => setToCur(e.target.value)} style={inputStyle}>
                    {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <button
                onClick={handleConvert}
                disabled={ccLoading}
                style={{
                  background: ccLoading ? "#f5a96a" : "#f0822d",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 0",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: ccLoading ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                }}
              >
                {ccLoading ? "Converting…" : "Convert"}
              </button>

              {ccError && (
                <div style={{
                  background: "#FEF2F2",
                  border: "1px solid #fecaca",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 13,
                  color: "#DC2626",
                }}>
                  {ccError}
                </div>
              )}

              {converted !== null && !ccError && (
                <div style={{
                  background: "#F0FDF4",
                  border: "1px solid #bbf7d0",
                  borderRadius: 12,
                  padding: "20px 18px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 13, color: "#555", marginBottom: 6 }}>
                    {fmt(ccAmount)} {fromCur} =
                  </div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: "#10B981" }}>
                    {fmt(converted)} {toCur}
                  </div>
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 8 }}>
                    Rate via frankfurter.app — updated daily
                  </div>
                </div>
              )}
            </div>

            {/* Common pairs hint */}
            <div style={{
              marginTop: 24,
              background: "#f8fafc",
              border: "1px solid #eef0f3",
              borderRadius: 10,
              padding: "14px 16px",
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1a2332", marginBottom: 8 }}>Common Real Estate Currencies</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[
                  { label: "USD → AED", from: "USD", to: "AED" },
                  { label: "USD → EUR", from: "USD", to: "EUR" },
                  { label: "USD → INR", from: "USD", to: "INR" },
                  { label: "GBP → AED", from: "GBP", to: "AED" },
                  { label: "EUR → GBP", from: "EUR", to: "GBP" },
                ].map((pair) => (
                  <button
                    key={pair.label}
                    onClick={() => { setFromCur(pair.from); setToCur(pair.to); setConverted(null); setCcError(""); }}
                    style={{
                      fontSize: 11,
                      background: "#fff",
                      border: "1px solid #e0e3e8",
                      borderRadius: 20,
                      padding: "3px 10px",
                      cursor: "pointer",
                      color: "#555",
                      fontWeight: 500,
                    }}
                  >
                    {pair.label}
                  </button>
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
