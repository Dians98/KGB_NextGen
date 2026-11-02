import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProjectPage } from "@/components/projects/project-page";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Projects");
  const page = await getTranslations("ProjectPage");
  return {
    title: page("metaTitle", { name: t("heaven.name") }),
    description: t("heaven.summary"),
  };
}

export default function Page() {
  return <ProjectPage slug="heaven" />;
}
