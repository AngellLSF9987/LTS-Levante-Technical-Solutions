# QA - Google Indexing TLS v0.4.4

## Checklist previa al commit

- [ ] `robots.txt` existe en raíz.
- [ ] `robots.txt` contiene `Allow: /`.
- [ ] `robots.txt` contiene `Sitemap: https://levante-tls.pages.dev/sitemap.xml`.
- [ ] `sitemap.xml` es XML válido.
- [ ] `sitemap.xml` contiene la home.
- [ ] `sitemap.xml` contiene services/contact/areas.
- [ ] `sitemap.xml` contiene carpetas por idioma.
- [ ] El botón "Encuéntranos en Google" apunta a `https://share.google/ydplMedKFJiICu13F`.
- [ ] No quedan enlaces `authuser`, `mat`, `ved` o `q=mi empresa` en HTML.
- [ ] El enlace de Google se prueba en incógnito.

## Checklist tras despliegue Cloudflare

- [ ] `https://levante-tls.pages.dev/robots.txt` abre correctamente.
- [ ] `https://levante-tls.pages.dev/sitemap.xml` abre correctamente.
- [ ] El botón Google abre el perfil público.
- [ ] El enlace no exige estar logueado.
- [ ] El formulario sigue cargando.
- [ ] La web no muestra errores de consola graves.

## Checklist Search Console

- [ ] Propiedad añadida: `https://levante-tls.pages.dev/`.
- [ ] Propiedad verificada.
- [ ] Sitemap enviado.
- [ ] Home inspeccionada.
- [ ] Solicitud de indexación enviada para páginas principales.
