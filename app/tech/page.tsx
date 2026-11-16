import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { GithubHeatmap } from "@/components/GithubHeatmap";
import { profile, stack } from "@/lib/data";

export const metadata = { title: "Tech | Arijit Mitra" };
export const revalidate = 3600;

type Repo = { name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; fork: boolean };

async function getRepos(): Promise<Repo[]> {
  const u = process.env.GITHUB_USERNAME || "Arijit-Cosmic-Learner";
  if (!u) return [];
  try {
    const r = await fetch(`https://api.github.com/users/${u}/repos?sort=updated&per_page=30`, {
      headers: process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : undefined,
      next: { revalidate: 3600 },
    });
    if (!r.ok) return [];
    const all = (await r.json()) as Repo[];
    return all.filter((x) => !x.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
  } catch {
    return [];
  }
}

export default async function Tech() {
  const repos = await getRepos();
  return (
    <>
      <PageHeader index="04" title="Tech" intro="The tools I reach for, and the code I keep in the open." />
      <section className="mx-auto mt-12 max-w-6xl px-5 md:px-8">
        <div className="grid gap-px md:grid-cols-3">
          {Object.entries(stack).map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.06} className="border-t border-line py-8 md:pr-8">
              <h2 className="label">{k}</h2>
              <ul className="mt-5 space-y-2 font-display text-2xl">
                {v.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 border-t border-line pt-10">
          <h2 className="font-display text-4xl">Commit activity</h2>
          <GithubHeatmap />
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-4xl">On GitHub</h2>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">Profile ↗</a>
          </div>
          {repos.length ? (
            <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {repos.map((r) => (
                <li key={r.name}>
                  <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="block h-full rounded-xl border border-line bg-surface p-6 transition hover:border-accent">
                    <h3 className="font-display text-2xl">{r.name}</h3>
                    <p className="mt-2 min-h-[3rem] text-sm text-muted">{r.description || "No description yet."}</p>
                    <p className="label mt-5 flex items-center gap-4">
                      {r.language && <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" />{r.language}</span>}
                      <span>★ {r.stargazers_count}</span>
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 max-w-xl text-muted">Repositories will appear here automatically once a GitHub username is configured.</p>
          )}
        </div>
      </section>
    </>
  );
}
