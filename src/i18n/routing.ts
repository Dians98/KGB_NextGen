import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  // `/` reste en français quelle que soit la langue du navigateur.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
