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
    path: "/projets/ifspa",
    title: t("ifspaTitle"),
    fullTitle: t("titleTemplate").replace("%s", t("ifspaTitle")),
    description: t("ifspaDescription"),
  });
}

export default function Page() {
  return (
    <>
      <ProjectBreadcrumbJsonLd slug="ifspa" />
      <ProjectPage slug="ifspa" />
    </>
  );
}
