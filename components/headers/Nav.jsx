"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef } from "react";

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
    label: "Guides",
    sections: [
      {
        title: "GUIDES & RESEARCH",
        cols: 3,
        items: [
          { icon: "📖", label: "Country Investment Guides", sub: "Deep guides for all 12 countries",      href: "/blog-grid" },
          { icon: "📊", label: "City Guides",               sub: "Area-by-area breakdown per city",       href: "/blog-grid" },
          { icon: "📈", label: "Property Market Reports",   sub: "Prices, trends & forecasts 2025",       href: "/blog-list" },
          { icon: "💰", label: "Investment Opportunities",  sub: "Hotspots, yields & ROI data",           href: "/listings?status=buy" },
          { icon: "🌐", label: "Visa & Residency Guides",   sub: "Golden Visa, PR & citizenship paths",   href: "/blog-grid" },
          { icon: "⚖️", label: "Legal & Ownership Rules",   sub: "Can foreigners buy? Step-by-step",     href: "/blog-list" },
          { icon: "🧾", label: "Tax Guides",                sub: "Purchase tax, rental tax, CGT",         href: "/blog-list" },
          { icon: "✈️", label: "Expat Living Guides",       sub: "Cost of living, culture, healthcare",  href: "/blog-grid" },
        ],
      },
      {
        title: "SPECIFIC BUYER GUIDES",
        cols: 3,
        items: [
          { icon: "🇮🇳", label: "Guide for Indian Buyers",   sub: "NRI property investment abroad",       href: "/blog-grid" },
          { icon: "🎓", label: "Student Housing Guide",      sub: "Renting near universities abroad",     href: "/listings?type=student" },
          { icon: "📰", label: "News & Market Updates",      sub: "Global real estate news",              href: "/blog-list" },
          { icon: "🏗", label: "Off-Plan Buying Guide",      sub: "Risks, rewards & what to check",       href: "/project-list" },
          { icon: "🏨", label: "Airbnb Investment Guide",    sub: "Short-stay rental returns by city",    href: "/listings?type=short-stay" },
          { icon: "🏦", label: "Mortgage Guides",            sub: "Foreign buyer mortgage by country",    href: "/home-loan-process" },
          { icon: "🏬", label: "Commercial Property Guide",  sub: "Offices, retail, industrial abroad",   href: "/listings?type=Office" },
          { icon: "📦", label: "Relocation Guide",           sub: "Moving abroad checklist & tips",       href: "/blog-list" },
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
          { icon: "🇦🇪", label: "UAE Golden Visa",               sub: "From AED 2M property investment",  href: "/listings?location=UAE" },
          { icon: "🇵🇹", label: "Portugal Golden Visa",          sub: "From €500K investment",            href: "/listings?location=Portugal" },
          { icon: "🇹🇷", label: "Turkey Citizenship by Investment", sub: "From $400K property",           href: "/listings?location=Turkey" },
          { icon: "🇨🇾", label: "Cyprus Permanent Residency",    sub: "From €300K property",              href: "/listings?location=Cyprus" },
          { icon: "🇲🇹", label: "Malta Residency Programme",     sub: "From €375K property",              href: "/listings?location=Malta" },
          { icon: "🇭🇺", label: "Hungary Guest Investor Visa",   sub: "From €500K property — new 2024",   href: "/listings?location=Hungary" },
          { icon: "🇱🇻", label: "Latvia Residency by Investment",sub: "From €250K property",              href: "/listings?location=Latvia" },
          { icon: "🇲🇾", label: "Malaysia MM2H Visa",            sub: "Long-stay visa for property owners",href: "/listings?location=Malaysia" },
        ],
      },
      {
        title: "TOOLS & COMPARISONS",
        cols: 3,
        items: [
          { icon: "🔍", label: "Visa Eligibility Checker",    sub: "Which country suits your budget?",    href: "/copilot" },
          { icon: "📊", label: "Compare All Visa Programs",   sub: "Side-by-side table of all programs",  href: "/compare" },
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
          { icon: "📊", label: "Rental Yield Calculator",        sub: "Annual return % by country & area",       href: "/copilot" },
          { icon: "📈", label: "ROI & Capital Growth Estimator", sub: "5 & 10 year investment projections",       href: "/copilot" },
          { icon: "🏦", label: "Mortgage Calculator",            sub: "Monthly repayments & eligibility",         href: "/home-loan-process" },
          { icon: "💱", label: "Currency Converter",             sub: "Live exchange rates — 30+ currencies",     href: "/copilot" },
          { icon: "🌐", label: "Visa Eligibility Checker",       sub: "Find your Golden Visa match",              href: "/copilot" },
          { icon: "💰", label: "Cost of Buying Calculator",      sub: "All purchase fees & taxes per country",    href: "/copilot" },
          { icon: "🏨", label: "Airbnb Income Estimator",        sub: "Short-stay income potential",              href: "/copilot" },
          { icon: "🌍", label: "Country Comparison Tool",        sub: "Compare 2 countries side by side",         href: "/compare" },
          { icon: "🗺", label: "Neighbourhood Explorer",         sub: "Find best areas by budget & lifestyle",    href: "/listings" },
          { icon: "🤖", label: "AI Property Assistant",          sub: "Chat & find your perfect property",        href: "/copilot" },
        ],
      },
    ],
  },
  {
    label: "Finance",
    sections: [
      {
        title: "MORTGAGES & LOANS",
        cols: 3,
        items: [
          { icon: "🏦", label: "Mortgage Partners",      sub: "Verified banks & lenders by country",     href: "/home-loan-process" },
          { icon: "🔍", label: "Compare Mortgages",      sub: "Rates, LTV & eligibility comparison",     href: "/home-loan-process" },
          { icon: "✅", label: "Get Pre-Approved",        sub: "Fast eligibility check online",           href: "/contact" },
          { icon: "🕌", label: "Islamic Finance Options", sub: "Sharia-compliant mortgages",              href: "/contact" },
        ],
      },
      {
        title: "PROTECTION & LEGAL",
        cols: 3,
        items: [
          { icon: "🛡", label: "Property Insurance",        sub: "Compare insurance partners",            href: "/contact" },
          { icon: "⚖️", label: "Legal Services",            sub: "Verified property lawyers by country",  href: "/contact" },
          { icon: "📋", label: "Title Deed & Due Diligence",sub: "Property verification services",        href: "/contact" },
          { icon: "🧾", label: "Tax Advisory",              sub: "International tax consultants",         href: "/contact" },
        ],
      },
      {
        title: "OTHER SERVICES",
        cols: 3,
        items: [
          { icon: "🚚", label: "Relocation Services", sub: "Movers, setup & settling-in help",           href: "/contact" },
          { icon: "🏠", label: "Property Management", sub: "Manage your rental remotely",                href: "/dashboard" },
        ],
      },
    ],
  },
  {
    label: "Events",
    sections: [
      {
        title: "EVENTS",
        cols: 3,
        items: [
          { icon: "🌐", label: "Virtual Property Expos",  sub: "Live country-wise property showcases",   href: "/contact" },
          { icon: "📅", label: "Upcoming Events",          sub: "Register free as a buyer",              href: "/contact" },
          { icon: "🎬", label: "Past Event Replays",       sub: "Watch recorded presentations",          href: "/blog-list" },
          { icon: "🏢", label: "Exhibit Your Property",    sub: "For agents & developers — paid booth",  href: "/contact" },
          { icon: "🎙", label: "Investment Webinars",      sub: "Expert talks on property markets",      href: "/blog-list" },
          { icon: "🌐", label: "Golden Visa Webinars",     sub: "Country-specific visa Q&A sessions",    href: "/blog-list" },
          { icon: "🏅", label: "Sponsor an Event",         sub: "Brand exposure to global buyers",       href: "/contact" },
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
          { icon: "📦", label: "Developer Packages",     sub: "Promote entire projects & launches",      href: "/contact" },
          { icon: "💡", label: "Buy Leads",              sub: "Pay per verified buyer lead",             href: "/contact" },
          { icon: "🎪", label: "Exhibit at Virtual Expo",sub: "Present to global buyers live",           href: "/contact" },
        ],
      },
      {
        title: "BUSINESS PARTNERS",
        cols: 3,
        items: [
          { icon: "🏦", label: "Finance Partner Sign Up", sub: "Banks, mortgage & insurance firms",      href: "/contact" },
          { icon: "⚖️", label: "Legal Partner Sign Up",   sub: "Property lawyers & notaries",            href: "/contact" },
          { icon: "📣", label: "Advertise on Globperty",  sub: "Featured listings, banners & sponsorship",href: "/contact" },
          { icon: "🤝", label: "Partner With Us",         sub: "Relocation, visa & concierge firms",     href: "/contact" },
        ],
      },
    ],
  },
];

