import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // `/` reste en anglais quelle que soit la langue du navigateur ; le français est sur /fr.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
