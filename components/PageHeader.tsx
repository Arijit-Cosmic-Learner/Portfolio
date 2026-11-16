import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { Squiggle } from "./Graphics";

export function PageHeader({ index, title, intro, back = true }: { index: string; title: string; intro?: ReactNode; back?: boolean }) {
  return (
    <section className="site-container pt-14 md:pt-24">
      {back && <Link href="/" className="label hover:text-accent">← Home</Link>}
      <Reveal className="mt-8">
        <p className="label">{index}</p>
        <h1 className="font-display mt-3 text-5xl 2xl:text-7xl 3xl:text-8xl leading-[1.05] md:text-7xl">{title}</h1>
        <Squiggle className="mt-5 w-28 2xl:w-36" />
        {intro && <p className="mt-6 max-w-2xl 2xl:max-w-4xl text-lg 2xl:text-xl leading-relaxed text-muted">{intro}</p>}
      </Reveal>
    </section>
  );
}
