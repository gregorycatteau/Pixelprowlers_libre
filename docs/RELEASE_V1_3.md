# PixelProwlers LIBRE Companion — V1.3.0

## Évolution fonctionnelle

La V1.3 relie les trois étapes de démonstration au **bureau illustratif** : les fenêtres, menus et zones surlignées évoluent réellement au fil du tutoriel. Cela couvre les huit thèmes pédagogiques, conserve les quatre profondeurs et les deux modes (visite / exploration).

- Chaque sujet dispose de trois scènes et de textes spécifiques.
- Nemo permet de repérer Téléchargements ; le menu illustre la recherche de Calculatrice ; le panneau illustre réduction/restauration ; les autres thèmes disposent d'une mise en évidence adaptée.
- La scène utilise un état local déterministe : aucune requête réseau, lecture de fichiers utilisateur, modification de paramètres, installation ou élévation de privilèges n'a été ajoutée.
- Les représentations ne sont **pas des captures authentiques** de Linux Mint. Elles ne prouvent ni la version de Cinnamon ni l'état de sécurité réel du PC.

## Recette

- `tsc -p tsconfig.json`
- `python3 -m unittest discover -s tests -v`
- `bash packaging/build-deb.sh`
- Vérification manuelle des trois étapes sur chaque thème, du clavier, du mode réduit et de l'affichage sous WebKitGTK **encore à effectuer sur Linux Mint réel**.

## Prochaines étapes

Fournir des captures de Cinnamon de la version OEM cible, remplacer la maquette illustrative avec des ressources vérifiées, et réaliser une recette d'accessibilité manuelle (lecteur d'écran, zoom, contraste, clavier).
