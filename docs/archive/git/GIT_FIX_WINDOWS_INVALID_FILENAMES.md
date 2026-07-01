# Fix Git Windows: invalid path por nombres con dos puntos

El error:

```txt
error: invalid path 'assets/img/TLS_flyers_pack/TLS_flyer_ES_cdr (1:1).png'
error: invalid path 'assets/img/TLS_flyers_pack/TLS_flyer_ES_hr_(1,91:1).png'
```

se debe a que Windows no permite `:` en nombres de archivo.

## Solución recomendada desde GitHub web

1. Entra al repositorio.
2. Abre:

```txt
assets/img/TLS_flyers_pack/
```

3. Renombra:

```txt
TLS_flyer_ES_cdr (1:1).png      -> TLS_flyer_ES_cdr_1x1.png
TLS_flyer_ES_hr_(1,91:1).png    -> TLS_flyer_ES_hr_1_91x1.png
```

4. Haz commit.
5. En VSCode:

```bash
git fetch origin
git pull origin main
```

## Reglas de nombres para próximas imágenes

Evita:

```txt
:  ?  *  "  <  >  |  \
```

Usa nombres seguros:

```txt
tls_flyer_es_1x1.png
tls_flyer_es_16x9.png
tls_logo_transparente.png
tls_contact_form_bg.png
```
