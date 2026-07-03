// ==========================================================
// LTS - CONTACT FORM
// Levante Technical Solutions
// contact-form.js
//
// Gestión del formulario de contacto.
//
// Flujo:
//
// 1. Validar formulario.
// 2. Construir mensaje.
// 3. Abrir WhatsApp o correo.
// 4. Esperar el regreso del usuario.
// 5. Limpiar automáticamente.
//
// Versión: 1.0.0
// ==========================================================

"use strict";

(() => {
    /* ==========================================================
   CONFIGURACIÓN
========================================================== */

    /*
     * Datos generales de la empresa.
     */

    const CONFIG = {
        companyName: 'Levante Technical Solutions',

        companyPhone: '34614616135',

        companyEmail: 'levante.tls@gmail.com',

        /*
         * Tiempo máximo antes de limpiar
         * automáticamente el formulario.
         */

        resetDelay: 60000,

        /*
         * Tiempo de espera tras volver
         * desde WhatsApp o el cliente
         * de correo electrónico.
         */

        returnDelay: 5000,
    };

    /* ==========================================================
   ESTADO INTERNO
========================================================== */

    /*
     * Temporizador principal.
     */

    let resetTimer = null;

    /*
     * Indica que el usuario ha salido
     * temporalmente de la página para
     * completar el envío.
     */

    let waitingReturn = false;

    /* ==========================================================
   FORMULARIO
========================================================== */

    /*
     * Formulario principal.
     */

    const form = document.querySelector('[data-contact-form]');

    /*
     * Si la página no contiene formulario,
     * abandonamos inmediatamente el módulo.
     */

    if (!form) {
        return;
    }

    /* ==========================================================
   CAMPOS
========================================================== */

    const fields = {
        name: form.querySelector('#contact-name'),

        phone: form.querySelector('#contact-phone'),

        email: form.querySelector('#contact-email'),

        service: form.querySelector('#contact-service'),

        message: form.querySelector('#contact-message'),
    };

    /* ==========================================================
   BOTONES
========================================================== */

    const buttons = {
        whatsapp: form.querySelector("[data-send='whatsapp']"),

        email: form.querySelector("[data-send='email']"),
    };

    /* ==========================================================
   MENSAJE DE ESTADO
========================================================== */

    const status = form.querySelector('[data-contact-status]');

    /* ==========================================================
   UTILIDADES
========================================================== */

    /*
     * Devuelve el contenido limpio
     * de cualquier campo del formulario.
     */

    function value(field) {
        return field.value.trim();
    }

    /*
     * Devuelve el texto visible
     * del servicio seleccionado.
     */

    function selectedService() {
        return fields.service.options[fields.service.selectedIndex].text;
    }

    /*
     * Devuelve el número completo
     * construido por el selector
     * internacional.
     */

    function fullPhone() {
        if (!window.countrySelector) {
            return value(fields.phone);
        }

        return window.countrySelector.getFullPhone();
    }

    /*
     * Comprueba que existe
     * un país seleccionado.
     */

    function validateCountry() {
        if (!window.countrySelector) {
            return true;
        }

        if (window.countrySelector.hasCountry()) {
            window.countrySelector.clearInvalid();

            return true;
        }

        window.countrySelector.markInvalid();

        return false;
    }

    /*
     * Valida completamente
     * el formulario.
     */

    function validateForm() {
        /*
         * Validación HTML5.
         */

        if (!form.checkValidity()) {
            form.reportValidity();

            return false;
        }

        /*
         * Validación del selector
         * internacional.
         */

        if (!validateCountry()) {
            return false;
        }

        return true;
    }

    /*
     * Activa o desactiva
     * ambos botones de envío.
     */

    function disableButtons(disabled = true) {
        Object.values(buttons).forEach((button) => {
            if (button) {
                button.disabled = disabled;
            }
        });
    }

    /* ==========================================================
   MENSAJES DE ESTADO
========================================================== */

    /*
     * Muestra un mensaje traducido
     * al usuario.
     */

    function showStatus(key) {
        if (!status) {
            return;
        }

        status.textContent = window.i18n?.get(key) || '';
    }

    /*
     * Elimina cualquier mensaje
     * mostrado anteriormente.
     */

    function clearStatus() {
        if (!status) {
            return;
        }

        status.textContent = '';
    }

    /* ==========================================================
   LIMPIEZA DEL FORMULARIO
========================================================== */

    /*
     * Restablece completamente
     * el formulario.
     */

    function clearForm() {
        /*
         * Restablecemos todos
         * los campos HTML.
         */

        form.reset();

        /*
         * Eliminamos mensajes.
         */

        clearStatus();

        /*
         * Reactivamos botones.
         */

        disableButtons(false);

        /*
         * Cancelamos cualquier
         * estado pendiente.
         */

        waitingReturn = false;

        /*
         * Eliminamos el temporizador.
         */

        resetTimer = null;

        /*
         * Reiniciamos el selector
         * internacional.
         */

        if (window.countrySelector && typeof window.countrySelector.reset === 'function') {
            window.countrySelector.reset();
        }
    }

    /* ==========================================================
   TEMPORIZADORES
========================================================== */

    /*
     * Cancela el temporizador
     * actualmente activo.
     */

    function cancelResetTimer() {
        if (resetTimer === null) {
            return;
        }

        clearTimeout(resetTimer);

        resetTimer = null;
    }

    /*
     * Programa la limpieza
     * automática.
     */

    function startResetTimer() {
        cancelResetTimer();

        resetTimer = window.setTimeout(
            clearForm,

            CONFIG.resetDelay
        );
    }

    /*
     * Activa el modo de espera
     * hasta que el usuario vuelva
     * a la página.
     */

    function scheduleResetOnReturn() {
        waitingReturn = true;

        startResetTimer();
    }

    /* ==========================================================
   REGRESO A LA PÁGINA
========================================================== */

    /*
     * Cuando el usuario vuelve
     * desde WhatsApp o desde
     * el cliente de correo,
     * esperamos unos segundos
     * antes de limpiar.
     */

    document.addEventListener(
        'visibilitychange',

        () => {
            if (!waitingReturn) {
                return;
            }

            if (document.visibilityState !== 'visible') {
                return;
            }

            cancelResetTimer();

            window.setTimeout(
                clearForm,

                CONFIG.returnDelay
            );
        }
    );

    /*
     * Construye el mensaje que será
     * utilizado por WhatsApp y por
     * el cliente de correo.
     */

    function buildMessage() {
        const t = window.i18n.translate.bind(window.i18n);

        const g = window.i18n.get.bind(window.i18n);

        const now = new Date().toLocaleString(navigator.language);

        return [
            g('mail.greeting'),

            '',

            t(
                'mail.introduction',

                {
                    name: value(fields.name),

                    company: CONFIG.companyName,
                }
            ),

            '',

            g(`mail.serviceIntroduction.${fields.service.value}`),

            '',

            g('mail.contactMethods'),

            '',

            `• ${g('mail.summary.name')}: ${value(fields.name)}`,

            `• ${g('mail.phone')}: ${window.countrySelector.getFullPhone()}`,

            `• ${g('mail.email')}: ${value(fields.email)}`,

            '',

            `• ${g('mail.summary.service')}: ${selectedService()}`,

            '',

            g('mail.messageTitle'),

            '',

            value(fields.message),

            '',

            g('mail.farewell'),

            '',

            g('mail.thanks'),

            '',

            g('mail.closing'),

            '',

            value(fields.name),

            '',

            '────────────────────────────────',

            g('mail.summaryTitle'),

            '────────────────────────────────',

            `${g('mail.summary.name')}: ${value(fields.name)}`,

            `${g('mail.summary.service')}: ${selectedService()}`,

            `${g('mail.summary.phone')}: ${window.countrySelector.getFullPhone()}`,

            `${g('mail.summary.email')}: ${value(fields.email)}`,

            `${g('mail.summary.page')}: ${window.location.href}`,

            `${g('mail.summary.date')}: ${now}`,
        ].join('\n');
    }

    /* ==========================================================
   PREPARAR ENVÍO
========================================================== */

    /*
     * Ejecuta todas las comprobaciones
     * antes de iniciar cualquier envío.
     */

    function prepareSend() {
        /*
         * Validación completa
         * del formulario.
         */

        if (!validateForm()) {
            return null;
        }

        /*
         * Evitamos dobles clics.
         */

        disableButtons(true);

        /*
         * Limpiamos mensajes
         * anteriores.
         */

        clearStatus();

        /*
         * Construimos el mensaje.
         */

        return buildMessage();
    }

    /* ==========================================================
   ENVÍO POR WHATSAPP
========================================================== */

    /*
     * Abre WhatsApp con el mensaje
     * generado automáticamente.
     */

    function sendWhatsapp() {
        const message = prepareSend();

        if (!message) {
            return;
        }

        showStatus('contactForm.status.whatsapp');

        scheduleResetOnReturn();

        const url = `https://wa.me/${CONFIG.companyPhone}?text=${encodeURIComponent(message)}`;

        window.location.href = url;
    }

    /* ==========================================================
   ENVÍO POR CORREO
========================================================== */

    /*
     * Abre el cliente de correo
     * predeterminado.
     */

    function sendEmail() {
        const message = prepareSend();

        if (!message) {
            return;
        }

        showStatus('contactForm.status.email');

        scheduleResetOnReturn();

        /*
         * Asunto profesional.
         */

        const subject = encodeURIComponent(window.i18n.get('mail.subject'));

        /*
         * Cuerpo del correo.
         */

        const body = encodeURIComponent(message);

        /*
         * Apertura del cliente.
         */

        window.location.href =
            `mailto:${CONFIG.companyEmail}` + `?subject=${subject}` + `&body=${body}`;
    }

    /* ==========================================================
   EVENTOS
========================================================== */

    /*
     * Botón WhatsApp.
     */

    if (buttons.whatsapp) {
        buttons.whatsapp.addEventListener(
            'click',

            (event) => {
                event.preventDefault();

                sendWhatsapp();
            }
        );
    }

    /*
     * Botón Correo.
     */

    if (buttons.email) {
        buttons.email.addEventListener(
            'click',

            (event) => {
                event.preventDefault();

                sendEmail();
            }
        );
    }

    /*
     * Mientras el usuario escribe
     * eliminamos los mensajes de estado.
     */

    form.addEventListener(
        'input',

        () => {
            clearStatus();
        }
    );

    /*
     * Si el usuario cambia el servicio,
     * eliminamos también los mensajes.
     */

    fields.service.addEventListener(
        'change',

        () => {
            clearStatus();
        }
    );

    /*
     * Si el usuario vuelve a seleccionar
     * un país eliminamos el estado inválido.
     */

    document.addEventListener(
        'country:selected',

        () => {
            window.countrySelector?.clearInvalid();

            clearStatus();
        }
    );

    /*
     * Evitamos que el formulario
     * llegue a enviarse mediante
     * el submit tradicional.
     */

    form.addEventListener(
        'submit',

        (event) => {
            event.preventDefault();
        }
    );

    /* ==========================================================
   INICIALIZACIÓN
========================================================== */

    /*
     * Dejamos el formulario
     * preparado desde el inicio.
     */

    disableButtons(false);

    clearStatus();
})();
