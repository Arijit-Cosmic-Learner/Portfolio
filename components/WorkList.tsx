"use client";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/data";
import { Reveal } from "./Reveal";

export function WorkList({ projects }: { projects: Project[] }) {
  const filters = ["All", ...Array.from(new Set(projects.map((p) => p.kind)))];
  const [f, setF] = useState("All");
  const list = projects.filter((p) => f === "All" || p.kind === f);
  return (
    <section className="mx-auto max-w-6xl px-5 pt-12 md:px-8">
      <div className="flex flex-wrap gap-2" role="tablist">
        {filters.map((x) => (
          <button
            key={x}
            onClick={() => setF(x)}
            className={`h-10 rounded-full border px-4 text-sm transition ${f === x ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-accent hover:text-accent"}`}
          >
            {x}
          </button>
        ))}
      </div>
      <ul className="mt-8 border-t border-line">
        {list.map((p, i) => (
          <li key={p.slug} className="border-b border-line">
            <Reveal delay={i * 0.04}>
              <Link href={`/work/${p.slug}`} className="group grid gap-3 py-8 transition md:grid-cols-[80px_1.3fr_1fr_auto] md:items-center md:gap-8 md:py-10">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="font-display text-3xl transition group-hover:text-accent md:text-4xl">{p.title}</h2>
                  <p className="mt-2 max-w-md text-muted">{p.summary}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {p.status && <span className="label rounded-full border border-accent px-3 py-1 !text-accent">{p.status}</span>}
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="label rounded-full border border-line px-3 py-1">{t}</span>
                  ))}
                </div>
                <span className="hidden text-2xl text-accent opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 md:block">→</span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
