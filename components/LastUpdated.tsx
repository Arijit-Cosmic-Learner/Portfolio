"use client";
import { useEffect, useState } from "react";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function LastUpdated() {
  const [iso, setIso] = useState<string>(process.env.NEXT_PUBLIC_BUILD_TIME || "");
  useEffect(() => {
    fetch("/api/updated").then((r) => r.json()).then((j) => j.updatedAt && setIso(j.updatedAt)).catch(() => {});
  }, []);
  if (!iso) return null;
  return <span suppressHydrationWarning>Last updated {fmt(iso)}</span>;
}
