"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

const MENU = [
  {
    label: "Properties",
    sections: [
      {
        title: "BY PURPOSE",
        cols: 3,
        items: [
          { icon: "🏠", label: "Buy Property",            sub: "Apartments, villas, land & more",         href: "/listings?status=buy" },
          { icon: "🔑", label: "Rent Property",           sub: "Long-term rentals worldwide",              href: "/listings?status=rent" },
          { icon: "🏷", label: "Sell Property",           sub: "List your property for sale",             href: "/add-property" },
          { icon: "🏖", label: "Short Stay / Holiday Let",sub: "Serviced & holiday apartments",           href: "/listings?type=short-stay" },
          { icon: "🎓", label: "Student Housing",         sub: "Rentals near universities worldwide",     href: "/listings?type=student" },
          { icon: "🏗", label: "New Projects & Off-Plan", sub: "Upcoming launches & pre-launch deals",    href: "/project-list" },
          { icon: "🤝", label: "Roommate / Shared Housing",sub: "Find flatmates internationally",         href: "/listings?type=shared" },
        ],
      },
      {
        title: "BY PROPERTY TYPE",
        cols: 3,
        items: [
          { icon: "🏢", label: "Apartments & Flats",      sub: "",  href: "/listings?type=Apartment" },
          { icon: "🏡", label: "Villas & Houses",         sub: "",  href: "/listings?type=Villa" },
          { icon: "🏘", label: "Townhouses",              sub: "",  href: "/listings?type=townhouse" },
          { icon: "🏙", label: "Penthouses",              sub: "",  href: "/listings?type=Penthouse" },
          { icon: "🏬", label: "Commercial Property",     sub: "",  href: "/listings?type=Office" },
          { icon: "🌿", label: "Land & Plots",            sub: "",  href: "/listings?type=land" },
          { icon: "🏭", label: "Warehouses & Industrial", sub: "",  href: "/listings?type=warehouse" },
        ],
      },
    ],
  },
  {
    label: "Countries",
    sections: [
      {
        title: "PHASE 1 — PRIORITY MARKETS",
        cols: 3,
        items: [
          { icon: "🇦🇪", label: "UAE",       sub: "Dubai · Abu Dhabi · Sharjah · Ajman",         href: "/countries/uae" },
          { icon: "🇺🇸", label: "USA",       sub: "New York · Miami · Los Angeles · Texas",       href: "/countries/usa" },
          { icon: "🇵🇹", label: "Portugal",  sub: "Lisbon · Porto · Algarve · Madeira",           href: "/countries/portugal" },
          { icon: "🇦🇺", label: "Australia", sub: "Sydney · Melbourne · Brisbane · Perth",        href: "/countries/australia" },
        ],
      },
      {
        title: "PHASE 2 — EUROPEAN GOLDEN VISA MARKETS",
        cols: 3,
        items: [
          { icon: "🇹🇷", label: "Turkey",  sub: "Istanbul · Antalya · Bodrum · Izmir",          href: "/countries/turkey" },
          { icon: "🇨🇾", label: "Cyprus",  sub: "Limassol · Nicosia · Paphos · Larnaca",        href: "/countries/cyprus" },
          { icon: "🇲🇹", label: "Malta",   sub: "Valletta · Sliema · St Julian's · Gozo",       href: "/countries/malta" },
          { icon: "🇨🇦", label: "Canada",  sub: "Toronto · Vancouver · Calgary · Montreal",     href: "/countries/canada" },
        ],
      },
      {
        title: "PHASE 3 — EMERGING & ASIAN MARKETS",
        cols: 3,
        items: [
          { icon: "🇭🇺", label: "Hungary",     sub: "Budapest · Debrecen · Pécs",                href: "/countries/hungary" },
          { icon: "🇱🇻", label: "Latvia",      sub: "Riga · Jürmala · Daugavpils",               href: "/countries/latvia" },
          { icon: "🇵🇭", label: "Philippines", sub: "Manila · Cebu · Davao · Boracay",           href: "/countries/philippines" },
          { icon: "🇲🇾", label: "Malaysia",    sub: "Kuala Lumpur · Penang · Johor Bahru · Langkawi", href: "/countries/malaysia" },
        ],
      },
    ],
  },
  {
    label: "Visas",
    sections: [
      {
        title: "BY COUNTRY PROGRAM",
        cols: 3,
        items: [
          { icon: "🇦🇪", label: "UAE Golden Visa",               sub: "From AED 2M property investment",  href: "/countries/uae" },
          { icon: "🇵🇹", label: "Portugal Golden Visa",          sub: "From €500K investment",            href: "/countries/portugal" },
          { icon: "🇹🇷", label: "Turkey Citizenship by Investment", sub: "From $400K property",           href: "/countries/turkey" },
          { icon: "🇨🇾", label: "Cyprus Permanent Residency",    sub: "From €300K property",              href: "/countries/cyprus" },
          { icon: "🇲🇹", label: "Malta Residency Programme",     sub: "From €375K property",              href: "/countries/malta" },
          { icon: "🇭🇺", label: "Hungary Guest Investor Visa",   sub: "From €500K property — new 2024",   href: "/countries/hungary" },
          { icon: "🇱🇻", label: "Latvia Residency by Investment",sub: "From €250K property",              href: "/countries/latvia" },
          { icon: "🇲🇾", label: "Malaysia MM2H Visa",            sub: "Long-stay visa for property owners",href: "/countries/malaysia" },
        ],
      },
      {
        title: "TOOLS & COMPARISONS",
        cols: 3,
        items: [
          { icon: "🔍", label: "Visa Eligibility Checker",    sub: "Which country suits your budget?",    href: "/visa-checker" },
          { icon: "📊", label: "Compare All Visa Programs",   sub: "Side-by-side table of all programs",  href: "/visa-comparison" },
          { icon: "🌐", label: "AI Visa Advisor",             sub: "Chat to find your best visa path",    href: "/copilot" },
          { icon: "📞", label: "Speak to a Visa Consultant",  sub: "Connect with verified visa experts",  href: "/contact" },
        ],
      },
    ],
  },
  {
    label: "Tools",
    sections: [
      {
        title: "CALCULATORS & TOOLS",
        cols: 3,
        items: [
          { icon: "📊", label: "Rental Yield Calculator",        sub: "Annual return % by country & area",       href: "/rental-yield" },
          { icon: "📈", label: "ROI & Capital Growth Estimator", sub: "5 & 10 year investment projections",       href: "/roi-calculator" },
          { icon: "🏦", label: "Mortgage Calculator",            sub: "Monthly repayments & eligibility",         href: "/home-loan-process" },
          { icon: "💱", label: "Currency Converter",             sub: "Live exchange rates — 17 currencies",      href: "/currency-converter" },
          { icon: "💰", label: "Cost of Buying Calculator",      sub: "All purchase fees & taxes per country",    href: "/cost-of-buying" },
          { icon: "🌍", label: "Country Comparison Tool",        sub: "Compare 2 countries side by side",         href: "/compare" },
          { icon: "🗺", label: "Neighbourhood Explorer",         sub: "Find best areas by budget & lifestyle",    href: "/listings" },
          { icon: "🤖", label: "AI Property Assistant",          sub: "Chat & find your perfect property",        href: "/copilot" },
        ],
      },
    ],
  },
  {
    label: "Agents",
    sections: [
      {
        title: "AGENTS & DEVELOPERS",
        cols: 3,
        items: [
          { icon: "📋", label: "List Your Properties",   sub: "Free during launch phase",                href: "/add-property" },
          { icon: "👤", label: "Create Agent Profile",   sub: "Verified badge & public profile",         href: "/my-profile" },
          { icon: "📊", label: "Agent Dashboard",        sub: "Manage listings, leads & analytics",      href: "/dashboard" },
          { icon: "📦", label: "Developer Packages",     sub: "Promote entire projects & launches",      href: "/developer-packages" },
          { icon: "💡", label: "Buy Leads",              sub: "Pay per verified buyer lead",             href: "/buy-leads" },
          { icon: "🎪", label: "Exhibit at Virtual Expo",sub: "Present to global buyers live",           href: "/virtual-expo" },
        ],
      },
      {
        title: "BUSINESS PARTNERS",
        cols: 3,
        items: [
          { icon: "🏦", label: "Finance Partner Sign Up", sub: "Banks, mortgage & insurance firms",      href: "/finance-partner" },
          { icon: "⚖️", label: "Legal Partner Sign Up",   sub: "Property lawyers & notaries",            href: "/legal-partner" },
          { icon: "📣", label: "Advertise on Globperty",  sub: "Featured listings, banners & sponsorship",href: "/advertise" },
          { icon: "🤝", label: "Partner With Us",         sub: "Relocation, visa & concierge firms",     href: "/partner" },
        ],
      },
    ],
  },
];

