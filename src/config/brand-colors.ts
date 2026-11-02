// Miroir des tokens de couleur de src/app/globals.css (@theme), à tenir synchronisé à la main.
// Exception assumée à la règle des tokens : ImageResponse (next/og) ne lit pas les variables CSS.
export const brandColors = {
  bg: "#0a1226",
  surface: "#111c38",
  navy: "#0b2a7a",
  royal: "#1f5bff",
  cyan: "#22c3ff",
  fg: "#e8f3ff",
  muted: "#8fa3c7",
  line: "#1e2a4a",
} as const;
