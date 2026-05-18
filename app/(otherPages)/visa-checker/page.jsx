"use client";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import ToolPageHero from "@/components/tools/ToolPageHero";
import Link from "next/link";
import { useState } from "react";

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80",
  badge: "Visa Tool — Eligibility Checker",
  titleWhite: "Find Your Best ",
  titleOrange: "Visa Program",
  tagline: "Answer 2 quick questions to see which Golden Visa or residency programme matches your investment budget and lifestyle goals.",
  tags: ["UAE Golden Visa", "Portugal", "Turkey Citizenship", "Cyprus", "Malta", "8 Programmes"],
  stats: [
    { value: "8", label: "Visa Programmes" },
    { value: "Free", label: "Eligibility Check" },
    { value: "2 min", label: "To Complete" },
    { value: "AI", label: "Matched Results" },
  ],
  primaryCta: { href: "#visa-checker-tool", label: "Check My Eligibility" },
  secondaryCta: { href: "/contact", label: "Speak to a Visa Expert" },
  snapshotTitle: "Programmes Available",
  snapshot: [
    { key: "UAE Golden Visa",     value: "From AED 2M",    color: "#f0822d" },
    { key: "Portugal",            value: "From €500K",     color: "#16b286" },
    { key: "Turkey Citizenship",  value: "From $400K",     color: "#f0822d" },
    { key: "Cyprus Residency",    value: "From €300K",     color: "#16b286" },
    { key: "Latvia / Malta",      value: "From €250K",     color: "#fff" },
    { key: "Malaysia MM2H",       value: "Long-Stay Visa", color: "#fff" },
  ],
};

const VISA_PROGRAMS = [
  {
    country: "UAE", flag: "🇦🇪", name: "UAE Golden Visa",
    minBudget: 545000, currency: "AED 2M", duration: "10 years", path: "Residency",
    benefits: ["0% income tax", "10-year renewable", "200+ nationalities", "Family included"],
    tags: ["tax-free", "residency", "investment", "family"],
    color: "#f0822d", href: "/visas/uae-golden-visa",
  },
  {
    country: "Portugal", flag: "🇵🇹", name: "Portugal Golden Visa",
    minBudget: 500000, currency: "€500K", duration: "5 years → citizenship",
    path: "Citizenship", benefits: ["EU citizenship path", "Schengen access", "Low stay requirement", "Family included"],
    tags: ["citizenship", "eu", "schengen", "investment"],
    color: "#16b286", href: "/visas/portugal-golden-visa",
  },
  {
    country: "Turkey", flag: "🇹🇷", name: "Turkey Citizenship by Investment",
    minBudget: 400000, currency: "$400K", duration: "Permanent", path: "Citizenship",
    benefits: ["Full citizenship", "Visa-free 110+ countries", "Dual nationality", "Fast processing"],
    tags: ["citizenship", "affordable", "investment", "fast"],
    color: "#3b82f6", href: "/visas/turkey-citizenship",
  },
  {
    country: "Cyprus", flag: "🇨🇾", name: "Cyprus Permanent Residency",
    minBudget: 300000, currency: "€300K", duration: "Permanent", path: "Residency",
    benefits: ["EU residency", "No tax on dividends", "Fast approval", "Family included"],
    tags: ["eu", "residency", "affordable", "dividend-free"],
    color: "#8b5cf6", href: "/visas/cyprus-residency",
  },
  {
    country: "Malta", flag: "🇲🇹", name: "Malta Residency Programme",
    minBudget: 375000, currency: "€375K", duration: "Permanent", path: "Residency",
    benefits: ["EU residency", "Schengen access", "English speaking", "Strong banking"],
    tags: ["eu", "schengen", "residency", "english"],
    color: "#ef4444", href: "/visas/malta-residency",
  },
  {
    country: "Hungary", flag: "🇭🇺", name: "Hungary Guest Investor Visa",
    minBudget: 500000, currency: "€500K", duration: "10 years", path: "Residency",
    benefits: ["EU residency", "Schengen access", "New 2024 program", "Low property prices"],
    tags: ["eu", "schengen", "residency", "new"],
    color: "#f59e0b", href: "/visas/hungary-guest-investor",
  },
  {
    country: "Latvia", flag: "🇱🇻", name: "Latvia Residency by Investment",
    minBudget: 250000, currency: "€250K", duration: "5 years", path: "Residency",
    benefits: ["EU residency", "Schengen access", "Most affordable EU", "Renewable"],
    tags: ["eu", "schengen", "affordable", "residency"],
    color: "#16b286", href: "/visas/latvia-residency",
  },
  {
    country: "Malaysia", flag: "🇲🇾", name: "Malaysia MM2H Visa",
    minBudget: 150000, currency: "$150K", duration: "10 years", path: "Long Stay",
    benefits: ["Low cost of living", "Tropical lifestyle", "Tax exemptions", "Property ownership"],
    tags: ["affordable", "lifestyle", "long-stay", "investment"],
    color: "#06b6d4", href: "/visas/malaysia-mm2h",
  },
];

