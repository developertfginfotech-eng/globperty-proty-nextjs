"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import apiClient from "@/utils/apiClient";

function Banner({ kycStatus }) {
  const configs = {
    approved: {
      bg: "#F0FDF4",
      border: "#bbf7d0",
      color: "#166534",
      icon: "✅",
      title: "Verified Account",
      text: "Your identity has been verified. Your profile shows a Verified badge.",
    },
    pending: {
      bg: "#FFFBEB",
      border: "#fde68a",
      color: "#92400e",
      icon: "⏳",
      title: "Under Review",
      text: "Your KYC documents are being reviewed. This typically takes 1–3 business days.",
    },
    rejected: {
      bg: "#FEF2F2",
      border: "#fecaca",
      color: "#991b1b",
      icon: "❌",
      title: "Verification Failed",
      text: "Your documents were rejected. Please resubmit with valid documents.",
    },
    not_submitted: {
      bg: "#F8FAFC",
      border: "#e2e8f0",
      color: "#475569",
      icon: "🔒",
      title: "Unverified Account",
      text: "Complete KYC to get your Verified badge and unlock full platform features.",
    },
  };

  const c = configs[kycStatus] || configs.not_submitted;

  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: 12,
      padding: "16px 20px",
      display: "flex",
      alignItems: "flex-start",
      gap: 14,
      marginBottom: 24,
    }}>
      <span style={{ fontSize: 24, flexShrink: 0 }}>{c.icon}</span>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, color: c.color, marginBottom: 3 }}>{c.title}</div>
        <div style={{ fontSize: 13, color: c.color, opacity: 0.85 }}>{c.text}</div>
      </div>
    </div>
  );
}

