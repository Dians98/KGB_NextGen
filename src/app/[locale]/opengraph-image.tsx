import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { brandColors as c } from "@/config/brand-colors";
import { site } from "@/config/site";
import { routing } from "@/i18n/routing";
import { ogImageAlt } from "@/lib/seo";

export const alt = ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Vrai logo (jamais redessiné) et police Sora, lus une fois au chargement du module.
const [logo, soraRegular, soraSemiBold] = await Promise.all([
  readFile(join(process.cwd(), "public/brand/kgb-embleme.png"), "base64"),
  readFile(join(process.cwd(), "assets/fonts/Sora-Regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Sora-SemiBold.ttf")),
]);
const logoSrc = `data:image/png;base64,${logo}`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// next/root-params n'est pas disponible dans les route handlers : la langue vient de params.
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const footer = await getTranslations({ locale, namespace: "Footer" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: c.bg,
          backgroundImage: `radial-gradient(circle at 85% 15%, ${c.navy} 0%, ${c.bg} 55%)`,
          fontFamily: "Sora",
          color: c.fg,
        }}
      >
        {/* 969 × 441 à la source : ratio conservé. next/image n'existe pas dans ImageResponse. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={440} height={200} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.02em" }}>{site.name}</div>
          <div style={{ marginTop: 12, fontSize: 38, fontWeight: 600, color: c.cyan }}>{site.tagline}</div>
          <div
            style={{
              marginTop: 36,
              width: 160,
              height: 6,
              borderRadius: 3,
              backgroundImage: `linear-gradient(90deg, ${c.royal}, ${c.cyan})`,
            }}
          />
          <div style={{ marginTop: 28, fontSize: 28, color: c.muted }}>
            {`${t("ogImageLine")} · ${footer("location")}`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Sora", data: soraRegular, style: "normal", weight: 400 },
        { name: "Sora", data: soraSemiBold, style: "normal", weight: 600 },
      ],
    },
  );
}
