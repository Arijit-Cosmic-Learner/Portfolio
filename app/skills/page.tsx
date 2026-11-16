import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { skillGroups } from "@/lib/data";

export const metadata = { title: "Skills | Arijit Mitra" };

export default function Skills() {
  return (
    <>
      <PageHeader index="02" title="Skills" intro="A hybrid profile: close to customers, comfortable in code, and used to running programs end to end." />
      <section className="mx-auto mt-12 grid max-w-6xl gap-6 px-5 md:grid-cols-2 md:px-8">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.06} className="rounded-2xl border border-accent/25 bg-surface/40 p-6 md:p-8 transition hover:border-accent">
            <p className="label text-accent">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="font-display mt-2 text-2xl md:text-3xl text-fg">{g.title}</h2>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm text-fg transition hover:border-accent hover:text-accent"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>
    </>
  );
}