const BUDGET_RANGES = [
  { label: "Under $300K", max: 299999 },
  { label: "$300K – $500K", max: 500000, min: 300000 },
  { label: "$500K – $1M", max: 1000000, min: 500000 },
  { label: "Over $1M", min: 1000000 },
];

const GOALS = [
  { id: "citizenship", label: "🏅 Citizenship", desc: "Full passport & nationality" },
  { id: "eu",          label: "🇪🇺 EU Access",   desc: "Live & work in Europe" },
  { id: "tax-free",    label: "💰 Tax-Free",    desc: "0% income or capital gains tax" },
  { id: "affordable",  label: "💸 Best Value",  desc: "Lowest investment threshold" },
  { id: "family",      label: "👨‍👩‍👧 Family",    desc: "Include spouse & children" },
  { id: "fast",        label: "⚡ Fast Process",desc: "Quick approval timeline" },
];

export default function VisaCheckerPage() {
  const [budget, setBudget] = useState(null);
  const [goals, setGoals] = useState([]);
  const [results, setResults] = useState(null);

  const toggleGoal = (id) => setGoals(g => g.includes(id) ? g.filter(x => x !== id) : [...g, id]);

  const check = () => {
    let filtered = VISA_PROGRAMS;
    if (budget) {
      filtered = filtered.filter(v => {
        if (budget.min && v.minBudget < budget.min) return false;
        if (budget.max && v.minBudget > budget.max) return false;
        return true;
      });
    }
    if (goals.length > 0) {
      filtered = filtered.sort((a, b) => {
        const aScore = goals.filter(g => a.tags.includes(g)).length;
        const bScore = goals.filter(g => b.tags.includes(g)).length;
        return bScore - aScore;
      });
    }
    setResults(filtered);
  };

  return (
    <div id="wrapper">
      <Header1 />
      <ToolPageHero config={HERO} />

      <section id="visa-checker-tool" style={{ background: "linear-gradient(135deg,#f8fafc 0%,#fff7ed 100%)", padding: "60px 0 80px", marginTop: "60px" }}>
        <div className="tf-container">
          <div className="row justify-center">
            <div className="col-lg-9">

              <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(240,130,45,0.15)", overflow: "hidden", marginBottom: 32 }}>
                <div style={{ background: "linear-gradient(90deg,#f0822d,#e56c1a)", padding: "18px 32px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>💰</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Step 1 — Your Investment Budget</span>
                </div>
                <div style={{ padding: "28px 32px" }}>
                  <div className="row g-3">
                    {BUDGET_RANGES.map(b => (
                      <div key={b.label} className="col-6">
                        <button
                          onClick={() => setBudget(b)}
                          style={{
                            width: "100%", padding: "18px 16px", borderRadius: 12, border: `2px solid ${budget?.label === b.label ? "#f0822d" : "#e5e7eb"}`,
                            background: budget?.label === b.label ? "#fff7ed" : "#f9fafb",
                            cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                          }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: budget?.label === b.label ? "#f0822d" : "#111827" }}>{b.label}</div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(240,130,45,0.15)", overflow: "hidden", marginBottom: 32 }}>
                <div style={{ background: "linear-gradient(90deg,#f0822d,#e56c1a)", padding: "18px 32px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>🎯</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Step 2 — Your Goals (select all that apply)</span>
                </div>
                <div style={{ padding: "28px 32px" }}>
                  <div className="row g-3">
                    {GOALS.map(g => (
                      <div key={g.id} className="col-4">
                        <button
                          onClick={() => toggleGoal(g.id)}
                          style={{
                            width: "100%", padding: "14px 12px", borderRadius: 12, border: `2px solid ${goals.includes(g.id) ? "#f0822d" : "#e5e7eb"}`,
                            background: goals.includes(g.id) ? "#fff7ed" : "#f9fafb",
                            cursor: "pointer", textAlign: "center", transition: "all 0.15s",
                          }}
                        >
                          <div style={{ fontSize: 20, marginBottom: 4 }}>{g.label.split(" ")[0]}</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: goals.includes(g.id) ? "#f0822d" : "#374151" }}>{g.label.slice(g.label.indexOf(" ")+1)}</div>
                          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{g.desc}</div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={check} className="tf-btn bg-color-primary w-full"
                style={{ height: 56, fontSize: 17, fontWeight: 700, borderRadius: 12, marginBottom: 48 }}>
                🎫 Check My Visa Options <i className="icon-arrow-right2" />
              </button>

              {results && (
                <div>
                  <div className="heading-section mb-32">
                    <h3 className="title" style={{ fontSize: 24 }}>
                      {results.length > 0 ? `✅ ${results.length} Visa Programs Match Your Profile` : "No exact matches — try broadening your criteria"}
                    </h3>
                  </div>
                  <div className="row g-4">
                    {results.map((v, i) => (
                      <div key={v.country} className="col-md-6">
                        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: `2px solid ${i === 0 ? v.color : "#e5e7eb"}`, overflow: "hidden", height: "100%" }}>
                          {i === 0 && (
                            <div style={{ background: v.color, padding: "6px 16px", fontSize: 11, fontWeight: 700, color: "#fff", textAlign: "center", letterSpacing: 0.8 }}>
                              ⭐ BEST MATCH FOR YOU
                            </div>
                          )}
                          <div style={{ padding: "20px 22px" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                              <span style={{ fontSize: 32 }}>{v.flag}</span>
                              <div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: "#111827", marginBottom: 2 }}>{v.name}</div>
                                <div style={{ display: "flex", gap: 6 }}>
                                  <span style={{ fontSize: 11, fontWeight: 600, color: v.color, background: `${v.color}15`, borderRadius: 8, padding: "2px 8px" }}>{v.path}</span>
                                  <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", background: "#f3f4f6", borderRadius: 8, padding: "2px 8px" }}>From {v.currency}</span>
                                </div>
                              </div>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                              {v.benefits.map(b => (
                                <span key={b} style={{ fontSize: 11, color: "#374151", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "3px 10px" }}>✓ {b}</span>
                              ))}
                            </div>
                            <Link href={v.href} className="tf-btn bg-color-primary" style={{ display: "block", textAlign: "center", padding: "10px", borderRadius: 8, fontSize: 13, fontWeight: 700 }}>
                              View {v.country} Guide →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: "center", marginTop: 32, padding: "20px", background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb" }}>
                    <p className="text-1" style={{ marginBottom: 12 }}>Want personalised visa advice from our AI assistant?</p>
                    <Link href="/copilot" className="tf-btn bg-color-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 10, fontWeight: 700 }}>
                      🤖 Ask AI Visa Advisor
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
