---
workflow: product-launch-video
flow: automation
storyboard: no
message: "Montrer la page d'accueil du site HAEVEN telle qu'elle est"
intent: site-tour / show-it-as-is (page d'accueil uniquement)
destination: embed
aspect: 1920x1080
language: fr
length: 20s
narration: no
music: none
---

## Intent

Visite muette de la page d'accueil du site HAEVEN (version FR), montrée telle
qu'elle est, pour la page projet du site KGB NextGen Solutions. La vidéo est
intégrée dans une balise `<video>` en boucle : elle doit pouvoir rejouer sans
saut visible.

## Notes

- Confirmé par la couche d'intention : workflow, flow, storyboard, message,
  intent, destination (embed sur la page projet du site KGB), longueur ~20 s,
  langue FR (la page capturée est la version FR), audio muet.
- Inféré : `aspect: 1920x1080` (16:9) parce que la vidéo est intégrée à un site
  web ; aucun texte ajouté, aucune carte de fin, aucun habillage de marque KGB
  (l'identité visuelle est celle du site capturé) ; pas de musique, pas de
  SCRIPT.md, pas de sfx (projet silencieux).
- Source : build statique local servi sur http://localhost:3300/fr/ (le site
  n'est pas en ligne). La capture pleine page est la source visuelle.
- Sections clés à marquer : hero « Bienvenue chez HAEVEN », « Chez Haeven, nous
  sommes designers dans l'âme », les trois façons d'entrer, l'appel à l'action
  final.
- À éviter : les sections Portfolio (« Design d'intérieur », « [NOM DU PROJET] »)
  et Univers (« [SÉRIE PHOTO] », « [TITRE DE CHANSON] ») contiennent des textes
  provisoires — les couper ou passer dessus rapidement.
- Ne jamais mentionner l'Estonie.
