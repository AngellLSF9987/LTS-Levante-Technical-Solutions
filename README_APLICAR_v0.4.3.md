# Aplicar TLS v0.4.3

## 1. Copiar paquete

Descomprimir este paquete en la raíz del proyecto local `TLS-Levante-Technical-Solutions`.

Archivos que se reemplazan directamente:

- `robots.txt`
- `sitemap.xml`
- `VERSION.json`

Archivos nuevos:

- `assets/js/google-business-link.js`
- `docs/google/README_GOOGLE_PROFILE_SEARCH_CONSOLE_v0.4.3.md`
- `docs/versiones/README_v0.4.3.md`
- `docs/search-console/URLS_A_SOLICITAR_INDEXACION.txt`
- `scripts/replace_google_links_tls.ps1`
- `scripts/replace_google_links_tls.sh`
- `snippets/`

## 2. Sustituir enlace de Google Business

Obtener el enlace desde:

```txt
Perfil de Empresa de Google -> Compartir -> Copiar enlace
```

Después ejecutar:

### Windows

```powershell
powershell -ExecutionPolicy Bypass -File scripts/replace_google_links_tls.ps1 "https://ENLACE_PUBLICO_GOOGLE_BUSINESS"
```

### Git Bash / Linux

```bash
bash scripts/replace_google_links_tls.sh "https://ENLACE_PUBLICO_GOOGLE_BUSINESS"
```

## 3. Revisar cambios

```bash
git diff
git status
```

Confirmar que no queda ningún enlace con:

```txt
q=mi%20empresa
authuser=
mat=
ved=
```

## 4. Commit y despliegue

```bash
git add .
git commit -m "TLS v0.4.3 Google profile link and Search Console SEO fixes"
git push origin main
```

Cloudflare Pages debe redesplegar automáticamente.

## 5. Search Console

Enviar sitemap:

```txt
https://levante-tls.pages.dev/sitemap.xml
```

Solicitar indexación de las URLs indicadas en:

```txt
docs/search-console/URLS_A_SOLICITAR_INDEXACION.txt
```
