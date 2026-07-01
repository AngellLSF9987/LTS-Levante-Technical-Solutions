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

"use strict";

(() => {

    /* ==========================================================
       ELEMENTOS
    ========================================================== */

    const selector = document.querySelector(

        "[data-country-selector]"

    );

    /*
     * Si la página no contiene selector,
     * finalizamos el módulo.
     */

    if (!selector) {

        return;

    }

    /*
     * Botón principal.
     */

    const trigger = selector.querySelector(

        ".country-selected"

    );

    /*
     * Imagen de la bandera.
     */

    const selectedFlag = trigger.querySelector(

        ".country-flag"

    );

    /*
     * Lista desplegable.
     */

    const dropdown = selector.querySelector(

        ".country-dropdown"

    );

    /*
     * Todos los países.
     */

    const options = selector.querySelectorAll(

        ".country-option"

    );

    /*
     * Campo oculto que almacena
     * el prefijo seleccionado.
     */

    const prefixInput = document.querySelector(

        "[data-phone-prefix]"

    );

    /*
     * Campo del teléfono.
     */

    const phoneInput = document.querySelector(

        "[data-phone-number]"

    );

    /* ==========================================================
       ESTADO DEL COMPONENTE
    ========================================================== */

    /*
     * Indica si el desplegable
     * está actualmente abierto.
     */

    let opened = false;


    /* ==========================================================
       ABRIR DESPLEGABLE
    ========================================================== */

    function openDropdown() {

        selector.classList.add("open");

        trigger.setAttribute(

            "aria-expanded",

            "true"

        );

        opened = true;

    }


    /* ==========================================================
       CERRAR DESPLEGABLE
    ========================================================== */

    function closeDropdown() {

        selector.classList.remove("open");

        trigger.setAttribute(

            "aria-expanded",

            "false"

        );

        opened = false;

    }


    /* ==========================================================
       ALTERNAR DESPLEGABLE
    ========================================================== */

    function toggleDropdown() {

        if (opened) {

            closeDropdown();

        }

        else {

            openDropdown();

        }

    }


    /* ==========================================================
       EVENTO BOTÓN PRINCIPAL
    ========================================================== */

    /*
     * Abre y cierra el desplegable
     * al pulsar sobre la bandera.
     */

    trigger.addEventListener(

        "click",

        (event) => {

            event.preventDefault();

            event.stopPropagation();

            toggleDropdown();

        }

    );


    /* ==========================================================
       CERRAR PULSANDO FUERA
    ========================================================== */

    document.addEventListener(

        "click",

        (event) => {

            if (

                !selector.contains(

                    event.target

                )

            ) {

                closeDropdown();

            }

        }

    );


    /* ==========================================================
       CERRAR CON ESC
    ========================================================== */

    document.addEventListener(

        "keydown",

        (event) => {

            if (

                event.key === "Escape"

            ) {

                closeDropdown();

            }

        }

    );

    /* ==========================================================
       SELECCIONAR PAÍS
    ========================================================== */

    /*
     * Actualiza el selector con el país elegido.
     */

    function selectCountry(option) {

        /*
         * Eliminamos el estado activo
         * del país anterior.
         */

        options.forEach((item) => {

            item.classList.remove(

                "active"

            );

        });

        /*
         * Marcamos el nuevo país.
         */

        option.classList.add(

            "active"

        );

        /*
         * Actualizamos la bandera
         * del botón principal.
         */

        const image = option.querySelector("img");

        selectedFlag.src = image.src;

        selectedFlag.alt = image.alt;

        /*
         * Actualizamos el prefijo.
         */

        prefixInput.value =

            option.dataset.prefix;

        /*
         * Guardamos el país
         * seleccionado.
         */

        trigger.dataset.country =

            option.dataset.country;

        trigger.dataset.prefix =

            option.dataset.prefix;

        /*
         * Cerramos el desplegable.
         */

        closeDropdown();

        /*
         * Colocamos el foco
         * en el teléfono.
         */

        phoneInput.focus();

    }


    /* ==========================================================
       SELECCIONAR PAÍS
    ========================================================== */

    /*
     * Actualiza el selector con el país elegido.
     */

    function selectCountry(option) {

        /*
         * Eliminamos el estado activo
         * del país anterior.
         */

        options.forEach((item) => {

            item.classList.remove(

                "active"

            );

        });

        /*
         * Marcamos el nuevo país.
         */

        option.classList.add(

            "active"

        );

        /*
         * Actualizamos la bandera
         * del botón principal.
         */

        const image = option.querySelector("img");

        selectedFlag.src = image.src;

        selectedFlag.alt = image.alt;

        /*
         * Actualizamos el prefijo.
         */

        prefixInput.value =

            option.dataset.prefix;

        /*
         * Guardamos el país
         * seleccionado.
         */

        trigger.dataset.country =

            option.dataset.country;

        trigger.dataset.prefix =

            option.dataset.prefix;

        /*
         * Adaptamos el campo teléfono
         * al país seleccionado.
         */

        updatePhoneRules(

            option.dataset.country

        );

        /*
         * Cerramos el desplegable.
         */

        closeDropdown();

        /*
         * Colocamos el foco
         * directamente sobre
         * el teléfono.
         */

        phoneInput.focus();

    }


    /* ==========================================================
       EVENTOS DE CADA PAÍS
    ========================================================== */

    options.forEach((option) => {

        option.addEventListener(

            "click",

            (event) => {

                event.preventDefault();

                /*
                 * La opción "Selecciona un país"
                 * no puede seleccionarse.
                 */

                if (

                    option.classList.contains(

                        "country-placeholder"

                    )

                ) {

                    return;

                }

                selectCountry(option);

            }

        );

    });

    /* ==========================================================
       EVENTOS DE CADA PAÍS
    ========================================================== */

    options.forEach((option) => {

        option.addEventListener(

            "click",

            (event) => {

                event.preventDefault();

                /*
                 * La opción "Selecciona un país"
                 * no puede seleccionarse.
                 */

                if (

                    option.classList.contains(

                        "country-placeholder"

                    )

                ) {

                    return;

                }

                selectCountry(option);

            }

        );

    });

    /* ==========================================================
       VALIDACIÓN DEL TELÉFONO
    ========================================================== */

    /*
     * Mientras el usuario escribe,
     * únicamente se permiten dígitos.
     */

    phoneInput.addEventListener(

        "input",

        () => {

            phoneInput.value =

                phoneInput.value.replace(

                    /\D/g,

                    ""

                );

        }

    );

    /*
     * Al pegar texto,
     * eliminamos cualquier
     * carácter no numérico.
     */

    phoneInput.addEventListener(

        "paste",

        (event) => {

            event.preventDefault();

            const text =

                (

                    event.clipboardData ||

                    window.clipboardData

                ).getData("text");

            phoneInput.value =

                text.replace(

                    /\D/g,

                    ""

                ).substring(

                    0,

                    phoneInput.maxLength

                );

        }

    );


    /* ==========================================================
       API PÚBLICA
    ========================================================== */

    /*
     * El resto de módulos
     * podrán consultar
     * el país seleccionado
     * sin conocer la estructura
     * interna del selector.
     */

    window.countrySelector = {

        /*
         * Código ISO
         */

        getCountry() {

            return trigger.dataset.country || "";

        },

        /*
         * Prefijo internacional
         */

        getPrefix() {

            return prefixInput.value || "";

        },

        /*
         * Número nacional
         */

        getPhone() {

            return phoneInput.value.trim();

        },

        /*
         * Número completo
         */

        getFullPhone() {

            return (

                `${this.getPrefix()} ${this.getPhone()}`

            ).trim();

        },

        /*
         * ¿Hay un país seleccionado?
         */

        hasCountry() {

            return this.getPrefix() !== "";

        }

    };


    /* ==========================================================
       ESTADO INICIAL
    ========================================================== */

    /*
     * Dejamos el componente
     * preparado para obligar
     * al usuario a seleccionar
     * un país.
     */

    prefixInput.value = "";

    trigger.dataset.country = "";

    trigger.dataset.prefix = "";
})();