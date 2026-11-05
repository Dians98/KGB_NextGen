@AGENTS.md

# KGB NextGen Solutions Ltd — site vitrine

Portfolio de l'entreprise : services, projets en cours (IFSPA, HAEVEN), équipe (Kevin GOOLJAR, Diano ANDRIANTSALAMA), contact.

## Références (dans cet ordre)
1. `docs/DECISIONS.md` — décisions validées (contenu, charte, animation, langues). Fait foi.
2. `PRODUCT.md` et `DESIGN.md` — écrits par impeccable (`/impeccable init`, `/impeccable document`).
3. `docs/PLAN.md` — découpage des tâches (produit par l'agent `planner`).
4. `docs/profils/` — profils sources de l'équipe.

## Règles
- **pnpm**, jamais npm. Scripts : `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`.
- Next.js 16 : lire `node_modules/next/dist/docs/` avant d'écrire du code Next.
- Couleurs uniquement via les tokens de `src/app/globals.css`, jamais en dur dans un composant.
- Anglais par défaut (`/`), français sur `/fr` (depuis le 2026-11-05) ; tout texte visible passe par les fichiers de messages next-intl.
- Ne rien inventer : chiffres, clients, témoignages, certifications viennent de `docs/` ou de Diano.
- Secrets dans `.env.local` (jamais commité). Écrire les fichiers avec Write/Edit, pas avec PowerShell `Set-Content` (BOM).
- Agents du projet : `planner` (découpage), `frontend-builder` (UI), `seo-specialist` (référencement), plus les agents impeccable.
