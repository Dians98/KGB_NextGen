import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Tout sauf /api, /_next, /_vercel et les fichiers (favicon.ico, robots.txt…).
  // /en/opengraph-image est l'URL que Next écrit dans og:image pour la langue par défaut :
  // sans exclusion, next-intl la redirige (307). /fr/opengraph-image est exclue par symétrie.
  matcher: "/((?!api|_next|_vercel|(?:en|fr)/opengraph-image|.*\\..*).*)",
};
