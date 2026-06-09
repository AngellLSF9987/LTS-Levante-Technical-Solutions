# README versión v0.4.4 - TLS

## Nombre de versión

**TLS v0.4.4 - Google Business Profile Link + Search Console Indexing Fix**

## Fecha

2026-06-09

## Base

- v0.4.1: formulario seguro Turnstile + backend.
- v0.4.2: documentación/histórico técnico.
- v0.4.3: preparación inicial Google/indexación.

## Motivo

La web tenía botones tipo **Encuéntranos en Google** apuntando a enlaces genéricos de Google o búsquedas que no garantizaban abrir la ficha pública de TLS. Además, `robots.txt` y `sitemap.xml` necesitaban formato limpio y válido para Search Console.

## Cambios

- Integrado enlace público real del Perfil de Empresa:

```txt
https://share.google/ydplMedKFJiICu13F
```

- Añadido script de reemplazo en HTML.
- Corregido `robots.txt`.
- Corregido `sitemap.xml`.
- Añadida documentación Search Console.
- Añadido QA de indexación.

## Resultado esperado

- Botón Google funcional para clientes.
- Perfil público enlazado desde la web.
- Sitemap válido para Google.
- Web preparada para solicitud de indexación.
