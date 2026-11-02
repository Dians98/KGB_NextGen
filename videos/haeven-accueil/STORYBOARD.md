---
format: 1920x1080
duration: 19.6s
message: "Montrer la page d'accueil du site HAEVEN telle qu'elle est"
arc: Demo Loop (site tour) — hero → manifeste → trois façons d'entrer → appel à l'action → retour au hero (boucle)
audience: visiteurs de la page projet HAEVEN sur le site KGB NextGen Solutions
mode: autonomous
music: none
---

## Montage actuel (v2 — enregistrement temps réel)

Demande de Diano : « fais en sorte que les animations apparaissent bien dans les vidéos ». Le montage sur plaque fixe décrit plus bas (plans 01/02, `compositions/frames/`) est **remplacé** et n'est plus référencé par `index.html` (fichiers conservés). `index.html` monte directement l'enregistrement `enregistrement/brut.mp4` (Chrome, 1920×1080, 30 i/s CFR, muet ; 624 images, 20,8 s) en deux clips vidéo gérés par le framework, sans rien par-dessus, sans zoom ni accélération :

- **Clip A** (piste 0) : `data-start 0`, `data-duration 13.29`, `data-media-start 0.105` → images #3 à #401. Les images #0–#2 (reste figé du préchauffage) sont écartées ; #3 est le hero vide au début de son entrée (titre mot à mot, vidéo de fond, étincelles), puis défilement vers « Chez Haeven… » (révélation des mots) et « Trois façons d'entrer. ».
- **Coupe** : le défilement rapide #402 → #419 traverse Portfolio et Univers (textes provisoires « [NOM DU PROJET] », « [SÉRIE PHOTO] », « [TITRE DE CHANSON] ») : coupé.
- **Clip B** (piste 1) : `data-start 12.89`, `data-duration 6.71`, `data-media-start 14.005` → images #420 à la fin (fin du défilement d'arrivée, puis « Une idée à transformer ? » sous l'en-tête). Fondu enchaîné de 0,4 s (12,89 → 13,29) pendant lequel A tient encore « Trois façons ».
- **Boucle** : `assets/haeven-rec-debut.png` (= image #3 extraite de l'enregistrement) revient en fondu de 18,9 à 19,5 s ; la dernière image est identique à la première, l'entrée du hero se rejoue.
- Durée totale : 19,6 s (aucune image figée ajoutée, hors la tenue de 0,1 s de l'image de boucle).

## Video direction

- **Nature** — show-it-as-is : une visite muette de la page d'accueil FR de HAEVEN, sans aucun texte ajouté, sans carte de fin, sans habillage KGB. La seule matière visuelle est la capture réelle du site. `frame.md` (preset cartesian, remixé sur les couleurs HAEVEN) ne sert que de garde-fou de sobriété : aucun élément graphique n'est ajouté par-dessus la capture.
- **Assets (dérivés de la capture, coordonnées en pixels du document à 1x, 1920 de large)** :
  - `assets/haeven-plate.png` — 1920×5518, la page entière en coordonnées document. Lignes 0–1080 = `capture/screenshots/scroll-000.png` (hero réel avec l'en-tête transparent) ; lignes 1080–5518 = `capture/screenshots/full-page.png` décalée de 85 px (la capture pleine page ajoutait une bande d'en-tête cassée de 85 px en haut ; retirée).
  - `assets/haeven-header-top.png` — 1920×77, bande haute de `scroll-000.png` : l'en-tête transparent (logo + menu blancs) posé sur le hero.
  - `assets/haeven-header-fg.png` — 1920×76 RGBA, premier plan détouré de l'en-tête « défilé » (logo HAEVEN, menu, bouton « Démarrer un projet », EN/FR) ; fond transparent.
  - `assets/haeven-hero.png` — 1920×1080, identique à `scroll-000.png` (= première image de la vidéo).
- **Le rig « viewport »** (identique dans les deux plans) : un calque plein cadre `overflow:hidden` contient `haeven-plate.png` en `position:absolute; top:0; left:0; width:1920px; height:5518px`, déplacé uniquement par `y = -scrollY` (GSAP, transform-only). Au-dessus, l'en-tête fixe du site, reconstitué : (1) une barre `top:0; left:0; width:1920px; height:76px` avec `background: rgba(244,242,238,0.70)` et `backdrop-filter: blur(18px)` (verre dépoli mesuré sur les captures), (2) un filet 1px à `top:76px` en `rgba(226,222,213,0.9)`, (3) `haeven-header-fg.png` à `top:0; left:0` (1920×76). Ces trois éléments forment un groupe « en-tête défilé » dont seule l'opacité s'anime.
- **Grammaire de mouvement** — un seul mouvement : le défilement vertical de la page (`viewport-change`, pan vertical pur, échelle 1, jamais de zoom : la plaque est en 1x). Les trajets se font en `power2.inOut` (un vrai défilement de navigateur, doux aux deux bouts), suivis de tenues **parfaitement immobiles** (pas de dérive, pas de respiration, pas de jitter). Aucun autre élément ne bouge.
- **Rythme** — trois tenues longues et immobiles (hero, manifeste, trois façons) puis l'appel à l'action ; le plan 02 se termine par un fondu vers l'image exacte du début pour une boucle `<video loop>` sans saut.
- **Liste négative** — aucun texte, logo, carte de fin ou habillage ajouté ; pas de zoom au-delà de 1x ; jamais visibles : sections Portfolio (« Design d'intérieur », « [NOM DU PROJET] ») et Univers (« [SÉRIE PHOTO] », « [TITRE DE CHANSON] », « [TITRE DU TEXTE] ») — elles sont coupées ; pas de curseur ; pas de rebond ; pas de slideshow ni d'effet « économiseur d'écran ». Aucune mention de pays.
- **Bande de sous-titres** — sans objet (vidéo muette, pas de sous-titres) ; la capture est un fond plein cadre, la règle des 83 % ne s'applique pas à la plaque elle-même.

## Frame 1 — Le haut de page

- scene: Défilement réel de la page d'accueil HAEVEN, du hero « Bienvenue chez HAEVEN » au manifeste puis aux trois façons d'entrer
- voiceover: ""
- duration: 13s
- poster: 1s
- transition_in: cut
- status: animated
- src: compositions/frames/01-haut-de-page.html
- type: product_intro
- persuasion: Show-don't-tell proof
- beat: curiosity + calm
- blueprint: compose
- asset_candidates: assets/haeven-plate.png — la page entière en coordonnées document (1920×5518); assets/haeven-header-top.png — en-tête transparent sur le hero (1920×77); assets/haeven-header-fg.png — premier plan détouré de l'en-tête défilé (1920×76)
- focal: assets/haeven-plate.png
- roles: haeven-plate = background (plein cadre, NON assombri : c'est le sujet) · haeven-header-top = supporting (fixe, top 0) · haeven-header-fg = supporting (fixe, top 0, avec la barre dépolie)

narrativeRole: poser le site tel qu'il est, avec son hero et son manifeste, puis ses trois portes d'entrée.
keyMessage: HAEVEN, un studio de design d'intérieur au site calme et éditorial.

Compose (pan vertical sur la plaque, `viewport-change`). Valeurs exactes (scrollY en px document) :
Scene 1 (0.0–2.4s): plaque à scrollY 0 — le hero « Bienvenue chez HAEVEN » plein cadre, en-tête transparent visible via `haeven-header-top.png` (opacité 1, top 0). Groupe « en-tête défilé » à opacité 0. Image parfaitement immobile (c'est aussi la dernière image de la vidéo : point de boucle).
Scene 2 (2.4–4.3s): défilement 0 → 1004 (`power2.inOut`, 1.9s). Au début du défilement, 2.4–2.75s : `haeven-header-top.png` passe 1 → 0 et le groupe « en-tête défilé » 0 → 1 (`power1.out`) — l'en-tête du site devient dépoli comme sur le vrai site.
Scene 3 (4.3–7.2s): tenue immobile à scrollY 1004 : « Chez Haeven, nous sommes designers dans l'âme. » et son paragraphe, le titre « Trois façons d'entrer. » en bas.
Scene 4 (7.2–8.9s): défilement 1004 → 1677 (`power2.inOut`, 1.7s).
Scene 5 (8.9–13.0s): tenue immobile à scrollY 1677 : « Notre monde — Trois façons d'entrer. » et les trois cartes Services / Boutique / Univers. Rien ne bouge jusqu'à la fin (le fondu vers le plan 2 est injecté par le harnais).

## Frame 2 — L'appel à l'action et le retour

- scene: Arrivée sur « Une idée à transformer ? » et son bouton, puis fondu vers le hero pour boucler
- voiceover: ""
- duration: 7s
- poster: 3s
- transition_in: crossfade 0.6s
- status: animated
- src: compositions/frames/02-appel-final.html
- type: cta
- persuasion: Friction reduction
- beat: ease + invitation
- blueprint: compose
- asset_candidates: assets/haeven-plate.png — la page entière en coordonnées document (1920×5518); assets/haeven-header-fg.png — premier plan détouré de l'en-tête défilé (1920×76); assets/haeven-hero.png — l'image exacte du hero en haut de page (1920×1080), première image de la vidéo
- focal: assets/haeven-plate.png
- roles: haeven-plate = background (plein cadre, non assombri) · haeven-header-fg = supporting (fixe, top 0, avec la barre dépolie) · haeven-hero = background (plein cadre, au-dessus de tout, fondu final)

narrativeRole: finir sur l'invitation du site, puis revenir au début pour que la boucle soit invisible.
keyMessage: une idée à transformer — le site invite à démarrer un projet.

Compose (pan vertical court + fondu de boucle). Les sections Portfolio et Univers sont volontairement coupées entre les deux plans.
Scene 1 (0.0–0.9s): groupe « en-tête défilé » à opacité 1 dès t=0. Plaque : défilement d'arrivée 4398 → 4418 (`power2.out`, 0.9s), pendant le fondu d'entrée injecté (0–0.6s). Le bloc bleu commence juste sous l'en-tête (ligne 4495 de la plaque − 77 px d'en-tête), sans bande sombre : la section bleue « Une idée à transformer ? » avec son bouton « Démarrer un projet », et le haut du pied de page.
Scene 2 (0.9–5.6s): tenue immobile à scrollY 4418 sur l'appel à l'action.
Scene 3 (5.6–6.8s): `haeven-hero.png` (plein cadre, au-dessus de la plaque ET de l'en-tête) passe de l'opacité 0 à 1 (`sine.inOut`, 1.2s) — retour au hero.
Scene 4 (6.8–7.0s): `haeven-hero.png` à opacité 1, immobile : l'image finale est identique à la première image du plan 1 (boucle sans saut). C'est le dernier plan : ce fondu est sa sortie autorisée.
