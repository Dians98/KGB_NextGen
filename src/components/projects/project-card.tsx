import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PointerGlow } from "@/components/motion/pointer-glow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProject, type Project } from "@/content/projects";

type ProjectCardProps = {
  slug: Project["slug"];
  /** Côté de la capture sur écran large ; en alternant, les deux cartes ne se répètent pas. */
  imageSide?: "start" | "end";
};

export function ProjectCard({ slug, imageSide = "start" }: ProjectCardProps) {
  const t = useTranslations("Projects");
  const common = useTranslations("Common");
  const project = getProject(slug);
  const { cover } = project;
  const href = `/projets/${slug}`;
  const name = t(`${slug}.name`);

  return (
    <PointerGlow className="rounded-card">
      <article
        aria-labelledby={`projet-${slug}-titre`}
        className="relative grid overflow-hidden rounded-card border border-line bg-surface shadow-card transition-[border-color,box-shadow] duration-(--duration-base) ease-out-expo hover:border-line-strong hover:shadow-card-hover lg:grid-cols-12"
      >
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className={[
            "relative block overflow-hidden border-b border-line bg-bg lg:col-span-7 lg:border-b-0",
            imageSide === "end" ? "lg:order-2 lg:border-l" : "lg:border-r",
          ].join(" ")}
        >
          <Image
            src={cover.src}
            alt={t(`${slug}.coverAlt`)}
            width={cover.width}
            height={cover.height}
            sizes="(min-width: 1280px) 46rem, (min-width: 1024px) 55vw, 100vw"
            className="aspect-4/3 h-full w-full object-cover object-top"
          />
        </Link>

        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:col-span-5 lg:py-10">
          <div>
            <Badge tone="progress">{common("inProgress")}</Badge>
            <h3 id={`projet-${slug}-titre`} className="mt-4 font-display text-heading font-semibold text-fg">
              {name}
            </h3>
            <p className="mt-1 font-mono text-caption text-muted">{t(`${slug}.client`)}</p>
            <p className="mt-4 text-body text-fg">{t(`${slug}.summary`)}</p>
          </div>

          <dl className="space-y-4 border-t border-line pt-5 text-small">
            <div>
              <dt className="font-mono text-caption font-medium text-cyan">{common("delivered")}</dt>
              <dd className="mt-1 text-muted">{t(`${slug}.delivered`)}</dd>
            </div>
            <div>
              <dt className="font-mono text-caption font-medium text-fg">{common("planned")}</dt>
              <dd className="mt-1 text-muted">{t(`${slug}.next`)}</dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2">
            <Button href={href} variant="secondary" size="md" arrow>
              {t("viewProject")}
              <span className="sr-only"> {name}</span>
            </Button>
            {project.liveUrl ? (
              <Button href={project.liveUrl} external variant="link" size="md">
                {t("visitSite")}
                <span className="sr-only"> {name}</span>
              </Button>
            ) : null}
          </div>
        </div>
      </article>
    </PointerGlow>
  );
}
