# QA - Checklist de pruebas del formulario TLS

## Comprobación visual

- [ ] El formulario carga correctamente.
- [ ] El widget Turnstile aparece antes del botón de enviar.
- [ ] No aparece el texto `TU_SITE_KEY_DE_TURNSTILE` en producción.
- [ ] El campo honeypot `website` no es visible al usuario.
- [ ] El botón se bloquea temporalmente mientras se envía.

## Comprobación funcional

- [ ] Enviar sin nombre bloquea por validación HTML.
- [ ] Enviar sin teléfono bloquea por validación HTML.
- [ ] Enviar sin servicio bloquea por validación HTML.
- [ ] Enviar sin mensaje bloquea por validación HTML.
- [ ] Enviar sin privacidad aceptada bloquea por validación HTML.
- [ ] Enviar sin Turnstile muestra error anti-spam.
- [ ] Enviar con Turnstile correcto devuelve respuesta OK.
- [ ] Llega email interno a `CONTACT_TO_EMAIL`.
- [ ] Si `SEND_AUTOREPLY=true`, llega autorespuesta al cliente.

## Comprobación de seguridad

- [ ] La Secret Key no aparece en HTML.
- [ ] La Secret Key no aparece en JavaScript público.
- [ ] La Secret Key no está en GitHub.
- [ ] `TURNSTILE_SECRET_KEY` está en Cloudflare Pages Environment Variables.
- [ ] `RESEND_API_KEY` está en Cloudflare Pages Environment Variables.
- [ ] `_headers` permite `https://challenges.cloudflare.com` en scripts, frames y conexión.

## Diagnóstico rápido de errores

### Error: Formulario pendiente de configuración técnica

Causa probable:

- No se sustituyó `TU_SITE_KEY_DE_TURNSTILE` por la Site Key real.

### Error: Falta configurar TURNSTILE_SECRET_KEY

Causa probable:

- No se creó la variable en Cloudflare Pages.
- Se creó solo en Preview y estás en Production, o al revés.

### Error: No se ha podido validar la verificación anti-spam

Causas probables:

- Site Key y Secret Key pertenecen a widgets distintos.
- Dominio no autorizado en el widget Turnstile.
- Token expirado o ya usado.

### Error general al enviar

Causas probables:

- Falta `RESEND_API_KEY`.
- `FROM_EMAIL` no está autorizado en Resend.
- Resend rechaza el remitente o el destinatario.
