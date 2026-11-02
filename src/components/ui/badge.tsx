import type { ReactNode } from "react";

export type BadgeTone = "progress" | "delivered" | "planned";

type BadgeProps = {
  tone?: BadgeTone;
  className?: string;
  /** Libellé traduit, par exemple « En cours ». */
  children: ReactNode;
};

const dots: Record<BadgeTone, string> = {
  progress: "bg-cyan",
  delivered: "bg-fg",
  planned: "bg-line-strong",
};

const texts: Record<BadgeTone, string> = {
  progress: "text-cyan",
  delivered: "text-fg",
  planned: "text-muted",
};

export function Badge({ tone = "progress", className, children }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-pill border border-line-strong bg-surface px-3 py-1 text-caption font-semibold",
        texts[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span aria-hidden="true" className={`relative size-1.5 rounded-pill ${dots[tone]}`}>
        {tone === "progress" ? (
          <span className="absolute inset-0 rounded-pill bg-cyan animate-ping-soft motion-reduce:hidden" />
        ) : null}
      </span>
      {children}
    </span>
  );
}
