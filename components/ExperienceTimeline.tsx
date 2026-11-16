"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import type { experience, education, certifications } from "@/lib/data";

interface ExperienceTimelineProps {
  experienceList: typeof experience;
  educationList: typeof education;
  certificationList: typeof certifications;
}

export function ExperienceTimeline({
  experienceList,
  educationList,
  certificationList,
}: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll tracer for the continuous vertical line (Exp 3)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="mx-auto mt-12 max-w-6xl px-5 md:px-8">
      {/* Interactive Timeline Container */}
      <div ref={containerRef} className="relative pl-8 md:pl-12">
        {/* Base Track */}
        <div className="absolute left-2.5 top-2 bottom-2 w-[2px] bg-line/60 md:left-4" />

        {/* Dynamic Scrubbed Orange Line */}
        {!reduce && (
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-2.5 top-2 w-[2px] bg-accent origin-top md:left-4"
          />
        )}

        <ol className="space-y-14">
          {experienceList.map((e, idx) => (
            <li key={e.company} className="relative">
              {/* Timeline Indicator Dot */}
              <span className="absolute -left-[27px] top-2 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg md:-left-[39px]" />

              {/* Card with Scale-Up Stagger Animation (Exp 4) */}
              <Reveal delay={idx * 0.1}>
                <div className="rounded-2xl border border-line bg-surface/50 p-6 md:p-8 transition hover:border-accent">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line bg-surface font-display text-lg text-accent"
                        aria-hidden
                      >
                        {e.company.slice(0, 2)}
                      </span>
                      <div>
                        <h2 className="font-display text-2xl md:text-3xl text-fg">{e.role}</h2>
                        <p className="text-sm font-medium text-accent">
                          {e.company} · {e.team}
                        </p>
                      </div>
                    </div>
                    <span className="label rounded-full border border-line px-3 py-1">
                      {e.period}
                    </span>
                  </div>

                  {e.note && (
                    <p className="mt-3 text-xs italic text-muted">
                      {e.note}
                    </p>
                  )}

                  <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted md:text-[15px]">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* Education & Certifications with Exp 4 Card Scale */}
      <div className="mt-20 grid gap-10 border-t border-line pt-12 md:grid-cols-2">
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-line bg-surface/40 p-6 md:p-8">
            <h2 className="label text-accent">Education</h2>
            <ul className="mt-6 space-y-6">
              {educationList.map((ed) => (
                <li key={ed.title} className="border-b border-line/60 pb-4 last:border-none last:pb-0">
                  <p className="font-display text-xl text-fg">{ed.title}</p>
                  <p className="text-sm text-muted">{ed.where}</p>
                  <p className="label mt-1 text-accent">{ed.period}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="rounded-2xl border border-line bg-surface/40 p-6 md:p-8">
            <h2 className="label text-accent">Certifications</h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {certificationList.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-line bg-bg px-4 py-2 text-xs font-medium text-fg transition hover:border-accent hover:text-accent"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
