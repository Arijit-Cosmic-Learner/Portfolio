import { NextResponse } from "next/server";
import { getUpdatedAt } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ updatedAt: await getUpdatedAt() });
}
