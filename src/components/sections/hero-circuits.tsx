import type { CSSProperties } from "react";

type Trace = {
  d: string;
  /** Position du nœud terminal, dans le repère de l'emblème (969 × 441). */
  end: [number, number];
  delay: number;
};

// Repère de l'emblème : les tracés partent des anneaux du logo (gauche) et du profil (droite).
const traces: Trace[] = [
  { d: "M569 103H330L270 43H110", end: [110, 43], delay: 0.2 },
  { d: "M537 48H470L430 8H300L240 -52H150", end: [150, -52], delay: 0.35 },
  { d: "M601 19L568 -14H400L360 -54H320", end: [320, -54], delay: 0.5 },
  { d: "M692 0L672 -20H600L560 -60H460", end: [460, -60], delay: 0.65 },
  { d: "M930 205H975L1035 265H1110", end: [1110, 265], delay: 0.8 },
  { d: "M944 340H980L1020 380H1090", end: [1090, 380], delay: 0.95 },
];

const DURATION = 1.1;

// Décor : SVG à dimensions fixes posé autour de l'emblème, allumé une seule fois en CSS.
// Le parent doit avoir le rapport 969 / 441 de l'emblème.
export function HeroCircuits() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="-200 -160 1369 761"
      width="1369"
      height="761"
      fill="none"
      className="pointer-events-none absolute"
      style={{ left: "-20.64%", top: "-36.3%", width: "141.3%", height: "172.5%" }}
    >
      {traces.map((trace) => {
        const style = { "--circuit-delay": `${trace.delay}s` } as CSSProperties;
        const nodeStyle = { "--circuit-delay": `${trace.delay + DURATION * 0.8}s` } as CSSProperties;
        return (
          <g key={trace.d}>
            <path
              d={trace.d}
              pathLength={1}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              strokeLinejoin="round"
              className="circuit-path stroke-royal"
              style={style}
            />
            <g className="circuit-node" style={nodeStyle}>
              <circle cx={trace.end[0]} cy={trace.end[1]} r={11} strokeWidth={2} className="stroke-cyan" />
              <circle cx={trace.end[0]} cy={trace.end[1]} r={4} className="fill-cyan" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
