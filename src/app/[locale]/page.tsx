import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

// Page provisoire : le hero et les sections arrivent à l'étape 5.
export default function HomePage() {
  const t = useTranslations();
  const later = [
    { id: "services", title: t("Nav.services") },
    { id: "projets", title: t("Nav.projects") },
    { id: "equipe", title: t("Nav.team") },
    { id: "contact", title: t("Nav.contact") },
  ];

  return (
    <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
      <Section id="accueil" className="min-h-[70svh]">
        <h1 className="max-w-3xl font-display text-display font-bold">{t("Placeholder.title")}</h1>
        <p className="mt-5 max-w-prose text-lead text-muted">{t("Placeholder.text")}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="/#contact" size="lg" arrow>
            {t("Common.contactCta")}
          </Button>
          <Button href="/#projets" variant="secondary" size="lg">
            {t("Common.seeProjects")}
          </Button>
          <Button href="/#contact" variant="link">
            {t("Nav.contact")}
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Badge tone="progress">{t("Common.inProgress")}</Badge>
          <Badge tone="delivered">{t("Common.delivered")}</Badge>
          <Badge tone="planned">{t("Common.planned")}</Badge>
        </div>
      </Section>

      {later.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          labelledBy={`${section.id}-titre`}
          className="min-h-[60svh] border-t border-line"
        >
          <Reveal>
            <SectionHeading id={`${section.id}-titre`} title={section.title} />
          </Reveal>
        </Section>
      ))}
    </main>
  );
}
