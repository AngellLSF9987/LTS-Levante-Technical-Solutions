// =========================================================
// LTS - Versión pública de assets
// Cambia este valor cuando sustituyas favicon, logos o CSS crítico.
// =========================================================
const LTS_ASSET_VERSION = "1.0.0";

function versionFavicons() {
  document
    .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
    .forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) return;

      const cleanHref = href.split("?")[0];
      link.setAttribute("href", `${cleanHref}?v=${LTS_ASSET_VERSION}`);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  versionFavicons();
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();
});
