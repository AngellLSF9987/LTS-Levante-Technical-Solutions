# Verificacion Google Search Console - TLS v0.4.5

## Propiedad

Propiedad tipo prefijo de URL:

```txt
https://levante-tls.pages.dev/
```

## Metodo elegido

Metodo: archivo HTML.

Archivo solicitado por Google:

```txt
googlebf14d2205ce8e958.html
```

Contenido:

```txt
google-site-verification: googlebf14d2205ce8e958.html
```

## Paso a paso

1. Copiar `googlebf14d2205ce8e958.html` a la raiz del proyecto.
2. Subir a GitHub.
3. Esperar deploy de Cloudflare Pages.
4. Abrir `https://levante-tls.pages.dev/googlebf14d2205ce8e958.html`.
5. Confirmar que se muestra el texto de verificacion.
6. Volver a Search Console.
7. Pulsar `VERIFICAR`.
8. Si se aprueba, no borrar el archivo.

## Despues de verificar

Enviar sitemap:

```txt
sitemap.xml
```

Inspeccionar y solicitar indexacion:

```txt
https://levante-tls.pages.dev/
https://levante-tls.pages.dev/services.html
https://levante-tls.pages.dev/contact.html
https://levante-tls.pages.dev/areas.html
```

## Notas

La indexacion no es inmediata. Search Console permite solicitar rastreo/indexacion, pero Google puede tardar dias o semanas en procesar todos los cambios.
