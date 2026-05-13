import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import Image from "next/image";
import DashboardNav from "./DashboardNav";
import AddPropertyBtn from "./AddPropertyBtn";
export default function Header1({ parentClass = "header" }) {
  return (
    <header id="header-main" className={parentClass}>
      <div className="header-inner">
        <div className="tf-container xl">
          <div className="row">
            <div className="col-12">
              <div className="header-inner-wrap">
                <div className="header-logo">
                  <Link href={`/`} className="site-logo" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                    <span style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", textShadow: "0 1px 4px rgba(0,0,0,0.55)" }}>Glob</span>
                    <span style={{ fontSize: 24, fontWeight: 800, color: "#f0822d", letterSpacing: "-0.5px" }}>perty</span>
                  </Link>
                </div>
                <nav className="main-menu">
                  <ul className="navigation ">
                    <Nav />
                  </ul>
                </nav>
                <div className="header-right">
                  <DashboardNav />
                  <div className="btn-add">
                    <AddPropertyBtn />
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
