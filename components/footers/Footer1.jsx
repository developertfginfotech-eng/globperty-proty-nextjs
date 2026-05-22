"use client";
import React, { useState } from "react";
import Link from "next/link";

const PROPERTIES = [
  { label: "Buy Property Abroad",        href: "/listings?status=buy" },
  { label: "Rent Property Abroad",       href: "/listings?status=rent" },
  { label: "Sell Your Property",         href: "/add-property" },
  { label: "Short Stay / Holiday Let",   href: "/listings?type=short-stay" },
  { label: "Student Housing",            href: "/listings?type=student" },
  { label: "Shared / Roommate Housing",  href: "/listings?type=shared" },
  { label: "New Projects & Off-Plan",    href: "/project-list" },
  { label: "Luxury Properties",          href: "/listings?type=luxury" },
  { label: "Commercial Property",        href: "/listings?type=Office" },
  { label: "Apartments & Flats",         href: "/listings?type=Apartment" },
  { label: "Villas & Houses",            href: "/listings?type=Villa" },
  { label: "Townhouses",                 href: "/listings?type=townhouse" },
  { label: "Penthouses",                 href: "/listings?type=Penthouse" },
  { label: "Land & Plots",               href: "/listings?type=land" },
  { label: "Beachfront Properties",      href: "/listings?type=beachfront" },
  { label: "Investment Properties",      href: "/listings?purpose=invest" },
];

const KNOWLEDGE_BASE = [
  { label: "Country Investment Guides",  href: "/blog-grid" },
  { label: "City & Area Guides",         href: "/blog-grid" },
  { label: "Property Market Reports",    href: "/blog-grid" },
  { label: "Golden Visa Guides",         href: "/blog-grid" },
  { label: "Legal & Ownership Rules",    href: "/blog-grid" },
  { label: "Tax Guides by Country",      href: "/blog-grid" },
  { label: "Expat Living Guides",        href: "/blog-grid" },
  { label: "Student Housing Guide",      href: "/blog-grid" },
  { label: "Airbnb Investment Guide",    href: "/blog-grid" },
  { label: "Off-Plan Buying Guide",      href: "/blog-grid" },
  { label: "Mortgage Guides",            href: "/home-loan-process" },
  { label: "NRI Property Guide",         href: "/blog-grid" },
  { label: "Relocation Guide",           href: "/blog-grid" },
  { label: "Commercial Property Guide",  href: "/blog-grid" },
  { label: "News & Market Updates",      href: "/blog-grid" },
  { label: "Property Glossary",          href: "/blog-grid" },
];

const TOOLS_FINANCE = [
  { label: "Rental Yield Calculator",    href: "/rental-yield" },
  { label: "ROI & Growth Estimator",     href: "/roi-calculator" },
  { label: "Mortgage Calculator",        href: "/home-loan-process" },
  { label: "Currency Converter",         href: "/currency-converter" },
  { label: "Visa Eligibility Checker",   href: "/contact" },
  { label: "Airbnb Income Estimator",    href: "/rental-yield" },
  { label: "Cost of Buying Calculator",  href: "/cost-of-buying" },
  { label: "Country Comparison Tool",    href: "/compare" },
  { label: "Neighbourhood Explorer",     href: "/listings" },
  { label: "AI Property Assistant",      href: "/copilot" },
  { label: "Mortgage Partners",          href: "/finance-partner" },
  { label: "Compare Mortgages",          href: "/home-loan-process" },
  { label: "Property Insurance",         href: "/contact" },
  { label: "Legal Services",             href: "/legal-partner" },
  { label: "Tax Advisory",               href: "/contact" },
  { label: "Islamic Finance",            href: "/contact" },
];

const COMPANY = [
  { label: "About Globperty",  href: "/about" },
  { label: "Our Story",        href: "/about" },
  { label: "Careers",          href: "/contact" },
  { label: "Press & Media",    href: "/contact" },
  { label: "Blog",             href: "/blog-grid" },
  { label: "Contact Us",       href: "/contact" },
  { label: "FAQ",              href: "/faq" },
];

