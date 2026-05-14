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
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px", width: "100%" }}>
          <div className="row">
            <div className="col-12">
              <div className="header-inner-wrap" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", minHeight: 72 }}>
                {/* Logo — left */}
                <div className="header-logo" style={{ display: "flex", alignItems: "center" }}>
                  <Link href={`/`} className="site-logo" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                    <span style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", textShadow: "0 1px 4px rgba(0,0,0,0.55)" }}>Glob</span>
                    <span style={{ fontSize: 26, fontWeight: 800, color: "#f0822d", letterSpacing: "-0.5px" }}>perty</span>
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
          </div>
        </div>
      </div>
    </header>
  );
}
