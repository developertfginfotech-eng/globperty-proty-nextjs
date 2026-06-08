import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

export const metadata = {
  title: "Press & Media — Globperty",
  description: "Globperty press kit, media enquiries, recent coverage, and brand assets.",
};

const coverage = [
  { quote: "The platform making cross-border real estate effortless", source: "PropTech Weekly", icon: "📰" },
  { quote: "Top 10 Real Estate Startups to Watch", source: "TechCrunch", icon: "💻" },
  { quote: "Virtual property expos are the future — Globperty leads the way", source: "Forbes", icon: "🏆" },
];

const kitItems = [
  { icon: "icon-check-circle", text: "Company overview & fact sheet" },
  { icon: "icon-check-circle", text: "Founder bios & high-res headshots" },
  { icon: "icon-check-circle", text: "Brand logos & style guide" },
  { icon: "icon-check-circle", text: "Product screenshots & demo videos" },
];

export default function PressPage() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header1 />
        <div className="main-content">
          <Breadcumb pageName="Press & Media" />

          {/* HERO */}
          <section className="flat-section tf-spacing-6">
            <div className="tf-container">
              <div className="row justify-content-center text-center">
                <div className="col-lg-7">
                  <div className="heading-section">
                    <div className="sub-title fw-7 text-color-primary mb-16 wow animate__fadeInUp animate__animated" data-wow-duration="1s">
                      Press &amp; Media
                    </div>
                    <h2 className="title mb-16 wow animate__fadeInUp animate__animated" data-wow-duration="1s" data-wow-delay=".1s">
                      Globperty in the News
                    </h2>
                    <p className="text-1 text-variant-1 mb-24 wow animate__fadeInUp animate__animated" data-wow-duration="1s" data-wow-delay=".2s">
                      If you&apos;re a journalist, editor, or content creator covering real estate, technology, or global markets — we&apos;d love to connect.
                    </p>
                    <a href="mailto:press@globperty.com" className="tf-btn bg-color-primary fw-7 pd-17 wow animate__fadeInUp animate__animated" data-wow-duration="1s" data-wow-delay=".3s">
                      press@globperty.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PRESS KIT + COVERAGE */}
          <section className="flat-section bg-surface tf-spacing-6">
            <div className="tf-container">
              <div className="row gy-48">

                {/* PRESS KIT */}
                <div className="col-lg-5 wow animate__fadeInLeft animate__animated" data-wow-duration="1s">
                  <div className="sub-title fw-7 text-color-primary mb-12">Press Kit</div>
                  <h3 className="title mb-16">Brand Assets &amp; Resources</h3>
                  <p className="text-1 text-variant-1 mb-28">
                    Everything you need to cover Globperty accurately. Download our press kit for brand assets, founder bios, and company overview.
                  </p>
                  <div className="d-flex flex-column gap-14 mb-32">
                    {kitItems.map((item, i) => (
                      <div key={i} className="d-flex align-items-center gap-14">
                        <i className={`${item.icon} fs-20 text-color-primary`} style={{ flexShrink: 0 }} />
                        <span className="text-1">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <a href="mailto:press@globperty.com" className="tf-btn bg-color-primary fw-7 pd-17">
                    Request Press Kit
                  </a>
                </div>

                {/* RECENT COVERAGE */}
                <div className="col-lg-7 wow animate__fadeInRight animate__animated" data-wow-duration="1s">
                  <div className="sub-title fw-7 text-color-primary mb-12">Recent Coverage</div>
                  <h3 className="title mb-24">What They&apos;re Saying</h3>
                  <div className="d-flex flex-column gap-20">
                    {coverage.map((c, i) => (
                      <div key={i} className="wg-testimonial style-2" style={{ background: "#fff", border: "1.5px solid #e8edf5", borderRadius: 12, padding: "24px 28px" }}>
                        <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
                        <p className="body-1 fw-6 mb-14" style={{ fontStyle: "italic", color: "#334155", lineHeight: 1.6 }}>
                          &ldquo;{c.quote}&rdquo;
                        </p>
                        <div className="text-color-primary fw-7 text-1">— {c.source}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>

          <Cta />
        </div>
        <Footer1 />
      </div>
    </>
  );
}
