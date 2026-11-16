import { PageHeader } from "@/components/PageHeader";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";

export const metadata = { title: "Resume | Arijit Mitra" };

export default function ResumePage() {
  return (
    <>
      <div className="print:hidden">
        <PageHeader
          index="Curriculum Vitae"
          title="Resume"
          intro="Solutions Engineering and Program Management professional with 6+ years across Juspay, PhonePe, and Razorpay's fintech platforms."
        />
      </div>

      <div className="mx-auto max-w-5xl px-5 pt-8 pb-24 md:px-8">
        {/* Top Floating Control Bar */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6 print:hidden">
          <div className="flex items-center gap-3">
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
            <span className="label">Bengaluru, India · Open to conversations</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-line px-5 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              ← Back
            </Link>
            <ResumeDownloadButton />
          </div>
        </div>

        {/* Web Presentation Container: inherits full portfolio aesthetic on web, clean crisp document in print */}
        <div className="resume-sheet space-y-16 print:space-y-6 print:text-black">
          
          {/* Header Card / Info Grid */}
          <Reveal>
            <div className="grid gap-6 border-b border-line pb-12 md:grid-cols-[1.5fr_1fr] print:border-b-2 print:border-black print:pb-4">
              <div>
                <h1 className="font-display text-4xl font-bold tracking-tight text-fg md:text-5xl print:text-3xl print:text-black">
                  Arijit Mitra
                </h1>
                <p className="font-display mt-2 text-xl text-accent print:text-base print:text-black">
                  Solutions Engineering &amp; Program Management | Fintech &amp; Credit Platforms
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted print:text-xs print:text-black">
                  Experience spans customer success, technical account management, pre-sales solutioning, program management, and AI-assisted software development — shipping production fixes and reading/debugging code alongside engineering teams to close the gap between customers, product, and business.
                </p>
              </div>

              <div className="flex flex-col justify-between space-y-3 rounded-2xl border border-line bg-surface/50 p-6 md:p-8 print:border-none print:p-0">
                <div className="space-y-2 text-sm print:text-xs">
                  <div className="flex justify-between border-b border-line/60 pb-1.5 print:border-none">
                    <span className="label">Location</span>
                    <span className="font-medium text-fg print:text-black">Bengaluru, India</span>
                  </div>
                  <div className="flex justify-between border-b border-line/60 pb-1.5 print:border-none">
                    <span className="label">Phone</span>
                    <span className="font-medium text-fg print:text-black">+91-8667056076</span>
                  </div>
                  <div className="flex justify-between border-b border-line/60 pb-1.5 print:border-none">
                    <span className="label">Email</span>
                    <a href="mailto:mitra.ari99@gmail.com" className="font-medium text-accent hover:underline print:text-black">
                      mitra.ari99@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 text-xs">
                  <a href="https://www.linkedin.com/in/arijit-mitra-59b346197/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-3 py-1 text-muted transition hover:border-accent hover:text-accent print:text-black">
                    LinkedIn ↗
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-3 py-1 text-muted transition hover:border-accent hover:text-accent print:text-black">
                    GitHub ↗
                  </a>
                  <a href="https://niveshak.in" target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-3 py-1 text-muted transition hover:border-accent hover:text-accent print:text-black">
                    Niveshak.in ↗
                  </a>
                  <span className="rounded-full border border-line px-3 py-1 text-muted print:text-black">
                    Tarmac
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Core Competencies */}
          <Reveal>
            <div className="grid gap-6 border-b border-line pb-12 md:grid-cols-[200px_1fr] print:border-none print:pb-4">
              <div>
                <span className="label">01 // Competencies</span>
                <h2 className="font-display mt-1 text-2xl text-fg print:text-lg print:text-black">Core Capabilities</h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Customer Success & TAM",
                  "Program & Product Management",
                  "Solutions Consulting & Pre-Sales",
                  "Software Development (Python, AI-assisted)",
                  "Code Reading & Debugging",
                  "Payment & Credit Platform APIs",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-line bg-surface/70 px-4 py-2 text-sm font-medium text-fg transition hover:border-accent hover:text-accent print:border-gray-300 print:bg-white print:text-xs print:text-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Experience */}
          <Reveal>
            <div className="grid gap-8 border-b border-line pb-14 md:grid-cols-[200px_1fr] print:border-none print:pb-4">
              <div>
                <span className="label">02 // Timeline</span>
                <h2 className="font-display mt-1 text-2xl text-fg print:text-lg print:text-black">Experience</h2>
              </div>

              <div className="space-y-12 print:space-y-4">
                {/* Juspay */}
                <div className="relative border-l border-line pl-6 md:pl-8 print:border-l-2 print:border-black">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-accent print:bg-black" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl text-fg print:text-base print:font-bold print:text-black">
                      Senior Product Solutions Engineer
                    </h3>
                    <span className="label text-accent print:text-xs print:text-black">Jul 2024 – Present</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-muted print:text-xs print:text-black">
                    Juspay Technologies · <span className="italic">HyperCredit</span>
                  </p>
                  <p className="mt-1 text-xs italic text-accent/90 print:text-xs print:text-black">
                    Promoted from Product Solutions Engineer, Feb 2026
                  </p>

                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted md:text-[15px] print:mt-2 print:space-y-1 print:text-xs print:text-black">
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80 print:bg-black" />
                      <span><strong className="text-fg print:text-black">Customer Success &amp; TAM:</strong> Primary technical POC and escalation point for enterprise merchants (Starhealth, ICICI Lombard, Flipkart, Manipal Group, EarlySalary, Aditya Birla Health, LPU) — owning ticket resolution, integration lifecycle, and post-go-live support on HyperCredit&apos;s loan marketplace and orchestration system.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80 print:bg-black" />
                      <span><strong className="text-fg print:text-black">Program Management &amp; Solutions Consulting:</strong> Lead end-to-end integration programs for high-enterprise accounts (Manipal Group, Starhealth, EarlySalary, Finsall, TechFino), managing stakeholders, JIRA-based SDLCs, and Go-Live; support Business teams in pre-sales with custom technical solutions for edge-case scenarios outside standard infrastructure.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80 print:bg-black" />
                      <span><strong className="text-fg print:text-black">Software Development &amp; Code Reading:</strong> Ship and debug production micro-features in Python using AI-assisted tooling (Claude, GPT, Kimi, OpenCode via VS Code &amp; CLI) — fixed a critical offers-generation bug (0→100% success rate), traced and resolved a webhook/DB spike from an unhandled ENUM, and built Onboarding Buddy, cutting onboarding from 2 hours/multi-layer approvals to 15 minutes with zero approvals.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80 print:bg-black" />
                      <span><strong className="text-fg print:text-black">AI Automation &amp; Product Management:</strong> Built “Credit Interceptor,” an AI agent (Xyne Workflows) automating first response, log retrieval, and RCA with auto-drafted replies — cutting first-response time to under 2 minutes and debugging time by 50%; support Product Managers with analytics, systems understanding, and config maintenance.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80 print:bg-black" />
                      <span><strong className="text-fg print:text-black">Currently Building:</strong> Webhook Replay, to resend lender webhooks from Redis within 24 hours of arrival and remove Juspay&apos;s dependency on lenders for replay; and a merchant-facing Loan Hard Sync dashboard feature to reconcile incomplete loan statuses — projected to eliminate the 20–30% of daily ticket volume currently driven by status-check requests.</span>
                    </li>
                  </ul>
                </div>

                {/* PhonePe */}
                <div className="relative border-l border-line pl-6 md:pl-8 print:border-l-2 print:border-black">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-line print:bg-black" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl text-fg print:text-base print:font-bold print:text-black">
                      Technical Solutions Specialist
                    </h3>
                    <span className="label text-muted print:text-xs print:text-black">Oct 2022 – Jul 2024</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-muted print:text-xs print:text-black">
                    PhonePe Technologies · <span className="italic">PhonePe PG</span>
                  </p>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted md:text-[15px] print:mt-1 print:space-y-1 print:text-xs print:text-black">
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted print:bg-black" />
                      <span><strong className="text-fg print:text-black">Customer Success &amp; TAM:</strong> Owned the technical relationship for enterprise merchants on PhonePe&apos;s B2B Payment Gateway, from integration design through L1/L2 post-go-live support, order/transaction reporting, and success-rate monitoring.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted print:bg-black" />
                      <span><strong className="text-fg print:text-black">Solutions Consulting:</strong> Partnered with Product and Business Development on pre-sales engagements — delivering technical demos and solution assessments for prospective enterprise clients.</span>
                    </li>
                  </ul>
                </div>

                {/* Razorpay */}
                <div className="relative border-l border-line pl-6 md:pl-8 print:border-l-2 print:border-black">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-line print:bg-black" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl text-fg print:text-base print:font-bold print:text-black">
                      Technical Solutions Engineer
                    </h3>
                    <span className="label text-muted print:text-xs print:text-black">Nov 2020 – Oct 2022</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-muted print:text-xs print:text-black">
                    Razorpay Technologies · <span className="italic">Razorpay PG</span>
                  </p>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted md:text-[15px] print:mt-1 print:space-y-1 print:text-xs print:text-black">
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted print:bg-black" />
                      <span><strong className="text-fg print:text-black">Solutions Engineering:</strong> SME for Razorpay&apos;s highest-complexity product lines (Optimizer, Payment Links, E-Mandates, Subscriptions); maintained FRT, ART, CSAT, DSAT, and ARST above benchmark.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted print:bg-black" />
                      <span><strong className="text-fg print:text-black">Customer Success:</strong> Resolved high-volume tickets via FreshDesk with a root-cause-analysis focus to reduce recurring issues.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Education & Certifications */}
          <Reveal>
            <div className="grid gap-8 border-b border-line pb-14 md:grid-cols-[200px_1fr] print:border-none print:pb-4">
              <div>
                <span className="label">03 // Academics</span>
                <h2 className="font-display mt-1 text-2xl text-fg print:text-lg print:text-black">Education &amp; Credentials</h2>
              </div>

              <div className="grid gap-8 md:grid-cols-2 print:grid-cols-1 print:gap-4">
                <div className="space-y-6">
                  <h3 className="label text-accent print:text-xs print:text-black">Degrees</h3>
                  <div className="space-y-4">
                    <div className="rounded-xl border border-line bg-surface/50 p-4 print:border-none print:p-0">
                      <p className="font-display text-lg text-fg print:text-sm print:font-bold print:text-black">MBA, Marketing &amp; Product Management</p>
                      <p className="mt-1 text-xs text-muted print:text-black">Manipal Academy of Higher Education</p>
                      <p className="label mt-2 text-accent print:text-xs print:text-black">2025 – Present · GPA 9.5/10</p>
                    </div>
                    <div className="rounded-xl border border-line bg-surface/50 p-4 print:border-none print:p-0">
                      <p className="font-display text-lg text-fg print:text-sm print:font-bold print:text-black">B.Tech, Electronics &amp; Communication</p>
                      <p className="mt-1 text-xs text-muted print:text-black">SRM University</p>
                      <p className="label mt-2 text-muted print:text-xs print:text-black">2016 – 2020</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="label text-accent print:text-xs print:text-black">Certifications &amp; Languages</h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Google PM Fellowship",
                        "Google UX Design",
                        "Python & Full Stack (App Brewery)",
                        "MERN Stack (GfG)",
                        "Google Digital Marketing",
                      ].map((cert) => (
                        <span key={cert} className="rounded-full border border-line px-3 py-1.5 text-xs text-fg print:text-black">
                          {cert}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 text-xs text-muted print:text-black">
                      <span className="label block mb-1">Languages</span>
                      English, Hindi, Bengali
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Personal Projects */}
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[200px_1fr]">
              <div>
                <span className="label">04 // Ventures</span>
                <h2 className="font-display mt-1 text-2xl text-fg print:text-lg print:text-black">Personal Projects</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 print:grid-cols-1 print:gap-2">
                <div className="rounded-2xl border border-line bg-surface/50 p-5 transition hover:border-accent print:border-none print:p-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl text-fg print:text-sm print:font-bold print:text-black">Setu Payment Lifecycle &amp; Recon</h3>
                    <a href="https://setu-payment-service.vercel.app" target="_blank" rel="noopener noreferrer" className="label text-accent print:hidden">Live ↗</a>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted print:text-black">
                    Idempotent event-sourcing ledger, derived transaction state machine, and SQL-driven discrepancy detection engine built with Python (FastAPI) and Supabase Postgres.
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-surface/50 p-5 transition hover:border-accent print:border-none print:p-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl text-fg print:text-sm print:font-bold print:text-black">Niveshak</h3>
                    <a href="https://niveshak.in" target="_blank" rel="noopener noreferrer" className="label text-accent print:hidden">Live ↗</a>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted print:text-black">
                    Goal-based investing &amp; financial literacy platform for new Indian investors.
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-surface/50 p-5 transition hover:border-accent print:border-none print:p-0">
                  <h3 className="font-display text-xl text-fg print:text-sm print:font-bold print:text-black">Tarmac</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted print:text-black">
                    Interview-prep platform tailored for non-CSE engineering graduates entering tech roles.
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-surface/50 p-5 transition hover:border-accent print:border-none print:p-0">
                  <h3 className="font-display text-xl text-fg print:text-sm print:font-bold print:text-black">BookMyChair</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted print:text-black">
                    Direct online appointment booking and queue management platform for men&apos;s salons.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center border-t border-line pt-8 print:hidden">
          <ResumeDownloadButton />
        </div>
      </div>
    </>
  );
}
