import type { ReactNode } from "react";
import { Container } from "./container";

type SectionProps = {
  /** Ancre de la section (`accueil`, `services`, `projets`, `equipe`, `contact`). */
  id: string;
  /** Id du titre de la section, pour nommer la région. */
  labelledBy?: string;
  className?: string;
  /** Classe du conteneur interne. */
  containerClassName?: string;
  children: ReactNode;
};

// scroll-mt-anchor compense l'en-tête collant pour que le titre ciblé reste visible.
export function Section({ id, labelledBy, className, containerClassName, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={["scroll-mt-anchor py-section", className].filter(Boolean).join(" ")}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
