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
                  <a href="#accordion2-faq-four" className="faq-header h6 collapsed" data-bs-toggle="collapse" aria-expanded="false" aria-controls="accordion2-faq-four">
                    Are there any hidden fees?
                    <i className="icon-CaretDown" />
                  </a>
                  <div id="accordion2-faq-four" className="collapse" data-bs-parent="#wrapper-faq-2">
                    <p className="faq-body">No hidden fees. What you see in the pricing page is what you pay. Premium features are clearly listed per plan. There are no setup fees or surprise charges.</p>
                  </div>
                </li>
                <li className="faq-item">
                  <a href="#accordion2-faq-five" className="faq-header h6 collapsed" data-bs-toggle="collapse" aria-expanded="false" aria-controls="accordion2-faq-five">
                    Can I upgrade or downgrade my plan?
                    <i className="icon-CaretDown" />
                  </a>
                  <div id="accordion2-faq-five" className="collapse" data-bs-parent="#wrapper-faq-2">
                    <p className="faq-body">Yes. You can upgrade or downgrade your subscription plan at any time from your account settings. Changes take effect at the start of the next billing cycle.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="tf-faq">
              <h3 className="fw-8 title mb-24">Safety &amp; Trust</h3>
              <ul className="box-faq" id="wrapper-faq-3">
                <li className="faq-item">
                  <a href="#accordion3-faq-one" className="faq-header h6 collapsed" data-bs-toggle="collapse" aria-expanded="false" aria-controls="accordion3-faq-one">
                    How does Globperty verify agents and sellers?
                    <i className="icon-CaretDown" />
                  </a>
                  <div id="accordion3-faq-one" className="collapse" data-bs-parent="#wrapper-faq-3">
                    <p className="faq-body">All sellers and brokers on Globperty must complete KYC (Know Your Customer) verification before listing. This includes identity documents, proof of address, and where applicable, agency registration. Buyers can always see the verification badge on verified profiles.</p>
                  </div>
                </li>
                <li className="faq-item active">
                  <a href="#accordion3-faq-two" className="faq-header h6 collapsed" data-bs-toggle="collapse" aria-expanded="false" aria-controls="accordion3-faq-two">
                    Is my personal data safe?
                    <i className="icon-CaretDown" />
                  </a>
                  <div id="accordion3-faq-two" className="collapse" data-bs-parent="#wrapper-faq-3">
                    <p className="faq-body">Absolutely. Globperty is fully GDPR-compliant. Your data is encrypted, never sold to third parties, and you can request deletion at any time. We use industry-standard security protocols across all systems.</p>
                  </div>
                </li>
                <li className="faq-item">
                  <a href="#accordion3-faq-three" className="faq-header h6 collapsed" data-bs-toggle="collapse" aria-expanded="false" aria-controls="accordion3-faq-three">
                    How do I report a suspicious listing?
                    <i className="icon-CaretDown" />
                  </a>
                  <div id="accordion3-faq-three" className="collapse" data-bs-parent="#wrapper-faq-3">
                    <p className="faq-body">Use the &quot;Report&quot; button on any listing page, or email us at <strong>hello@globperty.com</strong>. Our compliance team reviews all reports within 24 hours and takes immediate action if a listing violates our policies.</p>
                  </div>
                </li>
                <li className="faq-item">
                  <a href="#accordion3-faq-four" className="faq-header h6 collapsed" data-bs-toggle="collapse" aria-expanded="false" aria-controls="accordion3-faq-four">
                    What currencies does Globperty support?
                    <i className="icon-CaretDown" />
                  </a>
                  <div id="accordion3-faq-four" className="collapse" data-bs-parent="#wrapper-faq-3">
                    <p className="faq-body">Globperty supports 50+ currencies. You can switch currency display in your account settings or use the currency converter tool in our Tools section. Prices shown are based on live exchange rates.</p>
                  </div>
                </li>
                <li className="faq-item">
                  <a href="#accordion3-faq-five" className="faq-header h6 collapsed" data-bs-toggle="collapse" aria-expanded="false" aria-controls="accordion3-faq-five">
                    How do I contact Globperty support?
                    <i className="icon-CaretDown" />
                  </a>
                  <div id="accordion3-faq-five" className="collapse" data-bs-parent="#wrapper-faq-3">
                    <p className="faq-body">You can reach us at <strong>hello@globperty.com</strong> or call <strong>+1 (800) GLOB-PTY</strong>. Support hours are Monday to Friday, 9 AM – 6 PM GMT. You can also use the contact form on this page.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            <div className="tf-sidebar">
              <div className="form-contact-seller mb-30">
                <h4 className="heading-title mb-20">Contact Support</h4>
                <div className="seller-info mb-20">
                  <div className="content">
                    <h6 className="name">Globperty Support Team</h6>
                    <ul className="contact">
                      <li>
                        <i className="icon-phone-1" />
                        <span>+1 (800) GLOB-PTY</span>
                      </li>
                      <li>
                        <i className="icon-mail" />
                        <a href="mailto:hello@globperty.com">hello@globperty.com</a>
                      </li>
                    </ul>
                    <p className="text-variant-1" style={{ fontSize: 12, marginTop: 8 }}>Mon – Fri, 9 AM – 6 PM GMT</p>
                  </div>
                </div>
                <fieldset className="mb-12">
                  <input type="text" className="form-control" placeholder="Your Name" name="name" required="" />
                </fieldset>
                <fieldset className="mb-12">
                  <input type="email" className="form-control" placeholder="Your Email" name="email" required="" />
                </fieldset>
                <fieldset className="mb-30">
                  <textarea name="message" cols={30} rows={5} placeholder="How can we help you?" required="" defaultValue={""} />
                </fieldset>
                <a href="mailto:hello@globperty.com" className="tf-btn bg-color-primary w-full">Send Message</a>
              </div>
              <div className="sidebar-ads" style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius: 12, padding: 24 }}>
                <div className="box-ads relative z-5">
                  <div className="content mb-16">
                    <h4 className="title text-white mb-10">Need a Property Expert?</h4>
                    <div className="text-addres">
                      <p style={{ color: "rgba(255,255,255,.7)", fontSize: 13 }}>
                        Connect with a verified agent who knows the global market inside out — whether you&apos;re buying, selling, or investing.
                      </p>
                    </div>
                  </div>
                  <a href="/agents" className="tf-btn fw-6 bg-color-primary w-full">Find an Agent</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
