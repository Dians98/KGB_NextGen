# Plan de construction — site vitrine KGB NextGen Solutions Ltd (v1)

> Produit par l'agent `planner` le 2026-11-02. Source de vérité : `docs/DECISIONS.md`. Cocher les tâches au fil de l'avancement.

**Contexte.** Site vitrine bilingue (FR sur `/`, EN sur `/en`) de KGB NextGen Solutions Ltd (Maurice). Il présente les services, les projets en cours (IFSPA, HAEVEN), l'équipe et un formulaire de contact. Stack : Next.js 16.4.3, React 19.3, Tailwind CSS 4, Motion, next-intl, Resend, zod, pnpm, Vercel.

**État au 2026-11-02 (3 commits sur `main`, remote `Dians98/KGB_NextGen`).** Le scaffold create-next-app est intact (`src/app/page.tsx`, `globals.css` avec thème clair, polices Geist, `lang="en"`). `next.config.ts` active `cacheComponents` et `partialPrefetching`. Aucune dépendance métier n'est installée.

**Déjà prêt.** Logos dans `public/brand/` (`kgb-embleme`, `kgb-logo-complet`), favicons tirés du vrai logo dans `src/app/` (`icon.png`, `favicon.ico`, `apple-icon.png`), photos dans `public/team/`, captures dans `public/projets/ifspa/` (12) et `public/projets/heaven/` (5), profil de Kevin dans `docs/profils/kevin-gooljar.md`, `PRODUCT.md`. Il manque `DESIGN.md` (écrit à l'étape 9).

Référence de code, à ne pas copier tel quel : `C:\Projets\portfolio` (`components/sections/*`, `app/api/contact/route.ts`, `lib/mail.ts`).

---

## Points « À trancher » : emplacements provisoires

| Point | Emplacement provisoire | Tâches concernées |
|---|---|---|
| Nom de domaine | `NEXT_PUBLIC_SITE_URL` (URL `*.vercel.app`), lue par `metadataBase`, `sitemap.ts`, `robots.ts` et le JSON-LD via `src/config/site.ts`. Aucun domaine écrit en dur. | 1.5, 8.x, 10.x |
| Email de l'entreprise | Réception via `CONTACT_TO_EMAIL` (adresse exacte du compte Resend de Diano), expéditeur via `CONTACT_FROM_EMAIL` (`onboarding@resend.dev` par défaut). `site.email = null` : aucun email affiché, pas d'`email` dans le JSON-LD. | 1.5, 7.3, 8.3 |
| BRN | `site.brn = null` : rien dans le pied de page ni dans le JSON-LD. Le composant n'affiche le BRN que s'il est renseigné. | 4.5, 8.3 |
| Fiche de Kevin | Textes repris de `docs/profils/kevin-gooljar.md` dans `messages/*.json` (clés `Team.kevin.*`). La liste des clés « à valider » est tenue dans `docs/DECISIONS.md` (le JSON n'accepte pas de commentaires). INSYNIUM n'apparaît jamais. | 5.6, 10.3 |
| Photo de Kevin en N&B | `public/team/kevin-gooljar.jpg` gardée telle quelle, sans filtre CSS. | 5.6 |
| **Hors DECISIONS** : numéro WhatsApp et lien LinkedIn de la section Contact | `site.whatsapp = null` et `site.companyLinkedin = null` : les liens sont masqués tant que la valeur vaut `null`. Le numéro trouvé dans le portfolio de Diano n'est pas repris sans accord. | 5.7, 4.5, 8.3 |

## Questions bloquantes (globales)
1. **WhatsApp** : quel numéro afficher (entreprise, Kevin ou Diano) ? **LinkedIn** dans Contact : une page entreprise existe-t-elle, ou faut-il pointer vers le profil de Kevin ? Ces questions bloquent l'affichage, pas la construction : les emplacements valent `null` en attendant.
2. **Mise en production publique** avant que Kevin ait validé sa fiche (dont « ex-Accenture, ex-LINKBYNET » et la certification Teamcenter X) ? Cela bloque 10.3.
3. **Indexation de l'URL `*.vercel.app` provisoire** : faut-il indexer dès maintenant, ou attendre le domaine ? Provisoire : pas d'indexation (`SITE_INDEXABLE` absent), ce qui bloque 8.2 et 10.3.

Questions non bloquantes (valeur par défaut retenue) :
- Slugs anglais : `/en/projets/ifspa`, sans chemins localisés, conformément à « leurs équivalents `/en/...` ».
- Détection de langue : `localeDetection: false`, pour que `/` reste en français quelle que soit la langue du navigateur.

Légende des drapeaux : 🎨 écran/section · 🌐 SEO · 🌍 bilingue · ✨ animation · 📨 formulaire · 🖼️ média.

---

## Étape 1 — Configuration de base
Prérequis manquants : aucun
Questions bloquantes : aucune

| # | Tâche (< ½ journée) | Fichiers | Critère de fin testable | Drapeaux | Exécutant |
|---|---|---|---|---|---|
| 1.1 | Installer `next-intl motion resend zod`. Vérifier sur Context7 que la version de next-intl gère Next 16 et `proxy.ts`. Garder la configuration `allowBuilds` de pnpm. | `package.json`, `pnpm-lock.yaml` | `pnpm install` sans erreur, les 4 paquets sont dans `dependencies`, `pnpm typecheck` passe | — | principal |
| 1.2 | Supprimer le contenu par défaut : `src/app/page.tsx` (remplacé à l'étape 2) et `public/{file,globe,next,vercel,window}.svg`. Garder `icon.svg`, `favicon.ico` et `apple-icon.png`. | `src/app/`, `public/` | `grep -ri "create next app\|geist\|vercel.svg" src` ne renvoie rien, `pnpm build` passe | — | principal |
| 1.3 | Poser les tokens de la charte dans `globals.css` avec `@theme` : fond, surface, bleu nuit, bleu roi, cyan, texte, texte secondaire, plus `color-scheme: dark` et un anneau de focus cyan. Supprimer `prefers-color-scheme` et le thème clair. Ajouter une règle globale `@media (prefers-reduced-motion: reduce)` qui neutralise animations, transitions et `scroll-behavior`. | `src/app/globals.css` | Les classes `bg-bg`, `text-fg`, etc. compilent. Aucun hex dans `src/**/*.tsx` (`grep -rnE "#[0-9a-fA-F]{6}" src --include=*.tsx` ne renvoie rien). Aucun thème clair. | 🎨 | principal |
| 1.4 | Charger Sora (titres), Manrope (texte) et JetBrains Mono via `next/font/google`, exposés en `--font-display`, `--font-sans` et `--font-mono` (subset `latin`, `display: swap`). | `src/app/fonts.ts`, `globals.css` | `pnpm build` passe. Dans DevTools > Réseau, aucune requête vers `fonts.googleapis.com` (polices auto-hébergées). | — | principal |
| 1.5 | Créer la config du site : `siteUrl` lu depuis `NEXT_PUBLIC_SITE_URL`, avec repli sur `VERCEL_PROJECT_PRODUCTION_URL` puis `http://localhost:3000`. Liens : LinkedIn de Kevin (repris de `docs/profils/kevin-gooljar.md`), `https://dians98.vercel.app`, `ifspa.mg`. Champs `whatsapp`, `companyLinkedin`, `email` et `brn` à `null`. Créer `.env.example` (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `SITE_INDEXABLE`). Ajouter `!.env.example` dans `.gitignore`, car `.env*` l'ignore aujourd'hui. | `src/config/site.ts`, `.env.example`, `.gitignore` | `git check-ignore .env.example` ne renvoie rien, `git check-ignore .env.local` renvoie le chemin, `pnpm typecheck` passe | — | principal |

Risques : la règle Turbopack `@tailwindcss/turbopack` de `next.config.ts` est atypique. Il faut vérifier que les tokens `@theme` sont bien générés après 1.3, avec `pnpm dev` puis `pnpm build`.

---

## Étape 2 — Internationalisation (next-intl)
Prérequis manquants : aucun
Questions bloquantes : aucune (valeurs par défaut : `localeDetection: false`, mêmes slugs dans les deux langues)

| # | Tâche (< ½ journée) | Fichiers | Critère de fin testable | Drapeaux | Exécutant |
|---|---|---|---|---|---|
| 2.1 | Vérifier la compatibilité de next-intl avec `cacheComponents: true` (Context7 next-intl, plus `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md` et `02-guides/internationalization.md`). Choisir entre `setRequestLocale` avec `generateStaticParams`, et le retrait de `cacheComponents`. Consigner le choix dans `docs/DECISIONS.md`. | `next.config.ts`, `docs/DECISIONS.md` | Choix écrit. `pnpm build` ne signale aucune erreur « uncached data outside Suspense ». | — | principal |
| 2.2 | Écrire `routing.ts` (`locales: ['fr','en']`, `defaultLocale: 'fr'`, `localePrefix: 'as-needed'`, `localeDetection: false`), `request.ts`, `navigation.ts` (`Link`, `usePathname`, `useRouter`, `getPathname`) et `src/proxy.ts`, avec un matcher qui exclut `api`, `_next`, `_vercel` et les fichiers à extension. Brancher `createNextIntlPlugin` dans `next.config.ts` sans casser la règle Turbopack. Lire d'abord `03-api-reference/03-file-conventions/proxy.md`. | `src/i18n/*`, `src/proxy.ts`, `next.config.ts` | `/` renvoie 200 en FR sans redirection, `/en` renvoie 200 en EN, `/fr` redirige vers `/`, `/de` renvoie 404 | 🌍 | principal |
| 2.3 | Passer la racine sous `src/app/[locale]/` : `layout.tsx` (`<html lang={locale}>`, polices, `NextIntlClientProvider`, `generateStaticParams`, `notFound()` pour une langue inconnue), une `page.tsx` provisoire et `not-found.tsx`. Supprimer `src/app/layout.tsx` et `src/app/page.tsx`. | `src/app/[locale]/*` | Le code source de `/` contient `<html lang="fr">`, celui de `/en` contient `lang="en"`. La sortie de `pnpm build` marque `/` et `/en` comme statiques. | 🌍 | principal |
| 2.4 | Squelette de `messages/fr.json` et `messages/en.json`. Espaces de noms : `Metadata`, `Nav`, `LocaleSwitcher`, `Hero`, `Services`, `Projects`, `ProjectIfspa`, `ProjectHeaven`, `Team`, `Contact`, `ContactForm`, `Footer`, `NotFound`. Typage `AppConfig` (Messages = `fr.json`). Script `pnpm check:i18n` qui compare les clés des deux fichiers. Activer `react/jsx-no-literals` dans ESLint, avec une exception pour la devise si elle passe aussi par les messages. | `messages/*.json`, `src/global.d.ts`, `scripts/check-messages.mjs`, `package.json`, `eslint.config.mjs` | `pnpm check:i18n` échoue si on retire une clé de `en.json`. `pnpm typecheck` échoue sur une clé inexistante. `pnpm lint` passe. | 🌍 | principal |

Risques : sous `cacheComponents`, next-intl peut lire les en-têtes et rendre les pages dynamiques. La tâche 2.1 tranche ce point avant toute section.

---

## Étape 3 — Direction visuelle (impeccable, flux new-work, mode Persuade)
Prérequis manquants : aucun
Questions bloquantes : validation de Diano en fin de 3.2 (point de contrôle)

| # | Tâche (< ½ journée) | Fichiers | Critère de fin testable | Drapeaux | Exécutant |
|---|---|---|---|---|---|
| 3.1 | Lancer impeccable new-work en mode Persuade à partir de `PRODUCT.md` et de la charte de `DECISIONS.md`. Proposer au plus 2 pistes : échelle typographique, grille et espacements, rayons, traitement des surfaces et des lueurs (le cyan reste un accent), style des circuits, composition du hero avec `public/brand/kgb-embleme.webp`, et l'éventuelle ligne de terminal (une seule ; pas de compteur, faute de chiffre validé). Ni 3D, ni défilement détourné, ni curseur personnalisé. | maquettes dans le dossier scratchpad, pas dans `src/` | Pistes présentées à Diano avec un rendu desktop et mobile du hero et d'une carte projet | 🎨 ✨ | principal (skill impeccable) |
| 3.2 | Recueillir la validation de Diano et reporter la direction retenue dans `docs/DECISIONS.md` (section « Direction visuelle »). | `docs/DECISIONS.md` | Validation écrite de Diano, section ajoutée | — | principal |
| 3.3 | Traduire la direction en tokens : échelle typographique, espacements, rayons, lueurs (ombres à base de cyan ou de bleu roi), durées et courbes d'animation (≤ 500 ms). | `src/app/globals.css` | Tokens nommés présents, aucune couleur hors charte, `pnpm build` passe | — | principal |
| 3.4 | Composants de base : `Button` (primaire bleu roi avec texte blanc, secondaire en contour, lien), `Badge` (« En cours »), `Container`, `Section` (avec `id` et `scroll-margin-top`), `SectionHeading`. Visiteur : tous ; ils doivent reconnaître l'action principale au premier coup d'œil. | `src/components/ui/*` | Rendu sur la page provisoire en desktop et mobile. Focus visible au clavier. Bleu roi jamais utilisé en texte courant (règle des 3,8:1). axe : 0 violation. | 🎨 | frontend-builder |

Risques : sans validation à 3.2, les sections seront à refaire. L'étape 5 ne démarre pas avant cette validation.

---

## Étape 4 — Mise en page et socle d'animation
Prérequis manquants : étape 3 validée
Questions bloquantes : aucune (WhatsApp et LinkedIn masqués tant qu'ils valent `null`)

| # | Tâche (< ½ journée) | Fichiers | Critère de fin testable | Drapeaux | Exécutant |
|---|---|---|---|---|---|
| 4.1 | Socle Motion : `MotionConfig reducedMotion="user"` dans le layout, composant `Reveal` (apparition au défilement, `once`, déplacement de 12 px au plus, ≤ 400 ms). Jamais de `Reveal` sur le contenu au-dessus de la ligne de flottaison du hero. | `src/components/motion/*`, `src/app/[locale]/layout.tsx` | Avec « prefers-reduced-motion: reduce » émulé dans DevTools, rien ne bouge et tout reste visible. CLS = 0 sur la page provisoire. | ✨ | frontend-builder |
| 4.2 | En-tête desktop : vrai logo `kgb-embleme.webp` (« KGB NextGen » en sr-only), navigation à ancres (`#accueil`, `#services`, `#projets`, `#equipe`, `#contact`, identiques dans les deux langues, libellés traduits) via le `Link` de next-intl, pour que les ancres fonctionnent aussi depuis les pages projets. Bouton « Parler de votre projet » vers `#contact`. En-tête collant. Lien d'évitement « Aller au contenu ». Visiteur : prospect sur ordinateur ; il doit pouvoir rejoindre le contact en un clic depuis n'importe où. | `src/components/layout/site-header.tsx`, `src/components/brand/logo.tsx` | Depuis `/projets/ifspa`, « Services » mène à `/#services`. Le lien d'évitement est le premier arrêt de Tab. Rendu desktop vérifié. | 🎨 🌍 | frontend-builder |
| 4.3 | Menu mobile : bouton `aria-expanded` et `aria-controls`, fermeture par Échap et au clic sur un lien, focus rendu au bouton, pas de défilement de fond bloqué inutilement. | `src/components/layout/mobile-nav.tsx` | À 360 px : ouverture et fermeture au clavier, focus correct, aucun défilement horizontal | 🎨 🌍 ✨ | frontend-builder |
| 4.4 | Sélecteur de langue : vrais liens (`Link` avec la prop `locale` et `hrefLang`), page courante conservée, `aria-current` sur la langue active, libellés « Français » et « English ». | `src/components/layout/locale-switcher.tsx` | Sur `/projets/ifspa`, « English » mène à `/en/projets/ifspa`, et inversement. Fonctionne sans JavaScript. | 🎨 🌍 | frontend-builder |
| 4.5 | Pied de page : « KGB NextGen Solutions Ltd · Maurice » (EN : « Mauritius »), devise « Intelligence driven. Future ready. » toujours en anglais, année, navigation, liens LinkedIn et WhatsApp seulement s'ils sont renseignés, BRN seulement s'il est renseigné. | `src/components/layout/site-footer.tsx` | Avec la config actuelle, aucun lien `null` rendu ni BRN affiché. Textes présents dans les deux fichiers de messages. Contraste conforme selon axe. | 🎨 🌍 | frontend-builder |

Risques : un en-tête collant masque les titres ciblés par les ancres ; `scroll-margin-top` est exigé dans `Section` (3.4).

---

## Étape 5 — Sections de la page principale
Prérequis manquants : étapes 3 et 4
Questions bloquantes : textes de la fiche de Kevin (provisoire : profil marqué « à valider »)

| # | Tâche (< ½ journée) | Fichiers | Critère de fin testable | Drapeaux | Exécutant |
|---|---|---|---|---|---|
| 5.1 | Hero, structure : `h1` (ce que fait KGB), sous-titre, CTA principal vers `#contact`, CTA secondaire vers `#projets`, emblème `public/brand/kgb-embleme.webp` en `next/image` chargé en priorité (vérifier la prop dans la doc `next/image` de Next 16), « NextGen Solutions Ltd » et la devise en vrai texte HTML. Visiteur : dirigeant de PME sur téléphone ; il doit comprendre en 5 secondes ce que KGB construit et où cliquer pour en parler. | `src/components/sections/hero.tsx` | Rendu desktop et mobile. L'élément LCP est le `h1` ou l'emblème, sans opacité initiale à 0. Textes FR et EN présents. | 🎨 🌍 🖼️ | frontend-builder |
| 5.2 | Circuits SVG animés : tracés repris du logo (`docs/brand/logo-source.png`, `kgb-embleme.webp`), allumage progressif (`pathLength` avec Motion ou `stroke-dashoffset` en CSS) une seule fois, points lumineux cyan, SVG en `aria-hidden` et dimensions fixes. Avec mouvement réduit, l'état final s'affiche directement. Ligne de terminal unique seulement si retenue à 3.2. | `src/components/sections/hero-circuits.tsx` | CLS = 0. Aucune tâche longue de plus de 50 ms due à l'animation (onglet Performance). Avec mouvement réduit émulé, tracés statiques. | ✨ 🎨 | frontend-builder |
| 5.3 | Services : 4 cartes, uniquement les services de `DECISIONS.md` (web full-stack, mobile et PWA, automatisation et IA avec n8n, Odoo et ERP), sans rien promettre au-delà ; icônes SVG en ligne ; apparition via `Reveal`. Visiteur : prospect ; il doit trouver son besoin dans l'une des 4 cartes et savoir qu'un seul interlocuteur couvre tout. | `src/components/sections/services.tsx`, `src/components/icons/*` | Exactement 4 services. Rendu desktop et mobile. Textes FR et EN. Titres en ordre logique (`h2` puis `h3`). | 🎨 🌍 ✨ | frontend-builder |
| 5.4 | Projets : section et `ProjectCard` avec badge « En cours », résumé, « livré » et « à venir » en une ligne chacun, lien interne « Voir le projet ». Image IFSPA : `app-tableau-de-bord.webp` ou `site-agrements.webp`, **jamais `site-accueil.webp`**. Image HAEVEN : `accueil.webp`. Lien externe `ifspa.mg` ; **aucun lien externe pour HAEVEN**. Visiteur : prospect déjà en discussion ; il doit voir deux projets réels en cours et ouvrir le détail. | `src/components/sections/projects.tsx`, `src/components/projects/project-card.tsx` | Rendu desktop et mobile. `grep -rn "inhaeven.com" src` ne trouve que des données inactives (`liveUrl: null`). Attributs `sizes` renseignés. | 🎨 🌍 🖼️ | frontend-builder |
| 5.5 | Lueur qui suit la souris sur les cartes projets : variables CSS mises à jour au `pointermove`, active seulement si `(pointer: fine)` et sans mouvement réduit, sans re-rendu React à chaque mouvement. | `src/components/projects/project-card.tsx` | Aucun effet au toucher ni avec mouvement réduit. Pas de baisse de fluidité (Performance, 60 fps). | ✨ | frontend-builder |
| 5.6 | Équipe. **Kevin GOOLJAR, Fondateur & Directeur** : `public/team/kevin-gooljar.jpg` gardée en N&B ; plus de 15 ans d'IT à Maurice, opérations et pilotage par indicateurs, certifications AWS SysOps et Siemens Teamcenter, ex-Accenture, ex-LINKBYNET ; lien LinkedIn. **Diano ANDRIANTSALAMA, Lead Developer** : `public/team/diano-andriantsalama.webp`, plus de 3 ans d'expérience, stack, lien vers `https://dians98.vercel.app`. Visiteur : prospect qui vérifie le sérieux ; il doit voir deux personnes identifiables avec un rôle clair. | `src/components/sections/team.tsx` | `grep -ri "insynium" src messages` ne renvoie rien. Diano n'est jamais qualifié de fondateur (`grep -ri "fondat\|founder"` ne pointe que Kevin). Les `alt` sont traduits. Rendu desktop et mobile. | 🎨 🌍 🖼️ | frontend-builder |
| 5.7 | Section Contact (cadre) : titre, accroche, emplacement du formulaire (étape 7), liens WhatsApp et LinkedIn rendus seulement si renseignés, aucun email affiché. Visiteur : prospect décidé ; il doit pouvoir écrire tout de suite, sans chercher. | `src/components/sections/contact.tsx` | Avec la config actuelle, aucun lien vide. Rendu desktop et mobile. Textes FR et EN. | 🎨 🌍 | frontend-builder |
| 5.8 | Assemblage de `[locale]/page.tsx` : ordre Accueil, Services, Projets, Équipe, Contact, avec `id` stables ; `scroll-behavior: smooth` seulement sans mouvement réduit. | `src/app/[locale]/page.tsx` | Chaque ancre de l'en-tête mène à la bonne section dans les deux langues. `pnpm build` passe. `pnpm check:i18n` passe. | 🌍 | frontend-builder |

Risques :
- Photo de Kevin en N&B face à une photo de Diano en couleur : contraste visuel assumé (décision provisoire).
- `kgb-logo-complet` contient un « NextGen » bleu nuit illisible : il faut toujours le doubler en HTML ou préférer `kgb-embleme`.

---

## Étape 6 — Pages projets
Prérequis manquants : étape 5 (cartes et composants)
Questions bloquantes : aucune

| # | Tâche (< ½ journée) | Fichiers | Critère de fin testable | Drapeaux | Exécutant |
|---|---|---|---|---|---|
| 6.1 | Données des projets : slug, `liveUrl` (`https://ifspa.mg` pour IFSPA, `null` pour HAEVEN), liste de captures (chemin, largeur, hauteur, groupe vitrine / application / mobile, clé d'`alt`, clé de légende). Les dimensions sont lues sur les fichiers de `public/projets/`. | `src/content/projects.ts` | `pnpm typecheck` passe. Chaque capture listée existe (`ls`). Le `liveUrl` de HAEVEN vaut `null`. | 🖼️ | principal |
| 6.2 | Gabarit de page projet : retour à l'accueil, titre et badge « En cours », contexte, « Livré », « À venir », galerie (`figure` avec `figcaption`, `next/image` et `sizes`, pas de visionneuse en v1), lien externe seulement si `liveUrl` existe, CTA vers le contact. Visiteur : prospect venu de la carte ; il doit voir concrètement ce qui a été livré, puis être invité à parler de son projet. | `src/components/projects/project-page.tsx`, `src/components/projects/gallery.tsx` | Rendu desktop et mobile. Aucun CLS sur la galerie (largeur et hauteur fixées). Navigation clavier dans la page. | 🎨 🌍 🖼️ | frontend-builder |
| 6.3 | `/projets/ifspa` : captures `site-agrements`, `site-filieres`, `site-institut`, `site-contact`, `site-mobile` (`site-accueil` jamais en tête, car photo d'illustration), puis `app-tableau-de-bord`, `app-encaissement-mobile-money`, `app-encaissement-hors-ligne`, `app-recu`, `app-impayes`, `app-mobile-encaissement`, avec la légende « Maquettes validées par le client (données fictives) ». Lien `https://ifspa.mg`. Vérifier chaque capture à l'œil : **aucune vraie donnée d'étudiant**. | `src/app/[locale]/projets/ifspa/page.tsx`, `messages/*.json` | `/projets/ifspa` et `/en/projets/ifspa` renvoient 200 et sont statiques au build. Contrôle visuel des 12 captures consigné. | 🎨 🌍 🖼️ | frontend-builder |
| 6.4 | `/projets/heaven` : captures `accueil`, `intro`, `univers` (section « Notre monde », sans texte provisoire), `cta` et `mobile`, avec la légende « Version de travail, avant mise en ligne ». **Aucun lien vers inhaeven.com.** Aucune capture des sections Portfolio ou Univers comportant « [NOM DU PROJET] ». | `src/app/[locale]/projets/heaven/page.tsx`, `messages/*.json` | Les deux langues renvoient 200. `grep -rn "inhaeven" src/app src/components` ne renvoie rien. Aucun « [NOM » visible sur les captures. | 🎨 🌍 🖼️ | frontend-builder |

Risques : les captures de HAEVEN viennent d'un build local et peuvent diverger du site final ; il faudra les reprendre une fois inhaeven.com déployé.

---

## Étape 7 — Formulaire de contact
Prérequis manquants : `RESEND_API_KEY` et adresse exacte du compte Resend de Diano dans `.env.local` (Diano)
Questions bloquantes : aucune (provisoire : réception chez Diano, expéditeur de test)

| # | Tâche (< ½ journée) | Fichiers | Critère de fin testable | Drapeaux | Exécutant |
|---|---|---|---|---|---|
| 7.1 | Schéma zod partagé : nom (1 à 100 caractères), email, entreprise (facultative, 150 au plus), message (20 à 5000), champ piège `website`. Les erreurs renvoient des clés i18n, jamais du texte. | `src/lib/contact/schema.ts` | Tests manuels via `pnpm tsx` ou un petit script : les cas invalides renvoient les clés attendues. `pnpm typecheck` passe. | 📨 🌍 | principal |
| 7.2 | Limite de débit : 3 envois par 10 minutes et par IP (`x-forwarded-for` via `headers()`), `Map` en mémoire avec purge. La limite est connue : un compteur par instance. | `src/lib/contact/rate-limit.ts` | Le 4ᵉ appel en moins de 10 minutes renvoie `rate_limited`, et l'envoi repasse après l'expiration de la fenêtre (horloge simulée) | 📨 | principal |
| 7.3 | Server Action `'use server'` (lire `02-guides/forms.md`). Dans l'ordre : champ piège rempli, faux succès sans envoi ; limite de débit ; `safeParse` ; envoi Resend avec un client instancié à l'appel, `from` = `CONTACT_FROM_EMAIL`, `to` = `CONTACT_TO_EMAIL`, `replyTo` = email du visiteur, sujet sans retour à la ligne, texte échappé. Résultat typé `{ status, fieldErrors }`. Aucun secret dans les journaux. | `src/app/[locale]/actions/contact.ts`, `src/lib/contact/mail.ts` | Un envoi réel est reçu sur l'adresse de Diano. Champ piège rempli : aucun email. Sans `RESEND_API_KEY`, le build passe et l'action renvoie `error`. | 📨 | principal |
| 7.4 | Interface `ContactForm` (client, `useActionState`) : labels visibles, `aria-invalid` et `aria-describedby`, région `role="status"` pour le succès et `role="alert"` pour les erreurs, bouton désactivé avec libellé « Envoi… », états vide, erreur de champ, envoi, succès, échec réseau et limite atteinte. Champ piège masqué visuellement, avec `tabIndex={-1}` et `autoComplete="off"`. Le formulaire fonctionne sans JavaScript (attribut `action`). Visiteur : prospect décidé ; il doit envoyer sa demande en moins d'une minute et savoir qu'elle est partie. | `src/components/contact/contact-form.tsx` | Les 6 états vérifiés en FR et en EN. Formulaire parcourable entièrement au clavier. Erreurs annoncées par un lecteur d'écran (NVDA). Rendu à 360 px. | 🎨 📨 🌍 | frontend-builder |

Risques :
- `onboarding@resend.dev` ne livre qu'à l'adresse exacte du compte Resend (piège Gmail avec ou sans points, déjà rencontré dans `C:\Projets\portfolio\lib\mail.ts`).
- La limite en mémoire n'est pas partagée entre les instances Vercel. C'est accepté en v1 (DECISIONS). Si le spam devient réel, passer à un stockage partagé, ce qui demande une nouvelle décision.

---

## Étape 8 — SEO
Prérequis manquants : `NEXT_PUBLIC_SITE_URL` (URL Vercel, connue après 10.1 ; `localhost` en attendant)
Questions bloquantes : indexation de l'URL provisoire (question globale 3)

| # | Tâche (< ½ journée) | Fichiers | Critère de fin testable | Drapeaux | Exécutant |
|---|---|---|---|---|---|
| 8.1 | `metadataBase` depuis `site.siteUrl`. `generateMetadata` par langue pour l'accueil et chaque page projet : modèle de titre, description tirée de `Metadata.*`, `alternates.canonical` et `alternates.languages` (`fr`, `en`, `x-default` vers la version FR), Open Graph (`locale`, `alternateLocale`) et carte Twitter. | `src/app/[locale]/layout.tsx`, `page.tsx`, `projets/*/page.tsx` | Chaque page sert un canonical absolu et des `hreflang` fr, en et x-default réciproques (code source vérifié sur les 6 URL) | 🌐 🌍 | seo-specialist |
| 8.2 | `robots.ts` : tout autoriser seulement si `SITE_INDEXABLE === 'true'` et `VERCEL_ENV === 'production'`, sinon `Disallow: /`. `sitemap.ts` : 6 URL (`/`, `/en`, `/projets/ifspa`, `/en/projets/ifspa`, `/projets/heaven`, `/en/projets/heaven`) avec `alternates.languages`. | `src/app/robots.ts`, `src/app/sitemap.ts` | `/robots.txt` et `/sitemap.xml` répondent. En local, `Disallow: /`. Le sitemap liste les 6 URL avec leurs alternates. | 🌐 | seo-specialist |
| 8.3 | JSON-LD sur l'accueil : `Organization` (nom, url, logo `/icon.png` (vrai logo), `address.addressCountry: MU`, `founder` vers une `Person` Kevin, `sameAs` seulement pour les valeurs renseignées) et `Person` Diano (`jobTitle: Lead Developer`, `worksFor`). Ni email, ni téléphone, ni BRN tant que non tranchés. `BreadcrumbList` sur les pages projets. | `src/components/seo/json-ld.tsx` | Le validateur schema.org ne remonte aucune erreur. Pas de `email`, `telephone` ni `taxID` dans le JSON. | 🌐 | seo-specialist |
| 8.4 | `opengraph-image.tsx` par langue (`ImageResponse`, 1200 × 630, fond et accents de la charte, mini-logo, nom, devise). Couleurs importées d'un fichier `src/config/brand-colors.ts`, miroir documenté des tokens : c'est l'exception assumée à la règle des tokens, car `ImageResponse` ne lit pas les variables CSS. Police Sora chargée en fichier. | `src/app/[locale]/opengraph-image.tsx`, `src/config/brand-colors.ts` | `/opengraph-image` et `/en/opengraph-image` renvoient une image PNG de 1200 × 630 avec le texte dans la bonne langue | 🌐 🖼️ 🌍 | seo-specialist |

Risques : tant que le domaine n'est pas choisi, un passage de `vercel.app` au domaine définitif impose des redirections 301 et un changement de `NEXT_PUBLIC_SITE_URL` (étape 10.4).

---

## Étape 9 — Vérifications finales et finitions
Prérequis manquants : étapes 1 à 8
Questions bloquantes : aucune

| # | Tâche (< ½ journée) | Fichiers | Critère de fin testable | Drapeaux | Exécutant |
|---|---|---|---|---|---|
| 9.1 | Contrôles automatiques. | — | `pnpm lint`, `pnpm typecheck`, `pnpm check:i18n` et `pnpm build` passent sans erreur ni avertissement de dépréciation Next | — | principal |
| 9.2 | Garde-fous de contenu : employeurs actuels absents (INSYNIUM ; celui de Diano jamais nommé), Diano jamais fondateur, aucun thème clair, aucun chiffre, témoignage ou logo client inventé, aucun hex dans les composants (exception : `brand-colors.ts`), aucun texte en dur (`react/jsx-no-literals`). | `src/`, `messages/` | Commandes `grep` du plan sans résultat. Relecture des deux fichiers de messages : mêmes idées, sans traduction mot à mot. | 🌍 | principal |
| 9.3 | Audit accessibilité : parcours complet au clavier (lien d'évitement, menu mobile, sélecteur de langue, formulaire), contrastes, zoom à 200 %, largeur de 320 px, `alt` de toutes les images, mouvement réduit émulé sur tout le site. Corrections incluses. | composants concernés | axe : 0 violation sur les 6 URL. Aucun défilement horizontal à 320 px. Aucun mouvement avec `reduce`. | 🎨 ✨ | frontend-builder |
| 9.4 | `impeccable audit`, puis `impeccable polish`, puis application des corrections retenues par Diano. | composants concernés | Rapport d'audit traité. Diano valide le rendu final en desktop et mobile. | 🎨 | frontend-builder (agent impeccable-finish-reviewer pour l'audit) |
| 9.5 | Rédiger `DESIGN.md` avec `impeccable document`, à partir du code final (tokens, composants, animations, règles de contraste). | `DESIGN.md` | Le fichier existe et ses tokens correspondent à `globals.css` | — | principal (agent impeccable-documenter) |
| 9.6 | Lighthouse mobile sur l'URL de prévisualisation (`/`, `/en`, `/projets/ifspa`). | — | Performance ≥ 90, Accessibilité ≥ 95, Bonnes pratiques ≥ 95, LCP < 2,5 s, CLS < 0,1. Le SEO est mesuré hors `noindex` (le blocage de `robots` sur l'aperçu est attendu). | ✨ 🖼️ | principal |

Risques :
- `pnpm-workspace.yaml` met `sharp: false`, donc `next start` en local peut mal optimiser les images. Mesurer Lighthouse sur Vercel, pas en local.
- Les captures en 1440 px pèsent lourd sur mobile : vérifier `sizes` à 9.6.

---

## Étape 10 — Déploiement sur Vercel
Prérequis manquants : accès Vercel relié au GitHub `Dians98/KGB_NextGen`, clé Resend (Diano)
Questions bloquantes : mise en ligne publique avant la validation de Kevin (question 2), indexation (question 3)

| # | Tâche (< ½ journée) | Fichiers | Critère de fin testable | Drapeaux | Exécutant |
|---|---|---|---|---|---|
| 10.1 | Créer le projet Vercel sur `Dians98/KGB_NextGen`, détection de pnpm 11.3 (`packageManager` ; activer Corepack si besoin). Variables Production et Preview : `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL` (= `https://<projet>.vercel.app`), et `SITE_INDEXABLE` laissée vide. | Vercel, `README.md` (section variables) | Build de prévisualisation vert. `README.md` liste les variables, sans aucune valeur. | — | principal |
| 10.2 | Recette sur la prévisualisation : envoi réel du formulaire, limite de débit, champ piège, 6 URL dans les deux langues, `hreflang`, image OG (LinkedIn Post Inspector), page 404, `robots.txt` en `Disallow`. | — | Grille de recette remplie, aucun défaut ouvert | 📨 🌐 | principal |
| 10.3 | Mise en production sur l'URL `*.vercel.app`, après réponse aux questions 2 et 3 ; `SITE_INDEXABLE=true` seulement si l'indexation est validée. | Vercel | L'URL de production répond. La fiche de Kevin est validée, ou la mise en ligne est explicitement acceptée « à valider ». | 🌐 | principal |
| 10.4 | (Après décision sur le domaine, hors v1) Ajouter le domaine dans Vercel, mettre à jour `NEXT_PUBLIC_SITE_URL`, rediriger `vercel.app` vers le domaine en 301, vérifier le domaine dans Resend, passer `CONTACT_FROM_EMAIL` et `CONTACT_TO_EMAIL` sur les adresses de l'entreprise, mettre à jour `docs/DECISIONS.md`. | Vercel, Resend, `docs/DECISIONS.md` | Le canonical et le sitemap pointent vers le domaine. Un email de test part depuis le domaine vérifié. | 🌐 📨 | principal |

Risques : la version 11 de pnpm peut ne pas être prise en charge par défaut sur Vercel, ce qui fait échouer l'installation ; vérifier dans le journal de build de 10.1.

---

## Risques transverses
1. **`cacheComponents` avec next-intl** : des pages rendues dynamiques ou des erreurs de build sont possibles. La tâche 2.1 tranche ce point avant toute UI.
2. **Next 16 diffère des connaissances habituelles** (`proxy.ts`, props de `next/image`, métadonnées) : lire `node_modules/next/dist/docs/` avant chaque tâche Next (règle d'`AGENTS.md`).
3. **Contenu non validé** (fiche de Kevin) : des textes provisoires risquent d'être publiés. Les clés concernées sont listées dans DECISIONS, et 10.3 est conditionnée.
4. **Données personnelles** : `site-accueil.webp` d'IFSPA est une photo d'illustration, et les maquettes doivent rester fictives. Contrôle visuel en 6.3.
5. **HAEVEN** : aucun lien externe tant que le site n'est pas déployé. Vérifié par `grep` en 6.4 et en 9.2.
6. **Animations** : le LCP et le CLS sont exposés si le hero démarre en opacité 0 ou si le SVG n'a pas de dimensions fixes. Critères en 4.1 et 5.2.
7. **`.env.example` ignoré** par la règle `.env*` de `.gitignore` : corrigé en 1.5.
