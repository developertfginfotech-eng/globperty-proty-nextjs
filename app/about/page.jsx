import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata = {
  title: "About Globperty — Connecting the World Through Property",
  description: "Globperty is a next-generation global real estate platform combining AI search, live market data, and virtual experiences.",
};

const HERO = {
  bgImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80",
  badge: "About Globperty",
  titleWhite: "Connecting the World ",
  titleOrange: "Through Property",
  tagline: "Globperty is a next-generation global real estate platform built to make buying, selling, and discovering property seamless — no matter where you are in the world.",
  tags: ["100+ Countries", "AI-Powered Search", "Verified Listings", "Live Market Data"],
  stats: [
    { value: "100+", label: "Countries" },
    { value: "50K+", label: "Listings" },
    { value: "200K+", label: "Users" },
    { value: "#1", label: "PropTech" },
  ],
  primaryCta: { href: "/register", label: "Get Started Free" },
  secondaryCta: { href: "/contact", label: "Contact Us" },
};

const stats = [
  { icon: "icon-location", num: "100+", label: "Countries Supported" },
  { icon: "icon-house-2", num: "50K+", label: "Active Listings" },
  { icon: "icon-user", num: "200K+", label: "Registered Users" },
  { icon: "icon-award", num: "#1", label: "Global PropTech Platform" },
];

export default function AboutPage() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header1 />
        <div className="main-content">

          <ToolPageHero config={HERO} />

          {/* OUR STORY + STATS */}
          <section className="flat-section tf-spacing-6">
            <div className="tf-container">
              <div className="row gy-40 align-items-center">
                <div className="col-lg-6 wow animate__fadeInLeft animate__animated" data-wow-duration="1s">
                  <div className="heading-section mb-30">
                    <div className="sub-title fw-7 text-color-primary mb-12">Our Story</div>
                    <h3 className="title mb-20">Built for a Borderless World</h3>
                    <p className="text-1 mb-16">
                      We bridge borders, cultures, and markets to give investors, homebuyers, and developers access to a truly global property ecosystem. Founded by a team of real estate veterans and tech innovators, Globperty combines AI-powered search, live market data, and virtual property experiences.
                    </p>
                    <p className="text-1">
                      From luxury penthouses in Dubai to commercial spaces in London and residential plots in emerging markets — Globperty brings it all to your fingertips.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 wow animate__fadeInRight animate__animated" data-wow-duration="1s">
                  <div className="row gy-24">
                    {stats.map((s, i) => (
                      <div className="col-6" key={i}>
                        <div className="box-count style-1 pd-24">
                          <div className="icon-box">
                            <i className={`${s.icon} icon fs-30 text-color-primary`} />
                          </div>
                          <div className="content">
                            <div className="number fw-8 h3 text-color-primary">{s.num}</div>
                            <p className="text-1 text-variant-1">{s.label}</p>
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
          <section className="flat-section bg-surface tf-spacing-6">
            <div className="tf-container">
              <div className="row justify-content-center mb-40">
                <div className="col-lg-7 text-center">
                  <h3 className="title wow animate__fadeInUp animate__animated" data-wow-duration="1s">What Drives Us</h3>
                </div>
              </div>
              <div className="row gy-30">
                {[
                  { icon: "icon-target", title: "Our Mission", desc: "To make global real estate accessible, transparent, and effortless for everyone — whether you're a first-time buyer, an experienced investor, or a developer with a vision." },
                  { icon: "icon-eye", title: "Our Vision", desc: "A world where geography is never a barrier to finding your perfect property. We envision a future where every person on earth can access the global property market with ease." },
                ].map((item, i) => (
                  <div className="col-lg-6 wow animate__fadeInUp animate__animated" key={i} data-wow-duration="1s" data-wow-delay={`${i * 0.1}s`}>
                    <div className="box-icon-v2 hover-btn-view style-col pd-32">
                      <div className="icon-box mb-20">
                        <i className={`${item.icon} icon fs-40 text-color-primary`} />
                      </div>
                      <div className="content">
                        <h5 className="fw-8 mb-12">{item.title}</h5>
                        <p className="text-1 text-variant-1">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
