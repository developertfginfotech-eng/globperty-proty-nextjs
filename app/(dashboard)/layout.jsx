import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

export const metadata = {
  title: "Dashboard || Globperty - Real Estate React Nextjs Template",
  description: "Globperty - Real Estate React Nextjs Template",
};
export default function page({ children }) {
  return (
    <>
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