const FOR_AGENTS = [
  { label: "List Your Properties", badge: "FREE", href: "/list-your-properties" },
  { label: "Create Agent Profile",              href: "/my-profile" },
  { label: "Agent Dashboard",                   href: "/dashboard" },
  { label: "Buy Leads",                         href: "/buy-leads" },
  { label: "Developer Packages",                href: "/developer-packages" },
  { label: "Exhibit at Expo",                   href: "/virtual-expo" },
  { label: "Advertise",                         href: "/advertise" },
  { label: "Partner With Us",                   href: "/partner" },
];

const COUNTRY_CARDS = [
  { flag: "🇦🇪", name: "Dubai, UAE",    desc: "8.2% avg yield · 0% tax · 200K+ new residents/yr", badge: "6–9% Yield",   badgeColor: "#16a34a", trending: true,  href: "/countries/uae" },
  { flag: "🇵🇹", name: "Portugal",      desc: "+48% prices in 5yrs · 63% of Lisbon sales are foreign", badge: "Golden Visa",  badgeColor: "#2563eb", trending: true,  href: "/countries/portugal" },
  { flag: "🇹🇷", name: "Turkey",        desc: "Full citizenship from $400K · 60K+ foreign sales 2024",  badge: "Citizenship",  badgeColor: "#ea580c", trending: true,  href: "/countries/turkey" },
  { flag: "🇨🇾", name: "Cyprus",        desc: "EU PR from €300K · lowest threshold in Europe",           badge: "EU Residency", badgeColor: "#7c3aed", trending: false, href: "/countries/cyprus" },
  { flag: "🇦🇺", name: "Australia",     desc: "Record migration 2024 · Sydney & Melbourne booming",      badge: "Top Liveable", badgeColor: "#7c3aed", trending: false, href: "/countries/australia" },
  { flag: "🇲🇾", name: "Malaysia",      desc: "MM2H visa · affordable living · English spoken",           badge: "5–7% Yield",   badgeColor: "#16a34a", trending: false, href: "/countries/malaysia" },
  { flag: "🇲🇹", name: "Malta",         desc: "EU English-speaking island · MPRP programme",             badge: "EU Residency", badgeColor: "#7c3aed", trending: false, href: "/countries/malta" },
  { flag: "🇵🇭", name: "Philippines",   desc: "6%+ GDP growth · beach & city investment options",        badge: "6–9% Yield",   badgeColor: "#16a34a", trending: false, href: "/countries/philippines" },
  { flag: "🇭🇺", name: "Hungary",       desc: "New EU visa from €250K · flat 15% income tax",            badge: "New GIV",      badgeColor: "#ea580c", trending: false, href: "/countries/hungary" },
  { flag: "🇨🇦", name: "Canada",        desc: "World's top immigration destination · Toronto rising",    badge: "High Demand",  badgeColor: "#7c3aed", trending: false, href: "/countries/canada" },
  { flag: "🇺🇸", name: "USA",           desc: "Miami · NYC · LA — global wealth magnet",                 badge: "Global Hub",   badgeColor: "#ea580c", trending: false, href: "/countries/usa" },
  { flag: "🇱🇻", name: "Latvia",        desc: "EU residency · Riga undervalued · €250K entry",           badge: "EU Residency", badgeColor: "#7c3aed", trending: false, href: "/countries/latvia" },
];

const COUNTRY_PILLS = [
  { flag: "🇦🇪", name: "UAE",         href: "/countries/uae" },
  { flag: "🇺🇸", name: "USA",         href: "/countries/usa" },
  { flag: "🇵🇹", name: "Portugal",    href: "/countries/portugal" },
  { flag: "🇨🇦", name: "Canada",      href: "/countries/canada" },
  { flag: "🇦🇺", name: "Australia",   href: "/countries/australia" },
  { flag: "🇹🇷", name: "Turkey",      href: "/countries/turkey" },
  { flag: "🇨🇾", name: "Cyprus",      href: "/countries/cyprus" },
  { flag: "🇲🇹", name: "Malta",       href: "/countries/malta" },
  { flag: "🇭🇺", name: "Hungary",     href: "/countries/hungary" },
  { flag: "🇱🇻", name: "Latvia",      href: "/countries/latvia" },
  { flag: "🇵🇭", name: "Philippines", href: "/countries/philippines" },
  { flag: "🇲🇾", name: "Malaysia",    href: "/countries/malaysia" },
];

