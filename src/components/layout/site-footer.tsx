import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { navItems } from "./nav-items";

async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

// Accepte une URL complète ou un numéro ; le format réel reste à confirmer par Diano.
function whatsappHref(value: string) {
  return value.startsWith("http") ? value : `https://wa.me/${value.replace(/\D/g, "")}`;
}

export async function SiteFooter() {
  const [t, year] = await Promise.all([getTranslations(), getCurrentYear()]);
  const hasContactLinks = Boolean(site.companyLinkedin || site.whatsapp);

  return (
    <footer className="border-t border-line">
      <Container className="grid gap-10 py-block md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div>
            <Logo />
          </div>
          <p className="mt-4 text-small text-muted">
            {site.name}
            {" · "}
            {t("Footer.location")}
          </p>
          <p lang="en" className="mt-2 font-display text-small font-medium text-fg">
            {site.tagline}
          </p>
        </div>

        <nav aria-label={t("Footer.navLabel")}>
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-control text-small text-muted transition-colors duration-(--duration-base) hover:text-fg md:min-h-8"
                >
                  {t(`Nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {hasContactLinks ? (
          <ul className="flex flex-col items-start">
            {site.companyLinkedin ? (
              <li>
                <Button href={site.companyLinkedin} external variant="link" size="sm" className="md:min-h-8">
                  {t("Footer.linkedin")}
                </Button>
              </li>
            ) : null}
            {site.whatsapp ? (
              <li>
                <Button href={whatsappHref(site.whatsapp)} external variant="link" size="sm" className="md:min-h-8">
                  {t("Footer.whatsapp")}
                </Button>
              </li>
            ) : null}
          </ul>
        ) : null}
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-caption text-muted sm:flex-row sm:justify-between">
          <p>{t("Footer.copyright", { year, name: site.name })}</p>
          {site.brn ? <p>{t("Footer.brn", { brn: site.brn })}</p> : null}
        </Container>
      </div>
    </footer>
  );
}
