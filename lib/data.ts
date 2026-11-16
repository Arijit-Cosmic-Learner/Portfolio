export const profile = {
  name: "Arijit Mitra",
  title: "Senior Product Solutions Engineer",
  company: "Juspay Technologies",
  location: "Bengaluru, India",
  email: "mitra.ari99@gmail.com",
  linkedin: "https://www.linkedin.com/in/arijit-mitra-59b346197/",
  github: process.env.GITHUB_USERNAME ? `https://github.com/${process.env.GITHUB_USERNAME}` : "https://github.com/Arijit-Cosmic-Learner",
  tagline: "I close the gap between customers, product and engineering.",
  bio: "Six years across Razorpay, PhonePe and Juspay, working where fintech platforms meet the people who use them. I started in customer success, and now I ship production fixes, run integration programs and build AI automations alongside engineering teams.",
  rotating: ["I ship fixes.", "I run programs.", "I build AI agents.", "I write code."],
};

export const resumeUrl = "/resume";

export const sections = [
  { href: "/work", index: "01", title: "Work", blurb: "Things I've built, fixed and am building.", icon: "work" },
  { href: "/skills", index: "02", title: "Skills", blurb: "Across product, program and engineering.", icon: "skills" },
  { href: "/experience", index: "03", title: "Experience", blurb: "Razorpay, PhonePe, Juspay and beyond.", icon: "experience" },
  { href: "/tech", index: "04", title: "Tech", blurb: "Stack, tooling and open code.", icon: "tech" },
  { href: "/writing", index: "05", title: "Writing", blurb: "Notes on fintech, programs and building.", icon: "writing" },
  { href: "/contact", index: "06", title: "Contact", blurb: "Say hello, start a conversation.", icon: "contact" },
] as const;

export type Project = {
  slug: string;
  title: string;
  kind: string;
  status?: "Currently building";
  summary: string;
  problem: string;
  approach: string[];
  impact: string[];
  tags: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "setu-payment-service",
    title: "Setu Payment Service",
    kind: "Fintech Systems",
    summary: "Production-minded payment lifecycle event ingestion, immutable ledger state machine, and SQL reconciliation engine.",
    problem: "Asynchronous webhook hops, network retry storms risking catastrophic double-credits, fragmented multi-day transaction states, and financial reconciliation discrepancies between gateway payments and actual settlements.",
    approach: [
      "Engineered an event-driven immutable ledger using FastAPI and Supabase (PostgreSQL via SQLAlchemy) deployed serverless on Vercel.",
      "Implemented strict database-enforced idempotency on event_id — safely swallowing network retries with a 200 OK already_processed response to prevent double-credits.",
      "Built a state machine engine dynamically deriving the master transaction state across payment_status, settlement_status, and lifecycle progression.",
      "Pushed analytical calculations directly down to PostgreSQL using optimized GROUP BY and CASE WHEN queries to aggregate merchant settlement rates and transaction volumes in milliseconds.",
      "Developed a dedicated anomaly detection engine classifying real-world financial edge cases: settled_after_failure (potential fraud), processed_not_settled (stuck money), and stale_initiated.",
      "Shipped a branded Developer Experience (DX) portal with ReDoc, interactive Swagger OpenAPI, visual web dashboard, and a 24-point comprehensive Postman test suite.",
    ],
    impact: [
      "Zero double-credits guaranteed via database-level idempotency",
      "Real-time SQL discrepancy detection across 3,800+ transactions & 5 merchants",
      "Complete live developer experience: Base API, ReDoc guide, Swagger & visual dashboard",
    ],
    tags: ["FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "Fintech", "Reconciliation"],
    link: "https://setu-payment-service.vercel.app",
  },
  {
    slug: "credit-interceptor",
    title: "Credit Interceptor",
    kind: "AI & Automation",
    summary: "An AI agent that handles first response, log retrieval and root-cause analysis for support tickets.",
    problem: "Merchant tickets waited on a human for the first reply, and engineers lost time pulling logs and tracing the same classes of failures by hand.",
    approach: [
      "Built an agent on Xyne Workflows that triggers when a ticket arrives.",
      "It retrieves the relevant logs, forms an RCA hypothesis and drafts a reply for review.",
      "Humans stay in the loop: the draft is reviewed before it is sent.",
    ],
    impact: ["First response in under 2 minutes", "Debugging time reduced by about 50%"],
    tags: ["AI agents", "Automation", "RCA", "Xyne"],
  },
  {
    slug: "onboarding-buddy",
    title: "Onboarding Buddy",
    kind: "AI & Automation",
    summary: "A tool that collapsed a multi-layer merchant onboarding flow into a quick self-serve one.",
    problem: "Onboarding a merchant needed multiple layers of approvals and roughly two hours of manual effort each time.",
    approach: [
      "Mapped the approval chain and identified the steps that added no real control.",
      "Wrote the tool in Python using AI-assisted development.",
      "Replaced manual approvals with validated, automated checks.",
    ],
    impact: ["Onboarding from 2 hours to 15 minutes", "Zero approvals required"],
    tags: ["Python", "Automation", "Process design"],
  },
  {
    slug: "webhook-replay",
    title: "Webhook Replay",
    kind: "Program",
    status: "Currently building",
    summary: "Replay lender webhooks from our own store, removing the dependency on lenders.",
    problem: "When a webhook was missed or mishandled, Juspay had to ask the lender to resend it, which was slow and outside our control.",
    approach: [
      "Persist incoming lender webhooks in Redis.",
      "Allow replay of any webhook within 24 hours of arrival.",
      "Remove the lender from the loop for recovery scenarios.",
    ],
    impact: ["In progress. Aims to make recovery self-serve and faster."],
    tags: ["Redis", "Webhooks", "Reliability"],
  },
  {
    slug: "loan-hard-sync",
    title: "Loan Hard Sync",
    kind: "Program",
    status: "Currently building",
    summary: "A merchant-facing dashboard feature to reconcile incomplete loan statuses.",
    problem: "A large share of daily tickets are merchants asking for the current status of a loan.",
    approach: [
      "Let merchants trigger a hard sync of a loan's status from the dashboard.",
      "Reconcile incomplete states without raising a ticket.",
    ],
    impact: ["In progress. Projected to remove 20-30% of daily ticket volume."],
    tags: ["Product", "Dashboard", "Support deflection"],
  },
  {
    slug: "niveshak",
    title: "Niveshak",
    kind: "Personal",
    summary: "Goal-based investing and financial literacy for new Indian investors.",
    problem: "New investors are overwhelmed by products and jargon, and rarely start from their own goals.",
    approach: ["Designed around goals first, instruments second.", "Plain-language education alongside the tools."],
    impact: ["Live at niveshak.in"],
    tags: ["Fintech", "Education", "Full stack"],
    link: "https://niveshak.in",
  },
  {
    slug: "tarmac",
    title: "Tarmac",
    kind: "Personal",
    summary: "Interview preparation for non-CSE graduates moving into tech roles.",
    problem: "Graduates from other engineering streams lack structured prep that starts from where they are.",
    approach: ["Curated, structured prep paths for non-CSE backgrounds."],
    impact: ["Personal project"],
    tags: ["EdTech", "Full stack"],
  },
  {
    slug: "bookmychair",
    title: "BookMyChair",
    kind: "Personal",
    summary: "A booking platform for men's salons.",
    problem: "Walk-in queues waste time for customers and make planning hard for salons.",
    approach: ["Slot-based booking for customers and a simple view for the salon."],
    impact: ["Personal project"],
    tags: ["Full stack", "Booking"],
  },
];

