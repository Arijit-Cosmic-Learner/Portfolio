import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { getPosts } from "@/lib/writing";

export const metadata = { title: "Writing | Arijit Mitra" };

const fmt = (d: string) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "");

export default function Writing() {
  const posts = getPosts();
  return (
    <>
      <PageHeader index="05" title="Writing" intro="Notes on fintech, programs and building with AI." />
      <section className="mx-auto mt-12 max-w-6xl px-5 md:px-8">
        {posts.length === 0 ? (
          <p className="border-t border-line pt-8 text-lg text-muted">The first articles are on their way.</p>
        ) : (
          <ul className="border-t border-line">
            {posts.map((p, i) => (
              <li key={p.slug} className="border-b border-line">
                <Reveal delay={i * 0.04}>
                  <Link href={`/writing/${p.slug}`} className="group grid gap-2 py-8 md:grid-cols-[160px_1fr_auto] md:gap-8">
                    <span className="label pt-2">{fmt(p.date)}</span>
                    <div>
                      <h2 className="font-display text-3xl transition group-hover:text-accent">{p.title}{p.draft && <span className="label ml-3 align-middle">Draft</span>}</h2>
                      <p className="mt-2 max-w-xl text-muted">{p.summary}</p>
                    </div>
                    <span className="label pt-2">{p.readingTime} min read</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
