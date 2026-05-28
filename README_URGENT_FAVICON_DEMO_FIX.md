# Fix urgente favicon demo GitHub Pages

## Cambio aplicado

Se ha dejado el versionado del favicon escrito directamente en todos los HTML.

### HTML en raíz

```html
<link rel="icon" href="./favicon.ico?v=0.3.6" type="image/x-icon" />
<link rel="shortcut icon" href="./favicon.ico?v=0.3.6" type="image/x-icon" />
<link rel="icon" href="./assets/img/logo-company.png?v=0.3.6" type="image/png" />
```

### HTML dentro de carpetas de idioma

```html
<link rel="icon" href="../favicon.ico?v=0.3.6" type="image/x-icon" />
<link rel="shortcut icon" href="../favicon.ico?v=0.3.6" type="image/x-icon" />
<link rel="icon" href="../assets/img/logo-company.png?v=0.3.6" type="image/png" />
```

## Motivo

Chrome y GitHub Pages cachean muy agresivamente el favicon. El versionado directo en HTML es más fiable que hacerlo solo por JavaScript.

## Después de subir

1. Hacer push.
2. Esperar deploy verde en GitHub Actions.
3. Abrir directamente:

```plaintext
https://angellsf9987.github.io/TLS-Levante-Technical-Solutions/favicon.ico?v=0.3.6
```

4. Abrir la web en incógnito o recargar con caché limpia.
