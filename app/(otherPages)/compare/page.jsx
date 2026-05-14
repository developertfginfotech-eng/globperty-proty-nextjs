import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Compare from "@/components/otherPages/Compare";
import Cta from "@/components/common/Cta";
import Link from "next/link";
import React from "react";

export const metadata = { title: "Compare Properties — Globperty" };

export default function page() {
  return (
    <div id="wrapper">
      <Header1 />
      <div className="page-title style-2">
        <div className="tf-container">
          <div className="row justify-center">
            <div className="col-lg-8">
              <div className="content-inner">
                <div className="heading-title">
                  <h2 className="title">Compare Properties</h2>
                  <ul className="breadcrumb justify-center">
                    <li><Link className="home fw-6 text-color-3" href="/">Home</Link></li>
                    <li>Compare</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <Compare />
        <Cta />
      </div>
      <Footer1 logo="/images/logo/globperty-logo.svg" />
    </div>
  );
}
