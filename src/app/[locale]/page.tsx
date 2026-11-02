import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Placeholder");
  return (
    <main id="contenu" className="flex flex-1 items-center justify-center p-6">
      <h1 className="font-display text-3xl font-bold">{t("title")}</h1>
    </main>
  );
}
