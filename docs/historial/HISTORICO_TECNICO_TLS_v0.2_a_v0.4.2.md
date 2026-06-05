# Dossier técnico histórico - TLS Levante Technical Solutions

**Documento:** Histórico técnico consolidado  
**Rango cubierto:** v0.2 → v0.4.2  
**Fecha:** 2026-06-05  
**Proyecto:** TLS - Levante Technical Solutions

---

## 1. Finalidad del dossier

Este dossier agrupa el trabajo realizado en el proyecto TLS para que el repositorio conserve una trazabilidad clara:

- Evolución de versiones.
- Correcciones técnicas.
- Checks de validación.
- Integración del formulario robusto.
- Organización documental.
- Criterios de despliegue y mantenimiento.

La intención no es borrar los documentos existentes, sino convertirlos en histórico técnico ordenado.

---

## 2. Principio de organización documental

Los README y CHECK de arreglos anteriores forman parte del trabajo realizado. Por tanto:

- No se eliminan.
- No se pierden.
- No se sustituyen por un único resumen genérico.
- Se agrupan bajo `/docs`.
- Se referencian desde `README.md`, `CHANGELOG.md` e índices internos.

La raíz del repositorio debe quedar limpia y profesional, pero el histórico debe quedar accesible.

---

## 3. Estructura documental objetivo

```txt
docs/
  INDICE_DOCUMENTACION.md
  CHANGELOG.md
  historial/
    HISTORICO_TECNICO_TLS_v0.2_a_v0.4.2.md
  versiones/
    README_v0.2.md
    README_v0.3.md
    README_v0.4.1.md
    README_v0.4.2.md
  fixes/
    README_FIXES_INDEX.md
    README_FIX_*.md
  checks/
    README_CHECKS_INDEX.md
    CHECK_*.txt
  formulario/
    README_TURNSTILE_FORMULARIO_TLS.md
    QA_TEST_FORMULARIO_TURNSTILE.md
  git/
    GIT_FIX_WINDOWS_INVALID_FILENAMES.md
```

---

## 4. Evolución del proyecto

### v0.2 - Base modular SEO

La versión v0.2 consolida la web como landing corporativa modular.

#### Alcance

- Estructura HTML base.
- CSS modular.
- Páginas principales:
  - `index.html`.
  - `services.html`.
  - `contact.html`.
  - `areas.html`.
- Sistema multidioma por carpetas y JSON.
- SEO base.
- Sitemap.
- Robots.
- Schema LocalBusiness.
- Corrección de rutas de imágenes.
- Corrección de cards de servicios.
- Redirección hacia formulario de contacto.

#### Documentos asociados

- `README_MODULAR_SEO.md`.
- `README_CONTACT_FORM_REDIRECT.md`.
- `README_FIX_RUTAS_IMG_Y_CARD4.md`.
- `README_FIX_SERVICES_CSS.md`.
- `README_FIX_SERVICE_CARDS_MULTIIDIOMA.md`.
- `CHECK_CONTACT_FORM_REDIRECT.txt`.
- `CHECK_RUTAS_IMG_Y_CARD4.txt`.
- `CHECK_SERVICES_CSS.txt`.

---

### v0.3 - Responsive, móvil y favicon

La versión v0.3 recoge los ajustes visuales y responsive necesarios para estabilizar la experiencia en móvil.

#### Alcance

- Ajuste de cabecera móvil.
- Corrección de botones de idioma en móvil.
- Favicon y versionado.
- Correcciones urgentes de favicon/demo.
- Mayor coherencia visual del proyecto en distintas resoluciones.

#### Documentos asociados

- `README_FIX_LANGUAGE_BUTTONS_MOBILE.md`.
- `README_FIX_RESPONSIVE_MOBILE_HEADER.md`.
- `README_FIX_FAVICON_VERSIONING.md`.
- `README_URGENT_FAVICON_DEMO_FIX.md`.
- `CHECK_FAVICON_VERSIONING.txt`.
- `CHECK_URGENT_FAVICON_DEMO_FIX.txt`.

---

### v0.4.1 - Formulario seguro

La versión v0.4.1 introduce el mecanismo de contacto robusto.

#### Objetivo

Evitar que el formulario sea solo un formulario HTML decorativo y convertirlo en un flujo real con validación anti-spam y envío backend.

