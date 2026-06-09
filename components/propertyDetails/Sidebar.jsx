"use client";
import React, { useState } from "react";
import Image from "next/image";
import apiClient from "@/utils/apiClient";

export default function Sidebar({ agent, propertyId }) {
  const agentName = agent?.name || "Agent";
  const agentPhone = agent?.phone || "";
  const agentEmail = agent?.email || "";

  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!token) {
      setError("Please log in to send a message.");
      return;
    }

    setSending(true);
    setError("");
    setSuccess("");

    try {
      await apiClient.post("/leads", { propertyId, message: message.trim() });
      setSuccess("Message sent! The seller will contact you shortly.");
      setMessage("");
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to send message.";
      setError(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="tf-sidebar sticky-sidebar" id="contact-seller">
      <form className="form-contact-seller mb-30" onSubmit={handleSend}>
        <h4 className="heading-title mb-30">Contact Seller</h4>
        <div className="seller-info">
          <div className="avartar">
            <Image
              alt=""
              src="/images/avatar/seller.jpg"
              width={200}
              height={200}
            />
          </div>
          <div className="content">
            <h6 className="name">{agentName}</h6>
            <ul className="contact">
              {agentPhone && (
                <li>
                  <i className="icon-phone-1" />
                  <span>{agentPhone}</span>
                </li>
              )}
              {agentEmail && (
                <li>
                  <i className="icon-mail" />
                  <a href={`mailto:${agentEmail}`}>{agentEmail}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <fieldset className="mb-30">
          <textarea
            name="message"
            cols={30}
            rows={6}
            placeholder="How can I help you?"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </fieldset>

        {success && (
          <div style={{ background: "#dcfce7", color: "#16a34a", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, fontWeight: 500 }}>
            {success}
          </div>
        )}
        {error && (
          <div style={{ background: "#fee2e2", color: "#dc2626", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, fontWeight: 500 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="tf-btn bg-color-primary w-full"
          disabled={sending || !message.trim()}
          style={{ opacity: sending ? 0.7 : 1, cursor: sending ? "not-allowed" : "pointer" }}
        >
          {sending ? "Sending..." : "Send message"}
        </button>
      </form>

      <div className="sidebar-ads mb-30">
        <div className="image-wrap">
          <Image
            className="lazyload"
            data-src="/images/blog/ads.jpg"
            alt=""
            src="/images/blog/ads.jpg"
            width={400}
            height={470}
          />
        </div>
        <div className="logo relative z-5">
          <Image
            alt=""
            src="/images/logo/globperty-logo.svg"
            width={272}
            height={85}
          />
        </div>
        <div className="box-ads relative z-5">
          <div className="content">
            <h4 className="title">
              <a href="#">We can help you find a local real estate agent</a>
            </h4>
            <div className="text-addres">
              <p>
                Connect with a trusted agent who knows the market inside out —
                whether you&apos;re buying or selling.
              </p>
            </div>
          </div>
          <a href="#" className="tf-btn fw-6 bg-color-primary fw-6 w-full">
            Connect with an agent
          </a>
        </div>
      </div>
    </div>
  );
}
