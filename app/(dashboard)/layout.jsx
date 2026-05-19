import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

export const metadata = {
  title: "Dashboard — Globperty",
  description: "Globperty Real Estate Dashboard",
};
export default function page({ children }) {
  return (
    <>
      <style>{`
        .bg-dashboard, .bg-dashboard * {
          font-family: 'Lexend', 'Inter', sans-serif !important;
        }
        .bg-dashboard .nav-menu-link {
          font-family: 'Lexend', sans-serif !important;
          font-weight: 500 !important;
        }
        .bg-dashboard .nav-menu-item.active .nav-menu-link {
          font-weight: 700 !important;
        }
      `}</style>
      <div className="bg-dashboard">
        <div id="wrapper" className="bg-4">
          <div className="page-layout">
            <Sidebar />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
