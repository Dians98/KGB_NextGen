"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LocaleFlag } from "@/components/brand/flags";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type LocaleSwitcherProps = {
  /** `menu` : bouton déroulant de l'en-tête ; `inline` : les deux langues côte à côte (menu mobile). */
  variant?: "menu" | "inline";
  className?: string;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`transition-transform duration-(--duration-base) ease-out-expo ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// Liens classiques vers la même page ; getPathname évite le préfixe /fr, qui redirigerait vers /.
export function LocaleSwitcher({ variant = "menu", className }: LocaleSwitcherProps) {
  const t = useTranslations("LocaleSwitcher");
  const current = useLocale() as Locale;
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => {
      if (detailsRef.current) detailsRef.current.open = false;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      summaryRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!detailsRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const options = routing.locales.map((locale) => {
    const active = locale === current;
    return (
      <li key={locale}>
        <Link
          href={getPathname({ href: pathname, locale })}
          hrefLang={locale}
          aria-current={active ? "true" : undefined}
          className={[
            "flex min-h-11 items-center gap-2.5 rounded-control px-3 text-small font-semibold transition-colors duration-(--duration-base)",
            variant === "inline" ? "flex-1 justify-center border border-line" : "w-full",
            active ? (variant === "inline" ? "bg-surface" : "bg-bg") + " text-fg" : "text-muted hover:bg-bg hover:text-fg",
            active && variant === "inline" ? "border-line-strong" : "",
          ].join(" ")}
        >
          <LocaleFlag locale={locale} />
          <span lang={locale}>{t(locale)}</span>
        </Link>
      </li>
    );
  });

  if (variant === "inline") {
    return (
      <nav aria-label={t("label")} className={className}>
        <ul className="flex gap-3">{options}</ul>
      </nav>
    );
  }

  return (
    <details
      ref={detailsRef}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && !detailsRef.current?.contains(next) && detailsRef.current) {
          detailsRef.current.open = false;
        }
      }}
      className={["relative", className].filter(Boolean).join(" ")}
    >
      <summary
        ref={summaryRef}
        aria-expanded={open}
        className="flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-control px-2.5 text-small font-semibold text-fg transition-colors duration-(--duration-base) hover:bg-surface [&::-webkit-details-marker]:hidden"
      >
        <span className="sr-only">
          {t("label")}
          {" "}
        </span>
        <LocaleFlag locale={current} />
        <span>{current.toUpperCase()}</span>
        <Chevron open={open} />
      </summary>
      <nav
        aria-label={t("label")}
        className="absolute top-full right-0 z-10 mt-2 w-44 rounded-card border border-line bg-surface p-1.5 shadow-panel"
      >
        <ul className="flex flex-col gap-0.5">{options}</ul>
      </nav>
    </details>
  );
}
