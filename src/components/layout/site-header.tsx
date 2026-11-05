import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { HeaderShell } from "./header-shell";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { navItems } from "./nav-items";

export function SiteHeader() {
  const t = useTranslations();
  return (
    <HeaderShell>
      <Container className="flex h-header items-center justify-between gap-6">
        <Link
          href="/"
          className="-ml-1 flex min-h-11 items-center gap-2.5 rounded-control px-1 font-display text-lg font-semibold text-fg"
        >
          <Logo priority />
          {/* Le nom « NextGen Solutions » accompagne l'emblème dès que la place le permet. */}
          <span className="hidden leading-tight sm:inline">
            <span className="text-cyan">{site.brand.lead}</span> {site.brand.rest}
          </span>
          <span className="sr-only sm:hidden">{site.shortName}</span>
        </Link>

        <nav aria-label={t("Nav.label")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-10 items-center rounded-control px-3 text-small font-medium text-muted transition-colors duration-(--duration-base) hover:text-fg"
                >
                  {t(`Nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher />
          <Button href="/#contact" size="sm">
            {t("Common.contactCta")}
          </Button>
        </div>

        <MobileNav />
      </Container>
    </HeaderShell>
  );
}
