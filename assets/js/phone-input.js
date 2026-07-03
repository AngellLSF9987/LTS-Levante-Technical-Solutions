// ==========================================================
// LTS - PHONE INPUT
// Levante Technical Solutions
//
// Encapsula completamente la librería
// intl-tel-input.
//
// Este módulo es el ÚNICO responsable
// del tratamiento del teléfono.
//
// El resto de la aplicación nunca
// accederá directamente a la librería.
//
// API pública:
//
// window.phoneInput
//
// ==========================================================

'use strict';

(() => {
    /* ==========================================================
       ELEMENTOS
    ========================================================== */

    /*
     * Campo del teléfono.
     */

    const input = document.querySelector('[data-phone-input]');

    /*
     * Si la página no contiene
     * el formulario abandonamos
     * inmediatamente el módulo.
     */

    if (!input) {
        return;
    }

    /*
     * Comprobamos que la librería
     * está correctamente cargada.
     */

    if (typeof window.intlTelInput !== 'function') {
        console.error('[LTS] intl-tel-input no está disponible.');

        return;
    }

    /* ==========================================================
       CONFIGURACIÓN
    ========================================================== */

    /*
     * Países prioritarios.
     *
     * Coinciden con los idiomas
     * soportados actualmente
     * por la web.
     */

    const PREFERRED_COUNTRIES = ['es', 'gb', 'de', 'fr', 'it', 'pt', 'pl', 'ru'];

    /*
     * País por defecto.
     */

    const DEFAULT_COUNTRY = 'es';

    /* ==========================================================
       INICIALIZACIÓN
    ========================================================== */

    /*
     * Creamos la instancia
     * privada del plugin.
     */

    const iti = window.intlTelInput(
        input,

        {
            /*
             * País inicial.
             */

            initialCountry: DEFAULT_COUNTRY,

            /*
             * Mostrar el prefijo
             * separado del número.
             */

            separateDialCode: true,

            /*
             * El usuario introduce
             * únicamente el número
             * nacional.
             */

            nationalMode: true,

            /*
             * Países favoritos.
             */

            preferredCountries: PREFERRED_COUNTRIES,
        }
    );

    /* ==========================================================
       UTILIDADES
    ========================================================== */

    /*
     * Devuelve el país
     * actualmente seleccionado.
     */

    function getCountryData() {
        return iti.getSelectedCountryData();
    }

    /*
     * Devuelve el prefijo
     * internacional.
     */

    function getDialCode() {
        const country = getCountryData();

        return country.dialCode || '';
    }

    /*
     * Devuelve el código ISO.
     */

    function getCountryCode() {
        const country = getCountryData();

        return country.iso2 || '';
    }

    /*
     * Devuelve el número
     * nacional introducido
     * por el usuario.
     */

    function getNationalNumber() {
        return input.value.trim();
    }

    /*
     * Devuelve el número
     * completo en formato
     * internacional.
     */

    function getInternationalNumber() {
        return iti.getNumber();
    }

    /*
     * Comprueba si el número
     * es válido según las
     * reglas del país.
     */

    function isValid() {
        /*
         * Si el campo está vacío
         * devolvemos FALSE.
         */

        if (!input.value.trim()) {
            return false;
        }

        return iti.isValidNumber();
    }

    /*
     * Coloca el foco
     * sobre el campo.
     */

    function focus() {
        input.focus();
    }

    /*
     * Reinicia completamente
     * el componente.
     */

    function reset() {
        /*
         * Vaciamos el número.
         */

        iti.setNumber('');

        /*
         * Restauramos el país
         * por defecto.
         */

        iti.setCountry(DEFAULT_COUNTRY);
    }

    /* ==========================================================
       API PÚBLICA
    ========================================================== */

    /*
     * Único punto de acceso
     * para el resto de módulos.
     */

    window.phoneInput = {
        /*
         * País seleccionado.
         */

        getCountry() {
            return getCountryData();
        },

        /*
         * Código ISO.
         */

        getCountryCode,

        /*
         * Prefijo internacional.
         */

        getDialCode,

        /*
         * Número nacional.
         */

        getNationalNumber,

        /*
         * Número internacional.
         */

        getNumber() {
            return getInternationalNumber();
        },

        /*
         * Validación.
         */

        isValid,

        /*
         * Foco.
         */

        focus,

        /*
         * Reinicio.
         */

        reset,
    };

    /* ==========================================================
       ESTADO INICIAL
    ========================================================== */

    /*
     * Garantizamos que el campo
     * comienza vacío.
     */

    reset();

    /*
     * Eliminamos cualquier estado
     * de autocompletado heredado
     * del navegador.
     */

    input.blur();

    /* ==========================================================
       EVENTOS DEL COMPONENTE
    ========================================================== */

    /*
     * Cuando cambia el país
     * no necesitamos realizar
     * ninguna acción adicional.
     *
     * El plugin actualiza
     * automáticamente:
     *
     * • bandera
     * • prefijo
     * • formato
     * • validación
     *
     * Dejamos únicamente el
     * evento preparado por si
     * en el futuro queremos
     * registrar estadísticas
     * o realizar auditorías.
     */

    input.addEventListener(
        'countrychange',

        () => {
            /*
             * Intencionadamente vacío.
             */
        }
    );
})();
