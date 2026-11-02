import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("Common");
  return (
    <a
      href="#contenu"
      className="sr-only rounded-control bg-royal px-4 py-3 font-semibold text-on-royal focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60"
    >
      {t("skipToContent")}
    </a>
  );
}
