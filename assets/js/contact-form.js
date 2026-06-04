// =========================================================
// TLS - Envío seguro del formulario de contacto
// Cloudflare Pages Functions + Turnstile + Resend
// =========================================================

(function () {
  const DEFAULT_MESSAGES = {
    sending: "Enviando solicitud...",
    success: "Solicitud enviada correctamente. Te responderemos lo antes posible.",
    error: "No se ha podido enviar la solicitud. Inténtalo de nuevo o contacta por WhatsApp.",
    config: "Formulario pendiente de configuración técnica. Contacta por WhatsApp o teléfono.",
  };

  function getMessage(form, key) {
    const lang = document.documentElement.lang || "es";
    const messages = {
      es: DEFAULT_MESSAGES,
      en: {
        sending: "Sending request...",
        success: "Request sent successfully. We will reply as soon as possible.",
        error: "The request could not be sent. Please try again or contact us by WhatsApp.",
        config: "Form pending technical configuration. Please contact us by WhatsApp or phone.",
      },
      de: {
        sending: "Anfrage wird gesendet...",
        success: "Anfrage erfolgreich gesendet. Wir antworten so bald wie möglich.",
        error: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns per WhatsApp.",
        config: "Formular wartet auf technische Konfiguration. Bitte kontaktieren Sie uns per WhatsApp oder Telefon.",
      },
      fr: {
        sending: "Envoi de la demande...",
        success: "Demande envoyée correctement. Nous répondrons dès que possible.",
        error: "La demande n'a pas pu être envoyée. Réessayez ou contactez-nous par WhatsApp.",
        config: "Formulaire en attente de configuration technique. Contactez-nous par WhatsApp ou téléphone.",
      },
      it: {
        sending: "Invio della richiesta...",
        success: "Richiesta inviata correttamente. Risponderemo il prima possibile.",
        error: "Impossibile inviare la richiesta. Riprova o contattaci su WhatsApp.",
        config: "Modulo in attesa di configurazione tecnica. Contattaci via WhatsApp o telefono.",
      },
      pt: {
        sending: "A enviar pedido...",
        success: "Pedido enviado corretamente. Responderemos o mais breve possível.",
        error: "Não foi possível enviar o pedido. Tente novamente ou contacte-nos por WhatsApp.",
        config: "Formulário pendente de configuração técnica. Contacte-nos por WhatsApp ou telefone.",
      },
      ru: {
        sending: "Отправка запроса...",
        success: "Запрос успешно отправлен. Мы ответим как можно скорее.",
        error: "Не удалось отправить запрос. Попробуйте снова или свяжитесь с нами через WhatsApp.",
        config: "Форма ожидает технической настройки. Свяжитесь с нами через WhatsApp или по телефону.",
      },
      pl: {
        sending: "Wysyłanie zgłoszenia...",
        success: "Zgłoszenie wysłane poprawnie. Odpowiemy tak szybko, jak to możliwe.",
        error: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie lub skontaktuj się przez WhatsApp.",
        config: "Formularz oczekuje na konfigurację techniczną. Skontaktuj się przez WhatsApp lub telefon.",
      },
    };

    return (messages[lang] && messages[lang][key]) || DEFAULT_MESSAGES[key];
  }

  function setStatus(form, type, text) {
    const status = form.querySelector("[data-contact-status]");
    if (!status) return;
    status.classList.remove("is-success", "is-error");
    if (type) status.classList.add(`is-${type}`);
    status.textContent = text || "";
  }

  function hasTurnstileConfigured(form) {
    const widget = form.querySelector(".cf-turnstile");
    if (!widget) return false;
    const siteKey = widget.getAttribute("data-sitekey") || "";
    return siteKey && !siteKey.includes("TU_SITE_KEY") && !siteKey.includes("REPLACE");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const submit = form.querySelector("button[type='submit']");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!hasTurnstileConfigured(form)) {
      setStatus(form, "error", getMessage(form, "config"));
      return;
    }

    setStatus(form, null, getMessage(form, "sending"));
    if (submit) submit.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok === false) {
        throw new Error(result.message || getMessage(form, "error"));
      }

      setStatus(form, "success", result.message || getMessage(form, "success"));
      form.reset();
      if (window.turnstile) window.turnstile.reset();
    } catch (error) {
      setStatus(form, "error", error.message || getMessage(form, "error"));
      if (window.turnstile) window.turnstile.reset();
    } finally {
      if (submit) submit.disabled = false;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-contact-form]").forEach((form) => {
      form.addEventListener("submit", handleSubmit);
    });
  });
})();
