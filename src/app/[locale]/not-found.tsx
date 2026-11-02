import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <main id="contenu" className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="font-display text-3xl font-bold">{t("title")}</h1>
      <p className="text-muted">{t("text")}</p>
      <Link href="/" className="text-cyan underline underline-offset-4">
        {t("back")}
      </Link>
    </main>
  );
}
