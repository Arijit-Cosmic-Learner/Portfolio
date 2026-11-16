"use client";

import Link from "next/link";
import { type Project } from "@/lib/data";

export function FeaturedMarquee({ projects }: { projects: Project[] }) {
  // Triple the array to provide an uninterrupted continuous loop
  const list = [...projects, ...projects, ...projects];

  return (
    <div className="relative w-full">
      {/* Visual Train Track Top Indicator Line */}
      <div className="relative mb-5 flex items-center justify-between border-b border-line pb-3.5">
        <h2 className="font-mono text-xs uppercase tracking-widest font-semibold text-fg/90">
          Featured work
        </h2>
        <Link
          href="/work"
          className="font-mono text-xs uppercase tracking-wider font-medium text-accent transition hover:underline flex items-center gap-1.5"
        >
          View all work ({projects.length}) <span>→</span>
        </Link>
      </div>

      {/* Mask only the horizontal moving deck so the header above is 100% crisp & full contrast */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        {/* Moving Train Deck */}
        <div className="flex w-max gap-5 py-2 animate-marquee hover:[animation-play-state:paused]">
        {list.map((p, idx) => (
          <Link
            key={`${p.slug}-${idx}`}
            href={`/work/${p.slug}`}
            className="group relative flex h-[270px] w-[310px] 2xl:h-[310px] 2xl:w-[380px] 3xl:h-[330px] 3xl:w-[420px] shrink-0 flex-col justify-between rounded-2xl border border-line bg-surface p-6 2xl:p-8 transition-all duration-300 hover:border-accent hover:-translate-y-1 sm:w-[350px]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="label text-xs 2xl:text-sm">
                  {String((idx % projects.length) + 1).padStart(2, "0")} // {p.kind}
                </span>
                {p.status && (
                  <span className="label rounded-full border border-accent/60 bg-accent/10 px-2.5 py-0.5 !text-accent">
                    Building
                  </span>
                )}
              </div>
              <h3 className="font-display mt-4 text-2xl 2xl:text-3xl line-clamp-2 text-fg transition group-hover:text-accent">
                {p.title}
              </h3>
              <p className="mt-2.5 text-xs 2xl:text-sm leading-relaxed text-muted line-clamp-3">
                {p.summary}
              </p>
            </div>
            <div className="pt-3 border-t border-line/60 flex items-center justify-between text-xs">
              <span className="label text-muted group-hover:text-accent transition">Interactive case</span>
              <span className="text-accent transition group-hover:translate-x-1 font-medium">Read more →</span>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}

