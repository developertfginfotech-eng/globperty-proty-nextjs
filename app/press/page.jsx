import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

export const metadata = {
  title: "Press & Media — Globperty",
  description: "Globperty press kit, media enquiries, recent coverage, and brand assets for journalists and content creators.",
};

export default function PressPage() {
  const coverage = [
    { quote: "The platform making cross-border real estate effortless", source: "PropTech Weekly" },
    { quote: "Top 10 Real Estate Startups to Watch", source: "TechCrunch" },
    { quote: "Virtual property expos are the future — Globperty leads the way", source: "Forbes" },
  ];

  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header1 />
        <div className="main-content">

          <section className="flat-section flat-banner-v6" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", padding: "80px 0 60px" }}>
            <div className="tf-container">
              <div className="row justify-content-center text-center">
                <div className="col-lg-7">
                  <div className="sub-title fw-7 text-white mb-12" style={{ fontSize: 13, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>Press & Media</div>
                  <h1 className="text-white fw-8 mb-20" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>Globperty in the News</h1>
                  <p className="text-white" style={{ fontSize: 16, opacity: 0.8 }}>
                    For media enquiries, press kits, and interview requests — we'd love to connect.
                  </p>
                  <a href="mailto:press@globperty.com" className="tf-btn btn-gradient mt-24 d-inline-block">press@globperty.com</a>
                </div>
              </div>
            </div>
          </section>

          {/* PRESS KIT */}
          <section className="flat-section tf-spacing-6">
            <div className="tf-container">
              <div className="row gy-32">
                <div className="col-lg-5">
                  <div className="heading-section mb-32">
                    <div className="sub-title fw-7 text-color-primary mb-12">Press Kit</div>
                    <h2 className="title mb-16">Brand Assets & Resources</h2>
                    <p className="text-variant-1 body-2 mb-24">
                      Everything you need to cover Globperty accurately and compellingly. Download our press kit for brand assets, founder bios, and company overview.
                    </p>
                  </div>
                  <ul className="list-style-none" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {["Company overview & fact sheet", "Founder bios & high-res headshots", "Brand logos & style guide", "Product screenshots & demo videos"].map((item, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                        <i className="icon-check-circle text-color-primary" style={{ fontSize: 18 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="mailto:press@globperty.com" className="tf-btn btn-gradient mt-32 d-inline-block">Request Press Kit</a>
                </div>

                <div className="col-lg-7">
                  <div className="heading-section mb-32">
                    <div className="sub-title fw-7 text-color-primary mb-12">Recent Coverage</div>
                    <h2 className="title mb-16">What They're Saying</h2>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {coverage.map((c, i) => (
                      <div key={i} style={{ padding: "24px 28px", borderRadius: 12, border: "1.5px solid #e8edf5", background: "#fff" }}>
                        <p style={{ fontSize: 16, fontWeight: 600, fontStyle: "italic", color: "#334155", marginBottom: 10, lineHeight: 1.6 }}>
                          &ldquo;{c.quote}&rdquo;
                        </p>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#f57224" }}>— {c.source}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
        <Footer1 />
      </div>
    </>
  );
}
