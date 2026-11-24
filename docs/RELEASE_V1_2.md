# PixelProwlers LIBRE Companion — V1.2.0

## Réalisé

- Représentation pédagogique affinée du bureau Linux Mint Cinnamon : fond, panneau, menu d'applications et fenêtres contextuelles.
- Démonstration progressive en trois états dans le niveau « Utiliser », avec retour et réinitialisation.
- Conservation de la recherche locale, de l'exploration libre, de la visite en six étapes, des quatre niveaux de lecture et des six modules existants.
- Aucun accès réseau ni modification du système ajoutés.

## Portée et limites

La maquette reste une **simulation illustrative** et non une capture de Cinnamon. Les exercices sur le bureau réel sont expliqués, jamais automatisés. Les éléments peuvent différer selon la version et la personnalisation de Linux Mint.

## Vérifications

Les commandes `tsc --project tsconfig.json`, `python -m unittest discover -s tests -v` et `bash packaging/build-deb.sh` servent à la recette. Test d'installation et d'utilisation sous GTK/WebKitGTK sur Linux Mint réel encore requis avant distribution commerciale.
