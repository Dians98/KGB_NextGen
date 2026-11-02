# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primaires** : dirigeants et responsables de PME à **Maurice** qui ont besoin d'une application, d'une automatisation ou d'un ERP, et qui cherchent un prestataire fiable.
- **Aussi** : organisations de l'**océan Indien et de Madagascar** (comme IFSPA, institut de formation à Toamasina) et **clients internationaux** qui externalisent du développement (comme HAEVEN, studio basé à Maurice).
- Situation : ils découvrent KGB par recommandation, LinkedIn ou recherche, souvent sur téléphone ; certains arrivent après un premier échange et viennent vérifier le sérieux de l'entreprise.

## Product Purpose

Site vitrine de **KGB NextGen Solutions Ltd**, entreprise IT basée à Maurice. Il présente les services, les projets en cours et l'équipe, et amène le visiteur à demander un projet.

Succès, à parts égales :
1. **Demandes de projet** via le formulaire de contact.
2. **Crédibilité** : rassurer un prospect déjà en discussion (projets réels, équipe identifiable, faits vérifiables).

## Positioning

- **Tout sous un même toit** : applications web et mobiles, automatisation (n8n + IA) et configuration Odoo réunies ; un seul interlocuteur pour l'outil et pour les processus qu'il sert.
- **Sur mesure pour le terrain** : des outils pensés pour l'usage réel (mobile, connexion lente, mode hors ligne), comme l'application d'encaissement d'IFSPA.
- **Rigueur d'exploitation** : un fondateur avec plus de 15 ans d'opérations IT à Maurice (pilotage par indicateurs, suivi, support) ; on livre et on tient dans la durée.

## Operating Context

- Visiteurs francophones et anglophones : **français par défaut** (`/`), **anglais** sur `/en`.
- Une page principale (Accueil, Services, Projets, Équipe, Contact) et une page par projet (`/projets/ifspa`, `/projets/heaven`).
- Contact : formulaire (Resend, anti-spam simple), WhatsApp et LinkedIn.

## Capabilities and Constraints

- Services proposés (uniquement ceux-ci) : applications web full-stack ; applications mobiles et PWA ; automatisation et IA (n8n) ; configuration Odoo et ERP.
- Équipe : **Kevin GOOLJAR, Fondateur & Directeur** ; **Diano ANDRIANTSALAMA, Lead Developer** (pas fondateur).
- Ne jamais nommer l'employeur actuel de Kevin ni celui de Diano.
- Localisation affichée : « Maurice » seulement.
- À trancher (voir `docs/DECISIONS.md`) : nom de domaine, email de l'entreprise, BRN, validation de la fiche de Kevin.

## Brand Commitments

- Nom : **KGB NextGen Solutions Ltd**. Devise du logo, toujours en anglais : **« Intelligence driven. Future ready. »**
- Logo existant : `docs/brand/logo-source.png` (tête de profil en circuits imprimés, lettres KGB).
- Le site doit paraître **tech et intelligent, animé et interactif, mais sobre et simple à utiliser** (exigence de Diano).
- Voix : directe, concrète, sans jargon creux ; mêmes idées en français et en anglais, pas une traduction mot à mot.
- Forme choisie par Diano (2026-11-02) : la mise en page **standard d'une agence tech**, exécutée au niveau de finition de **Netguru** et **Raycast**. Pas de néon ni de gadget.

## Evidence on Hand

- **IFSPA** (https://ifspa.mg, en cours) : gestion de l'écolage + vitrine d'un institut paramédical à Toamasina. Maquettes validées par le client : `C:\wamp64\www\ifspa\prototype\captures\`. Accord du client pour figurer au portfolio. Aucune vraie donnée d'étudiant ne doit apparaître.
- **HAEVEN** (https://inhaeven.com, en cours) : vitrine bilingue d'un studio créatif ; accueil et Services livrés. Accord du client.
- Profils : `docs/profils/kevin-gooljar.md` ; portfolio de Diano https://dians98.vercel.app (source locale `C:\Projets\portfolio`).
- Photos : `public/team/kevin-gooljar.jpg`, `public/team/diano-andriantsalama.webp`.
- **Absents, à ne pas inventer** : témoignages, logos clients, chiffres (nombre de clients, taux de satisfaction), prix, certifications de l'entreprise.

## Product Principles

1. **La preuve avant la promesse** : un projet réel, une capture ou un fait vérifiable remplace chaque adjectif.
2. **Le contact à un geste** : depuis n'importe quel endroit, le visiteur peut demander un projet.
3. **Sobre sous la technologie** : l'animation sert l'impression « tech » sans jamais gêner la lecture ni la navigation.
4. **Deux langues, un seul niveau de qualité** : rien n'existe en français sans exister en anglais.
5. **Rien d'inventé** : pas de faux chiffres, clients ou témoignages ; un manque reste un emplacement « à compléter ».

## Accessibility & Inclusion

WCAG 2.2 AA. Respect de `prefers-reduced-motion` (toutes les animations coupées). Lisible et utilisable sur téléphone avec une connexion lente.
