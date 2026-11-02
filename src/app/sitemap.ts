import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, indexablePaths, languageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(path, locale),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
