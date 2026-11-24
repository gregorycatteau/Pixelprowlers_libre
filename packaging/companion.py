#!/usr/bin/python3
"""PixelProwlers LIBRE — hôte GTK/WebKit du configurateur local.

L'application n'accède ni aux mots de passe ni aux comptes du client.
Les actions privilégiées sont isolées dans un helper root à liste blanche.
"""

from __future__ import annotations

import json
import os
import pwd
import shutil
import subprocess
import sys
import tempfile
import threading
from pathlib import Path
from typing import Any

APP_ROOT = Path('/usr/share/pixelprowlers-libre')
GUIDE_ROOT = APP_ROOT / 'guides'
CONFIG_DIR = Path.home() / '.config' / 'pixelprowlers-libre'
STATE_FILE = CONFIG_DIR / 'state.json'

# Chaque clé est une action prédéfinie ; aucune commande libre n'est possible.
ALLOWED_APPS = {
    'firefox': {'pkg': 'firefox', 'exe': 'firefox'},
    'thunderbird': {'pkg': 'thunderbird', 'exe': 'thunderbird'},
    'keepassxc': {'pkg': 'keepassxc', 'exe': 'keepassxc'},
    'deja-dup': {'pkg': 'deja-dup', 'exe': 'deja-dup'},
    'pdfarranger': {'pkg': 'pdfarranger', 'exe': 'pdfarranger'},
    'nextcloud-desktop': {'pkg': 'nextcloud-desktop', 'exe': 'nextcloud'},
    'simple-scan': {'pkg': 'simple-scan', 'exe': 'simple-scan'},
    'libreoffice': {'pkg': 'libreoffice-writer', 'exe': 'libreoffice'},
    'vlc': {'pkg': 'vlc', 'exe': 'vlc'},
    'syncthing': {'pkg': 'syncthing', 'exe': 'syncthing'},
}
PROVIDERS = {
    'mailbox': 'https://mailbox.org/',
    'infomaniak': 'https://www.infomaniak.com/fr',
    'proton': 'https://proton.me/mail',
    'tuta': 'https://tuta.com/fr',
}
ALLOWED_GUIDES = {'bienvenue','securite','messagerie','navigation','mots-de-passe','sauvegardes','documents','cloud'}
ALLOWED_MODULES = {'messagerie','navigation','mots-de-passe','sauvegardes','documents','cloud'}


def clean_state(obj: Any) -> dict[str, Any]:
    """Ne retient que trois paramètres explicitement autorisés et non sensibles."""
    if not isinstance(obj, dict):
        obj = {}
    modules = obj.get('acceptedModules', [])
    if not isinstance(modules, list):
        modules = []
    modules = sorted({v for v in modules if isinstance(v, str) and v in ALLOWED_MODULES})
    provider = obj.get('provider', '')
    if provider not in PROVIDERS:
        provider = ''
    return {'completed': obj.get('completed') is True,
            'acceptedModules': modules, 'provider': provider}


def read_state() -> dict[str, Any]:
    """Lit les préférences locales sans jamais demander d'informations personnelles."""
    if not STATE_FILE.is_file():
        return clean_state({})
    try:
        if STATE_FILE.stat().st_size > 10_000:
            return clean_state({})
        return clean_state(json.loads(STATE_FILE.read_text(encoding='utf-8')))
    except (OSError, ValueError, TypeError):
        return clean_state({})


def save_state(obj: dict[str, Any]) -> dict[str, Any]:
    """Sauvegarde atomiquement l'état avec des droits privés (0700/0600)."""
    data = clean_state(obj)
    CONFIG_DIR.mkdir(parents=True, exist_ok=True, mode=0o700)
    CONFIG_DIR.chmod(0o700)
    fd, tmp = tempfile.mkstemp(prefix='.state-', dir=CONFIG_DIR)
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as handle:
            json.dump(data, handle, ensure_ascii=False, indent=2)
            handle.write('\n')
            handle.flush()
            os.fsync(handle.fileno())
        os.chmod(tmp, 0o600)
        os.replace(tmp, STATE_FILE)
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)
    return data


