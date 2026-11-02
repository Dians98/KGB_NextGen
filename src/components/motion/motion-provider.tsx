"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// reducedMotion="user" : les animations de transform sont coupées si le système le demande.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
