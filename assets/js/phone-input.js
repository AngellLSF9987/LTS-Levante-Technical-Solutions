// ==========================================================
// LTS - PHONE INPUT
// Levante Technical Solutions
//
// Encapsula completamente la librería
// intl-tel-input.
//
// Este módulo es el ÚNICO responsable
// de toda la gestión del teléfono.
//
// ==========================================================

'use strict';

(() => {
    /* ==========================================================
       ELEMENTOS
    ========================================================== */

    const input = document.querySelector('[data-phone-input]');

    if (!input) {
        return;
    }

    /* ==========================================================
       COMPROBACIÓN DEL PLUGIN
    ========================================================== */

    if (typeof window.intlTelInput !== 'function') {

        return;
    }

    /* ==========================================================
       INICIALIZACIÓN
    ========================================================== */

    console.log('[PHONE] Inicializando intl-tel-input...');

    const iti = window.intlTelInput(input, {
        initialCountry: 'es',

        separateDialCode: true,

        strictMode: true,

        countrySearch: true,
    });

    /*
     * Indica si el usuario ha confirmado
     * explícitamente el país del teléfono.
     */

    let countryConfirmed = false;

    /*
     * Cuando el usuario cambia el país
     * desde el selector de banderas,
     * consideramos confirmado el prefijo.
     */

    input.addEventListener('countrychange', () => {
        countryConfirmed = true;

    });


    /* ==========================================================
       API PÚBLICA
    ========================================================== */

    window.phoneInput = {
        /*
         * Número internacional.
         */
        getNumber() {
            return iti.getNumber();
        },

        /*
         * ¿Existe número?
         */
        hasNumber() {
            return input.value.trim().length > 0;
        },

        /*
         * País seleccionado.
         */
        getCountry() {
            return iti.getSelectedCountryData() ?? null;
        },

        /*
         * ¿Hay país seleccionado?
         */
        hasCountry() {
            const country = this.getCountry();

            return !!country?.iso2;
        },

        /*
         * Validez del número.
         */
        isValid() {
            return iti.isValidNumber();
        },

        /*
         * Motivo del error de validación.
         */

        getValidationError() {
            return iti.getValidationError();
        },

        /*
         * Lleva el foco al teléfono.
         */
        focus() {
            input.focus();
        },

        /*
         * Reinicia el componente.
         */
        reset() {
            input.value = '';

            iti.setSelectedCountry('es');
        },
    };
})();
