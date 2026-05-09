"use client";
import dynamic from "next/dynamic";

const Properties4 = dynamic(() => import("./Properties4"), { ssr: false });

export default function Properties4Client(props) {
  return <Properties4 {...props} />;
}
