# QA Search Console - TLS v0.4.5

## Checklist local

- [ ] El archivo `googlebf14d2205ce8e958.html` existe en la raiz.
- [ ] El archivo no esta dentro de carpetas internas.
- [ ] El contenido del archivo no se ha modificado.
- [ ] `robots.txt` existe en la raiz.
- [ ] `sitemap.xml` existe en la raiz.
- [ ] `VERSION.json` indica version `0.4.5`.

## Checklist GitHub

- [ ] `git status` revisado.
- [ ] `git add .` ejecutado.
- [ ] Commit creado.
- [ ] Push a `origin/main` completado.

## Checklist Cloudflare

- [ ] Ultimo deploy correcto.
- [ ] `https://levante-tls.pages.dev/googlebf14d2205ce8e958.html` responde 200.
- [ ] `https://levante-tls.pages.dev/robots.txt` responde 200.
- [ ] `https://levante-tls.pages.dev/sitemap.xml` responde 200.

## Checklist Google Search Console

- [ ] Propiedad `https://levante-tls.pages.dev/` creada.
- [ ] Metodo HTML file seleccionado.
- [ ] Boton `VERIFICAR` ejecutado despues del deploy.
- [ ] Propiedad verificada.
- [ ] Sitemap `sitemap.xml` enviado.
- [ ] URL principal inspeccionada.
- [ ] Indexacion solicitada para home.
- [ ] Indexacion solicitada para servicios.
- [ ] Indexacion solicitada para contacto.
- [ ] Indexacion solicitada para areas.

## Resultado esperado

Google Search Console debe reconocer la propiedad y permitir medir rendimiento, cobertura/indexacion y estado de sitemap.
