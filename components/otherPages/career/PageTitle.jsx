"use client";

export default function PageTitle() {
  return (
    <div className="page-title career" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)", padding: "100px 0 80px" }}>
      <div className="tf-container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div style={{ fontSize: 12, fontWeight: 700, color: "#f57224", textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>We&apos;re Hiring</div>
            <h1 className="text-white fw-8 mb-20" style={{ fontSize: "clamp(28px, 4.5vw, 52px)", lineHeight: 1.15 }}>
              Build the Future of Global Real Estate with Us
            </h1>
            <p className="text-white mb-40" style={{ opacity: 0.75, maxWidth: 540, margin: "0 auto 40px", fontSize: 16 }}>
              We&apos;re looking for bold thinkers, passionate builders, and people who believe that real estate should have no borders.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#open-roles" className="tf-btn bg-color-primary fw-7 pd-15">View Open Roles</a>
              <a href="mailto:careers@globperty.com" className="tf-btn fw-7 pd-14" style={{ border: "2px solid rgba(255,255,255,0.6)", color: "#fff", background: "rgba(255,255,255,0.08)", borderRadius: 8 }}>Send Your CV</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
