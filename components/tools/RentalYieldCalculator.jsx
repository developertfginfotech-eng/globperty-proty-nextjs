"use client";
import { useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

const COUNTRIES = ["UAE", "USA", "Portugal", "Australia", "Turkey", "Cyprus", "Malta", "Canada", "Hungary", "Latvia", "Philippines", "Malaysia"];
const TYPES = ["Apartment", "Villa", "House", "Penthouse", "Commercial", "Land"];

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
    const netYield = (((annualRent * 0.85) / value) * 100).toFixed(2); // ~15% expenses
    const monthsToBreakEven = (value / parseFloat(form.monthlyRent)).toFixed(0);

    // Try to get market data from backend
    let marketYield = null;
    try {
      const res = await axios.get(`${API}/market-intelligence/investment-hotspots`, { params: { country: form.country }, timeout: 5000 });
      const hotspots = res.data?.data || res.data?.hotspots || [];
      if (hotspots.length > 0) {
        marketYield = hotspots[0]?.rentalYield || hotspots[0]?.avgYield || null;
      }
    } catch {}

    setResult({ grossYield, netYield, annualRent: annualRent.toLocaleString(), monthsToBreakEven, marketYield });
    setLoading(false);
  };

  return (
    <section style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px 80px" }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: "#111" }}>Rental Yield Calculator</h2>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>Calculate the annual return on your property investment.</p>

      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.09)", padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Property Value ($)</span>
            <input type="number" placeholder="e.g. 500000" value={form.propertyValue} onChange={e => set("propertyValue", e.target.value)}
              style={{ border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "10px 14px", fontSize: 15, outline: "none" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Monthly Rent ($)</span>
            <input type="number" placeholder="e.g. 2500" value={form.monthlyRent} onChange={e => set("monthlyRent", e.target.value)}
              style={{ border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "10px 14px", fontSize: 15, outline: "none" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Country (optional)</span>
            <select value={form.country} onChange={e => set("country", e.target.value)}
              style={{ border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "10px 14px", fontSize: 15, background: "#fff" }}>
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Property Type</span>
            <select value={form.type} onChange={e => set("type", e.target.value)}
              style={{ border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "10px 14px", fontSize: 15, background: "#fff" }}>
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
        </div>

        {error && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 16 }}>{error}</p>}

        <button onClick={calculate} disabled={loading}
          style={{ width: "100%", background: "#f0822d", color: "#fff", border: "none", borderRadius: 10, padding: "14px 0", fontSize: 16, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Calculating…" : "Calculate Yield"}
        </button>

        {result && (
          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Gross Yield", value: `${result.grossYield}%`, color: "#16b286" },
              { label: "Net Yield (est.)", value: `${result.netYield}%`, color: "#f0822d" },
              { label: "Annual Rental Income", value: `$${result.annualRent}`, color: "#3b82f6" },
              { label: "Break-even (months)", value: result.monthsToBreakEven, color: "#8b5cf6" },
            ].map(card => (
              <div key={card.label} style={{ background: "#f9fafb", borderRadius: 12, padding: "18px 20px", borderLeft: `4px solid ${card.color}` }}>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{card.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: card.color }}>{card.value}</div>
              </div>
            ))}
            {result.marketYield && (
              <div style={{ gridColumn: "1/-1", background: "#f0fdf4", borderRadius: 12, padding: "14px 20px", borderLeft: "4px solid #16b286" }}>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Market Average Yield ({form.country})</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#16b286" }}>{result.marketYield}%</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