const panelStyle = {
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
  padding: "24px 28px",
  minWidth: 680,
  maxWidth: 860,
  zIndex: 9999,
  border: "1px solid #f0f0f0",
};

function MegaItem({ item }) {
  return (
    <Link
      href={item.href}
      style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 10px", borderRadius: 8, textDecoration: "none", transition: "background 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.background = "#f9f9f9"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      <span style={{ fontSize: 18, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3 }}>{item.label}</div>
        {item.sub && <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, lineHeight: 1.3 }}>{item.sub}</div>}
      </div>
    </Link>
  );
}

function MegaPanel({ menu }) {
  return (
    <div style={panelStyle}>
      {menu.sections.map((section, si) => (
        <div key={si} style={{ marginBottom: si < menu.sections.length - 1 ? 20 : 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: "#9ca3af", textTransform: "uppercase", marginBottom: 10, paddingLeft: 10 }}>
            {section.title}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${section.cols}, 1fr)`, gap: "2px 8px" }}>
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
    timerRef.current = setTimeout(() => setOpen(null), 120);
  };

  return (
    <>
      <li className={pathname === "/" ? "current-menu" : ""} style={{ whiteSpace: "nowrap" }}>
        <Link href="/" style={{ fontSize: 14, padding: "0 14px", whiteSpace: "nowrap", display: "block" }}>Home</Link>
      </li>
      {MENU.map((menu) => (
        <li
          key={menu.label}
          style={{ position: "relative", whiteSpace: "nowrap" }}
          onMouseEnter={() => show(menu.label)}
          onMouseLeave={hide}
        >
          <a
            href="#"
            style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer", fontSize: 14, padding: "0 14px", whiteSpace: "nowrap" }}
            onClick={e => e.preventDefault()}
          >
            {menu.label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5, marginTop: 1 }}>
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          {open === menu.label && (
            <div onMouseEnter={() => show(menu.label)} onMouseLeave={hide}>
              <MegaPanel menu={menu} />
            </div>
          )}
        </li>
      ))}
      <li className={pathname === "/contact" ? "current-menu" : ""} style={{ whiteSpace: "nowrap" }}>
        <Link href="/contact" style={{ fontSize: 14, padding: "0 14px", whiteSpace: "nowrap", display: "block" }}>Contact</Link>
      </li>
    </>
  );
}
