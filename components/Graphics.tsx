export function HeroGraphic({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 200, y: 70, label: "Customers" },
    { x: 85, y: 290, label: "Product" },
    { x: 315, y: 290, label: "Engineering" },
  ];
  return (
    <svg viewBox="0 0 400 380" className={className} fill="none" role="img" aria-label="Customers, Product and Engineering connected">
      <g stroke="var(--border)" strokeWidth="1">
        <circle cx="200" cy="205" r="150" />
        <circle cx="200" cy="205" r="105" />
        <circle cx="200" cy="205" r="60" />
      </g>
      <g stroke="var(--accent)" strokeWidth="1.25" className="flow">
        <line x1="200" y1="70" x2="85" y2="290" />
        <line x1="85" y1="290" x2="315" y2="290" />
        <line x1="315" y1="290" x2="200" y2="70" />
      </g>
      <g stroke="var(--muted)" strokeWidth="1" opacity=".5">
        <line x1="200" y1="70" x2="200" y2="205" />
        <line x1="85" y1="290" x2="200" y2="205" />
        <line x1="315" y1="290" x2="200" y2="205" />
      </g>
      <circle cx="200" cy="205" r="9" fill="var(--accent)" className="pulse-dot" />
      {nodes.map((n) => (
        <g key={n.label} className="float" style={{ animationDelay: `${n.x % 3}s` }}>
          <circle cx={n.x} cy={n.y} r="22" fill="var(--surface)" stroke="var(--fg)" strokeWidth="1" />
          <circle cx={n.x} cy={n.y} r="5" fill="var(--fg)" />
          <text x={n.x} y={n.y + (n.y < 150 ? -34 : 42)} textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="var(--font-jb), monospace" letterSpacing="1.5">
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function SectionIcon({ name, className = "" }: { name: string; className?: string }) {
  const p = { stroke: "currentColor", strokeWidth: 1.25, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      {name === "work" && (<g {...p}><rect x="8" y="8" width="20" height="20" rx="3" /><rect x="20" y="20" width="20" height="20" rx="3" /></g>)}
      {name === "skills" && (<g {...p}><circle cx="14" cy="14" r="5" /><circle cx="34" cy="14" r="5" /><circle cx="24" cy="34" r="5" /><path d="M18 17l4 13M30 17l-4 13M19 14h10" /></g>)}
      {name === "experience" && (<g {...p}><path d="M14 8v32" /><circle cx="14" cy="12" r="3" /><circle cx="14" cy="24" r="3" /><circle cx="14" cy="36" r="3" /><path d="M22 12h16M22 24h12M22 36h8" /></g>)}
      {name === "tech" && (<g {...p}><path d="M18 14L8 24l10 10M30 14l10 10-10 10M27 10l-6 28" /></g>)}
      {name === "writing" && (<g {...p}><path d="M10 38l2-9L32 9l7 7-20 20-9 2z" /><path d="M28 13l7 7" /></g>)}
      {name === "contact" && (<g {...p}><rect x="7" y="12" width="34" height="24" rx="3" /><path d="M8 14l16 12 16-12" /></g>)}
    </svg>
  );
}

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={className} fill="none" aria-hidden>
      <path d="M2 6c10-8 20 8 30 0s20 8 30 0 20 8 30 0 20 8 26 0" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
