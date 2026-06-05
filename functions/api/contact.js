// =========================================================
// TLS - Cloudflare Pages Function: /api/contact
// Turnstile server-side validation + honeypot + Resend
// Versión: v0.4.2
// =========================================================

const SERVICE_LABELS = {
  piscinas: "Piscinas",
  electricidad: "Electricidad",
  videovigilancia: "Videovigilancia CCTV",
  "antenas-satelite": "Antenas y satélite",
  otros: "Otro servicio técnico",
};

const DEFAULT_CONTACT_EMAIL = "levante.tls@gmail.com";
const DEFAULT_SITE_URL = "https://levante-tls.pages.dev";
const MIN_FORM_TIME_MS = 2500;

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function clean(value, maxLength = 1000) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanLongText(value, maxLength = 3000) {
  return String(value || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9+()\s.-]{6,30}$/.test(phone);
}

async function readRequestData(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await request.json();
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

function looksLikeBotByTiming(raw) {
  const startedAt = Number(raw.form_started_at || 0);
  if (!startedAt) return false;
  return Date.now() - startedAt < MIN_FORM_TIME_MS;
}

async function verifyTurnstile(token, request, env) {
  if (!env.TURNSTILE_SECRET_KEY) {
    return { ok: false, message: "Falta configurar TURNSTILE_SECRET_KEY en Cloudflare." };
  }

  if (!token) {
    return { ok: false, message: "Completa la verificación anti-spam antes de enviar." };
  }

  const formData = new FormData();
  formData.append("secret", env.TURNSTILE_SECRET_KEY);
  formData.append("response", token);

  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) formData.append("remoteip", ip);

  if (crypto.randomUUID) {
    formData.append("idempotency_key", crypto.randomUUID());
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.success) {
    console.warn("Turnstile verification failed", result);
    return { ok: false, message: "No se ha podido validar la verificación anti-spam." };
  }

  return { ok: true };
}

function buildInternalEmail(data, request, env) {
  const serviceLabel = SERVICE_LABELS[data.servicio] || clean(data.servicio, 80) || "Servicio no indicado";
  const siteUrl = env.PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  const submittedAt = new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" });
  const referer = request.headers.get("referer") || siteUrl;
  const ip = request.headers.get("CF-Connecting-IP") || "No disponible";

  const text = `Nueva solicitud de contacto TLS\n\nFecha: ${submittedAt}\nNombre: ${data.nombre}\nTeléfono/WhatsApp: ${data.telefono}\nEmail: ${data.email || "No indicado"}\nServicio: ${serviceLabel}\n\nMensaje:\n${data.mensaje}\n\nOrigen: ${referer}\nIP Cloudflare: ${ip}`;

  const html = `
    <h2>Nueva solicitud de contacto TLS</h2>
    <p><strong>Fecha:</strong> ${escapeHtml(submittedAt)}</p>
    <p><strong>Nombre:</strong> ${escapeHtml(data.nombre)}</p>
    <p><strong>Teléfono/WhatsApp:</strong> ${escapeHtml(data.telefono)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email || "No indicado")}</p>
    <p><strong>Servicio:</strong> ${escapeHtml(serviceLabel)}</p>
    <h3>Mensaje</h3>
    <p>${escapeHtml(data.mensaje).replace(/\n/g, "<br>")}</p>
    <hr>
    <p><strong>Origen:</strong> ${escapeHtml(referer)}</p>
    <p><strong>IP Cloudflare:</strong> ${escapeHtml(ip)}</p>
  `;

  return {
    subject: `Nueva solicitud TLS: ${serviceLabel}`,
    text,
    html,
  };
}

function buildAutoReply(data, env) {
  const siteUrl = env.PUBLIC_SITE_URL || DEFAULT_SITE_URL;

  return {
    subject: "Hemos recibido tu solicitud - TLS",
    text: `Hola ${data.nombre},\n\nGracias por contactar con TLS - Levante Technical Solutions.\n\nHemos recibido tu solicitud y la revisaremos lo antes posible. Para poder orientarte mejor, revisaremos el tipo de servicio solicitado, la zona, la urgencia y cualquier información técnica que nos hayas enviado.\n\nTrabajamos en servicios técnicos integrales para hogares, comunidades, empresas y viviendas vacacionales: mantenimiento de piscinas, electricidad, videovigilancia CCTV, cámaras de seguridad, antenas y sistemas satélite.\n\nSi tu consulta es urgente, puedes contactar también por teléfono o WhatsApp: 614 616 135\n\nUn saludo,\nTLS - Levante Technical Solutions\nlevante.tls@gmail.com\n${siteUrl}`,
    html: `
      <p>Hola ${escapeHtml(data.nombre)},</p>
      <p>Gracias por contactar con <strong>TLS - Levante Technical Solutions</strong>.</p>
      <p>Hemos recibido tu solicitud y la revisaremos lo antes posible. Para poder orientarte mejor, revisaremos el tipo de servicio solicitado, la zona, la urgencia y cualquier información técnica que nos hayas enviado.</p>
      <p>Trabajamos en servicios técnicos integrales para hogares, comunidades, empresas y viviendas vacacionales: mantenimiento de piscinas, electricidad, videovigilancia CCTV, cámaras de seguridad, antenas y sistemas satélite.</p>
      <p>Si tu consulta es urgente, puedes contactar también por teléfono o WhatsApp: <strong>614 616 135</strong></p>
      <p>Un saludo,<br><strong>TLS - Levante Technical Solutions</strong><br>levante.tls@gmail.com<br><a href="${escapeHtml(siteUrl)}">${escapeHtml(siteUrl)}</a></p>
    `,
  };
}

