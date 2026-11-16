import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "pf_admin";
export const IGNORE_COOKIE = "pf_ignore";

const secret = () => process.env.SESSION_SECRET || "dev-secret-change-me";
const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("hex");

export function makeToken() {
  return `admin.${sign("admin")}`;
}

export function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a), bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export async function isAdmin() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  return !!token && safeEqual(token, makeToken());
}
