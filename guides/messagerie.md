# Messagerie : une vraie solution email, sans compte GAFAM obligatoire

## Niveau essentiel — Configurer Thunderbird

1. Ouvrez le Centre LIBRE, rubrique « Messagerie privée ».
2. Choisissez « Ouvrir Thunderbird ». Si Thunderbird est absent, demandez son installation dans le Centre LIBRE et confirmez l'opération administrateur Linux.
3. Dans Thunderbird, choisissez « Configurer un compte de courrier existant ».
4. Saisissez votre nom d'affichage et votre adresse email **dans Thunderbird**.
5. Entrez votre mot de passe uniquement dans la fenêtre de Thunderbird ou dans la page d'authentification du fournisseur (OAuth lorsque proposé).
6. Vérifiez les paramètres détectés : serveur entrant IMAP, serveur sortant SMTP, ports et chiffrement TLS. N'acceptez pas un serveur non chiffré.
7. Envoyez-vous un message de test et vérifiez l'envoi comme la réception.

La saisie du mot de passe ne passe jamais par PixelProwlers LIBRE Companion.

## Choisir un fournisseur indépendant

- **mailbox.org** : fonctionne avec Thunderbird en IMAP/SMTP. Offre adaptée à un environnement email classique, avec formules payantes.
- **Infomaniak** : messagerie suisse IMAP/SMTP ; à examiner pour un ensemble mail/agenda/contacts.
- **Proton Mail** : le client Thunderbird nécessite **Proton Mail Bridge**, réservé aux offres Proton payantes. Avec un compte gratuit, utiliser plutôt le web ou les applications officielles. Les paramètres du Bridge sont spécifiques, pas ceux d'un compte IMAP classique.
- **Tuta** : l'architecture ne fournit pas d'accès IMAP/SMTP standard ; utiliser les applications Tuta ou ses intégrations spécifiques disponibles. Ne pas saisir des paramètres IMAP génériques qui n'existent pas.

Avant de choisir : comparez le coût, la portabilité des données, la localisation du service, les politiques de confidentialité et les possibilités de récupération de compte. Un domaine email personnel peut faciliter la migration ultérieure, mais entraîne des coûts et une administration supplémentaires.

## Niveau avancé — Confidentialité et chiffrement

1. Activez la double authentification chez votre fournisseur, idéalement via clé de sécurité ou application TOTP.
2. Dans Thunderbird, ouvrez les paramètres du compte puis la rubrique **Chiffrement de bout en bout** pour examiner les options OpenPGP.
3. Créez votre propre paire de clés OpenPGP, sur votre session personnelle ; ne confiez jamais la clé privée à un tiers.
4. Sauvegardez la clé privée de manière chiffrée sur un support contrôlé par vous, et protégez sa phrase secrète.
5. Échangez les clés publiques avec vos correspondants et vérifiez leur authenticité par un autre canal.
6. Envoyez un message de test chiffré à un correspondant compatible, puis vérifiez qu'il peut le lire.

**Important :** TLS (le cadenas de transport) ne constitue pas un chiffrement de bout en bout. Un email classique peut rester lisible chez les prestataires. OpenPGP protège le contenu dans les conditions appropriées, mais ne masque pas toutes les métadonnées (expéditeur, destinataire, dates).

## Options bonus

- Utiliser plusieurs adresses et des alias pour séparer achats, personnel et associations.
- Configurer les calendriers et carnets d'adresses via des services CalDAV/CardDAV compatibles.
- Désactiver le chargement des images distantes si vous voulez limiter les pixels de suivi, en tenant compte du confort d'utilisation.

## Ressources officielles

- Thunderbird : https://www.thunderbird.net/fr/
- Aide Thunderbird : https://support.mozilla.org/fr/products/thunderbird
- Proton Bridge : https://proton.me/support/imap-smtp-and-pop3-setup
- Infomaniak : https://www.infomaniak.com/fr
- mailbox.org : https://mailbox.org/
- Tuta : https://tuta.com/fr
