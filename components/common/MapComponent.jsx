"use client";

export default function MapComponent() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "clamp(250px, 40vw, 450px)", overflow: "hidden" }}>
      <iframe
        title="Globperty Headquarters — London"
        width="100%"
        height="100%"
        style={{ border: 0, display: "block", minHeight: "clamp(250px, 40vw, 450px)" }}
        loading="lazy"
        allowFullScreen
        src="https://www.openstreetmap.org/export/embed.html?bbox=-0.2000%2C51.4900%2C-0.0500%2C51.5300&layer=mapnik&marker=51.5074%2C-0.1278"
      />
    </div>
  );
}
