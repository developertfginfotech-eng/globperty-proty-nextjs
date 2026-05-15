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

const COUNTRIES = [
  {
    flag: "🇦🇪", name: "UAE Properties",
    links: ["Buy Property in Dubai","Rent Property in Dubai","Apartments in Dubai Marina","Villas in Palm Jumeirah","Property in Downtown Dubai","Buy Property in Abu Dhabi","Property in Sharjah","Dubai Off-Plan Projects","Dubai Golden Visa Property","Invest in UAE Real Estate"],
  },
  {
    flag: "🇵🇹", name: "Portugal Properties",
    links: ["Buy Property in Portugal","Property in Lisbon","Property in Porto","Algarve Property for Sale","Portugal Golden Visa Property","Madeira Property","Holiday Homes in Portugal","Apartments in Lisbon","Invest in Portugal Real Estate","Portugal Property for Indians"],
  },
  {
    flag: "🇹🇷", name: "Turkey Properties",
    links: ["Buy Property in Turkey","Property in Istanbul","Apartments in Antalya","Villas in Bodrum","Turkey Citizenship Property","Property in Izmir","Beachfront Property Turkey","Off-Plan in Istanbul","Invest in Turkey Real Estate","Turkey Property for Indians"],
  },
  {
    flag: "🇦🇺", name: "Australia Properties",
    links: ["Buy Property in Australia","Property in Sydney","Property in Melbourne","Apartments in Brisbane","Perth Property for Sale","Student Housing Sydney","Student Housing Melbourne","Investment Property Australia","Rent in Sydney","NRI Property in Australia"],
  },
  {
    flag: "🇺🇸", name: "USA Properties",
    links: ["Buy Property in USA","Property in Miami","Property in New York","Property in Los Angeles","Texas Real Estate","Student Housing in USA","Condos in Miami Beach","Invest in US Real Estate","Florida Property for Sale","NRI Property in USA"],
  },
  {
    flag: "🇨🇦", name: "Canada Properties",
    links: ["Buy Property in Canada","Property in Toronto","Property in Vancouver","Calgary Real Estate","Montreal Property","Student Housing Toronto","Student Housing Vancouver","Invest in Canada Real Estate","NRI Property in Canada","Condos in Toronto"],
  },
  {
    flag: "🇨🇾", name: "Cyprus Properties",
    links: ["Buy Property in Cyprus","Property in Limassol","Property in Paphos","Nicosia Real Estate","Cyprus Residency Property","Larnaca Property","Beachfront Cyprus Property","Villas in Cyprus","Invest in Cyprus","Cyprus Property for Indians"],
  },
  {
    flag: "🇲🇹", name: "Malta Properties",
    links: ["Buy Property in Malta","Property in Sliema","Property in St Julian's","Valletta Real Estate","Malta Residency Property","Gozo Property for Sale","Apartments in Malta","Invest in Malta","Malta Property for Indians","Holiday Homes Malta"],
  },
  {
    flag: "🇲🇾", name: "Malaysia Properties",
    links: ["Buy Property in Malaysia","Property in Kuala Lumpur","Property in Penang","Johor Bahru Real Estate","Malaysia MM2H Property","Langkawi Property","Student Housing Malaysia","Condos in KL","Invest in Malaysia","Malaysia Property for Indians"],
  },
  {
    flag: "🇵🇭", name: "Philippines Properties",
    links: ["Buy Property in Philippines","Property in Manila","Property in Cebu","Davao Real Estate","Condos in BGC Manila","Boracay Property","Makati Property","Invest in Philippines","Holiday Homes Philippines","Rental Property Manila"],
  },
  {
    flag: "🇭🇺", name: "Hungary Properties",
    links: ["Buy Property in Hungary","Property in Budapest","Hungary Guest Investor Visa","Apartments in Budapest","Invest in Hungary","Budapest Investment Property","Hungary Property for Indians","Student Housing Budapest","Commercial Property Hungary","Holiday Homes Hungary"],
  },
  {
    flag: "🇱🇻", name: "Latvia Properties",
    links: ["Buy Property in Latvia","Property in Riga","Jurmala Property for Sale","Latvia Residency Property","Apartments in Riga","Invest in Latvia","Latvia Property for Indians","Beach Property Latvia","Commercial Property Riga","EU Residency via Latvia"],
  },
];

