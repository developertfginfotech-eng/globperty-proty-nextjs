import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import Image from "next/image";
import DashboardNav from "./DashboardNav";
import AddPropertyBtn from "./AddPropertyBtn";
export default function Header2() {
  return (
    <header id="header-main" className="header style-2">
      <div className="header-inner">
        <div className="globperty-header-grid">
          {/* Logo — left */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href={`/`} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <span className="globperty-logo-text" style={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.55)" }}>Glob</span>
              <span className="globperty-logo-text" style={{ color: "#f0822d" }}>perty</span>
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
