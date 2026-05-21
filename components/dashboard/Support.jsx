"use client";
import React, { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    q: "How do I list my property on Globperty?",
    a: "Go to Add Property in your sidebar. Fill in property details, upload photos, set your price, and submit. Your listing will be reviewed and published within 24 hours.",
  },
  {
    q: "How do I schedule a visit to a property?",
    a: "On any property detail page, click 'Schedule a Tour'. Choose in-person or video call, pick your preferred date and time, and submit. The seller will confirm your visit.",
  },
  {
    q: "How does the offer process work?",
    a: "On a property detail page, click 'Make an Offer'. Enter your offer price and any message. The seller will accept, decline, or counter-offer. Track all your offers in My Deals.",
  },
  {
    q: "What is the Deal Tracker?",
    a: "The Deal Tracker is a Kanban board showing your deals across 4 stages: Shortlisted, Offer Made, Negotiating, and Closed. It gives you a visual overview of your pipeline.",
  },
  {
    q: "How do I set up price alerts?",
    a: "Go to Price Alerts in your sidebar. Click '+ New Alert', set your filters (city, property type, price range), and save. You'll be notified when new matching properties are listed.",
  },
  {
    q: "How do I verify my account?",
    a: "Go to your Profile page and complete the KYC section by uploading your ID document. Verified accounts get a trust badge and higher visibility in search results.",
  },
  {
    q: "How does the AI assistant work?",
    a: "The AI assistant (Messages in your sidebar) can answer questions about properties, market trends, buying/selling processes, and more. It's powered by real property data.",
  },
  {
    q: "How do I contact a buyer or seller directly?",
    a: "Use the lead form on any property page to contact the seller. Sellers can respond via the Leads section. For urgent matters, use the contact info on the property detail page.",
  },
];

function FAQItem({ faq, open, onToggle }) {
  return (
    <div style={{
      border: "1px solid #eef0f3",
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: 8,
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: open ? "#FFF7ED" : "#fff",
          border: "none",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          textAlign: "left",
          gap: 10,
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 14, color: "#1a2332", flex: 1 }}>{faq.q}</span>
        <span style={{ fontSize: 18, color: "#f0822d", flexShrink: 0, lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{ padding: "12px 16px 16px", background: "#fff", fontSize: 13, color: "#555", lineHeight: 1.65, borderTop: "1px solid #f0f0f0" }}>
          {faq.a}
        </div>
      )}
    </div>
  );
}

export default function Support() {
  const [openIdx, setOpenIdx] = useState(null);
  const [form, setForm] = useState({ subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);
  const set = (f) => (e) => setForm((prev) => ({ ...prev, [f]: e.target.value }));

  const handleSend = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ subject: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e0e3e8",
    borderRadius: 8,
    fontSize: 13,
    color: "#1a2332",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, marginBottom: 24 }}>
          {[
            { icon: "📖", label: "Getting Started", desc: "Learn the basics" },
            { icon: "🏠", label: "Listing Guide", desc: "How to list a property" },
            { icon: "💼", label: "Buying Guide", desc: "Step-by-step process" },
            { icon: "📞", label: "Contact Us", desc: "support@globperty.com" },
          ].map((card) => (
            <div key={card.label} style={{
              background: "#fff",
              border: "1px solid #eef0f3",
              borderRadius: 12,
              padding: "16px 14px",
              textAlign: "center",
              cursor: "pointer",
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#1a2332", marginBottom: 4 }}>{card.label}</div>
              <div style={{ fontSize: 12, color: "#888" }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="support-grid">
          {/* FAQ */}
          <div className="widget-box-2 wd-listing">
            <h3 className="title">Frequently Asked Questions</h3>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} faq={faq} open={openIdx === i} onToggle={() => toggle(i)} />
            ))}
          </div>

          {/* Contact form */}
          <div className="widget-box-2 wd-listing">
            <h3 className="title">Send Us a Message</h3>
            {sent ? (
              <div style={{ padding: "40px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#10B981", marginBottom: 6 }}>Message sent!</div>
                <div style={{ fontSize: 13, color: "#888" }}>We'll get back to you within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 4 }}>Subject</label>
                  <input value={form.subject} onChange={set("subject")} placeholder="What's your question?" style={inputStyle} required />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 4 }}>Message</label>
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Describe your issue or question in detail…"
                    rows={6}
                    style={{ ...inputStyle, resize: "vertical" }}
                    required
                  />
                </div>
                <div style={{ fontSize: 12, color: "#888", background: "#f8fafc", border: "1px solid #eef0f3", borderRadius: 8, padding: "10px 14px" }}>
                  📧 We typically respond within 24 hours. For urgent matters, email us at{" "}
                  <a href="mailto:support@globperty.com" style={{ color: "#f0822d", fontWeight: 600 }}>support@globperty.com</a>
                </div>
                <button
                  type="submit"
                  style={{ background: "#f0822d", color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .support-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        <div className="footer-dashboard">
          <p>Copyright © {new Date().getFullYear()} Globperty</p>
          <ul className="list">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
      </div>
      <div className="overlay-dashboard" />
    </div>
  );
}