function SmartPanel({ children, onEnter, onLeave, navItemWidth = 80 }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reset to natural left-aligned position first
    el.style.left = "0";
    el.style.right = "auto";
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    if (rect.right > vw - 12) {
      // Flip: align panel's right edge to the nav item's right edge
      el.style.left = "auto";
      el.style.right = "0";
    }
  });

  return (
    <div
      ref={ref}
      style={{ position: "absolute", top: "100%", left: 0, zIndex: 9999, paddingTop: 18 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Triangle pointer — orange outer + white inner */}
      <div style={{ position: "absolute", top: 9, left: 32, zIndex: 10000 }}>
        <div style={{
          width: 0, height: 0,
          borderLeft: "11px solid transparent",
          borderRight: "11px solid transparent",
          borderBottom: "11px solid #f0822d",
        }} />
        <div style={{
          width: 0, height: 0,
          borderLeft: "9px solid transparent",
          borderRight: "9px solid transparent",
          borderBottom: "9px solid #fff",
          position: "absolute",
          top: 3,
          left: -9,
        }} />
      </div>
      {children}
    </div>
  );
}

function MegaItem({ item }) {
  return (
    <Link
      href={item.href}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 9,
        padding: "6px 8px 6px 6px",
        borderRadius: 6,
        textDecoration: "none",
        transition: "all 0.15s",
        borderLeft: "2px solid transparent",
        cursor: "pointer",
        pointerEvents: "auto",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "#fff8f4";
        e.currentTarget.style.borderLeftColor = "#f0822d";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderLeftColor = "transparent";
      }}
    >
      <span style={{
        fontSize: 16,
        lineHeight: 1,
        flexShrink: 0,
        width: 32,
        height: 32,
        background: "#fff4ec",
        borderRadius: 7,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 1,
      }}>
        {item.icon}
      </span>
      <div style={{ paddingTop: 2 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>{item.label}</div>
        {item.sub && <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.3, marginTop: 1 }}>{item.sub}</div>}
      </div>
    </Link>
  );
}

