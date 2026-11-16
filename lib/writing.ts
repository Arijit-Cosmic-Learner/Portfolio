import fs from "fs";
import path from "path";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content", "writing");

export type Post = { slug: string; title: string; date: string; summary: string; tags: string[]; draft: boolean; readingTime: number; body: string };

function parse(slug: string, raw: string): Post {
  const m = raw.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  const body = m ? m[2] : raw;
  if (m) for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    summary: meta.summary || "",
    tags: (meta.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
    draft: meta.draft === "true",
    readingTime: Math.max(1, Math.round(words / 220)),
    body,
  };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.replace(/\.md$/, ""), fs.readFileSync(path.join(DIR, f), "utf8")))
    .filter((p) => process.env.NODE_ENV !== "production" || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug) ?? null;
}

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}
