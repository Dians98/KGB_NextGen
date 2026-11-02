---
format: 1920x1080
duration: 20s
message: "Montrer la page d'accueil du site vitrine de l'IFSPA (ifspa.mg) telle qu'elle est"
arc: Site tour — descente de la page d'accueil, haut → bas, puis retour au début (boucle)
audience: visiteurs de la page projet IFSPA sur le site de KGB NextGen Solutions
music: none
mode: autonomous
---

## Montage actuel — enregistrement temps réel (remplace les plans « plaque » ci-dessous)

Demande de Diano : « fais en sorte que les animations apparaissent bien dans les vidéos ». La vidéo
est désormais montée dans `index.html` (montage à la main, non régénéré par `assemble-index`) à
partir de l'enregistrement Chrome temps réel `enregistrement/brut.mp4` (1920×1080, 30 i/s, muet),
lu à vitesse 1, sans texte, sans incrustation, sans zoom. Les plans 01–03 ci-dessous et
`compositions/frames/*.html` sont conservés mais ne sont plus référencés (ancien index :
`.hyperframes/index-plaque.html`).

| Clip | Vidéo finale | Source brut.mp4 | Contenu |
|---|---|---|---|
| A1 | 0,00–11,60 s | 0,00–11,60 s | entrée du hero, « Un institut… » + compteurs (valeurs finales à 4,87 s), « Nos filières », Sage-femmes |
| A2 | 11,60–14,40 s | 12,20–15,00 s | coupe franche invisible dans l'arrêt immobile sur Sage-femmes (−0,6 s), puis Admission |
| B | 14,00–20,00 s | 15,34–21,34 s | fondu 0,4 s (14,0–14,4) masquant le saut ; B commence à la 1re image entièrement rendue après le saut (n=460) ; Agréments (révélation), Nous contacter |
| boucle | 19,50–19,95 s | image n=0 | fondu vers la 1re image de l'enregistrement (`assets/ifspa-premiere-image.png`) |

La section Galerie n'entre jamais dans le cadre (bas du cadre blanc vérifié image par image jusqu'à
la source 15,03 s ; les images 452–459, à moitié rendues après le saut, ne sont pas utilisées).

## Video direction

- **Source unique : la capture réelle.** Chaque plan fait défiler la même plaque
  `assets/full-page.png` (1920 × 7309 px, échelle 1:1, pleine largeur) derrière un viewport
  1920 × 1080. Aucun texte ajouté, aucun habillage, aucune carte de fin, aucun logo KGB : l'identité
  visuelle est celle du site capturé. `frame.md` ne sert qu'au fond de secours (canvas) ; il ne
  fournit aucun texte.
- **Caméra = une seule plaque translatée verticalement** (`viewport-change`, forme mono-wrapper :
  la caméra descend → la plaque monte, `translateY(-camY)`). `camY` est l'offset du haut du
  viewport dans la plaque, en px. Pas de zoom (échelle 1 constante : la plaque n'a pas de marge
  au-delà de 1x), pas de translation horizontale, pas de rotation.
- **Grammaire de mouvement :** défilements sur courbe longue et douce (`power3.inOut` ou
  équivalent), jamais de rebond ni de dépassement. Entre deux défilements : arrêt **parfaitement
  immobile** (aucune respiration, aucune dérive, aucun jitter — c'est une capture d'écran, la
  lecture prime).