export const skillGroups = [
  { title: "Customer Success & TAM", items: ["Technical account management", "Escalation ownership", "Integration lifecycle", "L1/L2 support", "Root-cause analysis"] },
  { title: "Program & Product", items: ["Program management", "JIRA and SDLC", "Pre-sales solutioning", "Product analytics", "Figma and UX design"] },
  { title: "Engineering", items: ["Python", "JavaScript", "SQL", "Haskell", "Payment and credit APIs", "Code reading and debugging"] },
  { title: "AI", items: ["AI agents and workflows", "Claude, GPT, Kimi, OpenCode", "AI-assisted development", "Prompt and workflow automation"] },
];

export const experience = [
  {
    company: "Juspay Technologies",
    role: "Senior Product Solutions Engineer",
    team: "HyperCredit",
    period: "Jul 2024 to Present",
    note: "Promoted from Product Solutions Engineer, Feb 2026",
    points: [
      "Primary technical contact and escalation point for enterprise merchants across insurance, retail and lending, owning ticket resolution, integration and post-go-live support.",
      "Lead end-to-end integration programs, managing stakeholders, JIRA-based delivery and go-live, and support pre-sales with custom solutions for edge cases.",
      "Ship and debug production micro-features in Python using AI-assisted tooling.",
      "Build AI automations and support Product Managers with analytics and systems understanding.",
    ],
  },
  {
    company: "PhonePe Technologies",
    role: "Technical Solutions Specialist",
    team: "PhonePe PG",
    period: "Oct 2022 to Jul 2024",
    points: [
      "Owned the technical relationship for enterprise merchants on the B2B payment gateway, from integration design to post-go-live support and success-rate monitoring.",
      "Delivered technical demos and solution assessments for prospective enterprise clients.",
    ],
  },
  {
    company: "Razorpay Technologies",
    role: "Technical Solutions Engineer",
    team: "Razorpay PG",
    period: "Nov 2020 to Oct 2022",
    points: [
      "Subject-matter expert for the most complex product lines: Optimizer, Payment Links, E-Mandates and Subscriptions.",
      "Resolved high-volume tickets with a root-cause focus to reduce recurring issues.",
    ],
  },
];

export const education = [
  { title: "MBA, Marketing & Product Management", where: "Manipal Academy of Higher Education", period: "2025 to Present" },
  { title: "B.Tech, Electronics & Communication Engineering", where: "SRM University", period: "2016 to 2020" },
];

export const certifications = [
  "Google Product Management Fellowship",
  "Google UX Design",
  "Python & Full Stack (App Brewery)",
  "MERN Stack (GfG)",
  "Google Digital Marketing",
];

export const stack = {
  Languages: ["Python", "FastAPI", "SQL / PostgreSQL", "JavaScript", "TypeScript", "Haskell"],
  "Tools & platforms": ["Supabase", "SQLAlchemy", "Redis", "JIRA", "Figma", "Git", "Vercel", "CLI tooling"],
  "AI & Systems": ["AI Agents", "Xyne Workflows", "Claude", "GPT", "Kimi", "OpenCode"],
};
