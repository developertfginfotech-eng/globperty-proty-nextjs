"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogArticles4 } from "@/data/blogs";

// ─── Static data ──────────────────────────────────────────────────────────────

const GLANCE_STATS = {
  "Buying Guide": [
    { value: "9 Steps", label: "Purchase Process" },
    { value: "5–10%", label: "Acquisition Costs" },
    { value: "4–8 wks", label: "Completion Time" },
    { value: "75% LTV", label: "Max Mortgage" },
  ],
  "Country Guides": [
    { value: "12+", label: "Countries Covered" },
    { value: "6–9%", label: "Best Gross Yield" },
    { value: "$80K+", label: "Lowest Entry" },
    { value: "5", label: "Citizenship Routes" },
  ],
  "Golden Visa": [
    { value: "$400K", label: "Turkey Citizenship" },
    { value: "€300K", label: "Cyprus EU Residency" },
    { value: "7 days", label: "Min Stay (Portugal)" },
    { value: "2–6 mo", label: "Processing Time" },
  ],
  "Investment": [
    { value: "6–9%", label: "Dubai Gross Yield" },
    { value: "18%", label: "Turkey 5yr Growth" },
    { value: "3", label: "Strategy Types" },
    { value: "$80K+", label: "Min Entry Price" },
  ],
  "Legal & Ownership": [
    { value: "3", label: "Ownership Types" },
    { value: "10%", label: "Typical Deposit" },
    { value: "4–12 wks", label: "Completion Time" },
    { value: "$500", label: "Title Search Cost" },
  ],
  "Tax Guide": [
    { value: "0%", label: "UAE Tax Rate" },
    { value: "28%", label: "Portugal CGT" },
    { value: "4%", label: "UAE Transfer Fee" },
    { value: "5+", label: "Tax-Efficient Markets" },
  ],
  "Market Report": [
    { value: "177K+", label: "Dubai Transactions 2024" },
    { value: "12%", label: "Dubai Price Growth" },
    { value: "6–9%", label: "Best Rental Yield" },
    { value: "12", label: "Markets Tracked" },
  ],
  "Market Reports": [
    { value: "177K+", label: "Dubai Transactions 2024" },
    { value: "12%", label: "Dubai Price Growth" },
    { value: "6–9%", label: "Best Rental Yield" },
    { value: "12", label: "Markets Tracked" },
  ],
  "Expat Guide": [
    { value: "90%+", label: "Dubai Expat Population" },
    { value: "5 yr", label: "UAE Retirement Visa" },
    { value: "5", label: "Top Expat Destinations" },
    { value: "15 min", label: "Read Time" },
  ],
  "Student Housing": [
    { value: "6–9%", label: "UK PBSA Yields" },
    { value: "95–99%", label: "Typical Occupancy" },
    { value: "$52K+", label: "Min Entry (Malaysia)" },
    { value: "51 wks", label: "Typical Lease" },
  ],
  "News & Updates": [
    { value: "14.2K", label: "Dubai March Transactions" },
    { value: "40%", label: "Golden Visa App Growth" },
    { value: "3–4 mo", label: "Turkey Processing Time" },
    { value: "500+", label: "Hungary GIV Approvals" },
  ],
};