- **Rythme :** hero traversé vite (≈0,4 s d'arrêt puis départ) ; arrêts longs (2,5–3,5 s) sur
  « Un institut… » + « L'IFSPA en chiffres », « Nos filières », « Agréments officiels » et
  « Nous contacter » ; Admission traversée vite ; Galerie sautée entièrement (fondu, aucun pixel de sa photo à l'écran).
- **Coutures entre plans :** chaque couture tombe pendant un arrêt, à `camY` identique des deux
  côtés (handoff exact) → coupe franche invisible (`transition_in: cut`).
- **Boucle :** la vidéo tourne en boucle dans une balise `<video>`. Le dernier plan se termine par
  un fondu de la vue contact vers la vue d'ouverture exacte (`camY = 0`), identique à la première
  image du plan 01 → le rebouclage est sans saut.
- **Liste négative :** aucun texte superposé, aucun curseur, aucun cadre navigateur, aucun effet
  de flou/lueur/grain, aucun zoom dans la plaque, aucune respiration ni dérive pendant les arrêts,
  aucun diaporama figé (chaque plan bouge au moins une fois), aucun « économiseur d'écran ».
- **Bande de sous-titres :** sans objet (pas de sous-titres, film muet) ; la plaque est plein
  cadre car c'est la page elle-même.

## Frame 1 — Accueil → l'institut et ses chiffres

- scene: Le haut de la page (en-tête + hero) apparaît puis la page descend vite jusqu'à « Un institut de formation au service de la santé » et « L'IFSPA en chiffres »
- voiceover: ""
- duration: 5.2s
- poster: 3.5s
- transition_in: cut
- status: animated
- src: compositions/frames/01-accueil-institut.html
- type: product_intro
- persuasion: Show-don't-tell proof
- beat: curiosity → clarity
- blueprint: compose
- focal: assets/full-page.png
- roles: full-page = background (plein cadre, non atténué, échelle 1:1)
- asset_candidates: assets/full-page.png — capture pleine page de l'accueil d'ifspa.mg, 1920×7309, la page telle qu'elle est
- handoff_out: plaque full-page.png — x 0, camY 1088 (translateY -1088 px), échelle 1, opacité 1, immobile (vitesse 0) à la coupe

narrativeRole: ouvrir sur le site réel et quitter vite le hero (photo d'illustration d'une autre école) pour arriver sur la présentation de l'institut.
keyMessage: l'IFSPA, institut paramédical agréé de Toamasina, et ses chiffres.

Compose — défilement de capture (`viewport-change`, pan vertical pur, échelle 1).
Scene 1 (0.0–0.4s): plaque plein cadre à camY 0 — en-tête et hero visibles, immobile (arrêt bref, le hero n'est pas mis en valeur).
Scene 2 (0.4–1.7s): la caméra descend d'un seul geste doux de camY 0 à camY 1088 (courbe longue in-out, 1,3 s) : le hero sort par le haut, le bandeau « Établissement agréé… » puis la section « Un institut de formation au service de la santé » montent.
Scene 3 (1.7–5.2s): arrêt immobile à camY 1088 : le cadre montre le bandeau d'agrément, toute la section « Un institut… » (texte + logo) et la section « L'IFSPA en chiffres » (18 ans, +1 200 étudiants, +92 %, +15 partenaires). Lecture tenue, aucune dérive.

## Frame 2 — Nos filières

- scene: La page descend sur « Nos filières » : Infirmier(e)s, puis glisse jusqu'à Sage-femmes
- voiceover: ""
- duration: 6.2s
- poster: 2.4s
- transition_in: cut
- status: animated
- src: compositions/frames/02-filieres.html
- type: feature_showcase
- persuasion: Show-don't-tell proof
- beat: clarity + trust
- blueprint: compose
- focal: assets/full-page.png
- roles: full-page = background (plein cadre, non atténué, échelle 1:1)
- asset_candidates: assets/full-page.png — capture pleine page de l'accueil d'ifspa.mg, 1920×7309, la page telle qu'elle est
- handoff_in: plaque full-page.png — x 0, camY 1088 (translateY -1088 px), échelle 1, opacité 1, immobile (vitesse 0) à la coupe
- handoff_out: plaque full-page.png — x 0, camY 2531 (translateY -2531 px), échelle 1, opacité 1, immobile (vitesse 0) à la coupe

narrativeRole: montrer les deux formations proposées, telles que la page les présente.
keyMessage: deux filières en 3 ans — Infirmier(e)s et Sage-femmes.

Compose — défilement de capture (`viewport-change`, pan vertical pur, échelle 1).
Scene 1 (0.0–0.3s): arrêt immobile à camY 1088 (identique à la fin du plan 1).
Scene 2 (0.3–1.5s): la caméra descend en douceur de camY 1088 à camY 2290 (courbe longue in-out, 1,2 s) : les chiffres sortent par le haut, « Nos filières » s'installe.
Scene 3 (1.5–3.4s): arrêt immobile à camY 2290 : titre « Nos filières », sous-titre, bloc Infirmier(e)s complet (photo + texte + puces).
Scene 4 (3.4–4.6s): courte glissade douce de camY 2290 à camY 2531 (1,2 s) pour faire entrer le bloc Sage-femmes en entier.
Scene 5 (4.6–6.2s): arrêt immobile à camY 2531 : blocs Infirmier(e)s et Sage-femmes visibles, Sage-femmes complet.

## Frame 3 — Agréments officiels → Nous contacter → retour au début

- scene: Glissade sur Admission, Galerie sautée (fondu), arrêt sur « Agréments officiels », puis « Nous contacter », et fondu vers le haut de page pour la boucle
- voiceover: ""
- duration: 8.6s
- poster: 3.0s
- transition_in: cut
- status: animated
- src: compositions/frames/03-agrements-contact.html
- type: cta
- persuasion: Authority by association
- beat: trust → peace of mind
- blueprint: compose
- focal: assets/full-page.png
- roles: full-page = background (plein cadre, non atténué, échelle 1:1) ; une seconde instance de la même plaque, fixe à camY 0, sert de vue d'ouverture pour le fondu de boucle
- asset_candidates: assets/full-page.png — capture pleine page de l'accueil d'ifspa.mg, 1920×7309, la page telle qu'elle est
- handoff_in: plaque full-page.png — x 0, camY 2531 (translateY -2531 px), échelle 1, opacité 1, immobile (vitesse 0) à la coupe
- handoff_out: boucle vers le plan 1 — dernière image = plaque à camY 0 (translateY 0), échelle 1, opacité 1, immobile ; identique à la première image du plan 1

narrativeRole: finir sur ce qui fonde la confiance (les arrêtés officiels) et sur le contact, puis revenir au début pour une boucle propre.
keyMessage: un institut agréé par arrêtés ministériels, joignable directement.

Compose — défilement de capture (`viewport-change`, pan vertical pur, échelle 1) + fondu de boucle final (seule sortie du film).
Scene 1 (0.0–0.2s): arrêt immobile à camY 2531 (identique à la fin du plan 2).
Scene 2 (0.2–1.2s): glissade douce de camY 2531 à camY 3060 (1,0 s) : « Admission et études » s'installe en entier ; le bas du cadre (plaque y 4140) reste au-dessus de la section Galerie (plaque y 4146).
Scene 3 (1.2–1.9s): arrêt bref sur Admission.
Scene 4 (1.9–2.4s): fondu enchaîné (0,5 s) vers une seconde instance de la plaque fixée à camY 5420 : la section Galerie est sautée entièrement (sa grande photo montre le logo d'une autre école, « Cambria College »).
Scene 5 (2.4–4.3s): arrêt immobile à camY 5420 : « Agréments officiels » complet (texte + les quatre arrêtés 2011–2024) et le haut de la section bleue « Nous contacter ».
Scene 6 (4.3–5.3s): la caméra descend en douceur de camY 5420 à camY 5792 (1,0 s) : la section « Nous contacter » s'installe en entier (coordonnées + formulaire).
Scene 7 (5.3–7.9s): arrêt immobile à camY 5792 : « Nous contacter » entière, les deux derniers arrêtés encore visibles au-dessus.
Scene 8 (7.9–8.52s): fondu enchaîné doux (0,62 s) de la vue contact vers la plaque fixe à camY 0 (en-tête + hero), qui finit à opacité 1 — exactement la première image du plan 1, pour que la boucle reparte sans saut.
