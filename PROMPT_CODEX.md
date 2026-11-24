# Mission à coller dans Codex

Tu interviens comme ingénieur principal sur le projet **PixelProwlers LIBRE Companion**. À partir de ce dépôt existant en V0.1.0, produis une **V1.0 Release Candidate** pour Linux Mint 22.3 OEM, cible de revue le mercredi 18/11/2026.

1. Lis intégralement `AGENTS.md`, `docs/PRD_V1.md`, `docs/SECURITE_V1.md`, `docs/BACKLOG_CODEX.md`, `docs/VALIDATION_OEM.md`, puis inspecte le code actuel.
2. Exécute d'abord les tests de base, analyse les risques existants et documente les résultats. **Ne réécris pas le projet de zéro.**
3. Travaille lot par lot, dans l'ordre décrit dans `docs/BACKLOG_CODEX.md`. Pour chaque lot, écris des tests reproductibles, produis des changements minimaux et indique les vérifications manuelles.
4. Priorités absolues : sécurité du pont WebKit/Python, compatibilité OEM, absence de secrets et de télémétrie, parcours novice « bilan de confidentialité → migration mail », sauvegarde, vérification des états système, guides français hors ligne.
5. N'ajoute aucun compte obligatoire, cloud, service distant, mécanisme caché ou dépendance payante. Ne collecte jamais de mots de passe. Ne touche pas à LUKS, aux partitions, au BIOS ou à Secure Boot; conserve Avahi et CUPS.
6. Améliore l'interface avec une identité PixelProwlers cohérente (graphite #151A20, orange #F27A32, vert #43B88B, blanc minéral #F5F6F4), contraste accessible et navigation clavier.
7. À la fin, produis un `.deb` versionné 1.0.0 et son SHA-256, des instructions de mise à jour, une note de version, un rapport des tests et une liste honnête de fonctions non implémentées / limites à tester sur le vrai HP OEM.

**Critère d'arrêt :** si un choix risque de compromettre l'isolation des comptes, les secrets, l'intégrité du système ou le parcours OEM, arrête cette fonction et propose une alternative sûre. Ne prétends pas avoir effectué de tests matériels non exécutés.

**Première action :** affiche un audit compact du dépôt, un plan de lots avec dépendances, puis commence immédiatement le lot 0 et le lot 1. Aucun bavardage ni confirmation inutile.
