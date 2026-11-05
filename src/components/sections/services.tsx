import type { ComponentType, ReactNode, SVGProps } from "react";
import { useTranslations } from "next-intl";
import { PointerGlow } from "@/components/motion/pointer-glow";
import { Reveal } from "@/components/motion/reveal";
import { CodeIcon, ModulesIcon, SmartphoneIcon, WorkflowIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

type ServiceKey = "web" | "mobile" | "automation" | "odoo";

const FLOW_STEPS = ["trigger", "n8n", "ai", "result"] as const;

const split = (value: string) =>
  value
    .split("·")
    .map((item) => item.trim())
    .filter(Boolean);

// Grille 2 × 2 : chaque carte se termine par du concret (technologies, flux n8n, modules Odoo).
// Docker et l'administration open source sont rattachés à la carte Web (demande de Diano, 2026-11-05).
export function Services() {
  const t = useTranslations("Services");

  return (
    <Section id="services" labelledBy="services-titre" className="border-t border-line">
      <Reveal>
        <SectionHeading id="services-titre" title={t("title")} description={t("intro")} />
      </Reveal>

      <ul className="mt-block grid gap-5 md:grid-cols-2 lg:gap-6">
        <ServiceCard serviceKey="web" Icon={CodeIcon} delay={0}>
          <Chips items={split(t("web.tags"))} />
        </ServiceCard>

        <ServiceCard serviceKey="mobile" Icon={SmartphoneIcon} delay={0.08}>
          <Chips items={split(t("mobile.tags"))} />
        </ServiceCard>

        <ServiceCard serviceKey="automation" Icon={WorkflowIcon} delay={0.16}>
          <Flow
            label={t("automation.flowLabel")}
            steps={FLOW_STEPS.map((step) => ({
              key: step,
              label: t(`automation.steps.${step}.label`),
              text: t(`automation.steps.${step}.text`),
            }))}
          />
        </ServiceCard>

        <ServiceCard serviceKey="odoo" Icon={ModulesIcon} delay={0.24}>
          <ul className="grid grid-cols-2 gap-2">
            {split(t("odoo.modules")).map((module) => (
              <li
                key={module}
                className="flex items-center gap-2 rounded-control border border-line bg-bg px-3 py-2.5 text-small font-medium text-fg"
              >
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-pill bg-cyan" />
                {module}
              </li>
            ))}
          </ul>
        </ServiceCard>
      </ul>
    </Section>
  );
}

type ServiceCardProps = {
  serviceKey: ServiceKey;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  delay: number;
  className?: string;
  children: ReactNode;
};

function ServiceCard({ serviceKey, Icon, delay, className, children }: ServiceCardProps) {
  const t = useTranslations("Services");
  const titleId = `service-${serviceKey}`;

  return (
    <Reveal as="li" delay={delay} className={["flex", className].filter(Boolean).join(" ")}>
      <PointerGlow className="flex w-full rounded-card">
        <article
          aria-labelledby={titleId}
          className="group/service flex w-full flex-col gap-5 rounded-card border border-line bg-surface p-6 shadow-card transition-[border-color,box-shadow] duration-(--duration-base) ease-out-expo hover:border-line-strong hover:shadow-card-hover sm:p-8"
        >
          <span className="flex size-11 items-center justify-center rounded-control border border-line-strong bg-bg text-cyan transition-colors duration-(--duration-base) group-hover/service:border-cyan">
            <Icon width={22} height={22} />
          </span>
          <div>
            <h3 id={titleId} className="font-display text-heading font-semibold text-fg">
              {t(`${serviceKey}.title`)}
            </h3>
            <p className="mt-2 text-body text-muted">{t(`${serviceKey}.text`)}</p>
          </div>
          <div className="mt-auto pt-1">{children}</div>
        </article>
      </PointerGlow>
    </Reveal>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-pill border border-line-strong bg-bg px-3 py-1 font-mono text-caption text-fg"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

type FlowStep = { key: string; label: string; text: string };

// Les étapes d'un workflow n8n, de haut en bas : une impulsion descend d'une étape à la suivante.
function Flow({ steps, label }: { steps: FlowStep[]; label: string }) {
  return (
    <ol aria-label={label} className="flex flex-col gap-4">
      {steps.map((step, index) => (
        <li key={step.key} className="relative grid grid-cols-[5.5rem_1fr] items-start gap-4">
          <span
            className={[
              "flex h-8 items-center justify-center rounded-control border bg-bg px-2 font-mono text-caption whitespace-nowrap",
              step.key === "n8n" || step.key === "ai" ? "border-cyan text-cyan" : "border-line-strong text-fg",
            ].join(" ")}
          >
            {step.label}
          </span>
          <span className="flex min-h-8 items-center text-small text-muted">{step.text}</span>
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute top-8 -bottom-4 left-[2.75rem] w-px overflow-hidden bg-line-strong"
            >
              <span className="flow-pulse absolute inset-x-0 h-2 bg-cyan" style={{ animationDelay: `${index * 0.6}s` }} />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
