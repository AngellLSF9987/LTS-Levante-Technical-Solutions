# Corrección aplicada: imágenes en URLs por idioma + título card 4

## Imágenes
En las páginas dentro de carpetas de idioma (`/es/`, `/en/`, etc.), las imágenes no cargaban porque seguían referenciadas como:

```html
src="assets/img/..."
```

Desde una carpeta anidada, esa ruta apunta a:

```plaintext
/es/assets/img/...
```

Pero la carpeta real está en:

```plaintext
/assets/img/...
```

Se ha corregido a:

```html
src="../assets/img/..."
```

## Título de la card 4
La card de `Antenas y satélite` usa dos `<span>` dentro del `<h3>`.
La regla genérica anterior reducía todos los `<span>` de títulos, por eso el título de esa card quedaba mucho más pequeño.

Se ha añadido una regla específica para:
- mantener el primer `<span>` con tamaño de título,
- dejar el segundo `<span>` como subtítulo,
- conservar ajustes para idiomas largos.
