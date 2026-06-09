param(
  [string]$ProfileUrl = "https://share.google/ydplMedKFJiICu13F"
)

Write-Host "TLS v0.4.4 - Aplicando enlace publico Google Business Profile..."
Write-Host "URL: $ProfileUrl"

$python = Get-Command python -ErrorAction SilentlyContinue
if ($python) {
  python scripts/apply_v0.4.4_google_profile_link.py $ProfileUrl
  exit $LASTEXITCODE
}

$py = Get-Command py -ErrorAction SilentlyContinue
if ($py) {
  py scripts/apply_v0.4.4_google_profile_link.py $ProfileUrl
  exit $LASTEXITCODE
}

Write-Host "No se encontro Python. Se intentara reemplazo basico PowerShell."
$markers = @("Encuéntranos en Google", "Encuentranos en Google", "Perfil de empresa", "Abrir en Google Maps", "Google Maps")
$files = Get-ChildItem -Path . -Recurse -Filter *.html | Where-Object { $_.FullName -notmatch "\\.git\\" }
$changed = @()

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw -Encoding UTF8
  $original = $content

  foreach ($marker in $markers) {
    $pattern = "<a([^>]*?)href=['\"" + '"' + "][^'\"" + '"' + "]*google[^'\"" + '"' + "]*['\"" + '"' + "]([^>]*?)>([^<]*" + [regex]::Escape($marker) + "[^<]*)</a>"
    $replacement = "<a`$1href=\"$ProfileUrl\"`$2 target=\"_blank\" rel=\"noopener noreferrer\">`$3</a>"
    $content = [regex]::Replace($content, $pattern, $replacement, "IgnoreCase")
  }

  $content = $content.Replace("__TLS_GOOGLE_BUSINESS_PUBLIC_URL__", $ProfileUrl)

  if ($content -ne $original) {
    $backup = "$($file.FullName).bak_v044"
    if (-not (Test-Path $backup)) {
      Set-Content -Path $backup -Value $original -Encoding UTF8
    }
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    $changed += $file.FullName
  }
}

Write-Host "Archivos modificados:"
$changed | ForEach-Object { Write-Host " - $_" }
