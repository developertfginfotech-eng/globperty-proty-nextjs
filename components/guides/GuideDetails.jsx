"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogArticles4 } from "@/data/blogs";
import { GUIDE_CONTENT } from "@/data/guideContent";

// ─── Tag config (hero data per tag) ──────────────────────────────────────────

const TAG_CFG = {
  "Buying Guide": {
    flag: "🇦🇪", countryLabel: "United Arab Emirates",
    glanceIcon: "🏙", glanceTitle: "DUBAI AT A GLANCE",
    glanceRows: [
      { label: "Foreigners Can Buy?",  value: "Yes — Freehold ✓",   color: "green" },
      { label: "Avg Rental Yield",     value: "6–9% p.a.",          type: "badge-green" },
      { label: "Income Tax",           value: "0% ✓",               color: "green" },
      { label: "Capital Gains Tax",    value: "0% ✓",               color: "green" },
      { label: "Golden Visa From",     value: "AED 2,000,000",      color: "orange" },
      { label: "Transaction Costs",    value: "~7–8% of price",     color: "normal" },
      { label: "Timeline to Buy",      value: "30–60 days",         color: "normal" },
      { label: "Market Trend",         value: "📈 Bullish 2025",    type: "badge-orange" },
    ],
    tabs: ["Overview","Ownership Rights","Buying Process","Costs & Fees","Best Areas","Mortgage","Golden Visa","Taxes","Common Mistakes","FAQ"],
    ctaPrimary:   { icon: "🏠", text: "Browse Dubai Properties", href: "/properties" },
    ctaSecondary: { icon: "🎫", text: "Golden Visa Guide",        href: "/knowledge-base/102" },
    ctaTertiary:  { icon: "🤖", text: "Ask AI Assistant",         href: "/copilot" },
    sidebarTitle: "DUBAI QUICK FACTS", sidebarBrowseLabel: "Browse Dubai Properties", sidebarBrowseHref: "/properties",
    aiContext: "buying, investing or living in Dubai",
    aiSuggestions: ["Best area under AED 800K?", "Golden Visa cost?", "Mortgage options?"],
    goldenVisa: { title: "UAE GOLDEN VISA", icon: "🎫", rows: [
      { label: "Min Property Value", value: "AED 2,000,000", color: "orange" },
      { label: "Visa Validity",      value: "10 Years",      color: "green"  },
      { label: "Min. Stay Required", value: "None",          color: "green"  },
      { label: "Family Included",    value: "Yes ✓",         color: "green"  },
      { label: "Processing Time",    value: "~30 days",      color: "normal" },
    ], href: "/knowledge-base/102", cta: "Full Golden Visa Guide →" },
  },
  "Golden Visa": {
    flag: "🎫", countryLabel: "Global Programmes",
    glanceIcon: "🎫", glanceTitle: "GOLDEN VISA AT A GLANCE",
    glanceRows: [
      { label: "Turkey Citizenship",   value: "$400,000 min",         color: "orange" },
      { label: "Cheapest EU Route",    value: "Cyprus €300K",         type: "badge-green" },
      { label: "Schengen Access",      value: "Yes — EU ✓",          color: "green" },
      { label: "Family Included",      value: "Yes ✓",               color: "green" },
      { label: "Min. Stay (Portugal)", value: "7 days/year",          color: "normal" },
      { label: "Processing Time",      value: "2–6 months",           color: "normal" },
      { label: "Hungary GIV",          value: "10-year permit",       color: "normal" },
      { label: "Best For Citizenship", value: "📋 Turkey (fastest)", type: "badge-orange" },
    ],
    tabs: ["Overview","Programme Comparison","Requirements","Application","Benefits","Costs","Mistakes","FAQ","Related"],
    ctaPrimary:   { icon: "🎫", text: "Check Eligibility",   href: "/contact" },
    ctaSecondary: { icon: "🏠", text: "Browse Properties",    href: "/properties" },
    ctaTertiary:  { icon: "🤖", text: "Ask AI Assistant",     href: "/copilot" },
    sidebarTitle: "PROGRAMME QUICK FACTS", sidebarBrowseLabel: "Check Eligibility", sidebarBrowseHref: "/contact",
    aiContext: "Golden Visa programmes and investment migration",
    aiSuggestions: ["Which visa suits me?", "Fastest citizenship?", "Compare costs?"],
    goldenVisa: null,
  },
};

