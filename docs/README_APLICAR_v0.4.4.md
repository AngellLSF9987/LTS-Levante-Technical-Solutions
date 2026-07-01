# Aplicar LTS v0.4.4

## 1. Copiar archivos

Copia el contenido de este paquete dentro de la raíz del proyecto local.

## 2. Ejecutar reemplazo del enlace Google

Desde VSCode, abre terminal en la raíz del proyecto y ejecuta:

```bash
python scripts/apply_v0.4.4_google_profile_link.py
```

Si usas PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/apply_v0.4.4_google_profile_link.ps1
```

## 3. Revisar cambios

```bash
git status
git diff
```

Busca que los botones de Google apunten a:

```txt
https://share.google/ydplMedKFJiICu13F
```

## 4. Commit y push

```bash
git add .
git commit -m "LTS v0.4.4 Google Business Profile link and Search Console fixes"
git push origin main
```

## 5. Probar Cloudflare

- Abrir web pública.
- Pulsar botón Google.
- Probar en incógnito.
- Abrir `/robots.txt`.
- Abrir `/sitemap.xml`.

## 6. Search Console

Enviar sitemap:

```txt
https://levante-tls.pages.dev/sitemap.xml
```
