import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, IGNORE_COOKIE, makeToken, safeEqual } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const pw = String(form.get("password") || "");
  const expected = process.env.ADMIN_PASSWORD || "";
  const back = new URL("/admin", req.url);
  if (!expected || !safeEqual(pw, expected)) {
    back.searchParams.set("error", "1");
    return NextResponse.redirect(back, 303);
  }
  const res = NextResponse.redirect(back, 303);
  const opts = { httpOnly: true, sameSite: "lax" as const, path: "/", secure: process.env.NODE_ENV === "production" };
  res.cookies.set(ADMIN_COOKIE, makeToken(), { ...opts, maxAge: 60 * 60 * 24 * 30 });
  // Exclude the owner's own visits from the count
  res.cookies.set(IGNORE_COOKIE, "1", { ...opts, maxAge: 60 * 60 * 24 * 365 });
  return res;
}
