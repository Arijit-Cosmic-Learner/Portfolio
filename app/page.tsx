import Link from "next/link";
import { profile, sections, resumeUrl } from "@/lib/data";
import { getFeatured } from "@/lib/content";
import { SectionIcon } from "@/components/Graphics";
import { OrbitGraphic } from "@/components/GraphicVariants";
import { RotatingText } from "@/components/RotatingText";
import { Reveal } from "@/components/Reveal";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await getFeatured();
  return (
    <>
      <section className="site-container grid items-center gap-10 pb-12 pt-12 md:grid-cols-[1.1fr_1fr] md:gap-12 lg:gap-16 xl:gap-24 pb-16 md:pb-24 pt-12 md:pt-20">
        <div>
          <Reveal>
            <p className="label inline-flex items-center gap-2">
              <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
              Currently at Juspay · {profile.location}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-6 whitespace-nowrap text-[clamp(2.4rem,7vw,7.5rem)] leading-[0.98]">
              Arijit Mitra
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="font-display mt-6 text-2xl md:text-3xl lg:text-4xl">
              <RotatingText words={profile.rotating} />
            </p>
            <p className="mt-6 max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed text-muted">{profile.tagline} {profile.bio}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/work" className="inline-flex h-12 lg:h-14 items-center justify-center rounded-full bg-fg px-8 lg:px-10 text-sm lg:text-base font-medium text-bg transition hover:bg-accent">
                View my work
              </Link>
              <Link href="/contact" className="inline-flex h-12 lg:h-14 items-center justify-center rounded-full border border-line px-8 lg:px-10 text-sm lg:text-base font-medium transition hover:border-accent hover:text-accent">
                Get in touch
              </Link>
              <Link href={resumeUrl} className="inline-flex h-12 lg:h-14 items-center justify-center px-4 text-sm lg:text-base font-medium text-muted underline-offset-4 transition hover:text-accent hover:underline">
                Resume →
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="mx-auto w-full max-w-lg md:max-w-none">
          <div className="rounded-3xl border border-accent/40 bg-surface p-6 md:p-8 lg:p-12 transition-colors hover:border-accent">
            <OrbitGraphic className="h-auto w-full" />
          </div>
        </Reveal>
      </section>

      {featured.length > 0 && (
        <section className="site-container pb-20" aria-label="Featured work">
          <div className="flex items-end justify-between border-b border-line pb-4 mb-6">
            <h2 className="font-mono text-xs uppercase tracking-widest font-semibold text-fg/90">
              Featured work
            </h2>
            <Link href="/work" className="font-mono text-xs uppercase tracking-wider font-medium text-accent transition hover:underline">
              View all work ({featured.length}) →
            </Link>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {featured.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={i * 0.08} className="h-full">
                  <Link
                    href={`/work/${p.slug}`}
                    className="group flex h-full min-h-[280px] lg:min-h-[310px] flex-col justify-between rounded-2xl border border-line bg-surface p-6 md:p-7 lg:p-8 transition-all hover:border-accent hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="label text-xs">
                          {String(i + 1).padStart(2, "0")} // {p.kind}
                        </span>
                        {p.status && (
                          <span className="label rounded-full border border-accent/60 bg-accent/10 px-2.5 py-0.5 !text-accent">
                            Building
                          </span>
                        )}
                      </div>
                      <h3 className="font-display mt-5 text-2xl lg:text-3xl line-clamp-2 text-fg transition group-hover:text-accent">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-xs md:text-sm leading-relaxed text-muted line-clamp-3">
                        {p.summary}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-line/60 flex items-center justify-between text-xs">
                      <span className="label text-muted group-hover:text-accent transition">Interactive case</span>
                      <span className="text-accent transition group-hover:translate-x-1 font-medium">Read more →</span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="site-container pb-24" aria-label="Explore">
        <div className="flex items-end justify-between border-b border-line pb-4">
          <h2 className="label">Explore</h2>
          <span className="label hidden sm:inline">Step inside a section</span>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s, i) => (
            <li key={s.href} className="border-b border-line sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0">
              <Reveal delay={i * 0.05}>
                <Link href={s.href} className="group flex h-full min-h-[220px] lg:min-h-[260px] flex-col justify-between bg-surface p-6 transition hover:bg-surface/80 md:p-8 lg:p-10">
                  <div className="flex items-start justify-between">
                    <span className="label">{s.index}</span>
                    <SectionIcon name={s.icon} className="h-10 w-10 lg:h-12 lg:w-12 text-muted transition group-hover:text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl lg:text-4xl">{s.title}</h3>
                    <p className="mt-2 flex items-center justify-between text-muted lg:text-lg">
                      {s.blurb}
                      <span className="ml-4 text-accent opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 max-md:opacity-100">→</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
