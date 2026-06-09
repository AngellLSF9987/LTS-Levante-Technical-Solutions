#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Uso: bash scripts/replace_google_links_tls.sh 'https://ENLACE_PUBLICO_GOOGLE_BUSINESS'"
  exit 1
fi

GOOGLE_BUSINESS_URL="$1"

if [[ ! "$GOOGLE_BUSINESS_URL" =~ ^https:// ]]; then
  echo "Error: el enlace debe empezar por https://"
  exit 1
fi

python3 - <<PY
from pathlib import Path
import re
url = ${GOOGLE_BUSINESS_URL@Q}
patterns = [
    re.compile(r'(<a\\b(?=[^>]*href="https://(?:www\\.)?google\\.com[^"]*")(?=[^>]*>[^<]*(?:Encu[eé]ntranos en Google|Abrir en Google Maps|Perfil de empresa))[^>]*href=")[^"]*(")', re.I),
]
for path in Path('.').rglob('*.html'):
    if '.git' in path.parts or 'node_modules' in path.parts:
        continue
    text = path.read_text(encoding='utf-8', errors='ignore')
    original = text
    for p in patterns:
        text = p.sub(r'\\1' + url + r'\\2', text)
    text = re.sub(r'https://www\\.google\\.com/search\\?q=mi%20empresa[^"\\s<]*', url, text)
    text = re.sub(r'https://www\\.google\\.com/search\\?q=Levante\\+Technical\\+Solutions[^"\\s<]*', url, text)
    if text != original:
        path.write_text(text, encoding='utf-8')
        print(f'Actualizado: {path}')
print('Proceso terminado. Revisa con: git diff')
PY
