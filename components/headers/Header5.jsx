import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import Image from "next/image";
import DashboardNav from "./DashboardNav";
export default function Header5() {
  return (
    <header id="header-main" className="header style-3">
      <div className="header-inner bg-1">
        <div className="tf-container lg">
          <div className="row">
            <div className="col-12">
              <div className="header-inner-wrap">
                <div className="header-logo">
                  <Link href={`/`} className="site-logo">
                    <Image
                      className="img-default"
                      alt=""
                      width={272}
                      height={84}
                      src="/images/logo/logo-6@2x.png"
                    />
                  </Link>
                </div>
                <nav className="main-menu">
                  <ul className="navigation">
                    <Nav />
                  </ul>
                </nav>
                <div className="header-right">
                  <DashboardNav />
                  <div className="btn-add">
                    <Link
                      className="tf-btn style-border pd-23"
                      href={`/add-property`}
                    >
                      Add property
                    </Link>
                  </div>
                  <div
                    className="mobile-button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#menu-mobile"
                    aria-controls="menu-mobile"
                  >
                    <i className="icon-menu" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