def installed(app_id: str) -> bool:
    """Contrôle le statut du paquet officiel sans dépendre d'un texte localisé."""
    pkg = ALLOWED_APPS[app_id]['pkg']
    result = subprocess.run(['/usr/bin/dpkg-query', '-W', '-f=${Status}', pkg],
                            capture_output=True, text=True, timeout=8, check=False)
    return result.returncode == 0 and result.stdout.strip() == 'install ok installed'


def summary() -> dict[str, Any]:
    """Fournit au frontend les seules informations nécessaires à l'ergonomie."""
    values = read_state()
    username = pwd.getpwuid(os.getuid()).pw_name
    return {**values, 'firstRun': not values['completed'], 'username': username,
            'apps': {key: installed(key) for key in ALLOWED_APPS}}


def dispatch(action: str, data: dict[str, Any]) -> Any:
    """Répartit les actions ; interdit toute exécution arbitraire ou URL fournie."""
    if action == 'get_status':
        return summary()
    if action == 'save_state':
        values = read_state()
        updates = {key: data[key] for key in ('acceptedModules','provider') if key in data}
        return {**summary(), **save_state({**values, **updates})}
    if action == 'complete_setup':
        values = read_state()
        save_state({**values, 'completed': True})
        return summary()
    if action == 'read_guide':
        guide_id = data.get('id')
        if not isinstance(guide_id, str) or guide_id not in ALLOWED_GUIDES:
            raise ValueError('Guide non autorisé')
        file = GUIDE_ROOT / f'{guide_id}.md'
        if file.stat().st_size > 200_000:
            raise ValueError('Guide trop volumineux')
        return file.read_text(encoding='utf-8')
    if action == 'open_app':
        app_id = data.get('id')
        if app_id not in ALLOWED_APPS:
            raise ValueError('Application non autorisée')
        executable = shutil.which(ALLOWED_APPS[app_id]['exe'])
        if not executable:
            raise ValueError('Application absente ou introuvable')
        subprocess.Popen([executable], close_fds=True, start_new_session=True,
                         stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
                         stderr=subprocess.DEVNULL)
        return True
    if action == 'open_website':
        provider = data.get('id')
        if provider not in PROVIDERS:
            raise ValueError('Service non autorisé')
        from gi.repository import Gio
        Gio.AppInfo.launch_default_for_uri(PROVIDERS[provider], None)
        return True
    if action == 'install_app':
        app_id = data.get('id')
        if app_id not in ALLOWED_APPS:
            raise ValueError('Installation non autorisée')
        if installed(app_id):
            return True
        cmd = ['/usr/bin/pkexec', '/usr/lib/pixelprowlers-libre/install-allowlisted', app_id]
        proc = subprocess.run(cmd, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                              timeout=1200, check=False)
        if proc.returncode != 0:
            # On n'affiche pas la sortie APT brute : elle peut contenir des métadonnées système.
            raise RuntimeError('Installation interrompue ou refusée. Vérifiez l’authentification système et la connexion.')
        if not installed(app_id):
            raise RuntimeError('Le paquet n’est pas détecté après installation.')
        return True
    raise ValueError('Action inconnue')


def self_test() -> int:
    """Exécute un petit audit du routeur de commandes sans lancer l'interface GTK."""
    assert clean_state({'completed': 'oui', 'provider': 'evil', 'acceptedModules': ['messagerie','../secrets','messagerie']}) == {
        'completed': False, 'acceptedModules': ['messagerie'], 'provider': ''}
    for dangerous in ('run_shell', 'delete_files', 'read_passwords', '../etc/passwd'):
        try:
            dispatch(dangerous, {})
            raise AssertionError('Action non autorisée : ' + dangerous)
        except ValueError:
            pass
    print('AUTOTEST OK : schéma local et liste blanche d’actions')
    return 0


