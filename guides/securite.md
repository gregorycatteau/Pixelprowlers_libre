# Sécurité et confidentialité : les vrais leviers

## Niveau essentiel

1. Utilisez un compte Linux personnel protégé par un mot de passe que vous ne transmettez à personne.
2. Ouvrez régulièrement le Gestionnaire de mises à jour Linux Mint et installez les correctifs proposés.
3. Le pare-feu UFW a été activé à l'atelier sur le prototype ; consultez votre dossier machine pour savoir s'il est réellement actif sur cet appareil.
4. Gardez une sauvegarde régulière, distincte du SSD interne, et testez la restauration.
5. Sur les sites importants, activez la double authentification ; la protection la plus utile dépend des risques propres à chaque usage.

## Niveau avancé

- **Chiffrement du disque** : LUKS protège les fichiers au repos en cas de vol si les secrets restent privés. Il est préférable de prévoir le chiffrement au moment de l'installation ; ce configurateur ne chiffre pas automatiquement un système déjà installé.
- **Secure Boot** : s'il est activé et correctement configuré, il vérifie une partie de la chaîne de démarrage. Son état doit être testé avec les pilotes installés avant toute intervention dans l'UEFI.
- **Mises à jour firmware** : utilisez l'outil de mise à jour du constructeur ou fwupd quand votre modèle est pris en charge ; n'interrompez jamais une opération firmware.
- **Ports et services** : certains services comme Avahi et CUPS permettent de découvrir facilement des imprimantes ; ils restent présents pour le confort d'utilisation, sous le contrôle du pare-feu.
- **Permissions d'applications** : n'installez que des logiciels provenant de sources fiables et évitez les scripts inconnus avec sudo.

## Sécurité du configurateur

Le Centre LIBRE ne demande ni mot de passe de messagerie, ni mot de passe du coffre KeePassXC, ni phrase secrète de chiffrement. L'installation facultative de logiciels affiche une demande d'autorisation administrateur émise par Linux. Les commandes disponibles sont limitées à une liste prédéfinie.

## Limites commerciales

Le Centre LIBRE n'est ni une certification ANSSI, ni un produit anti-malware, ni une preuve que le SSD est chiffré. Seuls les contrôles individuels du dossier machine permettent d'attester un réglage précis.
