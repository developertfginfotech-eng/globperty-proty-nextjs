import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

export const metadata = {
  title: "Press & Media — Globperty",
  description: "Globperty press kit, media enquiries, recent coverage, and brand assets.",
};

const coverage = [
  { quote: "The platform making cross-border real estate effortless", source: "PropTech Weekly" },
  { quote: "Top 10 Real Estate Startups to Watch", source: "TechCrunch" },
  { quote: "Virtual property expos are the future — Globperty leads the way", source: "Forbes" },
];

export default function PressPage() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header1 />
        <div className="main-content">
          <Breadcumb pageName="Press & Media" />
          <section className="flat-section tf-spacing-6">
            <div className="tf-container">
              <div className="row justify-content-center text-center mb-48">
                <div className="col-lg-7">
                  <div className="heading-section">
                    <div className="sub-title fw-7 text-color-primary mb-12">Press & Media</div>
                    <h2 className="title wow animate__fadeInUp animate__animated" data-wow-duration="1s">Globperty in the News</h2>
                    <p className="text-1 mb-20">If you are a journalist, editor, or content creator covering real estate, technology, or global markets — we would love to connect.</p>
                    <a href="mailto:press@globperty.com" className="tf-btn bg-color-primary fw-7 pd-17">press@globperty.com</a>
                  </div>
                </div>
              </div>
              <div className="row gy-40">
                <div className="col-lg-5 wow animate__fadeInLeft animate__animated" data-wow-duration="1s">
                  <div className="sub-title fw-7 text-color-primary mb-12">Press Kit</div>
                  <h3 className="title mb-16">Brand Assets & Resources</h3>
                  <p className="text-1 text-variant-1 mb-24">Everything you need to cover Globperty accurately. Download our press kit for brand assets, founder bios, and company overview.</p>
                  <ul className="list-style-none mb-30">
                    {["Company overview & fact sheet","Founder bios & high-res headshots","Brand logos & style guide","Product screenshots & demo videos"].map((item, i) => (
                      <li key={i} className="d-flex align-items-center gap-12 mb-14">
                        <i className="icon-check-circle fs-20 text-color-primary" />
                        <span className="text-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="mailto:press@globperty.com" className="tf-btn bg-color-primary fw-7 pd-17">Request Press Kit</a>
                </div>
                <div className="col-lg-7 wow animate__fadeInRight animate__animated" data-wow-duration="1s">
                  <div className="sub-title fw-7 text-color-primary mb-12">Recent Coverage</div>
                  <h3 className="title mb-24">What They are Saying</h3>
                  <div className="d-flex flex-column gap-20">
                    {coverage.map((c, i) => (
                      <div key={i} className="box-icon-v2 hover-btn-view style-col pd-24">
                        <p className="body-1 fw-6 mb-10" style={{ fontStyle:"italic" }}>&ldquo;{c.quote}&rdquo;</p>
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