const DEFAULT_CFG = {
  flag: "🌍", countryLabel: "Global Markets",
  glanceIcon: "📋", glanceTitle: "GUIDE AT A GLANCE",
  glanceRows: [
    { label: "Markets Covered",    value: "12+",             color: "normal" },
    { label: "Best Avg Yield",     value: "6–9% p.a.",       type: "badge-green" },
    { label: "Tax-Free Market",    value: "UAE ✓",           color: "green" },
    { label: "Golden Visa From",   value: "AED 2,000,000",   color: "orange" },
    { label: "Transaction Costs",  value: "5–10% of price",  color: "normal" },
    { label: "Timeline to Buy",    value: "4–8 weeks",       color: "normal" },
    { label: "Expert Reviewed",    value: "Yes ✓",           color: "green" },
    { label: "Market Trend",       value: "📈 Bullish 2025", type: "badge-orange" },
  ],
  tabs: ["Overview","Key Steps","Costs & Fees","Legal Tips","Financing","Markets","Mistakes","FAQ","Related"],
  ctaPrimary:   { icon: "🏠", text: "Browse Properties",  href: "/properties" },
  ctaSecondary: { icon: "🌍", text: "Compare Countries",   href: "/countries" },
  ctaTertiary:  { icon: "🤖", text: "Ask AI Assistant",    href: "/copilot" },
  sidebarTitle: "GUIDE QUICK FACTS", sidebarBrowseLabel: "Browse Properties", sidebarBrowseHref: "/properties",
  aiContext: "international real estate and property investment",
  aiSuggestions: ["Best yield areas?", "Golden Visa cost?", "Mortgage options?"],
  goldenVisa: null,
};

const TITLE_KEYWORDS = ["Dubai","Portugal","Turkey","Cyprus","Malta","Australia","Malaysia","Philippines","Hungary","Canada","Latvia","UAE","Abroad","Airbnb","Golden Visa"];

function splitTitle(title) {
  for (const kw of TITLE_KEYWORDS) {
    const idx = title.indexOf(kw);
    if (idx >= 0) return { before: title.slice(0, idx), highlight: kw, after: title.slice(idx + kw.length) };
  }
  return { before: title, highlight: "", after: "" };
}

// ─── Glance value renderer ────────────────────────────────────────────────────

