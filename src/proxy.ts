import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Tout sauf /api, /_next, /_vercel et les fichiers (favicon.ico, robots.txt…).
  // /fr/opengraph-image est l'URL que Next écrit dans og:image : sans exclusion, next-intl la redirige (307).
  matcher: "/((?!api|_next|_vercel|fr/opengraph-image|.*\\..*).*)",
};
