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

/** Visite de la page d'accueil, rendue avec HyperFrames (sources dans videos/). Muette, en boucle. */
export type ProjectVideo = {
  id: string;
  mp4: string;
  webm: string | null;
  poster: string;
  width: number;
  height: number;
};

/** done : terminé (pas de « La suite ») ; progress : en cours, avec la clé Projects.<slug>.next. */
export type ProjectStatus = "done" | "progress";

export type Project = {
  slug: "ifspa" | "heaven";
  status: ProjectStatus;
  cover: Shot;
  /** Visite du site vitrine, à la place de captures ; null si le projet n'en montre pas. */
  video: ProjectVideo | null;
  shots: Shot[];
};

const homeVideo = (slug: string): ProjectVideo => ({
  id: `video-${slug}`,
  mp4: `/projets/${slug}/video-accueil.mp4`,
  webm: `/projets/${slug}/video-accueil.webm`,
  poster: `/projets/${slug}/video-accueil-poster.webp`,
  width: 1280,
  height: 720,
});

const shot = (slug: string, file: string, width: number, height: number, group: ShotGroup): Shot => ({
  src: `/projets/${slug}/${file}.webp`,
  width,
  height,
  group,
  key: file,
});

// IFSPA : seule l'application de gestion est présentée (pas le site vitrine).
const ifspaShots: Shot[] = [
  shot("ifspa", "app-tableau-de-bord", 1440, 1327, "app"),
  shot("ifspa", "app-encaissement-mobile-money", 1440, 1532, "app"),
  shot("ifspa", "app-encaissement-hors-ligne", 1440, 1294, "app"),
  shot("ifspa", "app-recu", 1440, 900, "app"),
  shot("ifspa", "app-impayes", 1440, 900, "app"),
  shot("ifspa", "app-mobile-encaissement", 780, 1688, "mobile"),
];

// HAEVEN : seule la vidéo de l'accueil est montrée ; la couverture (4:3) en est tirée.

export const projects: Project[] = [
  {
    slug: "ifspa",
    status: "done",
    cover: ifspaShots[0],
    video: null,
    shots: ifspaShots,
  },
  {
    slug: "heaven",
    status: "progress",
    cover: shot("heaven", "couverture", 1200, 900, "site"),
    video: homeVideo("heaven"),
    shots: [],
  },
];

export function getProject(slug: Project["slug"]): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Projet inconnu : ${slug}`);
  return project;
}
