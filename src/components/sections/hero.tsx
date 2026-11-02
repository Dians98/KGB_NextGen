import Image from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroCircuits } from "./hero-circuits";

// Le h1 et l'emblème sont rendus tout de suite, sans Reveal : ce sont les éléments du LCP.
export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section id="accueil" aria-labelledby="accueil-titre" className="relative scroll-mt-anchor overflow-x-clip pt-10 pb-block">
      <Container className="relative grid items-center gap-x-block gap-y-12 lg:grid-cols-2 lg:py-8">
        <div className="order-2 lg:order-1">
          <h1 id="accueil-titre" className="font-display text-display font-bold text-fg">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lead text-muted">{t("subtitle")}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button href="/#contact" size="lg" arrow>
              {t("primaryCta")}
            </Button>
            <Button href="/#projets" variant="secondary" size="lg">
              {t("secondaryCta")}
            </Button>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-72 sm:max-w-md lg:order-2 lg:ml-auto lg:max-w-xl">
          <div aria-hidden="true" className="hero-halo pointer-events-none absolute -inset-x-1/4 -inset-y-1/2" />
          <div className="relative">
            <HeroCircuits />
            <Image
              src="/brand/kgb-embleme.webp"
              alt={t("emblemAlt")}
              width={969}
              height={441}
              preload
              sizes="(min-width: 1024px) 36rem, 80vw"
              className="relative h-auto w-full"
            />
          </div>
          <div className="relative mt-8 flex flex-col items-center gap-1 text-center lg:items-end lg:text-right">
            <p className="font-display text-heading font-semibold text-fg">{t("brandLine")}</p>
            <p lang="en" className="font-mono text-small text-muted">
              {site.tagline}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
