import Image from "next/image";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/config/site";

type PersonProps = {
  id: string;
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  children: ReactNode;
};

type CvButtonProps = {
  href: string;
  name: string;
};

// Le nom de la personne est dans le nom accessible : deux boutons « Télécharger le CV » ne doivent pas se ressembler.
function CvButton({ href, name }: CvButtonProps) {
  const t = useTranslations("Team");
  return (
    <Button href={href} download variant="secondary" size="md" icon={<DownloadIcon width={18} height={18} />}>
      {t("cv")}
      <span className="sr-only">{t("cvOwner", { name })}</span>
      <span className="font-mono text-caption text-muted">{"PDF"}</span>
    </Button>
  );
}

// Les deux portraits sont carrés à la source et rognés en cercle de même taille : la paire reste cohérente.
function Person({ id, name, role, photo, photoAlt, children }: PersonProps) {
  return (
    <article aria-labelledby={id} className="flex flex-col gap-6 pt-8">
      <div className="flex items-center gap-5 sm:gap-6">
        <Image
          src={photo}
          alt={photoAlt}
          width={160}
          height={160}
          sizes="(min-width: 640px) 8rem, 6rem"
          className="size-24 shrink-0 rounded-pill border border-line-strong object-cover sm:size-32"
        />
        <div>
          <h3 id={id} className="font-display text-heading font-semibold text-fg">
            {name}
          </h3>
          <p className="mt-1 text-body font-medium text-muted">{role}</p>
        </div>
      </div>
      {children}
    </article>
  );
}

export function Team() {
  const t = useTranslations("Team");
  const stack = t("diano.stack")
    .split("·")
    .map((item) => item.trim())
    .filter(Boolean);
  const points = [t("kevin.point1"), t("kevin.point2"), t("kevin.point3")];
  const { kevin, diano } = site.team;

  return (
    <Section id="equipe" labelledBy="equipe-titre" className="border-t border-line">
      <Reveal>
        <SectionHeading id="equipe-titre" title={t("title")} description={t("intro")} />
      </Reveal>

      <div className="mt-block grid gap-x-16 gap-y-14 md:grid-cols-2">
        <Reveal rule="top" ruleTone="strong">
          <Person
            id="equipe-kevin"
            name={kevin.name}
            role={t("kevin.role")}
            photo={kevin.photo}
            photoAlt={t("kevin.photoAlt")}
          >
            <p className="max-w-prose text-body text-muted">{t("kevin.bio")}</p>
            <ul className="divide-y divide-line border-y border-line text-small text-fg">
              {points.map((point) => (
                <li key={point} className="py-3">
                  {point}
                </li>
              ))}
            </ul>
            <div>
              <CvButton href={kevin.cv} name={kevin.name} />
            </div>
          </Person>
        </Reveal>

        <Reveal delay={0.12} rule="top" ruleTone="strong">
          <Person
            id="equipe-diano"
            name={diano.name}
            role={t("diano.role")}
            photo={diano.photo}
            photoAlt={t("diano.photoAlt")}
          >
            <p className="max-w-prose text-body text-muted">{t("diano.bio")}</p>
            <ul className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <li
                  key={item}
                  className="rounded-pill border border-line-strong bg-surface px-3 py-1 font-mono text-caption text-fg"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div>
              <CvButton href={diano.cv} name={diano.name} />
            </div>
          </Person>
        </Reveal>
      </div>
    </Section>
  );
}
