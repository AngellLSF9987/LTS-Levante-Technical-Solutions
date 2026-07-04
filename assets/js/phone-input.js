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

    const iti = window.intlTelInput(
        input,

        {
            initialCountry: 'es',

            separateDialCode: true,
        }
    );

    console.log(
        '[PHONE] Plugin inicializado.',

        iti
    );

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
         * País seleccionado.
         */

        getCountry() {
            return iti.getSelectedCountryData();
        },

        /*
         * Validez del número.
         */

        isValid() {
            return iti.isValidNumber();
        },

        /*
         * Reinicia el componente.
         */

        reset() {
            input.value = '';
        },
    };
})();
