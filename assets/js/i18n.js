const DEFAULT_LANGUAGE = "es";

/* ===========================================================
   Utilidades
=========================================================== */

function getNestedValue(object, path) {

    return path.split(".").reduce((current, key) => {

        return current && current[key] !== undefined
            ? current[key]
            : null;

    }, object);

}


/* ===========================================================
   Bandera grande del Header
=========================================================== */

function updateHeroFlag(language) {

    const heroFlag = document.getElementById("hero-language-flag");

    if (!heroFlag) return;

    heroFlag.src = `assets/img/header-flags/${language}.webp`;
    heroFlag.alt = language;

}


/* ===========================================================
   Botones del selector
=========================================================== */

function updateLanguageButtons(activeLanguage) {

    document.querySelectorAll("[data-lang]").forEach((button) => {

        const active = button.dataset.lang === activeLanguage;

        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active);

    });

}


/* ===========================================================
   Aplicar traducciones
=========================================================== */

function applyTranslations(translations) {

    document.querySelectorAll("[data-i18n]").forEach((element) => {

        const value = getNestedValue(
            translations,
            element.dataset.i18n
        );

        if (value !== null)
            element.textContent = value;

    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {

        const value = getNestedValue(
            translations,
            element.dataset.i18nHtml
        );

        if (value !== null)
            element.innerHTML = value;

    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {

        const value = getNestedValue(
            translations,
            element.dataset.i18nAlt
        );

        if (value !== null)
            element.alt = value;

    });

    document.querySelectorAll("[data-i18n-content]").forEach((element) => {

        const value = getNestedValue(
            translations,
            element.dataset.i18nContent
        );

        if (value !== null)
            element.setAttribute("content", value);

    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {

        const value = getNestedValue(
            translations,
            element.dataset.i18nAriaLabel
      );
      
        if (value !== null)
            element.setAttribute("aria-label", value);
    });
}


/* ===========================================================
   Cargar idioma
=========================================================== */

async function loadLanguage(language) {

    try {

        let response = await fetch(`/lang/${language}.json`);
        if (!response.ok) {
            response = await fetch(`lang/${language}.json`);
        }

        if (!response.ok) {
            throw new Error(`No se pudo cargar ${language}`);
        }

        const translations = await response.json();

        document.documentElement.lang = language;
        localStorage.setItem("siteLanguage", language);

        applyTranslations(translations);
        updateLanguageButtons(language);
        updateHeroFlag(language);
    }

    catch (error) {
        console.error(error);
    }
}


/* ===========================================================
   Inicialización
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const savedLanguage =
        localStorage.getItem("siteLanguage") || DEFAULT_LANGUAGE;

    loadLanguage(savedLanguage);

    document.querySelectorAll("[data-lang]").forEach((button) => {
        button.addEventListener("click", () => {
            loadLanguage(button.dataset.lang);
        });
    });
});