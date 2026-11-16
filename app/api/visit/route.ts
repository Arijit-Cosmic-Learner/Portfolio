import { NextRequest, NextResponse } from "next/server";
import { IGNORE_COOKIE } from "@/lib/auth";
import { recordVisit } from "@/lib/visits";

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse/i;

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  if (BOT.test(ua) || req.cookies.get(IGNORE_COOKIE)) return NextResponse.json({ ok: true });
  const isNew = !req.cookies.get("pf_vid");
  await recordVisit(isNew);
  const res = NextResponse.json({ ok: true });
  if (isNew) res.cookies.set("pf_vid", crypto.randomUUID(), { maxAge: 60 * 60 * 24 * 365, httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
