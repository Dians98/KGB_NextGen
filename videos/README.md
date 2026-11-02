# Vidéos des projets (HyperFrames)

La page `/projets/heaven` montre une visite muette de la page d'accueil du site, d'environ 20 s, qui tourne en boucle. Ces vidéos sont des enregistrements réels : on y voit les animations des sites.

| Dossier | Source filmée | Vidéo publiée |
|---|---|---|
| `haeven-accueil/` | build statique de HAEVEN (`C:\Projets\HAEVEN\out`, servi sur le port 3300) | `public/projets/heaven/video-accueil.*` |
| `ifspa-accueil/` | https://ifspa.mg/ en production | non publiée : le site vitrine d'IFSPA a été retiré du portfolio |

## Refaire une vidéo

1. **Filmer** le site avec l'outil `_outils/enregistrer-site.cjs`, qui suit le scénario de défilement de `enregistrement/scenario.json` :
   ```
   node ../../_outils/enregistrer-site.cjs scenario.json brut.mp4
   ```
   Lancer cette commande depuis le dossier `enregistrement/` de la vidéo. Il faut Chrome, ffmpeg et le Playwright installé dans `C:\wamp64\www\ifspa`.
2. **Monter** avec HyperFrames. Le montage est dans `index.html` : coupes, fondu qui masque le saut entre deux sections, fondu de boucle vers la première image. `STORYBOARD.md` donne les points de coupe.
   - **Images de boucle** : `assets/haeven-rec-debut.png` et `assets/ifspa-premiere-image.png` sont la première image de `brut.mp4`. Après un nouvel enregistrement, les extraire avec ffmpeg : `-frames:v 1`, l'image #3 pour HAEVEN, l'image #0 pour IFSPA.
   - **Rendu** :
     ```
     node "<plugin hyperframes>/skills/hyperframes/scripts/plugin-cli.mjs" render --skill=product-launch-video --quality high --output renders/video.mp4
     ```
3. **Publier** en 1280 px :
   - `video-accueil.mp4` : H.264, crf 24, faststart, muet ;
   - `video-accueil.webm` : VP9, crf 36 ;
   - `video-accueil-poster.webp` : l'image de l'affiche. Pour IFSPA, ne jamais prendre la photo du hero, qui montre des élèves d'une autre école.

Les rendus, les captures et les enregistrements bruts ne sont pas versionnés (voir `.gitignore`).

## À ne pas montrer

- **IFSPA** :
  - la section Galerie (photo d'illustration d'une autre école) ;
  - le widget Cloudflare du formulaire, masqué par le CSS du scénario parce qu'il affiche un échec face à un navigateur automatisé.
- **HAEVEN** : les sections Portfolio et Univers, qui contiennent encore des textes provisoires.
