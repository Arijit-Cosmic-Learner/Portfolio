"use client";
import { useState } from "react";
import type { Project } from "@/lib/data";

type Draft = Omit<Project, "status" | "link"> & { status: boolean; link: string };

const toDraft = (p: Project): Draft => ({ ...p, status: !!p.status, link: p.link || "" });
const blank = (): Draft => ({ slug: "", title: "", kind: "Personal", status: false, summary: "", problem: "", approach: [], impact: [], tags: [], link: "" });
const lines = (a: string[]) => a.join("\n");
const split = (s: string) => s.split("\n");

export function ContentEditor({ initial, featured: initialFeatured }: { initial: Project[]; featured: string[] }) {
  const [items, setItems] = useState<Draft[]>(initial.map(toDraft));
  const [featured, setFeatured] = useState<string[]>(initialFeatured);
  const [open, setOpen] = useState<number | null>(null);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [err, setErr] = useState("");

  const update = (i: number, patch: Partial<Draft>) => setItems((a) => a.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const slugOf = (d: Draft) => d.slug || d.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  function toggleFeatured(slug: string) {
    setFeatured((f) => (f.includes(slug) ? f.filter((x) => x !== slug) : f.length >= 3 ? f : [...f, slug]));
  }
  function moveFeatured(slug: string, dir: -1 | 1) {
    setFeatured((f) => {
      const i = f.indexOf(slug), j = i + dir;
      if (i < 0 || j < 0 || j >= f.length) return f;
      const c = [...f]; [c[i], c[j]] = [c[j], c[i]]; return c;
    });
  }
  function move(i: number, dir: -1 | 1) {
    setItems((a) => {
      const j = i + dir; if (j < 0 || j >= a.length) return a;
      const c = [...a]; [c[i], c[j]] = [c[j], c[i]]; return c;
    });
    setOpen(null);
  }

  async function save() {
    setState("saving");
    const projects = items.map((d) => ({
      ...d, slug: slugOf(d), approach: d.approach.filter(Boolean), impact: d.impact.filter(Boolean),
      status: d.status ? "Currently building" : undefined, link: d.link || undefined,
    }));
    const slugs = new Set(projects.map((p) => p.slug));
    try {
      const r = await fetch("/api/admin/content", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects, featured: featured.filter((f) => slugs.has(f)) }),
      });
      if (!r.ok) throw new Error((await r.json()).error || "Save failed");
      setState("saved");
      setTimeout(() => setState("idle"), 2500);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
      setState("error");
    }
  }

  const input = "w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-accent";
  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <label className="block"><span className="label mb-1 block">{label}</span>{children}</label>
  );

  return (
    <div className="mt-14 border-t border-line pt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-3xl">Projects &amp; featured</h2>
        <button onClick={save} disabled={state === "saving"} className="h-11 rounded-full bg-fg px-6 text-sm font-medium text-bg hover:bg-accent disabled:opacity-60">
          {state === "saving" ? "Saving…" : state === "saved" ? "Saved ✓" : "Save changes"}
        </button>
      </div>
      {state === "error" && <p className="mt-3 text-sm text-accent">{err}</p>}

      <p className="label mt-8">Featured on the home page ({featured.length}/3), shown in this order</p>
      <ol className="mt-3 space-y-2">
        {featured.map((s, i) => (
          <li key={s} className="flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-2.5">
            <span>{i + 1}. {items.find((x) => slugOf(x) === s)?.title || s}</span>
            <span className="flex gap-2 text-sm">
              <button onClick={() => moveFeatured(s, -1)} className="px-2 hover:text-accent" aria-label="Move up">↑</button>
              <button onClick={() => moveFeatured(s, 1)} className="px-2 hover:text-accent" aria-label="Move down">↓</button>
              <button onClick={() => toggleFeatured(s)} className="px-2 text-accent">Remove</button>
            </span>
          </li>
        ))}
        {featured.length === 0 && <li className="text-sm text-muted">None selected. Pick up to three below.</li>}
      </ol>

      <p className="label mt-10">All projects</p>
      <ul className="mt-3 space-y-3">
        {items.map((d, i) => {
          const slug = slugOf(d);
          const isF = featured.includes(slug);
          return (
            <li key={i} className="rounded-xl border border-line bg-surface">
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <button onClick={() => setOpen(open === i ? null : i)} className="text-left font-display text-xl">{d.title || "Untitled"} <span className="label ml-2">{open === i ? "Close" : "Edit"}</span></button>
                <span className="flex items-center gap-1 text-sm">
                  <button onClick={() => move(i, -1)} className="px-2 hover:text-accent" aria-label="Move up">↑</button>
                  <button onClick={() => move(i, 1)} className="px-2 hover:text-accent" aria-label="Move down">↓</button>
                  <button
                    onClick={() => slug && toggleFeatured(slug)}
                    disabled={!isF && featured.length >= 3}
                    className={`ml-2 rounded-full border px-3 py-1 ${isF ? "border-accent text-accent" : "border-line disabled:opacity-40"}`}
                  >{isF ? "★ Featured" : "☆ Feature"}</button>
                  <button
                    onClick={() => { if (confirm(`Delete "${d.title}"?`)) { setItems((a) => a.filter((_, j) => j !== i)); setFeatured((f) => f.filter((x) => x !== slug)); setOpen(null); } }}
                    className="ml-2 px-2 text-muted hover:text-accent"
                  >Delete</button>
                </span>
              </div>
              {open === i && (
                <div className="grid gap-4 border-t border-line p-4 md:grid-cols-2">
                  <Field label="Title"><input className={input} value={d.title} onChange={(e) => update(i, { title: e.target.value })} /></Field>
                  <Field label="Slug (URL)"><input className={input} value={d.slug} placeholder={slug} onChange={(e) => update(i, { slug: e.target.value })} /></Field>
                  <Field label="Category"><input className={input} value={d.kind} onChange={(e) => update(i, { kind: e.target.value })} /></Field>
                  <Field label="Link (optional)"><input className={input} value={d.link} placeholder="https://" onChange={(e) => update(i, { link: e.target.value })} /></Field>
                  <div className="md:col-span-2"><Field label="One-line summary"><input className={input} value={d.summary} onChange={(e) => update(i, { summary: e.target.value })} /></Field></div>
                  <div className="md:col-span-2"><Field label="The problem"><textarea rows={3} className={input} value={d.problem} onChange={(e) => update(i, { problem: e.target.value })} /></Field></div>
                  <Field label="Approach (one point per line)"><textarea rows={5} className={input} value={lines(d.approach)} onChange={(e) => update(i, { approach: split(e.target.value) })} /></Field>
                  <Field label="Impact (one per line)"><textarea rows={5} className={input} value={lines(d.impact)} onChange={(e) => update(i, { impact: split(e.target.value) })} /></Field>
                  <Field label="Tags (comma separated)"><input className={input} value={d.tags.join(", ")} onChange={(e) => update(i, { tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} /></Field>
                  <label className="flex items-center gap-3 pt-6 text-sm"><input type="checkbox" checked={d.status} onChange={(e) => update(i, { status: e.target.checked })} /> Mark as &ldquo;Currently building&rdquo;</label>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <button onClick={() => { setItems((a) => [...a, blank()]); setOpen(items.length); }} className="mt-5 h-11 rounded-full border border-line px-6 text-sm hover:border-accent hover:text-accent">+ Add project</button>
      <p className="mt-6 text-sm text-muted">Saving also updates the “Last updated” date in the footer.</p>
    </div>
  );
}
