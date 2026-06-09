# TLS - Levante Technical Solutions

**Versión documental y técnica:** `v0.4.4`  
**Fecha:** 2026-06-09  
**Proyecto:** Web corporativa TLS - Levante Technical Solutions  
**Tipo:** Landing web corporativa multilingüe + formulario seguro + integración Google Business Profile + preparación Search Console

---

## 1. Descripción del proyecto

TLS - Levante Technical Solutions es una web corporativa orientada a la captación de solicitudes para servicios técnicos integrales a domicilio:

- Mantenimiento de piscinas.
- Electricidad.
- Videovigilancia CCTV y cámaras de seguridad.
- Antenas y sistemas satélite.
- Servicios técnicos para hogares, comunidades, negocios y viviendas vacacionales.

El proyecto está preparado para funcionar como sitio estático desplegado en **Cloudflare Pages**, con soporte multilingüe, formulario de contacto protegido mediante **Cloudflare Turnstile**, validación server-side mediante **Cloudflare Pages Functions** y conexión pública con el **Perfil de Empresa de Google**.

---

## 2. Estado actual

| Campo | Estado |
|---|---|
| Versión base histórica | v0.2 |
| Versión responsive/ajustes visuales | v0.3 |
| Versión formulario seguro | v0.4.1 |
| Versión documentación/histórico | v0.4.2 |
| Versión SEO/Google inicial | v0.4.3 |
| Versión actual | v0.4.4 |
| Hosting recomendado | Cloudflare Pages |
| Formulario | `/api/contact` mediante Pages Functions |
| Anti-spam | Cloudflare Turnstile + honeypot + tiempo mínimo |
| Email transaccional | Resend |
| Perfil de Empresa Google | Enlace público integrado: `https://share.google/ydplMedKFJiICu13F` |
| Indexación | Preparada para Google Search Console |

---

## 3. Cambios principales en v0.4.4

Esta versión corrige y deja documentada la integración pública con Google:

1. Sustitución del enlace privado/genérico de Google por el enlace público real del Perfil de Empresa.
2. Eliminación progresiva de enlaces no aptos para clientes, como búsquedas con `authuser`, `mat`, `ved`, `sca_esv` o búsquedas genéricas.
3. Normalización de `robots.txt`.
4. Conversión de `sitemap.xml` a XML válido.
5. Inclusión de scripts para reemplazar enlaces Google dentro de todas las páginas HTML del proyecto.
6. Documentación de alta y envío en Google Search Console.
7. Checklist de pruebas tras despliegue.

---

## 4. Enlaces principales

- Web pública Cloudflare Pages: `https://levante-tls.pages.dev/`
- Sitemap: `https://levante-tls.pages.dev/sitemap.xml`
- Perfil público Google Business Profile: `https://share.google/ydplMedKFJiICu13F`
- Repositorio GitHub: `https://github.com/AngellLSF9987/TLS-Levante-Technical-Solutions`

---

## 5. Estructura recomendada

```txt
TLS-Levante-Technical-Solutions/
  README.md
  LICENSE
  VERSION.json
  index.html
  services.html
  contact.html
  areas.html
  robots.txt
  sitemap.xml
  _headers
  assets/
    css/
    js/
      contact-form.js
      google-business-link.js
    img/
  functions/
    api/
      contact.js
  docs/
    CHANGELOG.md
    INDICE_DOCUMENTACION.md
    google/
      README_GOOGLE_PROFILE_SEARCH_CONSOLE_v0.4.4.md
    search-console/
      URLS_A_SOLICITAR_INDEXACION.txt
      QA_GOOGLE_INDEXING_v0.4.4.md
    versiones/
      README_v0.4.4.md
    formulario/
    fixes/
    checks/
  scripts/
    apply_v0.4.4_google_profile_link.py
    apply_v0.4.4_google_profile_link.ps1
    apply_v0.4.4_google_profile_link.sh
  snippets/
```

---

## 6. Aplicación de la versión v0.4.4

### 6.1 Copiar paquete

Descomprimir este paquete sobre la raíz del proyecto local.

### 6.2 Aplicar enlace público de Google

Ejecutar uno de estos scripts desde la raíz del proyecto.

#### Opción Python

```bash
python scripts/apply_v0.4.4_google_profile_link.py
```

#### Opción PowerShell

```powershell
powershell -ExecutionPolicy Bypass -File scripts/apply_v0.4.4_google_profile_link.ps1
```

#### Opción Git Bash / Linux

```bash
bash scripts/apply_v0.4.4_google_profile_link.sh
```

El enlace aplicado por defecto es:

```txt
https://share.google/ydplMedKFJiICu13F
```

También se puede pasar otro enlace como argumento:

```bash
python scripts/apply_v0.4.4_google_profile_link.py "https://share.google/ydplMedKFJiICu13F"
```

---

## 7. Comandos Git recomendados

```bash
git status
git diff
git add .
git commit -m "TLS v0.4.4 Google Business Profile link and Search Console SEO fixes"
git push origin main
```

---

## 8. Comprobaciones tras despliegue

1. Abrir `https://levante-tls.pages.dev/`.
2. Pulsar **Encuéntranos en Google**.
3. Confirmar que abre `https://share.google/ydplMedKFJiICu13F` o redirección pública equivalente.
4. Probar en ventana de incógnito.
5. Abrir `https://levante-tls.pages.dev/robots.txt`.
6. Abrir `https://levante-tls.pages.dev/sitemap.xml`.
7. Añadir propiedad en Google Search Console.
8. Enviar sitemap.
9. Solicitar indexación de las páginas principales.

---

## 9. Notas de mantenimiento

- No usar enlaces de Google de la barra del navegador si contienen parámetros de sesión.
- No usar enlaces de búsqueda tipo `google.com/search?q=mi empresa`.
- Usar siempre el enlace público generado desde **Compartir** en el Perfil de Empresa.
- Mantener `robots.txt` y `sitemap.xml` en formato válido y legible.
- Search Console puede tardar en reflejar indexación aunque el sitemap esté enviado correctamente.

---

## 10. Autoría

Proyecto desarrollado y documentado para **TLS - Levante Technical Solutions**.  
Diseño y desarrollo web: **A. SF**.
