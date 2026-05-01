"use client";
import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import PropertyCard from "./PropertyCard";
import { chatAPI } from "@/utils/chatApi";

export default function ChatInterface({ sessionId, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your AI property assistant. Ask me anything like \"Show me 3 bedroom apartments under $500k in Dubai\"",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!sessionId) return;
    const history = localStorage.getItem(`chat_${sessionId}`);
    if (history) {
      try { setMessages(JSON.parse(history)); } catch {}
    }
  }, [sessionId]);

  useEffect(() => {
    if (messages.length > 1 && sessionId) {
      localStorage.setItem(`chat_${sessionId}`, JSON.stringify(messages));
    }
  }, [messages, sessionId]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userMsg = { role: "user", content: inputValue.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    try {
      const resp = await chatAPI.sendMessage(userMsg.content, sessionId, messages.slice(-10));
      setMessages(prev => [...prev, {
        role: "assistant",
        content: resp.message || resp.aiResponse,
        properties: resp.properties || [],
        filters: resp.filters,
        timestamp: new Date(),
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "assistant", content: error.message || "Sorry, something went wrong. Please try again.",
        timestamp: new Date(), isError: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompare = async () => {
    if (selectedProperties.length < 2) return;
    setIsLoading(true);
    try {
      const resp = await chatAPI.compareProperties(selectedProperties);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: resp.comparison?.message || "Comparison complete",
        comparisonData: resp.comparison,
        timestamp: new Date(),
      }]);
      setSelectedProperties([]);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant", content: "Could not compare properties.", timestamp: new Date(), isError: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", bottom: 90, right: 20,
      width: 400, height: 600,
      background: "white", borderRadius: 16,
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white", padding: "20px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexShrink: 0,
      }}>
        <div>
          <h4 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>AI Property Assistant</h4>
          <span style={{ display: "flex", alignItems: "center", fontSize: 12, marginTop: 4, opacity: 0.9 }}>
            <span style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%", marginRight: 6, display: "inline-block" }} />
            Online
          </span>
        </div>
        <button onClick={onClose} style={{
          background: "rgba(255,255,255,0.2)", border: "none", color: "white",
          width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
        }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 20, background: "#f8f9fa" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <ChatMessage message={msg} />
            {msg.properties?.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "12px 0" }}>
                {msg.properties.map(p => (
                  <PropertyCard
                    key={p._id || p.id}
                    property={p}
                    isSelected={selectedProperties.includes(p._id || p.id)}
                    onSelect={(id) => setSelectedProperties(prev =>
                      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
                    )}
                  />
                ))}
                {selectedProperties.length >= 2 && (
                  <button onClick={handleCompare} style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "white", border: "none", padding: "12px 20px",
                    borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%",
                  }}>
                    Compare Selected ({selectedProperties.length})
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{ display: "flex", gap: 8, padding: 12, justifyContent: "center" }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 8, height: 8, background: "#667eea", borderRadius: "50%",
                display: "inline-block", animation: `bounce 1.4s infinite ease-in-out`,
                animationDelay: `${i * -0.16}s`,
              }} />
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ padding: 16, background: "white", borderTop: "1px solid #e2e8f0", display: "flex", gap: 12, flexShrink: 0 }}>
        <input
          type="text" value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => e.key === "Enter" && handleSend()}
          placeholder="Ask about properties..."
          disabled={isLoading}
          style={{
            flex: 1, padding: "12px 16px", border: "1px solid #e2e8f0",
            borderRadius: 24, fontSize: 14, outline: "none",
          }}
        />
        <button onClick={handleSend} disabled={isLoading || !inputValue.trim()} style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none", color: "white", fontSize: 18, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          opacity: (!inputValue.trim() || isLoading) ? 0.5 : 1,
        }}>➤</button>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: "12px 16px", background: "white", borderTop: "1px solid #e2e8f0", display: "flex", gap: 8, flexWrap: "wrap", flexShrink: 0 }}>
        {["Houses under $500k", "3BR with gym"].map(label => (
          <button key={label} onClick={() => setInputValue(label)} style={{
            padding: "8px 14px", background: "#f7fafc", border: "1px solid #e2e8f0",
            borderRadius: 16, fontSize: 12, color: "#4a5568", cursor: "pointer",
          }}>{label}</button>
        ))}
      </div>

      <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }`}</style>
    </div>
  );
}
