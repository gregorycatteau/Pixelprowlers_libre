# Cloud et synchronisation : vous décidez où se trouvent vos données

## Niveau essentiel

1. Si vous n'avez besoin d'aucune synchronisation, conservez les fichiers sur le SSD et mettez en place une sauvegarde distincte.
2. Si vous disposez d'un compte Nextcloud, ouvrez le Centre LIBRE et installez **Nextcloud Desktop** si nécessaire.
3. Lancez Nextcloud et saisissez directement dans le client l'adresse de votre serveur et vos identifiants.
4. Choisissez explicitement les dossiers à synchroniser, puis observez un premier échange de fichiers de test.

## Niveau avancé

- Activez la double authentification du compte Nextcloud, si le serveur la propose.
- Révisez les liens de partage : durée, destinataires, mots de passe et permissions.
- Étudiez Syncthing pour la synchronisation entre vos appareils sans serveur central ; vérifiez les appareils autorisés.
- Gardez une sauvegarde indépendante de tout service de synchronisation.

## Alternatives

- **Nextcloud** : autohébergé ou chez un prestataire, dépend du niveau de confiance de ce prestataire.
- **Syncthing** : synchronisation entre appareils, à configurer avec soin.
- **Stockage uniquement local** : moins de dépendances externes, mais impose de bonnes sauvegardes.

## Risques

Un dossier synchronisé peut propager une suppression ou un fichier chiffré par un logiciel malveillant. Vérifiez régulièrement votre stratégie de restauration.
