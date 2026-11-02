"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type HeroScrollProps = {
  id: string;
  labelledBy: string;
  /** Fond animé (canvas) : glisse plus lentement que le contenu. */
  background: ReactNode;
  children: ReactNode;
};

// Sortie au défilement : le contenu monte et s'estompe, sans rétrécir (un rétrécissement décalait
// les textes vers le centre) ; le fond glisse d'environ 10 %.
// Les styles restent branchés en mouvement réduit, mais les valeurs ne bougent pas.
export function HeroScroll({ id, labelledBy, background, children }: HeroScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = (value: number) => (reduce ? 0 : value);
  const backgroundY = useTransform(scrollYProgress, (v) => `${p(v) * 10}%`);
  const y = useTransform(scrollYProgress, (v) => Math.min(p(v) / 0.6, 1) * -48);
  const opacity = useTransform(scrollYProgress, (v) => 1 - Math.min(p(v) / 0.6, 1));

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className="relative isolate flex min-h-hero scroll-mt-anchor overflow-clip"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: backgroundY, top: "-10%", height: "110%" }}
        className="absolute inset-x-0 -z-10"
      >
        {background}
      </motion.div>
      <motion.div style={{ y, opacity }} className="relative flex flex-1 flex-col justify-center">
        {children}
      </motion.div>
    </section>
  );
}
