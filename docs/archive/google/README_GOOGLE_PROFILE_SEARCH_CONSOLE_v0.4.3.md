# TLS v0.4.3 - Google Business Profile, botón público e indexación

## Objetivo

Esta versión corrige la fase de presencia pública en Google:

- Sustituir enlaces privados o genéricos de Google por el enlace público real del Perfil de Empresa.
- Evitar enlaces con parámetros de sesión como `authuser`, `mat`, `ved` o búsquedas internas tipo `mi empresa`.
- Corregir `robots.txt`.
- Corregir `sitemap.xml` en XML válido.
- Preparar Search Console para solicitar rastreo e indexación.

## 1. Enlace correcto para el botón "Encuéntranos en Google"

El enlace correcto debe salir de:

1. Buscar `Levante Technical Solutions` con la cuenta administradora.
2. Abrir la ficha pública del Perfil de Empresa.
3. Pulsar `Compartir`.
4. Copiar enlace.
5. Usar ese enlace en todos los botones de la web que digan:
   - `Encuéntranos en Google`.
   - `Abrir en Google Maps`.
   - `Perfil de empresa`.

No usar enlaces que contengan:

```txt
q=mi%20empresa
authuser=
mat=
ved=
```

## 2. Aplicación automática del enlace

### Windows PowerShell

```powershell
powershell -ExecutionPolicy Bypass -File scripts/replace_google_links_tls.ps1 "https://ENLACE_PUBLICO_GOOGLE_BUSINESS"
```

### Git Bash / Linux

```bash
bash scripts/replace_google_links_tls.sh "https://ENLACE_PUBLICO_GOOGLE_BUSINESS"
```

Después revisar:

```bash
git diff
git status
```

## 3. Robots.txt

Debe quedar así:

```txt
User-agent: *
Allow: /

Sitemap: https://levante-tls.pages.dev/sitemap.xml
```

## 4. Sitemap.xml

El archivo `sitemap.xml` debe ser XML válido. Esta versión incluye un sitemap corregido para Cloudflare Pages.

URL pública esperada:

```txt
https://levante-tls.pages.dev/sitemap.xml
```

## 5. Search Console

Pasos:

1. Entrar en Google Search Console.
2. Añadir propiedad de tipo `Prefijo de URL`:

```txt
https://levante-tls.pages.dev/
```

3. Verificar propiedad mediante método disponible.
4. Ir a `Sitemaps`.
5. Enviar:

```txt
sitemap.xml
```

6. Usar `Inspección de URL` para solicitar indexación de:

```txt
https://levante-tls.pages.dev/
https://levante-tls.pages.dev/services.html
https://levante-tls.pages.dev/contact.html
https://levante-tls.pages.dev/areas.html
```

## 6. Comprobaciones públicas

Probar en incógnito o desde otro móvil:

```txt
Levante Technical Solutions
Levante Technical Solutions San Javier
Levante Technical Solutions Orihuela Costa
site:levante-tls.pages.dev
```

## 7. Commit recomendado

```bash
git add .
git commit -m "TLS v0.4.3 Google profile link and Search Console SEO fixes"
git push origin main
```