const POPULAR_SEARCHES = [
  "Apartments Abroad","Villas for Sale","Golden Visa Properties","Beachfront Homes",
  "Student Accommodation","Holiday Lets","Off-Plan Properties","Luxury Penthouses",
  "NRI Investment","Commercial Property","Airbnb Properties","Residency by Investment",
  "Land & Plots","Townhouses","New Launches 2025",
];

const POPULAR_GUIDES = [
  "How to Buy Property in Dubai as Indian","Portugal Golden Visa Guide 2025","Turkey Citizenship by Investment",
  "Can Foreigners Buy in Malaysia","Best Areas to Invest in Dubai","Rental Yield Dubai Marina",
  "Cyprus Permanent Residency Guide","Student Housing in Sydney","Malta Residency Programme 2025",
  "Philippines Property Foreign Buyers","Hungary Guest Investor Visa","NRI Buying Property Abroad Guide",
  "Latvia EU Residency via Property","Airbnb Investment Dubai 2025","Off-Plan Property Dubai Guide",
  "Property Tax in Portugal Explained","Best Cities to Invest in Turkey","Student Accommodation Melbourne",
  "Buy Property in Lisbon as Foreigner","ROI Buying Property in Cyprus","Cost of Living in Dubai for Indians",
  "Toronto Condo Investment Guide","Malaysia MM2H Visa 2025","How to Get UAE Golden Visa",
];

const TRUST_BADGES = [
  { icon: "✅", text: "Verified Agents & Developers" },
  { icon: "🌍", text: "12 Countries · 40+ Cities" },
  { icon: "🔍", text: "AI-Powered Search" },
  { icon: "🪪", text: "Golden Visa Experts" },
  { icon: "🎓", text: "Student Housing Specialists" },
  { icon: "🔒", text: "Secure & GDPR Compliant" },
  { icon: "💬", text: "24/7 AI Support" },
  { icon: "🏛", text: "Globperty LLC · USA" },
];

const LEGAL_LINKS = ["Privacy Policy","Terms of Use","Cookie Policy","Disclaimer","GDPR Compliance","Sitemap","Accessibility"];

