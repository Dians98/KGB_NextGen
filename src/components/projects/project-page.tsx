import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Gallery, type GalleryLabels, type GallerySection } from "@/components/projects/gallery";
import { ProjectVideo } from "@/components/projects/project-video";
import { Badge } from "@/components/ui/badge";
import { Button, buttonClasses } from "@/components/ui/button";
import { CircuitMark } from "@/components/motion/circuit-mark";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
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
    <Reveal rule="top" className="py-10 lg:py-12">
      <section aria-labelledby={id} className="grid gap-4 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <CircuitMark className="mb-3" />
          <h2 id={id} className="font-display text-heading font-semibold text-cyan">
            {title}
          </h2>
        </div>
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

  // Seul HAEVEN a une vidéo ; IFSPA ne montre que les captures de l'application.
  const video = project.video ? (
    <ProjectVideo video={project.video} description={t(`${slug}.videoDescription` as "heaven.videoDescription")} />
  ) : undefined;

  const sections: GallerySection[] = [
    {
      id: "all",
      // IFSPA : pas de légende au-dessus des captures.
      caption: slug === "heaven" ? t("heaven.shotsCaption") : undefined,
      shots: project.shots.map((shot) => ({ ...shot, alt: t(`${slug}.shots.${shot.key}` as "ifspa.shots.app-recu") })),
      video,
    },
  ];

  const labels: GalleryLabels = {
    open: page("lightboxOpen"),
    close: page("lightboxClose"),
    previous: page("lightboxPrevious"),
    next: page("lightboxNext"),
    counter: page("lightboxCounter", { current: "{current}", total: "{total}" }),
  };

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
          <SectionHeading id="projet-captures" title={page("shots")} />
          <div className="mt-block">
            <Gallery sections={sections} labels={labels} />
          </div>
        </section>

        <Reveal className="mt-section">
          <section
            aria-labelledby="projet-cta"
            className="flex flex-col gap-6 rounded-card border border-line-strong bg-surface p-8 shadow-card sm:p-10 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-xl">
              <SectionHeading id="projet-cta" title={page("ctaTitle")} description={page("ctaText")} />
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
