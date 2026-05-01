"use client";

export default function PropertyCard({ property, isSelected, onSelect }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:3001";
  const rawImage = Array.isArray(property.images) ? property.images[0] : property.images;
  const imageUrl = rawImage
    ? rawImage.startsWith("http") ? rawImage : `${API_BASE}${rawImage}`
    : "/images/listings/list-1.jpg";

  return (
    <div
      style={{
        background: "white", borderRadius: 12, overflow: "hidden",
        boxShadow: isSelected ? "0 4px 12px rgba(102,126,234,0.3)" : "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex", gap: 12, padding: 12,
        border: isSelected ? "2px solid #667eea" : "2px solid transparent",
        cursor: "pointer", transition: "all 0.2s",
      }}
      onClick={() => onSelect(property._id || property.id)}
    >
      <div style={{ position: "relative", width: 100, height: 80, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={property.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => { e.target.src = "/images/listings/list-1.jpg"; }} />
        {isSelected && (
          <div style={{
            position: "absolute", top: 6, right: 6, width: 22, height: 22, borderRadius: 4,
            background: "#667eea", display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: 12,
          }}>✓</div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <h5 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#1a202c" }}>{property.title}</h5>
        <p style={{ margin: "4px 0", fontSize: 16, fontWeight: 700, color: "#667eea" }}>
          ${property.price?.toLocaleString()}
        </p>
        <p style={{ margin: 0, fontSize: 12, color: "#718096" }}>
          {property.bedrooms}BR · {property.bathrooms}BA · {property.city}
        </p>
        <a href={`/single-v1/${property._id || property.id}`}
          style={{
            marginTop: 6, display: "inline-block", padding: "5px 12px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white", borderRadius: 6, fontSize: 12, fontWeight: 600, textDecoration: "none",
          }}>
          View Details
        </a>
      </div>
    </div>
  );
}
