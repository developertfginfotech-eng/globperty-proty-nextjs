"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header2 from "@/components/headers/Header2";
import Footer1 from "@/components/footers/Footer1";
import { getCountryBySlug } from "@/data/countries";
import { getAllProperties } from "@/utils/propertyApi";

const TABS = [
  "Overview", "Geography", "Real Estate Market", "Buying Guide",
  "Investment", "Golden Visa", "Taxes & Legal", "Finance",
  "Business", "Expat Guide", "Listings",
];

const TAB_ICONS = {
  "Overview": "🌐", "Geography": "🗺️", "Real Estate Market": "📊",
  "Buying Guide": "🛒", "Investment": "💰", "Golden Visa": "🎫",
  "Taxes & Legal": "⚖️", "Finance": "🏦", "Business": "💼",
  "Expat Guide": "✈️", "Listings": "🏠",
};

export default function CountryPage() {
  const { country: slug } = useParams();
  const country = getCountryBySlug(slug);

  const [activeTab, setActiveTab] = useState("Overview");
  const [cityListings, setCityListings] = useState({});
  const tabRef = useRef(null);

  useEffect(() => {
    getAllProperties()
      .then((props) => {
        const map = {};
        (props || []).forEach((p) => {
          const city = (p.city || "").trim();
          if (city) map[city] = (map[city] || 0) + 1;
        });
        setCityListings(map);
      })
      .catch(() => {});
  }, []);

  if (!country) return notFound();

  const totalListings = Object.values(cityListings).reduce((a, b) => a + b, 0);

  return (
    <>
      <Header2 />
      <div id="wrapper">
        <HeroSection country={country} onSelectTab={setActiveTab} />
        <TabBar tabs={TABS} active={activeTab} onSelect={setActiveTab} tabRef={tabRef} />
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 24px", display: "flex", gap: 28, alignItems: "flex-start" }}>
          <main style={{ flex: 1, minWidth: 0 }}>
            {activeTab === "Overview" && <OverviewSection country={country} />}
            {activeTab === "Geography" && <GeographySection country={country} cityListings={cityListings} />}
            {activeTab === "Real Estate Market" && (
              country.realEstateMarket
                ? <RealEstateMarketSection data={country.realEstateMarket} country={country} />
                : <ComingSoonSection tab={activeTab} country={country} />
            )}
            {activeTab === "Buying Guide" && (
              country.buyingGuide
                ? <BuyingGuideSection data={country.buyingGuide} country={country} />
                : <ComingSoonSection tab={activeTab} country={country} />
            )}
            {activeTab === "Investment" && (
              country.investment
                ? <InvestmentSection data={country.investment} goldenVisa={country.goldenVisa} country={country} />
                : <ComingSoonSection tab={activeTab} country={country} />
            )}
            {activeTab === "Golden Visa" && (
              country.goldenVisa
                ? <GoldenVisaSection data={country.goldenVisa} country={country} />
                : <ComingSoonSection tab={activeTab} country={country} />
            )}
            {activeTab === "Taxes & Legal" && (
              country.taxesLegal
                ? <TaxesLegalSection data={country.taxesLegal} country={country} />
                : <ComingSoonSection tab={activeTab} country={country} />
            )}
            {activeTab === "Finance" && (
              country.finance
                ? <FinanceSection data={country.finance} country={country} />
                : <ComingSoonSection tab={activeTab} country={country} />
            )}
            {activeTab === "Business" && (
              country.business
                ? <BusinessSection data={country.business} country={country} />
                : <ComingSoonSection tab={activeTab} country={country} />
            )}
            {activeTab === "Expat Guide" && (
              country.expatGuide
                ? <ExpatGuideSection data={country.expatGuide} country={country} />
                : <ComingSoonSection tab={activeTab} country={country} />
            )}
            {activeTab === "Listings" && (
              <ListingsSection country={country} />
            )}
            {!["Overview", "Geography", "Real Estate Market", "Buying Guide", "Investment", "Golden Visa", "Taxes & Legal", "Finance", "Business", "Expat Guide", "Listings"].includes(activeTab) && (
              <ComingSoonSection tab={activeTab} country={country} />
            )}
          </main>
          <Sidebar country={country} cityListings={cityListings} totalListings={totalListings} />
        </div>
      </div>
      <Footer1 />
    </>
  );
}

