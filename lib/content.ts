import { projects as seed, type Project } from "./data";
import { getJSON, setJSON } from "./store";

export async function getProjects(): Promise<Project[]> {
  return (await getJSON<Project[]>("content:projects")) ?? seed;
}

export async function getFeaturedSlugs(): Promise<string[]> {
  return (await getJSON<string[]>("content:featured")) ?? seed.slice(0, 3).map((p) => p.slug);
}

export async function getFeatured(): Promise<Project[]> {
  const [all, slugs] = await Promise.all([getProjects(), getFeaturedSlugs()]);
  return slugs.map((s) => all.find((p) => p.slug === s)).filter((p): p is Project => !!p).slice(0, 3);
}

const s = (v: unknown, n = 2000) => String(v ?? "").trim().slice(0, n);
const arr = (v: unknown) => (Array.isArray(v) ? v.map((x) => s(x, 400)).filter(Boolean).slice(0, 20) : []);

export function sanitizeProjects(input: unknown): Project[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  const out: Project[] = [];
  for (const p of input.slice(0, 60)) {
    const slug = s(p?.slug, 80).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
    if (!slug || seen.has(slug) || !s(p?.title)) continue;
    seen.add(slug);
    const link = s(p?.link, 300);
    out.push({
      slug,
      title: s(p.title, 120),
      kind: s(p.kind, 40) || "Personal",
      status: p.status ? "Currently building" : undefined,
      summary: s(p.summary, 400),
      problem: s(p.problem),
      approach: arr(p.approach),
      impact: arr(p.impact),
      tags: arr(p.tags).slice(0, 8),
      link: /^https?:\/\//.test(link) ? link : undefined,
    });
  }
  return out;
}

export async function saveContent(projects: Project[], featured: string[]) {
  const valid = new Set(projects.map((p) => p.slug));
  await setJSON("content:projects", projects);
  await setJSON("content:featured", featured.filter((f) => valid.has(f)).slice(0, 3));
  await setJSON("content:updatedAt", new Date().toISOString());
}

export async function getUpdatedAt(): Promise<string> {
  const stored = await getJSON<string>("content:updatedAt");
  const build = process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString();
  return stored && stored > build ? stored : build;
}
