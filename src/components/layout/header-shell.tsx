"use client";

import { useEffect, useState, type ReactNode } from "react";

const THRESHOLD = 12;

// Après quelques pixels de défilement : fond plus opaque et filet visible. Le rendu serveur est l'état « en haut ».
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={[
        "sticky top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color] duration-500 ease-out-expo",
        scrolled ? "border-line bg-bg/90" : "border-transparent bg-bg/40",
      ].join(" ")}
    >
      {children}
    </header>
  );
}
