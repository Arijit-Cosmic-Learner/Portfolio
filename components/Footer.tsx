import Link from "next/link";
import { profile } from "@/lib/data";
import { LastUpdated } from "./LastUpdated";

export function Footer() {
  return (
    <footer className="mt-28 border-t border-line/70 bg-bg/85 backdrop-blur">
      <div className="site-container flex h-20 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-lg text-fg hover:text-accent">{profile.name}</Link>
          <span className="hidden text-muted md:inline">·</span>
          <p className="label hidden md:inline"><LastUpdated /></p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition hover:text-accent">LinkedIn ↗</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition hover:text-accent">GitHub ↗</a>
          <a href={`mailto:${profile.email}`} className="transition hover:text-accent">Email ↗</a>
        </div>
      </div>
    </footer>
  );
}