function GlanceVal({ row, sidebar }) {
  const size = sidebar ? 12 : 13;
  if (row.type === "badge-green")
    return <span style={{ background: sidebar ? "rgba(34,197,94,0.12)" : "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: sidebar ? "#16a34a" : "#4ade80", borderRadius: 20, padding: "2px 10px", fontSize: size - 1, fontWeight: 600 }}>{row.value}</span>;
  if (row.type === "badge-orange")
    return <span style={{ background: sidebar ? "rgba(249,115,22,0.1)" : "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", color: sidebar ? "#ea580c" : "#fb923c", borderRadius: 20, padding: "2px 10px", fontSize: size - 1, fontWeight: 600 }}>{row.value}</span>;
  if (row.color === "green")  return <span style={{ color: sidebar ? "#16a34a" : "#4ade80", fontSize: size, fontWeight: 700 }}>{row.value}</span>;
  if (row.color === "orange") return <span style={{ color: sidebar ? "#ea580c" : "#fb923c", fontSize: size, fontWeight: 700 }}>{row.value}</span>;
  return <span style={{ color: sidebar ? "#0f172a" : "#e2e8f0", fontSize: size, fontWeight: sidebar ? 600 : 500 }}>{row.value}</span>;
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ blog, cfg }) {
  const { before, highlight, after } = splitTitle(blog.title);
  return (
    <div style={{ background: "#0d1321", paddingTop: 32, paddingBottom: 56 }}>
      <div className="tf-container">
        {/* Breadcrumb */}
        <nav style={{ marginBottom: 22, fontSize: 13 }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Home</Link>
          <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 8px" }}>›</span>
          <Link href="/knowledge-base" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Knowledge Base</Link>
          <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 8px" }}>›</span>
          <Link href="/knowledge-base" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Buying Guides</Link>
          <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 8px" }}>›</span>
          <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{blog.title?.slice(0, 45)}{blog.title?.length > 45 ? "…" : ""}</span>
        </nav>

        <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Left */}
          <div style={{ flex: 1, minWidth: 280 }}>
            {/* Badges */}
            <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
              {[`🏠 ${blog.tag}`, `${cfg.flag} ${cfg.countryLabel}`, "⭐ Most Popular Guide"].map((b, i) => (
                <span key={i} style={{ background: "rgba(255,255,255,0.1)", color: "#e2e8f0", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 500 }}>{b}</span>
              ))}
            </div>
            {/* Title */}
            <h1 style={{ color: "#fff", fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 18, maxWidth: 660 }}>
              {before}<span style={{ color: "#f97316" }}>{highlight}</span>{after}
            </h1>
            {/* Description */}
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.75, marginBottom: 20, maxWidth: 600 }}>{blog.description}</p>
            {/* Meta */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 0, marginBottom: 30, fontSize: 13, alignItems: "center" }}>
              {[
                { dot: false, text: `Updated ${blog.date}` },
                { dot: true,  text: "12 min read" },
                { dot: true,  text: "Globperty Research Team" },
                { dot: true,  text: "Expert Reviewed", green: true },
              ].map((m, i) => (
                <React.Fragment key={i}>
                  {m.dot && <span style={{ color: "#f97316", margin: "0 10px" }}>•</span>}
                  <span style={{ color: m.green ? "#4ade80" : "rgba(255,255,255,0.5)" }}>{m.text}</span>
                </React.Fragment>
              ))}
            </div>
            {/* CTAs */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href={cfg.ctaPrimary.href} style={{ background: "#f97316", color: "#fff", borderRadius: 8, padding: "12px 20px", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                {cfg.ctaPrimary.icon} {cfg.ctaPrimary.text}
              </Link>
              {[cfg.ctaSecondary, cfg.ctaTertiary].map((btn, i) => (
                <Link key={i} href={btn.href} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.2)", color: "#e2e8f0", borderRadius: 8, padding: "12px 20px", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  {btn.icon} {btn.text}
                </Link>
              ))}
            </div>
          </div>

          {/* At a Glance card */}
          <div style={{ width: 260, flexShrink: 0, background: "#131f35", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ color: "#fb923c", fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>
                {cfg.glanceIcon} {cfg.glanceTitle}
              </div>
            </div>
            {cfg.glanceRows.map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 20px", borderBottom: i < cfg.glanceRows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{row.label}</span>
                <GlanceVal row={row} sidebar={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB NAV ──────────────────────────────────────────────────────────────────

function TabNav({ tabs, activeTab, setActiveTab, sections }) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <div className="tf-container">
        <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => {
              setActiveTab(i);
              const sec = sections?.[i];
              if (sec) document.getElementById(`section-${sec.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }} style={{
              background: "none", border: "none", padding: "15px 16px",
              fontSize: 13.5,
              fontWeight: activeTab === i ? 700 : 400,
              color: activeTab === i ? "#1d4ed8" : "#6b7280",
              borderBottom: activeTab === i ? "2px solid #1d4ed8" : "2px solid transparent",
              cursor: "pointer", whiteSpace: "nowrap", marginBottom: -1, transition: "color 0.15s",
            }}>{tab}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section header helper ────────────────────────────────────────────────────

function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ color: "#f97316", fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <h2 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 800, color: "#0f172a", marginBottom: subtitle ? 6 : 0 }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{subtitle}</p>}
    </div>
  );
}

function Callout({ text, type }) {
  const styles = {
    "good-news": { bg: "#f0fdf4", border: "#bbf7d0", icon: "✅", textColor: "#166534" },
    "info":      { bg: "#eff6ff", border: "#bfdbfe", icon: "ℹ️", textColor: "#1e40af" },
    "warning":   { bg: "#fffbeb", border: "#fde68a", icon: "💡", textColor: "#92400e" },
  };
  const s = styles[type] || styles["info"];
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "14px 18px", marginBottom: 20, fontSize: 13.5, color: s.textColor, lineHeight: 1.65 }}>
      {text}
    </div>
  );
}

// ─── Section renderers ────────────────────────────────────────────────────────

function ArticleSection({ sec }) {
  return (
    <div id={`section-${sec.id}`} style={{ marginBottom: 48 }}>
      <SectionHeader label={sec.sectionLabel} title={sec.title} subtitle={sec.subtitle} />
      {sec.callout && <Callout text={sec.callout.text} type={sec.callout.type} />}
      <div className="article-content" style={{ fontSize: 15, lineHeight: 1.85, color: "#374151" }} dangerouslySetInnerHTML={{ __html: sec.body }} />
    </div>
  );
}

function OwnershipSection({ sec }) {
  return (
    <div id={`section-${sec.id}`} style={{ marginBottom: 48 }}>
      <SectionHeader label={sec.sectionLabel} title={sec.title} subtitle={sec.subtitle} />
      {sec.callout && <Callout text={sec.callout.text} type={sec.callout.type} />}
      <div className="kb-grid-2">
        {sec.cards.map((card, i) => (
          <div key={i} style={{ border: `2px solid ${card.color === "green" ? "#bbf7d0" : "#e2e8f0"}`, borderRadius: 12, padding: 22, background: card.color === "green" ? "#f0fdf4" : "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: 0 }}>{card.title}</h4>
              {card.recommended && <span style={{ background: "#16a34a", color: "#fff", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>Recommended for Investors</span>}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {card.points.map((p, j) => (
                <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "#374151", lineHeight: 1.5 }}>
                  <span style={{ color: card.color === "green" ? "#16a34a" : "#9ca3af", marginTop: 1, flexShrink: 0 }}>{card.color === "green" ? "✓" : "–"}</span>
                  {p}
                </li>
              ))}
            </ul>
            {card.color !== "green" && (
              <div style={{ marginTop: 12, fontSize: 12, color: "#ef4444", fontWeight: 500 }}>Skip to leasehold where possible</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepsSection({ sec }) {
  return (
    <div id={`section-${sec.id}`} style={{ marginBottom: 48 }}>
      <SectionHeader label={sec.sectionLabel} title={sec.title} subtitle={sec.subtitle} />
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {sec.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 20, paddingBottom: 28, borderLeft: i < sec.steps.length - 1 ? "2px solid #e2e8f0" : "none", marginLeft: 19, paddingLeft: 28, position: "relative" }}>
            <div style={{ width: 40, height: 40, background: "#1d4ed8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16, flexShrink: 0, position: "absolute", left: -21, top: 0 }}>
              {step.n}
            </div>
            <div style={{ paddingTop: 6 }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{step.title}</h4>
              <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.7, marginBottom: 8 }}>{step.desc}</p>
              <span style={{ background: "#f1f5f9", color: "#64748b", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>⏱ {step.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeeTableSection({ sec }) {
  return (
    <div id={`section-${sec.id}`} style={{ marginBottom: 48 }}>
      <SectionHeader label={sec.sectionLabel} title={sec.title} subtitle={sec.subtitle} />
      <div className="kb-table-scroll" style={{ marginBottom: 20 }}>
        <table>
          <thead>
            <tr style={{ background: "#0f172a" }}>
              {["FEE / COST", "AMOUNT", "PAID TO", "WHEN"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sec.fees.map((row, i) => (
              <tr key={i} style={{ background: row.total ? "#f8fafc" : i % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "11px 16px", fontSize: 13.5, fontWeight: row.total ? 700 : 500, color: "#0f172a" }}>{row.fee}</td>
                <td style={{ padding: "11px 16px", fontSize: 13.5, fontWeight: row.total ? 700 : 500, color: row.total ? "#0f172a" : "#374151" }}>{row.amount}</td>
                <td style={{ padding: "11px 16px", fontSize: 13, color: "#6b7280" }}>{row.paidTo}</td>
                <td style={{ padding: "11px 16px", fontSize: 13, color: row.total ? "#f97316" : "#6b7280", fontWeight: row.total ? 600 : 400 }}>
                  {row.total ? "Budget this upfront" : row.when}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sec.callout && <Callout text={sec.callout} type="warning" />}
    </div>
  );
}

function AreasSection({ sec }) {
  return (
    <div id={`section-${sec.id}`} style={{ marginBottom: 48 }}>
      <SectionHeader label={sec.sectionLabel} title={sec.title} subtitle={sec.subtitle} />
      {/* Featured area cards */}
      <div className="kb-grid-3">
        {sec.featured.map((area, i) => (
          <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 20, background: "#fff", position: "relative" }}>
            <span style={{ background: area.badgeColor, color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, display: "inline-block", marginBottom: 12 }}>{area.badge}</span>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>{area.name}</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>{area.fullName}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 12, color: "#374151" }}>Entry price <strong>{area.entry}</strong></div>
              <div style={{ fontSize: 12, color: "#374151" }}>Gross yield <strong style={{ color: "#16a34a" }}>{area.yield}</strong></div>
              <div style={{ fontSize: 12, color: "#374151" }}>Best for <strong>{area.best}</strong></div>
            </div>
          </div>
        ))}
      </div>
      {/* Data table */}
      <div className="kb-table-scroll">
        <table>
          <thead>
            <tr style={{ background: "#0f172a" }}>
              {["AREA", "STUDIO PRICE", "1BR PRICE", "GROSS YIELD", "5YR GROWTH", "BEST FOR"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sec.table.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{row.area}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#374151" }}>{row.studio}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#374151" }}>{row.oneBR}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, fontWeight: 700, color: "#16a34a" }}>{row.yield}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "#1d4ed8" }}>{row.growth}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#374151" }}>{row.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MortgageSection({ sec }) {
  return (
    <div id={`section-${sec.id}`} style={{ marginBottom: 48 }}>
      <SectionHeader label={sec.sectionLabel} title={sec.title} subtitle={sec.subtitle} />
      <div className="kb-mortgage-grid">
        {/* Rules */}
        <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 22 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#0f172a" }}>Mortgage Rules for Non-Residents</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {sec.rules.map((r, i) => (
              <li key={i} style={{ display: "flex", gap: 8, fontSize: 13.5, color: "#374151", lineHeight: 1.5 }}>
                <span style={{ color: "#3b82f6", marginTop: 2, flexShrink: 0 }}>•</span>{r}
              </li>
            ))}
          </ul>
        </div>
        {/* Bank table */}
        <div className="kb-table-scroll">
          <div style={{ padding: "12px 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", margin: 0 }}>Top Banks for Foreign Buyers</h4>
          </div>
          <table>
            <thead>
              <tr style={{ background: "#0f172a" }}>
                {["BANK", "RATE FROM", "NON-RESIDENT"].map(h => (
                  <th key={h} style={{ padding: "9px 14px", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.65)", textAlign: "left", letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sec.banks.map((b, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "9px 14px", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{b.name}</td>
                  <td style={{ padding: "9px 14px", fontSize: 13, color: "#374151" }}>{b.rate}</td>
                  <td style={{ padding: "9px 14px" }}>
                    {b.nonResident
                      ? <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 600 }}>Yes ✓</span>
                      : <span style={{ background: "#fef3c7", color: "#d97706", borderRadius: 4, padding: "1px 7px", fontSize: 11, fontWeight: 600 }}>{b.note || "Limited"}</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function GoldenVisaSection({ sec }) {
  return (
    <div id={`section-${sec.id}`} style={{ marginBottom: 48 }}>
      <SectionHeader label={sec.sectionLabel} title={sec.title} subtitle={sec.subtitle} />
      {/* Dark banner */}
      <div style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)", borderRadius: 14, padding: "28px 32px", marginBottom: 20 }}>
        <div style={{ color: "#fbbf24", fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>UAE GOLDEN VISA</div>
        <h3 style={{ color: "#fff", fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 800, marginBottom: 10 }}>{sec.banner}</h3>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>{sec.bannerSub}</p>
        <div className="kb-gv-stats">
          {sec.stats.map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 800, color: "#f97316", marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
          <Link href="/properties" style={{ background: "#f97316", color: "#fff", borderRadius: 8, padding: "11px 22px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Browse Golden Visa Properties</Link>
          <Link href="/knowledge-base/102" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 8, padding: "11px 22px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>Full Golden Visa Guide →</Link>
        </div>
      </div>
    </div>
  );
}

function TaxSection({ sec }) {
  return (
    <div id={`section-${sec.id}`} style={{ marginBottom: 48 }}>
      <SectionHeader label={sec.sectionLabel} title={sec.title} subtitle={sec.subtitle} />
      <Callout text={sec.callout} type="info" />
      <div className="kb-table-scroll">
        <table>
          <thead>
            <tr style={{ background: "#0f172a" }}>
              {["TAX TYPE", "RATE", "DETAIL"].map(h => (
                <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sec.taxes.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "11px 16px", fontSize: 13.5, fontWeight: 600, color: "#0f172a" }}>{row.type}</td>
                <td style={{ padding: "11px 16px", fontSize: 13.5, fontWeight: 700, color: row.rate === "0%" ? "#16a34a" : "#374151" }}>{row.rate}</td>
                <td style={{ padding: "11px 16px", fontSize: 13, color: "#6b7280" }}>{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MistakesSection({ sec }) {
  return (
    <div id={`section-${sec.id}`} style={{ marginBottom: 48 }}>
      <SectionHeader label={sec.sectionLabel} title={sec.title} subtitle={sec.subtitle} />
      <div className="kb-grid-2">
        <div style={{ border: "1px solid #bbf7d0", borderRadius: 12, padding: 22, background: "#f0fdf4" }}>
          <div style={{ color: "#16a34a", fontSize: 13, fontWeight: 700, marginBottom: 14 }}>✅ What Smart Buyers Do</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {sec.smart.map((p, i) => (
              <li key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#166534", lineHeight: 1.5 }}>
                <span style={{ flexShrink: 0, marginTop: 2 }}>✓</span>{p}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ border: "1px solid #fecaca", borderRadius: 12, padding: 22, background: "#fff5f5" }}>
          <div style={{ color: "#dc2626", fontSize: 13, fontWeight: 700, marginBottom: 14 }}>⚠️ Common Mistakes to Avoid</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {sec.avoid.map((p, i) => (
              <li key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
                <span style={{ flexShrink: 0, marginTop: 2 }}>✗</span>{p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FAQSection({ sec }) {
  const [open, setOpen] = useState(null);
  const items = sec?.faqs || [];
  return (
    <div id={`section-faq`} style={{ marginBottom: 48 }}>
      <SectionHeader label={sec?.sectionLabel || "FAQ"} title={sec?.title || "Frequently Asked Questions"} subtitle={sec?.subtitle} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden" }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: open === i ? "#eff6ff" : "#fff", border: "none", cursor: "pointer", textAlign: "left", gap: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", lineHeight: 1.4 }}>{item.q}</span>
              <span style={{ color: "#1d4ed8", fontSize: 20, flexShrink: 0, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>+</span>
            </button>
            {open === i && <div style={{ padding: "4px 20px 16px", fontSize: 14, color: "#4b5563", lineHeight: 1.75 }}>{item.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderSection(sec) {
  switch (sec.type) {
    case "article":            return <ArticleSection   key={sec.id} sec={sec} />;
    case "ownership-comparison": return <OwnershipSection key={sec.id} sec={sec} />;
    case "steps":              return <StepsSection     key={sec.id} sec={sec} />;
    case "fee-table":          return <FeeTableSection  key={sec.id} sec={sec} />;
    case "areas":              return <AreasSection     key={sec.id} sec={sec} />;
    case "mortgage":           return <MortgageSection  key={sec.id} sec={sec} />;
    case "golden-visa":        return <GoldenVisaSection key={sec.id} sec={sec} />;
    case "tax-table":          return <TaxSection       key={sec.id} sec={sec} />;
    case "mistakes":           return <MistakesSection  key={sec.id} sec={sec} />;
    case "faq":                return <FAQSection       key={sec.id} sec={sec} />;
    default:                   return null;
  }
}

// ─── Content components ───────────────────────────────────────────────────────

function AuthorBox({ blog }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e8edf2", borderRadius: 12, padding: "16px 20px", marginBottom: 14, display: "flex", alignItems: "flex-start", gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 8, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🏢</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 2 }}>Globperty Research Team</div>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 3 }}>Global Property Intelligence · Expert Reviewed</div>
        <div style={{ fontSize: 12, color: "#f97316" }}>Last updated: {blog.date} · Verified against Dubai Land Department data</div>
      </div>
    </div>
  );
}

function ShareBar() {
  return (
    <div style={{ background: "#fff", border: "1px solid #e8edf2", borderRadius: 12, padding: "12px 20px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: "#6b7280", marginRight: 2 }}>Share this guide:</span>
        {["LinkedIn","WhatsApp","Facebook","Copy Link"].map(s => (
          <button key={s} onClick={() => {}} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "#374151", cursor: "pointer" }}>{s}</button>
        ))}
      </div>
      <span style={{ fontSize: 12, color: "#9ca3af" }}>⏱ 12 min read</span>
    </div>
  );
}

function HeroStats({ stats }) {
  if (!stats) return null;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
      {stats.map((s, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "18px 16px", textAlign: "center" }}>
          <div style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 800, color: "#f97316", marginBottom: 4 }}>{s.value}</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function PhotoGrid() {
  const photos = [
    { src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=640&h=500&fit=crop", label: "Dubai Skyline" },
    { src: "https://images.unsplash.com/photo-1534251369789-5f67d147eb71?w=320&h=240&fit=crop",  label: "Palm Jumeirah" },
    { src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=320&h=240&fit=crop",    label: "Burj Khalifa" },
    { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=320&h=240&fit=crop",    label: "Dubai Marina" },
    { src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=320&h=240&fit=crop",  label: "Villa Dubai" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "230px 230px", gap: 4, marginBottom: 28, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ gridRow: "1 / 3", position: "relative", background: "#1e293b" }}>
        <Image src={photos[0].src} alt={photos[0].label} fill style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 13, fontWeight: 600, padding: "4px 10px", borderRadius: 6 }}>{photos[0].label}</div>
      </div>
      {photos.slice(1).map((p, i) => (
        <div key={i} style={{ position: "relative", background: "#1e293b" }}>
          <Image src={p.src} alt={p.label} fill style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 5 }}>{p.label}</div>
          {i === 3 && <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>+24 photos</div>}
        </div>
      ))}
    </div>
  );
}

function QuickSummary({ points }) {
  return (
    <div style={{ background: "#0f172a", borderRadius: 12, padding: "22px 26px", marginBottom: 32 }}>
      <div style={{ color: "#f97316", fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>⚡ QUICK SUMMARY — KEY FACTS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {points.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(34,197,94,0.2)", border: "1px solid rgba(34,197,94,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <span style={{ color: "#4ade80", fontSize: 11 }}>✓</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13.5, lineHeight: 1.55 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function QuickFactsSidebar({ cfg }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", marginBottom: 18 }}>
      <div style={{ background: "#0f172a", padding: "13px 18px" }}>
        <div style={{ color: "#f97316", fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>{cfg.glanceIcon} {cfg.sidebarTitle}</div>
      </div>
      {cfg.glanceRows.map((row, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", borderBottom: i < cfg.glanceRows.length - 1 ? "1px solid #f1f5f9" : "none" }}>
          <span style={{ color: "#6b7280", fontSize: 12 }}>{row.label}</span>
          <GlanceVal row={row} sidebar={true} />
        </div>
      ))}
      <div style={{ padding: "12px 14px 14px", borderTop: "1px solid #f1f5f9" }}>
        <Link href={cfg.sidebarBrowseHref} style={{ display: "block", background: "#1d4ed8", color: "#fff", borderRadius: 8, padding: "11px", textAlign: "center", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>{cfg.sidebarBrowseLabel}</Link>
      </div>
    </div>
  );
}

function AIAssistantSidebar({ cfg }) {
  const [input, setInput] = useState("");
  return (
    <div style={{ background: "#1e293b", borderRadius: 12, padding: 20, marginBottom: 18, color: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
        <span style={{ fontSize: 20 }}>🤖</span>
        <div style={{ fontWeight: 700, fontSize: 15 }}>Ask AI Assistant</div>
      </div>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 14, lineHeight: 1.5 }}>Ask anything about {cfg.aiContext}</p>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder={`e.g. ${cfg.aiSuggestions[0]}`}
          style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#fff", outline: "none" }} />
        <Link href={`/copilot${input ? `?q=${encodeURIComponent(input)}` : ""}`}
          style={{ background: "#f97316", borderRadius: 8, width: 36, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", flexShrink: 0, fontSize: 16, color: "#fff" }}>→</Link>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {cfg.aiSuggestions.map((s, i) => (
          <Link key={i} href={`/copilot?q=${encodeURIComponent(s)}`}
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "4px 10px", fontSize: 11, color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>{s}</Link>
        ))}
      </div>
    </div>
  );
}

function GoldenVisaSidebar({ gv }) {
  if (!gv) return null;
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 18 }}>
      <div style={{ background: "#f97316", padding: "13px 18px" }}>
        <div style={{ color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>{gv.icon} {gv.title}</div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #fed7aa", borderTop: "none" }}>
        {gv.rows.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", borderBottom: i < gv.rows.length - 1 ? "1px solid #f1f5f9" : "none" }}>
            <span style={{ color: "#6b7280", fontSize: 12 }}>{row.label}</span>
            <GlanceVal row={row} sidebar={true} />
          </div>
        ))}
        <div style={{ padding: "12px 14px 14px" }}>
          <Link href={gv.href} style={{ display: "block", background: "#f97316", color: "#fff", borderRadius: 8, padding: "10px", textAlign: "center", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>{gv.cta}</Link>
        </div>
      </div>
    </div>
  );
}

function RelatedGuidesSidebar({ currentId }) {
  const others = blogArticles4.filter(g => g.id !== currentId).slice(0, 5);
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ background: "#f8fafc", padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>📚 RELATED GUIDES</div>
      </div>
      {others.map((g, i) => (
        <Link key={i} href={`/knowledge-base/${g.id}`} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 14px", borderBottom: i < others.length - 1 ? "1px solid #f1f5f9" : "none", textDecoration: "none" }}>
          <span style={{ background: "#fff7ed", color: "#f97316", borderRadius: 4, padding: "2px 6px", fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{g.tag}</span>
          <span style={{ fontSize: 12, color: "#374151", fontWeight: 500, lineHeight: 1.4 }}>{g.title}</span>
        </Link>
      ))}
    </div>
  );
}

// ─── Related guides bottom ────────────────────────────────────────────────────

function RelatedGuidesBottom({ currentId }) {
  const guides = blogArticles4.filter(g => g.id !== currentId).slice(0, 3);
  return (
    <div style={{ marginTop: 48 }}>
      <div style={{ display: "inline-block", background: "#fff7ed", color: "#f97316", borderRadius: 6, padding: "3px 12px", fontSize: 11, fontWeight: 800, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Continue Reading</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "#0f172a" }}>Related Guides You Should Read</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
        {guides.map((g, i) => (
          <Link key={i} href={`/knowledge-base/${g.id}`} style={{ textDecoration: "none", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", display: "block" }}>
            {g.imageSrc && <div style={{ height: 150, position: "relative" }}><Image src={g.imageSrc} alt={g.title} fill style={{ objectFit: "cover" }} /></div>}
            <div style={{ padding: "16px 18px" }}>
              <span style={{ background: "#fff7ed", color: "#f97316", borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{g.tag}</span>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginTop: 10, marginBottom: 6, lineHeight: 1.45 }}>{g.title}</h4>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5, margin: 0 }}>{g.description?.slice(0, 90)}…</p>
              <div style={{ marginTop: 12, fontSize: 12, color: "#f97316", fontWeight: 600 }}>Read Guide →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function GuideDetails({ blog }) {
  const heroCfgOverride = GUIDE_CONTENT[blog.id]?.heroCfg;
  const cfg = heroCfgOverride
    ? { ...(TAG_CFG[blog.tag] || DEFAULT_CFG), ...heroCfgOverride }
    : (TAG_CFG[blog.tag] || DEFAULT_CFG);
  const structured = GUIDE_CONTENT[blog.id];
  const sections = structured?.sections || [];
  const tabs = sections.length > 0 ? sections.map(s => s.tabLabel) : cfg.tabs;
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sections.length === 0) return;
      const scroll = window.scrollY + 140;
      let active = 0;
      sections.forEach((sec, i) => {
        const el = document.getElementById(`section-${sec.id}`);
        if (el && scroll >= el.offsetTop) active = i;
      });
      setActiveTab(active);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const quickSummaryPoints = structured ? sections.find(s => s.type === "article") ? [
    "Foreigners of all nationalities can buy freehold property in 40+ designated zones in Dubai",
    "Zero income tax, zero capital gains tax and zero rental income tax in the UAE",
    "Total transaction costs are approximately 7–8% above the purchase price",
    "Property worth AED 2,000,000+ qualifies you for the 10-year UAE Golden Visa",
    "Dubai recorded 120,000+ property transactions in 2023 — a historic record",
  ] : cfg.quickSummary || [] : [];

  return (
    <>
      <style>{`
        .kb-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .kb-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px}
        .kb-gv-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        .kb-table-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden}
        .kb-table-scroll table{width:100%;border-collapse:collapse;min-width:500px}
        .kb-mortgage-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
        @media(max-width:991px){
          .kb-grid-3{grid-template-columns:1fr 1fr !important}
          .kb-mortgage-grid{grid-template-columns:1fr !important}
        }
        @media(max-width:767px){
          .kb-grid-2{grid-template-columns:1fr !important}
          .kb-grid-3{grid-template-columns:1fr !important}
          .kb-gv-stats{grid-template-columns:1fr 1fr !important}
          .kb-mortgage-grid{grid-template-columns:1fr !important}
          .kb-table-scroll table{min-width:420px}
        }
        @media(max-width:480px){
          .kb-gv-stats{grid-template-columns:1fr 1fr !important}
        }
      `}</style>
      <Hero blog={blog} cfg={cfg} />
      <TabNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} sections={sections} />

      <div style={{ background: "#f8fafc" }}>
        <div className="tf-container" style={{ paddingTop: 32, paddingBottom: 80 }}>
          <div className="row" style={{ alignItems: "flex-start" }}>
            {/* ── Main content ── */}
            <div className="col-lg-8">
              <AuthorBox blog={blog} />
              <ShareBar />

              {structured ? (
                <>
                  <PhotoGrid />
                  <QuickSummary points={quickSummaryPoints} />
                  {structured.heroStats && <HeroStats stats={structured.heroStats} />}
                  {sections.map(sec => renderSection(sec))}
                </>
              ) : (
                <>
                  {blog.imageSrc && (
                    <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 24, position: "relative", height: 300 }}>
                      <Image src={blog.imageSrc} alt={blog.title} fill style={{ objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{ background: "#fff", borderRadius: 16, padding: "32px 36px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", marginBottom: 32 }}>
                    <div className="article-content" style={{ fontSize: 15, lineHeight: 1.85, color: "#374151" }} dangerouslySetInnerHTML={{ __html: blog.content }} />
                  </div>
                  <FAQSection sec={{ sectionLabel: "FAQ", title: "Frequently Asked Questions", faqs: [] }} />
                </>
              )}

              <RelatedGuidesBottom currentId={blog.id} />
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 16, marginTop: 32, fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>
                <strong style={{ color: "#64748b" }}>Disclaimer: </strong>
                This guide is for educational purposes only and does not constitute financial, legal, or investment advice. Always consult qualified local professionals before making investment decisions.
              </div>
            </div>

            {/* ── Sticky sidebar ── */}
            <div className="col-lg-4">
              <div style={{ position: "sticky", top: 68, paddingLeft: 16 }}>
                <QuickFactsSidebar cfg={cfg} />
                <AIAssistantSidebar cfg={cfg} />
                <GoldenVisaSidebar gv={cfg.goldenVisa} />
                <RelatedGuidesSidebar currentId={blog.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
