---
workflow: product-launch-video
flow: automation
storyboard: no
message: "Montrer la page d'accueil du site vitrine de l'IFSPA (ifspa.mg) telle qu'elle est"
destination: embed
aspect: 1920x1080
language: fr
length: 20s
angle: site-tour
narration: no
---

## Intent

Visite de la page d'accueil du site public de l'IFSPA (https://ifspa.mg/), montrée telle quelle
(show-it-as-is). La vidéo s'intègre à la page projet IFSPA du site de KGB NextGen Solutions, dans
une balise `<video>` muette qui tourne en boucle : elle doit donc se reboucler proprement.

## Customizations

- Passer VITE sur le hero : sa photo est une photo d'illustration (élèves d'une autre école, avec
  écharpes) — réponse de Diano.
- S'attarder sur les sections propres à l'institut : « Un institut de formation au service de la
  santé », « L'IFSPA en chiffres », « Nos filières », « Agréments officiels », « Nous contacter ».

## Notes

- Inféré (non demandé explicitement) : format 16:9 (1920x1080) car la destination est un embed sur
  un site web ; aucun texte ajouté, aucune carte de fin, aucun habillage KGB — l'identité visuelle
  est celle du site capturé ; pas de musique.
- Muet : `music: none`, pas de SCRIPT.md, pas de sfx (projet silencieux canonique).
- Mode dérivé : automation + storyboard:no = autonome. Le rendu reste soumis à la validation de
  Diano dans l'aperçu.
- Source unique : la capture réelle de https://ifspa.mg/ ; aucune page reconstruite.

## Révisions

- Galerie sautée entièrement dans le plan 03 (sa grande photo d'illustration montre le logo d'une
  autre école, « Cambria College » ; le site KGB a déjà écarté cette photo). Demande relayée par le
  coordinateur, avec la validation du rendu.
- Montage refait à partir de l'enregistrement temps réel `enregistrement/brut.mp4` pour que les
  animations du site (entrée du hero, compteurs, révélations au défilement) apparaissent — demande
  de Diano : « fais en sorte que les animations apparaissent bien dans les vidéos ». Pas
  d'accélération, pas d'incrustation ; Galerie jamais à l'écran.
