// ==========================================================
// LTS - COUNTRY SELECTOR
// Levante Technical Solutions
// country-selector.js
//
// Selector personalizado de país.
//
// Funciones:
//
// • Abrir y cerrar el desplegable.
// • Seleccionar un país.
// • Actualizar bandera.
// • Actualizar prefijo telefónico.
// • Integración con contact-form.js.
//
// Versión: 1.0.0
// ==========================================================

'use strict';

(() => {
    console.log('COUNTRY SELECTOR VERSION 999');
    /* ==========================================================
   ELEMENTOS DEL COMPONENTE
========================================================== */

    /*
     * Contenedor principal
     * del selector.
     */

    const selector = document.querySelector('[data-country-selector]');

    /*
     * Si la página no contiene
     * selector abandonamos
     * inmediatamente el módulo.
     */

    if (!selector) {
        return;
    }

    /*
     * Botón principal.
     */

    const trigger = selector.querySelector('.country-selected');

    /*
     * Bandera actualmente
     * mostrada.
     */

    const selectedFlag = trigger.querySelector('.country-flag');

    /*
     * Menú desplegable.
     */

    const dropdown = selector.querySelector('.country-dropdown');

    /*
     * Lista completa
     * de países.
     */

    const options = selector.querySelectorAll('.country-option');

    /*
     * Campo oculto
     * del prefijo.
     */

    const prefixInput = document.querySelector('[data-phone-prefix]');

    /*
     * Campo teléfono.
     */

    const phoneInput = document.querySelector('[data-phone-number]');

    /* ==========================================================
   CONFIGURACIÓN
========================================================== */

    /*
     * Bandera inicial.
     */

    const DEFAULT_FLAG = 'assets/img/header-flags/eu.webp';

    /*
     * Texto inicial.
     */

    const DEFAULT_ALT = 'Europa';

    /* ==========================================================
   ESTADO INTERNO
========================================================== */

    /*
     * Estado del desplegable.
     */

    let opened = false;

    /*
     * País seleccionado.
     */

    let currentCountry = '';

    /*
     * Prefijo internacional.
     */

    let currentPrefix = '';

    /* ==========================================================
   UTILIDADES
========================================================== */

    /*
     * Devuelve TRUE si
     * el desplegable
     * está abierto.
     */

    function isOpened() {
        return opened;
    }

    /*
     * Marca el estado
     * interno.
     */

    function setOpened(value) {
        opened = value;
    }

    /* ==========================================================
   APERTURA DEL DESPLEGABLE
========================================================== */

    /*
     * Abre el selector.
     */

    function openDropdown() {
        selector.classList.add('open');

        trigger.setAttribute(
            'aria-expanded',

            'true'
        );

        setOpened(true);
    }

    /*
     * Cierra el selector.
     */

    function closeDropdown() {
        selector.classList.remove('open');

        trigger.setAttribute(
            'aria-expanded',

            'false'
        );

        setOpened(false);
    }

    /*
     * Alterna el estado
     * del desplegable.
     */

    function toggleDropdown() {
        if (isOpened()) {
            closeDropdown();

            return;
        }

        openDropdown();
    }

    /* ==========================================================
   EVENTOS DEL DESPLEGABLE
========================================================== */

    /*
     * Apertura y cierre
     * mediante el botón
     * principal.
     */

    trigger.addEventListener(
        'click',

        (event) => {
            event.preventDefault();

            event.stopPropagation();

            toggleDropdown();
        }
    );

    /*
     * Cerrar pulsando
     * fuera del selector.
     */

    document.addEventListener(
        'click',

        (event) => {
            if (selector.contains(event.target)) {
                return;
            }

            closeDropdown();
        }
    );

    /*
     * Cerrar mediante
     * la tecla ESC.
     */

    document.addEventListener(
        'keydown',

        (event) => {
            if (event.key !== 'Escape') {
                return;
            }

            closeDropdown();
        }
    );

    /* ==========================================================
   SELECCIÓN DE PAÍS
========================================================== */

    /*
     * Elimina el estado activo
     * de todas las opciones.
     */

    function clearSelection() {
        options.forEach((option) => {
            option.classList.remove('active');
        });
    }

    /*
     * Marca visualmente
     * el país seleccionado.
     */

    function activateOption(option) {
        option.classList.add('active');
    }

    /*
     * Actualiza la bandera
     * mostrada en el botón.
     */

    function updateFlag(option) {
        const image = option.querySelector('img');

        selectedFlag.src = image.src;

        selectedFlag.alt = image.alt;
    }

    /*
     * Actualiza el estado
     * interno del selector.
     */

    function updateState(option) {
        currentCountry = option.dataset.country || '';

        currentPrefix = option.dataset.prefix || '';

        trigger.dataset.country = currentCountry;

        trigger.dataset.prefix = currentPrefix;

        prefixInput.value = currentPrefix;
    }

    /*
     * Marca el selector
     * como válido.
     */

    function clearInvalid() {
        trigger.classList.remove('is-invalid');
    }

    /*
     * Marca el selector
     * como inválido.
     */

    function markInvalid() {
        trigger.classList.add('is-invalid');

        trigger.focus();
    }

    /*
     * Selecciona un país.
     */

    function selectCountry(option) {
        /*
         * Ignoramos el placeholder.
         */

        if (option.classList.contains('country-placeholder')) {
            return;
        }

        clearSelection();

        activateOption(option);

        updateFlag(option);

        updateState(option);

        clearInvalid();

        closeDropdown();

        phoneInput.focus();
    }

    /* ==========================================================
   EVENTOS DE SELECCIÓN
========================================================== */

    options.forEach((option) => {
        option.addEventListener(
            'click',

            (event) => {
                event.preventDefault();

                selectCountry(option);
            }
        );
    });

    /* ==========================================================
   VALIDACIÓN DEL TELÉFONO
========================================================== */

    /*
     * Configuración por país.
     *
     * En el futuro podremos
     * ampliar fácilmente el
     * número de países o la
     * longitud admitida.
     */

    const PHONE_RULES = {
        es: { length: 9 },

        gb: { length: 10 },

        de: { length: 11 },

        fr: { length: 9 },

        it: { length: 10 },

        pt: { length: 9 },

        pl: { length: 9 },

        ru: { length: 10 },
    };

    /*
     * Actualiza las reglas
     * del teléfono según
     * el país seleccionado.
     */

    function updatePhoneRules(country) {
        const rules = PHONE_RULES[country];

        if (!rules) {
            phoneInput.removeAttribute('maxlength');

            phoneInput.removeAttribute('pattern');

            return;
        }

        phoneInput.maxLength = rules.length;

        phoneInput.pattern = `[0-9]{${rules.length}}`;
    }

    /*
     * Mientras el usuario
     * escribe únicamente
     * permitimos dígitos.
     */

    phoneInput.addEventListener('input', (event) => {
        console.log('INPUT');
        console.log('target:', event.target);
        console.log('value:', event.target.value);
        console.log('typeof:', typeof event.target.value);

        const value = String(event.target.value ?? '');

        phoneInput.value = value.replace(/\D/g, '').substring(0, phoneInput.maxLength || 20);
    });

    /*
     * Al pegar contenido
     * eliminamos cualquier
     * carácter no numérico.
     */

    phoneInput.addEventListener(
        'paste',

        (event) => {
            event.preventDefault();

            const text = (event.clipboardData || window.clipboardData).getData('text');

            phoneInput.value = text

                .replace(/\D/g, '')

                .substring(
                    0,

                    phoneInput.maxLength || 20
                );
        }
    );

    /*
     * Cuando el usuario
     * comienza a escribir
     * eliminamos el estado
     * de error del selector.
     */

    phoneInput.addEventListener(
        'focus',

        () => {
            clearInvalid();
        }
    );

    /* ==========================================================
   API PÚBLICA
========================================================== */

    /*
     * Reinicia completamente
     * el selector.
     */

    function reset() {
        /*
         * Estado interno.
         */

        currentCountry = '';

        currentPrefix = '';

        /*
         * Estado del botón.
         */

        trigger.dataset.country = '';

        trigger.dataset.prefix = '';

        /*
         * Bandera inicial.
         */

        selectedFlag.src = DEFAULT_FLAG;

        selectedFlag.alt = DEFAULT_ALT;

        /*
         * Prefijo oculto.
         */

        prefixInput.value = '';

        /*
         * Teléfono.
         */

        phoneInput.value = '';

        phoneInput.removeAttribute('pattern');

        phoneInput.removeAttribute('maxlength');

        /*
         * Estado visual.
         */

        clearSelection();

        clearInvalid();

        closeDropdown();
    }

    /* ==========================================================
   API DISPONIBLE
========================================================== */

    /*
     * Único punto de acceso
     * para el resto de módulos.
     */

    window.countrySelector = {
        /*
         * Código ISO.
         */

        getCountry() {
            return currentCountry;
        },

        /*
         * Prefijo internacional.
         */

        getPrefix() {
            return currentPrefix;
        },

        /*
         * Número nacional.
         */

        getPhone() {
            return phoneInput.value.trim();
        },

        /*
         * Número completo.
         */

        getFullPhone() {
            if (!currentPrefix) {
                return this.getPhone();
            }

            return `${currentPrefix} ${this.getPhone()}`.trim();
        },

        /*
         * ¿Existe un país
         * seleccionado?
         */

        hasCountry() {
            return currentCountry !== '';
        },

        /*
         * Marca el selector
         * como inválido.
         */

        markInvalid,

        /*
         * Elimina el estado
         * inválido.
         */

        clearInvalid,

        /*
         * Reinicia completamente
         * el componente.
         */

        reset,
    };

    /* ==========================================================
   INICIALIZACIÓN
========================================================== */

    /*
     * Estado inicial del
     * componente.
     */

    reset();
})();