const ALL_COUNTRIES = [
  { icon: "🇦🇪", label: "UAE",         sub: "Dubai · Abu Dhabi · Sharjah",        href: "/countries/uae" },
  { icon: "🇺🇸", label: "USA",         sub: "New York · Miami · Los Angeles",      href: "/countries/usa" },
  { icon: "🇵🇹", label: "Portugal",    sub: "Lisbon · Porto · Algarve",            href: "/countries/portugal" },
  { icon: "🇦🇺", label: "Australia",   sub: "Sydney · Melbourne · Brisbane",       href: "/countries/australia" },
  { icon: "🇹🇷", label: "Turkey",      sub: "Istanbul · Antalya · Bodrum",         href: "/countries/turkey" },
  { icon: "🇨🇾", label: "Cyprus",      sub: "Limassol · Nicosia · Paphos",         href: "/countries/cyprus" },
  { icon: "🇲🇹", label: "Malta",       sub: "Valletta · Sliema · St Julian's",     href: "/countries/malta" },
  { icon: "🇨🇦", label: "Canada",      sub: "Toronto · Vancouver · Calgary",       href: "/countries/canada" },
  { icon: "🇭🇺", label: "Hungary",     sub: "Budapest · Debrecen · Pécs",          href: "/countries/hungary" },
  { icon: "🇱🇻", label: "Latvia",      sub: "Riga · Jürmala · Daugavpils",         href: "/countries/latvia" },
  { icon: "🇵🇭", label: "Philippines", sub: "Manila · Cebu · Davao",              href: "/countries/philippines" },
  { icon: "🇲🇾", label: "Malaysia",    sub: "Kuala Lumpur · Penang · Langkawi",    href: "/countries/malaysia" },
];

