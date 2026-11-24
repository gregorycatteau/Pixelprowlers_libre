# Check-list Release 1.0.0

**Cible de revue : mercredi 18 novembre 2026.** Une RC peut exister sans être autorisée à la vente.

- [ ] Branches/PR relues et tests CI verts ; aucun `TODO` critique non traité.
- [ ] Toutes les tâches bloquantes de `docs/PRD_V1.md` ont un résultat observable et testé.
- [ ] Aucun mot de passe/email/token dans le state, les logs ou les tests de démonstration.
- [ ] Frontend et backend refusent actions/URLs arbitraires, guides rendus sans HTML non sûr.
- [ ] Version 1.0.0 identique dans métadonnées, UI, changelog et `.deb`.
- [ ] Compilation TypeScript strict, `python3 -m unittest discover -s tests -v`, construction .deb réussie.
- [ ] `dpkg-deb --contents` contrôlé ; installation/upgrade/désinstallation vérifiés sur Mint 22.3.
- [ ] Checksum SHA-256 du `.deb` publiée ; signature si chaîne de signature disponible.
- [ ] Aucune régression Avahi, CUPS, Bluetooth, Wi-Fi, Firefox, navigation bancaire/administrative.
- [ ] OEM first-run testé sur véritable compte client neuf, sans fuite de traces atelier.
- [ ] Rapport de sécurité et limitations (Secure Boot OFF, LUKS absent sur PP-LIBRE-001) remis au client.
- [ ] Revue finale humaine : ACCEPTÉ / RC BLOQUÉE / LIMITÉE AVEC RESTRICTIONS DOCUMENTÉES.
