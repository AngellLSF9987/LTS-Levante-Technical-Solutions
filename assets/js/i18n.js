const DEFAULT_LANGUAGE = "es";

function getNestedValue(object, path) {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, object);
}

async function loadLanguage(language) {
  try {
    const response = await fetch(`lang/${language}.json`);

    if (!response.ok) {
      throw new Error(`No se pudo cargar el idioma: ${language}`);
    }

    const translations = await response.json();

    document.documentElement.lang = language;
    localStorage.setItem("siteLanguage", language);

    applyTranslations(translations);
    updateLanguageButtons(language);
  } catch (error) {
    console.error("Error cargando traducciones:", error);
  }
}

function applyTranslations(translations) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = getNestedValue(translations, key);

    if (value !== null) {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.dataset.i18nHtml;
    const value = getNestedValue(translations, key);

    if (value !== null) {
      element.innerHTML = value;
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.dataset.i18nAlt;
    const value = getNestedValue(translations, key);

    if (value !== null) {
      element.setAttribute("alt", value);
    }
  });

  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    const key = element.dataset.i18nContent;
    const value = getNestedValue(translations, key);

    if (value !== null) {
      element.setAttribute("content", value);
    }
  });
}

function updateLanguageButtons(activeLanguage) {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const isActive = button.dataset.lang === activeLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("siteLanguage") || DEFAULT_LANGUAGE;
  loadLanguage(savedLanguage);

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      loadLanguage(button.dataset.lang);
    });
  });
});
