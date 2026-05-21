"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";

export default function Sidebar() {
  const pathname = usePathname();
  const [favCount, setFavCount] = useState(0);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    apiClient.get("/favorites")
      .then((res) => setFavCount((res.data.favorites || []).length))
      .catch(() => {});
    apiClient.get("/notifications/unread-count")
      .then((res) => setUnreadCount(res.data.count || res.data.unreadCount || 0))
      .catch(() => {});
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      setRole(u.role || "");
      setUserName(u.name || u.email || "");
    } catch {}
  }, []);

  const isBuyer = role === "buyer";
  return (
    <div className="wrap-sidebar">
      <div className="sidebar-menu-dashboard" style={{ background: "linear-gradient(180deg, #0d1b2a 0%, #0f2040 100%)", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ padding: "6px 22px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "#f0822d", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 10px rgba(240,130,45,0.45)" }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.4px", fontFamily: "'Lexend', sans-serif" }}>Globperty</span>
          </Link>
        </div>
        <div className="menu-box" style={{ paddingTop: 10 }}>
          <ul className="box-menu-dashboard">
            <li
              className={`nav-menu-item ${
                pathname == "/dashboard" ? "active" : ""
              } `}
            >
              <Link className="nav-menu-link" href={`/dashboard`}>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V9.16667C2.5 9.6269 2.8731 10 3.33333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.668 2.5H12.5013C12.0411 2.5 11.668 2.8731 11.668 3.33333V5.83333C11.668 6.29357 12.0411 6.66667 12.5013 6.66667H16.668C17.1282 6.66667 17.5013 6.29357 17.5013 5.83333V3.33333C17.5013 2.8731 17.1282 2.5 16.668 2.5Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.668 10H12.5013C12.0411 10 11.668 10.3731 11.668 10.8333V16.6667C11.668 17.1269 12.0411 17.5 12.5013 17.5H16.668C17.1282 17.5 17.5013 17.1269 17.5013 16.6667V10.8333C17.5013 10.3731 17.1282 10 16.668 10Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 13.3334H3.33333C2.8731 13.3334 2.5 13.7065 2.5 14.1667V16.6667C2.5 17.1269 2.8731 17.5 3.33333 17.5H7.5C7.96024 17.5 8.33333 17.1269 8.33333 16.6667V14.1667C8.33333 13.7065 7.96024 13.3334 7.5 13.3334Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Dashboards
              </Link>
            </li>
            <li
              className={`nav-menu-item ${
                pathname == "/my-profile" ? "active" : ""
              } `}
            >
              <Link className="nav-menu-link" href={`/my-profile`}>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.082 18.3333H14.9987C15.4407 18.3333 15.8646 18.1577 16.1772 17.8451C16.4898 17.5326 16.6654 17.1087 16.6654 16.6666V5.83329L12.4987 1.66663H4.9987C4.55667 1.66663 4.13275 1.84222 3.82019 2.15478C3.50763 2.46734 3.33203 2.89127 3.33203 3.33329V6.66663"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.668 1.66663V4.99996C11.668 5.44199 11.8436 5.86591 12.1561 6.17847C12.4687 6.49103 12.8926 6.66663 13.3346 6.66663H16.668"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.49828 10.9167C2.24146 11.0649 2.02884 11.279 1.88235 11.5368C1.73587 11.7946 1.66082 12.0868 1.66494 12.3833V15.0833C1.65529 15.3802 1.72514 15.6742 1.86726 15.935C2.00937 16.1958 2.2186 16.4139 2.47328 16.5667L4.99828 18.0833C5.25385 18.2356 5.5455 18.3166 5.84297 18.3181C6.14044 18.3195 6.43288 18.2414 6.68994 18.0917L9.16494 16.5833C9.42176 16.4351 9.63438 16.221 9.78087 15.9632C9.92735 15.7054 10.0024 15.4132 9.99828 15.1167V12.4167C10.0079 12.1198 9.93808 11.8258 9.79596 11.565C9.65385 11.3042 9.44462 11.0861 9.18994 10.9333L6.66494 9.41666C6.40937 9.26442 6.11771 9.18337 5.82025 9.1819C5.52278 9.18044 5.23033 9.25862 4.97328 9.40832L2.49828 10.9167Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.83203 14.1666V18.3333"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.7513 11.8334L5.83464 14.1667L1.91797 11.8334"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Profile
              </Link>
            </li>

            {/* CRM — seller, agent, broker, admin */}
            {(role === "agent" || role === "seller" || role === "broker" || role === "admin") && (
              <li className={`nav-menu-item ${pathname == "/crm" ? "active" : ""}`}>
                <Link className="nav-menu-link" href="/crm">
                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.16667 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V10.8333" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.8333 1.66663L18.3333 4.16663L10 12.4999H7.5V9.99994L15.8333 1.66663Z" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  CRM
                </Link>
              </li>
            )}

            <li
              className={`nav-menu-item ${
                ["/my-property", "/my-favorites", "/review", "/visits"].includes(pathname) ? "active" : ""
              } `}
            >
              <Link className="nav-menu-link" href={`/my-property`}>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 15C16.3807 15 17.5 13.8807 17.5 12.5C17.5 11.1193 16.3807 10 15 10C13.6193 10 12.5 11.1193 12.5 12.5C12.5 13.8807 13.6193 15 15 15Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5013 9.16667C9.34225 9.16667 10.8346 7.67428 10.8346 5.83333C10.8346 3.99238 9.34225 2.5 7.5013 2.5C5.66035 2.5 4.16797 3.99238 4.16797 5.83333C4.16797 7.67428 5.66035 9.16667 7.5013 9.16667Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.33464 12.5H5.0013C4.11725 12.5 3.2694 12.8512 2.64428 13.4763C2.01916 14.1014 1.66797 14.9493 1.66797 15.8333V17.5"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.082 13.6666L17.332 13.4166"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.668 11.5834L11.918 11.3334"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.832 15.5834L14.082 14.8334"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.918 10.1666L16.168 9.41663"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.3333 15.5833L16 14.75"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.0013 10.25L13.668 9.41663"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.918 13.8333L12.7513 13.5"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.25 11.5L18.0833 11.1666"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                My properties
              </Link>
            </li>
            {!isBuyer && <li
              className={`nav-menu-item ${
                pathname == "/add-property" ? "active" : ""
              } `}
            >
              <Link className="nav-menu-link" href={`/add-property`}>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.9987 4.16663L12.987 2.15496C12.6745 1.84238 12.2507 1.66672 11.8087 1.66663H4.9987C4.55667 1.66663 4.13275 1.84222 3.82019 2.15478C3.50763 2.46734 3.33203 2.89127 3.33203 3.33329V16.6666C3.33203 17.1087 3.50763 17.5326 3.82019 17.8451C4.13275 18.1577 4.55667 18.3333 4.9987 18.3333H14.9987C15.4407 18.3333 15.8646 18.1577 16.1772 17.8451C16.4898 17.5326 16.6654 17.1087 16.6654 16.6666"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.8168 10.5217C18.1487 10.1897 18.3352 9.73947 18.3352 9.27C18.3352 8.80054 18.1487 8.3503 17.8168 8.01834C17.4848 7.68637 17.0346 7.49988 16.5651 7.49988C16.0956 7.49988 15.6454 7.68637 15.3134 8.01834L11.9718 11.3617C11.7736 11.5597 11.6286 11.8044 11.5501 12.0733L10.8526 14.465C10.8317 14.5367 10.8304 14.6127 10.849 14.6851C10.8675 14.7574 10.9052 14.8235 10.958 14.8763C11.0108 14.9291 11.0768 14.9668 11.1492 14.9853C11.2216 15.0038 11.2976 15.0026 11.3693 14.9817L13.7609 14.2842C14.0298 14.2057 14.2746 14.0606 14.4726 13.8625L17.8168 10.5217Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66797 15H7.5013"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add property
              </Link>
            </li>}
            <li
              className={`nav-menu-item ${
                pathname == "/my-package" ? "active" : ""
              } `}
            >
              <Link className="nav-menu-link" href={`/my-package`}>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 7.5H17.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V7.5Z"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 7.50004L4.54167 3.41671C4.6808 3.14059 4.89401 2.90861 5.15744 2.74673C5.42087 2.58484 5.72414 2.49943 6.03333 2.50004H13.9667C14.2773 2.49788 14.5823 2.58256 14.8473 2.74453C15.1124 2.9065 15.3269 3.13931 15.4667 3.41671L17.5 7.50004"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 2.5V7.5"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                My Plans
              </Link>
            </li>
            {/* Notifications */}
            <li className={`nav-menu-item ${pathname === "/notifications" ? "active" : ""}`}>
              <Link className="nav-menu-link" href="/notifications" style={{ position: "relative" }}>
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2.5C7.23858 2.5 5 4.73858 5 7.5V11.25L3.33333 12.9167V13.75H16.6667V12.9167L15 11.25V7.5C15 4.73858 12.7614 2.5 10 2.5Z" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.33203 13.75C8.33203 14.671 9.07869 15.4167 9.9987 15.4167C10.9187 15.4167 11.6654 14.671 11.6654 13.75" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Notifications
                {unreadCount > 0 && (
                  <span style={{ position: "absolute", top: 6, right: 10, background: "#f0822d", color: "#fff", fontSize: 10, fontWeight: 800, borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Link>
            </li>

            {/* Buyer: My Deals */}
            {isBuyer && (
              <li className={`nav-menu-item ${pathname == "/deals" ? "active" : ""}`}>
                <Link className="nav-menu-link" href="/deals">
                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 14.1667V16.6667H6.66667V14.1667H2.5Z" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.91797 10V16.6667H12.0846V10H7.91797Z" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.332 5.83337V16.6667H17.4987V5.83337H13.332Z" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  My Deals
                </Link>
              </li>
            )}

            {/* Buyer: My Offers */}
            {isBuyer && (
              <li className={`nav-menu-item ${pathname == "/my-offers" ? "active" : ""}`}>
                <Link className="nav-menu-link" href="/my-offers">
                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 5.83337C2.5 4.91290 3.24619 4.16671 4.16667 4.16671H15.8333C16.7538 4.16671 17.5 4.91290 17.5 5.83337V14.1667C17.5 15.0872 16.7538 15.8334 15.8333 15.8334H4.16667C3.24619 15.8334 2.5 15.0872 2.5 14.1667V5.83337Z" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.5 7.5H17.5" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.66797 11.6667H9.16797" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  My Offers
                </Link>
              </li>
            )}

            {/* Buyer: Price Alerts */}
            {isBuyer && (
              <li className={`nav-menu-item ${pathname == "/price-alerts" ? "active" : ""}`}>
                <Link className="nav-menu-link" href="/price-alerts">
                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 1.66663C7.70001 1.66663 5.83334 3.53329 5.83334 5.83329V10.8333L4.16667 12.5V13.3333H15.8333V12.5L14.1667 10.8333V5.83329C14.1667 3.53329 12.3 1.66663 10 1.66663Z" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.33334 13.3334C8.33334 14.254 9.07953 15.0001 10 15.0001C10.9205 15.0001 11.6667 14.254 11.6667 13.3334" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="14.5" cy="5.5" r="3.5" fill="#f0822d" stroke="none"/>
                    <line x1="14.5" y1="3.5" x2="14.5" y2="5.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
                    <circle cx="14.5" cy="7" r="0.6" fill="#fff"/>
                  </svg>
                  Price Alerts
                </Link>
              </li>
            )}

            {/* Seller-only items */}
            {!isBuyer && (
              <>
                <li className={`nav-menu-item ${pathname == "/deals" ? "active" : ""}`}>
                  <Link className="nav-menu-link" href="/deals">
                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 14.1667V16.6667H6.66667V14.1667H2.5Z" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.91797 10V16.6667H12.0846V10H7.91797Z" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.332 5.83337V16.6667H17.4987V5.83337H13.332Z" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Deals & Offers
                  </Link>
                </li>
                <li className={`nav-menu-item ${pathname == "/analytics" ? "active" : ""}`}>
                  <Link className="nav-menu-link" href="/analytics">
                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 15.8334L6.66667 10L10.8333 12.5L15 5.83337" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.332 5.83337H17.4987V10.0001" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Analytics
                  </Link>
                </li>
              </>
            )}

            {/* Direct Messages — all roles */}
            <li className={`nav-menu-item ${pathname == "/inbox" ? "active" : ""}`}>
              <Link className="nav-menu-link" href="/inbox">
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 12.5C17.5 12.942 17.3244 13.366 17.0118 13.6785C16.6993 13.9911 16.2754 14.1667 15.8333 14.1667H5.83333L2.5 17.5V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V12.5Z" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Direct Messages
              </Link>
            </li>

            {/* EMI Calculator — all roles */}
            <li className={`nav-menu-item ${pathname == "/calculator" ? "active" : ""}`}>
              <Link className="nav-menu-link" href="/calculator">
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2.5" y="2.5" width="15" height="15" rx="2" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.66797 6.66663H13.3346" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.66797 10H9.16797" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.66797 13.3334H9.16797" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.5 10L13.332 10.8334L15 9.16663" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.5 13.3334L13.332 14.1667L15 12.5" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                EMI Calculator
              </Link>
            </li>

            {/* Admin — admin role only */}
            {role === "admin" && (
              <li className={`nav-menu-item ${pathname == "/admin" ? "active" : ""}`}>
                <Link className="nav-menu-link" href="/admin">
                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2.5L12.5 7.5L18 8.25L14 12.25L15 17.5L10 15L5 17.5L6 12.25L2 8.25L7.5 7.5L10 2.5Z" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Admin Panel
                </Link>
              </li>
            )}

            {/* Support */}
            <li className={`nav-menu-item ${pathname == "/support" ? "active" : ""}`}>
              <Link className="nav-menu-link" href="/support">
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="7.5" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 7.5C7.5 6.11929 8.61929 5 10 5C11.3807 5 12.5 6.11929 12.5 7.5C12.5 8.88071 11.3807 10 10 10V11.6667" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="13.75" r="0.833333" fill="#A8ABAE"/>
                </svg>
                Help & Support
              </Link>
            </li>

            {/* AI Assistant — all roles — bottom of menu */}
            <li className={`nav-menu-item ${pathname == "/messages" ? "active" : ""}`}>
              <Link className="nav-menu-link" href="/messages">
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 12.5C17.5 12.942 17.3244 13.366 17.0118 13.6785C16.6993 13.9911 16.2754 14.1667 15.8333 14.1667H5.83333L2.5 17.5V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V12.5Z" stroke="#A8ABAE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                AI Assistant
              </Link>
            </li>

            <li className={`nav-menu-item `}>
              <Link className="nav-menu-link" href={`/`}>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.332 14.1667L17.4987 10L13.332 5.83337"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 10H7.5"
                    stroke="#A8ABAE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Logout
              </Link>
            </li>
          </ul>
        </div>

        {/* User info at bottom */}
        {userName && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #f0822d, #e56c1a)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(240,130,45,0.35)" }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{userName[0]?.toUpperCase()}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userName}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "capitalize", fontWeight: 500 }}>{role || "user"}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
