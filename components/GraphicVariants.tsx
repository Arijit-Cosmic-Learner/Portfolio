"use client";
import { motion, useReducedMotion } from "framer-motion";

const mono = "var(--font-jb), monospace";

export function BridgeGraphic({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 400 380" className={className} fill="none" role="img" aria-label="Product bridging customers and engineering">
      {/* banks */}
      <g stroke="var(--fg)" strokeWidth="1" fill="var(--surface)">
        <rect x="20" y="230" width="110" height="110" rx="6" />
        <rect x="270" y="230" width="110" height="110" rx="6" />
      </g>
      <g fill="var(--muted)" fontSize="11" fontFamily={mono} letterSpacing="1.5" textAnchor="middle">
        <text x="75" y="290">CUSTOMERS</text>
        <text x="325" y="290">ENGINEERING</text>
      </g>
      {/* gap markers */}
      <g stroke="var(--border)" strokeWidth="1" strokeDasharray="3 5">
        <line x1="130" y1="230" x2="130" y2="350" />
        <line x1="270" y1="230" x2="270" y2="350" />
      </g>
      <path d="M135 345c15-8 30 8 45 0s30 8 45 0 30 8 45 0" stroke="var(--border)" strokeWidth="1.25" />
      {/* arch */}
      <motion.path
        d="M130 230 C 150 90, 250 90, 270 230"
        stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      <motion.g
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.4, duration: 0.5 }}
        style={{ transformOrigin: "200px 126px" }}
      >
        <circle cx="200" cy="126" r="24" fill="var(--surface)" stroke="var(--accent)" />
        <circle cx="200" cy="126" r="5" fill="var(--accent)" className="pulse-dot" />
        <text x="200" y="82" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily={mono} letterSpacing="1.5">PRODUCT</text>
      </motion.g>
      {/* little traveller along the bridge */}
      {!reduce && (
        <motion.circle r="3.5" fill="var(--fg)"
          animate={{ offsetDistance: ["0%", "100%"] }}
          style={{ offsetPath: "path('M130 230 C 150 90, 250 90, 270 230')" }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse", delay: 2 }}
        />
      )}
    </svg>
  );
}

