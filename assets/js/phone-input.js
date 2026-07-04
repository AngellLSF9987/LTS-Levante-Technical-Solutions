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
        console.error('[PHONE] intl-tel-input no está disponible.');

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

        fixDropdownWidth: true,

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

        console.log('[PHONE] País cambiado:', iti.getSelectedCountryData());
    });

    console.log(
        '[PHONE] Plugin inicializado.',

        iti
    );

    console.log('=================================');
    console.log('CLAVES DEL OBJETO ITI');
    console.log(Object.keys(iti));
    console.log('=================================');

    console.log('Método getSelectedCountryData:', typeof iti.getSelectedCountryData);

    console.log('Método getNumber:', typeof iti.getNumber);

    console.log('Método isValidNumber:', typeof iti.isValidNumber);

    iti.promise.then((instance) => {
        console.log('==============================');
        console.log('INSTANCIA REAL');
        console.log(instance);
        console.log(Object.keys(instance));
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
            return iti.getSelectedCountry() ?? null;
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
