"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CopilotFab() {
  const pathname = usePathname();
  if (pathname === "/copilot") return null;
  return (
    <Link
      href="/copilot"
      style={{
        position: "fixed", bottom: 24, left: 24, zIndex: 9999,
        display: "flex", alignItems: "center", gap: 8,
        background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
        color: "white", padding: "11px 18px", borderRadius: 50,
        textDecoration: "none", fontWeight: 600, fontSize: 13,
        boxShadow: "0 4px 20px rgba(15,52,96,0.45)",
        border: "1.5px solid rgba(235,103,83,0.5)",
        whiteSpace: "nowrap",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <span style={{ fontSize: 16 }}>🤖</span>
      Globperty AI Copilot
    </Link>
  );
}