function HeroSection({ country, onSelectTab }) {
  return (
    <section style={{
      position: "relative", minHeight: "75vh", display: "flex", alignItems: "center",
      background: `linear-gradient(to bottom, rgba(10,16,30,0.75) 0%, rgba(10,16,30,0.85) 60%, rgba(10,16,30,0.98) 100%), url('${country.heroImage}') center/cover no-repeat`,
      paddingTop: 80,
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 24px 40px", width: "100%", display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Left content */}
        <div style={{ flex: 1 }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(240,130,45,0.15)", border: "1px solid rgba(240,130,45,0.4)", borderRadius: 24, padding: "6px 16px", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "#f0822d", fontWeight: 600, letterSpacing: 1 }}>🏆 {country.badge}</span>
          </div>

          {/* Country name */}
          <h1 style={{ fontSize: 52, fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
            {country.flag} {country.name.replace(country.highlight, "")}
            <span style={{ color: "#f0822d" }}>{country.highlight}</span>
          </h1>

          {/* Tagline */}
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 620, marginBottom: 24 }}>
            {country.tagline}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
            {country.tags.map((tag) => (
              <span key={tag} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 14px", fontSize: 13, color: "#fff", fontWeight: 500 }}>
                ✓ {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 36 }}>
            {country.stats.map((s) => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "16px 24px", minWidth: 120, textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#f0822d", marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href={`/listings?location=${country.locationParam}`} style={{ background: "#f0822d", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              🏠 Browse {country.shortName || country.name} Properties
            </Link>
            <Link href="/copilot" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "14px 24px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              🤖 Ask AI Assistant
            </Link>
            {country.visaCard && (
              <button
                onClick={() => { onSelectTab("Golden Visa"); setTimeout(() => window.scrollTo({ top: 400, behavior: "smooth" }), 50); }}
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "14px 24px", borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                🎫 {country.visaCard.title || "Visa Guide"}
              </button>
            )}
          </div>
        </div>

        {/* Snapshot card — hidden on small screens via media query workaround */}
        <div className="country-snapshot-card" style={{ width: 280, flexShrink: 0, background: "rgba(15,20,35,0.92)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "24px", backdropFilter: "blur(12px)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            🗂️ Quick Country Snapshot
          </div>
          {Object.entries(country.snapshot).map(([key, val]) => {
            const isObj = typeof val === "object";
            return (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", flex: 1 }}>{key}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: isObj ? val.color : "#fff", textAlign: "right", maxWidth: 140 }}>
                  {isObj ? val.value : val}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TabBar({ tabs, active, onSelect, tabRef }) {
  return (
    <div ref={tabRef} style={{ background: "#fff", borderBottom: "1px solid #f3f4f6", position: "sticky", top: 0, zIndex: 100, overflowX: "auto", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", display: "flex", gap: 4 }}>
        {tabs.map((tab) => (
          <button key={tab} onClick={() => onSelect(tab)} style={{
            padding: active === tab ? "12px 22px" : "12px 16px",
            margin: "10px 2px",
            fontSize: active === tab ? 15 : 14,
            fontWeight: active === tab ? 800 : 500,
            color: active === tab ? "#fff" : "#6b7280",
            background: active === tab ? "linear-gradient(135deg, #f0822d, #e56c1a)" : "none",
            border: "none",
            borderRadius: active === tab ? 24 : 8,
            boxShadow: active === tab ? "0 4px 16px rgba(240,130,45,0.45)" : "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: 7,
            transition: "all 0.2s",
            letterSpacing: active === tab ? 0.2 : 0,
          }}>
            {TAB_ICONS[tab]} {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

function OverviewSection({ country }) {
  const imgs = country.cityImages || [];
  return (
    <div>
      {/* Photo mosaic grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "160px 160px", gap: 8, marginBottom: 32, borderRadius: 12, overflow: "hidden" }}>
        {/* Large left image spanning both rows */}
        <div style={{ gridRow: "1 / 3", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgs[0]?.url} alt={imgs[0]?.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          {imgs[0] && <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(0,0,0,0.65)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6 }}>{imgs[0].name}</div>}
        </div>
        {/* Top right */}
        <div style={{ position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgs[1]?.url} alt={imgs[1]?.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          {imgs[1] && <div style={{ position: "absolute", bottom: 6, left: 8, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4 }}>{imgs[1].name}</div>}
        </div>
        {/* Bottom right with +photos overlay */}
        <div style={{ position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgs[2]?.url} alt={imgs[2]?.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>+{imgs.length > 3 ? imgs.length - 2 : 8} photos</span>
          </div>
        </div>
      </div>

      {/* Country stats */}
      {country.countryStats && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 36 }}>
          {country.countryStats.map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.label.includes("Tax") || s.label.includes("Safe") ? "#16b286" : s.label.includes("Airport") || s.label.includes("#1") ? "#1d4ed8" : "#f0822d", marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Overview label */}
      <div style={{ color: "#f0822d", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>COUNTRY OVERVIEW</div>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#111827", marginBottom: 8 }}>{country.overviewTitle}</h2>
      <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 28 }}>{country.overviewSubtitle}</p>

      {/* Overview text */}
      {(country.overviewText || []).map((para, i) => (
        <p key={i} style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, marginBottom: 20 }} dangerouslySetInnerHTML={{ __html: para }} />
      ))}

      {/* Feature cards */}
      {country.features && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 36, marginBottom: 48 }}>
          {country.features.map((f) => (
            <div key={f.title} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      )}

      {/* Country Comparison */}
      {country.countryComparison && <CountryComparisonBlock data={country.countryComparison} country={country} />}

      {/* FAQ */}
      {country.faq && <FAQBlock data={country.faq} country={country} />}
    </div>
  );
}

function CountryComparisonBlock({ data, country }) {
  const cols = data.compareWith || [];
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#f0822d", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>COUNTRY COMPARISON</div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{data.headline}</h2>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>{data.subtitle}</p>
      <div style={{ background: "#0f172a", borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: 20 }}>📊 Investment Metrics Comparison</div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols.length}, 1fr)`, gap: 0 }}>
          {cols.map((col, ci) => (
            <div key={ci} style={{ borderRight: ci < cols.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none", paddingRight: ci < cols.length - 1 ? 20 : 0, paddingLeft: ci > 0 ? 20 : 0 }}>
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{col.flag}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{col.name}</div>
              </div>
              {(col.metrics || []).map((m, mi) => (
                <div key={mi} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{m.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: m.valueColor || "#fff" }}>{m.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 20, marginTop: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 14 }}>🌐 Explore More Countries on Globperty</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {[{flag:"🇦🇪",name:"UAE",slug:"uae"},{flag:"🇵🇹",name:"Portugal",slug:"portugal"},{flag:"🇹🇷",name:"Turkey",slug:"turkey"},{flag:"🇨🇾",name:"Cyprus",slug:"cyprus"},{flag:"🇲🇹",name:"Malta",slug:"malta"},{flag:"🇦🇺",name:"Australia",slug:"australia"},{flag:"🇺🇸",name:"USA",slug:"usa"},{flag:"🇨🇦",name:"Canada",slug:"canada"},{flag:"🇲🇾",name:"Malaysia",slug:"malaysia"},{flag:"🇵🇭",name:"Philippines",slug:"philippines"},{flag:"🇭🇺",name:"Hungary",slug:"hungary"},{flag:"🇱🇻",name:"Latvia",slug:"latvia"}].filter(c => c.slug !== country.slug).map(c => (
            <Link key={c.slug} href={`/countries/${c.slug}`} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, fontWeight: 600, color: "#374151", textDecoration: "none", background: "#fafafa" }}>
              {c.flag} {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQBlock({ data }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#f0822d", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>FREQUENTLY ASKED QUESTIONS</div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{data.headline}</h2>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>{data.subtitle}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {(data.questions || []).map((item, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#111827", paddingRight: 16 }}>{item.q}</span>
              <span style={{ color: open === i ? "#f0822d" : "#9ca3af", fontSize: 18, flexShrink: 0 }}>{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 20px 16px", fontSize: 13, color: "#374151", lineHeight: 1.7, borderTop: "1px solid #f3f4f6" }}>
                <div style={{ paddingTop: 12 }}>{item.a}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GeographySection({ country, cityListings }) {
  return (
    <div>
      <div style={{ color: "#f0822d", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>GEOGRAPHY & LIFESTYLE</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Cities, Regions & Neighbourhoods</h2>
      <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 28 }}>{country.geographySubtitle || `${country.name}'s key cities and regions for investors`}</p>

      {/* Map placeholder */}
      <div style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 28, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>🗺️ {country.name} Interactive Map — Click Areas to Explore</span>
          <span style={{ fontSize: 13, color: "#2563eb", fontWeight: 600, cursor: "pointer" }}>Live Map</span>
        </div>
        <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)" }}>
          <div style={{ textAlign: "center", color: "#94a3b8" }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🗺️</div>
            <div style={{ fontSize: 14 }}>{country.name} Interactive Map</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Coming soon — explore regions & property zones</div>
          </div>
        </div>
      </div>

      {/* City cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 36 }}>
        {(country.cityData || []).map((city) => {
          const listingCount = cityListings[city.name] || cityListings[city.name.split(" ")[0]] || 0;
          return (
            <div key={city.name} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={city.image} alt={city.name} style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", top: 10, left: 10, background: city.yieldColor || "#16b286", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>
                  {city.yield} Yield
                </div>
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 10 }}>{city.emoji} {city.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>Price / sqft</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{city.priceRange}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>Listings</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#2563eb" }}>{listingCount > 0 ? `${listingCount}+` : "—"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>Best for</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{city.bestFor}</span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(city.tags || []).map((tag) => (
                    <span key={tag} style={{ background: "#f3f4f6", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 600, color: "#374151" }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Climate card */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 16 }}>
          🌡️ {country.name} Climate — Temperature & Sunshine Month by Month
        </div>
        <div style={{ height: 120, background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fca5a5 100%)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "#92400e" }}>
            <div style={{ fontSize: 13 }}>Climate data chart coming soon</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
          <span style={{ fontSize: 12, color: "#6b7280" }}>⬜ Max Temp (°C)</span>
          <span style={{ fontSize: 12, color: "#6b7280" }}>⬜ Min Temp (°C)</span>
          <span style={{ fontSize: 12, color: "#6b7280" }}>⬜ Sunshine Hours</span>
        </div>
      </div>
    </div>
  );
}

function RealEstateMarketSection({ data, country }) {
  const maxYield = Math.max(...data.globalComparison.items.map(i => i.yield));
  const maxPrice = Math.max(...data.priceChart.map(p => p.value));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#f0822d", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>REAL ESTATE MARKET</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{data.headline}</h2>
        <p style={{ fontSize: 14, color: "#6b7280" }}>{data.subtitle}</p>
      </div>

      {/* Alert box */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: "14px 18px", fontSize: 13, color: "#1d4ed8", lineHeight: 1.7 }}>
        <strong>{data.alert.split(":")[0]}:</strong>{data.alert.split(":").slice(1).join(":")}
      </div>

      {/* Price chart - CSS bars */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 20 }}>📈 {data.chartTitle}</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160 }}>
          {data.priceChart.map((point, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#111827" }}>{point.value.toLocaleString()}</div>
              <div style={{
                width: "100%", borderRadius: "6px 6px 0 0",
                height: `${(point.value / maxPrice) * 130}px`,
                background: i === data.priceChart.length - 1
                  ? "linear-gradient(to top, #f0822d, #fbbf24)"
                  : "linear-gradient(to top, #3b82f6, #93c5fd)",
                transition: "height 0.3s",
              }} />
              <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>{point.year}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Yield table */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ background: "#111827", padding: "14px 20px", fontSize: 14, fontWeight: 700, color: "#fff" }}>
          {data.yieldTable.title}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1f2937" }}>
                {["AREA", "AVG PRICE (1BR)", "ANNUAL RENT", "GROSS YIELD", "TREND", "BEST FOR"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "#9ca3af", textAlign: "left", letterSpacing: 0.8, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.yieldTable.rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "13px 14px", fontSize: 13, fontWeight: 700, color: "#111827", whiteSpace: "nowrap" }}>{row.area}</td>
                  <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151" }}>{row.price}</td>
                  <td style={{ padding: "13px 14px", fontSize: 13, color: "#374151" }}>{row.rent}</td>
                  <td style={{ padding: "13px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: row.yieldColor, minWidth: 36 }}>{row.yield}%</span>
                      <div style={{ flex: 1, height: 6, background: "#f3f4f6", borderRadius: 4, minWidth: 60 }}>
                        <div style={{ height: "100%", width: `${(row.yield / 10) * 100}%`, background: row.yieldColor, borderRadius: 4 }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "13px 14px", fontSize: 12, color: "#374151", whiteSpace: "nowrap" }}>{row.trend}</td>
                  <td style={{ padding: "13px 14px" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: row.bestColor }}>{row.bestFor}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global comparison - CSS horizontal bars */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 20 }}>{data.globalComparison.title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.globalComparison.items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 120, fontSize: 12, fontWeight: 600, color: "#374151", flexShrink: 0 }}>
                {item.city}
                <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 400 }}>{item.country}</div>
              </div>
              <div style={{ flex: 1, height: 10, background: "#f3f4f6", borderRadius: 6 }}>
                <div style={{ height: "100%", width: `${(item.yield / maxYield) * 100}%`, background: item.color, borderRadius: 6, transition: "width 0.4s" }} />
              </div>
              <div style={{ width: 42, fontSize: 13, fontWeight: 700, color: item.color, textAlign: "right", flexShrink: 0 }}>{item.yield}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InvestmentSection({ data, goldenVisa, country }) {
  const [activeBudget, setActiveBudget] = useState("All Budgets");
  const budgetFilters = ["All Budgets", "Entry Level", "Sweet Spot", "Premium", "Golden Visa"];
  const tierColorMap = { "#16a34a": "green", "#3b82f6": "blue", "#f0822d": "orange" };

  const visibleTiers = activeBudget === "All Budgets"
    ? data.tiers
    : activeBudget === "Entry Level" ? [data.tiers[0]]
    : activeBudget === "Sweet Spot" ? [data.tiers[1]]
    : activeBudget === "Premium" || activeBudget === "Golden Visa" ? [data.tiers[2]]
    : data.tiers;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#f0822d", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>INVESTMENT OPPORTUNITIES</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{data.headline}</h2>
        <p style={{ fontSize: 14, color: "#6b7280" }}>{data.subtitle}</p>
      </div>

      {/* Budget filter pills */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {budgetFilters.map(f => (
          <button
            key={f}
            onClick={() => setActiveBudget(f)}
            style={{
              padding: "8px 18px", borderRadius: 30, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1.5px solid",
              background: activeBudget === f ? "#f0822d" : "#fff",
              borderColor: activeBudget === f ? "#f0822d" : "#e5e7eb",
              color: activeBudget === f ? "#fff" : "#374151",
              transition: "all 0.15s",
            }}
          >{f}</button>
        ))}
      </div>

      {/* Property tier cards */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${visibleTiers.length}, 1fr)`, gap: 20 }}>
        {visibleTiers.map((tier, i) => (
          <div key={i} style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: tier.labelColor, textTransform: "uppercase", letterSpacing: 0.8 }}>{tier.label}</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: 0, lineHeight: 1.3 }}>{tier.title}</h3>
            <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{tier.desc}</p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
              {tier.bullets.map((b, bi) => (
                <li key={bi} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#374151" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: tier.labelColor, marginTop: 5, flexShrink: 0 }} />
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: tier.labelColor }}>{tier.priceRange}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: tier.yieldBadgeColor, background: tier.yieldBadgeColor + "18", padding: "3px 12px", borderRadius: 20 }}>{tier.yieldBadge}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ROI projection */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 16 }}>📈 10-Year ROI Projection — {country.name}</div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { label: "Rental Yield", val: data.tiers[1]?.yieldBadge || "~7%" },
            { label: "Capital Growth (est.)", val: "~5–8% p.a." },
            { label: "Total 10-Year Return", val: "120–180%" },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, minWidth: 120, background: "#fafafa", borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#f0822d" }}>{item.val}</div>
              <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, marginTop: 4 }}>{item.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#1d4ed8", lineHeight: 1.7 }}>
          💡 {data.roiNote}
        </div>
      </div>

      {/* Golden visa teaser */}
      {goldenVisa && (
        <div style={{ background: "linear-gradient(135deg, #1e1b4b, #1d4ed8)", borderRadius: 14, padding: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>VISA & RESIDENCY</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{goldenVisa.headline}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{goldenVisa.subtitle}</div>
          </div>
          <button
            onClick={() => {}}
            style={{ background: "#f0822d", color: "#fff", padding: "12px 24px", borderRadius: 8, fontWeight: 700, border: "none", cursor: "pointer", fontSize: 14, whiteSpace: "nowrap" }}
          >
            View Full Visa Guide →
          </button>
        </div>
      )}
    </div>
  );
}

function GoldenVisaSection({ data, country }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#f0822d", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>VISA & RESIDENCY</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{data.headline}</h2>
        <p style={{ fontSize: 14, color: "#6b7280" }}>{data.subtitle}</p>
      </div>

      {/* Main dark card */}
      <div style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)", borderRadius: 16, padding: 32, color: "#fff" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 10 }}>🛂 {data.card.title}</div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 24, maxWidth: 700 }}>{data.card.body}</p>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
          {data.card.stats.map((stat, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#f0822d" }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 3 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {data.card.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#f0822d", color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5, paddingTop: 3 }}>{step}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={data.card.ctaLink || `/listings?location=${country.locationParam}`} style={{ background: "#f0822d", color: "#fff", padding: "12px 22px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 14 }}>Browse Properties</Link>
          <Link href="/copilot" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "12px 22px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 14 }}>Ask Globperty AI</Link>
        </div>
      </div>

      {/* Benefits + Rules */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 16 }}>✅ What This Gives You</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {data.benefits.map((b, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
                <span style={{ color: "#16a34a", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>●</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 16 }}>⚠️ Important Rules to Know</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {data.rules.map((r, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
                <span style={{ color: "#f0822d", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>●</span>
                {r}
              </li>
            ))}
          </ul>
          {/* Warning box */}
          <div style={{ marginTop: 16, background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#92400e", lineHeight: 1.6 }}>
            📞 {data.warning}
          </div>
        </div>
      </div>
    </div>
  );
}

function BuyingGuideSection({ data, country }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#f0822d", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>BUYING GUIDE</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{data.headline}</h2>
        <p style={{ fontSize: 14, color: "#6b7280" }}>{data.subtitle}</p>
      </div>

      {/* Alert box */}
      <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: "14px 18px", fontSize: 13, color: "#92400e", lineHeight: 1.7 }}>
        {data.alert}
      </div>

      {/* Steps */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 20 }}>📋 Step-by-Step Purchase Process</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {data.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 16, paddingBottom: i < data.steps.length - 1 ? 24 : 0, position: "relative" }}>
              {/* Line connector */}
              {i < data.steps.length - 1 && (
                <div style={{ position: "absolute", left: 16, top: 32, bottom: 0, width: 2, background: "#e5e7eb" }} />
              )}
              {/* Step number */}
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1d4ed8", color: "#fff", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{step.title}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, background: "#f0fdf4", color: "#16a34a", padding: "2px 10px", borderRadius: 20, border: "1px solid #bbf7d0", whiteSpace: "nowrap" }}>
                    ⏱ {step.time}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost table */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ background: "#111827", padding: "14px 20px", fontSize: 14, fontWeight: 700, color: "#fff" }}>
          💰 Full Cost Breakdown — {country.name} Property Purchase
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1f2937" }}>
                {["FEE / TAX", "AMOUNT", "PAID TO", "TIMING"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "#9ca3af", textAlign: "left", letterSpacing: 0.8, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.costs.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: row.highlight ? "#fff8f4" : i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "13px 14px", fontSize: 13, fontWeight: row.highlight ? 700 : 600, color: row.highlight ? "#f0822d" : "#111827", whiteSpace: "nowrap" }}>
                    {row.highlight && <span style={{ marginRight: 6 }}>★</span>}
                    {row.fee}
                  </td>
                  <td style={{ padding: "13px 14px", fontSize: 13, fontWeight: 700, color: "#374151" }}>{row.amount}</td>
                  <td style={{ padding: "13px 14px", fontSize: 13, color: "#6b7280" }}>{row.paidTo}</td>
                  <td style={{ padding: "13px 14px", fontSize: 12, color: "#374151", whiteSpace: "nowrap" }}>{row.timing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "12px 20px", background: "#fafafa", fontSize: 12, color: "#9ca3af", borderTop: "1px solid #f0f0f0" }}>
          ★ Highlighted rows are costs buyers most commonly underestimate. Figures are approximate — consult a licensed local lawyer before proceeding.
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)", borderRadius: 14, padding: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Ready to buy in {country.name}?</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>Our Globperty AI can answer any legal, tax, or process question instantly.</div>
        </div>
        <Link href="/copilot" style={{ background: "#f0822d", color: "#fff", padding: "12px 24px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 14, whiteSpace: "nowrap" }}>
          🤖 Ask Globperty AI
        </Link>
      </div>
    </div>
  );
}

function TaxesLegalSection({ data, country }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#f0822d", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>TAXES & LEGAL</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{data.headline}</h2>
        <p style={{ fontSize: 14, color: "#6b7280" }}>{data.subtitle}</p>
      </div>
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "14px 18px", fontSize: 13, color: "#166534", lineHeight: 1.7 }}>
        <strong>{data.alert?.split(":")[0]}:</strong>{data.alert?.split(":").slice(1).join(":")}
      </div>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#111827" }}>
              {["TAX TYPE", "RATE", "DETAILS"].map(h => (
                <th key={h} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "#9ca3af", textAlign: "left", letterSpacing: 0.8 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(data.taxes || []).map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#111827" }}>{row.type}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 800, color: row.rateColor || "#111827" }}>{row.rate}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{row.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.investorNote && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "14px 18px", fontSize: 13, color: "#92400e", lineHeight: 1.7 }}>
          {data.investorNote}
        </div>
      )}
      <div style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)", borderRadius: 14, padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Need personalised tax advice for {country.name}?</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>Ask Globperty AI any tax, legal, or DTAA question instantly.</div>
        </div>
        <Link href="/copilot" style={{ background: "#f0822d", color: "#fff", padding: "12px 22px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 14 }}>🤖 Ask AI</Link>
      </div>
    </div>
  );
}

function FinanceSection({ data }) {
  const [price, setPrice] = useState(data.calculator?.defaultPrice || 1000000);
  const [downPct, setDownPct] = useState(data.calculator?.defaultDown || 20);
  const [rate, setRate] = useState(data.calculator?.defaultRate || 5.5);
  const [term, setTerm] = useState(data.calculator?.defaultTerm || 25);
  const currency = data.calculator?.currency || "$";

  const loanAmt = price * (1 - downPct / 100);
  const monthlyRate = rate / 100 / 12;
  const n = term * 12;
  const monthly = monthlyRate > 0 ? loanAmt * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1) : loanAmt / n;
  const totalInterest = monthly * n - loanAmt;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#f0822d", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>FINANCE & MORTGAGES</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{data.headline}</h2>
        <p style={{ fontSize: 14, color: "#6b7280" }}>{data.subtitle}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Mortgage rules */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 16 }}>🏦 Mortgage Rules for Foreigners</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {(data.mortgageRules || []).map((r, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, lineHeight: 1.5 }}>
                <span style={{ color: r.color || "#6b7280", width: 8, height: 8, borderRadius: "50%", background: r.color || "#6b7280", flexShrink: 0, marginTop: 5 }} />
                <span><strong style={{ color: "#374151" }}>{r.label}</strong> <span style={{ color: "#6b7280" }}>{r.value}</span></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mortgage calculator */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 16 }}>💰 Mortgage Calculator</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[
              { label: `PROPERTY PRICE (${currency})`, value: price, setter: setPrice, step: 50000 },
              { label: "DOWN PAYMENT", value: `${downPct}%`, isSelect: true, opts: ["10%","15%","20%","25%","30%","35%","40%"], setter: v => setDownPct(parseInt(v)) },
              { label: "INTEREST RATE (%)", value: rate, setter: setRate, step: 0.1 },
              { label: "LOAN TERM", isSelect: true, value: `${term} years`, opts: ["10 years","15 years","20 years","25 years","30 years"], setter: v => setTerm(parseInt(v)) },
            ].map((f, fi) => (
              <div key={fi}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: 0.8, marginBottom: 4 }}>{f.label}</div>
                {f.isSelect ? (
                  <select value={f.value} onChange={e => f.setter(e.target.value)} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 13, background: "#fff" }}>
                    {f.opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type="number" value={f.value} onChange={e => f.setter(Number(e.target.value))} step={f.step} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 13, boxSizing: "border-box" }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ background: "#1d4ed8", borderRadius: 10, padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>Estimated Monthly Payment</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>{currency} {Math.round(monthly).toLocaleString()} / month</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12, color: "#6b7280" }}>
            <span>Loan amount: <strong>{currency} {Math.round(loanAmt).toLocaleString()}</strong></span>
            <span>Total interest: <strong>{currency} {Math.round(totalInterest).toLocaleString()}</strong></span>
          </div>
        </div>
      </div>

      {/* Banks table */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", background: "#111827", fontSize: 14, fontWeight: 700, color: "#fff" }}>
          🏛️ Top {data.banks?.[0]?.name?.includes("Maybank") ? "Malaysian" : ""} Banks Offering Foreign Buyer Mortgages
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1f2937" }}>
                {["BANK", "RATE FROM", "MAX LTV", "NON-RESIDENT?", "ISLAMIC?"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#9ca3af", textAlign: "left", letterSpacing: 0.8 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(data.banks || []).map((b, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#111827" }}>{b.name}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{b.rateFrom}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{b.maxLtv}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: b.nonResidentColor || "#6b7280" }}>{b.nonResident}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: b.islamicColor || "#6b7280" }}>{b.islamic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BusinessSection({ data, country }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#f0822d", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>BUSINESS & ECONOMY</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{data.headline}</h2>
        <p style={{ fontSize: 14, color: "#6b7280" }}>{data.subtitle}</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {(data.stats || []).map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.valueColor || "#1d4ed8" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Setup options */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 16 }}>🏭 Ways to Set Up a Business</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {(data.setupOptions || []).map((opt, i) => (
              <div key={i} style={{ background: opt.color + "10", border: `1px solid ${opt.color}30`, borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: opt.color, marginBottom: 4 }}>{opt.name}</div>
                <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{opt.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Economic stats */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 16 }}>💰 Key Economic Stats</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {(data.economicStats || []).map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111827", textAlign: "right", maxWidth: "55%" }}>{s.value}</span>
              </div>
            ))}
          </div>
          <Link href="/copilot" style={{ display: "block", marginTop: 16, textAlign: "center", background: "#f0822d", color: "#fff", padding: "10px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 13 }}>
            Ask AI About Business in {country.name}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ExpatGuideSection({ data, country }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#f0822d", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>EXPAT GUIDE</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{data.headline}</h2>
        <p style={{ fontSize: 14, color: "#6b7280" }}>{data.subtitle}</p>
      </div>

      {/* Living costs table */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ background: "#111827", padding: "14px 20px", fontSize: 14, fontWeight: 700, color: "#fff" }}>
          💰 Monthly Cost of Living in {country.name} (2025 Estimate)
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1f2937" }}>
              {["CATEGORY", "MONTHLY COST", "NOTES"].map(h => (
                <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#9ca3af", textAlign: "left", letterSpacing: 0.8 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(data.livingCosts || []).map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: row.category.includes("Total") ? "#fffbeb" : i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: row.category.includes("Total") ? 700 : 600, color: "#111827" }}>{row.category}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: row.category.includes("Total") ? "#f0822d" : "#1d4ed8" }}>{row.monthly}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "#6b7280", fontStyle: "italic" }}>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Neighborhoods */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 16 }}>🏙️ Best Neighborhoods for Expats</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {(data.neighborhoods || []).map((n, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? "#f0822d" : i === 1 ? "#16a34a" : "#1d4ed8", marginBottom: 6 }}>{n.type?.toUpperCase()}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{n.name}</div>
              <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6, marginBottom: 12 }}>{n.desc}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "#9ca3af" }}>Avg Rent/yr</span>
                <span style={{ fontWeight: 700, color: "#111827" }}>{n.avgRent}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 4 }}>
                <span style={{ color: "#9ca3af" }}>Best for</span>
                <span style={{ fontWeight: 600, color: "#374151" }}>{n.bestFor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lifestyle */}
      {data.lifestyle && (
        <div style={{ background: "linear-gradient(135deg, #1e1b4b, #1d4ed8)", borderRadius: 14, padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>{data.lifestyle}</div>
          </div>
          <Link href="/copilot" style={{ background: "#f0822d", color: "#fff", padding: "12px 22px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 14, whiteSpace: "nowrap" }}>
            🤖 Ask About Living in {country.name}
          </Link>
        </div>
      )}
    </div>
  );
}

function ListingsSection({ country }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getAllProperties()
      .then(all => {
        const loc = country.locationParam || country.name;
        const filtered = (all || []).filter(p =>
          p.country?.toLowerCase().includes(loc.toLowerCase()) ||
          p.location?.toLowerCase().includes(loc.toLowerCase()) ||
          p.city?.toLowerCase().includes(loc.toLowerCase())
        );
        setProperties(filtered.length > 0 ? filtered : (all || []).slice(0, 6));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [country]);

  const filters = ["All", "Buy", "Rent", "Off-Plan", "Golden Visa Eligible"];
  const visible = filter === "All" ? properties :
    filter === "Buy" ? properties.filter(p => p.adType?.toLowerCase().includes("sale") || p.adType?.toLowerCase().includes("buy")) :
    filter === "Rent" ? properties.filter(p => p.adType?.toLowerCase().includes("rent")) :
    filter === "Off-Plan" ? properties.filter(p => p.adType?.toLowerCase().includes("off") || p.propertyAge?.toLowerCase().includes("new")) :
    properties;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#f0822d", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>PROPERTIES IN {country.name.toUpperCase()}</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 4 }}>Featured {country.name} Properties on Globperty</h2>
        <p style={{ fontSize: 14, color: "#6b7280" }}>Verified listings from registered agents — updated daily</p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "8px 18px", borderRadius: 30, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: filter === f ? "#1d4ed8" : "#fff",
            border: `1.5px solid ${filter === f ? "#1d4ed8" : "#e5e7eb"}`,
            color: filter === f ? "#fff" : "#374151",
          }}>{f} {filter === f && properties.length > 0 ? `(${visible.length})` : ""}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af" }}>Loading {country.name} properties…</div>
      ) : visible.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af", fontSize: 14 }}>
          No {country.name} listings currently. <Link href="/listings" style={{ color: "#f0822d" }}>Browse all listings →</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {visible.slice(0, 6).map(p => (
            <Link key={p.id || p._id} href={`/property-detail-v1/${p.id || p._id}`} style={{ textDecoration: "none" }}>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s" }}>
                <div style={{ position: "relative", height: 180, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {p.imageSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imageSrc} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: 40 }}>🏠</span>
                  )}
                  <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6 }}>
                    {p.featured && <span style={{ background: "#1d4ed8", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>Featured</span>}
                    <span style={{ background: "#f0822d", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>{p.adType || "For Sale"}</span>
                  </div>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4, lineHeight: 1.3 }}>{p.title || "Property Listing"}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
                    <i className="icon-location" style={{ fontSize: 10 }} />{p.location || p.city}
                  </div>
                  <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#6b7280", marginBottom: 12 }}>
                    {p.beds && <span>🛏 {p.beds}</span>}
                    {p.baths && <span>🚿 {p.baths}</span>}
                    {p.sqft && <span>📐 {p.sqft} sqft</span>}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#f0822d" }}>
                      {p.price ? `$${Number(p.price).toLocaleString()}` : "Price on request"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link href={`/listings?location=${country.locationParam || country.name}`} style={{ display: "block", textAlign: "center", background: "#1d4ed8", color: "#fff", padding: "14px", borderRadius: 10, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>
        View All {country.name} Properties →
      </Link>
    </div>
  );
}

function ComingSoonSection({ tab, country }) {
  return (
    <div style={{ background: "#fff", border: "1px dashed #d1d5db", borderRadius: 16, padding: 60, textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{TAB_ICONS[tab]}</div>
      <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{tab} — {country.name}</h3>
      <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 24 }}>
        Detailed {tab.toLowerCase()} information for {country.name} is being prepared by our research team.
      </p>
      <Link href="/copilot" style={{ background: "#f0822d", color: "#fff", padding: "12px 28px", borderRadius: 8, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
        🤖 Ask Globperty AI About {tab}
      </Link>
    </div>
  );
}

function Sidebar({ country, cityListings, totalListings }) {
  const [aiQuery, setAiQuery] = useState("");
  const sN = country.shortName || country.name.split(" ")[0];

  return (
    <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", gap: 20, position: "sticky", top: 60, maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}>

      {/* At a Glance */}
      <div style={{ background: "#0f1423", borderRadius: 14, padding: 20, color: "#fff" }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          📊 {sN} At a Glance
        </div>
        {Object.entries(country.atAGlance || {}).map(([key, val]) => {
          const isObj = typeof val === "object";
          return (
            <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 9, marginBottom: 9, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", flex: 1 }}>{key}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: isObj ? val.color : "#fff", textAlign: "right", maxWidth: 140 }}>
                {isObj ? val.value : val}
              </span>
            </div>
          );
        })}
        <Link href={`/listings?location=${country.locationParam}`} style={{ display: "block", width: "100%", background: "#1d4ed8", color: "#fff", textAlign: "center", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none", marginTop: 6 }}>
          Browse {sN} Properties
        </Link>
      </div>

      {/* Ask Globperty AI */}
      <div style={{ background: "#1e1b4b", borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8 }}>🤖 Ask Globperty AI</div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 14, lineHeight: 1.6 }}>
          Ask anything about {sN} property — yields, visa, legal, mortgage, best areas for your budget...
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder={`e.g. Best ${country.cities?.[0] || country.name.split(" ")[0]} area for 7% yield?`}
            style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 12 }}
          />
          <Link href={`/copilot${aiQuery ? `?q=${encodeURIComponent(aiQuery)}` : ""}`} style={{ background: "#1d4ed8", color: "#fff", padding: "10px 14px", borderRadius: 8, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center" }}>
            →
          </Link>
        </div>
      </div>

      {/* Browse by City */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 20 }}>
        <div style={{ background: "#1d4ed8", margin: "-20px -20px 16px", padding: "14px 20px", borderRadius: "14px 14px 0 0", color: "#fff", fontSize: 14, fontWeight: 700 }}>
          🏙️ Browse by {sN} City
        </div>
        {(country.cities || []).slice(0, 6).map((city) => {
          const count = cityListings[city] || cityListings[city.split(" ")[0]] || 0;
          return (
            <div key={city} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid #f3f4f6" }}>
              <Link href={`/listings?location=${country.locationParam}&city=${encodeURIComponent(city)}`} style={{ fontSize: 14, color: "#374151", textDecoration: "none", fontWeight: 500 }}>
                {city}
              </Link>
              <span style={{ background: "#dbeafe", color: "#1d4ed8", fontSize: 12, fontWeight: 700, padding: "2px 10px", borderRadius: 20 }}>
                {count > 0 ? count.toLocaleString() : "—"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Visa card */}
      {country.visaCard && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 20, overflow: "hidden" }}>
          <div style={{ background: country.visaCard.headerColor || "#f0822d", margin: "-20px -20px 16px", padding: "14px 20px", borderRadius: "14px 14px 0 0", color: "#fff", fontSize: 14, fontWeight: 700 }}>
            {country.visaCard.icon} {country.visaCard.title}
          </div>
          {(country.visaCard.fields || []).map((f) => (
            <div key={f.label} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid #f3f4f6" }}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>{f.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: f.color || "#111827" }}>{f.value}</span>
            </div>
          ))}
          <Link href={country.visaCard.ctaLink || "/contact"} style={{ display: "block", width: "100%", background: country.visaCard.headerColor || "#f0822d", color: "#fff", textAlign: "center", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none", marginTop: 6 }}>
            {country.visaCard.ctaLabel || "Learn More"}
          </Link>
        </div>
      )}

      {/* Mortgage Help */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 20 }}>
        <div style={{ background: "#16a34a", margin: "-20px -20px 16px", padding: "14px 20px", borderRadius: "14px 14px 0 0", color: "#fff", fontSize: 14, fontWeight: 700 }}>
          🏦 Get Mortgage Help
        </div>
        <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 14 }}>
          Compare {sN} mortgage rates from 12+ lenders. Pre-approved in 48 hours. Free service.
        </p>
        <Link href="/home-loan-process" style={{ display: "block", width: "100%", background: "#1d4ed8", color: "#fff", textAlign: "center", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
          Compare Mortgages
        </Link>
      </div>
    </div>
  );
}