def start_gui(first_run: bool) -> int:
    """Lance la fenêtre GTK avec WebKit limité aux ressources locales embarquées."""
    import gi
    gi.require_version('Gtk', '3.0')
    gi.require_version('WebKit2', '4.1')
    from gi.repository import GLib, Gtk, WebKit2

    if os.geteuid() == 0:
        print('Ne lancez jamais le configurateur graphique avec sudo.', file=sys.stderr)
        return 2
    current_user = pwd.getpwuid(os.getuid()).pw_name
    if first_run and (current_user == 'oem' or os.getuid() == 29999 or read_state()['completed']):
        return 0

    class CompanionWindow(Gtk.Window):
        """Fenêtre de l'assistant : le contenu HTML n'a pas de privilèges système."""

        def __init__(self) -> None:
            """Configure une vue locale et un pont à commandes restreintes."""
            super().__init__(title='PixelProwlers LIBRE Companion')
            self.set_default_size(1180, 820)
            self.set_position(Gtk.WindowPosition.CENTER)
            self.connect('destroy', Gtk.main_quit)
            manager = WebKit2.UserContentManager()
            manager.register_script_message_handler('bridge')
            manager.connect('script-message-received::bridge', self.on_message)
            self.webview = WebKit2.WebView.new_with_user_content_manager(manager)
            settings = self.webview.get_settings()
            settings.set_enable_developer_extras(False)
            settings.set_enable_webgl(False)
            self.webview.connect('decide-policy', self.check_navigation)
            self.webview.load_uri((APP_ROOT / 'web' / 'index.html').as_uri())
            self.add(self.webview)

        def check_navigation(self, _view: Any, decision: Any, kind: Any) -> bool:
            """Bloque toute navigation vers une page externe depuis la vue privilégiée."""
            if kind != WebKit2.PolicyDecisionType.NAVIGATION_ACTION:
                return False
            try:
                uri = decision.get_navigation_action().get_request().get_uri()
                allowed = (APP_ROOT / 'web' / 'index.html').as_uri()
                if uri == allowed:
                    return False
            except Exception:
                pass
            decision.ignore()
            return True

        def reply(self, request_id: int, ok: bool, data: Any = None,
                  error: str = '') -> None:
            """Retourne une réponse JSON échappée ; ne construit jamais du code depuis l'entrée utilisateur."""
            payload = json.dumps({'id': request_id, 'ok': ok, 'data': data, 'error': error},
                                 ensure_ascii=True)
            self.webview.run_javascript(f'window.PP_receive({payload});', None, None, None)

        def on_message(self, _manager: Any, msg: Any) -> None:
            """Valide la taille, la forme et le nom de chaque commande entrante."""
            try:
                raw = msg.get_js_value().to_string()
                if len(raw) > 8_192:
                    raise ValueError('Requête trop longue')
                event = json.loads(raw)
                if not isinstance(event, dict):
                    raise ValueError('Format invalide')
                request_id = event.get('id')
                action = event.get('action')
                data = event.get('payload', {})
                if type(request_id) is not int or not 0 < request_id <= 100_000_000:
                    raise ValueError('Identifiant invalide')
                if not isinstance(action, str) or not isinstance(data, dict):
                    raise ValueError('Commande invalide')
            except Exception:
                # Aucune exécution en cas d'échec de validation, même si la réponse n'est pas possible.
                return

            def task() -> None:
                """Exécute la commande hors boucle graphique, y compris l'installation longue."""
                try:
                    result = dispatch(action, data)
                    GLib.idle_add(self.reply, request_id, True, result, '')
                except Exception as exc:
                    GLib.idle_add(self.reply, request_id, False, None, str(exc)[:400])

            threading.Thread(target=task, daemon=True).start()

    window = CompanionWindow()
    window.show_all()
    Gtk.main()
    return 0


def main() -> int:
    """Sépare les tests CLI, le lancement manuel et le lancement automatique OEM."""
    if '--self-test' in sys.argv:
        return self_test()
    if '--diagnostic' in sys.argv:
        print(json.dumps(summary(), ensure_ascii=False, indent=2))
        return 0
    return start_gui('--first-run' in sys.argv)


if __name__ == '__main__':
    raise SystemExit(main())
