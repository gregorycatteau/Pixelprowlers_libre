# Lots Codex — ordre de livraison et critères

Commencer par une **branche de travail dédiée**. Livrer des PR petites et testables. Les lots peuvent être découpés, mais ne pas mélanger migration du state schema et modifications Polkit dans la même PR.

## Lot 0 — Prise en main et sécurité de la base (bloquant)
- Inventorier le code et les dépendances; exécuter les 5 tests Python existants, `tsc`, `build-deb.sh`.
- Définir le schéma V1 du state et la migration depuis V0.1 sans stocker de données personnelles.
- Vérifier le pont WebKit ↔ Python et les politiques d'ouverture d'URL; créer des tests négatifs.
**Livrable :** rapport d'audit initial + tests reproductibles + aucun comportement existant cassé.

## Lot 1 — Tableau de bord + bilan + parcours
- Repenser l'accueil autour de 4 objectifs, pas des 6 icônes d'applications.
- Ajouter bilan facultatif, recommandations locales explicables, reprises après interruption, effacement du parcours.
- Ne pas collecter ni persister d'email, identifiant, nom de compte, mot de passe.
**Livrable :** démo A/B/C, tests composants et état utilisateur.

## Lot 2 — Messagerie & migration sans secrets
- 3 choix : compte existant, fournisseur alternatif, plus tard.
- Matrice de critères et avertissements Proton/Tuta/IMAP, budget et exportabilité.
- Checklist sécurisée pour transition Gmail : sauvegarde/export, création, contacts, bascule des services importants, vérification, retour arrière.
- Ouvrir Thunderbird ou les sites fournisseurs officiels uniquement sur clic, sans récupération des identifiants.
**Livrable :** scénario A validé hors ligne pour lecture, avec réseau seulement sur clic externe.

## Lot 3 — Sécurité, coffres, sauvegardes
- Centre de sécurité informatif, résultats tri-état sans faux positifs; pas de commandes root depuis JS.
- Guides et assistants KeePassXC/MFA ; Déjà Dup + test de restauration (déclaration client clairement distinguée des preuves techniques).
- Les actions privilégiées demeurent une liste blanche sans extensions non auditées.
**Livrable :** scénarios B/C + tests sécurité.

## Lot 4 — Accessibilité, docs, OEM, build V1
- Menu global, navigation clavier, redimensionnement, messages d'erreur accessibles.
- Guides « Essentiel / Avancé / Alternatives / Vérifier / Revenir en arrière / Limites » en FR.
- Version Debian et nom de sortie 1.0.0, changelog, SHA-256, licence des dépendances, tests, mode diagnostic sans secrets.
- Tests d'upgrade depuis V0.1; premier lancement après **finalisation OEM sur machine de test**.
**Livrable :** `.deb` RC + rapport de tests + liste de blocages éventuels.

## Règle de gestion du délai
Prioriser sécurité, compatibilité OEM, bilan, messagerie, sauvegardes. En cas de manque de temps : réduire les effets visuels et les intégrations externes, jamais la sécurité ni l'honnêteté des statuts. Qualifier une version « RC », pas « vendable », tant que des tests critiques échouent.
