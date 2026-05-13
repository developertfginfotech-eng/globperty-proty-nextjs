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
        <HeroSection country={country} />
        <TabBar tabs={TABS} active={activeTab} onSelect={setActiveTab} tabRef={tabRef} />
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 24px", display: "flex", gap: 28, alignItems: "flex-start" }}>
          <main style={{ flex: 1, minWidth: 0 }}>
            {activeTab === "Overview" && <OverviewSection country={country} />}
            {activeTab === "Geography" && <GeographySection country={country} cityListings={cityListings} />}
            {!["Overview", "Geography"].includes(activeTab) && (
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

function HeroSection({ country }) {
  return (
    <section style={{
      position: "relative", minHeight: "75vh", display: "flex", alignItems: "center",
      background: `linear-gradient(to bottom, rgba(10,16,30,0.75) 0%, rgba(10,16,30,0.85) 60%, rgba(10,16,30,0.98) 100%), url('${country.heroImage}') center/cover no-repeat`,
      paddingTop: 80,
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 24px 40px", width: "100%", display: "flex", gap: 32, alignItems: "flex-start" }}>
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
              <Link href={country.visaCard.ctaLink || "/contact"} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "14px 24px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                🎫 {country.visaCard.title || "Visa Guide"}
              </Link>
            )}
          </div>
        </div>

        {/* Snapshot card */}
        <div style={{ width: 280, flexShrink: 0, background: "rgba(15,20,35,0.92)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "24px", backdropFilter: "blur(12px)" }}>
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
    <div ref={tabRef} style={{ background: "#fff", borderBottom: "2px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100, overflowX: "auto" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", display: "flex", gap: 0 }}>
        {tabs.map((tab) => (
          <button key={tab} onClick={() => onSelect(tab)} style={{
            padding: "14px 16px", fontSize: 13, fontWeight: active === tab ? 700 : 500,
            color: active === tab ? "#f0822d" : "#6b7280", background: "none", border: "none",
            borderBottom: active === tab ? "3px solid #f0822d" : "3px solid transparent",
            cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5,
            transition: "all 0.15s",
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 36 }}>
          {country.features.map((f) => (
            <div key={f.title} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 16px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      )}
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
