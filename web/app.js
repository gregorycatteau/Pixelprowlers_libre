"use strict";
/**
 * Interface TypeScript du configurateur PixelProwlers LIBRE.
 * Toutes les fonctions sont commentées en français.
 * Les secrets ne sont jamais demandés, stockés ou transmis à l'application.
 */
const MODULES = [
    { id: 'messagerie', icon: '✉', title: 'Messagerie privée', lead: 'Choisir son fournisseur et configurer un véritable client email.', app: 'thunderbird', appLabel: 'Thunderbird',
        essential: ['Ouvrir Thunderbird et choisir « Configurer un compte de courrier ».', 'Saisir votre adresse email dans Thunderbird ; laissez ce logiciel demander votre mot de passe ou ouvrir la page de connexion de votre fournisseur.', 'Vérifier la réception et l’envoi d’un message de test.'],
        advanced: ['Activer un mot de passe fort et une authentification à deux facteurs chez votre fournisseur.', 'Découvrir OpenPGP dans Thunderbird : créer une clé personnelle et partager uniquement sa clé publique.', 'Vérifier la sauvegarde de la clé privée et de sa phrase secrète, puis tester la récupération.'],
        hint: 'Le chiffrement OpenPGP n’est de bout en bout que si vos correspondants disposent de clés compatibles.' },
    { id: 'navigation', icon: '◎', title: 'Navigation sans pistage', lead: 'Firefox, protections antipistage et recherche sans compte imposé.', app: 'firefox', appLabel: 'Firefox',
        essential: ['Ouvrir Firefox : les règles de confidentialité ont été configurées par l’atelier.', 'Vérifier les protections dans Paramètres → Vie privée et sécurité.', 'Tester vos sites essentiels (banque, impôts, assurance, achats).'],
        advanced: ['Ouvrir about:policies pour consulter les paramètres appliqués à tous les comptes.', 'Vérifier qu’uBlock Origin est activé et apprendre à désactiver temporairement son filtrage pour un site fiable.', 'Découvrir le DNS chiffré et ses limites (DNS de l’entreprise, portail Wi-Fi, protection réseau).'],
        hint: 'Un navigateur protégé n’offre pas l’anonymat complet et ne rend pas tous les sites inoffensifs.' },
    { id: 'mots-de-passe', icon: '▣', title: 'Coffre-fort numérique', lead: 'Protéger les accès avec KeePassXC, sans coffre contrôlé par un tiers.', app: 'keepassxc', appLabel: 'KeePassXC',
        essential: ['Ouvrir KeePassXC et créer une base de données .kdbx personnelle.', 'Choisir une phrase secrète unique et mémorable, suffisamment longue.', 'Créer une première entrée et tester la recherche d’un mot de passe.'],
        advanced: ['Activer le verrouillage automatique du coffre.', 'Organiser une sauvegarde chiffrée sur un support distinct.', 'Étudier l’usage des clés de sécurité et du TOTP, sans dépendre d’un seul appareil.'],
        hint: 'PixelProwlers ne crée ni ne conserve la phrase secrète du coffre du client.' },
    { id: 'sauvegardes', icon: '◫', title: 'Sauvegardes personnelles', lead: 'Sauvegarder et restaurer ses documents sans cloud obligatoire.', app: 'deja-dup', appLabel: 'Sauvegardes (Déjà Dup)',
        essential: ['Connecter un disque externe personnel dédié aux sauvegardes.', 'Ouvrir Sauvegardes et choisir vos dossiers importants.', 'Lancer une première sauvegarde, puis tester la restauration d’un fichier sans valeur.'],
        advanced: ['Activer les sauvegardes régulières et vérifier qu’elles s’exécutent.', 'Chiffrer les sauvegardes avec une phrase secrète réservée au propriétaire.', 'Adopter une stratégie 3-2-1 : trois copies, deux supports, dont une hors site.'],
        hint: 'Une sauvegarde n’est fiable qu’après un test de restauration réussi.' },
    { id: 'documents', icon: '▤', title: 'Documents sans cloud', lead: 'Bureautique et PDF traités localement sur votre ordinateur.', app: 'pdfarranger', appLabel: 'PDF Arranger',
        essential: ['Ouvrir LibreOffice pour rédiger et modifier des documents.', 'Utiliser PDF Arranger pour fusionner, diviser et réordonner des pages.', 'Exporter un document en PDF depuis LibreOffice.'],
        advanced: ['Installer et utiliser l’outil de numérisation locale pour votre scanner.', 'Découvrir le chiffrement de fichiers sensibles avant transfert.', 'Vérifier l’identité d’un signataire avant de se fier à une signature électronique.'],
        hint: 'Les PDF peuvent contenir des informations sensibles : privilégier le traitement local.' },
    { id: 'cloud', icon: '⌁', title: 'Synchronisation au choix', lead: 'Conserver ses fichiers en local ou choisir une alternative indépendante.', app: 'nextcloud-desktop', appLabel: 'Nextcloud Desktop',
        essential: ['Conserver tous vos documents localement si vous ne souhaitez pas de cloud.', 'Si vous possédez un serveur Nextcloud, installer le client puis connecter votre compte.', 'Choisir explicitement les dossiers à synchroniser.'],
        advanced: ['Évaluer Syncthing pour une synchronisation directe entre appareils.', 'Comprendre la différence entre synchronisation et sauvegarde : une suppression peut être répliquée.', 'Vérifier les permissions de partage et la double authentification du service.'],
        hint: 'Aucun serveur PixelProwlers ni abonnement n’est imposé à l’acheteur.' },
];
const PROVIDERS = [
    { id: 'mailbox', name: 'mailbox.org', tag: 'IMAP/SMTP', desc: 'Fournisseur indépendant, adapté à Thunderbird.', link: 'mailbox' },
    { id: 'infomaniak', name: 'Infomaniak', tag: 'IMAP/SMTP', desc: 'Messagerie suisse, configuration Thunderbird classique.', link: 'infomaniak' },
    { id: 'proton', name: 'Proton Mail', tag: 'Bridge payant', desc: 'Thunderbird via Proton Bridge avec un forfait payant ; sinon interface web ou applications Proton.', link: 'proton' },
    { id: 'tuta', name: 'Tuta', tag: 'Application dédiée', desc: 'Messagerie chiffrée, pas d’IMAP/SMTP classique : suivre le parcours Tuta dédié.', link: 'tuta' },
];
/** Contenus V1.2 : les instructions portent sur Linux Mint Cinnamon et restent sans action système. */
const DISCOVERY = [
    { id: 'menu', title: 'Le menu principal', short: 'Trouver et lancer un logiciel', icon: '▦', windows: 'Menu Démarrer',
        discover: 'Le menu permet de retrouver les applications et d’accéder aux commandes de session. Il se trouve généralement dans le coin inférieur gauche du panneau.',
        understand: ['Utilise la recherche pour retrouver une application sans connaître sa catégorie.', 'Les catégories regroupent les applications par usage : Internet, Bureautique, Administration…', 'Les éléments et leur emplacement peuvent varier avec la personnalisation du bureau.'],
        practice: ['Sur le vrai bureau, ouvre le menu.', 'Recherche « Calculatrice » et lance-la.', 'Referme la fenêtre : aucune configuration n’a été modifiée.'],
        deeper: ['Les favoris et les lanceurs permettent d’accéder plus vite aux applications courantes.', 'L’organisation du menu est personnalisable selon la version de Cinnamon.'], keywords: ['démarrer', 'chercher', 'logiciel', 'programme', 'application', 'calculatrice'] },
    { id: 'panel', title: 'Le panneau et les fenêtres', short: 'Passer d’une fenêtre à l’autre', icon: '▤', windows: 'Barre des tâches',
        discover: 'Le panneau affiche notamment les applications ouvertes et les accès rapides. Il se situe habituellement en bas de l’écran.',
        understand: ['Une application peut avoir plusieurs fenêtres.', 'Réduire une fenêtre ne ferme pas l’application.', 'Les fenêtres ouvertes restent accessibles depuis le panneau ou avec Alt + Tab.'],
        practice: ['Ouvre deux applications disponibles sur l’ordinateur.', 'Passe de l’une à l’autre avec Alt + Tab.', 'Réduis l’une des fenêtres, puis retrouve-la dans le panneau.'],
        deeper: ['Cinnamon peut proposer plusieurs espaces de travail pour organiser les fenêtres.', 'La position et les éléments du panneau peuvent être modifiés.'], keywords: ['barre des tâches', 'fenêtre', 'réduire', 'agrandir', 'alt tab', 'multitâche'] },
    { id: 'files', title: 'Mes fichiers et dossiers', short: 'Documents, images et téléchargements', icon: '▣', windows: 'Explorateur de fichiers',
        discover: 'Le gestionnaire de fichiers Nemo permet d’ouvrir les dossiers personnels et les supports connectés.',
        understand: ['Le dossier personnel contient habituellement Documents, Images et Téléchargements.', 'La colonne latérale donne accès aux emplacements et aux périphériques présents.', 'Une synchronisation cloud n’est pas automatiquement une sauvegarde.'],
        practice: ['Ouvre le gestionnaire de fichiers sur le vrai bureau.', 'Entre dans Téléchargements, puis reviens au dossier personnel.', 'Dans Documents, crée un dossier d’essai avec Ctrl + Maj + N et supprime-le si tu n’en as plus besoin.'],
        deeper: ['Le dossier personnel est généralement situé sous /home/nom-utilisateur.', 'Les fichiers commençant par un point sont généralement masqués.', 'Les permissions contrôlent l’accès à certains fichiers : ne les modifie pas sans en comprendre l’effet.'], keywords: ['explorateur', 'fichiers', 'nemo', 'téléchargements', 'documents', 'clé usb', 'corbeille', 'dossier'] },
    { id: 'settings', title: 'Les paramètres', short: 'Wi-Fi, clavier, écran et imprimantes', icon: '⚙', windows: 'Paramètres Windows',
        discover: 'Les paramètres système regroupent les réglages de l’affichage, du clavier, du réseau et des périphériques.',
        understand: ['Certaines options concernent uniquement ton compte, d’autres le système entier.', 'Un réglage peut nécessiter une confirmation administrateur.', 'Les imprimantes peuvent être découvertes automatiquement sur le réseau local.'],
        practice: ['Ouvre le menu, puis les paramètres système.', 'Repère les rubriques Affichage, Son et Imprimantes sans rien modifier.', 'Ferme les paramètres lorsque tu as terminé.'],
        deeper: ['Avahi/mDNS facilite la découverte d’appareils tels que les imprimantes ; il reste activé par défaut.', 'Avant un changement réseau sensible, note la configuration actuelle.'], keywords: ['panneau de configuration', 'réglages', 'wifi', 'wi-fi', 'écran', 'clavier', 'imprimante', 'son'] },
    { id: 'indicators', title: 'Les indicateurs', short: 'Réseau, volume, batterie et horloge', icon: '◉', windows: 'Zone de notification',
        discover: 'Les indicateurs du panneau donnent accès à des informations comme le réseau, le son, la batterie ou l’heure.',
        understand: ['Certaines icônes n’apparaissent que lorsque le matériel ou le service associé est disponible.', 'Une notification signale un événement ; elle ne doit pas toujours être traitée immédiatement.', 'Sur un ordinateur fixe, l’indicateur de batterie peut être absent.'],
        practice: ['Repère l’horloge et le réglage du volume dans le panneau.', 'Ouvre le menu du réseau pour identifier la connexion active, sans la déconnecter.'],
        deeper: ['Les applets Cinnamon sont des composants du panneau.', 'L’absence d’une icône ne suffit pas à conclure qu’une protection est inactive.'], keywords: ['notification', 'batterie', 'horloge', 'volume', 'réseau', 'wifi', 'wi-fi'] },
    { id: 'software', title: 'Installer des applications', short: 'Découvrir les logiciels disponibles', icon: '✳', windows: 'Microsoft Store / applications installées',
        discover: 'Le gestionnaire de logiciels permet de rechercher des applications et d’en installer depuis les sources proposées par Linux Mint.',
        understand: ['Privilégie les dépôts officiels et les sources logicielles identifiables.', 'Un logiciel déjà installé peut être lancé directement depuis le menu.', 'L’installation et la suppression ne sont pas nécessaires pour cette visite.'],
        practice: ['Ouvre le gestionnaire de logiciels depuis le menu.', 'Recherche un logiciel connu, par exemple VLC.', 'Lis sa description sans lancer d’installation.'],
        deeper: ['Les paquets APT et les applications Flatpak peuvent suivre des circuits de mise à jour distincts.', 'Évite de copier des commandes d’installation trouvées sur un site inconnu.'], keywords: ['installer', 'désinstaller', 'boutique', 'store', 'logiciel', 'application', 'flatpak', 'apt'] },
    { id: 'updates', title: 'Les mises à jour', short: 'Garder le système et les logiciels à jour', icon: '↻', windows: 'Windows Update',
        discover: 'Le gestionnaire de mises à jour indique quand des correctifs sont disponibles pour le système et les logiciels pris en charge.',
        understand: ['Les mises à jour corrigent des erreurs et parfois des vulnérabilités.', 'Une application Flatpak peut également disposer de ses propres mises à jour.', 'Prévois une sauvegarde avant les changements importants et ne coupe pas une opération en cours.'],
        practice: ['Recherche le gestionnaire de mises à jour depuis le menu.', 'Observe son état et les éventuelles notifications.', 'Ne lance aucune mise à jour pendant cette démonstration.'],
        deeper: ['L’installation de mises à jour peut nécessiter des privilèges administrateur.', 'L’état réel de sécurité ne peut pas être déduit de cette seule fiche pédagogique.'], keywords: ['update', 'windows update', 'mise à jour', 'sécurité', 'correctif', 'maintenance'] },
    { id: 'advanced', title: 'Sous le capot', short: 'Terminal, permissions et organisation du système', icon: '>_', windows: 'Invite de commandes / PowerShell (comparaison partielle)',
        discover: 'Linux propose aussi des outils avancés, comme le terminal et le moniteur système. Ils ne sont pas nécessaires pour les usages courants.',
        understand: ['Le terminal reçoit des commandes textuelles ; elles peuvent avoir des effets importants.', 'Le moniteur système permet de consulter les processus et les ressources.', 'Les permissions contrôlent l’accès aux fichiers et à certaines opérations.'],
        practice: ['Ouvre le moniteur système depuis le menu.', 'Observe l’utilisation de la mémoire sans arrêter de processus.'],
        deeper: ['Ne colle pas de commande inconnue dans un terminal, surtout lorsqu’elle demande sudo.', 'Les chemins /home et /etc n’ont pas le même rôle ; les modifications système exigent des précautions.'], keywords: ['terminal', 'sudo', 'permissions', 'processus', 'moniteur système', 'linux', 'power shell'] }
];
const TOUR = ['menu', 'panel', 'files', 'settings', 'indicators', 'updates'];
let discoveryTopic = 'menu';
let discoveryDepth = 1;
let discoveryMode = 'free';
let tourIndex = 0;
let discoverySearch = '';
let demoStep = 0;
let demoIsOpen = false;
let simActive = false;
let simMenu = false;
let simWindow = 'none';
let simFolder = 'Personnel';
let simHistory = ['Personnel'];
let simHistoryIndex = 0;
let simPanelMinimized = false;
let simNetworkOpen = false;
let simContextMenu = false;
let simSearch = '';
let simFeedback = 'Choisis un élément dans le bureau simulé.';
/** Remet les seules données de simulation à leur valeur initiale. */
function resetSimulation() {
    simMenu = false;
    simWindow = 'none';
    simFolder = 'Personnel';
    simPanelMinimized = false;
    simHistory = ['Personnel'];
    simHistoryIndex = 0;
    simNetworkOpen = false;
    simContextMenu = false;
    simSearch = '';
    simFeedback = 'Choisis un élément dans le bureau simulé.';
}
/** Les instructions sont propres à chaque outil et distinguent simulation et manipulation réelle. */
const DEMO_FRAMES = {
    menu: [
        { heading: 'Le menu est fermé', detail: 'Repère le bouton Menu en bas à gauche.', marker: 'Bouton Menu' },
        { heading: 'Le menu apparaît', detail: 'Les catégories et la zone de recherche deviennent visibles.', marker: 'Menu ouvert' },
        { heading: 'Rechercher Calculatrice', detail: 'Le résultat de recherche est mis en évidence. Aucun logiciel n’est lancé.', marker: 'Résultat : Calculatrice' }
    ],
    files: [
        { heading: 'Le bureau est visible', detail: 'Repère le dossier personnel sur le bureau.', marker: 'Dossier personnel' },
        { heading: 'Nemo affiche tes dossiers', detail: 'Observe Documents, Images et Téléchargements.', marker: 'Fenêtre Nemo' },
        { heading: 'Ouvrir Téléchargements', detail: 'L’emplacement Téléchargements est sélectionné, sans toucher à tes fichiers.', marker: 'Téléchargements' }
    ],
    panel: [
        { heading: 'Une fenêtre est ouverte', detail: 'La fenêtre est au premier plan.', marker: 'Fenêtre ouverte' },
        { heading: 'Réduire la fenêtre', detail: 'La fenêtre disparaît de la zone de travail, mais reste dans le panneau.', marker: 'Fenêtre réduite' },
        { heading: 'Restaurer la fenêtre', detail: 'Sélectionne son bouton dans le panneau pour la retrouver.', marker: 'Fenêtre restaurée' }
    ],
    settings: [
        { heading: 'Le bureau est visible', detail: 'Repère l’accès aux paramètres.', marker: 'Paramètres' },
        { heading: 'Les paramètres apparaissent', detail: 'Les catégories du système sont affichées.', marker: 'Paramètres système' },
        { heading: 'Choisir Affichage', detail: 'La rubrique Affichage est signalée, sans modifier la résolution.', marker: 'Affichage' }
    ],
    software: [
        { heading: 'Le bureau est visible', detail: 'Repère le gestionnaire de logiciels.', marker: 'Logiciels' },
        { heading: 'Le catalogue apparaît', detail: 'Les familles de logiciels sont présentées.', marker: 'Catalogue' },
        { heading: 'Repérer une application', detail: 'Un résultat est mis en évidence. Aucune installation n’est effectuée.', marker: 'Application trouvée' }
    ],
    updates: [
        { heading: 'Le bureau est visible', detail: 'Repère l’accès au gestionnaire de mises à jour.', marker: 'Mises à jour' },
        { heading: 'Le gestionnaire apparaît', detail: 'L’interface présente un état illustratif, jamais l’état réel de cette machine.', marker: 'État fictif' },
        { heading: 'Identifier Vérifier', detail: 'Le bouton de recherche de mises à jour est signalé. Rien n’est téléchargé.', marker: 'Vérifier' }
    ],
    indicators: [
        { heading: 'Les indicateurs sont visibles', detail: 'Observe les icônes réseau, son et batterie.', marker: 'Indicateurs' },
        { heading: 'Le menu réseau s’ouvre', detail: 'Une liste fictive de réseaux apparaît.', marker: 'Réseau' },
        { heading: 'Repérer une connexion', detail: 'Aucune connexion réelle n’est initiée.', marker: 'Réseaux disponibles' }
    ],
    advanced: [
        { heading: 'Le bureau est visible', detail: 'Le moniteur système est accessible depuis les applications.', marker: 'Moniteur système' },
        { heading: 'Le moniteur apparaît', detail: 'Une vue illustrative des ressources est affichée.', marker: 'Ressources' },
        { heading: 'Identifier les ressources', detail: 'Processeur et mémoire sont signalés, sans lire les métriques du PC.', marker: 'CPU / RAM' }
    ]
};
/** Récupère l'étape pédagogique courante du thème exploré. */
function currentDemoFrame(id) {
    return (DEMO_FRAMES[id] || DEMO_FRAMES.advanced)[demoStep];
}
/** Présente des gestes progressifs liés à la représentation du bureau. */
function discoveryDemo(topic) {
    const frame = currentDemoFrame(topic.id);
    return `<div class="demo-card"><div class="demo-header"><strong>${simActive ? 'Bureau manipulable' : 'Simulation visuelle'}</strong>${simActive ? '' : `<span>Étape ${demoStep + 1} / 3</span>`}</div>
    <div class="demo-progress" ${simActive ? 'hidden' : ''} aria-hidden="true">${[0, 1, 2].map(i => `<span class="${i === demoStep ? 'active' : ''}"></span>`).join('')}</div>
    <div class="demo-stage" ${simActive ? 'hidden' : ''} aria-live="polite" aria-atomic="true"><span class="demo-step-index">${demoStep + 1}</span><div><strong>${esc(frame.heading)}</strong><p>${esc(frame.detail)}</p></div></div>
    <div class="demo-actions" ${simActive ? 'hidden' : ''}><button class="ghost small" data-demo="back" ${demoStep === 0 ? 'disabled' : ''}>Précédent</button><button class="secondary small" data-demo="next" ${demoStep === 2 ? 'disabled' : ''}>Étape suivante</button><button class="ghost small" data-demo="reset">Recommencer</button></div>
    <div class="sim-mode-switch"><button type="button" class="${simActive ? 'secondary' : 'cta'} small" data-sim-mode="steps" aria-pressed="${!simActive}">Voir les étapes</button><button type="button" class="${simActive ? 'cta' : 'secondary'} small" data-sim-mode="interactive" aria-pressed="${simActive}">Manipuler la simulation</button>${simActive ? '<button type="button" class="ghost small" data-sim="reset">Réinitialiser</button>' : ''}</div>
    <p class="demo-note">Tout reste fictif : aucun accès aux fichiers, réglages ou réseaux de ton ordinateur.</p></div>`;
}
/** Rend des paragraphes de conseils issus exclusivement du catalogue pédagogique local. */
function discoveryLines(lines) {
    return `<ol class="discovery-list">${lines.map(line => `<li>${esc(line)}</li>`).join('')}</ol>`;
}
/** Génère une icône et une zone sélectionnable du bureau pédagogique. */
function discoveryHotspot(id, label, position) {
    const topic = DISCOVERY.find(x => x.id === id);
    return `<button type="button" class="mint-hotspot ${position} ${discoveryTopic === id ? 'chosen' : ''}" data-topic="${esc(id)}" aria-label="Explorer : ${esc(label)}"><span aria-hidden="true">${esc(topic.icon)}</span><small>${esc(label)}</small></button>`;
}
/** Produit une fenêtre fictive dont les détails changent avec l'étape pédagogique. */
function demoWindow(topic, stage) {
    if (topic === 'panel' && stage === 1)
        return '';
    const titles = { files: 'Nemo — Dossier personnel', panel: 'Documents — Nemo', settings: 'Paramètres système', updates: 'Gestionnaire de mises à jour', software: 'Gestionnaire de logiciels', advanced: 'Moniteur système', indicators: 'Réseau' };
    const title = titles[topic] || 'Fichiers — Nemo';
    const active = stage === 2 ? 'demo-selected' : '';
    const rows = topic === 'settings' ? [['Affichage', stage === 2], ['Clavier', false], ['Son', false], ['Imprimantes', false]] :
        topic === 'updates' ? [['État illustratif', false], ['Vérifier les mises à jour', stage === 2]] :
            topic === 'software' ? [['Catégories', false], ['Application de démonstration', stage === 2]] :
                topic === 'advanced' ? [['Processeur (exemple)', stage === 2], ['Mémoire (exemple)', stage === 2]] :
                    topic === 'indicators' ? [['Wi-Fi (simulation)', stage === 2], ['Réseau fictif', stage === 2]] :
                        [['Documents', false], ['Images', false], ['Téléchargements', topic === 'files' && stage === 2]];
    const cells = rows.map(([label, selected]) => `<div class="mint-file-entry ${selected ? 'demo-selected' : ''}"><span aria-hidden="true">${topic === 'files' ? '▣' : '◻'}</span>${esc(label)}</div>`).join('');
    return `<div class="mint-window" aria-hidden="true"><div class="mint-window-head"><span>${esc(title)}</span><span>−　□　×</span></div><div class="mint-window-body"><div class="mint-window-nav">Personnel<br>Documents<br>Images<br>Téléchargements<br>Corbeille</div><div class="mint-window-folders ${active}">${cells}</div></div></div>`;
}
/** Navigue uniquement dans les dossiers prédéfinis de la simulation. */
function navigateSimFolder(folder) {
    if (folder === simFolder)
        return;
    simHistory = simHistory.slice(0, simHistoryIndex + 1);
    simHistory.push(folder);
    simHistoryIndex = simHistory.length - 1;
    simFolder = folder;
}
/** Parcourt l'historique fictif sans modifier les fichiers réels. */
function moveSimHistory(direction) {
    const next = simHistoryIndex + direction;
    if (next < 0 || next >= simHistory.length)
        return;
    simHistoryIndex = next;
    simFolder = simHistory[next];
    simFeedback = `Retour vers ${simFolder} dans la simulation.`;
}
/** Dessine la fenêtre Nemo fictive et ses dossiers, sans lire le disque de l'utilisateur. */
function simulatedFiles() {
    const folders = ['Documents', 'Images', 'Téléchargements'];
    const listing = simFolder === 'Personnel' ? folders.map(f => `<button type="button" class="sim-folder" data-sim="folder:${f}">▣ ${f}</button>`).join('') :
        `<div class="sim-placeholder">${esc(simFolder)} est vide dans cet exemple.<small>Aucun fichier réel n'est affiché.</small></div>`;
    return `<div class="sim-window" aria-label="Nemo fictif"><div class="sim-titlebar"><strong>Nemo — ${esc(simFolder)}</strong><button type="button" data-sim="minimize" aria-label="Réduire la fenêtre">−</button><button type="button" data-sim="close" aria-label="Fermer la fenêtre">×</button></div>
    <div class="sim-file-toolbar" role="group" aria-label="Navigation fictive">
      <button type="button" data-sim="history-back" ${simHistoryIndex === 0 ? 'disabled' : ''} aria-label="Dossier précédent">←</button>
      <button type="button" data-sim="history-forward" ${simHistoryIndex === simHistory.length - 1 ? 'disabled' : ''} aria-label="Dossier suivant">→</button>
      <button type="button" data-sim="folder:Personnel" ${simFolder === 'Personnel' ? 'disabled' : ''} aria-label="Dossier parent">↑</button>
      <span aria-label="Emplacement fictif">Personnel / ${esc(simFolder)}</span>
    </div>
    <div class="sim-window-body"><nav class="sim-sidebar" aria-label="Dossiers fictifs"><button data-sim="folder:Personnel">⌂ Personnel</button>${folders.map(f => `<button type="button" data-sim="folder:${f}" aria-current="${simFolder === f ? 'page' : 'false'}">${f}</button>`).join('')}</nav><div class="sim-file-list">${listing}</div></div></div>`;
}
/** Produit le contenu d'une application illustrative, distinct des logiciels réels. */
function simulatedApplication() {
    if (simWindow === 'files')
        return simulatedFiles();
    const titles = { calculator: 'Calculatrice', settings: 'Paramètres système', software: 'Gestionnaire de logiciels', updates: 'Gestionnaire de mises à jour', monitor: 'Moniteur système' };
    const title = titles[simWindow] || 'Application';
    const choices = simWindow === 'settings' ? ['Affichage', 'Son', 'Clavier', 'Imprimantes'] :
        simWindow === 'software' ? ['VLC', 'LibreOffice', 'Firefox'] :
            simWindow === 'updates' ? ['Voir les mises à jour', 'Détails des correctifs'] :
                simWindow === 'monitor' ? ['Processeur', 'Mémoire', 'Disques'] :
                    ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
    return `<div class="sim-window" aria-label="${esc(title)} fictif"><div class="sim-titlebar"><strong>${esc(title)} · simulation</strong><button type="button" data-sim="minimize" aria-label="Réduire la fenêtre">−</button><button type="button" data-sim="close" aria-label="Fermer la fenêtre">×</button></div><div class="sim-app-body">${choices.map(ch => `<button type="button" class="sim-tile" data-sim="inspect:${esc(ch)}">${esc(ch)}</button>`).join('')}<small>Les données et les opérations sont fictives.</small></div></div>`;
}
/** Construit une démonstration interactive du bureau sans aucune action native. */
function interactiveDesktop() {
    const searchResults = ['Calculatrice', 'Fichiers', 'Paramètres', 'Gestionnaire de logiciels', 'Gestionnaire de mises à jour', 'Moniteur système'].filter(name => name.toLocaleLowerCase('fr').includes(simSearch.toLocaleLowerCase('fr')));
    const appIds = { 'Calculatrice': 'calculator', 'Fichiers': 'files', 'Paramètres': 'settings', 'Gestionnaire de logiciels': 'software', 'Gestionnaire de mises à jour': 'updates', 'Moniteur système': 'monitor' };
    return `<div class="sim-desktop" role="group" aria-label="Bureau Linux Mint simulé, entièrement fictif"><div class="sim-wallpaper">
    <button type="button" class="sim-desktop-shortcut" data-sim="open:files">▣<span>Dossier personnel</span></button>
    ${simWindow !== 'none' && !simPanelMinimized ? simulatedApplication() : ''}
    ${simMenu ? `<div class="sim-menu" role="group" aria-label="Menu Cinnamon fictif"><label class="sim-search-label" for="sim-app-search">Rechercher une application</label><input id="sim-app-search" data-sim-search type="search" value="${esc(simSearch)}" placeholder="Calculatrice, Fichiers…" autocomplete="off"><div id="sim-search-results" class="sim-results">${searchResults.length ? searchResults.map(name => `<button type="button" data-sim="open:${appIds[name]}">${esc(name)}</button>`).join('') : '<span>Aucun résultat</span>'}</div></div>` : ''}
    ${simContextMenu ? `<div class="sim-context-menu" role="menu" aria-label="Menu contextuel fictif">
      <button type="button" role="menuitem" data-sim="open:files">Ouvrir Fichiers</button>
      <button type="button" role="menuitem" data-sim="open:settings">Paramètres du bureau</button>
      <button type="button" role="menuitem" data-sim="context-close">Fermer ce menu</button>
    </div>` : ''}
    ${simNetworkOpen ? `<div class="sim-network"><strong>Réseau (fictif)</strong><p>Wi-Fi de démonstration</p><small>Aucune connexion réelle.</small></div>` : ''}
  </div><div class="sim-taskbar"><button type="button" data-sim="menu" aria-expanded="${simMenu}">☰ Menu</button><button type="button" data-sim="open:files">▣ Fichiers</button>${simWindow !== 'none' ? `<button type="button" data-sim="restore" aria-label="${simPanelMinimized ? 'Restaurer' : 'Réduire'} ${esc(simWindow)}">${simPanelMinimized ? '▢ Restaurer' : '▣ Fenêtre'}</button>` : ''}<button type="button" data-sim="network" aria-expanded="${simNetworkOpen}">⌁ Réseau</button></div>
    <div class="sim-feedback" role="status" aria-live="polite">${esc(simFeedback)}</div></div>`;
}
/** Applique uniquement des transitions à la maquette en mémoire, sans pont Python. */
function handleSimulation(action) {
    if (action === 'reset') {
        resetSimulation();
        return;
    }
    if (action === 'history-back') {
        moveSimHistory(-1);
        return;
    }
    if (action === 'history-forward') {
        moveSimHistory(1);
        return;
    }
    if (action === 'context-open') {
        simContextMenu = true;
        simMenu = false;
        simNetworkOpen = false;
        simFeedback = 'Menu contextuel ouvert dans la simulation.';
        return;
    }
    if (action === 'context-close') {
        simContextMenu = false;
        simFeedback = 'Menu contextuel fermé.';
        return;
    }
    if (action === 'menu') {
        simContextMenu = false;
        simMenu = !simMenu;
        simNetworkOpen = false;
        simFeedback = simMenu ? 'Menu ouvert : choisis une application.' : 'Menu fermé.';
        return;
    }
    if (action === 'network') {
        simContextMenu = false;
        simNetworkOpen = !simNetworkOpen;
        simMenu = false;
        simFeedback = 'Le réseau présenté est fictif.';
        return;
    }
    if (action === 'close') {
        simWindow = 'none';
        simPanelMinimized = false;
        simFeedback = 'Fenêtre fermée.';
        return;
    }
    if (action === 'minimize') {
        simPanelMinimized = true;
        simFeedback = 'Fenêtre réduite : elle reste accessible depuis le panneau.';
        return;
    }
    if (action === 'restore') {
        simPanelMinimized = !simPanelMinimized;
        simFeedback = simPanelMinimized ? 'Fenêtre réduite.' : 'Fenêtre restaurée.';
        return;
    }
    if (action.startsWith('folder:')) {
        const folder = action.slice(7);
        if (['Personnel', 'Documents', 'Images', 'Téléchargements'].includes(folder)) {
            simWindow = 'files';
            navigateSimFolder(folder);
            simPanelMinimized = false;
            simMenu = false;
            simFeedback = `Dossier ${folder} affiché dans la simulation.`;
        }
        return;
    }
    if (action.startsWith('open:')) {
        simContextMenu = false;
        const app = action.slice(5);
        if (['files', 'calculator', 'settings', 'software', 'updates', 'monitor'].includes(app)) {
            simWindow = app;
            simPanelMinimized = false;
            simMenu = false;
            if (app === 'files') {
                simFolder = 'Personnel';
                simHistory = ['Personnel'];
                simHistoryIndex = 0;
            }
            simFeedback = 'Application fictive ouverte. Tu peux explorer ses éléments.';
        }
        return;
    }
    if (action.startsWith('inspect:')) {
        const label = action.slice(8);
        simFeedback = `« ${label} » est un élément de démonstration : aucun changement système.`;
    }
}
/** Dessine un bureau illustratif : chaque étape modifie effectivement la scène. */
function discoveryDesktop() {
    if (discoveryDepth === 3 && simActive)
        return interactiveDesktop();
    const topic = discoveryTopic;
    const stage = discoveryDepth === 3 ? demoStep : 1;
    const isMenu = topic === 'menu';
    const showMenu = isMenu && stage > 0;
    const showWindow = !isMenu && (topic === 'panel' || stage > 0);
    const menuPanel = showMenu ? `<div class="cinnamon-menu" aria-hidden="true"><div class="cinnamon-menu-search ${stage === 2 ? 'demo-search-active' : ''}">${stage === 2 ? 'Calculatrice' : '⌕ Rechercher une application'}</div><div class="cinnamon-menu-body"><div class="cinnamon-menu-favs">★<br>▣<br>⚙</div><div class="cinnamon-menu-cats">Toutes les applications<br>Accessoires<br>Bureautique<br>Internet<br>Administration</div><div class="cinnamon-menu-apps">${stage === 2 ? '<strong class="demo-result">▧ Calculatrice</strong>' : 'Calculatrice'}<br>Fichiers<br>Éditeur de texte<br>Paramètres</div></div></div>` : '';
    const windowPanel = showWindow ? demoWindow(topic, stage) : '';
    const indicatorMenu = topic === 'indicators' && stage > 0 ? `<div class="mint-indicator-popup" aria-hidden="true"><strong>Réseau (simulation)</strong><div class="${stage === 2 ? 'demo-selected' : ''}">Réseau de démonstration</div><small>Aucune connexion réelle</small></div>` : '';
    return `<div class="mint-desktop mint-v12 mint-v13" role="group" aria-label="Bureau Cinnamon illustratif. Les boutons sélectionnent des fiches ; aucune action réelle n'est réalisée.">
    <div class="mint-wallpaper"><div class="mint-abstract" aria-hidden="true"></div>
      ${discoveryHotspot('files', 'Dossier personnel', 'desktop-files')}
      ${discoveryHotspot('settings', 'Paramètres', 'desktop-settings')}
      ${windowPanel}${menuPanel}${indicatorMenu}
    </div>
    <div class="mint-panel">
      ${discoveryHotspot('menu', 'Menu', 'panel-menu')}
      ${discoveryHotspot('software', 'Logiciels', 'panel-software')}
      ${discoveryHotspot('panel', 'Fenêtres', 'panel-windows')}
      ${discoveryHotspot('updates', 'Mises à jour', 'panel-updates')}
      ${discoveryHotspot('indicators', 'Indicateurs', 'panel-indicators')}
    </div>
    ${discoveryDepth === 3 ? `<div class="demo-visual-caption" role="status">${esc(currentDemoFrame(topic).marker)} — ${demoStep + 1}/3</div>` : ''}
  </div>`;
}
/** Affiche une fiche pédagogique au niveau choisi, toujours facultatif. */
function discoveryDetail(topic) {
    const labels = ['Découvrir', 'Comprendre', 'Utiliser', 'Approfondir'];
    const text = discoveryDepth === 1 ? `<p>${esc(topic.discover)}</p>` :
        discoveryDepth === 2 ? discoveryLines(topic.understand) :
            discoveryDepth === 3 ? `${discoveryDemo(topic)}<h3>À essayer sur ton vrai bureau</h3>${discoveryLines(topic.practice)}` :
                discoveryLines(topic.deeper);
    return `<section class="discovery-detail" aria-label="Fiche : ${esc(topic.title)}"><span class="overline">${discoveryMode === 'tour' ? `VISITE GUIDÉE · ${tourIndex + 1}/${TOUR.length}` : 'EXPLORATION LIBRE'}</span><h2>${esc(topic.title)}</h2><p class="discovery-lead">${esc(topic.short)}</p>
    <div class="depth-tabs" role="group" aria-label="Profondeur d'explication">${labels.map((label, i) => `<button class="depth-tab ${discoveryDepth === i + 1 ? 'active' : ''}" data-depth="${i + 1}" aria-pressed="${discoveryDepth === i + 1}">${label}</button>`).join('')}</div>
    <div class="depth-content">${text}</div><p class="equivalent"><strong>Repère Windows :</strong> ${esc(topic.windows)}.</p>
    ${discoveryMode === 'tour' ? `<div class="tour-controls"><button class="ghost small" data-tour="previous" ${tourIndex === 0 ? 'disabled' : ''}>Précédent</button><button class="secondary small" data-tour="leave">Quitter la visite</button><button class="cta small" data-tour="next">${tourIndex === TOUR.length - 1 ? 'Terminer la visite' : 'Étape suivante'}</button></div>` : ''}
  </section>`;
}
/** Dessine l'exploration, la recherche locale et les deux modes sans requête réseau. */
function discovery() {
    const filtered = DISCOVERY.filter(x => `${x.title} ${x.short} ${x.windows} ${x.keywords.join(' ')}`.toLocaleLowerCase('fr').includes(discoverySearch.toLocaleLowerCase('fr')));
    const topic = DISCOVERY.find(x => x.id === discoveryTopic);
    return `<div class="discovery-heading"><span class="overline">RETOUVER MES HABITUDES</span><h1>Découvrir mon ordinateur</h1><p>Explore les éléments du bureau Linux Mint Cinnamon, ou suis une visite des fonctions essentielles.</p></div>
    <div class="discovery-toolbar"><button class="${discoveryMode === 'free' ? 'cta' : 'secondary'}" data-discovery-mode="free" aria-pressed="${discoveryMode === 'free'}">Exploration libre</button><button class="${discoveryMode === 'tour' ? 'cta' : 'secondary'}" data-discovery-mode="tour" aria-pressed="${discoveryMode === 'tour'}">Visite guidée</button><label class="search-wrap"><span class="sr-only">Rechercher une fonction ou un terme Windows</span><input id="discovery-search" type="search" autocomplete="off" value="${esc(discoverySearch)}" placeholder="Rechercher : téléchargements, menu Démarrer…"></label></div>
    <div class="discovery-layout"><div class="discovery-left">${discoveryDesktop()}<p class="desktop-disclaimer">Bureau illustratif, non connecté à Cinnamon. Les menus peuvent varier selon la version installée.</p><div class="topic-list" aria-label="Fonctions explorables">${filtered.length ? filtered.map(x => `<button class="topic-choice ${x.id === discoveryTopic ? 'active' : ''}" data-topic="${esc(x.id)}" aria-pressed="${x.id === discoveryTopic}"><span aria-hidden="true">${esc(x.icon)}</span>${esc(x.title)}</button>`).join('') : '<p class="muted">Aucun sujet trouvé. Essaie un autre mot.</p>'}</div></div>${discoveryDetail(topic)}</div>`;
}
const NAV = [
    { id: 'home', text: 'Accueil', icon: '⌂' },
    { id: 'discovery', text: 'Retrouver mes habitudes', icon: '▣' },
    { id: 'wizard', text: 'Assistant de bienvenue', icon: '✧' },
    ...MODULES.map(m => ({ id: m.id, text: m.title, icon: m.icon })),
    { id: 'guides', text: 'Guides hors ligne', icon: '☷' },
    { id: 'security', text: 'Sécurité et choix', icon: '◇' }
];
let page = 'home';
let tab = 'essential';
let wizardIndex = 0;
let mailMode = 'existing';
let selectedProvider = 'mailbox';
let state = { completed: false, acceptedModules: [], provider: '', username: '', apps: {}, firstRun: true };
let lastNotice = '';
let lastError = '';
let guideText = '';
let guideId = 'bienvenue';
let busyAction = '';
let nextRequestId = 1;
const callbacks = new Map();
/** Échappe le texte avant insertion dans le HTML de l'interface. */
function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}
/** Convertit un sous-ensemble volontairement restreint du Markdown local en HTML échappé. */
function markdownSafe(source) {
    const lines = source.replace(/\r\n/g, '\n').split('\n');
    let result = '';
    let currentList = '';
    const inline = (value) => esc(value)
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');
    const closeList = () => { if (currentList) {
        result += `</${currentList}>`;
        currentList = '';
    } };
    for (const line of lines) {
        const heading = line.match(/^(#{1,3})\s+(.+)$/);
        const bullet = line.match(/^\s*[-*]\s+(.+)$/);
        const numbered = line.match(/^\s*\d+\.\s+(.+)$/);
        if (heading) {
            closeList();
            const size = Math.min(3, heading[1].length + 1);
            result += `<h${size}>${inline(heading[2])}</h${size}>`;
        }
        else if (bullet || numbered) {
            const kind = bullet ? 'ul' : 'ol';
            if (currentList !== kind) {
                closeList();
                result += `<${kind}>`;
                currentList = kind;
            }
            result += `<li>${inline((bullet || numbered)[1])}</li>`;
        }
        else if (!line.trim()) {
            closeList();
        }
        else {
            closeList();
            result += `<p>${inline(line)}</p>`;
        }
    }
    closeList();
    return result;
}
/** Relie les appels TypeScript aux actions explicitement autorisées du backend GTK. */
function native(action, payload = {}) {
    const bridge = window.webkit?.messageHandlers?.bridge;
    if (!bridge)
        return Promise.reject(new Error('Mode aperçu : lance cette interface avec l’application installée sur Linux Mint.'));
    const id = nextRequestId++;
    return new Promise((resolve, reject) => {
        callbacks.set(id, { resolve, reject });
        bridge.postMessage(JSON.stringify({ id, action, payload }));
    });
}
/** Reçoit la réponse du backend ; aucun mécanisme d'évaluation dynamique n'est utilisé. */
function receive(reply) {
    const pending = callbacks.get(reply.id);
    if (!pending)
        return;
    callbacks.delete(reply.id);
    if (reply.ok)
        pending.resolve(reply.data);
    else
        pending.reject(new Error(reply.error || 'Erreur de l’application'));
}
/** Met à jour l'état local à partir du backend, sans jamais charger d'identifiant secret. */
async function loadState() {
    try {
        state = (await native('get_status'));
        selectedProvider = state.provider || 'mailbox';
        if (state.firstRun)
            page = 'discovery';
    }
    catch (e) {
        lastNotice = 'Aperçu graphique hors application native : les actions système sont indisponibles.';
    }
    draw();
}
/** Navigue vers un écran et met à jour l'affichage. */
function go(id) {
    if (!NAV.some(item => item.id === id))
        return;
    page = id;
    tab = 'essential';
    lastError = '';
    lastNotice = '';
    draw();
}
/** Dessine la navigation permanente. */
function drawNav() {
    const el = document.getElementById('navigation');
    if (!el)
        return;
    el.innerHTML = NAV.map(item => `<button class="nav-item ${page === item.id ? 'active' : ''}" data-go="${esc(item.id)}"><span class="nav-icon">${esc(item.icon)}</span>${esc(item.text)}</button>`).join('');
}
/** Produit un bandeau de retour ou d'erreur sans injecter de contenu non fiable. */
function alerts() {
    return (lastError ? `<div class="error" role="alert">${esc(lastError)}</div>` : '') + (lastNotice ? `<div class="success" role="status">${esc(lastNotice)}</div>` : '');
}
/** Affiche le tableau de bord et le parcours de personnalisation. */
function home() {
    const done = state.acceptedModules.length;
    return `<div class="hero"><div><span class="overline">BIENVENUE SUR PIXELPROWLERS LIBRE</span><h1>Un ordinateur qui vous appartient <span class="accent">vraiment.</span></h1><p>Messagerie, mots de passe, sauvegardes et documents : personnalisez votre espace numérique sans compte imposé. Vos choix restent sur cet ordinateur.</p><div class="links"><button class="cta" data-go="wizard">${state.completed ? 'Revoir ma configuration' : 'Commencer ma configuration'} →</button><button class="secondary" data-go="discovery">Découvrir Linux Mint</button></div></div></div>
  ${alerts()}<div class="section-head"><h2>Votre parcours</h2><span class="muted">${done} module${done > 1 ? 's' : ''} parcouru${done > 1 ? 's' : ''} sur ${MODULES.length}</span></div>
  <div class="progress-track"><div class="progress-fill" style="width:${Math.round(done / MODULES.length * 100)}%"></div></div>
  <div class="grid" style="margin-top:19px">${MODULES.map(m => `<article class="tile"><span class="tile-icon">${m.icon}</span><h3>${esc(m.title)}</h3><p>${esc(m.lead)}</p><div class="tile-foot"><span class="tag ${state.acceptedModules.includes(m.id) ? 'good' : 'neutral'}">${state.acceptedModules.includes(m.id) ? 'Découvert' : 'À découvrir'}</span><button class="ghost small" data-go="${m.id}">Personnaliser →</button></div></article>`).join('')}</div>`;
}
/** Affiche le parcours guidé, avec possibilité de passer chaque module. */
function wizard() {
    const m = MODULES[wizardIndex];
    const installed = m.app ? state.apps[m.app] : true;
    return `<div class="wizard-header"><div><span class="overline">ASSISTANT DE PREMIÈRE UTILISATION</span><h1 style="margin:9px 0">Créons votre espace numérique.</h1></div><span class="tag">${wizardIndex + 1} / ${MODULES.length}</span></div>
  <div class="progress-track"><div class="progress-fill" style="width:${(wizardIndex + 1) / MODULES.length * 100}%"></div></div>
  ${alerts()}<div class="panel wizard-main"><div class="module-icon">${m.icon}</div><h2 style="font-size:23px">${esc(m.title)}</h2><p>${esc(m.lead)}</p>
  <div class="divider"></div><p class="overline">POUR DÉMARRER</p><div class="step-list">${m.essential.map(s => `<div class="step-item"><span class="step-text">${esc(s)}</span></div>`).join('')}</div>
  ${m.id === 'messagerie' ? providerChoices() : ''}
  <div class="divider"></div><div class="links"><span class="tag ${installed ? 'good' : 'warn'}">${installed ? '✓ ' + esc(m.appLabel) + ' présent' : esc(m.appLabel) + ' absent'}</span>
  ${m.app ? `<button class="secondary small" data-action="${installed ? 'open' : 'install'}" data-app="${esc(m.app)}">${installed ? 'Ouvrir ' + esc(m.appLabel) : 'Installer ' + esc(m.appLabel)}</button>` : ''}
  <button class="ghost small" data-go="${m.id}">Voir les options avancées</button></div>
  <p class="fine">${esc(m.hint)}</p></div>
  <div class="buttons"><button class="ghost" data-action="back" ${wizardIndex === 0 ? 'disabled' : ''}>← Précédent</button><button class="secondary" data-action="skip">Passer</button><button class="cta" data-action="next">${wizardIndex === MODULES.length - 1 ? 'Terminer mon parcours' : 'Continuer →'}</button></div>`;
}
/** Affiche les choix d'e-mail sans champ de mot de passe ni collecte d'adresse. */
function providerChoices() {
    return `<div class="divider"></div><p class="overline">JE SOUHAITE…</p>
  <label class="choice ${mailMode === 'existing' ? 'selected' : ''}"><input type="radio" name="mail-mode" value="existing" ${mailMode === 'existing' ? 'checked' : ''}>Configurer mon adresse actuelle dans Thunderbird</label>
  <label class="choice ${mailMode === 'new' ? 'selected' : ''}"><input type="radio" name="mail-mode" value="new" ${mailMode === 'new' ? 'checked' : ''}>Choisir une messagerie plus indépendante</label>
  <label class="choice ${mailMode === 'later' ? 'selected' : ''}"><input type="radio" name="mail-mode" value="later" ${mailMode === 'later' ? 'checked' : ''}>Décider plus tard</label>
  ${mailMode === 'new' ? `<p class="fine">Choisissez une solution à découvrir ; l'inscription reste entièrement sous votre contrôle.</p>${providers()}` : ''}
  ${mailMode === 'existing' ? '<p class="fine">Votre adresse et votre mot de passe seront saisis directement dans Thunderbird, jamais dans PixelProwlers LIBRE.</p>' : ''}`;
}
/** Présente les fournisseurs avec des liens officiels et une compatibilité expliquée. */
function providers() {
    return PROVIDERS.map(p => `<div class="provider"><div><strong>${esc(p.name)} <span class="tag">${esc(p.tag)}</span></strong><small>${esc(p.desc)}</small></div><div class="links"><button class="ghost small" data-action="website" data-provider="${p.link}">Site officiel ↗</button><button class="${selectedProvider === p.id ? 'cta' : 'secondary'} small" data-action="provider" data-provider="${p.id}">${selectedProvider === p.id ? 'Choisi' : 'Choisir'}</button></div></div>`).join('');
}
/** Affiche les options essentielles, avancées et services alternatifs d'une fonction. */
function moduleView(id) {
    const m = MODULES.find(v => v.id === id);
    if (!m)
        return home();
    const installed = m.app ? state.apps[m.app] : true;
    return `<div class="module-heading"><span class="overline">CENTRE DE CONFIGURATION / ${esc(id.toUpperCase())}</span><h1>${m.icon} ${esc(m.title)}</h1><p>${esc(m.lead)}</p></div>${alerts()}
  <div class="tabs" role="tablist"><button class="tab ${tab === 'essential' ? 'active' : ''}" data-tab="essential">Essentiel</button><button class="tab ${tab === 'advanced' ? 'active' : ''}" data-tab="advanced">Protection avancée</button><button class="tab ${tab === 'alternatives' ? 'active' : ''}" data-tab="alternatives">Alternatives & guide</button></div>
  ${tab === 'alternatives' ? `<div class="panel"><h2>Choisir en connaissance de cause</h2><p>Chaque service présente des avantages, des limites et des dépendances. Aucune solution n’est imposée.</p>${id === 'messagerie' ? providers() : ''}<div class="links"><button class="secondary" data-action="guide" data-guide="${id}">Lire le guide détaillé hors ligne</button></div></div>` :
        `<div class="panel"><h2>${tab === 'essential' ? 'Prise en main' : 'Options avancées'}</h2><div class="step-list">${(tab === 'essential' ? m.essential : m.advanced).map(s => `<div class="step-item"><span class="step-text">${esc(s)}</span></div>`).join('')}</div><div class="divider"></div><p class="notice">${esc(m.hint)}</p><div class="links" style="margin-top:19px"><span class="tag ${installed ? 'good' : 'warn'}">${installed ? 'Application disponible' : 'Application non installée'}</span>${m.app ? `<button class="cta" data-action="${installed ? 'open' : 'install'}" data-app="${esc(m.app)}">${installed ? 'Ouvrir ' + esc(m.appLabel) : 'Installer ' + esc(m.appLabel)}</button>` : ''}<button class="secondary" data-action="guide" data-guide="${id}">Guide complet</button></div></div>`}
  <div class="section-head"><h2>Le contrôle reste entre vos mains</h2></div><div class="check-card"><input id="mod-completed" type="checkbox" data-action="mark" data-module="${m.id}" ${state.acceptedModules.includes(m.id) ? 'checked' : ''}><div><label for="mod-completed"><strong>J’ai découvert ce module</strong></label><small>Simple repère de progression ; aucune action n’est faite sans votre accord.</small></div></div>`;
}
/** Montre le catalogue des guides livrés hors ligne. */
function guides() {
    const guideCatalog = [{ id: 'bienvenue', title: 'Bienvenue et principes LIBRE' }, { id: 'securite', title: 'Sécurité : risques et décisions' }, ...MODULES.map(m => ({ id: m.id, title: m.title }))];
    return `<span class="overline">DOCUMENTATION LOCALE</span><h1>Vos guides, même sans Internet.</h1><p class="muted">Chaque guide détaille l’utilisation de base, les options avancées, les limites et les procédures de récupération.</p>${alerts()}
  <div class="grid" style="margin-top:22px">${guideCatalog.map(g => `<div class="tile"><h3>${esc(g.title)}</h3><p>Instructions pas à pas et conseils de confidentialité.</p><button class="secondary" data-action="guide" data-guide="${g.id}">Lire le guide →</button></div>`).join('')}</div>
  ${guideText ? `<div class="panel" style="margin-top:21px"><div class="links" style="justify-content:space-between"><h2>${esc(guideId)}</h2><button class="ghost small" data-action="close-guide">Fermer</button></div><div class="guide" id="guide-body">${markdownSafe(guideText)}</div></div>` : ''}`;
}
/** Décrit honnêtement les protections et limites mesurées ou non mesurées. */
function security() {
    return `<span class="overline">SÉCURITÉ ET TRANSPARENCE</span><h1>Votre liberté commence par une information claire.</h1><p class="muted">Le configurateur ne promet pas l'anonymat, n'accède pas à vos identifiants et ne modifie pas le BIOS ni les partitions.</p>${alerts()}
  <div class="grid"><div class="tile"><span class="tile-icon">♢</span><h3>Choix locaux</h3><p>Seuls vos choix de navigation et la progression sont conservés dans votre dossier personnel. Pas d’adresse email, pas de mot de passe.</p></div>
  <div class="tile"><span class="tile-icon">▣</span><h3>Accès administrateur ponctuel</h3><p>Installer un logiciel nécessite votre confirmation dans la boîte de dialogue système. La liste des logiciels installables est limitée et vérifiée.</p></div>
  <div class="tile"><span class="tile-icon">⌁</span><h3>Avahi et impression</h3><p>La découverte des imprimantes reste disponible pour faciliter la vie. Elle peut révéler certaines informations au réseau local.</p></div>
  <div class="tile"><span class="tile-icon">⚑</span><h3>Chiffrement du disque</h3><p>Ne présumez pas que le SSD est chiffré. La présence de LUKS et l’état de Secure Boot doivent être documentés dans le dossier machine.</p></div></div>
  <div class="panel" style="margin-top:21px"><h2>Une question de confidentialité ?</h2><p>Ouvrez le guide de sécurité pour comprendre les sauvegardes, l'authentification à deux facteurs, le chiffrement et les risques d'un appareil perdu.</p><button class="secondary" data-action="guide" data-guide="securite">Lire le guide de sécurité</button>${guideText && guideId === 'securite' ? `<div class="divider"></div><div class="guide">${markdownSafe(guideText)}</div>` : ''}</div>`;
}
/** Reconstruit l'écran actif après chaque action. */
function draw() {
    drawNav();
    const content = document.getElementById('content');
    if (!content)
        return;
    content.innerHTML = page === 'discovery' ? discovery() : page === 'home' ? home() : page === 'wizard' ? wizard() : page === 'guides' ? guides() : page === 'security' ? security() : moduleView(page);
    const crumb = document.getElementById('bread');
    if (crumb)
        crumb.textContent = `LIBRE / ${page === 'home' ? 'Ma configuration' : page === 'discovery' ? 'Découvrir Linux Mint' : page === 'wizard' ? 'Assistant' : NAV.find(n => n.id === page)?.text || page}`;
    const status = document.getElementById('status-line');
    if (status)
        status.textContent = busyAction ? 'Installation en cours…' : state.completed ? 'Configuration initiale terminée' : 'Modifiable à tout moment';
}
/** Conserve une progression non sensible dans le dossier personnel de l'utilisateur. */
async function markModule(id, done) {
    const updated = done ? [...new Set([...state.acceptedModules, id])] : state.acceptedModules.filter(v => v !== id);
    try {
        state = (await native('save_state', { acceptedModules: updated, provider: selectedProvider, completed: state.completed }));
        lastNotice = 'Choix enregistré sur cet ordinateur.';
    }
    catch (e) {
        lastError = String(e);
    }
    draw();
}
/** Lance une application choisie dans la liste autorisée, sans ouvrir de shell. */
async function openApp(id) {
    try {
        await native('open_app', { id });
        lastNotice = 'Application demandée.';
    }
    catch (e) {
        lastError = String(e);
    }
    draw();
}
/** Demande l'installation d'un paquet autorisé, après consentement explicite. */
async function installApp(id) {
    const label = MODULES.find(m => m.app === id)?.appLabel || id;
    if (!window.confirm(`Installer « ${label} » depuis les dépôts du système ?\n\nLinux demandera une authentification administrateur. Aucune donnée personnelle n'est transmise à PixelProwlers.`))
        return;
    lastError = '';
    lastNotice = '';
    busyAction = id;
    draw();
    try {
        await native('install_app', { id });
        state = (await native('get_status'));
        lastNotice = `Installation de « ${label} » terminée.`;
    }
    catch (e) {
        lastError = `Impossible d'installer ${label} : ${String(e)}`;
    }
    finally {
        busyAction = '';
        draw();
    }
}
/** Enregistre le fournisseur sélectionné sans adresse email ni mot de passe. */
async function chooseProvider(id) {
    if (!PROVIDERS.some(p => p.id === id))
        return;
    selectedProvider = id;
    try {
        state = (await native('save_state', { provider: id, acceptedModules: state.acceptedModules, completed: state.completed }));
        lastNotice = 'Votre préférence a été enregistrée localement.';
    }
    catch (e) {
        lastError = String(e);
    }
    draw();
}
/** Ouvre le site officiel d'un fournisseur préalablement autorisé par le backend. */
async function website(id) { try {
    await native('open_website', { id });
}
catch (e) {
    lastError = String(e);
    draw();
} }
/** Charge uniquement un guide livré avec l'application et connu du backend. */
async function readGuide(id) {
    try {
        guideId = id;
        guideText = String(await native('read_guide', { id }));
        lastError = '';
        if (page !== 'security')
            page = 'guides';
    }
    catch (e) {
        lastError = String(e);
    }
    draw();
    document.getElementById('guide-body')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
/** Termine l'assistant et supprime les ouvertures automatiques aux prochaines connexions. */
async function finish() {
    try {
        state = (await native('complete_setup'));
        lastNotice = 'Votre configuration initiale est terminée. Vous pourrez revenir dans le Centre LIBRE à tout moment.';
        page = 'home';
    }
    catch (e) {
        lastError = String(e);
    }
    draw();
}
/** Associe une seule gestion d'événements aux boutons créés dynamiquement. */
function wireEvents() {
    document.addEventListener('click', async (event) => {
        const el = event.target.closest('[data-go],[data-tab],[data-action],[data-topic],[data-depth],[data-discovery-mode],[data-tour],[data-demo],[data-sim],[data-sim-mode]');
        if (!el)
            return;
        if (el.dataset.topic) {
            discoveryTopic = el.dataset.topic;
            discoveryDepth = 1;
            demoStep = 0;
            demoIsOpen = false;
            simActive = false;
            resetSimulation();
            if (discoveryMode === 'tour') {
                discoveryMode = 'free';
            }
            draw();
            return;
        }
        if (el.dataset.depth) {
            const depth = Number(el.dataset.depth);
            if (Number.isInteger(depth) && depth >= 1 && depth <= 4) {
                discoveryDepth = depth;
                demoStep = 0;
                demoIsOpen = false;
                simActive = false;
                resetSimulation();
                draw();
            }
            return;
        }
        if (el.dataset.discoveryMode) {
            discoveryMode = el.dataset.discoveryMode === 'tour' ? 'tour' : 'free';
            if (discoveryMode === 'tour') {
                tourIndex = 0;
                discoveryTopic = TOUR[0];
            }
            discoveryDepth = 1;
            demoStep = 0;
            demoIsOpen = false;
            simActive = false;
            resetSimulation();
            draw();
            return;
        }
        if (el.dataset.tour) {
            if (el.dataset.tour === 'leave') {
                discoveryMode = 'free';
            }
            if (el.dataset.tour === 'previous')
                tourIndex = Math.max(0, tourIndex - 1);
            if (el.dataset.tour === 'next') {
                if (tourIndex === TOUR.length - 1) {
                    discoveryMode = 'free';
                }
                else
                    tourIndex++;
            }
            if (discoveryMode === 'tour')
                discoveryTopic = TOUR[tourIndex];
            discoveryDepth = 1;
            demoStep = 0;
            demoIsOpen = false;
            simActive = false;
            resetSimulation();
            draw();
            return;
        }
        if (el.dataset.simMode) {
            simActive = el.dataset.simMode === 'interactive';
            resetSimulation();
            draw();
            return;
        }
        if (el.dataset.sim) {
            if (discoveryDepth === 3 && simActive) {
                handleSimulation(el.dataset.sim);
                draw();
            }
            return;
        }
        if (el.dataset.demo) {
            if (el.dataset.demo === 'next')
                demoStep = Math.min(2, demoStep + 1);
            if (el.dataset.demo === 'back')
                demoStep = Math.max(0, demoStep - 1);
            if (el.dataset.demo === 'reset')
                demoStep = 0;
            demoIsOpen = true;
            draw();
            return;
        }
        if (el.dataset.go) {
            go(el.dataset.go);
            return;
        }
        if (el.dataset.tab) {
            tab = el.dataset.tab;
            draw();
            return;
        }
        const action = el.dataset.action;
        if (action === 'open' && el.dataset.app) {
            await openApp(el.dataset.app);
        }
        if (action === 'install' && el.dataset.app) {
            await installApp(el.dataset.app);
        }
        if (action === 'provider' && el.dataset.provider) {
            await chooseProvider(el.dataset.provider);
        }
        if (action === 'website' && el.dataset.provider) {
            await website(el.dataset.provider);
        }
        if (action === 'guide' && el.dataset.guide) {
            await readGuide(el.dataset.guide);
        }
        if (action === 'close-guide') {
            guideText = '';
            draw();
        }
        if (action === 'next' || action === 'skip') {
            const id = MODULES[wizardIndex].id;
            if (action === 'next')
                await markModule(id, true);
            if (wizardIndex === MODULES.length - 1) {
                await finish();
            }
            else {
                wizardIndex++;
                draw();
            }
        }
        if (action === 'back') {
            wizardIndex = Math.max(0, wizardIndex - 1);
            draw();
        }
    });
    document.addEventListener('contextmenu', event => {
        const target = event.target;
        if (discoveryDepth !== 3 || !simActive || !target.closest('.sim-wallpaper'))
            return;
        event.preventDefault();
        handleSimulation('context-open');
        draw();
    });
    document.addEventListener('keydown', event => {
        if (discoveryDepth !== 3 || !simActive)
            return;
        // Les raccourcis de Nemo restent confinés à son bureau fictif.
        if (event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey
            && ['ArrowLeft', 'ArrowRight', 'ArrowUp'].includes(event.key)) {
            const target = event.target;
            const editable = target?.closest?.('input, textarea, select, [contenteditable="true"]');
            const insideDesktop = target?.closest?.('.sim-desktop');
            if (!editable && insideDesktop && simWindow === 'files' && !simPanelMinimized) {
                event.preventDefault();
                if (event.key === 'ArrowLeft')
                    handleSimulation('history-back');
                if (event.key === 'ArrowRight')
                    handleSimulation('history-forward');
                if (event.key === 'ArrowUp')
                    handleSimulation('folder:Personnel');
                draw();
            }
            return;
        }
        if (event.key !== 'Escape')
            return;
        if (simContextMenu) {
            handleSimulation('context-close');
        }
        else if (simMenu) {
            handleSimulation('menu');
        }
        else if (simNetworkOpen) {
            handleSimulation('network');
        }
        else {
            return;
        }
        event.preventDefault();
        draw();
    });
    document.addEventListener('input', event => {
        const input = event.target;
        if (input.hasAttribute('data-sim-search')) {
            simSearch = input.value.slice(0, 60);
            const ids = { 'Calculatrice': 'calculator', 'Fichiers': 'files', 'Paramètres': 'settings', 'Gestionnaire de logiciels': 'software', 'Gestionnaire de mises à jour': 'updates', 'Moniteur système': 'monitor' };
            const names = Object.keys(ids).filter(name => name.toLocaleLowerCase('fr').includes(simSearch.toLocaleLowerCase('fr')));
            const results = document.getElementById('sim-search-results');
            if (results)
                results.innerHTML = names.length ? names.map(name => `<button type="button" data-sim="open:${ids[name]}">${esc(name)}</button>`).join('') : '<span>Aucun résultat</span>';
            return;
        }
        if (input.id !== 'discovery-search')
            return;
        discoverySearch = input.value.slice(0, 120);
        const list = document.querySelector('.topic-list');
        if (!list)
            return;
        const filtered = DISCOVERY.filter(x => `${x.title} ${x.short} ${x.windows} ${x.keywords.join(' ')}`.toLocaleLowerCase('fr').includes(discoverySearch.toLocaleLowerCase('fr')));
        list.innerHTML = filtered.length ? filtered.map(x => `<button class="topic-choice ${x.id === discoveryTopic ? 'active' : ''}" data-topic="${esc(x.id)}" aria-pressed="${x.id === discoveryTopic}"><span aria-hidden="true">${esc(x.icon)}</span>${esc(x.title)}</button>`).join('') : '<p class="muted">Aucun sujet trouvé. Essaie un autre mot.</p>';
    });
    document.addEventListener('change', async (event) => {
        const el = event.target;
        if (el.name === 'mail-mode') {
            mailMode = el.value;
            draw();
        }
        if (el.dataset.action === 'mark' && el.dataset.module) {
            await markModule(el.dataset.module, el.checked);
        }
    });
}
/** Initialise le configurateur ; l'absence de backend laisse un aperçu non privilégié. */
function init() {
    window.PP_receive = receive;
    wireEvents();
    draw();
    void loadState();
}
init();
