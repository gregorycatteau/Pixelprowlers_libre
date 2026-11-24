# PixelProwlers LIBRE Companion — livraison 1.1.0

## Nouveautés

Le parcours « Retrouver mes habitudes » devient accessible depuis la navigation principale et constitue l'écran de première ouverture. Il comprend huit sujets, quatre niveaux d'explication, une recherche par mots-clés et termes Windows, ainsi qu'une visite guidée facultative de six étapes. La représentation de Cinnamon est volontairement schématique et ne remplace pas le bureau de l'utilisateur.

## Préservation

Les six modules d'origine, les guides Markdown hors ligne, les fonctions natives Python et la liste blanche d'installation sont conservés. Aucune nouvelle action privilégiée, source réseau ou donnée personnelle n'a été ajoutée.

## Vérifications réalisées

- Compilation TypeScript `tsc --project tsconfig.json` : réussie.
- Suite Python `unittest discover -s tests -v` : 5 tests réussis.
- Vérifications de l'interface dans Chromium (DOM de prévisualisation, styles et script injectés pour contourner les restrictions réseau de l'environnement de test) : navigation, choix d'un sujet, profondeur 3, visite guidée, recherche et absence d'erreurs JavaScript : réussies.
- Vue mobile de largeur 390 px : pas de débordement horizontal sur l'écran testé.
- Construction `.deb` : réussie.

## Vérifications non réalisées

- Installation et exécution du paquet sur un vrai Linux Mint 22.x Cinnamon.
- Intégration native GTK/WebKitGTK, comportement du premier lancement et tests d'accessibilité complets.
- Alignement pixel à pixel avec le bureau et les paramètres de la version OEM commercialisée.

Le paquet est une **version de prévalidation** ; son installation sur une machine client n'est pas encore recommandée sans recette OEM.