function Timeline({ kycStatus }) {
  const steps = [
    {
      label: "Submit Documents",
      desc: "Upload your ID and supporting documents",
      done: kycStatus !== "not_submitted",
      current: false,
    },
    {
      label: "Under Review",
      desc: "Our team verifies your documents",
      done: kycStatus === "approved",
      current: kycStatus === "pending",
    },
    {
      label: "Verified",
      desc: "Receive your Verified badge",
      done: kycStatus === "approved",
      current: false,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {steps.map((step, i) => (
        <div key={step.label} style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
          {/* Timeline spine */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 32, flexShrink: 0 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: step.done ? "#10B981" : step.current ? "#f0822d" : "#e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              flexShrink: 0,
              transition: "background 0.3s",
            }}>
              {step.done ? (
                <span style={{ color: "#fff", fontSize: 16 }}>✓</span>
              ) : step.current ? (
                <span style={{ color: "#fff", fontSize: 12 }}>●</span>
              ) : (
                <span style={{ color: "#9ca3af", fontSize: 13 }}>{i + 1}</span>
              )}
            </div>
            {i < steps.length - 1 && (
              <div style={{
                width: 2,
                flex: 1,
                minHeight: 20,
                background: step.done ? "#10B981" : "#e5e7eb",
                margin: "2px 0",
                transition: "background 0.3s",
              }} />
            )}
          </div>

          {/* Step content */}
          <div style={{ paddingBottom: i < steps.length - 1 ? 20 : 0, paddingTop: 4 }}>
            <div style={{
              fontWeight: 700,
              fontSize: 13,
              color: step.done ? "#10B981" : step.current ? "#f0822d" : "#9ca3af",
              marginBottom: 2,
            }}>
              {step.label}
              {step.current && (
                <span style={{
                  marginLeft: 8,
                  fontSize: 10,
                  background: "#FFF7ED",
                  color: "#f0822d",
                  border: "1px solid #fde8cc",
                  borderRadius: 20,
                  padding: "1px 8px",
                  fontWeight: 600,
                  verticalAlign: "middle",
                }}>
                  Current
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>{step.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DocumentVault() {
  const [kycData, setKycData] = useState(null);
  const [kycStatus, setKycStatus] = useState("not_submitted");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("role") || localStorage.getItem("userRole") || null);
    }

    apiClient.get("/kyc/status")
      .then((res) => {
        const data = res.data?.kyc || res.data?.data || res.data;
        if (data && (data._id || data.id || data.status)) {
          setKycData(data);
          setKycStatus(data.status || "pending");
        } else {
          setKycStatus("not_submitted");
        }
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 404) {
          setKycStatus("not_submitted");
        } else {
          setKycStatus("not_submitted");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const fmtDate = (str) => {
    if (!str) return "—";
    return new Date(str).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        {loading ? (
          <div style={{ padding: 60, textAlign: "center", color: "#888", fontSize: 14 }}>
            Loading verification status…
          </div>
        ) : (
          <>
            {/* Banner */}
            <Banner kycStatus={kycStatus} />

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}
              className="vault-grid"
            >
              {/* Left column */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* KYC Details card — only if approved */}
                {kycStatus === "approved" && kycData && (
                  <div className="widget-box-2 wd-listing">
                    <h3 className="title">Verification Details</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {[
                        { label: "Account Type", value: kycData.accountType || "—" },
                        { label: "Country", value: kycData.country || "—" },
                        { label: "Submitted", value: fmtDate(kycData.createdAt) },
                        { label: "Status", value: "Approved" },
                      ].map((row) => (
                        <div key={row.label} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px 0",
                          borderBottom: "1px solid #f0f0f0",
                        }}>
                          <span style={{ fontSize: 13, color: "#888" }}>{row.label}</span>
                          <span style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: row.label === "Status" ? "#10B981" : "#1a2332",
                          }}>
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div style={{
                      marginTop: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#F0FDF4",
                      border: "1px solid #bbf7d0",
                      borderRadius: 8,
                      padding: "10px 14px",
                    }}>
                      <span style={{ fontSize: 16 }}>✅</span>
                      <span style={{ fontSize: 12, color: "#166534", fontWeight: 600 }}>
                        Verified badge is active on your profile
                      </span>
                    </div>
                  </div>
                )}

                {/* CTA card — for not_submitted or rejected */}
                {(kycStatus === "not_submitted" || kycStatus === "rejected") && (
                  <div className="widget-box-2 wd-listing">
                    <h3 className="title">
                      {kycStatus === "rejected" ? "Resubmit Verification" : "Start Verification"}
                    </h3>
                    <p style={{ fontSize: 13, color: "#666", marginBottom: 20, lineHeight: 1.6 }}>
                      {kycStatus === "rejected"
                        ? "Your previous submission was rejected. Upload new valid documents to complete verification."
                        : "Verify your identity to access all platform features and build trust with buyers and sellers."}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                      {[
                        "Verified badge displayed on your profile",
                        "Higher listing visibility in search results",
                        "Access to all platform features",
                        "Build trust with buyers and sellers",
                      ].map((benefit) => (
                        <div key={benefit} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#444" }}>
                          <span style={{ color: "#10B981", fontSize: 16, flexShrink: 0 }}>✓</span>
                          {benefit}
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/kyc-property-verification"
                      style={{
                        display: "block",
                        background: "#f0822d",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "11px 0",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                        textAlign: "center",
                        textDecoration: "none",
                      }}
                    >
                      {kycStatus === "rejected" ? "Resubmit Documents" : "Start Verification"}
                    </Link>
                  </div>
                )}

                {/* What is KYC info box */}
                <div className="widget-box-2 wd-listing">
                  <h3 className="title">What is KYC?</h3>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: 0 }}>
                    KYC (Know Your Customer) is an identity verification process required to ensure the safety and
                    integrity of our platform. By verifying your identity, you help create a trusted environment
                    for all buyers and sellers on Globperty.
                  </p>
                  <div style={{
                    marginTop: 14,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}>
                    {[
                      { icon: "🪪", label: "Government ID", desc: "Passport, Driver's License, or National ID" },
                      { icon: "📋", label: "Address Proof", desc: "Utility bill or bank statement" },
                    ].map((doc) => (
                      <div key={doc.label} style={{
                        background: "#f8fafc",
                        border: "1px solid #eef0f3",
                        borderRadius: 8,
                        padding: "12px",
                      }}>
                        <div style={{ fontSize: 20, marginBottom: 4 }}>{doc.icon}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#1a2332", marginBottom: 2 }}>{doc.label}</div>
                        <div style={{ fontSize: 11, color: "#888" }}>{doc.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column — Timeline */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {(kycStatus === "pending" || kycStatus === "approved") && (
                  <div className="widget-box-2 wd-listing">
                    <h3 className="title">Verification Progress</h3>
                    <Timeline kycStatus={kycStatus} />
                  </div>
                )}

                {/* Security note */}
                <div className="widget-box-2 wd-listing">
                  <h3 className="title">Your Data is Safe</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { icon: "🔐", label: "Encrypted Storage", desc: "All documents are AES-256 encrypted at rest" },
                      { icon: "👁", label: "Limited Access", desc: "Only compliance team can view your documents" },
                      { icon: "🗑", label: "Right to Delete", desc: "You can request deletion of your data anytime" },
                      { icon: "📜", label: "GDPR Compliant", desc: "We follow all applicable data protection laws" },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: "#FFF7ED",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: 16,
                        }}>
                          {item.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2332", marginBottom: 1 }}>{item.label}</div>
                          <div style={{ fontSize: 12, color: "#888" }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div className="widget-box-2 wd-listing">
                  <h3 className="title">Common Questions</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      { q: "How long does verification take?", a: "Usually 1–3 business days after submitting valid documents." },
                      { q: "What happens if my documents are rejected?", a: "You'll see a rejection status here. Simply resubmit with clearer or correct documents." },
                      { q: "Is verification mandatory?", a: "It's optional but highly recommended. Verified users get better visibility and more trust." },
                    ].map((item) => (
                      <div key={item.q}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2332", marginBottom: 3 }}>{item.q}</div>
                        <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{item.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* If not_submitted and not rejected, still show timeline as goal preview */}
            {kycStatus === "not_submitted" && (
              <div className="widget-box-2 wd-listing" style={{ marginTop: 20 }}>
                <h3 className="title">Your Verification Journey</h3>
                <Timeline kycStatus="not_submitted" />
              </div>
            )}
          </>
        )}

        <style jsx>{`
          @media (max-width: 768px) {
            .vault-grid { grid-template-columns: 1fr !important; }
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
