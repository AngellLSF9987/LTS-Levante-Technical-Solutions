<#
TLS - Organizador de documentación histórica
Versión: v0.4.2
Uso: ejecutar desde la raíz del repositorio.

powershell -ExecutionPolicy Bypass -File scripts/organize_docs_tls.ps1
#>

$ErrorActionPreference = "Stop"

function Ensure-Dir($path) {
  if (-not (Test-Path $path)) {
    New-Item -ItemType Directory -Path $path | Out-Null
  }
}

Ensure-Dir "docs"
Ensure-Dir "docs/fixes"
Ensure-Dir "docs/checks"
Ensure-Dir "docs/formulario"
Ensure-Dir "docs/git"
Ensure-Dir "docs/historial"
Ensure-Dir "docs/versiones"

$fixFiles = @(
  "README_CONTACT_FORM_REDIRECT.md",
  "README_FIX_FAVICON_VERSIONING.md",
  "README_FIX_LANGUAGE_BUTTONS_MOBILE.md",
  "README_FIX_RESPONSIVE_MOBILE_HEADER.md",
  "README_FIX_RUTAS_IMG_Y_CARD4.md",
  "README_FIX_SERVICES_CSS.md",
  "README_FIX_SERVICE_CARDS_MULTIIDIOMA.md",
  "README_MODULAR_SEO.md",
  "README_URGENT_FAVICON_DEMO_FIX.md"
)

$checkFiles = @(
  "CHECK_CONTACT_FORM_REDIRECT.txt",
  "CHECK_FAVICON_VERSIONING.txt",
  "CHECK_RUTAS_IMG_Y_CARD4.txt",
  "CHECK_SERVICES_CSS.txt",
  "CHECK_URGENT_FAVICON_DEMO_FIX.txt"
)

foreach ($file in $fixFiles) {
  if (Test-Path $file) {
    git mv $file "docs/fixes/$file" 2>$null
    if ($LASTEXITCODE -ne 0 -and (Test-Path $file)) {
      Move-Item -Force $file "docs/fixes/$file"
    }
    Write-Host "Movido fix: $file"
  }
}

foreach ($file in $checkFiles) {
  if (Test-Path $file) {
    git mv $file "docs/checks/$file" 2>$null
    if ($LASTEXITCODE -ne 0 -and (Test-Path $file)) {
      Move-Item -Force $file "docs/checks/$file"
    }
    Write-Host "Movido check: $file"
  }
}

Write-Host "Organización documental completada. Revisa: git status"
