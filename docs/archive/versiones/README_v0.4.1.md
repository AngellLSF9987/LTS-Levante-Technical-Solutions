# TLS v0.4.1 - Formulario seguro con Turnstile, Cloudflare Pages Functions y Resend

## Objetivo

Convertir el formulario de contacto en un flujo real, protegido y preparado para producción.

## Arquitectura

```txt
Formulario HTML
  ↓
Cloudflare Turnstile
  ↓
assets/js/contact-form.js
  ↓
/api/contact
  ↓
functions/api/contact.js
  ↓
Validación server-side
  ↓
Resend API
  ↓
Email interno TLS
```

## Archivos principales

- `assets/js/contact-form.js`.
- `functions/api/contact.js`.
- `_headers`.
- `wrangler.toml.example`.
- `docs/formulario/README_TURNSTILE_FORMULARIO_TLS.md`.
- `docs/formulario/QA_TEST_FORMULARIO_TURNSTILE.md`.

## Variables necesarias

- `TURNSTILE_SECRET_KEY`.
- `RESEND_API_KEY`.
- `FROM_EMAIL`.
- `CONTACT_TO_EMAIL`.
- `PUBLIC_SITE_URL`.
- `SEND_AUTOREPLY`.

## Seguridad

- La Site Key puede aparecer en HTML.
- La Secret Key no debe aparecer nunca en HTML, JS público ni GitHub.
- La validación real del token se hace en servidor.
