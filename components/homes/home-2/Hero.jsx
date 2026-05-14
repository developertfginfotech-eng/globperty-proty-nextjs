"use client";
import SearchForm from "@/components/common/SearchForm";
import React, { useState, useRef } from "react";

const COUNTRIES = [
  { name: "UAE",         flag: "🇦🇪" },
  { name: "USA",         flag: "🇺🇸" },
  { name: "Portugal",    flag: "🇵🇹" },
  { name: "Canada",      flag: "🇨🇦" },
  { name: "Australia",   flag: "🇦🇺" },
  { name: "Turkey",      flag: "🇹🇷" },
  { name: "Cyprus",      flag: "🇨🇾" },
  { name: "Malta",       flag: "🇲🇹" },
  { name: "Hungary",     flag: "🇭🇺" },
  { name: "Latvia",      flag: "🇱🇻" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Malaysia",    flag: "🇲🇾" },
];

const PROPERTY_TYPES = [
  "Property type", "Apartment", "House", "Villa",
  "Bungalow", "Smart Home", "Penthouse", "Office",
];

// Map spoken words → dropdown values
const TYPE_KEYWORDS = {
  apartment: "Apartment", flat: "Apartment", house: "House", home: "House",
  villa: "Villa", bungalow: "Bungalow", smart: "Smart Home",
  penthouse: "Penthouse", office: "Office",
};
const LOCATION_KEYWORDS = {
  uae: "UAE", dubai: "UAE", "abu dhabi": "UAE",
  usa: "USA", america: "USA", "united states": "USA",
  portugal: "Portugal", lisbon: "Portugal",
  canada: "Canada", toronto: "Canada",
  australia: "Australia", sydney: "Australia",
  turkey: "Turkey", istanbul: "Turkey",
  cyprus: "Cyprus", malta: "Malta",
  hungary: "Hungary", budapest: "Hungary",
  latvia: "Latvia", riga: "Latvia",
  philippines: "Philippines", manila: "Philippines",
  malaysia: "Malaysia", "kuala lumpur": "Malaysia",
};

function parseVoice(text) {
  const lower = text.toLowerCase();
  let type = null;
  let loc = null;
  for (const [kw, val] of Object.entries(TYPE_KEYWORDS)) {
    if (lower.includes(kw)) { type = val; break; }
  }
  for (const [kw, val] of Object.entries(LOCATION_KEYWORDS)) {
    if (lower.includes(kw)) { loc = val; break; }
  }
  return { type, loc };
}

export default function Hero() {
  const [activeTab, setActiveTab] = useState("Buy");
  const [propertyType, setPropertyType] = useState("Property type");
  const [location, setLocation] = useState("Location");
  const [showTypeDD, setShowTypeDD] = useState(false);
  const [showLocDD, setShowLocDD] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const recognitionRef = useRef(null);

  const tabs = ["Buy", "Sell", "Rent"];

  const handleMic = () => {
    if (typeof window === "undefined") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      const { type, loc } = parseVoice(transcript);
      if (type) setPropertyType(type);
      if (loc) setLocation(loc);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (propertyType !== "Property type") params.set("type", propertyType);
    if (location !== "Location") params.set("location", location);
    params.set("status", activeTab.toLowerCase());
    window.location.href = `/listings?${params.toString()}`;
  };

  return (
    <div
      className="page-title home02"
      style={{
        backgroundImage: "url('/images/section/page-title-2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Dark overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 1,
        pointerEvents: "none",
      }} />
      <div className="tf-container" style={{ position: "relative", zIndex: 2 }}>
        <div className="row">
          <div className="col-12">
            <div className="content-inner">
              <div className="heading-title">
                <h1 className="title">Your Way Home Starts Here</h1>
                <p className="h6 fw-4">
                  Thousands of luxury home enthusiasts just like you visit our website.
                </p>
              </div>

              <div className="hero-search-wrapper">
                {/* Tabs */}
                <div className="hero-search-tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      className={`hero-tab-btn${activeTab === tab ? " active" : ""}`}
                      onClick={() => setActiveTab(tab)}
                      type="button"
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Search bar */}
                <div className="hero-search-bar">
                  {/* Property type dropdown */}
                  <div
                    className="hero-dd-wrap"
                    style={{ flex: 1, position: "relative" }}
                  >
                    <button
                      type="button"
                      className="hero-dd-btn"
                      onClick={() => { setShowTypeDD(!showTypeDD); setShowLocDD(false); }}
                    >
                      <span style={{ color: propertyType === "Property type" ? "#9ca3af" : "#1a1a1a" }}>
                        {propertyType}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {showTypeDD && (
                      <ul className="hero-dd-list">
                        {PROPERTY_TYPES.map((t) => (
                          <li
                            key={t}
                            className={`hero-dd-item${propertyType === t ? " selected" : ""}`}
                            onClick={() => { setPropertyType(t); setShowTypeDD(false); }}
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Divider */}
                  <div style={{ width: 1, height: 32, background: "#e5e7eb", flexShrink: 0 }} />

                  {/* Location dropdown */}
                  <div
                    className="hero-dd-wrap"
                    style={{ flex: 1, position: "relative" }}
                  >
                    <button
                      type="button"
                      className="hero-dd-btn"
                      onClick={() => { setShowLocDD(!showLocDD); setShowTypeDD(false); }}
                    >
                      <span style={{ color: location === "Location" ? "#9ca3af" : "#1a1a1a", display: "flex", alignItems: "center", gap: 6 }}>
                        {location !== "Location" && (
                          <span style={{ fontSize: 18, lineHeight: 1 }}>
                            {COUNTRIES.find(c => c.name === location)?.flag}
                          </span>
                        )}
                        {location}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {showLocDD && (
                      <ul className="hero-dd-list">
                        <li
                          className={`hero-dd-item${location === "Location" ? " selected" : ""}`}
                          onClick={() => { setLocation("Location"); setShowLocDD(false); }}
                        >
                          All Countries
                        </li>
                        {COUNTRIES.map((c) => (
                          <li
                            key={c.name}
                            className={`hero-dd-item${location === c.name ? " selected" : ""}`}
                            onClick={() => { setLocation(c.name); setShowLocDD(false); }}
                            style={{ display: "flex", alignItems: "center", gap: 8 }}
                          >
                            <span style={{ fontSize: 18, lineHeight: 1 }}>{c.flag}</span>
                            <span>{c.name}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Mic button */}
                  <button
                    className={`hero-mic-btn${isListening ? " listening" : ""}`}
                    type="button"
                    onClick={handleMic}
                    title={isListening ? "Listening… click to stop" : "Search by voice"}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="9" y="2" width="6" height="11" rx="3"
                        fill={isListening ? "#ef4444" : "#7C3AED"} />
                      <path d="M5 11C5 14.866 8.134 18 12 18C15.866 18 19 14.866 19 11"
                        stroke={isListening ? "#ef4444" : "#7C3AED"} strokeWidth="2" strokeLinecap="round"/>
                      <line x1="12" y1="18" x2="12" y2="22"
                        stroke={isListening ? "#ef4444" : "#7C3AED"} strokeWidth="2" strokeLinecap="round"/>
                      <line x1="9" y1="22" x2="15" y2="22"
                        stroke={isListening ? "#ef4444" : "#7C3AED"} strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>

                  {/* Advanced filter */}
                  <button
                    className={`hero-filter-btn${showFilter ? " active" : ""}`}
                    type="button"
                    title="Advanced filters"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 4H14M10 4H3M21 12H12M8 12H3M21 20H16M12 20H3M14 2V6M8 10V14M16 18V22"
                        stroke="var(--Primary, #16b286)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Search button */}
                  <button
                    className="hero-search-submit"
                    type="button"
                    onClick={handleSearch}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2.5"/>
                      <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                    Search
                  </button>
                </div>

                <div style={{ display: showFilter ? "block" : "none" }}>
                  <SearchForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
