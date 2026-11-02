# Décisions — site de KGB NextGen Solutions Ltd

Validées par Diano le 2026-11-02 (séance de cadrage). Ce fichier fait foi ; un changement de décision s'écrit ici d'abord.

## Nature du site
- Portfolio **de l'entreprise** KGB NextGen Solutions Ltd, présentée comme un studio : services, projets, équipe, contact. Pas deux portfolios personnels côte à côte.
- Devise du logo, toujours en anglais : **« Intelligence driven. Future ready. »**
- Localisation affichée : **« Maurice »** seulement (pas d'adresse, BRN à ajouter quand Diano le fournit).

## Langues
- **Français par défaut** sur `/`, **anglais** sur `/en`, via next-intl. Bouton de langue visible.

## Structure
- Une page principale à ancres : Accueil, Services, Projets, Équipe, Contact.
- Pages de détail : `/projets/ifspa`, `/projets/heaven` (et leurs équivalents `/en/...`).

## Stack
- Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion, next-intl, Resend (formulaire), **pnpm**.
- Hébergement : Vercel. Dépôt : https://github.com/Dians98/KGB_NextGen

## Charte
- **Thème sombre uniquement** (v1), tiré du logo (`docs/brand/logo-source.png`).

| Rôle | Valeur | Origine dans le logo |
|---|---|---|
| Fond | `#05070F` | fond noir |
| Surface (cartes) | `#0B1224` | |
| Bleu nuit (marque) | `#0B2A7A` | « NextGen Solutions Ltd » |
| Bleu roi (primaire, boutons) | `#1F5BFF` | lettres « KGB » |
| Cyan (accent, liens, lueurs) | `#22C3FF` | biseau du K, circuits |
| Texte principal / lueur | `#E8F3FF` | points lumineux |
| Texte secondaire | `#8FA3C7` | |

- Le cyan reste un accent, jamais un aplat large. Contrastes WCAG 2.2 AA vérifiés avant validation.
- Typographie : **Sora** (titres), **Manrope** (texte), **JetBrains Mono** (touches techniques).
- Logo : PNG source détouré pour le hero ; **mini-logo SVG redessiné** (tête + circuits) pour l'en-tête et le favicon.

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

### Projets (statut « En cours »)
Chaque projet : badge « En cours », ce qui est livré, ce qui vient ensuite, lien vers le site en ligne. Les clients ont donné leur accord.
- **IFSPA** — https://ifspa.mg — gestion de l'écolage + vitrine d'un institut paramédical à Toamasina (Madagascar). Captures : vitrine publique en direct + maquettes validées par le client (`C:\wamp64\www\ifspa\prototype\captures\`). **Aucune vraie donnée d'étudiant.**
- **HAEVEN** — https://inhaeven.com — vitrine bilingue d'un studio créatif (Maurice / Estonie), design d'intérieur. Captures : page d'accueil en ligne, desktop et mobile.

### Équipe
- **Kevin GOOLJAR — Fondateur & Directeur.** Dirige l'entreprise, pilote les projets, suit les clients. Points forts : plus de 15 ans dans l'IT à Maurice ; opérations et pilotage par indicateurs ; certifications AWS SysOps et Siemens Teamcenter ; ex-Accenture, ex-LINKBYNET. **Ne pas nommer son employeur actuel.** Photo : `public/team/kevin-gooljar.jpg`. Lien LinkedIn. Détails : `docs/profils/kevin-gooljar.md`.
- **Diano ANDRIANTSALAMA — Lead Developer** (pas fondateur). Fiche sobre : rôle, plus de 3 ans d'expérience, stack, lien vers https://dians98.vercel.app. **Ne pas détailler son parcours ni les projets de son employeur actuel.** Photo : `public/team/diano-andriantsalama.webp`.

### Contact
- Formulaire envoyé par Resend, anti-spam simple (champ piège + 3 envois / 10 min), sans captcha.
- En attendant le domaine et l'email de l'entreprise : réception sur l'adresse de Diano, expéditeur de test Resend. Variables dans `.env.local`, jamais en dur.
- Aussi affichés : WhatsApp et LinkedIn.

## À trancher
Tant qu'un point n'est pas tranché, on utilise l'emplacement provisoire indiqué, sans inventer de valeur.

| Point | Qui tranche | Provisoire en attendant |
|---|---|---|
| Nom de domaine du site | Diano / Kevin | URL Vercel (`*.vercel.app`) ; `metadataBase` lu depuis une variable d'environnement |
| Email de l'entreprise (réception du formulaire, affichage) | Diano / Kevin | réception sur l'adresse de Diano, expéditeur de test Resend ; aucun email affiché |
| BRN (numéro d'enregistrement) | Kevin | non affiché |
| Fiche de Kevin (textes, « ex-Accenture, ex-LINKBYNET ») | Kevin | textes de `docs/profils/kevin-gooljar.md`, marqués « à valider » |
| Photo de Kevin en noir et blanc : on la garde telle quelle ou on la recolore aux couleurs de la marque ? | Diano | gardée telle quelle |