const QUICK_FACTS = {
  "Buying Guide": [
    { label: "Foreign Freehold Ownership", value: "Yes (freehold zones)" },
    { label: "Min. Investment (Visa)", value: "AED 2,000,000 (~$545K)" },
    { label: "Transfer Fee (Dubai)", value: "4% DLD" },
    { label: "Avg. Gross Yield", value: "6–9%" },
    { label: "Purchase Timeline", value: "4–8 weeks" },
    { label: "Mortgage Available", value: "Yes (up to 75% LTV)" },
  ],
  "Golden Visa": [
    { label: "Cheapest EU Route", value: "Cyprus €300K" },
    { label: "Citizenship Route", value: "Turkey $400K" },
    { label: "Portugal Min. Stay", value: "7 days/year" },
    { label: "Processing Time", value: "2–6 months" },
    { label: "Family Included", value: "Yes (most programs)" },
    { label: "UAE 10-yr Visa", value: "AED 2M+ property" },
  ],
  "Country Guides": [
    { label: "Top Yield Market", value: "Dubai (6–9%)" },
    { label: "Min. Entry Price", value: "From $80K (Philippines)" },
    { label: "EU Citizenship Route", value: "Portugal (5 yrs)" },
    { label: "Tax-Free Markets", value: "UAE" },
    { label: "Best 5yr Capital Growth", value: "Turkey (18% CAGR)" },
    { label: "Most Accessible Market", value: "Philippines, Malaysia" },
  ],
  "Investment": [
    { label: "Best BTL Yield", value: "Dubai 6–9%" },
    { label: "Short-Stay Premium", value: "+2–3× long-term yield" },
    { label: "Off-Plan Discount", value: "10–20% below market" },
    { label: "Best 5yr Capital Growth", value: "Turkey 18% CAGR" },
    { label: "Recommended Diversification", value: "2–3 markets" },
    { label: "Currency Risk", value: "Low (USD-pegged UAE)" },
  ],
  "Legal & Ownership": [
    { label: "Ownership Types", value: "Freehold / Leasehold / Condo" },
    { label: "Standard Deposit", value: "10% of purchase price" },
    { label: "Title Search Cost", value: "~$500" },
    { label: "Completion Time", value: "4–12 weeks" },
    { label: "Power of Attorney", value: "Available in all markets" },
    { label: "Nominee Ownership", value: "Illegal / unenforceable" },
  ],
  "Tax Guide": [
    { label: "UAE Tax (all types)", value: "Zero" },
    { label: "Portugal Transfer Tax", value: "0–8% IMT" },
    { label: "Portugal CGT (non-resident)", value: "28%" },
    { label: "Turkey CGT (5yr+ hold)", value: "Zero" },
    { label: "Cyprus Annual Property Tax", value: "Zero (since 2017)" },
    { label: "Australia Stamp Duty", value: "4–5.5% + 7–8% surcharge" },
  ],
};

const DEFAULT_QUICK_FACTS = [
  { label: "Countries Covered", value: "12+" },
  { label: "Avg. Gross Yield (UAE)", value: "6–9%" },
  { label: "Best Transfer Fee", value: "4% (Dubai)" },
  { label: "Completion Timeline", value: "4–8 weeks" },
  { label: "Expert Reviewed", value: "Yes" },
  { label: "Last Updated", value: "2025" },
];

const FAQS_BY_TAG = {
  "Buying Guide": [
    { q: "Can foreigners buy freehold property in Dubai?", a: "Yes. Dubai has designated freehold zones where foreigners can purchase with full ownership rights. Popular areas include Downtown Dubai, Dubai Marina, Palm Jumeirah, and Business Bay." },
    { q: "What are the total acquisition costs when buying abroad?", a: "Typically 5–10% above the purchase price. In Dubai: 4% DLD transfer fee + 2% agent commission + ~0.25% mortgage registration + admin fees of AED 4,000–5,000." },
    { q: "Do I need to be in the country to complete a purchase?", a: "Not necessarily. Many markets allow completion via Power of Attorney. Your lawyer can handle the entire process, including signing at the land registry." },
    { q: "How long does the purchase process take?", a: "Ready properties: 4–8 weeks from offer acceptance to title deed transfer. Off-plan: purchase agreement signed immediately, handover 1–3 years later." },
    { q: "Can I get a mortgage as a foreign buyer?", a: "Yes, in most markets. UAE banks lend up to 75% LTV to non-residents. Off-plan properties often offer developer payment plans as a cost-effective alternative." },
  ],
  "Golden Visa": [
    { q: "Which Golden Visa gives the fastest EU citizenship?", a: "Portugal's Golden Visa leads to EU citizenship after 5 years of legal residency with just 7 days/year minimum stay. Malta's MEIN programme can be faster but costs significantly more." },
    { q: "Which is the most affordable Golden Visa for EU access?", a: "Cyprus Permanent Residency from €300,000 is the lowest EU threshold. Hungary's Guest Investor Visa starts from €250,000 via a real estate fund and gives Schengen residency." },
    { q: "Which Golden Visa gives actual citizenship, not just residency?", a: "Turkey's Citizenship by Investment ($400K) grants full Turkish citizenship within 3–6 months. Portuguese Golden Visa leads to citizenship after 5 years of legal residency." },
    { q: "Do I need to live in the country to maintain a Golden Visa?", a: "Requirements vary. UAE: no minimum stay. Portugal: 7 days/year. Hungary GIV: no minimum stay. Cyprus MPRP: no minimum stay." },
    { q: "Can family members be included on a Golden Visa?", a: "Yes, in virtually all programmes. Spouse and financially dependent children are included at no additional investment. Some programmes also include dependent parents." },
  ],
};

