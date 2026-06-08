import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Faqs() {
  return (
    <section className="section-faq">
      <div className="tf-container">
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="heading-section mb-48">
              <h2 className="title">Frequently Asked Questions</h2>
            </div>
            <div className="tf-faq mb-49">
              <h3 className="fw-8 title mb-24">Overview</h3>
              <ul className="box-faq" id="wrapper-faq">
                <li className="faq-item">
                  <a
                    href="#accordion-faq-one"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion-faq-one"
                  >
                    What is Globperty?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion-faq-one"
                    className="collapse"
                    data-bs-parent="#wrapper-faq"
                  >
                    <p className="faq-body">
                      Globperty is a global property marketplace where you can search, list, and explore real estate from around the world — all in one platform. We combine AI-powered search, live market data, and virtual property experiences to make buying and selling seamless across borders.
                    </p>
                  </div>
                </li>
                <li className="faq-item active">
                  <a
                    href="#accordion-faq-two"
                    className="faq-header h6"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion-faq-two"
                  >
                    Is Globperty free to use?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion-faq-two"
                    className="collapse show"
                    data-bs-parent="#wrapper-faq"
                  >
                    <p className="faq-body">
                      Browsing and searching properties is completely free. Listing fees and premium features are available via our subscription plans. You only pay when you're ready to list or access advanced tools.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion-faq-three"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion-faq-three"
                  >
                    Can I list a property from any country?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion-faq-three"
                    className="collapse"
                    data-bs-parent="#wrapper-faq"
                  >
                    <p className="faq-body">
                      Yes! Globperty supports listings from 100+ countries. Our platform is built to handle international currencies, legal nuances, and multilingual listings — making it truly borderless.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion-faq-four"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion-faq-four"
                  >
                    How does the virtual expo feature work?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion-faq-four"
                    className="collapse"
                    data-bs-parent="#wrapper-faq"
                  >
                    <p className="faq-body">
                      Virtual Expos let you attend live and recorded property showcases from developers and agents — from anywhere in the world, on any device. You get real-time Q&amp;A, downloadable brochures, and personalized event reminders.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion-faq-five"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion-faq-five"
                  >
                    Is my data safe on Globperty?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion-faq-five"
                    className="collapse"
                    data-bs-parent="#wrapper-faq"
                  >
                    <p className="faq-body">
                      Absolutely. We follow GDPR and global data protection standards to ensure your personal and financial information is always secure. Your data is encrypted and never shared with third parties without your consent.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="tf-faq mb-49">
              <h3 className="fw-8 title mb-24">Listings & Costs</h3>
              <ul className="box-faq" id="wrapper-faq-2">
                <li className="faq-item">
                  <a
                    href="#accordion2-faq-one"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion2-faq-one"
                  >
                    How do I list my property on Globperty?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion2-faq-one"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-2"
                  >
                    <p className="faq-body">
                      Register as a Seller or Broker, complete your KYC verification, then use the "Add Property" feature in your dashboard. You can upload photos, set pricing, add floor plans, and go live in minutes.
                    </p>
                  </div>
                </li>
                <li className="faq-item active">
                  <a
                    href="#accordion2-faq-two"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion2-faq-two"
                  >
                    What subscription plans are available?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion2-faq-two"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-2"
                  >
                    <p className="faq-body">
                      We offer Starter, Professional, Premium, and Enterprise plans — each with increasing lead allocations, analytics access, and support levels. Visit our pricing page for a full breakdown.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion2-faq-three"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion2-faq-three"
                  >
                    How does KYC verification work?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion2-faq-three"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-2"
                  >
                    <p className="faq-body">
                      KYC (Know Your Customer) is required for Sellers and Brokers before listing. You submit identity documents relevant to your country and account type. Our team reviews and approves within 1–2 business days.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion2-faq-four"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion2-faq-four"
                  >
                    Are There Any Hidden Fees Not Displayed In The Pricing
                    Table?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion2-faq-four"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-2"
                  >
                    <p className="faq-body">
                      Once your account is set up and you've familiarized
                      yourself with the platform, you are ready to start using
                      our services. Whether it's accessing specific features,
                      making transactions, or utilizing our tools, you'll find
                      everything you need at your fingertips.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion2-faq-five"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion2-faq-five"
                  >
                    What Is The Refund Procedure?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion2-faq-five"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-2"
                  >
                    <p className="faq-body">
                      Once your account is set up and you've familiarized
                      yourself with the platform, you are ready to start using
                      our services. Whether it's accessing specific features,
                      making transactions, or utilizing our tools, you'll find
                      everything you need at your fingertips.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion2-faq-six"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion2-faq-six"
                  >
                    Is There Financial Or Accounting Support?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion2-faq-six"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-2"
                  >
                    <p className="faq-body">
                      Once your account is set up and you've familiarized
                      yourself with the platform, you are ready to start using
                      our services. Whether it's accessing specific features,
                      making transactions, or utilizing our tools, you'll find
                      everything you need at your fingertips.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="tf-faq">
              <h3 className="fw-8 title mb-24">Safety and Security</h3>
              <ul className="box-faq" id="wrapper-faq-3">
                <li className="faq-item">
                  <a
                    href="#accordion3-faq-one"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion3-faq-one"
                  >
                    What Languages Does Your Service Support?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion3-faq-one"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-3"
                  >
                    <p className="faq-body">
                      Once your account is set up and you've familiarized
                      yourself with the platform, you are ready to start using
                      our services. Whether it's accessing specific features,
                      making transactions, or utilizing our tools, you'll find
                      everything you need at your fingertips.
                    </p>
                  </div>
                </li>
                <li className="faq-item active">
                  <a
                    href="#accordion3-faq-two"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion3-faq-two"
                  >
                    How Do I Integrate Your Service Into My System?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion3-faq-two"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-3"
                  >
                    <p className="faq-body">
                      Once your account is set up and you've familiarized
                      yourself with the platform, you are ready to start using
                      our services. Whether it's accessing specific features,
                      making transactions, or utilizing our tools, you'll find
                      everything you need at your fingertips.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion3-faq-three"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion3-faq-three"
                  >
                    What Are The Safety Features Of Your System?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion3-faq-three"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-3"
                  >
                    <p className="faq-body">
                      Once your account is set up and you've familiarized
                      yourself with the platform, you are ready to start using
                      our services. Whether it's accessing specific features,
                      making transactions, or utilizing our tools, you'll find
                      everything you need at your fingertips.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion3-faq-four"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion3-faq-four"
                  >
                    How Can I Request New Features?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion3-faq-four"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-3"
                  >
                    <p className="faq-body">
                      Once your account is set up and you've familiarized
                      yourself with the platform, you are ready to start using
                      our services. Whether it's accessing specific features,
                      making transactions, or utilizing our tools, you'll find
                      everything you need at your fingertips.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion3-faq-five"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion3-faq-five"
                  >
                    Is My Data Protected?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion3-faq-five"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-3"
                  >
                    <p className="faq-body">
                      Once your account is set up and you've familiarized
                      yourself with the platform, you are ready to start using
                      our services. Whether it's accessing specific features,
                      making transactions, or utilizing our tools, you'll find
                      everything you need at your fingertips.
                    </p>
                  </div>
                </li>
                <li className="faq-item">
                  <a
                    href="#accordion3-faq-six"
                    className="faq-header h6 collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="accordion3-faq-six"
                  >
                    How Do I Report A Technical Issue?
                    <i className="icon-CaretDown" />
                  </a>
                  <div
                    id="accordion3-faq-six"
                    className="collapse"
                    data-bs-parent="#wrapper-faq-3"
                  >
                    <p className="faq-body">
                      Once your account is set up and you've familiarized
                      yourself with the platform, you are ready to start using
                      our services. Whether it's accessing specific features,
                      making transactions, or utilizing our tools, you'll find
                      everything you need at your fingertips.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            <div className="tf-sidebar sticky-sidebar">
              <form className="form-contact-seller mb-30">
                <h4 className="heading-title mb-30">Contact Sellers</h4>
                <div className="seller-info">
                  <div className="avartar">
                    <Image
                      alt=""
                      width={200}
                      height={200}
                      src="/images/avatar/seller.jpg"
                    />
                  </div>
                  <div className="content">
                    <h6 className="name">Shara Conner</h6>
                    <ul className="contact">
                      <li>
                        <i className="icon-phone-1" />
                        <span>1-333-345-6868</span>
                      </li>
                      <li>
                        <i className="icon-mail" />
                        <a href="#">themesflat@gmail.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <fieldset className="mb-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    name="name"
                    id="name"
                    required=""
                  />
                </fieldset>
                <fieldset className="mb-30">
                  <textarea
                    name="message"
                    cols={30}
                    rows={10}
                    placeholder="How can an agent help"
                    id="message"
                    required=""
                    defaultValue={""}
                  />
                </fieldset>
                <a href="#" className="tf-btn bg-color-primary w-full">
                  Send message
                </a>
              </form>
              <div className="sidebar-ads">
                <div className="image-wrap">
                  <Image
                    className="lazyload"
                    data-src="/images/blog/ads.jpg"
                    alt=""
                    width={400}
                    height={470}
                    src="/images/blog/ads.jpg"
                  />
                </div>
                <div className="logo relative z-5">
                  <Image
                    alt=""
                    width={272}
                    height={85}
                    src="/images/logo/logo-2@2x.png"
                  />
                </div>
                <div className="box-ads relative z-5">
                  <div className="content">
                    <h4 className="title">
                      <Link href={`/property-detail-v1`}>
                        We can help you find a local real estate agent
                      </Link>
                    </h4>
                    <div className="text-addres">
                      <p>
                        Connect with a trusted agent who knows the market inside
                        out - whether you’re buying or selling.
                      </p>
                    </div>
                  </div>
                  <a href="#" className="tf-btn fw-6 bg-color-primary w-full">
                    Connect with an agent
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
