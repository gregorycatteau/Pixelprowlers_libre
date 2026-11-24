# PixelProwlers LIBRE Companion — prototype 1.1.0

> Livraison de prévalidation : une recette sur Linux Mint Cinnamon reste nécessaire.

Consulte `docs/RELEASE_V1_1.md` pour le périmètre et les tests réalisés.

# PixelProwlers LIBRE Companion 0.1.0

**Statut : prototype fonctionnel à valider sur Linux Mint 22.3 OEM avant commercialisation.**

Application graphique de première utilisation destinée aux ordinateurs reconditionnés PixelProwlers LIBRE. L'interface est écrite en **TypeScript** (fichier `src/app.ts`, compilé par `tsc`), hébergée par **GTK3/WebKitGTK** au moyen d'un backend Python très limité. Le `.deb` livré contient le JavaScript déjà compilé : l'utilisateur final n'a besoin ni de Node.js ni de Rust.

## Fonctionnalités effectivement implémentées

- Interface locale accessible hors ligne, aux couleurs de PixelProwlers.
- Assistant de six étapes : messagerie, navigateur, coffre-fort, sauvegardes, documents, synchronisation.
- Détection des logiciels installés (`dpkg-query`).
- Ouverture d'applications autorisées, sans passer par un shell.
- Installation sur demande depuis les dépôts APT, après dialogue système Polkit, via un helper root à liste blanche.
- Choix de fournisseur mail **sans saisir aucune adresse ni aucun mot de passe dans Companion**.
- Guides hors ligne avec niveaux essentiel / avancé / alternatives.
- État de progression minimal, privé et local (fichier `~/.config/pixelprowlers-libre/state.json`, mode 0600).
- Lancement automatique lors des connexions du premier propriétaire ; ignoré pour `oem` / UID 29999.
- Après « Terminer », le lancement automatique cesse ; relance manuelle possible depuis le menu.

## Non implémenté volontairement

- Création de comptes chez des fournisseurs tiers.
- Collecte d'identifiants et de mots de passe.
- Configuration automatique des identités de Thunderbird (le client les saisit directement dans Thunderbird).
- Chiffrement du disque, modification des partitions ou réglages Secure Boot.
- Télémétrie, compte PixelProwlers ou serveur distant.
- Audit système certifiant.

## Installation sur Linux Mint 22.3 depuis la session OEM

1. Copier le fichier `PixelProwlers-LIBRE-Companion_0.1.0_all.deb` sur le HP (dans Téléchargements par exemple).
2. Ouvrir un terminal dans son dossier et exécuter :

```bash
sudo apt install ./PixelProwlers-LIBRE-Companion_0.1.0_all.deb
```

APT peut demander des dépendances GTK/WebKit, notamment `python3-gi`, `gir1.2-gtk-3.0`, `gir1.2-webkit2-4.1` et `pkexec`.

3. Tester **manuellement** l'application dans la session OEM :

```bash
pixelprowlers-libre
```

4. Vérifier les modules, le chargement des guides et l'ouverture de Thunderbird. Tester l'installation d'un logiciel facultatif sur un appareil de test, pas sur un compte personnel.
5. **Ne pas finaliser le mode OEM avant la validation des tests.**
6. Lors du premier démarrage du propriétaire, après création de son compte, le Centre LIBRE se lancera automatiquement. L'assistant **ne se lance pas automatiquement** pour `oem`.

**Important :** la machine pilote n'a pas été testée par moi directement. Le paquet et son installateur ont été vérifiés statiquement ; le lancement GTK doit encore être validé sur le HP.

## Tester le paquet

```bash
/usr/bin/python3 /usr/lib/pixelprowlers-libre/companion.py --self-test
pixelprowlers-libre --diagnostic
```

Le mode diagnostic affiche l'état minimal des applications et de l'assistant. Il ne collecte pas de secrets.

## Reconstruire à partir du code source

Sur une machine de développement avec Node.js et le compilateur TypeScript :

```bash
tsc -p tsconfig.json
bash packaging/build-deb.sh
```

Le script crée un `.deb` dans `dist/`. Vous pouvez ouvrir `web/index.html` dans un navigateur pour consulter une **prévisualisation** sans fonctionnalités système (les boutons d'installation ne sont pas actifs dans cette prévisualisation).

## Architecture de sécurité

- Le WebView utilise une **CSP restrictive** : scripts et styles locaux uniquement ; aucune requête réseau JavaScript.
- Le backend n'expose aucun accès à une commande arbitraire, aucun chemin de lecture arbitraire et aucune URL arbitraire.
- Les guides sont sélectionnés depuis une liste fixe ; le HTML ne reçoit pas de contenu non échappé.
- L'installation APT passe par `/usr/lib/pixelprowlers-libre/install-allowlisted`, exécuté séparément via Polkit, et contient une liste immuable de paquets.
- **Ne jamais exécuter l'application graphique sous `sudo`**. Le compte du client n'a pas besoin d'accès root pour la navigation.
- Avant diffusion commerciale, prévoir un audit des versions de dépendances, la signature des artefacts et des tests utilisateurs sur une session OEM entièrement finalisée.

## Points à valider avant revente

- [ ] Lancement GTK/WebKit et affichage local du Centre LIBRE sur le HP.
- [ ] Démarrage automatique après création du compte client, pas pour le compte OEM.
- [ ] Arrêt de l'autostart après « Terminer » ; relance depuis le menu.
- [ ] Fonctionnement des demandes Polkit d'installation facultative.
- [ ] Fonctionnement des liens vers les fournisseurs et des ouvertures d'applications.
- [ ] Absence de secrets et traces OEM dans le compte client.
- [ ] Vérification Firefox `about:policies` + uBlock Origin.
- [ ] Validation Avahi/CUPS, Bluetooth, son, Wi-Fi, webcam, veille.
- [ ] État réel du chiffrement LUKS et de Secure Boot documenté dans le dossier machine.

## Évolution proposée

- v0.2 : tests de première connexion après OEM, perfectionnement ergonomique, lancement de modules de configuration natifs.
- v0.3 : assistant Thunderbird approfondi sans collecte de mot de passe, sauvegardes guidées et vérification post-configuration.
- v1.0 : tests automatisés, rapports versionnés et paquet signé avec procédure de mise à jour transparente.


## Version 1.2.0 — découverte Cinnamon

La V1.2 rend la maquette pédagogique plus proche de l'organisation de Cinnamon (menu, panneau, fenêtre Nemo) et ajoute des démonstrations en trois états dans le niveau « Utiliser ». Tous les états sont fictifs, clairement identifiés, sans contrôle du bureau réel. Voir `docs/RELEASE_V1_2.md`.


## Version 1.4.0 — démonstrations visuelles

Les états du bureau pédagogique et les fiches « Utiliser » sont synchronisés. Il ne s'agit pas d'un écran réel et aucun contrôle du système n'est effectué. Voir `docs/RELEASE_V1_3.md`.


### V1.4 : manipulation libre

Au niveau « Utiliser », sélectionner « Manipuler la simulation » pour essayer menu, applications et fenêtres fictives. Voir `docs/RELEASE_V1_4.md`.
