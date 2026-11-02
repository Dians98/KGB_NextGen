"use client";

import { animate } from "motion/react";
import { useCallback, useRef, type ElementType, type ReactNode } from "react";
import { REVEAL_EASE, useReveal } from "./use-reveal";

type RevealProps = {
  as?: ElementType;
  className?: string;
  /** Retard en secondes, pour échelonner des éléments voisins. */
  delay?: number;
  /** Distance de montée, en px. */
  y?: number;
  /** Filet qui se dessine (scaleX de 0 à 1) en haut ou en bas de l'élément. */
  rule?: "top" | "bottom";
  ruleTone?: "line" | "strong";
  children: ReactNode;
};

const DURATION = 0.8;
const RULE_DURATION = 1;

// Fondu et montée une seule fois à l'entrée dans l'écran ; le filet se dessine juste après le contenu.
export function Reveal({
  as: Tag = "div",
  className,
  delay = 0,
  y = 18,
  rule,
  ruleTone = "line",
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);

  const build = useCallback(
    (element: HTMLElement) => {
      const line = ruleRef.current;
      const reset = () => {
        element.style.opacity = "";
        element.style.transform = "";
        if (line) line.style.transform = "";
      };
      return {
        hide: () => {
          element.style.opacity = "0";
          element.style.transform = `translateY(${y}px)`;
          if (line) line.style.transform = "scaleX(0)";
        },
        show: () => {
          animate(element, { opacity: 1, transform: "translateY(0px)" }, { duration: DURATION, delay, ease: REVEAL_EASE }).then(
            () => {
              element.style.opacity = "";
              element.style.transform = "";
            },
          );
          if (line) {
            animate(line, { transform: "scaleX(1)" }, { duration: RULE_DURATION, delay: delay + 0.1, ease: REVEAL_EASE }).then(
              () => {
                line.style.transform = "";
              },
            );
          }
        },
        reset,
      };
    },
    [y, delay],
  );
  useReveal(ref, build);

  return (
    <Tag ref={ref} className={[rule ? "relative" : "", className].filter(Boolean).join(" ")}>
      {children}
      {rule ? (
        <span
          ref={ruleRef}
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-x-0 h-px origin-left",
            rule === "top" ? "top-0" : "bottom-0",
            ruleTone === "strong" ? "bg-line-strong" : "bg-line",
          ].join(" ")}
        />
      ) : null}
    </Tag>
  );
}
