"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const propertiesByPurpose = [
  { label: "Buy Property", sub: "Apartments, villas, land & more", href: "/listings?status=buy" },
  { label: "Rent Property", sub: "Long-term rentals worldwide", href: "/listings?status=rent" },
  { label: "Short Stay / Holiday Let", sub: "Serviced & holiday apartments", href: "/listings?type=short-stay" },
  { label: "Student Housing", sub: "Rentals near universities worldwide", href: "/listings?type=student" },
  { label: "New Projects & Off-Plan", sub: "Upcoming launches & pre-launch deals", href: "/project-list" },
  { label: "Roommate / Shared Housing", sub: "Find flatmates internationally", href: "/listings?type=shared" },
];

const propertiesByType = [
  { label: "Apartments & Flats", href: "/listings?type=Apartment" },
  { label: "Villas & Houses", href: "/listings?type=Villa" },
  { label: "Townhouses", href: "/listings?type=townhouse" },
  { label: "Penthouses", href: "/listings?type=Penthouse" },
  { label: "Commercial Property", href: "/listings?type=Office" },
  { label: "Land & Plots", href: "/listings?type=land" },
  { label: "Warehouses & Industrial", href: "/listings?type=warehouse" },
];

const countries = [
  { icon: "🇦🇪", label: "UAE", href: "/countries/uae" },
  { icon: "🇺🇸", label: "USA", href: "/countries/usa" },
  { icon: "🇵🇹", label: "Portugal", href: "/countries/portugal" },
  { icon: "🇦🇺", label: "Australia", href: "/countries/australia" },
  { icon: "🇹🇷", label: "Turkey", href: "/countries/turkey" },
  { icon: "🇨🇾", label: "Cyprus", href: "/countries/cyprus" },
  { icon: "🇲🇹", label: "Malta", href: "/countries/malta" },
  { icon: "🇨🇦", label: "Canada", href: "/countries/canada" },
  { icon: "🇭🇺", label: "Hungary", href: "/countries/hungary" },
  { icon: "🇱🇻", label: "Latvia", href: "/countries/latvia" },
  { icon: "🇵🇭", label: "Philippines", href: "/countries/philippines" },
  { icon: "🇲🇾", label: "Malaysia", href: "/countries/malaysia" },
];

const visas = [
  { label: "UAE Golden Visa", href: "/visas/uae-golden-visa" },
  { label: "Portugal Golden Visa", href: "/visas/portugal-golden-visa" },
  { label: "Turkey Citizenship by Investment", href: "/visas/turkey-citizenship" },
  { label: "Cyprus Permanent Residency", href: "/visas/cyprus-residency" },
  { label: "Malta Residency Programme", href: "/visas/malta-residency" },
  { label: "Hungary Guest Investor Visa", href: "/visas/hungary-guest-investor" },
  { label: "Latvia Residency by Investment", href: "/visas/latvia-residency" },
  { label: "Malaysia MM2H Visa", href: "/visas/malaysia-mm2h" },
  { label: "Visa Eligibility Checker", href: "/visa-checker" },
];

const tools = [
  { label: "Rental Yield Calculator", href: "/rental-yield" },
  { label: "ROI & Capital Growth Estimator", href: "/roi-calculator" },
  { label: "Mortgage Calculator", href: "/home-loan-process" },
  { label: "Currency Converter", href: "/currency-converter" },
  { label: "Cost of Buying Calculator", href: "/cost-of-buying" },
  { label: "AI Property Assistant", href: "/copilot" },
  { label: "Visa Eligibility Checker", href: "/visa-checker" },
];

