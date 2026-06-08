"use client";

export default function PageTitle() {
  return (
    <div className="page-title career" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)", minHeight: 480, display: "flex", alignItems: "center" }}>
      <div className="tf-container" style={{ width: "100%" }}>
        <div className="row justify-center">
          <div className="col-lg-8 text-center">
            <div className="content-inner">
              <div className="heading-title mb-32">
                <div style={{ fontSize: 12, fontWeight: 700, color: "#f57224", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>We&apos;re Hiring</div>
                <h1 className="title text-white" style={{ fontSize: "clamp(28px, 4.5vw, 52px)", lineHeight: 1.15, marginBottom: 20 }}>
                  Build the Future of Global Real Estate with Us
                </h1>
                <p className="h6 fw-4 text-white" style={{ opacity: 0.75, maxWidth: 560, margin: "0 auto 32px" }}>
                  We&apos;re looking for bold thinkers, passionate builders, and people who believe that real estate should have no borders.
                </p>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="#open-roles" className="tf-btn bg-color-primary fw-7 pd-15">View Open Roles</a>
                <a href="mailto:careers@globperty.com" className="tf-btn style-border color-white fw-7 pd-14">Send Your CV</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