export default function Footer1() {
  const [email, setEmail] = useState("");

  return (
    <footer style={{ background: "#0d1b2a", color: "#c9d1d9", fontFamily: "inherit" }}>

      {/* Newsletter Banner */}
      <div style={{ background: "#112240", borderBottom: "1px solid #1a3050", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 20 }}>🌍</span>
            <strong style={{ color: "#fff", fontSize: 16 }}>Stay ahead of global property markets</strong>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "#8b949e" }}>Get weekly investment insights, Golden Visa updates &amp; exclusive property deals — free</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
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
      <div style={{ padding: "48px 40px 32px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 1fr 1fr 1fr", gap: 40 }}>

          {/* Brand column */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>Glob</span><span style={{ fontSize: 26, fontWeight: 800, color: "#f0822d" }}>perty</span>
            </div>
            <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.7, marginBottom: 20 }}>
              Your global real estate intelligence platform. Buy, sell, rent and invest in properties across 12 countries — powered by AI and deep market knowledge.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {[{icon:"💼",label:"LinkedIn"},{icon:"📘",label:"Facebook"},{icon:"📸",label:"Instagram"},{icon:"▶️",label:"YouTube"},{icon:"💬",label:"WhatsApp"},{icon:"✖",label:"Twitter/X"}].map(s => (
                <a key={s.label} href="#" style={{ display: "flex", alignItems: "center", gap: 5, background: "#1a3050", border: "1px solid #1a3050", borderRadius: 6, padding: "5px 10px", fontSize: 12, color: "#c9d1d9", textDecoration: "none" }}>
                  <span>{s.icon}</span>{s.label}
                </a>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, background: "#1a3050", border: "1px solid #1a3050", borderRadius: 8, padding: "8px 14px", fontSize: 12, color: "#8b949e", textDecoration: "none" }}>
                <span>📱</span> App Store — Coming Soon
              </a>
              <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, background: "#1a3050", border: "1px solid #1a3050", borderRadius: 8, padding: "8px 14px", fontSize: 12, color: "#8b949e", textDecoration: "none" }}>
                <span>🤖</span> Google Play — Coming Soon
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

      {/* Country Grid */}
      <div style={{ borderTop: "1px solid #1a3050", padding: "40px 40px", maxWidth: 1400, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#6e7681", textTransform: "uppercase", marginBottom: 32 }}>
          Browse Properties by Country &amp; City — All Destinations
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px 24px" }}>
          {COUNTRIES.map(c => (
            <div key={c.name}>
              <h6 style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
                {c.flag} {c.name}
              </h6>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {c.links.map(l => (
                  <li key={l} style={{ marginBottom: 5 }}>
                    <a href="#" style={{ fontSize: 12, color: "#6e7681", textDecoration: "none" }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Searches */}
      <div style={{ borderTop: "1px solid #1a3050", padding: "28px 40px", maxWidth: 1400, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: "#6e7681", textTransform: "uppercase", marginBottom: 14 }}>Popular Searches:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {POPULAR_SEARCHES.map(s => (
            <a key={s} href="#" style={{ fontSize: 12, color: "#8b949e", border: "1px solid #1a3050", borderRadius: 20, padding: "5px 14px", textDecoration: "none", whiteSpace: "nowrap" }}>{s}</a>
          ))}
        </div>
      </div>

      {/* Popular Guides */}
      <div style={{ borderTop: "1px solid #1a3050", padding: "24px 40px", maxWidth: 1400, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: "#6e7681", textTransform: "uppercase", marginBottom: 12 }}>Popular Guides &amp; Resources</p>
        <p style={{ fontSize: 12, color: "#6e7681", lineHeight: 2 }}>
          {POPULAR_GUIDES.map((g, i) => (
            <span key={g}>
              <a href="#" style={{ color: "#6e7681", textDecoration: "none" }}>{g}</a>
              {i < POPULAR_GUIDES.length - 1 && <span style={{ margin: "0 8px" }}>·</span>}
            </span>
          ))}
        </p>
      </div>

      {/* Trust Badges */}
      <div style={{ borderTop: "1px solid #1a3050", padding: "20px 40px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 32px" }}>
          {TRUST_BADGES.map(b => (
            <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8b949e" }}>
              <span>{b.icon}</span><span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Nav Bar */}
      <div style={{ borderTop: "1px solid #1a3050", padding: "16px 40px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 0", alignItems: "center" }}>
          {[
            { label: "Properties", href: "/listings" },
            { label: "Countries", href: "/countries/uae" },
            { label: "Guides", href: "/blog-grid" },
            { label: "Visas", href: "/contact" },
            { label: "Tools", href: "/compare" },
            { label: "Finance", href: "/home-loan-process" },
            { label: "Events", href: "/contact" },
            { label: "Agents", href: "/agency-grid" },
            { label: "Contact", href: "/contact" },
          ].map((item, i, arr) => (
            <span key={item.label} style={{ display: "flex", alignItems: "center" }}>
              <a href={item.href} style={{ fontSize: 12, color: "#8b949e", textDecoration: "none", fontWeight: 500 }}>{item.label}</a>
              {i < arr.length - 1 && <span style={{ margin: "0 10px", color: "#1a3050" }}>·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Legal / Bottom bar */}
      <div style={{ borderTop: "1px solid #1a3050", padding: "20px 40px", maxWidth: 1400, margin: "0 auto" }}>
        <p style={{ fontSize: 12, color: "#6e7681", marginBottom: 4 }}>© 2025 Globperty LLC. All rights reserved. Registered in the United States of America.</p>
        <p style={{ fontSize: 12, color: "#6e7681", marginBottom: 16 }}>Globperty is an independent property portal. All listings are provided by verified third-party agents and developers. Globperty does not provide legal, financial or immigration advice.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 0", alignItems: "center" }}>
          {LEGAL_LINKS.map((l, i) => (
            <span key={l} style={{ display: "flex", alignItems: "center" }}>
              <a href="#" style={{ fontSize: 12, color: "#6e7681", textDecoration: "none" }}>{l}</a>
              {i < LEGAL_LINKS.length - 1 && <span style={{ margin: "0 10px", color: "#1a3050" }}>·</span>}
            </span>
          ))}
        </div>
      </div>

    </footer>
  );
}
