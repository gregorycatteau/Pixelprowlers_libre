# Instructions Codex — PixelProwlers LIBRE Companion

## Mission
Produire une V1.0 **testable et candidate à la vente** sur Linux Mint 22.3 Cinnamon OEM, à partir de la vraie V0.1.0 du dépôt. Date de revue visée : **mercredi 18 novembre 2026**. Pas de promesse de release tant que les critères de sortie ne sont pas satisfaits.

## Ordre impératif de lecture
1. `README.md` et les sources actuelles (`src/app.ts`, `packaging/companion.py`, `packaging/install-allowlisted`, `packaging/build-deb.sh`).
2. `docs/PRD_V1.md` pour le périmètre et l'expérience client.
3. `docs/SECURITE_V1.md` pour les exigences non négociables.
4. `docs/BACKLOG_CODEX.md` pour l'ordre des lots.
5. `docs/VALIDATION_OEM.md` pour les critères de réception.

## Règles de contribution
- Conserver la stack existante : TypeScript strict côté UI, Python 3/GTK/WebKit2 comme hôte local, paquet Debian. Ne pas réécrire en Tauri/Nuxt dans ce cycle.
- Préférer une évolution incrémentale, tests d'abord sur les composants de sécurité, commits/PR ciblés par lot.
- Tous les commentaires de fonctions et la documentation sont **en français**. Réécrire intégralement les fichiers modifiés plutôt qu'introduire des ellipses ou du pseudo-code.
- Aucun accès réseau depuis la WebView, aucune télémétrie, aucun compte PixelProwlers. Guide utilisable sans Internet.
- Ne jamais demander ou stocker des secrets (mots de passe, clés privées, phrases de récupération, adresses email personnelles, jetons OAuth). Authentification dans l'application native ou le navigateur du fournisseur.
- Ne jamais autoriser l'exécution arbitraire (`shell=True`, `eval`, `exec`, nom de binaire libre, URL arbitraire, lecture de chemin arbitraire) depuis le pont JS/Python.
- Ne pas ajouter d'opération root au helper existant sans analyse de sécurité, tests négatifs et revue séparée.
- Préserver Avahi/mDNS, CUPS, Bluetooth, pilotes et ergonomie Linux Mint. Aucun réglage BIOS, partitionnement, LUKS ou Secure Boot automatisé.
- La session `oem` ne doit pas être personnalisée pour le client. Les réglages de l'application doivent être créés dans le compte **du client**, uniquement après sa première connexion.
- Toujours distinguer **configuré**, **vérifié**, **non vérifié**, **non disponible**, **action manuelle requise**. Ne pas utiliser de score de sécurité fictif.
- Toutes les actions doivent être facultatives, compréhensibles, réversibles lorsque c'est techniquement possible. Ne jamais supprimer un compte ou des données d'un service distant.
- Garantir la reproductibilité du build : version cohérente dans le paquet, SHA-256, changelog, instructions de mise à jour et de retour arrière.
- Si la sécurité, l'ergonomie ou les tests OEM bloquent une fonction : la repousser après V1, ne pas simuler son succès.

## Commandes de base à exécuter
```bash
python3 -m unittest discover -s tests -v
tsc -p tsconfig.json
bash packaging/build-deb.sh
```
Puis faire `dpkg-deb --contents` et inspecter la composition du paquet. Sur Linux Mint : tests manuels OEM selon `docs/VALIDATION_OEM.md`.

## Format du rapport de chaque lot
Résumé; fichiers modifiés; captures/preuves de tests; risques ouverts; impact OEM; instructions de validation manuelle; critères atteints/non atteints. Pas de « terminé » sans preuve.