export default function MobileMenu() {
  const pathname = usePathname();

  return (
    <div
      className="offcanvas offcanvas-start mobile-nav-wrap"
      tabIndex={-1}
      id="menu-mobile"
      aria-labelledby="menu-mobile"
    >
      <div className="offcanvas-header top-nav-mobile">
        <div className="offcanvas-title">
          <Link href="/" style={{ fontSize: 22, fontWeight: 700, color: "#f0822d", textDecoration: "none", letterSpacing: "-0.5px" }}>
            Globperty
          </Link>
        </div>
        <div data-bs-dismiss="offcanvas" aria-label="Close">
          <i className="icon-close" />
        </div>
      </div>

      <div className="offcanvas-body inner-mobile-nav">
        <div className="mb-body">
          <ul id="menu-mobile-menu">

            {/* Properties */}
            <li className="menu-item menu-item-has-children-mobile">
              <a
                href="#dropdown-properties"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="dropdown-properties"
              >
                Properties
              </a>
              <div id="dropdown-properties" className="collapse" data-bs-parent="#menu-mobile-menu">
                <ul className="sub-mobile">
                  {/* By Purpose */}
                  <li className="menu-item menu-item-has-children-mobile-2">
                    <a
                      href="#sub-by-purpose"
                      className="item-menu-mobile collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="sub-by-purpose"
                      style={{ fontWeight: 600, color: "#f0822d", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}
                    >
                      By Purpose
                    </a>
                    <div id="sub-by-purpose" className="collapse" data-bs-parent="#dropdown-properties">
                      <ul className="sub-mobile">
                        {propertiesByPurpose.map((item, i) => (
                          <li key={i} className={`menu-item ${pathname === item.href ? "current-item" : ""}`}>
                            <Link href={item.href} className="item-menu-mobile">{item.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  {/* By Property Type */}
                  <li className="menu-item menu-item-has-children-mobile-2">
                    <a
                      href="#sub-by-type"
                      className="item-menu-mobile collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="sub-by-type"
                      style={{ fontWeight: 600, color: "#f0822d", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}
                    >
                      By Property Type
                    </a>
                    <div id="sub-by-type" className="collapse" data-bs-parent="#dropdown-properties">
                      <ul className="sub-mobile">
                        {propertiesByType.map((item, i) => (
                          <li key={i} className={`menu-item ${pathname === item.href ? "current-item" : ""}`}>
                            <Link href={item.href} className="item-menu-mobile">{item.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>

            {/* Countries */}
            <li className="menu-item menu-item-has-children-mobile">
              <a
                href="#dropdown-countries"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="dropdown-countries"
              >
                Countries
              </a>
              <div id="dropdown-countries" className="collapse" data-bs-parent="#menu-mobile-menu">
                <ul className="sub-mobile">
                  {countries.map((c, i) => (
                    <li key={i} className={`menu-item ${pathname === c.href ? "current-item" : ""}`}>
                      <Link href={c.href} className="item-menu-mobile">
                        <span style={{ marginRight: 8 }}>{c.icon}</span>{c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Visas */}
            <li className="menu-item menu-item-has-children-mobile">
              <a
                href="#dropdown-visas"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="dropdown-visas"
              >
                Visas
              </a>
              <div id="dropdown-visas" className="collapse" data-bs-parent="#menu-mobile-menu">
                <ul className="sub-mobile">
                  {visas.map((v, i) => (
                    <li key={i} className={`menu-item ${pathname === v.href ? "current-item" : ""}`}>
                      <Link href={v.href} className="item-menu-mobile">{v.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Tools */}
            <li className="menu-item menu-item-has-children-mobile">
              <a
                href="#dropdown-tools"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="dropdown-tools"
              >
                Tools
              </a>
              <div id="dropdown-tools" className="collapse" data-bs-parent="#menu-mobile-menu">
                <ul className="sub-mobile">
                  {tools.map((t, i) => (
                    <li key={i} className={`menu-item ${pathname === t.href ? "current-item" : ""}`}>
                      <Link href={t.href} className="item-menu-mobile">{t.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Contact — direct link */}
            <li className={`menu-item ${pathname === "/contact" ? "current-item" : ""}`}>
              <Link href="/contact" className="item-menu-mobile">Contact</Link>
            </li>

          </ul>

          {/* Footer info */}
          <div className="support">
            <a href="#" className="text-need">Need help?</a>
            <ul className="mb-info">
              <li>Email: <a href="mailto:hi@globperty.com">hi@globperty.com</a></li>
              <li>
                <div className="wrap-social">
                  <p>Follow us:</p>
                  <ul className="tf-social style-2">
                    <li><a href="#"><i className="icon-fb" /></a></li>
                    <li><a href="#"><i className="icon-X" /></a></li>
                    <li><a href="#"><i className="icon-linked" /></a></li>
                    <li><a href="#"><i className="icon-ins" /></a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