export function RingsGraphic({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const pos = [
    { from: [200, 60], to: [200, 150], label: "CUSTOMERS", lx: 200, ly: 38 },
    { from: [90, 270], to: [150, 225], label: "PRODUCT", lx: 62, ly: 350 },
    { from: [310, 270], to: [250, 225], label: "ENGINEERING", lx: 338, ly: 350 },
  ];
  return (
    <svg viewBox="0 0 400 380" className={className} fill="none" role="img" aria-label="Customers, product and engineering overlapping">
      {pos.map((p, i) => (
        <motion.circle
          key={i} r="86"
          fill="var(--accent)" fillOpacity="0.1" stroke="var(--fg)" strokeWidth="1"
          initial={reduce ? { cx: p.to[0], cy: p.to[1] } : { cx: p.from[0], cy: p.from[1] }}
          whileInView={{ cx: p.to[0], cy: p.to[1] }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
        />
      ))}
      <g fill="var(--muted)" fontSize="11" fontFamily={mono} letterSpacing="1.5" textAnchor="middle">
        {pos.map((p) => <text key={p.label} x={p.lx} y={p.ly}>{p.label}</text>)}
      </g>
      <circle cx="200" cy="200" r="6" fill="var(--accent)" className="pulse-dot" />
      <text x="200" y="228" textAnchor="middle" fill="var(--fg)" fontSize="11" fontFamily={mono} letterSpacing="1.5">ME</text>
    </svg>
  );
}

export function OrbitGraphic({ className = "" }: { className?: string }) {
  const rings = [
    { r: 62, label: "PRODUCT", dur: 14 },
    { r: 108, label: "CUSTOMERS", dur: 22 },
    { r: 154, label: "ENGINEERING", dur: 32 },
  ];
  return (
    <svg viewBox="0 0 400 380" className={className} fill="none" role="img" aria-label="Product, customers and engineering orbiting you">
      {rings.map((o, i) => (
        <g key={o.label}>
          <circle cx="200" cy="190" r={o.r} stroke="var(--border)" strokeWidth="1" />
          <text x="200" y={190 - o.r - 6} textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily={mono} letterSpacing="1.5">{o.label}</text>
          <g>
            <circle cx={200 + o.r} cy="190" r="6" fill={i === 1 ? "var(--accent)" : "var(--fg)"} />
            <animateTransform attributeName="transform" type="rotate" from="0 200 190" to="360 200 190" dur={`${o.dur}s`} repeatCount="indefinite" />
          </g>
        </g>
      ))}
      <circle cx="200" cy="190" r="14" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
      <circle cx="200" cy="190" r="4" fill="var(--accent)" className="pulse-dot" />
      <text x="200" y="218" textAnchor="middle" fill="var(--fg)" fontSize="11" fontFamily={mono} fontWeight="600" letterSpacing="1.5">ME</text>
    </svg>
  );
}

export function SignalGraphic({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const d = "M40 300 C 120 300, 100 120, 200 150 S 300 280, 360 80";
  return (
    <svg viewBox="0 0 400 380" className={className} fill="none" role="img" aria-label="A single line passing through customers, product and engineering">
      <motion.path d={d} stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 2.2, ease: "easeInOut" }} />
      {[{ x: 40, y: 300, t: "CUSTOMERS", ty: 328, a: "start" as const }, { x: 200, y: 150, t: "PRODUCT", ty: 124, a: "middle" as const }, { x: 360, y: 80, t: "ENGINEERING", ty: 58, a: "end" as const }].map((n) => (
        <g key={n.t}>
          <circle cx={n.x} cy={n.y} r="9" fill="var(--surface)" stroke="var(--fg)" />
          <circle cx={n.x} cy={n.y} r="3.5" fill="var(--fg)" />
          <text x={n.x} y={n.ty} textAnchor={n.a} fill="var(--muted)" fontSize="10" fontFamily={mono} letterSpacing="1.5">{n.t}</text>
        </g>
      ))}
      {!reduce && (
        <motion.circle r="4" fill="var(--accent)" style={{ offsetPath: `path('${d}')` }}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse", delay: 2.4 }} />
      )}
    </svg>
  );
}

export function DotFieldGraphic({ className = "" }: { className?: string }) {
  const cols = 13, rows = 11;
  const px = (c: number) => 20 + c * 30, py = (r: number) => 30 + r * 32;
  const anchors = [
    { c: 1, r: 2, t: "CUSTOMERS", dy: -16 },
    { c: 11, r: 2, t: "ENGINEERING", dy: -16 },
    { c: 6, r: 9, t: "PRODUCT", dy: 26 },
  ];
  const dots = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const dist = Math.hypot(c - 6, r - 5);
    dots.push(<circle key={`${c}-${r}`} cx={px(c)} cy={py(r)} r="2" fill="var(--muted)" className="pulse-dot" style={{ animationDelay: `${dist * 0.18}s`, animationDuration: "3.2s" }} />);
  }
  return (
    <svg viewBox="0 0 400 380" className={className} fill="none" role="img" aria-label="A dot field with customers, product and engineering as anchors">
      <g opacity=".55">{dots}</g>
      <g stroke="var(--accent)" strokeWidth="1.25" className="flow">
        <line x1={px(1)} y1={py(2)} x2={px(11)} y2={py(2)} />
        <line x1={px(11)} y1={py(2)} x2={px(6)} y2={py(9)} />
        <line x1={px(6)} y1={py(9)} x2={px(1)} y2={py(2)} />
      </g>
      {anchors.map((a) => (
        <g key={a.t}>
          <circle cx={px(a.c)} cy={py(a.r)} r="10" fill="var(--bg)" stroke="var(--fg)" />
          <circle cx={px(a.c)} cy={py(a.r)} r="4" fill="var(--accent)" />
          <text x={px(a.c)} y={py(a.r) + a.dy} textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily={mono} letterSpacing="1.5">{a.t}</text>
        </g>
      ))}
    </svg>
  );
}

export function LayersGraphic({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const layers = [
    { y: 95, t: "CUSTOMERS" },
    { y: 190, t: "PRODUCT" },
    { y: 285, t: "ENGINEERING" },
  ];
  return (
    <svg viewBox="0 0 400 380" className={className} fill="none" role="img" aria-label="Three stacked layers: customers, product, engineering">
      <line x1="200" y1="95" x2="200" y2="285" stroke="var(--accent)" strokeWidth="1.25" className="flow" />
      {layers.map((l, i) => (
        <motion.g key={l.t}
          initial={reduce ? false : { opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <polygon points={`200,${l.y - 48} 330,${l.y} 200,${l.y + 48} 70,${l.y}`} fill="var(--surface)" stroke={i === 1 ? "var(--accent)" : "var(--fg)"} strokeWidth="1" />
          <circle cx="200" cy={l.y} r="4" fill={i === 1 ? "var(--accent)" : "var(--fg)"} />
          <text x="200" y={l.y + 24} textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily={mono} letterSpacing="1.5">{l.t}</text>
        </motion.g>
      ))}
    </svg>
  );
}
