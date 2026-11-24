# Modèle de menace minimal V1 — sécurité d'abord

## Actifs à protéger
- Secrets de l'utilisateur (mots de passe, jetons de session, clés cryptographiques).
- Données personnelles et documents; préférences de migration.
- Intégrité du système et mécanisme Polkit/APT.
- Frontière entre page HTML/JS et appels Python ; session OEM/futur propriétaire.

## Adversaires et abus à tester
1. Charge utile hostile dans un champ libre → injection JS/HTML ou pont natif.
2. ID d'application, de guide ou de fournisseur altéré → exécution de commande, lecture de fichier ou URL arbitraire.
3. Client tentant d'obtenir root via une action autorisée ou un argument inattendu.
4. Écriture d'un secret dans `~/.config`, console, logs, exception ou rapport.
5. Page distante ouverte dans le contexte WebView autorisé à contacter le pont Python.
6. Lien ou ressource locale malveillante → traversée de chemin, ouverture de schéma `file://` imprévu.
7. Fuite des traces de l'atelier vers le premier compte client.
8. Affichage d'un statut « protégé » non fondé lorsque commandes/permissions échouent.

## Contrôles obligatoires
- API de pont exhaustive et typée avec validation côté Python; schéma de données fermé; pas de shell libre.
- Actions privilégiées en liste blanche immuable, **pas de helper root supplémentaire** sans revue.
- Aucune saisie du mot de passe email dans Companion; OAuth et clés dans l'application du fournisseur.
- Contenu de guide rendu sûr (Markdown non fiable → échappement ; jamais HTML arbitraire).
- CSP restrictive, scripts/styles embarqués uniquement; navigation externe interdite dans la WebView et ouverte via navigateur système autorisé.
- Sauvegarde atomique de l'état utilisateur, droits 0700/0600, pas de symlink suivi par un helper root.
- Absence de télémétrie et de requête réseau automatique ; les liens fournisseurs ne s'ouvrent que sur action humaine.
- Le statut des contrôles est `actif`, `inactif`, `inconnu` ou `non applicable` avec preuve/date ; aucune réussite présumée.
- Aucune modification LUKS/partition/BIOS/Secure Boot. Signaler explicitement leur état sur PP-LIBRE-001.
- Le chiffrement ne doit jamais être activé sans récupération éprouvée de la clé et accord explicite du propriétaire.

## Tests négatifs exigés
- API inconnue, mauvais types, valeurs longues, Unicode/métacaractères et chemins `../` refusés.
- Injection `<script>` dans le bilan et les guides ne déclenche pas de script.
- URI non autorisée et chemin local hors liste rejetés.
- Échec Polkit / APT : rapport d'erreur clair, état jamais marqué installé.
- Réexécution et migration état V0.1→V1 sans fuite ni corruption.
- Déconnexion, reprise, nouvel utilisateur, compte OEM : séparation stricte.

## Politique de confidentialité à afficher
Les données restent locales, aucune publicité, aucun profilage ni compte PixelProwlers. Ne jamais dire « anonyme » ou « inviolable ». Mentionner les limites : FAI, services choisis, appareil non chiffré, cookies tiers, sauvegardes.
