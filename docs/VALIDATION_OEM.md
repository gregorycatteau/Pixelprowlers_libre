# Protocole d'acceptation V1 — HP EliteBook 830 G7 / Linux Mint 22.3 OEM

## Phase atelier (compte temporaire `oem`)
- [ ] Installation depuis `.deb` par `apt`, sans commande suspecte ni paquet tiers non justifié.
- [ ] UI et guides disponibles hors ligne; aucun bug bloquant, clavier et écran 1366×768 testés.
- [ ] Applications existantes reconnues ; installation facultative refusée gracieusement.
- [ ] Aucune télémétrie ni connexion automatique non nécessaire (observer le trafic réseau dans un environnement de test).
- [ ] Avahi, CUPS, Wi-Fi et Bluetooth restent opérationnels.
- [ ] Test de mise à jour V0.1→1.0 préservant les états utilisateurs existants (dans une session de test, jamais un compte client réel).

## Phase transition OEM (machine de test ou image restaurable)
- [ ] `Prepare for shipping to end user` uniquement après sauvegarde des journaux d'atelier et vérification des prérequis.
- [ ] Création d'un compte client vierge ; pas d'accès aux paramètres/jetons/SSID/identifiants de l'atelier.
- [ ] L'assistant se lance au premier login du client, pas en session `oem`.
- [ ] Abandon/reprise de l'assistant préserve uniquement les choix autorisés.
- [ ] « Terminer » supprime l'autostart automatique pour ce compte ; lancement manuel depuis le menu encore fonctionnel.
- [ ] Second compte utilisateur : ses paramètres sont isolés.

## Sécurité / données
- [ ] Firefox `about:policies` sans erreur, uBlock Origin actif, navigation sur sites usuels.
- [ ] UFW activé (test système), découverte imprimante Avahi/CUPS opérationnelle.
- [ ] LUKS absent sur la machine pilote : l'interface ne doit pas prétendre que le SSD est chiffré.
- [ ] Secure Boot désactivé sur la machine pilote : afficher explicitement cette limite.
- [ ] Aucun secret en mémoire persistante, logs ou export produit.
- [ ] Pas de permissions administrateur pour le frontend.
- [ ] Démarrage, suspend/resume, Wi-Fi, webcam, micro, son, USB et autonomie testés séparément.

## Blocages absolus pour mise en vente avec Companion 1.0
- Violation d'isolation du compte OEM/futur acheteur, collecte de secret, exécution arbitraire, installation privilégiée non autorisée.
- Faux « OK » sur chiffrement, sauvegarde/restauration ou pare-feu.
- Crash permanent de l'assistant au premier login ou impossibilité de fermer/passser l'assistant.
- Guide essentiel indisponible hors ligne, incompatibilité paquet/OS non documentée.

## Évidence à archiver
Version et SHA-256 du .deb; résultat de tests unitaires; captures du parcours novice; rapport OEM avant/après; tests réseau; limitations connues; date et signature de validation PixelProwlers.
