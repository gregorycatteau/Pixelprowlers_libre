"""Contrôles hors interface des paramètres et du routeur de commandes."""
import importlib.util
import json
import os
from pathlib import Path
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('companion', ROOT/'packaging'/'companion.py')
assert SPEC is not None and SPEC.loader is not None
companion = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(companion)


class CompanionSecurityTests(unittest.TestCase):
    """Tests de non-régression sur le stockage et les actions proposées."""

    def test_block_unknown_action(self):
        """Une action arbitraire doit toujours être refusée."""
        for name in ('shell','exec','list_files','../etc/passwd','systemctl'):
            with self.assertRaises(ValueError):
                companion.dispatch(name, {'id':'../../etc/shadow'})

    def test_clean_state_no_sensitive_fields(self):
        """Un identifiant ou un mot de passe ajouté au JSON doit être rejeté."""
        d=companion.clean_state({'email':'client@example.net','password':'SECRET',
            'provider':'proton','acceptedModules':['messagerie','../../../tmp'],
            'completed':'oui'})
        self.assertEqual(d,{'completed':False,'acceptedModules':['messagerie'],'provider':'proton'})
        self.assertNotIn('email',json.dumps(d))
        self.assertNotIn('SECRET',json.dumps(d))

    def test_state_file_permissions(self):
        """La configuration doit rester locale et privée."""
        with tempfile.TemporaryDirectory() as tmp:
            old_dir,old_file=companion.CONFIG_DIR,companion.STATE_FILE
            try:
                companion.CONFIG_DIR=Path(tmp)/'private'
                companion.STATE_FILE=companion.CONFIG_DIR/'state.json'
                companion.save_state({'acceptedModules':['messagerie'],'email':'x','password':'y'})
                self.assertEqual(os.stat(companion.CONFIG_DIR).st_mode & 0o777,0o700)
                self.assertEqual(os.stat(companion.STATE_FILE).st_mode & 0o777,0o600)
                self.assertNotIn('email',companion.STATE_FILE.read_text())
            finally:
                companion.CONFIG_DIR,companion.STATE_FILE=old_dir,old_file

    def test_guides_are_allowlisted(self):
        """Aucune lecture de fichier arbitraire depuis l'interface."""
        with self.assertRaises(ValueError):
            companion.dispatch('read_guide',{'id':'../../etc/passwd'})

    def test_apps_are_allowlisted(self):
        """Aucune application externe ne peut être lancée par un nom arbitraire."""
        with self.assertRaises(ValueError):
            companion.dispatch('open_app',{'id':'bash'})
        with self.assertRaises(ValueError):
            companion.dispatch('install_app',{'id':'curl | sh'})


if __name__ == '__main__':
    unittest.main()
