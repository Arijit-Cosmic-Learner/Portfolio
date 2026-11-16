import { getMany, incrMany } from "./store";

const day = (d: Date) => d.toISOString().slice(0, 10);

export async function recordVisit(isNewVisitor: boolean) {
  const keys = ["views:total", `views:${day(new Date())}`];
  if (isNewVisitor) keys.push("visitors:unique");
  await incrMany(keys);
}

export async function getStats() {
  const days: string[] = [];
  for (let i = 13; i >= 0; i--) days.push(day(new Date(Date.now() - i * 864e5)));
  const res = await getMany(["views:total", "visitors:unique", ...days.map((d) => `views:${d}`)]);
  return {
    total: Number(res[0] ?? 0),
    unique: Number(res[1] ?? 0),
    daily: days.map((d, i) => ({ date: d, views: Number(res[i + 2] ?? 0) })),
  };
}
