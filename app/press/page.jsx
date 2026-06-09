import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata = {
  title: "Press & Media — Globperty",
  description: "Globperty press kit, media enquiries, recent coverage, and brand assets.",
};

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80",
  badge: "Press & Media",
  titleWhite: "Globperty ",
  titleOrange: "in the News",
  tagline: "If you're a journalist, editor, or content creator covering real estate, technology, or global markets — we'd love to connect.",
  tags: ["Press Kit Available", "Founder Interviews", "Brand Assets", "Media Enquiries"],
  stats: [
    { value: "3+", label: "Major Features" },
    { value: "Forbes", label: "Coverage" },
    { value: "2026", label: "Founded" },
    { value: "Global", label: "Reach" },
  ],
  primaryCta: { href: "mailto:press@globperty.com", label: "press@globperty.com" },
  secondaryCta: { href: "mailto:press@globperty.com", label: "Request Press Kit" },
};

const coverage = [
  { quote: "The platform making cross-border real estate effortless", source: "PropTech Weekly", icon: "📰" },
  { quote: "Top 10 Real Estate Startups to Watch", source: "TechCrunch", icon: "💻" },
  { quote: "Virtual property expos are the future — Globperty leads the way", source: "Forbes", icon: "🏆" },
];

const kitItems = [
  "Company overview & fact sheet",
  "Founder bios & high-res headshots",
  "Brand logos & style guide",
  "Product screenshots & demo videos",
];

export default function PressPage() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header1 />
        <div className="main-content">
          <ToolPageHero config={HERO} />

          <section className="flat-section bg-surface tf-spacing-6">
            <div className="tf-container">
              <div className="row gy-48">
                <div className="col-lg-5 wow animate__fadeInLeft animate__animated" data-wow-duration="1s">
                  <div className="sub-title fw-7 text-color-primary mb-12">Press Kit</div>
                  <h3 className="title mb-16">Brand Assets &amp; Resources</h3>
                  <p className="text-1 text-variant-1 mb-28">Everything you need to cover Globperty accurately. Download our press kit for brand assets, founder bios, and company overview.</p>
                  <div className="d-flex flex-column gap-14 mb-32">
                    {kitItems.map((item, i) => (
                      <div key={i} className="d-flex align-items-center gap-14">
                        <i className="icon-check-circle fs-20 text-color-primary" style={{ flexShrink: 0 }} />
                        <span className="text-1">{item}</span>
                      </div>
                    ))}
                  </div>
                  <a href="mailto:press@globperty.com" className="tf-btn bg-color-primary fw-7 pd-17">Request Press Kit</a>
                </div>

                <div className="col-lg-7 wow animate__fadeInRight animate__animated" data-wow-duration="1s">
                  <div className="sub-title fw-7 text-color-primary mb-12">Recent Coverage</div>
                  <h3 className="title mb-24">What They&apos;re Saying</h3>
                  <div className="d-flex flex-column gap-20">
                    {coverage.map((c, i) => (
                      <div key={i} className="box-icon-v2 hover-btn-view style-col pd-24">
                        <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
                        <p className="body-1 fw-6 mb-14" style={{ fontStyle: "italic", color: "#334155", lineHeight: 1.6 }}>&ldquo;{c.quote}&rdquo;</p>
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
