import Image from "next/image";
import React from "react";

export default function Cta() {
  return (
    <div className="section-contact-help">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="relative">
              <div className="image-wrap">
                <Image
                  className="lazyload"
                  data-src="/images/section/section-contact.jpg"
                  alt=""
                  width={1280}
                  height={390}
                  src="/images/section/section-contact.jpg"
                />
              </div>
              <div className="content">
                <div className="heading-section mb-0">
                  <h2 className="title text_white">
                    Still have questions? We&apos;re here to help.
                  </h2>
                  <p className="text-1 text_white">
                    Our support team is available Monday – Friday, 9 AM – 6 PM GMT. Reach out anytime.
                  </p>
                </div>
                <div className="wrap-btn">
                  <a href="/contact" className="tf-btn style-border color-white pd-14 fw-6">
                    Contact Us
                  </a>
                  <a href="mailto:hello@globperty.com" className="tf-btn bg-color-primary pd-15 fw-6">
                    hello@globperty.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
