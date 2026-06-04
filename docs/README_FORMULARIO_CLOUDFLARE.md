# TLS - Formulario seguro en Cloudflare Pages

Este paquete convierte el formulario `mailto:` de TLS en un formulario real con backend serverless en Cloudflare Pages.

## Archivos añadidos o modificados

- `functions/api/contact.js`: endpoint `/api/contact` para recibir solicitudes.
- `assets/js/contact-form.js`: envío AJAX del formulario y mensajes de estado.
- `_headers`: cabeceras básicas de seguridad y no-cache para `/api/*`.
- `contact.html` y carpetas `/es`, `/en`, `/de`, `/fr`, `/it`, `/pt`, `/ru`, `/pl`: formulario actualizado.
- `assets/css/layout.css`: estilos para privacidad, Turnstile y estados.
- `lang/*.json`: textos de privacidad traducidos.

## 1. Crear Turnstile en Cloudflare

1. Cloudflare Dashboard → Turnstile.
2. Add widget.
3. Dominio: `levante-tls.pages.dev` y el dominio propio cuando lo tengas.
4. Copia la **Site Key** y la **Secret Key**.

Sustituye en todos los `contact.html`:

```html
TU_SITE_KEY_DE_TURNSTILE
```

por tu Site Key pública.

Comando útil en Linux desde la raíz del proyecto:

```bash
grep -R "TU_SITE_KEY_DE_TURNSTILE" -n .
```

## 2. Configurar proveedor de email

El endpoint está preparado para **Resend**.

Variables necesarias en Cloudflare Pages:

```txt
TURNSTILE_SECRET_KEY=tu_secret_key_de_turnstile
RESEND_API_KEY=tu_api_key_de_resend
CONTACT_TO_EMAIL=levante.tls@gmail.com
FROM_EMAIL=TLS - Levante Technical Solutions <contacto@tu-dominio-verificado.com>
PUBLIC_SITE_URL=https://levante-tls.pages.dev
```

`TURNSTILE_SECRET_KEY` y `RESEND_API_KEY` deben guardarse como **Secret**.

Importante: `FROM_EMAIL` debe pertenecer a un dominio o remitente verificado en Resend. Mientras no tengas dominio propio, puedes dejar la función preparada, pero el envío real dependerá de la configuración permitida por Resend.

## 3. Dónde configurar variables en Cloudflare

Cloudflare Dashboard → Workers & Pages → `levante-tls` → Settings → Variables and Secrets.

Añade las variables para **Production**. Si haces pruebas con previews, añádelas también en **Preview**.

## 4. Despliegue

```bash
git add .
git commit -m "Add secure contact form with Cloudflare Functions"
git push origin main
```

Cloudflare Pages desplegará automáticamente el proyecto si está conectado a GitHub.

## 5. Prueba final

Después del deploy:

1. Abre `https://levante-tls.pages.dev/contact.html#contact-form`.
2. Comprueba que aparece Turnstile.
3. Envía una prueba con un email real.
4. Debes recibir:
   - Email interno en `levante.tls@gmail.com`.
   - Respuesta automática al email indicado por el cliente.

## 6. Nota legal mínima

El formulario incluye un checkbox de aceptación para usar los datos únicamente con el fin de responder a la solicitud. Más adelante conviene crear una página legal completa:

- `privacy.html` / Política de privacidad.
- `legal.html` / Aviso legal.
- `cookies.html` si añades cookies analíticas o publicitarias.

## 7. Limpieza de peso del proyecto

El ZIP original incluye imágenes y carpetas pesadas que no parecen necesarias para la web pública. Revisa antes de subir:

```bash
find . -type f -size +3M -print
```

Evita subir al repo:

```txt
.git/
node_modules/
*.zip
*.tif
*.psd
*.ai
*.mp4
*.mov
assets/img/TLS_flyers_pack/
```

Si esos archivos ya están en Git, `.gitignore` no los elimina automáticamente: hay que quitarlos con `git rm --cached` si quieres reducir el peso del repositorio remoto.
