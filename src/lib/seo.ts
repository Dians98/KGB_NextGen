import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/config/site";

// Pages publiques indexables : source commune du sitemap et des alternates.
export const indexablePaths = ["/", "/projets/ifspa", "/projets/heaven"] as const;
export type IndexablePath = (typeof indexablePaths)[number];

export const ogImageAlt = `${site.name} — ${site.tagline}`;

const ogLocales: Record<Locale, string> = { fr: "fr_FR", en: "en_GB" };

export function absoluteUrl(path: string, locale: Locale): string {
  return new URL(getPathname({ href: path, locale }), site.siteUrl).toString();
}

// hreflang réciproques ; x-default pointe vers la version française (langue par défaut).
export function languageAlternates(path: IndexablePath): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) languages[locale] = absoluteUrl(path, locale);
  languages["x-default"] = absoluteUrl(path, routing.defaultLocale);
  return languages;
}

type PageMetadataInput = {
  locale: Locale;
  path: IndexablePath;
  /** Titre de la balise title, modèle du layout compris. */
  title: Metadata["title"];
  /** Titre complet, repris tel quel par Open Graph et Twitter. */
  fullTitle: string;
  description: string;
};

// openGraph et twitter remplacent ceux du layout : chaque page les fournit en entier.
export function pageMetadata({ locale, path, title, fullTitle, description }: PageMetadataInput): Metadata {
  const url = absoluteUrl(path, locale);
  // Image de src/app/[locale]/opengraph-image.tsx, redéclarée car l'openGraph de la page écrase celle héritée.
  const image = {
    url: new URL(`/${locale}/opengraph-image`, site.siteUrl).toString(),
    width: 1200,
    height: 630,
    type: "image/png",
    alt: ogImageAlt,
  };
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: site.name,
      url,
      title: fullTitle,
      description,
      locale: ogLocales[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
