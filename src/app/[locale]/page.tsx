import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export default function HomePage() {
  const t = useTranslations("Nav");
  // Équipe et Contact : cadres vides, remplis par les tâches 5.6 et 5.7.
  const later = [
    { id: "equipe", title: t("team") },
    { id: "contact", title: t("contact") },
  ];

  return (
    <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
      <Hero />
      <Services />
      <Projects />

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
