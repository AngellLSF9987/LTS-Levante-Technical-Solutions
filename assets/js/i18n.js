// ==========================================================
// LTS - INTERNATIONALIZATION ENGINE
// Levante Technical Solutions
// i18n.js
//
// Motor de internacionalización.
//
// Funciones:
//
// • Cargar archivos JSON de idioma.
// • Aplicar traducciones al DOM.
// • Gestionar selector de idiomas.
// • Gestionar bandera del header.
// • Exponer una API reutilizable para otros módulos JS.
//
// Versión: 1.0.0
// ==========================================================

"use strict";

/* ==========================================================
   CONFIGURACIÓN GENERAL
========================================================== */

/*
 * Idioma por defecto del sitio.
 * Se utiliza cuando el usuario visita la web por primera vez.
 */

const DEFAULT_LANGUAGE = "es";

/*
 * Objeto que almacenará en memoria
 * todas las traducciones del idioma activo.
 *
 * Gracias a ello cualquier módulo JS
 * podrá consultar textos sin volver
 * a cargar el JSON.
 */

let currentTranslations = {};

/* ==========================================================
   UTILIDAD
========================================================== */

/*
 * Obtiene un valor anidado de un objeto
 * utilizando una ruta con puntos.
 *
 * Ejemplo:
 *
 * getNestedValue(
 *     translations,
 *     "contactForm.fields.email"
 * );
 *
 * Devuelve:
 *
 * "Correo electrónico"
 */

function getNestedValue(object, path) {

    return path
        .split(".")
        .reduce((current, key) => {

            return current &&
                   current[key] !== undefined
                ? current[key]
                : null;

        }, object);

}


/* ==========================================================
   APLICAR TRADUCCIONES
========================================================== */

/*
 * Recorre el documento buscando atributos data-i18n
 * y sustituye automáticamente su contenido utilizando
 * el idioma actualmente cargado en memoria.
 *
 * Esta función puede ejecutarse tantas veces como sea
 * necesario (por ejemplo después de crear elementos
 * dinámicamente mediante JavaScript).
 */

function applyTranslations() {

    /*
     * Traducción del texto visible del elemento.
     *
     * <span data-i18n="menu.home"></span>
     */

    document.querySelectorAll("[data-i18n]").forEach((element) => {

        const value = getNestedValue(

            currentTranslations,

            element.dataset.i18n

        );

        if (value !== null) {

            element.textContent = value;

        }

    });

    /*
     * Traducción de contenido HTML.
     *
     * Permite mantener etiquetas <br>, <strong>, etc.
     */

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {

        const value = getNestedValue(

            currentTranslations,

            element.dataset.i18nHtml

        );

        if (value !== null) {

            element.innerHTML = value;

        }

    });

    /*
     * Traducción del atributo ALT.
     *
     * Utilizado principalmente en imágenes.
     */

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {

        const value = getNestedValue(

            currentTranslations,

            element.dataset.i18nAlt

        );

        if (value !== null) {

            element.alt = value;

        }

    });

    /*
     * Traducción de META CONTENT.
     *
     * title, description,
     * OpenGraph, Twitter Cards...
     */

    document.querySelectorAll("[data-i18n-content]").forEach((element) => {

        const value = getNestedValue(

            currentTranslations,

            element.dataset.i18nContent

        );

        if (value !== null) {

            element.setAttribute(

                "content",

                value

            );

        }

    });

    /*
     * Traducción del atributo aria-label.
     *
     * Mejora la accesibilidad.
     */

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {

        const value = getNestedValue(

            currentTranslations,

            element.dataset.i18nAriaLabel

        );

        if (value !== null) {

            element.setAttribute(

                "aria-label",

                value

            );

        }

    });

    /*
     * Traducción del placeholder.
     *
     * Utilizado por formularios.
     */

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {

        const value = getNestedValue(

            currentTranslations,

            element.dataset.i18nPlaceholder

        );

        if (value !== null) {

            element.placeholder = value;

        }

    });

}

