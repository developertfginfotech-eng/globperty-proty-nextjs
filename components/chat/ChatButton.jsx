"use client";

export default function ChatButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open chat"
      style={{
        width: 60, height: 60, borderRadius: "50%",
        background: isOpen
          ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        border: "none", color: "white", fontSize: 24,
        cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s ease",
      }}
    >
      {isOpen ? "✕" : "💬"}
    </button>
  );
}
