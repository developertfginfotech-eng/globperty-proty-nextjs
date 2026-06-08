import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

export const metadata = {
  title: "About Globperty — Connecting the World Through Property",
  description: "Globperty is a next-generation global real estate platform combining AI search, live market data, and virtual experiences to redefine property discovery worldwide.",
};

export default function AboutPage() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header1 />
        <div className="main-content">

          {/* HERO */}
          <section className="flat-section flat-banner-v6" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", padding: "80px 0 60px" }}>
            <div className="tf-container">
              <div className="row justify-content-center text-center">
                <div className="col-lg-8">
                  <div className="sub-title fw-7 text-white mb-12" style={{ fontSize: 13, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>About Us</div>
                  <h1 className="text-white fw-8 mb-20" style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.15 }}>
                    Connecting the World<br />Through Property
                  </h1>
                  <p className="text-white" style={{ fontSize: 17, lineHeight: 1.7, opacity: 0.8, maxWidth: 620, margin: "0 auto" }}>
                    Globperty is a next-generation global real estate platform built to make buying, selling, and discovering property seamless — no matter where you are in the world.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT BODY */}
          <section className="flat-section tf-spacing-6">
            <div className="tf-container">
              <div className="row gy-40 align-items-center">
                <div className="col-lg-6">
                  <div className="heading-section mb-32">
                    <div className="sub-title fw-7 text-color-primary mb-12">Our Story</div>
                    <h2 className="title mb-20">Built for a Borderless World</h2>
                    <p className="text-variant-1 body-2 mb-16">
                      We bridge borders, cultures, and markets to give investors, homebuyers, and developers access to a truly global property ecosystem. Founded by a team of real estate veterans and tech innovators, Globperty combines AI-powered search, live market data, and virtual property experiences to redefine how the world transacts in real estate.
                    </p>
                    <p className="text-variant-1 body-2">
                      From luxury penthouses in Dubai to commercial spaces in London and residential plots in emerging markets — Globperty brings it all to your fingertips.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row gy-24">
                    {[
                      { icon: "icon-location", num: "100+", label: "Countries Supported" },
                      { icon: "icon-house-2", num: "50K+", label: "Active Listings" },
                      { icon: "icon-user", num: "200K+", label: "Registered Users" },
                      { icon: "icon-award", num: "#1", label: "Global PropTech Platform" },
                    ].map((s, i) => (
                      <div className="col-6" key={i}>
                        <div className="box-icon-v2 hover-btn-view style-row pd-24" style={{ borderRadius: 12, border: "1.5px solid #e8edf5", height: "100%" }}>
                          <div className="icon-box">
                            <i className={`${s.icon} icon fs-30 text-color-primary`} />
                          </div>
                          <div className="content">
                            <h3 className="fw-8 text-color-primary">{s.num}</h3>
                            <p className="text-variant-1 body-2">{s.label}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MISSION & VISION */}
          <section className="flat-section tf-spacing-6" style={{ background: "#f8fafc" }}>
            <div className="tf-container">
              <div className="row gy-32 justify-content-center">
                <div className="col-lg-5">
                  <div className="box-icon-v2 hover-btn-view style-col pd-32" style={{ borderRadius: 16, background: "#fff", border: "1.5px solid #e8edf5", height: "100%" }}>
                    <div className="icon-box mb-20">
                      <i className="icon-target icon fs-40 text-color-primary" />
                    </div>
                    <div className="content">
                      <h4 className="fw-8 mb-12">Our Mission</h4>
                      <p className="text-variant-1 body-2">
                        To make global real estate accessible, transparent, and effortless for everyone — whether you're a first-time buyer, an experienced investor, or a developer with a vision.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="box-icon-v2 hover-btn-view style-col pd-32" style={{ borderRadius: 16, background: "#fff", border: "1.5px solid #e8edf5", height: "100%" }}>
                    <div className="icon-box mb-20">
                      <i className="icon-eye icon fs-40 text-color-primary" />
                    </div>
                    <div className="content">
                      <h4 className="fw-8 mb-12">Our Vision</h4>
                      <p className="text-variant-1 body-2">
                        A world where geography is never a barrier to finding your perfect property. We envision a future where every person on earth can access the global property market with ease and confidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="flat-section tf-spacing-6">
            <div className="tf-container">
              <div className="row justify-content-center text-center">
                <div className="col-lg-7">
                  <h2 className="title mb-16">Ready to Explore Global Property?</h2>
                  <p className="text-variant-1 body-2 mb-32">Join hundreds of thousands of buyers, sellers, and investors already using Globperty.</p>
                  <div className="d-flex gap-12 justify-content-center flex-wrap">
                    <a href="/register" className="tf-btn btn-gradient">Get Started Free</a>
                    <a href="/contact" className="tf-btn style-border">Contact Us</a>
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
