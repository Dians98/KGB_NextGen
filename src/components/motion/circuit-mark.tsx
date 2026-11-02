"use client";

import { animate } from "motion/react";
import { useCallback, useRef } from "react";
import { REVEAL_EASE, useReveal } from "./use-reveal";

type CircuitMarkProps = {
  className?: string;
};

// Tiret de 32 px suivi d'un nœud en anneau, comme une piste du logo ; se dessine une fois à l'apparition.
export function CircuitMark({ className }: CircuitMarkProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const nodeRef = useRef<HTMLSpanElement>(null);

  const build = useCallback(() => {
    const line = lineRef.current;
    const node = nodeRef.current;
    const reset = () => {
      if (line) line.style.transform = "";
      if (node) {
        node.style.opacity = "";
        node.style.transform = "";
      }
    };
    return {
      hide: () => {
        if (line) line.style.transform = "scaleX(0)";
        if (node) {
          node.style.opacity = "0";
          node.style.transform = "scale(0.4)";
        }
      },
      show: () => {
        if (line) animate(line, { transform: "scaleX(1)" }, { duration: 0.6, ease: REVEAL_EASE });
        if (node) animate(node, { opacity: 1, transform: "scale(1)" }, { duration: 0.4, delay: 0.45, ease: REVEAL_EASE });
      },
      reset,
    };
  }, []);
  useReveal(ref, build);

  return (
    <span ref={ref} aria-hidden="true" className={["flex items-center", className].filter(Boolean).join(" ")}>
      <span ref={lineRef} className="block h-0.5 w-8 origin-left bg-cyan" />
      <span ref={nodeRef} className="block size-2.5 rounded-pill border-2 border-cyan" />
    </span>
  );
}
