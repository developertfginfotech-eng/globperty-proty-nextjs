import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import DashboardNav from "./DashboardNav";
import AddPropertyBtn from "./AddPropertyBtn";
import Image from "next/image";

export default function Header2() {
  return (
    <header id="header-main" className="header style-2">
      <div className="header-inner">
        <div className="globperty-header-grid">
          {/* Logo — left */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <Image src="/images/logo/globperty-logo.svg" alt="Globperty" height={40} width={140} style={{ height: 40, width: 140, objectFit: "contain" }} />
            </Link>
          </div>

          {/* Nav — true center */}
          <nav className="main-menu" style={{ overflow: "visible" }}>
            <ul className="navigation" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "nowrap", margin: 0, padding: 0, listStyle: "none" }}>
              <Nav />
            </ul>
          </nav>

          {/* Right actions — right */}
          <div className="header-right" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12 }}>
            <DashboardNav color="text_white" />
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
    </header>
  );
}
