import Favorites from "@/components/dashboard/Favorites";
import React from "react";

export const metadata = {
  title: "My Favorites || Globperty - Real Estate React Nextjs Template",
  description: "Globperty - Real Estate React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Favorites />
    </>
  );
}