#### Arquitectura

```txt
Formulario HTML
  ↓
Cloudflare Turnstile frontend
  ↓
assets/js/contact-form.js
  ↓
/api/contact
  ↓
Cloudflare Pages Function
  ↓
Validación Turnstile server-side
  ↓
Resend API
  ↓
Correo interno a TLS
  ↓
Autorespuesta opcional
```

#### Componentes

- `assets/js/contact-form.js`.
- `functions/api/contact.js`.
- `_headers`.
- `wrangler.toml.example`.
- `docs/formulario/README_TURNSTILE_FORMULARIO_TLS.md`.
- `docs/formulario/QA_TEST_FORMULARIO_TURNSTILE.md`.

#### Controles anti-spam

- Turnstile visible/gestionado.
- Validación server-side del token.
- Honeypot `website`.
- Campo `form_started_at`.
- Tiempo mínimo de envío.
- Validación de campos obligatorios.
- Validación de email y teléfono.

---

### v0.4.2 - Consolidación documental

La versión v0.4.2 no cambia la identidad visual principal. Su objetivo es ordenar el proyecto y dejar constancia profesional del trabajo realizado.

#### Alcance

- Nuevo `README.md` raíz actualizado.
- `CHANGELOG.md` consolidado.
- Dossier técnico completo.
- Índice documental.
- README por versiones.
- Índices para checks y fixes.
- Scripts para mover documentos históricos sin perderlos.
- Inclusión del parche v0.4.1 como base técnica del formulario.

---

## 5. Inventario de documentos históricos detectados

### CHECK históricos

- `CHECK_CONTACT_FORM_REDIRECT.txt`.
- `CHECK_FAVICON_VERSIONING.txt`.
- `CHECK_RUTAS_IMG_Y_CARD4.txt`.
- `CHECK_SERVICES_CSS.txt`.
- `CHECK_URGENT_FAVICON_DEMO_FIX.txt`.

### README históricos

- `README_CONTACT_FORM_REDIRECT.md`.
- `README_FIX_FAVICON_VERSIONING.md`.
- `README_FIX_LANGUAGE_BUTTONS_MOBILE.md`.
- `README_FIX_RESPONSIVE_MOBILE_HEADER.md`.
- `README_FIX_RUTAS_IMG_Y_CARD4.md`.
- `README_FIX_SERVICES_CSS.md`.
- `README_FIX_SERVICE_CARDS_MULTIIDIOMA.md`.
- `README_MODULAR_SEO.md`.
- `README_URGENT_FAVICON_DEMO_FIX.md`.

---

## 6. Protocolo de integración de la versión v0.4.2

1. Arreglar primero cualquier error de `git pull` por nombres incompatibles con Windows.
2. Copiar este paquete sobre el proyecto local.
3. Ejecutar el script de organización documental.
4. Revisar `git status`.
5. Validar que los documentos históricos han sido movidos a `/docs`.
6. Sustituir la Site Key de Turnstile en `contact.html`.
7. Configurar variables de entorno en Cloudflare Pages.
8. Hacer commit.
9. Desplegar.
10. Probar formulario en producción.

---

## 7. Comprobaciones finales recomendadas

- [ ] `README.md` refleja versión `v0.4.2`.
- [ ] `docs/CHANGELOG.md` existe.
- [ ] `docs/historial/HISTORICO_TECNICO_TLS_v0.2_a_v0.4.2.md` existe.
- [ ] Los `README_FIX_*.md` están conservados en `docs/fixes/`.
- [ ] Los `CHECK_*.txt` están conservados en `docs/checks/`.
- [ ] El formulario apunta a `/api/contact`.
- [ ] El widget Turnstile tiene Site Key real.
- [ ] La Secret Key no está en GitHub.
- [ ] `functions/api/contact.js` valida Turnstile server-side.
- [ ] Cloudflare Pages tiene variables configuradas.
- [ ] El formulario envía email interno.
- [ ] La autorespuesta solo se activa cuando Resend esté validado.

---

## 8. Resultado esperado

Con v0.4.2, TLS queda como proyecto más profesional, con:

- Web corporativa modular.
- Histórico técnico documentado.
- Formulario seguro.
- Documentación ordenada.
- Base preparada para mantenimiento y evolución futura.

