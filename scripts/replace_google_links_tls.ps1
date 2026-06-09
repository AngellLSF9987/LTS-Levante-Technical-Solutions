param(
  [Parameter(Mandatory=$true)]
  [string]$GoogleBusinessUrl
)

$ErrorActionPreference = "Stop"

if ($GoogleBusinessUrl -notmatch '^https://') {
  throw "El enlace debe empezar por https://"
}

$files = Get-ChildItem -Path . -Recurse -Include *.html -File | Where-Object {
  $_.FullName -notmatch '\.git\' -and $_.FullName -notmatch 'node_modules'
}

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw -Encoding UTF8
  $original = $content

  # Reemplaza href de enlaces que apuntan a Google cuando el propio bloque contiene textos objetivo.
  $content = [regex]::Replace(
    $content,
    '(<a\b(?=[^>]*href="https://(?:www\.)?google\.com[^"]*")(?=[^>]*>[^<]*(?:Encu[eé]ntranos en Google|Abrir en Google Maps|Perfil de empresa))[^>]*href=")[^"]*(")',
    "`${1}$GoogleBusinessUrl`${2}",
    'IgnoreCase'
  )

  # Limpieza de enlaces privados si quedaron como texto o en href.
  $content = $content -replace 'https://www\.google\.com/search\?q=mi%20empresa[^"\s<]*', $GoogleBusinessUrl
  $content = $content -replace 'https://www\.google\.com/search\?q=Levante\+Technical\+Solutions[^"\s<]*', $GoogleBusinessUrl

  if ($content -ne $original) {
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Actualizado: $($file.FullName)"
  }
}

Write-Host "Proceso terminado. Revisa con: git diff"
