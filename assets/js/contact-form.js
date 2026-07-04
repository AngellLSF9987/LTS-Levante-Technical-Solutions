// ==========================================================
// LTS - CONTACT FORM
// Levante Technical Solutions
// contact-form.js
//
// Gestión completa del formulario
// de contacto.
//
// Responsabilidades:
//
// • Validación HTML5.
// • Construcción del mensaje.
// • Envío por WhatsApp.
// • Envío por correo.
// • Limpieza automática.
// • Integración con phone-input.js.
//
// Este módulo NO conoce el
// funcionamiento interno de
// intl-tel-input.
//
// Toda la gestión telefónica
// se realiza exclusivamente
// mediante:
//
//     window.phoneInput
//
// ==========================================================

'use strict';

(() => {
    /* ==========================================================
       CONFIGURACIÓN
    ========================================================== */

    /*
     * Parámetros generales
     * de la empresa.
     */

    const CONFIG = {
        /*
         * Nombre comercial.
         */

        companyName: 'Levante Technical Solutions',

        /*
         * WhatsApp.
         */

        companyPhone: '34614616135',

        /*
         * Correo principal.
         */

        companyEmail: 'levante.tls@gmail.com',

        /*
         * Tiempo máximo antes
         * de limpiar el formulario.
         */

        resetDelay: 60000,

        /*
         * Tiempo de espera cuando
         * el usuario vuelve desde
         * WhatsApp o Mail.
         */

        returnDelay: 5000,
    };

    /* ==========================================================
       ESTADO INTERNO
    ========================================================== */

    /*
     * Temporizador activo.
     */

    let resetTimer = null;

    /*
     * Esperando regreso
     * del usuario.
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
     * Si la página no contiene
     * formulario abandonamos.
     */

    if (!form) {
        return;
    }

    /* ==========================================================
       CAMPOS
    ========================================================== */

    /*
     * Accesos rápidos a todos
     * los campos del formulario.
     */

    const fields = {
        name: form.querySelector('#contact-name'),

        phone: form.querySelector('#contact-phone'),

        email: form.querySelector('#contact-email'),

        service: form.querySelector('#contact-service'),

        message: form.querySelector('#contact-message'),

        privacy: form.querySelector('#contact-privacy'),
    };

    /* ==========================================================
       BOTONES
    ========================================================== */

    /*
     * Botones disponibles
     * para el envío.
     */

    const buttons = {
        whatsapp: form.querySelector('[data-send="whatsapp"]'),

        email: form.querySelector('[data-send="email"]'),
    };

    /* ==========================================================
       MENSAJE DE ESTADO
    ========================================================== */

    /*
     * Zona donde mostramos
     * mensajes al usuario.
     */

    const status = form.querySelector('[data-contact-status]');

    /* ==========================================================
       UTILIDADES
    ========================================================== */

    /*
     * Devuelve el contenido
     * limpio de un campo.
     */

    function value(field) {
        return field.value.trim();
    }

    /*
     * Devuelve el texto del
     * servicio seleccionado.
     */

    function selectedService() {
        return fields.service.options[fields.service.selectedIndex].text;
    }

    /*
     * Número internacional.
     *
     * Este módulo desconoce
     * cómo se obtiene.
     */

    function phoneNumber() {
        return window.phoneInput.getNumber();
    }

    /*
     * Valida el teléfono.
     */
    function phoneIsValid() {
        /*
         * ¿Existe la API?
         */

        if (!window.phoneInput) {
            console.warn('[PHONE] API no disponible.');

            return false;
        }

        /*
         * ¿Hay país?
         */

        if (!window.phoneInput.hasCountry()) {
            console.warn('[PHONE] No hay país seleccionado.');

            return false;
        }

        /*
         * ¿Hay número?
         */

        if (!window.phoneInput.hasNumber()) {
            console.warn('[PHONE] No hay número.');

            return false;
        }

        /*
         * Validación oficial.
         */

        if (!window.phoneInput.isValid()) {
            console.warn('[PHONE] Número no válido.');

            return false;
        }

        return true;
    }

    /*
     * Devuelve el mensaje correspondiente
     * al error del teléfono.
     */

    function phoneValidationMessage() {
        if (!window.phoneInput) {
            return 'No se ha podido validar el teléfono.';
        }

        switch (window.phoneInput.getValidationError()) {
            case 'TOO_SHORT':
                return 'El número es demasiado corto.';

            case 'TOO_LONG':
                return 'El número es demasiado largo.';

            case 'INVALID_COUNTRY_CODE':
                return 'El prefijo internacional no es válido.';

            case 'NOT_A_NUMBER':
                return 'Introduce únicamente números.';

            case 'INVALID_LENGTH':
                return 'La longitud del número no es válida.';

            case 'IS_POSSIBLE_LOCAL_ONLY':
                return 'Falta el prefijo internacional.';

            default:
                return 'Número de teléfono no válido.';
        }
    }

    /*
     * Activa o desactiva
     * todos los botones.
     */

    function disableButtons(disabled = true) {
        Object.values(buttons).forEach((button) => {
            if (button) {
                button.disabled = disabled;
            }
        });
    }

    /*
     * Muestra un mensaje
     * traducido.
     */

    function showStatus(key) {
        if (!status) {
            return;
        }

        status.textContent = window.i18n?.get(key) || '';
    }

    /*
     * Limpia el mensaje
     * mostrado.
     */

    function clearStatus() {
        if (!status) {
            return;
        }

        status.textContent = '';
    }

    /* ==========================================================
       VALIDACIÓN
    ========================================================== */

    /*
     * Comprueba la validez
     * completa del formulario.
     */

    function validateForm() {
        /*
         * Validación del teléfono.
         */

        if (!window.phoneInput.hasNumber()) {
            showFieldError(fields.phone, t('contactForm.validation.phoneRequired'));

            return false;
        }

        if (!window.phoneInput.isValid()) {
            const error = window.phoneInput.getValidationError();

            let message;

            switch (error) {
                case 'TOO_SHORT':
                    message = t('contactForm.validation.phoneTooShort');
                    break;

                case 'TOO_LONG':
                    message = t('contactForm.validation.phoneTooLong');
                    break;

                case 'INVALID_COUNTRY_CODE':
                    message = t('contactForm.validation.phoneCountry');
                    break;

                case 'NOT_A_NUMBER':
                    message = t('contactForm.validation.phoneNumber');
                    break;

                default:
                    message = t('contactForm.validation.phoneInvalid');
            }

            showFieldError(fields.phone, message);

            return false;
        }

        /*
         * Validación HTML5.
         */

        if (!form.checkValidity()) {
            form.reportValidity();

            return false;
        }

        return true;
    }

    /* ==========================================================
       CONSTRUCCIÓN DEL MENSAJE
    ========================================================== */

    /*
     * Genera el texto que será
     * utilizado tanto por
     * WhatsApp como por correo.
     */

    function buildMessage() {
        const t = window.i18n.translate.bind(window.i18n);

        const g = window.i18n.get.bind(window.i18n);

        const now = new Date().toLocaleString(navigator.language);

        return [
            g('contactForm.mail.greeting'),

            '',

            t(
                'contactForm.mail.introduction',

                {
                    name: value(fields.name),

                    company: CONFIG.companyName,
                }
            ),

            '',

            g(`contactForm.mail.serviceIntroduction.${fields.service.value}`),

            '',

            g('contactForm.mail.contactMethods'),

            '',

            `• ${g('contactForm.mail.summary.name')}: ${value(fields.name)}`,

            `• ${g('contactForm.mail.phone')}: ${phoneNumber()}`,

            `• ${g('contactForm.mail.email')}: ${value(fields.email)}`,

            '',

            `• ${g('contactForm.mail.summary.service')}: ${selectedService()}`,

            '',

            g('contactForm.mail.messageTitle'),

            '',

            value(fields.message),

            '',

            g('contactForm.mail.farewell'),

            '',

            g('contactForm.mail.thanks'),

            '',

            g('contactForm.mail.closing'),

            '',

            value(fields.name),

            '',

            '────────────────────────────────',

            g('contactForm.mail.summaryTitle'),

            '────────────────────────────────',

            `${g('contactForm.mail.summary.name')}: ${value(fields.name)}`,

            `${g('contactForm.mail.summary.service')}: ${selectedService()}`,

            `${g('contactForm.mail.summary.phone')}: ${phoneNumber()}`,

            `${g('contactForm.mail.summary.email')}: ${value(fields.email)}`,

            `${g('contactForm.mail.summary.page')}: ${window.location.href}`,

            `${g('contactForm.mail.summary.date')}: ${now}`,
        ].join('\n');
    }

    /* ==========================================================
       PREPARACIÓN DEL ENVÍO
    ========================================================== */

    /*
     * Ejecuta todas las
     * comprobaciones antes
     * del envío.
     */

    function prepareSend() {
        /*
         * Validamos el formulario.
         */

        if (!validateForm()) {
            return null;
        }

        /*
         * Evitamos dobles clics.
         */

        disableButtons(true);

        /*
         * Eliminamos mensajes
         * anteriores.
         */

        clearStatus();

        /*
         * Construimos el mensaje.
         */

        return buildMessage();
    }

    /* ==========================================================
       ENVÍO
    ========================================================== */

    /*
     * Construye la URL de envío
     * según el destino elegido.
     */

    function buildUrl(type, message) {
        /*
         * WhatsApp.
         */

        if (type === 'whatsapp') {
            return `https://wa.me/${CONFIG.companyPhone}?text=${encodeURIComponent(message)}`;
        }

        /*
         * Correo electrónico.
         */

        const subject = encodeURIComponent(window.i18n.get('mail.subject'));

        const body = encodeURIComponent(message);

        return `mailto:${CONFIG.companyEmail}` + `?subject=${subject}` + `&body=${body}`;
    }

    /*
     * Devuelve la clave i18n
     * del mensaje de estado.
     */

    function statusKey(type) {
        if (type === 'whatsapp') {
            return 'contactForm.status.whatsapp';
        }

        return 'contactForm.status.email';
    }

    /*
     * Motor único de envío.
     */

    function send(type) {
        /*
         * Construimos el mensaje.
         */

        const message = prepareSend();

        if (!message) {
            return;
        }

        /*
         * Mensaje de estado.
         */

        showStatus(statusKey(type));

        /*
         * Programamos limpieza.
         */

        scheduleReset();

        /*
         * Abrimos destino.
         */

        window.location.href = buildUrl(
            type,

            message
        );
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
         * Reiniciamos el
         * componente teléfono.
         */

        window.phoneInput.reset();

        /*
         * Eliminamos mensajes.
         */

        clearStatus();

        /*
         * Reactivamos botones.
         */

        disableButtons(false);

        /*
         * Estado inicial.
         */

        waitingReturn = false;

        resetTimer = null;
    }

    /* ==========================================================
       TEMPORIZADORES
    ========================================================== */

    /*
     * Cancela cualquier
     * temporizador activo.
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
     * Activa el modo espera
     * mientras el usuario
     * está fuera de la página.
     */

    function scheduleReset() {
        waitingReturn = true;

        startResetTimer();
    }

    /* ==========================================================
       REGRESO DEL USUARIO
    ========================================================== */

    /*
     * Cuando el usuario vuelve
     * desde WhatsApp o Mail,
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

    /* ==========================================================
       EVENTOS
    ========================================================== */

    /*
     * Registramos todos los
     * botones que disponen
     * del atributo data-send.
     */

    form.querySelectorAll('[data-send]')

        .forEach((button) => {
            button.addEventListener(
                'click',

                (event) => {
                    event.preventDefault();

                    /*
                     * Tipo de envío.
                     */

                    const type = button.dataset.send;

                    /*
                     * Ejecutamos
                     * el envío.
                     */

                    send(type);
                }
            );
        });

    /*
     * Mientras el usuario
     * modifica cualquier
     * campo eliminamos el
     * mensaje de estado.
     */

    form.addEventListener(
        'input',

        () => {
            clearStatus();
        }
    );

    /*
     * Evitamos el envío
     * HTML tradicional.
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
     * Dejamos preparado
     * el formulario.
     */

    disableButtons(false);

    clearStatus();
})();
