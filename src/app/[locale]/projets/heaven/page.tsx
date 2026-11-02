import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProjectPage } from "@/components/projects/project-page";
import { ProjectBreadcrumbJsonLd } from "@/components/seo/json-ld";
import { currentLocale } from "@/i18n/current-locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  const t = await getTranslations("Metadata");
  return pageMetadata({
    locale,
    path: "/projets/heaven",
    title: t("heavenTitle"),
    fullTitle: t("titleTemplate").replace("%s", t("heavenTitle")),
    description: t("heavenDescription"),
  });
}

export default function Page() {
  return (
    <>
      <ProjectBreadcrumbJsonLd slug="heaven" />
      <ProjectPage slug="heaven" />
    </>
  );
}
