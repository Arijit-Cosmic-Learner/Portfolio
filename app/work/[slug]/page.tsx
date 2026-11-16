import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = (await getProjects()).find((x) => x.slug === slug);
  return { title: p ? `${p.title} | Arijit Mitra` : "Work" };
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await getProjects();
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  const Block = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <Reveal className="grid gap-3 border-t border-line py-8 md:grid-cols-[200px_1fr] md:gap-10">
      <h2 className="label pt-1">{label}</h2>
      <div>{children}</div>
    </Reveal>
  );

  return (
    <>
      <PageHeader index={p.kind} title={p.title} intro={p.summary} />
      <div className="mx-auto mt-10 max-w-6xl px-5 md:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {p.status && <span className="label rounded-full border border-accent/60 bg-accent/5 px-3 py-1 !text-accent">{p.status}</span>}
          {p.tags.map((t) => (
            <span
              key={t}
              className="label rounded-full border border-accent/25 bg-accent/5 px-3.5 py-1 text-fg/90 transition hover:border-accent hover:text-accent"
            >
              {t}
            </span>
          ))}
        </div>
        <Block label="The problem"><p className="max-w-2xl text-lg leading-relaxed">{p.problem}</p></Block>
        <Block label="Approach">
          <ul className="max-w-2xl space-y-3 text-lg leading-relaxed">
            {p.approach.map((a) => <li key={a} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{a}</li>)}
          </ul>
        </Block>
        <Block label="Impact">
          <ul className="space-y-3">
            {p.impact.map((a) => <li key={a} className="font-display text-2xl md:text-3xl">{a}</li>)}
          </ul>
          {p.link && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-full bg-fg px-5 text-xs font-medium text-bg transition hover:bg-accent"
              >
                Launch Project ↗
              </a>
              {p.slug === "setu-payment-service" && (
                <>
                  <a
                    href="https://github.com/Arijit-Cosmic-Learner/setu-payment-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center rounded-full border border-line px-4 text-xs font-medium text-fg transition hover:border-accent hover:text-accent"
                  >
                    View Repository ↗
                  </a>
                  <a
                    href="https://setu-payment-service.vercel.app/redoc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center rounded-full border border-line px-4 text-xs font-medium text-fg transition hover:border-accent hover:text-accent"
                  >
                    Developer Guide (ReDoc) ↗
                  </a>
                  <a
                    href="https://github.com/Arijit-Cosmic-Learner/setu-payment-service/blob/main/Postman%20Testing%20Guide%20-%20Setu%20Payment%20Service.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center rounded-full border border-line px-4 text-xs font-medium text-fg transition hover:border-accent hover:text-accent"
                  >
                    Postman Testing Guide (PDF) ↗
                  </a>
                </>
              )}
            </div>
          )}
        </Block>
        <Link href={`/work/${next.slug}`} className="group mt-6 block border-t border-line py-10">
          <span className="label">Next project</span>
          <span className="font-display mt-2 block text-4xl transition group-hover:text-accent md:text-5xl">{next.title} →</span>
        </Link>
      </div>
    </>
  );
}
