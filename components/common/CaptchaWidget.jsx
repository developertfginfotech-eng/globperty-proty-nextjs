"use client";
import React, { useState, useCallback } from "react";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateCode(len = 6) {
  let s = "";
  for (let i = 0; i < len; i++) s += CHARS[Math.floor(Math.random() * CHARS.length)];
  return s;
}

function CaptchaSVG({ code }) {
  const W = 180, H = 52;
  // noise lines
  const lines = Array.from({ length: 6 }, (_, i) => ({
    x1: Math.random() * W, y1: Math.random() * H,
    x2: Math.random() * W, y2: Math.random() * H,
    key: i,
  }));
  // noise dots
  const dots = Array.from({ length: 30 }, (_, i) => ({
    cx: Math.random() * W, cy: Math.random() * H, key: i,
  }));

  return (
    <svg
      width={W} height={H}
      style={{ borderRadius: 8, border: "1.5px solid #e5e7eb", background: "#f8f9ff", display: "block", userSelect: "none" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* background grid */}
      {Array.from({ length: 5 }, (_, i) => (
        <line key={`g${i}`} x1={i * 36} y1={0} x2={i * 36} y2={H} stroke="#e5e7eb" strokeWidth={0.5} />
      ))}
      {/* noise lines */}
      {lines.map(l => (
        <line key={l.key} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="#c4c9d4" strokeWidth={1} opacity={0.6} />
      ))}
      {/* noise dots */}
      {dots.map(d => (
        <circle key={d.key} cx={d.cx} cy={d.cy} r={1.2} fill="#b0b8c8" opacity={0.5} />
      ))}
      {/* characters */}
      {code.split("").map((ch, i) => {
        const x = 16 + i * 27 + (Math.random() * 6 - 3);
        const y = 34 + (Math.random() * 10 - 5);
        const rotate = Math.random() * 30 - 15;
        const size = 20 + Math.random() * 6;
        const colors = ["#1e40af", "#7c3aed", "#be123c", "#065f46", "#92400e", "#0f172a"];
        const fill = colors[i % colors.length];
        return (
          <text key={i} x={x} y={y}
            fontSize={size} fontWeight={700}
            fontFamily="'Courier New', monospace"
            fill={fill}
            transform={`rotate(${rotate}, ${x}, ${y})`}
            style={{ letterSpacing: 2 }}
          >
            {ch}
          </text>
        );
      })}
    </svg>
  );
}

export default function CaptchaWidget({ onVerify }) {
  const [code, setCode] = useState(() => generateCode());
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | ok

  const refresh = useCallback(() => {
    setCode(generateCode());
    setInput("");
    setStatus("idle");
    onVerify(false);
  }, [onVerify]);

  const handleChange = (e) => {
    const val = e.target.value.toUpperCase();
    setInput(val);
    if (val.length === code.length) {
      if (val === code) {
        setStatus("ok");
        onVerify(true);
      } else {
        setStatus("error");
        onVerify(false);
        setTimeout(() => {
          setCode(generateCode());
          setInput("");
          setStatus("idle");
        }, 900);
      }
    } else {
      setStatus("idle");
      onVerify(false);
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8, display: "block" }}>
        Security Check
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <CaptchaSVG code={code} />
        <button type="button" onClick={refresh} title="Refresh"
          style={{ width: 36, height: 36, borderRadius: 8, border: "1.5px solid #e5e7eb", background: "#f9fafb", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
          </svg>
        </button>
      </div>
      <style jsx>{`
        .captcha-input::placeholder {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          letter-spacing: normal;
          font-weight: 400;
          color: #b0b8c8;
          font-size: 14px;
        }
      `}</style>
      <div style={{ marginTop: 8, position: "relative" }}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          maxLength={code.length}
          placeholder="Type the characters above"
          autoComplete="off"
          className="captcha-input"
          style={{
            width: "100%", padding: "10px 40px 10px 14px", borderRadius: 10, fontSize: 16,
            fontFamily: "'Courier New', monospace", letterSpacing: 4, fontWeight: 700,
            border: status === "error" ? "2px solid #ef4444" : status === "ok" ? "2px solid #22c55e" : "1.5px solid #e5e7eb",
            background: status === "ok" ? "#f0fdf4" : "#fafafa",
            outline: "none", transition: "border-color 0.15s",
          }}
        />
        {status === "ok" && (
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#22c55e", fontSize: 18 }}>✓</span>
        )}
        {status === "error" && (
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#ef4444", fontSize: 18 }}>✗</span>
        )}
      </div>
      {status === "error" && (
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "#ef4444" }}>Incorrect — a new code has been generated</p>
      )}
    </div>
  );
}
