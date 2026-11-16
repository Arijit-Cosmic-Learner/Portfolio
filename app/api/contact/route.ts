import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name || "").trim().slice(0, 120);
  const email = String(body?.email || "").trim().slice(0, 200);
  const message = String(body?.message || "").trim().slice(0, 4000);
  if (body?.website) return NextResponse.json({ ok: true }); // honeypot
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 5)
    return NextResponse.json({ error: "Please fill in all fields correctly." }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: "Email isn't configured yet. Please reach out via LinkedIn or email." }, { status: 503 });

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL || "mitra.ari99@gmail.com"],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });
  if (!r.ok) return NextResponse.json({ error: "Couldn't send right now. Please try again." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
