import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Gallery, type GallerySection } from "@/components/projects/gallery";
import { Badge } from "@/components/ui/badge";
import { Button, buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getProject, type Project } from "@/content/projects";

type ProjectPageProps = {
  slug: Project["slug"];
};

type CaseBlockProps = {
  id: string;
  title: string;
  children: ReactNode;
};

function CaseBlock({ id, title, children }: CaseBlockProps) {
  return (
    <Reveal className="border-t border-line py-10 lg:py-12">
      <section aria-labelledby={id} className="grid gap-4 lg:grid-cols-12 lg:gap-10">
        <h2 id={id} className="font-display text-heading font-semibold text-fg lg:col-span-4">
          {title}
        </h2>
        <div className="max-w-prose text-lead text-fg lg:col-span-8">{children}</div>
      </section>
    </Reveal>
  );
}

export function ProjectPage({ slug }: ProjectPageProps) {
  const t = useTranslations("Projects");
  const page = useTranslations("ProjectPage");
  const common = useTranslations("Common");
  const project = getProject(slug);
  const name = t(`${slug}.name`);

  const sections: GallerySection[] =
    slug === "ifspa"
      ? [
          {
            id: "site",
            title: page("groupSite"),
            caption: t("ifspa.siteCaption"),
            shots: project.shots.filter((shot) => shot.key.startsWith("site-")),
          },
          {
            id: "app",
            title: page("groupApp"),
            caption: t("ifspa.shotsCaption"),
            shots: project.shots.filter((shot) => shot.key.startsWith("app-")),
          },
        ]
      : [{ id: "all", caption: t(`${slug}.shotsCaption`), shots: project.shots }];

  return (
    <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
      <Container className="pt-8 pb-section">
        <Link href="/" className={buttonClasses("link", "md", "-ml-1 px-1")}>
          <ArrowRightIcon width={18} height={18} className="rotate-180" />
          {page("back")}
        </Link>

        <header className="mt-8 max-w-3xl">
          <Badge tone="progress">{common("inProgress")}</Badge>
          <h1 className="mt-5 font-display text-display font-bold text-fg">{name}</h1>
          <p className="mt-3 font-mono text-small text-muted">{t(`${slug}.client`)}</p>
          <p className="mt-6 text-lead text-muted">{t(`${slug}.summary`)}</p>
        </header>

        <div className="mt-block">
          <CaseBlock id="projet-contexte" title={page("context")}>
            <p>{t(`${slug}.context`)}</p>
          </CaseBlock>
          <CaseBlock id="projet-livre" title={page("delivered")}>
            <p>{t(`${slug}.delivered`)}</p>
          </CaseBlock>
          <CaseBlock id="projet-suite" title={page("next")}>
            <p>{t(`${slug}.next`)}</p>
          </CaseBlock>
        </div>

        <section aria-labelledby="projet-captures" className="border-t border-line pt-10 lg:pt-12">
          <h2 id="projet-captures" className="font-display text-title font-semibold text-fg">
            {page("shots")}
          </h2>
          <div className="mt-block">
            <Gallery sections={sections} altFor={(key) => t(`${slug}.shots.${key}` as "ifspa.shots.site-agrements")} />
          </div>
        </section>

        <Reveal className="mt-section">
          <section
            aria-labelledby="projet-cta"
            className="flex flex-col gap-6 rounded-card border border-line-strong bg-surface p-8 shadow-card sm:p-10 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-xl">
              <h2 id="projet-cta" className="font-display text-title font-semibold text-fg">
                {page("ctaTitle")}
              </h2>
              <p className="mt-3 text-body text-muted">{page("ctaText")}</p>
            </div>
            <Button href="/#contact" size="lg" arrow>
              {common("contactCta")}
            </Button>
          </section>
        </Reveal>
      </Container>
    </main>
  );
}