function CountriesPanel() {
  return (
    <div style={{
      background: "#fff",
      borderTop: "3px solid #f0822d",
      boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
      border: "1px solid #efefef",
      borderTopColor: "#f0822d",
      minWidth: 760,
      padding: "14px 20px 16px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1.2 }}>
          Invest in 12 Countries
        </span>
        <Link href="/listings" style={{ fontSize: 12, color: "#f0822d", textDecoration: "none", fontWeight: 600 }}>
          View all properties →
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {ALL_COUNTRIES.map((country, ci) => (
          <Link
            key={ci}
            href={country.href}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: "11px 12px",
              borderRadius: 10,
              textDecoration: "none",
              border: "1.5px solid #eeeeee",
              background: "#fafafa",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.borderColor = "#f0822d";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.09)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#fafafa";
              e.currentTarget.style.borderColor = "#eeeeee";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "none";
            }}
          >
            <span style={{ fontSize: 24, lineHeight: 1 }}>{country.icon}</span>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>{country.label}</div>
            <div style={{ fontSize: 10, color: "#9ca3af", lineHeight: 1.5 }}>{country.sub}</div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 8 }}>
        <Link href="/compare" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6b7280", textDecoration: "none", padding: "6px 12px", borderRadius: 7, background: "#f5f5f5", fontWeight: 500 }}>
          🔍 Compare Countries
        </Link>
        <Link href="/copilot" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6b7280", textDecoration: "none", padding: "6px 12px", borderRadius: 7, background: "#f5f5f5", fontWeight: 500 }}>
          🤖 AI Advisor
        </Link>
        <Link href="/listings" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#fff", textDecoration: "none", padding: "6px 16px", borderRadius: 7, background: "#f0822d", fontWeight: 600, marginLeft: "auto" }}>
          Browse All Properties →
        </Link>
      </div>
    </div>
  );
}

function MegaPanel({ menu }) {
  return (
    <div style={{
      background: "#fff",
      borderTop: "3px solid #f0822d",
      boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
      border: "1px solid #efefef",
      borderTopColor: "#f0822d",
      minWidth: 700,
      padding: "14px 20px 16px",
    }}>
      {menu.sections.map((section, si) => (
        <div key={si} style={{ marginBottom: si < menu.sections.length - 1 ? 12 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f0822d", flexShrink: 0 }} />
            <span style={{ fontSize: 9.5, fontWeight: 700, color: "#f0822d", textTransform: "uppercase", letterSpacing: 1 }}>
              {section.title}
            </span>
            <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${section.cols}, 1fr)`, gap: "1px 4px" }}>
            {section.items.map((item, ii) => <MegaItem key={ii} item={item} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(null);
  const timerRef = useRef(null);

  const show = (label) => {
    clearTimeout(timerRef.current);
    setOpen(label);
  };
  const hide = () => {
    timerRef.current = setTimeout(() => setOpen(null), 250);
  };

  return (
    <>
      {MENU.map((menu) => (
        <li
          key={menu.label}
          style={{ position: "relative", whiteSpace: "nowrap" }}
          onMouseEnter={() => show(menu.label)}
          onMouseLeave={hide}
        >
          <a
            href="#"
            style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer", fontSize: 15.5, padding: "0 22px", whiteSpace: "nowrap", fontWeight: 500, letterSpacing: "0.01em" }}
            onClick={e => e.preventDefault()}
          >
            {menu.label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5, marginTop: 1 }}>
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          {open === menu.label && (
            <SmartPanel onEnter={() => show(menu.label)} onLeave={hide}>
              {menu.label === "Countries" ? <CountriesPanel /> : <MegaPanel menu={menu} />}
            </SmartPanel>
          )}
        </li>
      ))}
      <li className={pathname === "/contact" ? "current-menu" : ""} style={{ whiteSpace: "nowrap" }}>
        <Link href="/contact" style={{ fontSize: 15.5, padding: "0 22px", whiteSpace: "nowrap", display: "block", fontWeight: 500, letterSpacing: "0.01em" }}>Contact</Link>
      </li>
    </>
  );
}
