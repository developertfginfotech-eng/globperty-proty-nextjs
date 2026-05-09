import React from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
export default function Banner() {
  return (
    <section className="section-appraisal">
      <div className="wg-appraisal style-2">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="content">
                <div className="heading-section mb-32">
                  <h2 className="title text_white split-text effect-right">
                    <SplitTextAnimation text="Are You Selling Or" />
                    <br />
                    <SplitTextAnimation text="Renting Your Property?" />
                  </h2>
                  <p
                    className="text-1 text-color3 wow animate__fadeInUp animate__animated"
                    data-wow-duration="1.5s"
                  >
                    Thousands of luxury home enthusiasts just like you visit our
                    website.
                  </p>
                </div>
                <a
                  href="#"
                  className="tf-btn bg-color-white fw-7 pd-11 wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                >
                  Request your free appraisal
                </a>
                <div className="person">
                  <Image
                    className="wow animate__fadeInRight animate__animated"
                    data-wow-duration="2s"
                    data-wow-delay="0s "
                    alt=""
                    width={346}
                    height={499}
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=346&h=499&fit=crop"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
