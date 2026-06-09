#!/usr/bin/env bash
set -euo pipefail
PROFILE_URL="${1:-https://share.google/ydplMedKFJiICu13F}"

echo "TLS v0.4.4 - Aplicando enlace publico Google Business Profile"
echo "URL: ${PROFILE_URL}"

if command -v python3 >/dev/null 2>&1; then
  python3 scripts/apply_v0.4.4_google_profile_link.py "${PROFILE_URL}"
elif command -v python >/dev/null 2>&1; then
  python scripts/apply_v0.4.4_google_profile_link.py "${PROFILE_URL}"
else
  echo "No se ha encontrado Python. Instala Python o usa PowerShell en Windows."
  exit 1
fi
