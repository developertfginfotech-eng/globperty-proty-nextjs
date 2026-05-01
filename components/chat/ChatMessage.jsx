"use client";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  return (
    <div style={{
      display: "flex", gap: 12, marginBottom: 16,
      flexDirection: isUser ? "row-reverse" : "row",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
        background: isUser
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", fontSize: 16,
      }}>
        {isUser ? "👤" : "🤖"}
      </div>
      <div style={{
        maxWidth: "70%", padding: "12px 16px",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        background: isUser
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          : "white",
        color: isUser ? "white" : "#1a202c",
        fontSize: 14, lineHeight: 1.5,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}>
        <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{message.content}</p>
        <span style={{ display: "block", fontSize: 11, marginTop: 6, opacity: 0.7 }}>
          {new Date(message.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}
