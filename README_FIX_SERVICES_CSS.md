# Corrección aplicada

Se ha reconstruido la modularización CSS desde el `style.css` original manteniendo la cascada correcta.

Problema detectado:
- Algunos bloques con títulos multilínea no se habían asignado al módulo `services.css`.
- Por eso las cards perdían reglas como:
  - `service-body ul`
  - `service-body li::before`
  - `blue-bg`, `yellow-bg`, `navy-bg`, `green-bg`
  - ajustes finales de footer de card

Resultado:
- `assets/css/services.css` vuelve a contener todas las reglas necesarias.
- `assets/css/main.css` mantiene el orden correcto de carga.
- Se han restaurado los JSON completos, `i18n.js`, `i18n.css` e imágenes del proyecto original.

Pruebas recomendadas:
- Abrir `index.html` con Live Server.
- Revisar la sección de servicios.
- Revisar `/es/`, `/en/` y el cambio de idioma.
- Revisar enlaces de WhatsApp, email y mapa.
