import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { getFeaturedSlugs, getProjects, sanitizeProjects, saveContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ projects: await getProjects(), featured: await getFeaturedSlugs() });
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await req.json().catch(() => null);
  const projects = sanitizeProjects(body?.projects);
  if (!projects.length) return NextResponse.json({ error: "At least one project is required." }, { status: 400 });
  const featured = Array.isArray(body?.featured) ? body.featured.map(String) : [];
  await saveContent(projects, featured);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
