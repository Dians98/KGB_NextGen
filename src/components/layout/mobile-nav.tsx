"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { LocaleSwitcher } from "./locale-switcher";
import { navItems } from "./nav-items";

// Le panneau se positionne par rapport à l'en-tête collant (ancêtre `sticky`).
export function MobileNav() {
  const t = useTranslations();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="lg:hidden"
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && !wrapperRef.current?.contains(next)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t("Nav.menu")}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-control text-fg transition-colors duration-(--duration-base) hover:bg-surface"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--spacing-header))] animate-menu-in overflow-y-auto border-b border-line bg-bg shadow-panel"
      >
        <Container className="py-4">
          <nav aria-label={t("Nav.label")}>
            <ul>
              {navItems.map((item) => (
                <li key={item.key} className="border-b border-line">
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center font-display text-heading font-medium text-fg hover:text-cyan"
                  >
                    {t(`Nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 flex flex-col gap-4">
            <LocaleSwitcher variant="inline" />
            <Button href="/#contact" size="lg" arrow className="w-full">
              {t("Common.contactCta")}
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
