import { hasLocale } from "next-intl";
import { locale as rootLocale } from "next/root-params";
import { notFound } from "next/navigation";
import { routing, type Locale } from "./routing";

// Langue de la requête, pour les composants serveur et generateMetadata (pas les route handlers).
export async function currentLocale(): Promise<Locale> {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}
