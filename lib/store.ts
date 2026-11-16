// Tiny key-value store.
// Production: Upstash Redis (REST). Local dev: a JSON file in .data/. Fallback: memory.
import fs from "fs";
import path from "path";

const URL_ = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const useRedis = !!(URL_ && TOKEN);

const FILE = path.join(process.cwd(), ".data", "store.json");
const g = globalThis as unknown as { __kv?: Record<string, string> };

function load(): Record<string, string> {
  if (g.__kv) return g.__kv;
  try { g.__kv = JSON.parse(fs.readFileSync(FILE, "utf8")); } catch { g.__kv = {}; }
  return g.__kv!;
}
function persist() {
  try {
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(g.__kv));
  } catch { /* read-only filesystem: stay in memory */ }
}

async function redis(cmds: (string | number)[][]): Promise<unknown[]> {
  const res = await fetch(`${URL_}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
    cache: "no-store",
  });
  return ((await res.json()) as { result: unknown }[]).map((r) => r.result);
}

export async function getMany(keys: string[]): Promise<(string | null)[]> {
  if (useRedis) return (await redis(keys.map((k) => ["GET", k]))) as (string | null)[];
  const kv = load();
  return keys.map((k) => kv[k] ?? null);
}

export async function set(key: string, value: string) {
  if (useRedis) { await redis([["SET", key, value]]); return; }
  load()[key] = value;
  persist();
}

export async function incrMany(keys: string[]) {
  if (useRedis) { await redis(keys.map((k) => ["INCR", k])); return; }
  const kv = load();
  for (const k of keys) kv[k] = String(Number(kv[k] ?? 0) + 1);
  persist();
}

export async function getJSON<T>(key: string): Promise<T | null> {
  const [v] = await getMany([key]);
  if (!v) return null;
  try { return JSON.parse(v) as T; } catch { return null; }
}
export const setJSON = (key: string, value: unknown) => set(key, JSON.stringify(value));
