"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function AddPropertyBtn({ className = "tf-btn style-border pd-23" }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.role && user.role !== "buyer") setShow(true);
    } catch {}
  }, []);

  if (!show) return null;
  return (
    <Link className={className} href="/add-property">
      Add property
    </Link>
  );
}