const POPULAR_GUIDES = [
  [
    { label: "How to Buy Property in Dubai", href: "/blog-grid" },
    { label: "Buying Property in Portugal", href: "/blog-grid" },
    { label: "Cyprus Permanent Residency", href: "/blog-grid" },
    { label: "Best Areas to Invest in Dubai", href: "/blog-grid" },
    { label: "International Property Investment", href: "/blog-grid" },
    { label: "Expat Guide — Living in Portugal", href: "/blog-grid" },
  ],
  [
    { label: "Portugal Golden Visa 2025", href: "/blog-grid" },
    { label: "Buying Property in Turkey", href: "/blog-grid" },
    { label: "Malta Residency Programme", href: "/blog-grid" },
    { label: "Dubai Rental Yield by Area 2025", href: "/blog-grid" },
    { label: "Getting a Mortgage Abroad", href: "/home-loan-process" },
    { label: "Best Countries to Retire Abroad", href: "/blog-grid" },
  ],
  [
    { label: "Turkey Citizenship by Investment", href: "/blog-grid" },
    { label: "Buying Property in Australia", href: "/blog-grid" },
    { label: "Hungary Guest Investor Visa", href: "/blog-grid" },
    { label: "Airbnb Investment Dubai 2025", href: "/blog-grid" },
    { label: "Cost of Living in Dubai", href: "/blog-grid" },
    { label: "Student Housing in Australia", href: "/blog-grid" },
  ],
  [
    { label: "UAE Golden Visa Guide", href: "/blog-grid" },
    { label: "Buying Property in Canada", href: "/blog-grid" },
    { label: "Latvia EU Residency Guide", href: "/blog-grid" },
    { label: "Off-Plan Property Guide Dubai", href: "/blog-grid" },
    { label: "Expat Guide — Living in Dubai", href: "/blog-grid" },
    { label: "Student Housing in UK", href: "/blog-grid" },
  ],
];

const TRUST_ITEMS = [
  "Verified Agents & Developers",
  "12 Countries · 40+ Cities",
  "AI-Powered Property Search",
  "Golden Visa Experts",
  "Free for Buyers",
  "24/7 AI Support",
  "Globperty LLC · USA",
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use",   href: "/terms" },
  { label: "Cookie Policy",  href: "/cookies" },
  { label: "Disclaimer",     href: "/disclaimer" },
  { label: "GDPR",           href: "/gdpr" },
  { label: "Sitemap",        href: "/sitemap" },
];