const DEFAULT_FAQS = [
  { q: "What is the safest way to buy property internationally?", a: "Always engage an independent local lawyer — not one recommended by the agent or developer. Verify clean title, check for outstanding mortgages, and review all contracts before signing." },
  { q: "How do I transfer money internationally for a property purchase?", a: "Use a specialist FX broker rather than a high-street bank — you can save 1–3% on large transfers. Ensure you comply with anti-money laundering requirements in both countries." },
  { q: "What taxes will I pay when buying property abroad?", a: "Acquisition costs: transfer taxes (1.5–8%), VAT on new builds in some markets, and agent fees. Annual costs include property tax and rental income tax if you let the property." },
  { q: "Can I get a mortgage as a foreign buyer?", a: "Yes, in most markets. UAE banks lend up to 75% LTV to non-residents; Portuguese banks 65–70%. Developer payment plans often offer better terms than local bank mortgages." },
  { q: "How do I find a trustworthy real estate agent abroad?", a: "Use Globperty's verified agent network. All agents are reviewed for licensing compliance and track record. Look for agents who specialise in foreign buyer transactions." },
];

const TAG_TO_CATEGORY = {
  "Country Guides": "Country Guides",
  "Country Guide": "Country Guides",
  "Golden Visa": "Golden Visa Guides",
  "Investment": "Investment Guides",
  "Buying Guide": "Buying Guides",
  "Legal & Ownership": "Legal & Ownership",
  "Tax Guide": "Tax Guides",
  "Market Report": "Market Reports",
  "Market Reports": "Market Reports",
  "Expat Guide": "Expat Guides",
  "Student Housing": "Student Housing",
  "News & Updates": "News & Updates",
};

const TABS = ["Overview", "Key Steps", "Costs & Fees", "Legal Tips", "Financing", "FAQ", "Related"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatItem({ value, label }) {
  return (
    <div style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ fontSize: 19, fontWeight: 800, color: "#f97316" }}>{value}</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2, lineHeight: 1.3 }}>{label}</div>
    </div>
  );
}

