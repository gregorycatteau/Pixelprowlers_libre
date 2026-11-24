# Mots de passe : KeePassXC

## Niveau essentiel

1. Ouvrez KeePassXC depuis le Centre LIBRE.
2. Créez une nouvelle base de données locale et enregistrez le fichier `.kdbx` dans un emplacement personnel.
3. Choisissez une phrase secrète unique, assez longue pour résister à la devinette. Ne la stockez pas en clair dans un document à côté du coffre.
4. Créez des entrées pour deux services et utilisez le générateur de mots de passe pour obtenir des secrets différents.
5. Fermez puis rouvrez la base pour tester la phrase secrète.

## Niveau avancé

- Réglez le verrouillage automatique après inactivité.
- Configurez éventuellement l'intégration navigateur officielle KeePassXC, après en avoir lu les permissions.
- Ajoutez un facteur matériel si vous disposez d'une clé compatible et d'un plan de récupération.
- Sauvegardez le coffre chiffré sur un deuxième support et vérifiez qu'il s'ouvre bien depuis cette copie.

## Alternatives

Les services Bitwarden et Proton Pass peuvent répondre à des besoins de synchronisation ; comparer leur architecture, leur modèle de confiance et leurs possibilités d'export. Le coffre local n'exige pas de compte en ligne, mais sa sauvegarde dépend de vous.

## Erreurs à éviter

Ne divulguez jamais la phrase secrète au vendeur ou au support. La perte du seul coffre et de la seule phrase secrète peut rendre les comptes difficiles à récupérer. Utilisez les mécanismes de récupération fournis par chaque service.
