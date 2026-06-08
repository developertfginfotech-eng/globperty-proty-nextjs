import Image from "next/image";
import React from "react";

export default function Reviews() {
  return (
    <section className="section-review tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="box-review">
              <div className="content-left">
                <h2
                  className="title mb-32 wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  Reviews from employees working at Globperty
                </h2>
                <div
                  className="description mb-32 wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  <p className="text-1 mb-15">
                    Our team spans 4 continents and works on technology that&apos;s changing how the world buys, sells, and discovers property. Here&apos;s what our people say about working at Globperty.
                  </p>
                  <p className="text-1">
                    Join a team that gives you real ownership, flexible work, and the chance to build something that matters globally.
                  </p>
                </div>
                <a
                  href="#"
                  className="tf-btn bg-color-primary fw-7 pd-18 wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  More stories
                </a>
              </div>
              <div className="content-right">
                <div
                  className="person wow animate__zoomIn animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  <Image
                    alt=""
                    width={509}
                    height={578}
                    src="/images/section/person-3.png"
                  />
                </div>
                <div
                  className="box-author ani5"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  <div className="avatar">
                    <Image
                      alt=""
                      width={120}
                      height={120}
                      src="/images/avatar/avt-png18.png"
                    />
                  </div>
                  <div className="content">
                    <h6 className="name">Sarah Thompson</h6>
                    <p className="text-2 lh-16">Senior Engineer, Globperty</p>
                  </div>
                </div>
                <div
                  className="ratings ani4 ani5"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  <i className="icon-star" />
                  <i className="icon-star" />
                  <i className="icon-star" />
                  <i className="icon-star" />
                  <i className="icon-star" />
                </div>
                <div
                  className="wg-testimonial ani8 style-2 ani5"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  <div className="ratings">
                    <i className="icon-star" />
                    <i className="icon-star" />
                    <i className="icon-star" />
                    <i className="icon-star" />
                    <i className="icon-star" />
                  </div>
                  <p className="text-1 description line-clamp-3">
                    Working at Globperty is unlike any other company. The pace is fast, the problems are real, and you genuinely feel like you&apos;re building the future of real estate. The team is world-class and the culture is truly remote-first.
                  </p>
                  <div className="author">
                    <div className="avatar">
                      <Image
                        alt=""
                        width={200}
                        height={200}
                        src="/images/avatar/testimonials-4.jpg"
                      />
                    </div>
                    <div className="content">
                      <h6 className="name">
                        <a href="#">Sarah Thompson</a>
                      </h6>
                      <p className="text-2">Senior Engineer, Globperty</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
