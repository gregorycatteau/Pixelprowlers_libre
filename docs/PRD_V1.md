# PRD — PixelProwlers LIBRE Companion 1.0
**Cible :** propriétaire débutant d'un ordinateur reconditionné Linux Mint 22.3, souhaitant découvrir les risques et sortir progressivement des dépendances numériques excessives, sans perdre ses usages habituels.

## Promesse client
« Reprenez le contrôle de votre vie numérique, à votre rythme. » Companion est un assistant de choix et de configuration local, pas un VPN, un antivirus magique, un outil d'anonymat ni un service cloud.

## Périmètre obligatoire V1
1. **Accueil et première connexion** : 4 portes d'entrée (« Comprendre », « Protéger », « Migrer », « Utiliser mon ordinateur »), introduction accessible, choix de passer toutes les étapes, rappel du mode hors ligne. Les paramètres sont propres au compte de l'acheteur, jamais au compte `oem`.
2. **Bilan de confidentialité volontaire** : 8 à 10 questions non intrusives, sans collecte d'identité, de noms de comptes ni de mots de passe. Évaluer uniquement les priorités de l'utilisateur. Recommandations déterministes calculées localement; réponses non persistées par défaut, ou uniquement drapeaux non identifiants avec consentement explicite. Bouton « Effacer mon parcours ».
3. **Parcours « Ma messagerie »** : scénario complet depuis Gmail ou fournisseur existant vers messagerie alternative, choix par critères (prix, compatibilité Thunderbird, chiffrement, portabilité), checklist de migration et vérification, ouverture de Thunderbird et liens officiels. Expliquer explicitement que Proton Bridge requiert une offre compatible payante; Tuta n'a pas d'IMAP/SMTP classique. Les comparatifs sont datés, marqués comme à vérifier si connectivité absente.
4. **Parcours « Protéger mes comptes »** : KeePassXC, phrase de passe, MFA/passkeys, récupération de comptes, arnaques/phishing; démonstrations sûres et pas-à-pas. Aucun secret dans l'application.
5. **Parcours « Sauvegarder »** : Deja Dup présent/détecté, ouverture de la configuration native, explication sauvegarde chiffrée, destination externe, et étape distincte « j'ai vérifié une restauration ». Ne jamais afficher « restauré » sans preuve.
6. **Centre de sécurité descriptif** : statut lisible de quelques mesures contrôlables sans privilèges (version OS, correctifs, Firefox installé, chiffrement, Secure Boot, etc.), avec `inconnu` dès qu'une vérification échoue. Aucune modification disque/firmware. UFW/Avahi/CUPS ne sont jamais désactivés automatiquement.
7. **Guides locaux et pérennes** : pour chaque parcours, `Essentiel`, `Avancé`, `Alternatives`, `Vérifier`, `Revenir en arrière`, `Limites`. Bouton accès facile depuis menu. Aucune connexion nécessaire pour comprendre/consulter les guides.
8. **Fonctions déjà présentes** : détecter/lancer/installer à la demande une liste blanche d'applications, conserver les réglages Firefox système, garder l'assistant permanent dans le menu, autostart uniquement pour le futur client.
9. **Accessibilité** : clavier complet, focus visible, texte compréhensible, contraste suffisant, adaptable à un écran 1366x768, aucun statut exprimé uniquement par une couleur, aide hors ligne.
10. **Distribution** : `.deb` 1.0.0 installable et désinstallable proprement; état utilisateur inchangé lors d'une mise à jour; pas de secret ni connexion obligatoire; SHA-256, version, journal de modifications.

## Hors périmètre V1 (ne PAS promettre)
- Migration automatique des mails/photos/comptes, fermeture Gmail, suppression distante, import implicite de données.
- Création de compte tiers, gestion directe des mots de passe de messagerie, Proton Bridge installé automatiquement.
- Chiffrement intégral LUKS rétroactif, activation Secure Boot, modification UEFI, durcissement noyau intrusif.
- Antivirus universel, anonymat garanti, score sécurité « 100 % », scan réseau offensif, services cloud PixelProwlers.
- Refondre la stack, module mobile complet, télémétrie, IA cloud embarquée.

## Scénarios de démonstration obligatoires
A. Un novice sélectionne « Je veux quitter Gmail » → compare 3+ solutions → ouvre le bon outil → suit et coche les étapes sans divulguer son mot de passe → retrouve son progrès après fermeture.
B. « Je veux sécuriser mes comptes » → ouvre KeePassXC, comprend MFA et récupération → aucun secret n'est collecté ou journalisé.
C. « Je ne veux pas perdre mes photos » → ouvre Déjà Dup et distingue sauvegarde configurée/restauration vérifiée.
D. Après préparation en mode OEM → le client neuf voit l'assistant à sa première session, pas les réglages du compte `oem`.

## Critères non fonctionnels
- Application utilisable hors ligne et sans compte; interface en français.
- Pas d'appel à un serveur PixelProwlers ni accès réseau depuis la WebView.
- État local protégé (0700/0600), limité au strict nécessaire, avec effacement possible.
- Échecs gérés proprement (offline, application absente, refus Polkit, absence de batterie).
- Tests unitaires + intégration backend + pilote OEM réel avant vente.
