import Image from "next/image";
import React from "react";

export default function Benefits() {
  return (
    <section className="section-benefits">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="box-benefits">
              <div className="wrap-image relative">
                <div
                  className="image img-1 wow animate__zoomIn animate__animated"
                  data-wow-duration="2s"
                  data-wow-delay="0s"
                >
                  <Image
                    className="lazyload parallax-img"
                    data-src="/images/section/section-benefits-1.jpg"
                    alt=""
                    width={400}
                    height={509}
                    src="/images/section/section-benefits-1.jpg"
                  />
                </div>
                <div
                  className="image img-2 wow animate__zoomIn animate__animated"
                  data-wow-duration="2s"
                  data-wow-delay="0s"
                >
                  <Image
                    className="lazyload parallax-img"
                    data-src="/images/section/section-benefits-2.jpg"
                    alt=""
                    width={400}
                    height={509}
                    src="/images/section/section-benefits-2.jpg"
                  />
                </div>
              </div>
              <div className="content">
                <h2
                  className="title wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  Why Work at Globperty
                </h2>
                <div
                  className="description wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  <p className="text-1 mb-16">
                    At Globperty, you&apos;ll work with a global team across 4 continents on technology that impacts how millions of people buy and invest in property. We move fast, give real ownership, and believe borders should never limit great talent.
                  </p>
                  <p className="text-1">
                    Remote-first with flexible hours, competitive salary + equity options, and a culture that values bold thinking over bureaucracy.
                  </p>
                </div>
                <div className="wrap-icon">
                  <div
                    className="box-icon wow animate__zoomIn animate__animated"
                    data-wow-duration="1s"
                    data-wow-delay="0s"
                  >
                    <div className="icons">
                      <i className="icon-heart-1" />
                    </div>
                    <div className="title text-1 text-center fw-6">
                      Global Remote Work
                    </div>
                  </div>
                  <div
                    className="box-icon wow animate__zoomIn animate__animated"
                    data-wow-duration="1s"
                    data-wow-delay="0s"
                  >
                    <div className="icons">
                      <i className="icon-pig" />
                    </div>
                    <div className="title text-1 text-center fw-6">
                      Salary + Equity
                    </div>
                  </div>
                  <div
                    className="box-icon wow animate__zoomIn animate__animated"
                    data-wow-duration="1s"
                    data-wow-delay="0s"
                  >
                    <div className="icons">
                      <i className="icon-family" />
                    </div>
                    <div className="title text-1 text-center fw-6">
                      Flexible Hours
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="tf-btn bg-color-primary fw-7 pd-17 wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  Join our team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
