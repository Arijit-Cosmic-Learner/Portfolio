import { profile } from "@/lib/data";

type Day = { date: string; count: number };

async function fetchCalendar(): Promise<{ total: number; weeks: Day[][] } | null> {
  const user = process.env.GITHUB_USERNAME || "Arijit-Cosmic-Learner";
  const token = process.env.GITHUB_TOKEN;
  if (!user || !token) return null;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query($u:String!){user(login:$u){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{contributionCount date}}}}}}`,
        variables: { u: user },
      }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const cal = (await res.json())?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;
    return {
      total: cal.totalContributions,
      weeks: cal.weeks.map((w: { contributionDays: { contributionCount: number; date: string }[] }) =>
        w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
      ),
    };
  } catch {
    return null;
  }
}

const levels = [0, 0.25, 0.5, 0.75, 1];

export async function GithubHeatmap() {
  const cal = await fetchCalendar();
  if (!cal) {
    return (
      <p className="mt-6 max-w-xl text-muted">
        The live contribution graph will appear here once a GitHub username and token are configured.
      </p>
    );
  }
  const max = Math.max(1, ...cal.weeks.flat().map((d) => d.count));
  const level = (c: number) => (c === 0 ? 0 : Math.min(4, Math.ceil((c / max) * 4)));
  return (
    <div className="mt-8">
      <div className="overflow-x-auto pb-2">
        <div className="flex w-max gap-[3px]" role="img" aria-label={`${cal.total} contributions in the last year`}>
          {cal.weeks.map((w, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {w.map((d) => (
                <span
                  key={d.date}
                  title={`${d.count} on ${d.date}`}
                  className="h-[11px] w-[11px] rounded-[2px] bg-line"
                  style={level(d.count) ? { background: "var(--accent)", opacity: levels[level(d.count)] * 0.85 + 0.15 } : undefined}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="label mt-3 flex flex-wrap items-center gap-x-4">
        <span>{cal.total} contributions in the last year</span>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">@{process.env.GITHUB_USERNAME || "Arijit-Cosmic-Learner"} ↗</a>
      </p>
    </div>
  );
}