function Hero({ blog }) {
  const stats = GLANCE_STATS[blog.tag] || [
    { value: "15 min", label: "Read Time" },
    { value: "2025", label: "Up to Date" },
    { value: "Expert", label: "Reviewed" },
    { value: "Free", label: "Access" },
  ];
  const category = TAG_TO_CATEGORY[blog.tag] || blog.tag;

  return (
    <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", paddingTop: 36, paddingBottom: 64 }}>
      <div className="tf-container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: 24, fontSize: 13 }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Home</Link>
          <span style={{ color: "rgba(255,255,255,0.25)", margin: "0 8px" }}>›</span>
          <Link href="/knowledge-base" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Knowledge Base</Link>
          <span style={{ color: "rgba(255,255,255,0.25)", margin: "0 8px" }}>›</span>
          <Link href={`/knowledge-base?category=${encodeURIComponent(category)}`} style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>{category}</Link>
          <span style={{ color: "rgba(255,255,255,0.25)", margin: "0 8px" }}>›</span>
          <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{blog.title?.slice(0, 40)}{blog.title?.length > 40 ? "…" : ""}</span>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Left content */}
          <div style={{ flex: 1, minWidth: 280 }}>
            {/* Badges */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              <span style={{ background: "#f97316", color: "#fff", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700 }}>
                {blog.tag}
              </span>
              <span style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", borderRadius: 20, padding: "4px 14px", fontSize: 12 }}>
                ★ Most Popular
              </span>
              <span style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80", borderRadius: 20, padding: "4px 14px", fontSize: 12 }}>
                ✓ Expert Reviewed
              </span>
            </div>

            {/* Title */}
            <h1 style={{ color: "#fff", fontSize: "clamp(22px, 2.8vw, 38px)", fontWeight: 800, lineHeight: 1.25, marginBottom: 16, maxWidth: 680 }}>
              {blog.title}
            </h1>

            {/* Description */}
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.75, marginBottom: 24, maxWidth: 640 }}>
              {blog.description}
            </p>

            {/* Meta */}
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 30, fontSize: 13 }}>
              <span style={{ color: "rgba(255,255,255,0.45)" }}>📅 Updated {blog.date}</span>
              <span style={{ color: "rgba(255,255,255,0.45)" }}>⏱ 12 min read</span>
              <span style={{ color: "rgba(255,255,255,0.45)" }}>✍️ Globperty Research</span>
              <span style={{ color: "#4ade80" }}>✓ Expert Reviewed</span>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/contact" style={{ background: "#f97316", color: "#fff", borderRadius: 8, padding: "12px 22px", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
                Talk to an Expert →
              </Link>
              <Link href="/properties" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", borderRadius: 8, padding: "12px 22px", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Browse Properties
              </Link>
              <Link href="/tools" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.65)", borderRadius: 8, padding: "12px 22px", fontSize: 14, fontWeight: 500, textDecoration: "none", display: "inline-block" }}>
                Calculate ROI
              </Link>
            </div>
          </div>

          {/* At a Glance card */}
          <div style={{ width: 220, flexShrink: 0, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: 22 }}>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>
              At a Glance
            </div>
            {stats.map((s, i) => <StatItem key={i} {...s} />)}
            <div style={{ paddingTop: 10, fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
              Data updated {blog.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabNav({ activeTab, setActiveTab }) {
  const SCROLL_TARGETS = ["guide-overview", "guide-overview", "guide-overview", "guide-overview", "guide-overview", "guide-faq", "guide-related"];

  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <div className="tf-container">
        <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
          {TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveTab(i);
                document.getElementById(SCROLL_TARGETS[i])?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                background: "none",
                border: "none",
                padding: "15px 17px",
                fontSize: 13.5,
                fontWeight: activeTab === i ? 700 : 500,
                color: activeTab === i ? "#f97316" : "#64748b",
                borderBottom: activeTab === i ? "2px solid #f97316" : "2px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                marginBottom: -1,
                transition: "color 0.2s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickFactsCard({ tag }) {
  const facts = QUICK_FACTS[tag] || DEFAULT_QUICK_FACTS;
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 22, marginBottom: 18 }}>
      <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#0f172a" }}>📋 Quick Facts</h4>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {facts.map((f, i) => (
            <tr key={i} style={{ borderBottom: i < facts.length - 1 ? "1px solid #f1f5f9" : "none" }}>
              <td style={{ padding: "7px 0", fontSize: 12, color: "#64748b", lineHeight: 1.4 }}>{f.label}</td>
              <td style={{ padding: "7px 0", fontSize: 12, fontWeight: 700, color: "#1e293b", textAlign: "right", paddingLeft: 8 }}>{f.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AIAssistantCard() {
  const suggestions = ["What's my buying budget?", "Which country suits me?", "Explain Golden Visa options"];
  return (
    <div style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)", borderRadius: 12, padding: 22, marginBottom: 18, color: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ background: "#f97316", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🤖</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>AI Property Assistant</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>Powered by Globperty AI</div>
        </div>
      </div>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginBottom: 14, lineHeight: 1.6 }}>
        Get instant answers about your specific property situation.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
        {suggestions.map((q, i) => (
          <Link key={i} href="/copilot" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 6, padding: "7px 10px", fontSize: 12, color: "rgba(255,255,255,0.7)", textDecoration: "none", display: "block" }}>
            {q} →
          </Link>
        ))}
      </div>
      <Link href="/copilot" style={{ background: "#f97316", color: "#fff", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 700, textDecoration: "none", display: "block", textAlign: "center" }}>
        Ask the AI Assistant →
      </Link>
    </div>
  );
}

function RelatedGuidesCard({ currentId }) {
  const others = blogArticles4.filter(g => g.id !== currentId).slice(0, 5);
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 22, marginBottom: 18 }}>
      <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#0f172a" }}>📚 Related Guides</h4>
      {others.map((g, i) => (
        <Link key={i} href={`/knowledge-base/${g.id}`} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 0", borderBottom: i < others.length - 1 ? "1px solid #f1f5f9" : "none", textDecoration: "none" }}>
          <span style={{ background: "#fff7ed", color: "#f97316", borderRadius: 4, padding: "2px 7px", fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{g.tag}</span>
          <span style={{ fontSize: 12, color: "#374151", fontWeight: 500, lineHeight: 1.45 }}>{g.title}</span>
        </Link>
      ))}
    </div>
  );
}

function MortgageCard() {
  return (
    <div style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)", border: "1px solid #bfdbfe", borderRadius: 12, padding: 22 }}>
      <div style={{ fontSize: 24, marginBottom: 8 }}>🏦</div>
      <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: "#1e3a5f" }}>Need Financing?</h4>
      <p style={{ fontSize: 12, color: "#374151", marginBottom: 14, lineHeight: 1.6 }}>
        Compare rates from 20+ international lenders. Get pre-approved in 48 hours.
      </p>
      <div style={{ background: "#fff", borderRadius: 8, padding: 12, marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: "#64748b", marginBottom: 3 }}>Estimated monthly payment</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#1e3a5f" }}>$2,847<span style={{ fontSize: 12, fontWeight: 400, color: "#64748b" }}>/mo</span></div>
        <div style={{ fontSize: 10, color: "#64748b" }}>on $500K at 4.5%, 25 years</div>
      </div>
      <Link href="/tools" style={{ background: "#1d4ed8", color: "#fff", borderRadius: 8, padding: "10px", fontSize: 12, fontWeight: 700, textDecoration: "none", display: "block", textAlign: "center" }}>
        Calculate My Mortgage →
      </Link>
    </div>
  );
}

