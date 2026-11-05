import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CircuitField } from "./circuit-field";
import { HeroScroll } from "./hero-scroll";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

// Le h1 est du HTML serveur ordinaire ; l'entrée mot par mot est une animation CSS, le texte reste lisible sans JS.
export function Hero() {
  const t = useTranslations("Hero");
  const words = t("title").split(" ");

  return (
    <HeroScroll id="accueil" labelledBy="accueil-titre" background={<CircuitField />}>
      <Container className="relative grid items-center gap-x-block gap-y-10 py-10 lg:grid-cols-2 lg:py-8">
        <div className="relative isolate order-2 lg:order-1">
          <div aria-hidden="true" className="hero-veil pointer-events-none absolute -inset-x-10 -inset-y-14 -z-10" />
          <h1 id="accueil-titre" className="font-display text-display font-bold text-fg">
            {words.map((word, index) => (
              <span key={`${word}-${index}`}>
                <span className="hero-word" style={{ "--i": index } as CSSProperties}>
                  {word}
                </span>
                {index < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <p className="hero-rise mt-6 max-w-xl text-lead text-muted" style={delay(0.55)}>
            {t("subtitle")}
          </p>
          <div
            className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            style={delay(0.7)}
          >
            <Button href="/#contact" size="lg" arrow>
              {t("primaryCta")}
            </Button>
            <Button href="/#projets" variant="secondary" size="lg">
              {t("secondaryCta")}
            </Button>
          </div>
        </div>

        {/* « NextGen Solutions » est le nom mis en avant ; l'emblème KGB passe au second plan. */}
        <div className="relative order-1 mx-auto flex w-full max-w-md flex-col items-center lg:order-2 lg:ml-auto lg:max-w-xl lg:items-end">
          <div aria-hidden="true" className="hero-halo pointer-events-none absolute -inset-x-1/4 -inset-y-1/2" />
          <div data-circuit-focus className="relative w-40 sm:w-52 lg:w-64">
            <Logo
              priority
              alt={t("emblemAlt")}
              sizes="(min-width: 1024px) 16rem, 13rem"
              className="relative h-auto w-full"
            />
          </div>
          <div
            className="hero-rise relative isolate mt-6 flex flex-col items-center gap-2 text-center lg:items-end lg:text-right"
            style={delay(0.5)}
          >
            <div aria-hidden="true" className="hero-veil pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10" />
            <p className="font-display text-title font-bold whitespace-nowrap text-fg lg:text-[2.75rem] lg:leading-tight">
              <span className="text-cyan">{site.brand.lead}</span> {site.brand.rest}
            </p>
            <p lang="en" className="font-mono text-small text-muted">
              {site.tagline}
            </p>
          </div>
        </div>
      </Container>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
        <div className="h-10 w-px overflow-hidden bg-line-strong/40">
          <div className="scroll-cue-bar h-4 w-px bg-cyan" />
        </div>
      </div>
    </HeroScroll>
  );
}
