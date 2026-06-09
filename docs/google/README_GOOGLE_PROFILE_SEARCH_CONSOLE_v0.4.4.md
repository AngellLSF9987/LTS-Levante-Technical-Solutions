# Google Business Profile + Search Console - TLS v0.4.4

## Objetivo

Corregir la conexión pública entre la web de TLS y el Perfil de Empresa de Google, y preparar la indexación técnica mediante Google Search Console.

## 1. Enlace correcto del Perfil de Empresa

El enlace correcto es el que sale desde el botón **Compartir** del Perfil de Empresa:

```txt
https://share.google/ydplMedKFJiICu13F
```

Este enlace debe usarse para botones como:

- Encuéntranos en Google
- Perfil de empresa
- Abrir ficha en Google
- Abrir en Google Maps, si no se dispone todavía de un enlace de Maps más específico

## 2. Enlaces que NO deben usarse

No usar enlaces de la barra del navegador si contienen parámetros como:

```txt
authuser=
mat=
ved=
sca_esv=
q=mi empresa
```

Tampoco conviene usar una búsqueda genérica como:

```txt
https://www.google.com/search?q=Levante+Technical+Solutions
```

Ese enlace puede mostrar resultados distintos a cada usuario y no garantiza que se abra la ficha pública.

## 3. Aplicar enlace en el proyecto

Desde la raíz del proyecto:

```bash
python scripts/apply_v0.4.4_google_profile_link.py
```

O PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/apply_v0.4.4_google_profile_link.ps1
```

## 4. Search Console

Pasos recomendados:

1. Entrar en Google Search Console.
2. Añadir propiedad tipo **Prefijo de URL**:

```txt
https://levante-tls.pages.dev/
```

3. Verificar la propiedad con el método que Google permita.
4. Enviar sitemap:

```txt
https://levante-tls.pages.dev/sitemap.xml
```

5. Inspeccionar y solicitar indexación de:

```txt
https://levante-tls.pages.dev/
https://levante-tls.pages.dev/services.html
https://levante-tls.pages.dev/contact.html
https://levante-tls.pages.dev/areas.html
```

## 5. Comprobaciones públicas

Después del despliegue:

- Probar la web en incógnito.
- Pulsar el botón de Google.
- Confirmar que no abre panel privado.
- Confirmar que no abre una búsqueda genérica.
- Confirmar que `robots.txt` carga en varias líneas.
- Confirmar que `sitemap.xml` carga como XML válido.

## 6. Nota SEO

Aunque el perfil esté activo y el sitemap esté enviado, Google puede tardar en mostrar el sitio en resultados orgánicos. La prioridad de esta versión es dejar la web técnicamente preparada y enlazada correctamente.
