# Corrección selector de idioma en móvil

Se ha eliminado el comportamiento de scroll horizontal en móvil.

Nuevo comportamiento:
- Los 8 botones de idioma se reparten en una cuadrícula de 4 columnas x 2 filas.
- Las banderas y el texto reducen tamaño con `clamp()`.
- El selector queda centrado y no provoca overflow horizontal.
- Ajuste extra para pantallas menores de 360px.

Archivo modificado:
```plaintext
assets/css/responsive.css
```
