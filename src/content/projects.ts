// Projets présentés (docs/DECISIONS.md). Textes dans messages/*.json sous Projects.<slug>.*
// Dimensions relevées sur les fichiers de public/projets/.

export type ShotGroup = "site" | "app" | "mobile";

export type Shot = {
  src: string;
  width: number;
  height: number;
  group: ShotGroup;
  /** Clé sous Projects.<slug>.shots */
  key: string;
};

export type Project = {
  slug: "ifspa" | "heaven";
  /** null tant que le site n'est pas en ligne : aucun lien affiché. */
  liveUrl: string | null;
  cover: Shot;
  shots: Shot[];
};

const shot = (slug: string, file: string, width: number, height: number, group: ShotGroup): Shot => ({
  src: `/projets/${slug}/${file}.webp`,
  width,
  height,
  group,
  key: file,
});

// site-accueil et site-mobile (IFSPA) sont volontairement absents : photo d'illustration d'une autre école.
const ifspaShots: Shot[] = [
  shot("ifspa", "app-tableau-de-bord", 1440, 1327, "app"),
  shot("ifspa", "app-encaissement-mobile-money", 1440, 1532, "app"),
  shot("ifspa", "app-encaissement-hors-ligne", 1440, 1294, "app"),
  shot("ifspa", "app-recu", 1440, 900, "app"),
  shot("ifspa", "app-impayes", 1440, 900, "app"),
  shot("ifspa", "app-mobile-encaissement", 780, 1688, "mobile"),
  shot("ifspa", "site-agrements", 1440, 450, "site"),
  shot("ifspa", "site-filieres", 1440, 900, "site"),
  shot("ifspa", "site-institut", 1440, 900, "site"),
  shot("ifspa", "site-contact", 1440, 840, "site"),
];

// Portfolio et Univers de HAEVEN contiennent encore des textes provisoires : non capturés.
const heavenShots: Shot[] = [
  shot("heaven", "accueil", 1440, 900, "site"),
  shot("heaven", "intro", 1440, 900, "site"),
  shot("heaven", "univers", 1440, 900, "site"),
  shot("heaven", "cta", 1440, 900, "site"),
  shot("heaven", "mobile", 780, 1688, "mobile"),
];

export const projects: Project[] = [
  {
    slug: "ifspa",
    liveUrl: "https://ifspa.mg",
    cover: ifspaShots[0],
    shots: ifspaShots,
  },
  {
    slug: "heaven",
    liveUrl: null,
    cover: heavenShots[0],
    shots: heavenShots,
  },
];

export function getProject(slug: Project["slug"]): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Projet inconnu : ${slug}`);
  return project;
}
