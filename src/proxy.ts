import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Tout sauf /api, /_next, /_vercel et les fichiers (favicon.ico, robots.txt…).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
