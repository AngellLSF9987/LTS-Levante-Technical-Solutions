#!/usr/bin/env python3
"""
TLS v0.4.4 - Aplicar enlace público Google Business Profile.

Uso:
  python scripts/apply_v0.4.4_google_profile_link.py
  python scripts/apply_v0.4.4_google_profile_link.py "https://share.google/ydplMedKFJiICu13F"

Qué hace:
  - Recorre todos los .html del proyecto.
  - Localiza anchors con textos relacionados con Google Business Profile.
  - Sustituye hrefs genéricos/privados de Google por el enlace público real.
  - Crea copia .bak_v044 antes de modificar cada archivo.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

DEFAULT_PROFILE_URL = "https://share.google/ydplMedKFJiICu13F"
PROFILE_URL = sys.argv[1].strip() if len(sys.argv) > 1 else DEFAULT_PROFILE_URL
ROOT = Path.cwd()

TARGET_TEXT_MARKERS = [
    "encuéntranos en google",
    "encuentranos en google",
    "perfil de empresa",
    "abrir en google maps",
    "google maps",
    "google business",
    "business profile",
]

BAD_URL_MARKERS = [
    "google.com/search",
    "www.google.com/search",
    "maps.google.com",
    "google.com/maps",
    "authuser=",
    "mat=",
    "ved=",
    "sca_esv=",
    "q=mi%20empresa",
    "q=mi+empresa",
]

ANCHOR_PATTERN = re.compile(
    r"<a\b(?P<attrs_before>[^>]*?)href=(?P<quote>[\"'])(?P<href>.*?)(?P=quote)(?P<attrs_after>[^>]*)>(?P<body>.*?)</a>",
    re.IGNORECASE | re.DOTALL,
)


def should_replace(href: str, body: str) -> bool:
    href_l = href.lower()
    body_l = re.sub(r"\s+", " ", body.lower())

    text_match = any(marker in body_l for marker in TARGET_TEXT_MARKERS)
    bad_href = any(marker in href_l for marker in BAD_URL_MARKERS)

    # Reemplaza si el texto habla de Google Business/Profile/Maps o si el href es claramente un enlace privado/genérico de Google.
    return text_match or bad_href


def replace_anchor(match: re.Match[str]) -> str:
    href = match.group("href")
    body = match.group("body")

    if not should_replace(href, body):
        return match.group(0)

    attrs_before = match.group("attrs_before")
    attrs_after = match.group("attrs_after")
    quote = match.group("quote")

    # Añade target/rel si no existen.
    attrs_combined = f"{attrs_before} {attrs_after}"
    if "target=" not in attrs_combined.lower():
        attrs_after += ' target="_blank"'
    if "rel=" not in attrs_combined.lower():
        attrs_after += ' rel="noopener noreferrer"'

    return f"<a{attrs_before}href={quote}{PROFILE_URL}{quote}{attrs_after}>{body}</a>"


def main() -> int:
    html_files = [p for p in ROOT.rglob("*.html") if ".git" not in p.parts]
    if not html_files:
        print("No se han encontrado archivos .html en este directorio.")
        return 1

    changed = []
    for path in html_files:
        text = path.read_text(encoding="utf-8", errors="ignore")
        new_text = ANCHOR_PATTERN.sub(replace_anchor, text)

        # Reemplazos directos por si existe placeholder.
        new_text = new_text.replace("__TLS_GOOGLE_BUSINESS_PUBLIC_URL__", PROFILE_URL)

        if new_text != text:
            backup = path.with_suffix(path.suffix + ".bak_v044")
            if not backup.exists():
                backup.write_text(text, encoding="utf-8")
            path.write_text(new_text, encoding="utf-8")
            changed.append(path)

    print(f"Enlace público aplicado: {PROFILE_URL}")
    if changed:
        print("Archivos modificados:")
        for p in changed:
            print(f" - {p.relative_to(ROOT)}")
    else:
        print("No se han modificado archivos HTML. Revisa si los enlaces ya estaban correctos o si los textos no coinciden.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
