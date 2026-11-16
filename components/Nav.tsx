"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sections, profile, resumeUrl } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur">
      <div className="site-container flex h-16 md:h-20 items-center justify-between">
        <Link href="/" className="font-display text-lg">{profile.name}</Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full border border-line transition hover:border-accent hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50 bg-black/40"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-md flex-col border-r border-line bg-bg px-7 pb-8 pt-5"
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="label">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-line hover:border-accent hover:text-accent">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              </div>
              <nav className="mt-8 flex-1 overflow-y-auto" aria-label="Primary">
                <ul>
                  {[{ href: "/", index: "00", title: "Home" }, ...sections].map((s, i) => (
                    <motion.li key={s.href} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.05 }}>
                      <Link href={s.href} className={`group flex items-baseline gap-4 border-b border-line py-4 ${path === s.href || (s.href !== "/" && path.startsWith(s.href)) ? "text-accent" : ""}`}>
                        <span className="label">{s.index}</span>
                        <span className="font-display text-3xl transition group-hover:translate-x-1">{s.title}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">Resume ↗</a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn ↗</a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub ↗</a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
