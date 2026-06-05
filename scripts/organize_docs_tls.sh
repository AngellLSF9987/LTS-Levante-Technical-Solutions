#!/usr/bin/env bash
set -euo pipefail

# TLS - Organizador de documentación histórica
# Versión: v0.4.2
# Uso: ejecutar desde la raíz del repositorio.
# bash scripts/organize_docs_tls.sh

mkdir -p docs/fixes docs/checks docs/formulario docs/git docs/historial docs/versiones

fix_files=(
  "README_CONTACT_FORM_REDIRECT.md"
  "README_FIX_FAVICON_VERSIONING.md"
  "README_FIX_LANGUAGE_BUTTONS_MOBILE.md"
  "README_FIX_RESPONSIVE_MOBILE_HEADER.md"
  "README_FIX_RUTAS_IMG_Y_CARD4.md"
  "README_FIX_SERVICES_CSS.md"
  "README_FIX_SERVICE_CARDS_MULTIIDIOMA.md"
  "README_MODULAR_SEO.md"
  "README_URGENT_FAVICON_DEMO_FIX.md"
)

check_files=(
  "CHECK_CONTACT_FORM_REDIRECT.txt"
  "CHECK_FAVICON_VERSIONING.txt"
  "CHECK_RUTAS_IMG_Y_CARD4.txt"
  "CHECK_SERVICES_CSS.txt"
  "CHECK_URGENT_FAVICON_DEMO_FIX.txt"
)

move_file() {
  local file="$1"
  local target="$2"
  if [[ -f "$file" ]]; then
    if command -v git >/dev/null 2>&1 && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
      git mv "$file" "$target" 2>/dev/null || mv -f "$file" "$target"
    else
      mv -f "$file" "$target"
    fi
    echo "Movido: $file -> $target"
  fi
}

for file in "${fix_files[@]}"; do
  move_file "$file" "docs/fixes/$file"
done

for file in "${check_files[@]}"; do
  move_file "$file" "docs/checks/$file"
done

echo "Organización documental completada. Revisa: git status"
