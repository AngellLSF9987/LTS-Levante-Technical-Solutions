# TLS - Versión v0.4.3

## Nombre de versión

Google Business Profile link + Search Console readiness.

## Base

- v0.4.1: formulario seguro con Cloudflare Turnstile, Pages Functions y Resend.
- v0.4.2: organización documental e historial técnico.

## Cambios principales

1. Corrección de `robots.txt` a formato estándar.
2. Corrección de `sitemap.xml` a XML válido.
3. Añadida documentación para Search Console.
4. Añadidos scripts para reemplazar enlaces privados/genéricos de Google por el enlace público del Perfil de Empresa.
5. Añadido helper opcional `assets/js/google-business-link.js`.
6. Añadido snippet de schema LocalBusiness con campo `sameAs` preparado para el enlace público del Perfil de Empresa.

## Motivo

El sitio tenía botones `Encuéntranos en Google` apuntando a `www.google.com` o búsquedas genéricas. Para uso público, el enlace correcto debe ser el enlace compartido del Perfil de Empresa, no una URL privada de administración ni una búsqueda con parámetros de sesión.

## Estado

Preparada para integrar en local, sustituir el enlace público real, hacer commit, desplegar en Cloudflare Pages y enviar sitemap en Search Console.
