"use client";
import Link from "next/link";

export default function ToolPageHero({ config }) {
  const { badge, titleWhite, titleOrange, tagline, tags, stats, bgImage, primaryCta, secondaryCta, snapshotTitle, snapshot } = config;

  return (
    <section style={{
      position: "relative",
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      background: `linear-gradient(to bottom, rgba(10,16,30,0.78) 0%, rgba(10,16,30,0.88) 60%, rgba(10,16,30,0.97) 100%), url('${bgImage}') center/cover no-repeat`,
      paddingTop: 80,
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 24px 48px", width: "100%", display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>

        {/* Left content */}
        <div style={{ flex: 1, minWidth: 300 }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(240,130,45,0.15)", border: "1px solid rgba(240,130,45,0.4)", borderRadius: 24, padding: "6px 16px", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "#f0822d", fontWeight: 600, letterSpacing: 1 }}>{badge}</span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
            {titleWhite}<span style={{ color: "#f0822d" }}>{titleOrange}</span>
          </h1>

          {/* Tagline */}
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 600, marginBottom: 24 }}>
            {tagline}
          </p>

          {/* Feature tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
            {tags.map((tag) => (
              <span key={tag} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 14px", fontSize: 13, color: "#fff", fontWeight: 500 }}>
                ✓ {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 36 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "16px 22px", minWidth: 110, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#f0822d", marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href={primaryCta.href} style={{ background: "#f0822d", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              {primaryCta.label}
            </Link>
            <Link href={secondaryCta.href} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "14px 24px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              {secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* Snapshot card */}
        <div style={{ width: 270, flexShrink: 0, background: "rgba(15,20,35,0.92)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "24px", backdropFilter: "blur(12px)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
            {snapshotTitle}
          </div>
          {snapshot.map(({ key, value, color }) => (
            <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", flex: 1 }}>{key}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: color || "#fff", textAlign: "right", maxWidth: 140 }}>{value}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
