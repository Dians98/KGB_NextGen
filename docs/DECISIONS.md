# Décisions — site de KGB NextGen Solutions Ltd

Validées par Diano le 2026-11-02 (séance de cadrage). Ce fichier fait foi ; un changement de décision s'écrit ici d'abord.

## Nature du site
- Portfolio **de l'entreprise** KGB NextGen Solutions Ltd, présentée comme un studio : services, projets, équipe, contact. Pas deux portfolios personnels côte à côte.
- Devise du logo, toujours en anglais : **« Intelligence driven. Future ready. »**
- Localisation affichée : **« Maurice »** seulement (pas d'adresse, BRN à ajouter quand Diano le fournit).

## Langues
- **Anglais par défaut** sur `/`, **français** sur `/fr`, via next-intl (inversé le 2026-11-05, demande de Diano). Bouton de langue visible.

## Structure
- Une page principale à ancres : Accueil, Services, Projets, Équipe, Contact.
- Pages de détail : `/projets/ifspa`, `/projets/heaven` (et leurs équivalents `/en/...`).

## Stack
- Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion, next-intl, Resend (formulaire), **pnpm**.
- Hébergement : Vercel. Dépôt : https://github.com/Dians98/KGB_NextGen
- i18n et cache (tâche 2.1, 2026-11-02) : on **garde `cacheComponents`**. La langue est lue avec `next/root-params` dans `src/i18n/request.ts`, `generateStaticParams` + `setRequestLocale` dans `src/app/[locale]/layout.tsx` ; `/` et `/en` sont prérendues en statique. `localeDetection: false`, mêmes slugs dans les deux langues.
- pnpm 11 : les scripts d'installation de `@parcel/watcher`, `@swc/core`, `sharp` et `unrs-resolver` sont refusés (`pnpm-workspace.yaml`).

## Charte
- **Thème sombre uniquement** (v1), tiré du logo (`docs/brand/logo-source.png`).

| Rôle | Valeur | Origine dans le logo |
|---|---|---|
| Fond | `#0A1226` (noir bleuté, choisi par Diano le 2026-11-02 ; avant `#05070F`) | fond du logo, adouci |
| Surface (cartes) | `#111C38` | |
| Bleu nuit (marque) | `#0B2A7A` | « NextGen Solutions Ltd » |
| Bleu roi (primaire, boutons) | `#1F5BFF` | lettres « KGB » |
| Cyan (accent, liens, lueurs) | `#22C3FF` | biseau du K, circuits |
| Texte principal / lueur | `#E8F3FF` | points lumineux |
| Texte secondaire | `#8FA3C7` | |

- Le cyan reste un accent, jamais un aplat large.
- Contrastes WCAG mesurés (2026-11-02) : texte `#E8F3FF` 17,9:1 ; secondaire `#8FA3C7` 7,9:1 ; cyan 9,9:1 ; blanc sur bouton bleu roi 5,3:1. **Bleu roi en texte sur le fond : 3,8:1** → seulement grands titres (≥ 24 px), contours et éléments d'interface, jamais du texte courant. **Bleu nuit `#0B2A7A` : 1,6:1** → décor uniquement.
- Typographie : **Sora** (titres), **Manrope** (texte), **JetBrains Mono** (touches techniques).
- Logo : **toujours le vrai logo** (`docs/brand/logo-source.png`), jamais une version redessinée (demande de Diano, 2026-11-02). En-tête et hero : `kgb-embleme.webp` détouré ; favicon et icône Apple : le « B » et la tête en circuits recadrés du vrai logo.

## Direction visuelle (validée le 2026-11-02, page de décision impeccable)
- Diano a choisi **le standard de la catégorie « agence tech »**, à exécuter avec une finition maximale, sans bizarrerie : en-tête, hero (titre à gauche, emblème KGB à droite avec circuits qui s'allument), services, projets, équipe, contact.
- **Barre de finition : Netguru** (clarté d'agence, études de cas) **et Raycast** (sombre, précis, lueurs maîtrisées).
- À éviter absolument : effets néon et gadgets ; template bâclé (dégradés gratuits, cartes interchangeables, textes creux).
- Le logo et son univers dominent le premier écran.
- Contrat de direction : `.impeccable/surfaces/src-app-locale-page-tsx.md` (seed:8cd0354337924567). Esquisse retenue : `.impeccable/mocks/decision/canon.html`.

## Animation (« tech IT, mais pas trop »)
- Oui : pistes de circuit SVG qui s'allument dans le hero (reprises du logo), apparitions douces au défilement, lueur qui suit la souris sur les cartes projets, au plus une ligne de terminal tapée ou un compteur.
- Non : 3D/WebGL, défilement détourné, curseur personnalisé.
- `prefers-reduced-motion` coupe toutes les animations.

## Contenu
### Services (uniquement ceux de Diano)
1. **Applications web full-stack** — interface en React, Next.js et TypeScript, back-end en Node.js ou FastAPI avec PostgreSQL.
2. **Applications mobiles et PWA** — React Native et PWA pour iOS et Android.
3. **Automatisation et IA** — connecter les outils (CRM, formulaires, bases de données) avec n8n, enrichis par l'IA (assistants, traitement de documents) pour supprimer les tâches répétitives. Ne rien promettre au-delà de ce qui est livré.
4. **Configuration Odoo et ERP** — CRM, comptabilité, inventaire et ventes, intégration aux outils existants.

Présentation (2026-11-02) : grille 2 × 2 de cartes, sans capture (demande de Diano). Chaque carte se termine par du concret : technologies (web, mobile), les étapes expliquées d'un workflow n8n, Trigger → n8n → IA → Résultat, avec une impulsion animée (automatisation), les quatre modules (Odoo).

### Projets
Chaque projet : badge de statut, ce qui est livré, et pour un projet en cours ce qui vient ensuite. **IFSPA : terminé** (2026-11-02, badge « Terminé », pas de bloc « La suite ») ; **HAEVEN : en cours**. Titre de section : « Nos projets ». Les clients ont donné leur accord.
- **IFSPA** — https://ifspa.mg — gestion de l'écolage + vitrine d'un institut paramédical à Toamasina (Madagascar). Captures : vitrine publique en direct + maquettes validées par le client (`C:\wamp64\www\ifspa\prototype\captures\`). **Aucune vraie donnée d'étudiant.**
- **HAEVEN** — https://inhaeven.com — vitrine bilingue d'un studio créatif (Maurice ; ne pas mentionner l'Estonie sur le site, demande de Diano), design d'intérieur. Captures : page d'accueil en ligne, desktop et mobile.

### Équipe
- **Kevin GOOLJAR — Fondateur & Directeur.** Dirige l'entreprise, pilote les projets, suit les clients. Points forts : plus de 15 ans dans l'IT à Maurice ; opérations et pilotage par indicateurs ; certifications AWS SysOps et Siemens Teamcenter ; ex-Accenture, ex-LINKBYNET. **Ne pas nommer son employeur actuel.** Photo : `public/team/kevin-gooljar.jpg`. Lien LinkedIn. Détails : `docs/profils/kevin-gooljar.md`.
- **Diano ANDRIANTSALAMA — Lead Developer** (pas fondateur). Fiche sobre : rôle, plus de 3 ans d'expérience, stack, lien vers https://dians98.vercel.app. **Ne pas détailler son parcours ni les projets de son employeur actuel.** Photo : `public/team/diano-andriantsalama.webp`.

Présentation (2026-11-02) : deux cartes de même hauteur, bouton CV aligné en bas ; sur mobile, la photo passe au-dessus du nom.

### Contact
- Formulaire envoyé par Resend, anti-spam simple (champ piège + 3 envois / 10 min), sans captcha.
- En attendant le domaine et l'email de l'entreprise : réception sur l'adresse de Diano, expéditeur de test Resend. Variables dans `.env.local`, jamais en dur.
- Aussi affichés : WhatsApp et LinkedIn.
- Sélecteur de langue à **drapeaux** (France pour le français, Royaume-Uni pour l'anglais), drapeaux en SVG (demande de Diano).

## Ressources prêtes (étape 3)
### Logo — `public/brand/`
- `kgb-embleme.{png,webp}` : « KGB + tête », fond transparent, lueurs conservées. **Pour fond sombre uniquement** (les parties sombres deviennent transparentes).
- `kgb-logo-complet.{png,webp}` : emblème + « NextGen Solutions Ltd » + devise. Le texte « NextGen » est bleu nuit : peu lisible sur le fond, à doubler par du vrai texte HTML.
- Favicons (`src/app/icon.png`, `favicon.ico`, `apple-icon.png`) : « B » + tête en circuits recadrés du vrai logo. Le mini-logo redessiné a été supprimé.

### Projets — `public/projets/`
- **HAEVEN en vidéo** (demande de Diano, 2026-11-02) : vidéo muette d'environ 20 s de la page d'accueil, filmée en temps réel (animations comprises) et montée avec HyperFrames. Fichiers `video-accueil.mp4`, `video-accueil.webm` et `video-accueil-poster.webp`, en 1280 px. Commandes natives du navigateur. Lecture automatique en boucle quand la vidéo est à l'écran, sauf si le visiteur l'a mise en pause ; aucune lecture automatique avec « réduire les animations ». Sources et méthode : `videos/README.md`.
- **IFSPA : site vitrine retiré** (demande de Diano, 2026-11-02) : le projet ne présente plus que l'application de gestion de l'écolage, ni vidéo ni capture du site, ni mention de ifspa.mg. La vidéo montée reste dans `videos/ifspa-accueil/`, non publiée.
- **Captures cliquables** : chaque capture s'ouvre en grand dans une visionneuse (fenêtre modale native), avec sa légende, un compteur, les flèches ← → et la fermeture par Échap ou par un clic sur le fond.
- **IFSPA, application** (maquettes validées par le client, données fictives) : on garde les captures `app-tableau-de-bord`, `app-encaissement-mobile-money`, `app-encaissement-hors-ligne`, `app-recu`, `app-impayes` et `app-mobile-encaissement`, sans légende de groupe. `app-tableau-de-bord` sert de couverture à la carte projet.
- **HAEVEN** (build local `C:\Projets\HAEVEN\out`, version FR, car inhaeven.com affiche encore la page « Site en construction » d'OVH) :
  - la vidéo seule, sans capture ;
  - la couverture de la carte (`couverture.webp`, 4:3) est la section « Trois façons d'entrer », tirée de l'enregistrement ;
  - on ne montre jamais les sections Portfolio et Univers, qui contiennent encore des textes provisoires (« [NOM DU PROJET] ») ;
  - aucun lien « voir le site » tant que inhaeven.com n'est pas déployé.

## Mises à jour du 2026-11-02 (après la première version)
- Accroche du hero : FR « Vos outils métier, de l'idée à la mise en ligne. » / EN « Your business tools, from idea to launch. »
- Accroche de l'équipe : FR « Les personnes derrière vos projets. » / EN « The people behind your projects. »
- Aucun lien « Voir le site en ligne » sur les projets (ni IFSPA ni HAEVEN).
- Équipe : bouton « Télécharger le CV » (PDF) à la place des liens LinkedIn / portfolio. CV unifiés dans `public/cv/` (sources : `docs/cv-sources/`), **employeurs inclus** (choix de Diano) ; le CV de Kevin est construit d'après LinkedIn, à faire valider par Kevin.
- Hero en plein écran (100 svh) avec fond animé « réseau de circuits vivant » (canvas : impulsions cyan sur les pistes, nœuds qui s'allument près de la souris).
- Animations inspirées de HAEVEN : titre mot par mot, sortie du hero au défilement, cascades, images en rideau, en-tête réactif.
- Titres de section dans une couleur d'accent, décorés d'un tiret + nœud de circuit (demande explicite de Diano).
- Thème clair essayé puis **abandonné** : site en sombre uniquement, sur un **noir bleuté `#0A1226`** (surface `#111C38`, filets `#1E2A4A`, contours de champs `#5A6EA0`). Contrastes : texte 16,6:1, secondaire 7,3:1, cyan 9,2:1, contours 3,7:1, blanc sur bleu roi 5,3:1.
- SEO : titre d'accueil raccourci ; `areaServed` = Maurice, Madagascar ; `og:locale` anglais en `en_GB` ; **pas de fiche Google Business**.
- À faire par Diano et Kevin : choisir le domaine, puis `SITE_INDEXABLE=true` en production ; Google Search Console + sitemap ; page LinkedIn de l'entreprise (URL à mettre dans `site.companyLinkedin`).

## À trancher
Tant qu'un point n'est pas tranché, on utilise l'emplacement provisoire indiqué, sans inventer de valeur.

| Point | Qui tranche | Provisoire en attendant |
|---|---|---|
| Nom de domaine du site | Diano / Kevin | URL Vercel (`*.vercel.app`) ; `metadataBase` lu depuis une variable d'environnement |
| Email de l'entreprise (réception du formulaire, affichage) | Diano / Kevin | réception sur l'adresse de Diano, expéditeur de test Resend ; aucun email affiché |
| BRN (numéro d'enregistrement) | Kevin | non affiché |
| Fiche de Kevin (textes, « ex-Accenture, ex-LINKBYNET ») | Kevin | textes de `docs/profils/kevin-gooljar.md`, marqués « à valider » |
| Photo de Kevin en noir et blanc : on la garde telle quelle ou on la recolore aux couleurs de la marque ? | Diano | gardée telle quelle |

### Mises à jour du 2026-11-05 (demandes de Diano)
- **Marque** : « NextGen Solutions » est mis en avant plutôt que « KGB ». Hero : emblème KGB réduit, « NextGen Solutions » en grand sur une seule ligne, sans « Ltd » (« NextGen » en cyan). En-tête : le nom « NextGen Solutions » suit l'emblème dès 640 px. Le nom légal reste « KGB NextGen Solutions Ltd » (pied de page, métadonnées).
- **Services** : Docker et l'administration open source sont intégrés à la carte Web (texte + étiquette Docker), sans carte supplémentaire ; on garde quatre cartes.
- **Projets** : titre « Nos récents projets » / « Our recent projects ».
- **Kevin** : « Ancien d'Accenture, ancien de Linkbynet » / « Former Accenture, former Linkbynet ».
- **Contact** : téléphone de l'entreprise **+230 553 66 553**, joignable aussi sur WhatsApp ; affiché sous l'accroche de la section Contact (lien d'appel + lien WhatsApp), lien WhatsApp aussi dans le pied de page, numéro dans les données structurées.
