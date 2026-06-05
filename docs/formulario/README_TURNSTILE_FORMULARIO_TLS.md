# TLS - Formulario robusto con Cloudflare Turnstile + Pages Functions + Resend

Versión de integración: **v0.4.2**
Proyecto: **TLS - Levante Technical Solutions**
Repo base: `TLS-Levante-Technical-Solutions`

Esta versión deja el formulario preparado para:

- Mostrar widget de **Cloudflare Turnstile** en el frontend.
- Enviar el formulario a `/api/contact`.
- Validar el token de Turnstile en servidor mediante **Cloudflare Pages Functions**.
- Filtrar bots básicos con honeypot y tiempo mínimo de envío.
- Enviar email interno con **Resend**.
- Activar autorespuesta al cliente cuando Resend/dominio estén listos.

---

## 0. Antes de tocar el formulario: arreglar el `git pull` en Windows

Tu error actual viene de estos archivos del repositorio:

```txt
assets/img/TLS_flyers_pack/TLS_flyer_ES_cdr (1:1).png
assets/img/TLS_flyers_pack/TLS_flyer_ES_hr_(1,91:1).png
```

Windows no permite `:` en nombres de archivo.

Renómbralos desde GitHub web:

```txt
TLS_flyer_ES_cdr (1:1).png      -> TLS_flyer_ES_cdr_1x1.png
TLS_flyer_ES_hr_(1,91:1).png    -> TLS_flyer_ES_hr_1_91x1.png
```

Haz commit en GitHub y luego en VSCode ejecuta:

```bash
git fetch origin
git pull origin main
```

---

## 1. Copiar archivos de esta versión

Copia estos archivos en la raíz de tu proyecto local:

```txt
assets/js/contact-form.js
functions/api/contact.js
_headers
```

Si ya existen, sustitúyelos.

---

## 2. Configurar el formulario HTML

En `contact.html` y en las páginas de idioma que tengan formulario, el `<form>` debe tener esta estructura base:

```html
<form class="contact-form" action="/api/contact" method="post" data-contact-form novalidate>
```

Dentro del formulario debe existir:

```html
<div class="form-field tls-hp" aria-hidden="true">
  <label for="contact-website">Web</label>
  <input id="contact-website" name="website" type="text" tabindex="-1" autocomplete="off" />
</div>

<input type="hidden" name="form_started_at" value="" />
```

Y antes del botón de enviar debe estar el widget:

```html
<div class="form-field form-field-full turnstile-field">
  <div class="cf-turnstile" data-sitekey="TU_SITE_KEY_DE_TURNSTILE" data-theme="light"></div>
</div>
```

Sustituye `TU_SITE_KEY_DE_TURNSTILE` por la **Site Key pública** del widget `TLS Contact Form` en Cloudflare Turnstile.

La **Secret Key no va nunca en HTML**.

---

## 3. Scripts antes de `</body>`

En `contact.html` debe aparecer antes de `</body>`:

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<script src="assets/js/contact-form.js?v=0.4.2" defer></script>
```

Si estás dentro de `/es/contact.html`, `/en/contact.html`, etc., revisa la ruta:

```html
<script src="../assets/js/contact-form.js?v=0.4.2" defer></script>
```

---

## 4. Variables en Cloudflare Pages

En Cloudflare Dashboard:

```txt
Workers & Pages -> levante-tls -> Settings -> Environment variables
```

Añade estas variables en **Production** y, si vas a probar previews, también en **Preview**:

```txt
TURNSTILE_SECRET_KEY = Secret Key del widget Turnstile
RESEND_API_KEY       = API Key de Resend
FROM_EMAIL           = TLS - Levante Technical Solutions <contacto@tu-dominio-verificado.com>
CONTACT_TO_EMAIL     = levante.tls@gmail.com
PUBLIC_SITE_URL      = https://levante-tls.pages.dev
SEND_AUTOREPLY       = false
```

Cuando Resend esté con dominio/sender validado y quieras enviar autorespuesta al cliente:

```txt
SEND_AUTOREPLY = true
```

Para empezar, déjalo en `false` y valida primero que el email interno llega bien.

---

## 5. Turnstile: Site Key vs Secret Key

**Site Key**

- Va en el HTML.
- Es pública.
- Se coloca en `data-sitekey="..."`.

**Secret Key**

- No se sube al repositorio.
- No se pone en HTML ni JavaScript público.
- Se guarda como variable secreta en Cloudflare Pages.
- La usa `functions/api/contact.js` para validar el token contra Cloudflare.

---

## 6. Resend

El backend usa la API REST de Resend.

Necesitas:

- `RESEND_API_KEY`.
- `FROM_EMAIL` válido para Resend.
- `CONTACT_TO_EMAIL` como destinatario interno de TLS.

Ejemplo de `FROM_EMAIL`:

```txt
TLS - Levante Technical Solutions <contacto@tudominio.com>
```

Si todavía no tienes dominio/sender verificado en Resend, el envío puede fallar. Primero prueba con autorespuesta desactivada.

---

## 7. Despliegue

Después de copiar los archivos y poner la Site Key:

```bash
git status
git add assets/js/contact-form.js functions/api/contact.js _headers contact.html
git commit -m "Add robust Turnstile contact form validation"
git push origin main
```

Cloudflare Pages debería redeplegar automáticamente.

---

## 8. Pruebas recomendadas

### Prueba 1: abrir contacto

Abre:

```txt
https://levante-tls.pages.dev/contact.html
```

Debe verse el widget Turnstile.

### Prueba 2: enviar sin completar Turnstile

Debe mostrar error de verificación anti-spam.

### Prueba 3: enviar con Turnstile correcto

Debe mostrar:

```txt
Solicitud enviada correctamente. Te responderemos lo antes posible.
```

Y debe llegar email a:

```txt
levante.tls@gmail.com
```

### Prueba 4: revisar Cloudflare Logs

En Cloudflare Pages, revisa los logs de Functions si el formulario devuelve error.

---

## 9. Resultado esperado

Arquitectura final:

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