export default function Footer1() {
  const [email, setEmail] = useState("");

  return (
    <footer style={{ background: "#0d1b2a", color: "#c9d1d9", fontFamily: "inherit" }}>

      {/* Newsletter Banner */}
      <div className="glb-footer-newsletter" style={{ background: "#112240", borderBottom: "1px solid #1a3050", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 20 }}>🌍</span>
            <strong style={{ color: "#fff", fontSize: 16 }}>Stay ahead of global property markets</strong>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "#8b949e" }}>Get weekly investment insights, Golden Visa updates &amp; exclusive property deals — free</p>
        </div>
        <div className="glb-footer-newsletter-form" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid #1a3050", background: "#0d1b2a", color: "#c9d1d9", fontSize: 14, width: 260, outline: "none" }}
          />
          <button
            onClick={() => setEmail("")}
            style={{ padding: "10px 20px", borderRadius: 8, background: "#f0822d", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
          >
            Subscribe Free
          </button>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="glb-footer-section" style={{ padding: "48px 40px 32px", maxWidth: 1400, margin: "0 auto" }}>
        <div className="glb-footer-cols" style={{ display: "grid", gridTemplateColumns: "260px 1fr 1fr 1fr 1fr", gap: 40 }}>

          {/* Brand column */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>Glob</span><span style={{ fontSize: 26, fontWeight: 800, color: "#f0822d" }}>perty</span>
            </div>
            <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.7, marginBottom: 20 }}>
              Your global real estate intelligence platform. Buy, sell, rent and invest in properties across 12 countries — powered by AI and deep market knowledge.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {[
                { icon: "icon-linked", href: "#" },
                { icon: "icon-fb",     href: "#" },
                { icon: "icon-ins",    href: "#" },
                { icon: "icon-X",      href: "#" },
              ].map((s, i) => (
                <a key={i} href={s.href} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, background: "#1a3050", border: "1px solid #243b55", borderRadius: 8, color: "#c9d1d9", fontSize: 14, textDecoration: "none" }}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1a3050", border: "1px solid #243b55", borderRadius: 8, padding: "8px 14px", fontSize: 12, color: "#c9d1d9", textDecoration: "none" }}>
                <i className="icon-apple" style={{ fontSize: 16 }} /> App Store
              </a>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1a3050", border: "1px solid #243b55", borderRadius: 8, padding: "8px 14px", fontSize: 12, color: "#c9d1d9", textDecoration: "none" }}>
                <i className="icon-google-play" style={{ fontSize: 16 }} /> Google Play
              </a>
            </div>
          </div>

          {/* Properties */}
          <div>
            <h6 style={{ color: "#fff", fontWeight: 700, fontSize: 11, letterSpacing: 1.2, marginBottom: 16, textTransform: "uppercase" }}>Properties</h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {PROPERTIES.map(item => (
                <li key={item.label} style={{ marginBottom: 8 }}>
                  <Link href={item.href} style={{ fontSize: 13, color: "#8b949e", textDecoration: "none" }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Knowledge Base */}
          <div>
            <h6 style={{ color: "#fff", fontWeight: 700, fontSize: 11, letterSpacing: 1.2, marginBottom: 16, textTransform: "uppercase" }}>Knowledge Base</h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {KNOWLEDGE_BASE.map(item => (
                <li key={item.label} style={{ marginBottom: 8 }}>
                  <Link href={item.href} style={{ fontSize: 13, color: "#8b949e", textDecoration: "none" }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Finance */}
          <div>
            <h6 style={{ color: "#fff", fontWeight: 700, fontSize: 11, letterSpacing: 1.2, marginBottom: 16, textTransform: "uppercase" }}>Tools &amp; Finance</h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {TOOLS_FINANCE.map(item => (
                <li key={item.label} style={{ marginBottom: 8 }}>
                  <Link href={item.href} style={{ fontSize: 13, color: "#8b949e", textDecoration: "none" }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + For Agents */}
          <div>
            <h6 style={{ color: "#fff", fontWeight: 700, fontSize: 11, letterSpacing: 1.2, marginBottom: 16, textTransform: "uppercase" }}>Company</h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 28 }}>
              {COMPANY.map(item => (
                <li key={item.label} style={{ marginBottom: 8 }}>
                  <Link href={item.href} style={{ fontSize: 13, color: "#8b949e", textDecoration: "none" }}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <h6 style={{ color: "#fff", fontWeight: 700, fontSize: 11, letterSpacing: 1.2, marginBottom: 16, textTransform: "uppercase" }}>For Agents</h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {FOR_AGENTS.map(item => (
                <li key={item.label} style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <Link href={item.href} style={{ fontSize: 13, color: "#8b949e", textDecoration: "none" }}>{item.label}</Link>
                  {item.badge && (
                    <span style={{ fontSize: 10, background: "#f0822d", color: "#fff", fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>{item.badge}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Country Destination Cards */}
      <div className="glb-footer-section" style={{ borderTop: "1px solid #1a3050", padding: "40px 40px 32px", maxWidth: 1400, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#6e7681", textTransform: "uppercase", marginBottom: 24 }}>
          Where People Are Moving &amp; Buying in 2025
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 32 }}>
          {COUNTRY_CARDS.map(c => (
            <Link key={c.name} href={c.href} style={{ textDecoration: "none", position: "relative", background: "#112240", border: "1px solid #1a3050", borderRadius: 10, padding: "14px 12px", display: "block" }}>
              {c.trending && (
                <span style={{ position: "absolute", top: -1, right: 10, background: "#f0822d", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: "0 0 6px 6px", letterSpacing: 0.5 }}>Trending</span>
              )}
              <div style={{ fontSize: 22, marginBottom: 6 }}>{c.flag}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "#6e7681", lineHeight: 1.5, marginBottom: 8 }}>{c.desc}</div>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: c.badgeColor, padding: "2px 8px", borderRadius: 4 }}>{c.badge}</span>
            </Link>
          ))}
        </div>

        {/* Country Pills */}
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#6e7681", textTransform: "uppercase", marginBottom: 12 }}>
          Browse Properties by Country
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {COUNTRY_PILLS.map(p => (
            <Link key={p.name} href={p.href} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#112240", border: "1px solid #1a3050", borderRadius: 20, padding: "6px 14px", fontSize: 13, color: "#c9d1d9", textDecoration: "none" }}>
              <span>{p.flag}</span>{p.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Guides */}
      <div className="glb-footer-section" style={{ borderTop: "1px solid #1a3050", padding: "32px 40px", maxWidth: 1400, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#6e7681", textTransform: "uppercase", marginBottom: 20 }}>Popular Guides &amp; Resources</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0 24px" }}>
          {POPULAR_GUIDES.map((col, ci) => (
            <ul key={ci} style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {col.map((item, li) => (
                <li key={li} style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#f0822d", flexShrink: 0 }} />
                  <Link
                    href={item.href}
                    style={{ fontSize: 13, color: "#8b949e", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#ffffff"}
                    onMouseLeave={e => e.currentTarget.style.color = "#8b949e"}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* AI Property Assistant Bar */}
      <div style={{ background: "#0a1628", borderTop: "1px solid #1a3050", borderBottom: "1px solid #1a3050", padding: "18px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>✨</div>
              <span style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>AI Property Assistant</span>
              <span style={{ color: "#8b949e", fontSize: 13 }}>— ask anything about buying or investing globally</span>
            </div>
            <div style={{ display: "flex", flex: 1, minWidth: 280, gap: 8, alignItems: "center", marginLeft: "auto" }}>
              <input
                type="text"
                placeholder="e.g. Which country gives best yield under $300K?"
                style={{ flex: 1, padding: "9px 14px", borderRadius: 8, border: "1px solid #1a3050", background: "#112240", color: "#c9d1d9", fontSize: 13, outline: "none" }}
              />
              <Link href="/copilot" style={{ padding: "9px 18px", borderRadius: 8, background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: 13, textDecoration: "none", whiteSpace: "nowrap" }}>
                Ask AI →
              </Link>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Best Golden Visa for me?","Dubai vs Portugal","Highest yield 2025","Where should I invest $500K?"].map(q => (
              <Link key={q} href={`/copilot?q=${encodeURIComponent(q)}`} style={{ fontSize: 12, color: "#8b949e", border: "1px solid #1a3050", borderRadius: 20, padding: "4px 12px", textDecoration: "none" }}>
                {q}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div style={{ borderTop: "1px solid #1a3050", padding: "14px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "8px 28px", alignItems: "center" }}>
          {TRUST_ITEMS.map(item => (
            <span key={item} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#8b949e" }}>
              <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Legal / Bottom bar */}
      <div style={{ borderTop: "1px solid #1a3050", padding: "20px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p style={{ fontSize: 12, color: "#6e7681", marginBottom: 2 }}>© 2025 Globperty LLC. All rights reserved. Registered in the United States of America.</p>
          <p style={{ fontSize: 12, color: "#6e7681", marginBottom: 14 }}>Independent property portal. All listings provided by verified third-party agents. Globperty does not provide legal, financial or immigration advice.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 0", alignItems: "center" }}>
            {LEGAL_LINKS.map((l, i) => (
              <span key={l.label} style={{ display: "flex", alignItems: "center" }}>
                <Link href={l.href} style={{ fontSize: 12, color: "#6e7681", textDecoration: "none" }}>{l.label}</Link>
                {i < LEGAL_LINKS.length - 1 && <span style={{ margin: "0 10px", color: "#1a3050" }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
