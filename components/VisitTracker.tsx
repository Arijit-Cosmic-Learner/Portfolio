"use client";
import { useEffect } from "react";

export function VisitTracker() {
  useEffect(() => {
    if (sessionStorage.getItem("pf_counted")) return;
    sessionStorage.setItem("pf_counted", "1");
    fetch("/api/visit", { method: "POST", keepalive: true }).catch(() => {});
  }, []);
  return null;
}
