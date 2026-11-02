// Les valeurs à null sont « à trancher » (docs/DECISIONS.md) : l'interface les masque tant qu'elles valent null.

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const site = {
  name: "KGB NextGen Solutions Ltd",
  shortName: "KGB NextGen",
  tagline: "Intelligence driven. Future ready.",
  siteUrl: resolveSiteUrl(),
  countryCode: "MU",
  email: null as string | null,
  brn: null as string | null,
  whatsapp: null as string | null,
  companyLinkedin: null as string | null,
  team: {
    kevin: {
      name: "Kevin GOOLJAR",
      linkedin: "https://www.linkedin.com/in/gooljar-kevin-20912951/",
      photo: "/team/kevin-gooljar.jpg",
    },
    diano: {
      name: "Diano ANDRIANTSALAMA",
      portfolio: "https://dians98.vercel.app",
      photo: "/team/diano-andriantsalama.webp",
    },
  },
} as const;

export type Site = typeof site;
