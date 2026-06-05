# CHANGELOG - TLS Levante Technical Solutions

Este documento resume la evolución técnica del proyecto hasta la versión `v0.4.2`.

---

## v0.4.2 - Organización documental + consolidación Turnstile

**Fecha:** 2026-06-05

### Añadido

- Nuevo `README.md` principal actualizado a `v0.4.2`.
- Dossier técnico completo: `docs/historial/HISTORICO_TECNICO_TLS_v0.2_a_v0.4.2.md`.
- Índice documental general: `docs/INDICE_DOCUMENTACION.md`.
- README por versiones en `docs/versiones/`.
- Índice de fixes históricos en `docs/fixes/README_FIXES_INDEX.md`.
- Índice de checks históricos en `docs/checks/README_CHECKS_INDEX.md`.
- Scripts de organización documental:
  - `scripts/organize_docs_tls.ps1`.
  - `scripts/organize_docs_tls.sh`.

### Mantenido

- Integración de Cloudflare Turnstile del parche `v0.4.1`.
- Validación server-side con Cloudflare Pages Functions.
- Envío por Resend.
- Honeypot y tiempo mínimo de envío.
- QA del formulario seguro.

### Objetivo

Convertir los README y CHECK sueltos de la raíz del repo en histórico técnico ordenado, sin perder trazabilidad del trabajo realizado.

---

## v0.4.1 - Formulario seguro con Turnstile, Functions y Resend

### Añadido

- `assets/js/contact-form.js` robusto para envío AJAX del formulario.
- `functions/api/contact.js` como endpoint `/api/contact`.
- Validación server-side del token de Cloudflare Turnstile.
- Honeypot invisible para bots.
- Tiempo mínimo de envío para reducir spam automatizado.
- Preparación de email interno mediante Resend.
- Autorespuesta opcional con `SEND_AUTOREPLY=true`.
- `_headers` con reglas de seguridad y CSP compatible con Turnstile.
- Documentación técnica específica del formulario.
- Checklist QA del formulario.

### Variables requeridas

- `TURNSTILE_SECRET_KEY`.
- `RESEND_API_KEY`.
- `FROM_EMAIL`.
- `CONTACT_TO_EMAIL`.
- `PUBLIC_SITE_URL`.
- `SEND_AUTOREPLY`.

---

## v0.3 - Ajustes responsive, favicon y cabecera móvil

### Añadido / corregido

- Correcciones responsive en cabecera móvil.
- Ajuste de botones de idioma en móvil.
- Revisión de favicon y versionado.
- Corrección urgente de demo/favicon.
- Mejora de estabilidad visual para múltiples idiomas.

### Documentos históricos asociados

- `README_FIX_LANGUAGE_BUTTONS_MOBILE.md`.
- `README_FIX_RESPONSIVE_MOBILE_HEADER.md`.
- `README_FIX_FAVICON_VERSIONING.md`.
- `README_URGENT_FAVICON_DEMO_FIX.md`.
- `CHECK_FAVICON_VERSIONING.txt`.
- `CHECK_URGENT_FAVICON_DEMO_FIX.txt`.

---

## v0.2 - Base modular, SEO, rutas e i18n

### Añadido / corregido

- Web corporativa tipo landing page.
- Estructura modular CSS.
- Páginas base: `index.html`, `services.html`, `contact.html`, `areas.html`.
- SEO técnico base.
- `robots.txt`.
- `sitemap.xml`.
- Schema LocalBusiness.
- Sistema multidioma ES/EN/DE/FR/IT/PT/RU/PL.
- Corrección de rutas de imágenes.
- Corrección de cards de servicios multidioma.
- Redirección de contacto.
- Ajustes en servicios CSS.

### Documentos históricos asociados

- `README_MODULAR_SEO.md`.
- `README_CONTACT_FORM_REDIRECT.md`.
- `README_FIX_RUTAS_IMG_Y_CARD4.md`.
- `README_FIX_SERVICES_CSS.md`.
- `README_FIX_SERVICE_CARDS_MULTIIDIOMA.md`.
- `CHECK_CONTACT_FORM_REDIRECT.txt`.
- `CHECK_RUTAS_IMG_Y_CARD4.txt`.
- `CHECK_SERVICES_CSS.txt`.

---

## v0.1 / inicio del proyecto

### Base

- Creación de repositorio.
- Estructura inicial HTML/CSS/JS.
- Landing corporativa inicial.
- Licencia MIT.

