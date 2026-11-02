import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Indexation seulement en production Vercel ET sur accord explicite (SITE_INDEXABLE=true) :
// l'URL provisoire *.vercel.app et les préversions restent fermées.
export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.SITE_INDEXABLE === "true" && process.env.VERCEL_ENV === "production";

  if (!indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.siteUrl).toString(),
  };
}
