/**
 * TLS v0.4.4 - Google Business Profile public link helper.
 *
 * Uso recomendado en HTML:
 * <a href="https://share.google/ydplMedKFJiICu13F" data-google-business-link>Encuéntranos en Google</a>
 */
(function () {
  'use strict';

  const GOOGLE_BUSINESS_PROFILE_URL = 'https://share.google/ydplMedKFJiICu13F';

  document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('[data-google-business-link]');

    links.forEach(function (link) {
      link.setAttribute('href', GOOGLE_BUSINESS_PROFILE_URL);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('aria-label', 'Abrir Perfil de Empresa de Levante Technical Solutions en Google');
    });
  });
})();
