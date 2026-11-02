"use client";

import { animate, inView, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  className?: string;
  /** Retard en secondes, pour échelonner quelques éléments voisins. */
  delay?: number;
  children: ReactNode;
};

const DISTANCE = 12;
const DURATION = 0.4;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// Le contenu est visible par défaut (rendu serveur, sans JS) : seul ce qui est sous la
// ligne de flottaison est masqué après l'hydratation, puis révélé une fois à l'entrée dans l'écran.
export function Reveal({ as: Tag = "div", className, delay = 0, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    element.style.opacity = "0";
    element.style.transform = `translateY(${DISTANCE}px)`;

    const stop: () => void = inView(
      element,
      () => {
        stop();
        animate(
          element,
          { opacity: 1, transform: "translateY(0px)" },
          { duration: DURATION, delay, ease: EASE_OUT_EXPO },
        ).then(() => {
          element.style.opacity = "";
          element.style.transform = "";
        });
      },
      { margin: "0px 0px -10% 0px" },
    );

    return () => {
      stop();
      element.style.opacity = "";
      element.style.transform = "";
    };
  }, [reduceMotion, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
