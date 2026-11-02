import type { ComponentType, SVGProps } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import { CodeIcon, ModulesIcon, SmartphoneIcon, WorkflowIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const services: { key: "web" | "mobile" | "automation" | "odoo"; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { key: "web", Icon: CodeIcon },
  { key: "mobile", Icon: SmartphoneIcon },
  { key: "automation", Icon: WorkflowIcon },
  { key: "odoo", Icon: ModulesIcon },
];

export function Services() {
  const t = useTranslations("Services");

  return (
    <Section id="services" labelledBy="services-titre" className="border-t border-line">
      <div className="grid gap-block lg:grid-cols-12 lg:gap-x-16">
        <Reveal className="lg:col-span-5 lg:self-start lg:sticky lg:top-anchor">
          <SectionHeading id="services-titre" title={t("title")} description={t("intro")} />
        </Reveal>

        <ul className="border-t border-line lg:col-span-7">
          {services.map(({ key, Icon }, index) => (
            <Reveal
              as="li"
              key={key}
              delay={index * 0.05}
              className="group flex gap-5 border-b border-line py-8 sm:gap-6"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-control border border-line-strong bg-surface text-cyan transition-colors duration-(--duration-base) group-hover:border-cyan">
                <Icon width={22} height={22} />
              </span>
              <div>
                <h3 className="font-display text-heading font-semibold text-fg">{t(`${key}.title`)}</h3>
                <p className="mt-2 max-w-prose text-body text-muted">{t(`${key}.text`)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
