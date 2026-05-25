# Redirección del método de contacto por correo al formulario

## Cambios aplicados

1. Los botones/enlaces visuales de correo ya no abren directamente `mailto:`:
   - Header
   - Bloque inferior de contacto

2. Ahora redirigen a:

```html
contact.html#contact-form
```

3. Se ha añadido un formulario real en `contact.html` y en las páginas de idioma:
   - `/es/contact.html`
   - `/en/contact.html`
   - `/de/contact.html`
   - `/fr/contact.html`
   - `/it/contact.html`
   - `/pt/contact.html`
   - `/ru/contact.html`
   - `/pl/contact.html`

4. El formulario tiene traducción mediante JSON:
   - `contactForm.*`
   - `contact.formLinkAria`
   - `contact.emailLabel`

5. `i18n.js` ahora también soporta:
```html
data-i18n-aria-label
```

## Nota técnica
El formulario usa `mailto:` en el submit para mantener la web estática sin backend.
Más adelante se puede sustituir por:
- Formspree
- Netlify Forms
- backend propio
- endpoint PHP
- API REST
