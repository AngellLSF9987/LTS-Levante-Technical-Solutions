# Migración TLS v0.4.2

## 1. Antes de aplicar

Si Windows muestra error `invalid path`, renombra primero en GitHub los archivos con `:` en el nombre. Ver:

`docs/git/GIT_FIX_WINDOWS_INVALID_FILENAMES.md`

## 2. Copiar archivos

Copia todo el contenido de este paquete dentro de la raíz del proyecto local.

## 3. Organizar documentación histórica

En Windows PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/organize_docs_tls.ps1
```

En Git Bash/Linux/macOS:

```bash
bash scripts/organize_docs_tls.sh
```

## 4. Configurar Turnstile

En `contact.html`, cambia:

```html
data-sitekey="TU_SITE_KEY_DE_TURNSTILE"
```

por la Site Key real del widget `TLS Contact Form`.

## 5. Configurar Cloudflare Pages

Añade variables:

```txt
TURNSTILE_SECRET_KEY
RESEND_API_KEY
FROM_EMAIL
CONTACT_TO_EMAIL
PUBLIC_SITE_URL
SEND_AUTOREPLY
```

## 6. Commit

```bash
git status
git add .
git commit -m "TLS v0.4.2 historial tecnico y formulario seguro"
git push origin main
```

## 7. Prueba

- Abrir `https://levante-tls.pages.dev/contact.html`.
- Verificar que Turnstile aparece.
- Enviar formulario de prueba.
- Confirmar recepción en `levante.tls@gmail.com`.
