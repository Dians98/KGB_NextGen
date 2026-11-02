"use client";

import { animate } from "motion/react";
import { useCallback, useRef, type ReactNode } from "react";
import { REVEAL_EASE, useReveal } from "./use-reveal";

type CurtainProps = {
  className?: string;
  delay?: number;
  children: ReactNode;
};

// Rideau horizontal (clip-path) à l'entrée dans l'écran ; l'image est pleinement visible sans JS.
export function Curtain({ className, delay = 0, children }: CurtainProps) {
  const ref = useRef<HTMLDivElement>(null);

  // L'observateur suit l'enveloppe, jamais l'élément rogné : un élément entièrement clippé n'est pas « visible » pour lui.
  const build = useCallback(
    (outer: HTMLElement) => {
      const inner = outer.firstElementChild as HTMLElement | null;
      return {
        hide: () => {
          if (inner) inner.style.clipPath = "inset(0 100% 0 0)";
        },
        show: () => {
          if (!inner) return;
          animate(inner, { clipPath: "inset(0 0% 0 0)" }, { duration: 1, delay, ease: REVEAL_EASE }).then(() => {
            inner.style.clipPath = "";
          });
        },
        reset: () => {
          if (inner) inner.style.clipPath = "";
        },
      };
    },
    [delay],
  );
  useReveal(ref, build);

  return (
    <div ref={ref} className={className}>
      <div className="h-full">{children}</div>
    </div>
  );
}
