# TLS - Levante Technical Solutions

**Versión documental y técnica:** `v0.4.2`  
**Fecha:** 2026-06-05  
**Proyecto:** Web corporativa TLS - Levante Technical Solutions  
**Tipo:** Landing web corporativa multilingüe + formulario seguro en Cloudflare Pages

---

## 1. Descripción del proyecto

TLS - Levante Technical Solutions es una web corporativa orientada a la captación de solicitudes para servicios técnicos integrales a domicilio:

- Mantenimiento de piscinas.
- Electricidad.
- Videovigilancia CCTV y cámaras de seguridad.
- Antenas y sistemas satélite.
- Servicios técnicos para hogares, comunidades, negocios y viviendas vacacionales.

El proyecto está preparado para funcionar como sitio estático desplegado en **Cloudflare Pages**, con soporte multilingüe y formulario de contacto protegido mediante **Cloudflare Turnstile** y validación server-side mediante **Cloudflare Pages Functions**.

---

## 2. Estado actual

| Campo | Estado |
|---|---|
| Versión base histórica | v0.2 |
| Versión responsive/ajustes visuales | v0.3 |
| Versión formulario seguro | v0.4.1 |
| Versión actual propuesta | v0.4.2 |
| Estado | Preparada para integración local, commit y despliegue |
| Hosting recomendado | Cloudflare Pages |
| Formulario | `/api/contact` mediante Pages Functions |
| Anti-spam | Cloudflare Turnstile + honeypot + tiempo mínimo |
| Email transaccional | Resend |

---

## 3. Tecnologías utilizadas

- HTML5.
- CSS3 modular.
- JavaScript vanilla.
- Bootstrap 5.
- Bootstrap Icons.
- Sistema i18n mediante JSON.
- SEO técnico base: `robots.txt`, `sitemap.xml`, schema y estructura semántica.
- Cloudflare Pages.
- Cloudflare Pages Functions.
- Cloudflare Turnstile.
- Resend API.

---

## 4. Estructura recomendada del proyecto

```txt
TLS-Levante-Technical-Solutions/
  README.md
  LICENSE
  index.html
  services.html
  contact.html
  areas.html
  robots.txt
  sitemap.xml
  _headers
  wrangler.toml.example
  assets/
    css/
    js/
      contact-form.js
    img/
  functions/
    api/
      contact.js
  lang/
  partials/
  es/
  en/
  de/
  fr/
  it/
  pt/
  ru/
  pl/
  docs/
    INDICE_DOCUMENTACION.md
    CHANGELOG.md
    historial/
      HISTORICO_TECNICO_TLS_v0.2_a_v0.4.2.md
    versiones/
      README_v0.2.md
      README_v0.3.md
      README_v0.4.1.md
      README_v0.4.2.md
    fixes/
      README_FIXES_INDEX.md
    checks/
      README_CHECKS_INDEX.md
    formulario/
      README_TURNSTILE_FORMULARIO_TLS.md
      QA_TEST_FORMULARIO_TURNSTILE.md
    git/
      GIT_FIX_WINDOWS_INVALID_FILENAMES.md
  scripts/
    organize_docs_tls.ps1
    organize_docs_tls.sh
  snippets/
```

---

## 5. Documentación técnica

La documentación completa del proyecto queda agrupada en `/docs`:

- `docs/INDICE_DOCUMENTACION.md`: índice general de la documentación.
- `docs/CHANGELOG.md`: evolución resumida por versiones.
- `docs/historial/HISTORICO_TECNICO_TLS_v0.2_a_v0.4.2.md`: dossier técnico completo del proyecto.
- `docs/versiones/`: README por versión.
- `docs/fixes/`: índice de correcciones técnicas históricas.
- `docs/checks/`: índice de comprobaciones históricas.
- `docs/formulario/`: documentación del formulario seguro.
- `docs/git/`: solución del problema de nombres incompatibles con Windows.

---

## 6. Formulario seguro

La versión actual incorpora arquitectura de formulario robusta:

```txt
Usuario rellena formulario
        ↓
Turnstile genera token
        ↓
assets/js/contact-form.js envía FormData a /api/contact
        ↓
functions/api/contact.js valida Turnstile en servidor
        ↓
Si es correcto, envía email vía Resend
        ↓
Muestra confirmación al usuario
```

### Variables necesarias en Cloudflare Pages

Configurar en **Production** y, si se usa, también en **Preview**:

```txt
TURNSTILE_SECRET_KEY = Secret Key del widget Turnstile
RESEND_API_KEY       = API Key de Resend
FROM_EMAIL           = TLS - Levante Technical Solutions <contacto@tu-dominio-verificado.com>
CONTACT_TO_EMAIL     = levante.tls@gmail.com
PUBLIC_SITE_URL      = https://levante-tls.pages.dev
SEND_AUTOREPLY       = false
```

La **Site Key** de Turnstile va en el HTML.  
La **Secret Key** solo va en Cloudflare Pages como variable de entorno.

---

## 7. Orden de integración recomendado

1. Arreglar primero nombres incompatibles con Windows si todavía existe error de `git pull`.
2. Copiar los archivos de este paquete encima del proyecto local.
3. Ejecutar, si procede, `scripts/organize_docs_tls.ps1` o `scripts/organize_docs_tls.sh` para ordenar README/CHECK históricos.
4. Sustituir `TU_SITE_KEY_DE_TURNSTILE` en `contact.html` por la Site Key real.
5. Configurar variables de entorno en Cloudflare Pages.
6. Hacer commit y push.
7. Probar formulario en Cloudflare Pages.
8. Activar autorespuesta solo cuando el envío interno esté validado.

---

## 8. Comandos Git recomendados

```bash
git status
git add .
git commit -m "TLS v0.4.2 historial tecnico y formulario seguro"
git push origin main
```

---

## 9. Notas de mantenimiento

- No subir claves secretas al repositorio.
- No poner `TURNSTILE_SECRET_KEY` ni `RESEND_API_KEY` en HTML ni JavaScript público.
- Mantener la documentación histórica en `/docs`.
- Evitar nombres de archivo con caracteres incompatibles con Windows: `: ? * " < > | \`.
- Usar versiones documentales claras: v0.2, v0.3, v0.4.1, v0.4.2.

---

## 10. Autoría

Proyecto desarrollado y documentado para **TLS - Levante Technical Solutions**.  
Diseño y desarrollo web: **A. SF**.