function FAQAccordion({ tag }) {
  const [open, setOpen] = useState(null);
  const faqs = FAQS_BY_TAG[tag] || DEFAULT_FAQS;

  return (
    <div id="guide-faq" style={{ marginTop: 48 }}>
      <div style={{ display: "inline-block", background: "#fff7ed", color: "#f97316", borderRadius: 6, padding: "3px 12px", fontSize: 11, fontWeight: 800, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
        FAQ
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: "#0f172a" }}>Frequently Asked Questions</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {faqs.map((item, i) => (
          <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: open === i ? "#fff7ed" : "#fff", border: "none", cursor: "pointer", textAlign: "left", gap: 12 }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", lineHeight: 1.4 }}>{item.q}</span>
              <span style={{ color: "#f97316", fontSize: 22, flexShrink: 0, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding: "4px 20px 16px", fontSize: 14, color: "#4b5563", lineHeight: 1.75 }}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedGuidesBottom({ currentId }) {
  const guides = blogArticles4.filter(g => g.id !== currentId).slice(0, 3);
  return (
    <div id="guide-related" style={{ marginTop: 48 }}>
      <div style={{ display: "inline-block", background: "#fff7ed", color: "#f97316", borderRadius: 6, padding: "3px 12px", fontSize: 11, fontWeight: 800, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
        Continue Reading
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "#0f172a" }}>Related Guides You Should Read</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
        {guides.map((g, i) => (
          <Link key={i} href={`/knowledge-base/${g.id}`} style={{ textDecoration: "none", display: "block", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
            {g.imageSrc && (
              <div style={{ height: 150, overflow: "hidden", position: "relative" }}>
                <Image src={g.imageSrc} alt={g.title} fill style={{ objectFit: "cover" }} />
              </div>
            )}
            <div style={{ padding: "16px 18px" }}>
              <span style={{ background: "#fff7ed", color: "#f97316", borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{g.tag}</span>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginTop: 10, marginBottom: 6, lineHeight: 1.45 }}>{g.title}</h4>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5, margin: 0 }}>
                {g.description?.slice(0, 90)}…
              </p>
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
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const faqEl = document.getElementById("guide-faq");
      const relEl = document.getElementById("guide-related");
      if (!faqEl || !relEl) return;
      const scroll = window.scrollY + 120;
      if (scroll >= relEl.offsetTop) setActiveTab(6);
      else if (scroll >= faqEl.offsetTop) setActiveTab(5);
      else setActiveTab(0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Hero blog={blog} />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ background: "#f8fafc" }}>
        <div className="tf-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
          <div className="row" style={{ alignItems: "flex-start" }}>
            {/* Main content */}
            <div className="col-lg-8" id="guide-overview">
              {/* Article content card */}
              <div style={{ background: "#fff", borderRadius: 16, padding: "36px 40px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", marginBottom: 0 }}>
                {blog.imageSrc && (
                  <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: 28, position: "relative", height: 300 }}>
                    <Image src={blog.imageSrc} alt={blog.title} fill style={{ objectFit: "cover" }} />
                  </div>
                )}
                <div
                  className="article-content"
                  style={{ fontSize: 15, lineHeight: 1.85, color: "#374151" }}
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>

              <FAQAccordion tag={blog.tag} />
              <RelatedGuidesBottom currentId={blog.id} />

              {/* Disclaimer */}
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 18, marginTop: 32, fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>
                <strong style={{ color: "#64748b" }}>Disclaimer: </strong>
                The information in this guide is for educational purposes only and does not constitute financial, legal, or investment advice. Property markets and regulations change frequently — always consult qualified local professionals before making investment decisions. Globperty does not accept liability for decisions made based on this content.
              </div>
            </div>

            {/* Sticky sidebar */}
            <div className="col-lg-4">
              <div style={{ position: "sticky", top: 72, paddingLeft: 16 }}>
                <QuickFactsCard tag={blog.tag} />
                <AIAssistantCard />
                <RelatedGuidesCard currentId={blog.id} />
                <MortgageCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
