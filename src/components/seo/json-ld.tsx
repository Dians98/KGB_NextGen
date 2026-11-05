import { getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import { currentLocale } from "@/i18n/current-locale";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";

// Uniquement des faits visibles sur la page ; email et BRN restent absents tant que non tranchés.

type JsonLdData = Record<string, unknown>;

function JsonLdScript({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      // Échappe « < » pour qu'une valeur ne puisse pas fermer la balise script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const asset = (path: string) => new URL(path, site.siteUrl).toString();
// Identifiants stables, communs aux deux langues.
const ids = {
  organization: asset("/#organization"),
  website: asset("/#website"),
  kevin: asset("/#kevin-gooljar"),
  diano: asset("/#diano-andriantsalama"),
};

const presentLinks = (...links: (string | null)[]) => links.filter((link): link is string => Boolean(link));

export async function HomeJsonLd() {
  const hero = await getTranslations("Hero");
  const team = await getTranslations("Team");
  const services = await getTranslations("Services");
  const { kevin, diano } = site.team;
  const companySameAs = presentLinks(site.companyLinkedin);

  const data: JsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ids.organization,
        name: site.name,
        alternateName: site.shortName,
        url: absoluteUrl("/", routing.defaultLocale),
        logo: { "@type": "ImageObject", url: asset("/icon.png"), width: 512, height: 512 },
        slogan: site.tagline,
        description: hero("subtitle"),
        address: { "@type": "PostalAddress", addressCountry: site.countryCode },
        ...(site.phone ? { telephone: site.phone.replace(/\s/g, "") } : {}),
        // Zones validées par Diano (2026-11-02).
        areaServed: [
          { "@type": "Country", name: "Mauritius" },
          { "@type": "Country", name: "Madagascar" },
        ],
        knowsAbout: [
          services("web.title"),
          services("mobile.title"),
          services("automation.title"),
          services("odoo.title"),
          services("devops.title"),
        ],
        founder: { "@id": ids.kevin },
        employee: [{ "@id": ids.kevin }, { "@id": ids.diano }],
        ...(companySameAs.length ? { sameAs: companySameAs } : {}),
      },
      {
        "@type": "Person",
        "@id": ids.kevin,
        name: kevin.name,
        jobTitle: team("kevin.role"),
        image: asset(kevin.photo),
        worksFor: { "@id": ids.organization },
        sameAs: presentLinks(kevin.linkedin),
      },
      {
        "@type": "Person",
        "@id": ids.diano,
        name: diano.name,
        jobTitle: team("diano.role"),
        image: asset(diano.photo),
        worksFor: { "@id": ids.organization },
        sameAs: presentLinks(diano.portfolio),
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        name: site.name,
        url: absoluteUrl("/", routing.defaultLocale),
        inLanguage: [...routing.locales],
        publisher: { "@id": ids.organization },
      },
    ],
  };

  return <JsonLdScript data={data} />;
}

export async function ProjectBreadcrumbJsonLd({ slug }: { slug: "ifspa" | "heaven" }) {
  const locale = await currentLocale();
  const nav = await getTranslations("Nav");
  const projects = await getTranslations("Projects");

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: nav("home"), item: absoluteUrl("/", locale) },
          { "@type": "ListItem", position: 2, name: projects(`${slug}.name`), item: absoluteUrl(`/projets/${slug}`, locale) },
        ],
      }}
    />
  );
}
