"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProperties } from "@/utils/propertyApi";

const SLOTS = [0, 1, 2];

const ROWS = [
  { label: "Type",        key: p => p.propertyType || "—" },
  { label: "Status",      key: p => p.adType || "—" },
  { label: "Price",       key: p => p.price ? `$${Number(p.price).toLocaleString()}` : "—" },
  { label: "Beds",        key: p => p.beds ?? "—" },
  { label: "Baths",       key: p => p.baths ?? "—" },
  { label: "Size (sqft)", key: p => p.sqft || "—" },
  { label: "Carpet Area", key: p => p.carpetArea ? `${p.carpetArea} sqft` : "—" },
  { label: "Floor",       key: p => p.floor != null ? `${p.floor} / ${p.totalFloor ?? "?"}` : "—" },
  { label: "Parking",     key: p => p.parking || "—" },
  { label: "Furnishing",  key: p => p.furnishing || "—" },
  { label: "Balconies",   key: p => p.balconies ?? "—" },
  { label: "Age",         key: p => p.propertyAge || "—" },
  { label: "Location",    key: p => p.location || "—" },
];

function PropertySlot({ all, selected, onSelect, onRemove }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = query.length > 1
    ? all.filter(p =>
        p.title?.toLowerCase().includes(query.toLowerCase()) ||
        p.location?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : all.slice(0, 8);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (selected) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "#f5f5f5" }}>
          <Image
            src={selected.imageSrc || "/images/property/placeholder.jpg"}
            alt={selected.title}
            width={400}
            height={240}
            style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
            unoptimized
          />
          <button
            onClick={onRemove}
            style={{
              position: "absolute", top: 8, right: 8,
              background: "rgba(0,0,0,0.55)", border: "none", borderRadius: "50%",
              width: 28, height: 28, color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
            }}
            title="Remove"
          >✕</button>
        </div>
        <div style={{ padding: "12px 0 0" }}>
          <Link href={`/property-detail-v1/${selected.id}`} style={{ fontSize: 14, fontWeight: 700, color: "#111827", textDecoration: "none", display: "block", lineHeight: 1.3 }}>
            {selected.title}
          </Link>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#f0822d", marginTop: 4 }}>
            ${Number(selected.price).toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
            <i className="icon-location" style={{ fontSize: 10 }} />
            {selected.location}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        style={{
          height: 220, borderRadius: 12, border: "2px dashed #e5e7eb",
          background: "#fafafa", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      >
        <span style={{ fontSize: 32, color: "#d1d5db" }}>+</span>
        <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>Select a property</span>
      </div>
      <div style={{ marginTop: 10, position: "relative" }}>
        <input
          type="text"
          placeholder="Search property name or location…"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          style={{
            width: "100%", padding: "9px 12px", borderRadius: 8,
            border: "1.5px solid #e5e7eb", fontSize: 12, outline: "none",
            background: "#fff", boxSizing: "border-box",
          }}
        />
        {open && filtered.length > 0 && (
          <div style={{
            position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
            background: "#fff", borderRadius: 10, border: "1.5px solid #e5e7eb",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 999, maxHeight: 260, overflowY: "auto",
          }}>
            {filtered.map(p => (
              <div
                key={p.id}
                onClick={() => { onSelect(p); setOpen(false); setQuery(""); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", cursor: "pointer", borderBottom: "1px solid #f5f5f5",
                  transition: "background 0.1s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#fff8f4"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <Image
                  src={p.imageSrc || "/images/property/placeholder.jpg"}
                  alt={p.title}
                  width={44}
                  height={36}
                  style={{ borderRadius: 6, objectFit: "cover", flexShrink: 0 }}
                  unoptimized
                />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>{p.location} · ${Number(p.price).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Compare() {
  const [all, setAll] = useState([]);
  const [slots, setSlots] = useState([null, null, null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProperties()
      .then(setAll)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const select = (i, property) => {
    setSlots(prev => {
      const next = [...prev];
      next[i] = property;
      return next;
    });
  };

  const remove = (i) => {
    setSlots(prev => {
      const next = [...prev];
      next[i] = null;
      return next;
    });
  };

  const hasAny = slots.some(Boolean);

  return (
    <div className="tf-spacing-7 pt-0">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">

            {loading ? (
              <p style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>Loading properties…</p>
            ) : (
              <>
                {/* Header */}
                <div style={{ marginBottom: 32 }}>
                  <h4 style={{ fontWeight: 700, marginBottom: 6 }}>Compare Properties</h4>
                  <p style={{ fontSize: 13, color: "#6b7280" }}>
                    Search and select up to 3 real properties from our listings to compare side by side.
                  </p>
                </div>

                {/* Property selector columns */}
                <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr 1fr", gap: 24, marginBottom: 32 }}>
                  <div />
                  {SLOTS.map(i => (
                    <PropertySlot
                      key={i}
                      all={all}
                      selected={slots[i]}
                      onSelect={p => select(i, p)}
                      onRemove={() => remove(i)}
                    />
                  ))}
                </div>

                {/* Comparison table */}
                {hasAny && (
                  <div style={{ borderRadius: 12, border: "1.5px solid #f0f0f0", overflow: "hidden" }}>
                    {ROWS.map((row, ri) => (
                      <div
                        key={ri}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "200px 1fr 1fr 1fr",
                          background: ri % 2 === 0 ? "#fafafa" : "#fff",
                          borderBottom: ri < ROWS.length - 1 ? "1px solid #f0f0f0" : "none",
                        }}
                      >
                        <div style={{ padding: "14px 20px", fontWeight: 700, fontSize: 13, color: "#111827", display: "flex", alignItems: "center" }}>
                          {row.label}
                        </div>
                        {SLOTS.map(i => (
                          <div
                            key={i}
                            style={{
                              padding: "14px 16px",
                              fontSize: 13,
                              color: slots[i] ? "#374151" : "#d1d5db",
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderLeft: "1px solid #f0f0f0",
                            }}
                          >
                            {slots[i] ? row.key(slots[i]) : "—"}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {!hasAny && (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af", fontSize: 13 }}>
                    Search and select properties above to start comparing.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
