"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Lenis from "lenis";

export default function ScrollLabPage() {
  const [smoothScrollActive, setSmoothScrollActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Global Page Scroll
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Optional Smooth Scroll (Lenis) Engine Hook
  useEffect(() => {
    if (!smoothScrollActive) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [smoothScrollActive]);

  // Demo 2: Parallax ref
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const yBackground = useTransform(parallaxProgress, [0, 1], [-60, 60]);
  const yForeground = useTransform(parallaxProgress, [0, 1], [40, -40]);
  const cardRotate = useTransform(parallaxProgress, [0, 0.5, 1], [-2, 0, 2]);

  // Demo 3: Interactive Timeline ref
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative min-h-[300vh] pb-32">
      {/* Top Floating Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-accent origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Floating HUD Controller */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 rounded-2xl border border-line bg-surface/90 p-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <span className="label">Smooth Scroll (Lenis)</span>
          <button
            onClick={() => setSmoothScrollActive(!smoothScrollActive)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              smoothScrollActive
                ? "bg-accent text-bg"
                : "border border-line bg-bg text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {smoothScrollActive ? "Active ON" : "Default OFF"}
          </button>
        </div>
        <p className="text-[11px] text-muted">
          Toggle to feel standard native scroll vs inertial studio scroll.
        </p>
      </div>

      {/* Lab Header */}
      <section className="mx-auto max-w-5xl px-5 pt-16 md:px-8">
        <div className="flex items-center justify-between border-b border-line pb-6">
          <div>
            <Link href="/lab" className="label hover:text-accent">← Graphic Lab</Link>
            <h1 className="font-display mt-2 text-4xl md:text-6xl">Scroll Animation Lab</h1>
            <p className="mt-2 text-muted">Scroll down through the 4 live interactive animation playgrounds.</p>
          </div>
          <span className="label hidden sm:block">Scroll down ↓</span>
        </div>
      </section>

      {/* ========================================================== */}
      {/* DEMO 1: Masked Line Wipe & Hairline Unfurl */}
      {/* ========================================================== */}
      <section className="mx-auto mt-28 max-w-5xl px-5 md:px-8">
        <span className="label text-accent">Experiment 01 // Typography</span>
        <h2 className="font-display mt-2 text-3xl md:text-4xl">Masked Kinetic Text &amp; Hairline Draw</h2>
        <p className="mt-2 text-sm text-muted">Words glide out from an invisible clipping mask when crossing the viewport.</p>

        <div className="mt-12 space-y-12 rounded-3xl border border-line bg-surface/40 p-8 md:p-14">
          <div className="overflow-hidden">
            <motion.h3
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl leading-tight md:text-6xl"
            >
              Closing the gap between
            </motion.h3>
          </div>
          <div className="overflow-hidden">
            <motion.h3
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl text-accent leading-tight md:text-6xl"
            >
              Customers, Product &amp; Engineering.
            </motion.h3>
          </div>

          {/* Dynamically drawing line */}
          <div className="pt-6">
            <div className="relative h-[2px] w-full bg-line/40 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, margin: "-10% 0px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full bg-accent origin-left"
              />
            </div>
            <div className="mt-3 flex justify-between text-xs text-muted">
              <span>0% Viewport Entry</span>
              <span>100% Width Calculated Dynamically</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* DEMO 2: Multi-Plane Floating Parallax & 3D Tilt */}
      {/* ========================================================== */}
      <section ref={parallaxRef} className="mx-auto mt-36 max-w-5xl px-5 md:px-8">
        <span className="label text-accent">Experiment 02 // Spatial Depth</span>
        <h2 className="font-display mt-2 text-3xl md:text-4xl">Multi-Plane Floating Parallax</h2>
        <p className="mt-2 text-sm text-muted">Background badges and foreground project cards move at opposing scroll speeds.</p>

        <div className="relative mt-12 grid h-[440px] items-center justify-center overflow-hidden rounded-3xl border border-line bg-surface/30 p-8">
          {/* Slower background layer */}
          <motion.div
            style={{ y: yBackground }}
            className="absolute left-8 top-12 rounded-2xl border border-accent/40 bg-bg/90 px-5 py-3 shadow-lg"
          >
            <span className="label text-accent">Velocity $0.8\times$</span>
            <p className="font-display text-lg">HyperCredit Orchestration</p>
          </motion.div>

          <motion.div
            style={{ y: yBackground }}
            className="absolute right-8 bottom-12 rounded-2xl border border-line bg-bg/90 px-5 py-3 shadow-lg"
          >
            <span className="label text-muted">Velocity $0.8\times$</span>
            <p className="font-display text-lg">Zero Approvals · 15 Mins</p>
          </motion.div>

          {/* Faster foreground card with slight reactive tilt */}
          <motion.div
            style={{ y: yForeground, rotate: cardRotate }}
            className="z-10 max-w-md rounded-2xl border border-accent bg-surface p-8 shadow-2xl transition hover:border-fg"
          >
            <div className="flex items-center justify-between">
              <span className="label text-accent">Velocity $1.2\times$ (Foreground)</span>
              <span className="h-2 w-2 rounded-full bg-accent pulse-dot" />
            </div>
            <h3 className="font-display mt-3 text-3xl">Credit Interceptor</h3>
            <p className="mt-2 text-sm text-muted">
              Float responsiveness adjusts continuously as your wheel or touch gesture scrubs up and down.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* DEMO 3: Active Scroll-Scrubbed Timeline Tracer */}
      {/* ========================================================== */}
      <section ref={timelineRef} className="mx-auto mt-36 max-w-5xl px-5 md:px-8">
        <span className="label text-accent">Experiment 03 // Interactive Narrative</span>
        <h2 className="font-display mt-2 text-3xl md:text-4xl">Continuous Timeline Tracer</h2>
        <p className="mt-2 text-sm text-muted">The line physically grows down the page as you scroll, lighting up each milestone.</p>

        <div className="relative mt-12 pl-8 md:pl-16">
          {/* Base Background Track */}
          <div className="absolute left-3 md:left-6 top-3 bottom-3 w-[2px] bg-line/50" />

          {/* Active Scrubbed Orange Tracer */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-3 md:left-6 top-3 w-[2px] bg-accent origin-top"
          />

          {/* Milestone 1 */}
          <div className="relative pb-16">
            <span className="absolute -left-[25px] md:-left-[45px] top-1.5 h-3 w-3 rounded-full border border-accent bg-bg" />
            <span className="label text-accent">Step 01 // 2024 - Present</span>
            <h3 className="font-display mt-1 text-2xl">Juspay Technologies</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Senior Product Solutions Engineer. Leading enterprise integration programs and building AI-driven incident resolution agents.
            </p>
          </div>

          {/* Milestone 2 */}
          <div className="relative pb-16">
            <span className="absolute -left-[25px] md:-left-[45px] top-1.5 h-3 w-3 rounded-full border border-line bg-bg" />
            <span className="label text-muted">Step 02 // 2022 - 2024</span>
            <h3 className="font-display mt-1 text-2xl">PhonePe Technologies</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Technical Solutions Specialist. Enterprise relationship ownership for B2B payment gateway accounts.
            </p>
          </div>

          {/* Milestone 3 */}
          <div className="relative">
            <span className="absolute -left-[25px] md:-left-[45px] top-1.5 h-3 w-3 rounded-full border border-line bg-bg" />
            <span className="label text-muted">Step 03 // 2020 - 2022</span>
            <h3 className="font-display mt-1 text-2xl">Razorpay Technologies</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Technical Solutions Engineer. High-complexity product lines SME (Optimizer, Subscriptions, Links).
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* DEMO 4: Viewport Scale & Stagger Deck */}
      {/* ========================================================== */}
      <section className="mx-auto mt-36 max-w-5xl px-5 md:px-8">
        <span className="label text-accent">Experiment 04 // Card Showcase</span>
        <h2 className="font-display mt-2 text-3xl md:text-4xl">Scale-Up Stagger Deck</h2>
        <p className="mt-2 text-sm text-muted">Cards scale from 0.94 → 1.00 smoothly as they hit the optimal viewing zone.</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { num: "01", title: "Credit Interceptor", tag: "AI Automation" },
            { num: "02", title: "Onboarding Buddy", tag: "Python Tooling" },
            { num: "03", title: "Webhook Replay", tag: "Reliability" },
          ].map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex min-h-[220px] flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition hover:border-accent"
            >
              <div className="flex justify-between">
                <span className="label">{card.num}</span>
                <span className="label text-accent">{card.tag}</span>
              </div>
              <div>
                <h3 className="font-display text-2xl">{card.title}</h3>
                <span className="mt-2 inline-block text-xs text-accent">Interactive scrub →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="mx-auto mt-32 max-w-5xl border-t border-line px-5 pt-8 text-center md:px-8">
        <p className="text-sm text-muted">
          Ready to review? Tell me which animations you want to activate on the main website!
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-fg px-6 text-sm font-medium text-bg hover:bg-accent"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
