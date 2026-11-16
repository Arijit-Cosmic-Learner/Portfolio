import { isAdmin } from "@/lib/auth";
import { getStats } from "@/lib/visits";
import { getFeaturedSlugs, getProjects } from "@/lib/content";
import { ContentEditor } from "@/components/ContentEditor";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Admin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  if (!(await isAdmin())) {
    return (
      <section className="mx-auto max-w-sm px-5 py-24">
        <p className="label">Private</p>
        <form action="/api/admin/login" method="post" className="mt-6 space-y-4">
          <input name="password" type="password" required autoFocus placeholder="Password" className="w-full rounded-lg border border-line bg-surface px-4 py-3.5 outline-none focus:border-accent" />
          <button className="h-12 w-full rounded-full bg-fg text-sm font-medium text-bg hover:bg-accent">Enter</button>
          {error && <p className="text-sm text-accent">Incorrect password.</p>}
        </form>
      </section>
    );
  }

  const s = await getStats();
  const max = Math.max(1, ...s.daily.map((d) => d.views));
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 md:px-8">
      <div className="flex items-center justify-between">
        <p className="label">Visitor stats · private</p>
        <form action="/api/admin/logout" method="post"><button className="label hover:text-accent">Sign out</button></form>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="rounded-xl border border-line bg-surface p-6"><p className="label">Total views</p><p className="font-display mt-2 text-5xl">{s.total}</p></div>
        <div className="rounded-xl border border-line bg-surface p-6"><p className="label">Unique visitors</p><p className="font-display mt-2 text-5xl">{s.unique}</p></div>
      </div>
      <h2 className="label mt-12">Last 14 days</h2>
      <div className="mt-4 flex h-40 items-end gap-1.5">
        {s.daily.map((d) => (
          <div key={d.date} className="group flex flex-1 flex-col items-center justify-end" title={`${d.date}: ${d.views}`}>
            <div className="w-full rounded-t bg-accent/80" style={{ height: `${(d.views / max) * 100}%`, minHeight: 2 }} />
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">Your own visits are excluded while you're signed in on this browser.</p>
      <ContentEditor initial={await getProjects()} featured={await getFeaturedSlugs()} />
    </section>
  );
}
