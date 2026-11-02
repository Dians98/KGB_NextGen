// Ancres identiques en FR et EN ; `/#…` garde les liens valides depuis les pages projets.
export const navItems = [
  { key: "home", href: "/#accueil" },
  { key: "services", href: "/#services" },
  { key: "projects", href: "/#projets" },
  { key: "team", href: "/#equipe" },
  { key: "contact", href: "/#contact" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];