/* ==========================================================
   ACTUALIZAR BANDERA DEL HEADER
========================================================== */

/*
 * Actualiza la bandera grande del header
 * para reflejar el idioma actualmente activo.
 */

function updateHeroFlag(language) {

    const heroFlag = document.getElementById(
        "hero-language-flag"
    );

    if (!heroFlag) return;

    heroFlag.src =
        `assets/img/header-flags/${language}.webp`;

    heroFlag.alt = language;

}


/* ==========================================================
   ACTUALIZAR BOTONES DE IDIOMA
========================================================== */

/*
 * Activa visualmente el botón correspondiente
 * al idioma seleccionado.
 */

function updateLanguageButtons(language) {

    document
        .querySelectorAll("[data-lang]")
        .forEach((button) => {

            const active =
                button.dataset.lang === language;

            button.classList.toggle(
                "is-active",
                active
            );

            button.setAttribute(
                "aria-pressed",
                active
            );

        });

}


/* ==========================================================
   CARGAR IDIOMA
========================================================== */

/*
 * Carga el fichero JSON correspondiente
 * al idioma solicitado.
 *
 * Flujo:
 *
 * 1. Descarga el JSON.
 * 2. Lo guarda en memoria.
 * 3. Actualiza el atributo lang del HTML.
 * 4. Guarda el idioma en localStorage.
 * 5. Traduce toda la página.
 * 6. Actualiza selector y bandera.
 */

async function loadLanguage(language) {

    try {

        let response = await fetch(

            `/lang/${language}.json`

        );

        /*
         * Compatibilidad cuando la web
         * se ejecuta localmente.
         */

        if (!response.ok) {

            response = await fetch(

                `lang/${language}.json`

            );

        }

        if (!response.ok) {

            throw new Error(

                `No se pudo cargar el idioma: ${language}`

            );

        }

        /*
         * Guardamos las traducciones
         * en memoria.
         */

        currentTranslations =
            await response.json();

        /*
         * Actualizamos el idioma
         * del documento.
         */

        document.documentElement.lang =
            language;

        /*
         * Recordamos el idioma elegido
         * por el usuario.
         */

        localStorage.setItem(

            "siteLanguage",

            language

        );

        /*
         * Traducimos la interfaz.
         */

        applyTranslations();

        /*
         * Actualizamos elementos
         * visuales.
         */

        updateLanguageButtons(language);

        updateHeroFlag(language);

    }

    catch (error) {

        console.error(

            "[LTS i18n]",

            error

        );

    }

}

/* ==========================================================
   API PÚBLICA
========================================================== */

/*
 * Objeto público del motor i18n.
 *
 * Permite que cualquier módulo JavaScript
 * utilice el sistema de traducciones sin
 * conocer su funcionamiento interno.
 */

window.i18n = {

    /*
     * Obtiene una traducción.
     */

    get(key) {

        return getNestedValue(

            currentTranslations,

            key

        );

    },

    /*
     * Reaplica todas las traducciones
     * al documento.
     */

    refresh() {

        applyTranslations();

    },

    /*
     * Cambia el idioma.
     */

    async changeLanguage(language) {

        await loadLanguage(language);

    },

    /*
     * Devuelve el idioma activo.
     */

    getCurrentLanguage() {

        return document.documentElement.lang;

    }

};


/* ==========================================================
   INICIALIZACIÓN
========================================================== */

/*
 * Arranque del motor i18n.
 *
 * 1. Recupera el idioma guardado.
 * 2. Carga el JSON.
 * 3. Traduce la página.
 * 4. Activa el selector de idiomas.
 */

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        const language =

            localStorage.getItem(

                "siteLanguage"

            ) ||

            DEFAULT_LANGUAGE;

        await loadLanguage(

            language

        );

        document

            .querySelectorAll("[data-lang]")

            .forEach((button) => {

                button.addEventListener(

                    "click",

                    () => {

                        window.i18n.changeLanguage(

                            button.dataset.lang

                        );

                    }

                );

            });

    }

);