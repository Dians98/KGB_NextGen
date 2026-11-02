# Sources des CV

Les PDF publiés sont dans `public/cv/`. Pour les régénérer après une modification :

```bash
node docs/cv-sources/generer-pdf.cjs "file:///C:/Projets/KGB/docs/cv-sources/kevin.html" "C:/Projets/KGB/public/cv/CV_Kevin_Gooljar.pdf" cv-kevin.png
node docs/cv-sources/generer-pdf.cjs "file:///C:/Projets/KGB/docs/cv-sources/diano.html" "C:/Projets/KGB/public/cv/CV_Diano_Andriantsalama.pdf" cv-diano.png
```

Le script utilise Playwright installé dans `C:\wamp64\www\ifspa`. Même modèle pour les deux CV (`cv.css`) : nom à gauche, photo à droite, bleu KGB, sections les unes sous les autres.
Le CV de Kevin est construit d'après son profil LinkedIn : à faire valider par Kevin.
