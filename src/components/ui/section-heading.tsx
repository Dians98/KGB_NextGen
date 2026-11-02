import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Id du titre, à passer à `Section` via `labelledBy`. */
  id: string;
  title: ReactNode;
  description?: ReactNode;
  /** Niveau du titre ; h2 par défaut, la page garde un seul h1. */
  level?: 2 | 3;
  className?: string;
};

export function SectionHeading({ id, title, description, level = 2, className }: SectionHeadingProps) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <div className={["max-w-prose", className].filter(Boolean).join(" ")}>
      <Tag id={id} className="font-display text-title font-semibold text-fg">
        {title}
      </Tag>
      {description ? <p className="mt-4 text-lead text-muted">{description}</p> : null}
    </div>
  );
}
