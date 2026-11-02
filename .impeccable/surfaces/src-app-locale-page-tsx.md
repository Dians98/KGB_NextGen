---
version: 1
slug: "src-app-locale-page-tsx"
primary_target: "src/app/[locale]/page.tsx"
related_targets: []
---

# Accueil KGB NextGen (FR `/`, EN `/en`)

Mode : **Persuade**. Visiteur : dirigeant de PME à Maurice / océan Indien, souvent sur téléphone, ou prospect déjà en discussion qui vérifie le sérieux. Action : « Parler de votre projet » (formulaire de contact). Preuve : projets réels en cours (IFSPA, HAEVEN), équipe identifiable. Contraintes : charte fixe (docs/DECISIONS.md), pas de néon ni d'effets gadget, le logo et son univers dominent le premier écran.

Choix du 2026-11-02 : Diano a pris volontairement **le standard de la catégorie** (agence tech), à exécuter sans ironie ni bizarrerie glissée. Barre de finition : **Netguru** (clarté d'agence, services, études de cas) et **Raycast** (sombre, précis, finition produit, lueurs maîtrisées).

## Direction contract

THESIS : la page d'agence tech attendue — titre, logo, services, projets, équipe, contact — exécutée au niveau de Raycast et Netguru ; elle refuse le template bâclé (dégradés gratuits, cartes interchangeables, textes creux), pas la convention.

OWN-WORLD : fond `#05070F`, surfaces `#0B1224` à filet 1 px, bleu roi `#1F5BFF` pour l'action, cyan `#22C3FF` en accent rare (liens, nœuds lumineux) ; Sora en titres, Manrope en texte, JetBrains Mono pour les données ; motif : tracés de circuit à 45° et nœuds en anneau tirés du logo.

STORY : le visiteur comprend en 5 secondes que KGB construit des applications web, mobiles, des automatisations avec IA et configure Odoo depuis Maurice ; il croit qu'ils livrent en voyant deux projets réels en cours et deux personnes nommées ; il clique « Parler de votre projet ».

FIRST VIEWPORT : en-tête (mini-logo + « KGB NextGen », ancres, langue, bouton « Parler de votre projet ») ; grille 2 colonnes : à gauche titre Sora ~60 px, sous-titre, bouton primaire bleu roi + secondaire « Voir nos projets » ; à droite l'emblème KGB en grand, ses circuits qui s'allument une fois ; amorce des 4 services en bas du premier écran.

FORM : canon (standard de la catégorie), choisi par l'utilisateur ; aucune liste classée ; seed:8cd0354337924567.

FINISH : unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Non résolu
- Domaine, email de l'entreprise, BRN, WhatsApp / LinkedIn de contact, validation de la fiche de Kevin (voir docs/DECISIONS.md).
