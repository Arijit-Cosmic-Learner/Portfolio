import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getStats } from "@/lib/visits";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(await getStats());
}
