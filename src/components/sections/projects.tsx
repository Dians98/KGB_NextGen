import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function Projects() {
  const t = useTranslations("Projects");

  return (
    <Section id="projets" labelledBy="projets-titre" className="border-t border-line">
      <Reveal>
        <SectionHeading id="projets-titre" title={t("title")} description={t("intro")} />
      </Reveal>
      <div className="mt-block flex flex-col gap-8 lg:gap-10">
        <ProjectCard slug="ifspa" imageSide="start" />
        <ProjectCard slug="heaven" imageSide="end" />
      </div>
    </Section>
  );
}
