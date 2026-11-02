"use client";

import { useEffect, type RefObject } from "react";

export type RevealTarget = {
  hide: () => void;
  show: () => void;
  /** Remet l'élément dans son état visible, sans animation (nettoyage de l'effet). */
  reset: () => void;
};

export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

// Le contenu reste visible côté serveur et sans JS : on ne masque que ce qui est sous la ligne de flottaison,
// après l'hydratation, et jamais en mouvement réduit. L'apparition a lieu une seule fois.
export function useReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  build: (element: T) => RevealTarget,
  disabled = false,
) {
  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    const target = build(element);
    target.hide();
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          target.show();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      target.reset();
    };
  }, [ref, build, disabled]);
}
