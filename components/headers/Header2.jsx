import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import Image from "next/image";
import DashboardNav from "./DashboardNav";
export default function Header2() {
  return (
    <header id="header-main" className="header style-2">
      <div className="header-inner">
        <div className="tf-container lg">
          <div className="row">
            <div className="col-12">
              <div className="header-inner-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {/* Logo */}
                <div className="header-logo" style={{ flex: "0 0 auto" }}>
                  <Link href={`/`} className="site-logo" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/logo/globperty-logo.svg" alt="Globperty" height={44} style={{ height: 44, width: "auto" }} />
                  </Link>
                </div>

                {/* Nav — centered */}
                <nav className="main-menu" style={{ flex: "1 1 auto", display: "flex", justifyContent: "center" }}>
                  <ul className="navigation">
                    <Nav />
                  </ul>
                </nav>

                {/* Right actions */}
                <div className="header-right" style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 16 }}>
                  <DashboardNav color="text_white" />
                  <div className="btn-add">
                    <Link className="tf-btn style-border pd-23" href={`/add-property`}>
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