async function sendWithResend({ to, subject, text, html, replyTo }, env) {
  if (!env.RESEND_API_KEY) {
    throw new Error("Falta configurar RESEND_API_KEY en Cloudflare.");
  }

  if (!env.FROM_EMAIL) {
    throw new Error("Falta configurar FROM_EMAIL en Cloudflare.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      html,
      reply_to: replyTo ? [replyTo] : undefined,
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("Resend error", result);
    throw new Error(result.message || "Error al enviar el email con Resend.");
  }

  return result;
}

export async function onRequestOptions() {
  return jsonResponse({ ok: true });
}

export async function onRequestGet() {
  return jsonResponse({ ok: false, message: "Método no permitido." }, 405);
}

export async function onRequestPost({ request, env }) {
  try {
    const raw = await readRequestData(request);

    // Honeypot: si un bot rellena este campo oculto, fingimos éxito y no enviamos nada.
    if (clean(raw.website, 200)) {
      return jsonResponse({ ok: true, message: "Solicitud enviada correctamente." });
    }

    // Anti-bot suave: si el formulario se envía demasiado rápido, fingimos éxito.
    if (looksLikeBotByTiming(raw)) {
      return jsonResponse({ ok: true, message: "Solicitud enviada correctamente." });
    }

    const data = {
      nombre: clean(raw.nombre, 120),
      telefono: clean(raw.telefono, 80),
      email: clean(raw.email, 180).toLowerCase(),
      servicio: clean(raw.servicio, 80),
      mensaje: cleanLongText(raw.mensaje, 3000),
      privacidad: clean(raw.privacidad, 40),
    };

    if (!data.nombre || !data.telefono || !data.servicio || !data.mensaje) {
      return jsonResponse({ ok: false, message: "Completa los campos obligatorios del formulario." }, 400);
    }

    if (!isValidPhone(data.telefono)) {
      return jsonResponse({ ok: false, message: "El teléfono no parece válido." }, 400);
    }

    if (data.email && !isValidEmail(data.email)) {
      return jsonResponse({ ok: false, message: "El correo electrónico no parece válido." }, 400);
    }

    if (data.privacidad !== "aceptada") {
      return jsonResponse({ ok: false, message: "Debes aceptar el uso de los datos para responder a tu solicitud." }, 400);
    }

    const token = clean(raw["cf-turnstile-response"] || raw.turnstileToken, 3000);
    const turnstile = await verifyTurnstile(token, request, env);

    if (!turnstile.ok) {
      return jsonResponse({ ok: false, message: turnstile.message }, 400);
    }

    const to = env.CONTACT_TO_EMAIL || DEFAULT_CONTACT_EMAIL;
    const internal = buildInternalEmail(data, request, env);

    await sendWithResend({
      to,
      subject: internal.subject,
      text: internal.text,
      html: internal.html,
      replyTo: data.email || undefined,
    }, env);

    // Auto-respuesta opcional. Actívala con SEND_AUTOREPLY=true cuando Resend esté listo.
    if (data.email && String(env.SEND_AUTOREPLY || "").toLowerCase() === "true") {
      const auto = buildAutoReply(data, env);
      await sendWithResend({
        to: data.email,
        subject: auto.subject,
        text: auto.text,
        html: auto.html,
        replyTo: to,
      }, env);
    }

    return jsonResponse({ ok: true, message: "Solicitud enviada correctamente. Te responderemos lo antes posible." });
  } catch (error) {
    console.error("TLS contact form error", error);
    return jsonResponse({
      ok: false,
      message: "No se ha podido enviar la solicitud. Inténtalo de nuevo o contacta por WhatsApp.",
    }, 500);
  }
}
