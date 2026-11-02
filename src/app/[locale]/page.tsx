import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomeJsonLd } from "@/components/seo/json-ld";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Team } from "@/components/sections/team";
import { currentLocale } from "@/i18n/current-locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  const t = await getTranslations("Metadata");
  return pageMetadata({
    locale,
    path: "/",
    title: { absolute: t("homeTitle") },
    fullTitle: t("homeTitle"),
    description: t("homeDescription"),
  });
}

export default function HomePage() {
  return (
    <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
      <HomeJsonLd />
      <Hero />
      <Services />
      <Projects />
      <Team />
      <Contact />
    </main>
  );
}
