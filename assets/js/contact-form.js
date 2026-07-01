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

        companyName: "Levante Technical Solutions",

        companyPhone: "34614616135",

        companyEmail: "levante.tls@gmail.com",

        /*
         * Tiempo máximo antes
         * de limpiar el formulario.
         */

        resetDelay: 60000,

        /*
         * Espera después de volver
         * a la página.
         */

        returnDelay: 5000

    };

    /* ==========================================================
       ESTADO INTERNO
    ========================================================== */

    /*
     * Temporizador principal.
     */

    let resetTimer = null;

    /*
     * Indica si estamos esperando
     * el regreso del usuario.
     */

    let waitingReturn = false;

    /* ==========================================================
       FORMULARIO
    ========================================================== */

    const form = document.querySelector(

        "[data-contact-form]"

    );

    /*
     * Si la página no contiene
     * formulario simplemente
     * abandonamos el módulo.
     */

    if (!form) {

        return;

    }

    /* ==========================================================
       CAMPOS
    ========================================================== */

    const fields = {

        name: form.querySelector("#contact-name"),

        phone: form.querySelector("#contact-phone"),

        email: form.querySelector("#contact-email"),

        service: form.querySelector("#contact-service"),

        message: form.querySelector("#contact-message")

    };

    /* ==========================================================
       BOTONES
    ========================================================== */

    const buttons = {

        whatsapp: form.querySelector(

            "[data-send='whatsapp']"

        ),

        email: form.querySelector(

            "[data-send='email']"

        )

    };

    /*
     * Zona de mensajes
     * al usuario.
     */

    const status = form.querySelector(

        "[data-contact-status]"

    );

    /* ==========================================================
       UTILIDADES
    ========================================================== */

    /*
     * Devuelve el valor de un campo
     * eliminando espacios al inicio
     * y al final.
     */

    function value(field) {

        return field.value.trim();

    }

    /*
     * Obtiene el texto visible
     * del servicio seleccionado.
     */

    function selectedService() {

        return fields.service.options[
            fields.service.selectedIndex
        ].text;

    }

    /*
     * Comprueba que el formulario
     * cumple todas las validaciones
     * HTML5.
     */

    function validateForm() {

        if (!form.checkValidity()) {

            form.reportValidity();

            return false;

        }

        return true;

    }

    /*
     * Habilita o deshabilita
     * ambos botones de envío.
     */

    function disableButtons(disabled = true) {

        Object.values(buttons).forEach(button => {

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
     * utilizando el motor i18n.
     *
     * Ejemplo:
     *
     * showStatus(
     *     "contactForm.status.whatsapp"
     * );
     */

    function showStatus(key) {

        if (!status) return;

        const text = window.i18n?.get(key);

        status.textContent = text || "";

    }

    /*
     * Limpia el mensaje mostrado
     * al usuario.
     */

    function clearStatus() {

        if (!status) return;

        status.textContent = "";

    }

    /* ==========================================================
       LIMPIEZA DEL FORMULARIO
    ========================================================== */

    /*
     * Restablece completamente
     * el formulario.
     */

    function clearForm() {

        form.reset();

        clearStatus();

        disableButtons(false);

        waitingReturn = false;

        resetTimer = null;

    }

    /* ==========================================================
       CONSTRUIR MENSAJE
    ========================================================== */

    /*
     * Construye el mensaje que se enviará
     * tanto por WhatsApp como por correo.
     *
     * Ambos métodos utilizarán exactamente
     * el mismo contenido.
     */

    function buildMessage() {

        return [

            "────────────────────────────────",

            CONFIG.companyName,

            "SOLICITUD DE SERVICIO",

            "────────────────────────────────",

            "",

            `Nombre: ${value(fields.name)}`,

            `Teléfono: ${value(fields.phone)}`,

            `Correo electrónico: ${value(fields.email) || "-"}`,

            `Servicio solicitado: ${selectedService()}`,

            "",

            "Mensaje:",

            value(fields.message),

            "",

            "────────────────────────────────",

            `Página: ${window.location.href}`,

            `Fecha: ${new Date().toLocaleString(navigator.language)}`,

            "",

            "Enviado desde el formulario web."

        ].join("\n");

    }


    /* ==========================================================
       TEMPORIZADOR DE LIMPIEZA
    ========================================================== */

    /*
     * Cancela cualquier temporizador
     * pendiente de limpieza.
     */

    function cancelResetTimer() {

        if (resetTimer !== null) {

            clearTimeout(resetTimer);

            resetTimer = null;

        }

    }


    /*
     * Programa la limpieza automática
     * transcurrido el tiempo configurado.
     */

    function startResetTimer() {

        cancelResetTimer();

        resetTimer = setTimeout(() => {

            clearForm();

        }, CONFIG.resetDelay);

    }


    /*
     * Activa el modo "esperando regreso".
     *
     * El formulario se limpiará cuando:
     *
     * • el usuario vuelva a la página,
     * • o expire el temporizador máximo.
     */

    function scheduleResetOnReturn() {

        waitingReturn = true;

        startResetTimer();

    }


    /* ==========================================================
       DETECTAR REGRESO A LA PÁGINA
    ========================================================== */

    /*
     * Cuando el usuario vuelve desde
     * WhatsApp o desde su gestor de correo,
     * esperamos unos segundos y limpiamos
     * el formulario.
     */

    document.addEventListener(

        "visibilitychange",

        () => {

            if (!waitingReturn) {

                return;

            }

            if (document.visibilityState !== "visible") {

                return;

            }

            cancelResetTimer();

            setTimeout(() => {

                clearForm();

            }, CONFIG.returnDelay);

        }

    );

    /* ==========================================================
       PREPARAR ENVÍO
    ========================================================== */

    /*
     * Realiza las tareas comunes
     * antes de abrir WhatsApp
     * o el cliente de correo.
     */

    function prepareSend() {

        if (!validateForm()) {

            return null;

        }

        disableButtons(true);

        clearStatus();

        return buildMessage();

    }


    /* ==========================================================
       ENVÍO POR WHATSAPP
    ========================================================== */

    function sendWhatsapp() {

        const message = prepareSend();

        if (!message) {

            return;

        }

        showStatus(

            "contactForm.status.whatsapp"

        );

        scheduleResetOnReturn();

        window.location.href =

            `https://wa.me/${CONFIG.companyPhone}?text=${encodeURIComponent(message)}`;

    }


    /* ==========================================================
       ENVÍO POR CORREO
    ========================================================== */

    function sendEmail() {

        const message = prepareSend();

        if (!message) {

            return;

        }

        showStatus(

            "contactForm.status.email"

        );

        scheduleResetOnReturn();

        const subject = encodeURIComponent(

            "Solicitud de servicio | LTS"

        );

        const body = encodeURIComponent(

            message

        );

        window.location.href =

            `mailto:${CONFIG.companyEmail}?subject=${subject}&body=${body}`;

    }


    /* ==========================================================
       EVENTOS
    ========================================================== */

    if (buttons.whatsapp) {

        buttons.whatsapp.addEventListener(

            "click",

            (event) => {

                event.preventDefault();

                sendWhatsapp();

            }

        );

    }

    if (buttons.email) {

        buttons.email.addEventListener(

            "click",

            (event) => {

                event.preventDefault();

                sendEmail();

            }

        );

    }

    /*
     * Al volver a escribir,
     * desaparecen los mensajes
     * informativos.
     */

    form.addEventListener(

        "input",

        () => {

            clearStatus();

        }

    );

})();