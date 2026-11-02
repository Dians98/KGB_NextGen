"use client";

import { useEffect, useRef, type ReactNode } from "react";

type PointerGlowProps = {
  className?: string;
  children: ReactNode;
};

// Les coordonnées passent par des variables CSS posées directement sur l'élément : aucun re-rendu React.
// L'effet n'existe que pour un pointeur précis et sans préférence de mouvement réduit (data-glow="on").
export function PointerGlow({ className, children }: PointerGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      element.style.setProperty("--glow-x", `${x}px`);
      element.style.setProperty("--glow-y", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = element.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const sync = () => {
      if (fine.matches && !reduce.matches) {
        element.dataset.glow = "on";
        element.addEventListener("pointermove", onMove);
      } else {
        delete element.dataset.glow;
        element.removeEventListener("pointermove", onMove);
      }
    };

    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);

    return () => {
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      element.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={["relative", className].filter(Boolean).join(" ")}>
      {children}
      <span aria-hidden="true" className="glow-layer pointer-events-none absolute inset-0 rounded-card" />
    </div>
  );
}
