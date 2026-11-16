import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getPosts, renderMarkdown } from "@/lib/writing";
import { PageHeader } from "@/components/PageHeader";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  return { title: p ? `${p.title} | Arijit Mitra` : "Writing", description: p?.summary };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const date = p.date ? new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
  return (
    <>
      <PageHeader index={`${date} · ${p.readingTime} min read`} title={p.title} />
      <article className="prose-pf mx-auto mt-12 max-w-2xl px-5 md:px-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.body) }} />
      <div className="mx-auto mt-16 max-w-2xl px-5 md:px-8">
        <Link href="/writing" className="label hover:text-accent">← All writing</Link>
      </div>
    </>
  );
}
