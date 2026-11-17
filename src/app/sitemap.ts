import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, indexablePaths, languageAlternates } from "@/lib/seo";

// Date du build : chaque déploiement signale aux moteurs que le contenu a pu changer.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(path, locale),
      lastModified,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
