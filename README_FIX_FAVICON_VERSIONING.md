# Automatización de versión del favicon

## Cambio aplicado

Se ha añadido en:

```plaintext
assets/js/app.js
```

la constante:

```js
const TLS_ASSET_VERSION = "0.3.3";
```

y la función:

```js
versionFavicons()
```

## Cómo funciona

Los HTML quedan con rutas relativas limpias:

### HTML en raíz

```html
<link rel="icon" href="./favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
```

### HTML dentro de carpetas de idioma

```html
<link rel="icon" href="../favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
```

Al cargar la página, `app.js` añade automáticamente:

```plaintext
?v=0.3.3
```

## Cuándo cambiar la versión

Cambia solo este valor:

```js
const TLS_ASSET_VERSION = "0.3.3";
```

cuando sustituyas:
- favicon,
- logo,
- CSS crítico,
- assets visuales importantes.

No uses `Date.now()` porque forzaría la descarga del favicon en cada visita.
