"use client";
import { useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setState("done");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  const field = "w-full rounded-lg border border-line bg-surface px-4 py-3.5 text-base outline-none transition placeholder:text-muted/70 focus:border-accent";
  if (state === "done")
    return <p className="font-display rounded-lg border border-line bg-surface p-8 text-2xl">Thanks. Your message is on its way, and I'll get back to you soon.</p>;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="name" required placeholder="Your name" autoComplete="name" className={field} />
      <input name="email" type="email" required placeholder="Your email" autoComplete="email" inputMode="email" className={field} />
      <textarea name="message" required rows={6} placeholder="What would you like to talk about?" className={field} />
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button disabled={state === "sending"} className="h-12 w-full rounded-full bg-fg px-8 text-sm font-medium text-bg transition hover:bg-accent disabled:opacity-60 md:w-auto">
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
      {state === "error" && <p role="alert" className="text-sm text-accent">{msg}</p>}
    </form>
  );
}
