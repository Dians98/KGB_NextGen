import Image from "next/image";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { useTranslations } from "next-intl";
import { PointerGlow } from "@/components/motion/pointer-glow";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRightIcon, CodeIcon, ModulesIcon, SmartphoneIcon, WorkflowIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";

type ServiceKey = "web" | "mobile" | "automation" | "odoo";

const split = (value: string) =>
  value
    .split("·")
    .map((item) => item.trim())
    .filter(Boolean);

// Mosaïque : chaque service montre une preuve (captures IFSPA, flux n8n, modules Odoo) plutôt qu'une icône seule.
export function Services() {
  const t = useTranslations("Services");

  return (
    <Section id="services" labelledBy="services-titre" className="border-t border-line">
      <Reveal>
        <SectionHeading id="services-titre" title={t("title")} description={t("intro")} />
      </Reveal>

      <ul className="mt-block grid gap-5 lg:grid-cols-6 lg:grid-rows-[auto_auto] lg:gap-6">
        <ServiceCard
          serviceKey="web"
          Icon={CodeIcon}
          className="lg:col-span-4"
          layout="split"
          delay={0}
          visual={
            <ProofShot
              src="/projets/ifspa/app-tableau-de-bord.webp"
              width={1440}
              height={1327}
              sizes="(min-width: 1024px) 26rem, 100vw"
              className="aspect-4/3 lg:aspect-auto lg:h-full"
            />
          }
        >
          <Chips items={split(t("web.tags"))} />
        </ServiceCard>

        <ServiceCard
          serviceKey="mobile"
          Icon={SmartphoneIcon}
          className="lg:col-span-2 lg:row-span-2"
          layout="stack"
          delay={0.08}
          visual={
            <div className="flex justify-center px-6 pt-2">
              <div className="w-full max-w-56 rounded-t-device border border-b-0 border-line-strong bg-bg p-2 pb-0">
                <ProofShot
                  src="/projets/ifspa/app-mobile-encaissement.webp"
                  width={780}
                  height={1688}
                  sizes="14rem"
                  className="aspect-9/14 rounded-t-3xl"
                  bare
                />
              </div>
            </div>
          }
        >
          <Chips items={split(t("mobile.tags"))} />
        </ServiceCard>

        <ServiceCard serviceKey="automation" Icon={WorkflowIcon} className="lg:col-span-2" delay={0.16}>
          <Flow steps={split(t("automation.flow"))} label={t("automation.flowLabel")} />
        </ServiceCard>

        <ServiceCard serviceKey="odoo" Icon={ModulesIcon} className="lg:col-span-2" delay={0.24}>
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
  className?: string;
  /** split : texte et visuel côte à côte sur grand écran ; stack : visuel collé en bas. */
  layout?: "split" | "stack";
  delay: number;
  visual?: ReactNode;
  children: ReactNode;
};

function ServiceCard({ serviceKey, Icon, className, layout, delay, visual, children }: ServiceCardProps) {
  const t = useTranslations("Services");
  const titleId = `service-${serviceKey}`;

  return (
    <Reveal as="li" delay={delay} className={["flex", className].filter(Boolean).join(" ")}>
      <PointerGlow className="flex w-full rounded-card">
        <article
          aria-labelledby={titleId}
          className={[
            "group/service flex w-full overflow-hidden rounded-card border border-line bg-surface shadow-card transition-[border-color,box-shadow] duration-(--duration-base) ease-out-expo hover:border-line-strong hover:shadow-card-hover",
            layout === "split" ? "flex-col lg:flex-row" : "flex-col",
          ].join(" ")}
        >
          <div className={["flex flex-col gap-5 p-6 sm:p-8", layout === "split" ? "lg:w-1/2" : "flex-1"].join(" ")}>
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
          </div>
          {visual ? (
            <div className={layout === "split" ? "relative lg:w-1/2 lg:pt-8" : "relative mt-auto"}>{visual}</div>
          ) : null}
        </article>
      </PointerGlow>
    </Reveal>
  );
}

type ProofShotProps = {
  src: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  /** Sans cadre propre : le cadre est fourni par le parent (téléphone). */
  bare?: boolean;
};

// La capture mène au projet : le service est démontré par un travail réel.
function ProofShot({ src, width, height, sizes, className, bare }: ProofShotProps) {
  const t = useTranslations("Services");
  return (
    <Link
      href="/projets/ifspa"
      className={[
        "group/proof relative block overflow-hidden",
        bare ? "" : "border-t border-line lg:rounded-tl-card lg:border-l",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src={src}
        alt={t("proofAlt")}
        width={width}
        height={height}
        sizes={sizes}
        className="h-full w-full object-cover object-top transition-transform duration-1200 ease-out-expo motion-safe:group-hover/service:scale-103"
      />
      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-pill border border-line-strong bg-bg/85 px-3 py-1.5 text-caption font-medium text-fg backdrop-blur-sm transition-colors duration-(--duration-base) group-hover/proof:border-cyan">
        {t("proof")}
        <ArrowRightIcon width={14} height={14} />
      </span>
    </Link>
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

// Schéma d'un flux d'automatisation : une impulsion parcourt chaque liaison, l'une après l'autre.
function Flow({ steps, label }: { steps: string[]; label: string }) {
  return (
    <div>
      <ol aria-label={label} className="flex items-center">
        {steps.map((step, index) => (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <span
              className={[
                "rounded-control border px-2.5 py-1.5 font-mono text-caption whitespace-nowrap",
                step === "n8n" ? "border-cyan bg-bg text-cyan" : "border-line-strong bg-bg text-fg",
              ].join(" ")}
            >
              {step}
            </span>
            {index < steps.length - 1 ? (
              <span aria-hidden="true" className="relative mx-1 h-px flex-1 overflow-hidden bg-line-strong">
                <span className="flow-pulse absolute inset-y-0 w-4 bg-cyan" style={{ animationDelay: `${index * 0.6}s` }} />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
