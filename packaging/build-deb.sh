#!/usr/bin/env bash
# Construire le paquet installable PixelProwlers LIBRE sans privilèges administrateur.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION='1.5.0'
STAGE="${ROOT}/dist/pkg-root"
OUTPUT="${ROOT}/dist/PixelProwlers-LIBRE-Companion_${VERSION}_all.deb"
rm -rf -- "$STAGE"
mkdir -p "$STAGE/DEBIAN" "$STAGE/usr/share/pixelprowlers-libre/web" \
    "$STAGE/usr/share/pixelprowlers-libre/guides" "$STAGE/usr/share/doc/pixelprowlers-libre" \
    "$STAGE/usr/lib/pixelprowlers-libre" "$STAGE/usr/bin" \
    "$STAGE/usr/share/applications" "$STAGE/etc/xdg/autostart"
install -m 0644 "$ROOT/web/index.html" "$ROOT/web/style.css" "$ROOT/web/app.js" \
    "$STAGE/usr/share/pixelprowlers-libre/web/"
install -m 0644 "$ROOT/guides/"*.md "$STAGE/usr/share/pixelprowlers-libre/guides/"
install -m 0644 "$ROOT/README.md" "$STAGE/usr/share/doc/pixelprowlers-libre/README.md"
install -m 0755 "$ROOT/packaging/companion.py" "$STAGE/usr/lib/pixelprowlers-libre/companion.py"
install -m 0755 "$ROOT/packaging/install-allowlisted" "$STAGE/usr/lib/pixelprowlers-libre/install-allowlisted"
install -m 0755 "$ROOT/packaging/pixelprowlers-libre-wrapper" "$STAGE/usr/bin/pixelprowlers-libre"
install -m 0644 "$ROOT/packaging/pixelprowlers-libre.desktop" "$STAGE/usr/share/applications/pixelprowlers-libre.desktop"
install -m 0644 "$ROOT/packaging/pixelprowlers-libre-first-run.desktop" \
    "$STAGE/etc/xdg/autostart/pixelprowlers-libre-first-run.desktop"
chmod 0755 "$STAGE/DEBIAN"
cat > "$STAGE/DEBIAN/control" <<'CONTROL'
Package: pixelprowlers-libre-companion
Version: 1.5.0
Section: utils
Priority: optional
Architecture: all
Maintainer: PixelProwlers <contact@pixelprowlers.io>
Depends: python3 (>= 3.10), python3-gi, gir1.2-gtk-3.0, gir1.2-webkit2-4.1, pkexec
Description: Assistant de première utilisation PixelProwlers LIBRE
 Configurateur local respectueux de la vie privée pour les ordinateurs
 reconditionnés Linux Mint : guides, logiciels et choix du propriétaire.
 Aucun compte obligatoire ni secret collecté par l'application.
CONTROL
# Le paquet doit être installable avec APT, pas exécuté avec sudo depuis son dossier source.
find "$STAGE" -type d -exec chmod g-s {} +
dpkg-deb --build --root-owner-group "$STAGE" "$OUTPUT"
sha256sum "$OUTPUT" > "${OUTPUT}.sha256"
chmod 0644 "$OUTPUT" "${OUTPUT}.sha256"
printf '\nPaquet créé : %s\n' "$OUTPUT"
