# LTS v0.4.5 - Verificacion Google Search Console e indexacion

Esta version cierra la fase de conexion con Google Search Console para el dominio publico de Cloudflare Pages:

`https://levante-tls.pages.dev/`

Incluye el archivo HTML de verificacion que Google ha pedido:

`googlebf14d2205ce8e958.html`

URL publica esperada tras desplegar:

`https://levante-tls.pages.dev/googlebf14d2205ce8e958.html`

## 1. Copiar archivos

Descomprime este paquete en la raiz del proyecto local `LTS-Levante-Technical-Solutions`.

El archivo de verificacion debe quedar al mismo nivel que:

```txt
index.html
contact.html
services.html
areas.html
robots.txt
sitemap.xml
googlebf14d2205ce8e958.html
```

No debe quedar dentro de `assets/`, `docs/`, `scripts/`, `snippets/` ni ninguna carpeta de idioma.

## 2. Confirmar contenido del archivo de Google

El archivo `googlebf14d2205ce8e958.html` debe contener exactamente:

```txt
google-site-verification: googlebf14d2205ce8e958.html
```

No renombrar el archivo. No modificar su contenido.

## 3. Comprobar antes de subir

Desde Git Bash, en la raiz del proyecto:

```bash
test -f googlebf14d2205ce8e958.html && cat googlebf14d2205ce8e958.html
```

Debe mostrar:

```txt
google-site-verification: googlebf14d2205ce8e958.html
```

Opcionalmente puedes ejecutar:

```bash
bash scripts/check_v0.4.5_search_console_ready.sh
```

O en PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/check_v0.4.5_search_console_ready.ps1
```

## 4. Subir a GitHub

```bash
git status
git add .
git commit -m "LTS v0.4.5 Google Search Console verification file"
git push origin main
```

## 5. Esperar despliegue en Cloudflare Pages

En Cloudflare Pages, espera a que el ultimo deploy de `main` salga correcto.

Despues abre:

`https://levante-tls.pages.dev/googlebf14d2205ce8e958.html`

Debe verse:

`google-site-verification: googlebf14d2205ce8e958.html`

## 6. Verificar propiedad en Google Search Console

Vuelve a Google Search Console y pulsa:

**VERIFICAR**

Si Google acepta la verificacion, no borres nunca el archivo HTML. Google puede volver a comprobarlo.

## 7. Enviar sitemap

En Search Console:

**Menu izquierdo > Sitemaps > Anadir un nuevo sitemap**

Introduce:

```txt
sitemap.xml
```

URL resultante:

`https://levante-tls.pages.dev/sitemap.xml`

## 8. Solicitar indexacion manual

Usa la barra superior de Search Console:

**Inspeccionar cualquier URL**

Solicita indexacion para estas URLs prioritarias:

```txt
https://levante-tls.pages.dev/
https://levante-tls.pages.dev/services.html
https://levante-tls.pages.dev/contact.html
https://levante-tls.pages.dev/areas.html
```

Despues, si quieres, continua con las versiones por idioma:

```txt
https://levante-tls.pages.dev/es/
https://levante-tls.pages.dev/en/
https://levante-tls.pages.dev/de/
https://levante-tls.pages.dev/fr/
https://levante-tls.pages.dev/it/
https://levante-tls.pages.dev/pt/
https://levante-tls.pages.dev/ru/
https://levante-tls.pages.dev/pl/
```

## 9. Pruebas finales

Comprobar:

- `robots.txt` accesible.
- `sitemap.xml` accesible.
- archivo de verificacion accesible.
- boton "Encuentranos en Google" abre `https://share.google/ydplMedKFJiICu13F`.
- Search Console muestra propiedad verificada.
- Sitemap enviado sin error.
- URLs principales solicitadas para indexacion.

