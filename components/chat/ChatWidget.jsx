"use client";
import { useState, useEffect } from "react";
import ChatButton from "./ChatButton";
import ChatInterface from "./ChatInterface";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    let id = localStorage.getItem("chatSessionId");
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("chatSessionId", id);
    }
    setSessionId(id);
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9998 }}>
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <ChatInterface sessionId={sessionId} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
