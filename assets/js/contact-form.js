// =========================================================
// TLS - Envío seguro del formulario de contacto
// Cloudflare Pages Functions + Turnstile + Resend
// Versión: v0.4.2
// =========================================================

(function () {
  const DEFAULT_MESSAGES = {
    sending: "Enviando solicitud...",
    success: "Solicitud enviada correctamente. Te responderemos lo antes posible.",
    error: "No se ha podido enviar la solicitud. Inténtalo de nuevo o contacta por WhatsApp.",
    config: "Formulario pendiente de configuración técnica. Contacta por WhatsApp o teléfono.",
    turnstile: "Completa la verificación anti-spam antes de enviar.",
  };

  const MESSAGES = {
    es: DEFAULT_MESSAGES,
    en: {
      sending: "Sending request...",
      success: "Request sent successfully. We will reply as soon as possible.",
      error: "The request could not be sent. Please try again or contact us by WhatsApp.",
      config: "Form pending technical configuration. Please contact us by WhatsApp or phone.",
      turnstile: "Complete the anti-spam verification before submitting.",
    },
    de: {
      sending: "Anfrage wird gesendet...",
      success: "Anfrage erfolgreich gesendet. Wir antworten so bald wie möglich.",
      error: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns per WhatsApp.",
      config: "Formular wartet auf technische Konfiguration. Bitte kontaktieren Sie uns per WhatsApp oder Telefon.",
      turnstile: "Bitte führen Sie die Anti-Spam-Prüfung vor dem Senden durch.",
    },
    fr: {
      sending: "Envoi de la demande...",
      success: "Demande envoyée correctement. Nous répondrons dès que possible.",
      error: "La demande n'a pas pu être envoyée. Réessayez ou contactez-nous par WhatsApp.",
      config: "Formulaire en attente de configuration technique. Contactez-nous par WhatsApp ou téléphone.",
      turnstile: "Complétez la vérification anti-spam avant l'envoi.",
    },
    it: {
      sending: "Invio della richiesta...",
      success: "Richiesta inviata correttamente. Risponderemo il prima possibile.",
      error: "Impossibile inviare la richiesta. Riprova o contattaci su WhatsApp.",
      config: "Modulo in attesa di configurazione tecnica. Contattaci via WhatsApp o telefono.",
      turnstile: "Completa la verifica anti-spam prima dell'invio.",
    },
    pt: {
      sending: "A enviar pedido...",
      success: "Pedido enviado corretamente. Responderemos o mais breve possível.",
      error: "Não foi possível enviar o pedido. Tente novamente ou contacte-nos por WhatsApp.",
      config: "Formulário pendente de configuração técnica. Contacte-nos por WhatsApp ou telefone.",
      turnstile: "Conclua a verificação anti-spam antes de enviar.",
    },
    ru: {
      sending: "Отправка запроса...",
      success: "Запрос успешно отправлен. Мы ответим как можно скорее.",
      error: "Не удалось отправить запрос. Попробуйте снова или свяжитесь с нами через WhatsApp.",
      config: "Форма ожидает технической настройки. Свяжитесь с нами через WhatsApp или по телефону.",
      turnstile: "Пройдите антиспам-проверку перед отправкой.",
    },
    pl: {
      sending: "Wysyłanie zgłoszenia...",
      success: "Zgłoszenie wysłane poprawnie. Odpowiemy tak szybko, jak to możliwe.",
      error: "Nie udało się wysłać zgłoszenia. Spróbuj ponownie lub skontaktuj się przez WhatsApp.",
      config: "Formularz oczekuje na konfigurację techniczną. Skontaktuj się przez WhatsApp lub telefon.",
      turnstile: "Przed wysłaniem wykonaj weryfikację antyspamową.",
    },
  };

  function currentLang() {
    const lang = (document.documentElement.lang || "es").toLowerCase().slice(0, 2);
    return MESSAGES[lang] ? lang : "es";
  }

  function getMessage(key) {
    return (MESSAGES[currentLang()] && MESSAGES[currentLang()][key]) || DEFAULT_MESSAGES[key];
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
    return siteKey && !siteKey.includes("TU_SITE_KEY") && !siteKey.includes("REPLACE") && !siteKey.includes("YOUR_SITE_KEY");
  }

  function getTurnstileToken(form) {
    const tokenInput = form.querySelector('input[name="cf-turnstile-response"]');
    return tokenInput ? tokenInput.value.trim() : "";
  }

  function resetTurnstile() {
    if (window.turnstile && typeof window.turnstile.reset === "function") {
      window.turnstile.reset();
    }
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
      setStatus(form, "error", getMessage("config"));
      return;
    }

    if (!getTurnstileToken(form)) {
      setStatus(form, "error", getMessage("turnstile"));
      return;
    }

    setStatus(form, null, getMessage("sending"));
    if (submit) submit.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.ok === false) {
        throw new Error(result.message || getMessage("error"));
      }

      setStatus(form, "success", result.message || getMessage("success"));
      form.reset();
      resetTurnstile();

      const startedAt = form.querySelector('input[name="form_started_at"]');
      if (startedAt) startedAt.value = String(Date.now());
    } catch (error) {
      setStatus(form, "error", error.message || getMessage("error"));
      resetTurnstile();
    } finally {
      if (submit) submit.disabled = false;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-contact-form]").forEach((form) => {
      let startedAt = form.querySelector('input[name="form_started_at"]');
      if (!startedAt) {
        startedAt = document.createElement("input");
        startedAt.type = "hidden";
        startedAt.name = "form_started_at";
        form.appendChild(startedAt);
      }
      startedAt.value = String(Date.now());

      form.addEventListener("submit", handleSubmit);
    });
  });
})();
