$VerifyFile = "googlebf14d2205ce8e958.html"
$Expected = "google-site-verification: googlebf14d2205ce8e958.html"

Write-Host "TLS v0.4.5 Search Console readiness check"

if (-not (Test-Path $VerifyFile)) {
  Write-Error "Missing $VerifyFile in project root"
  exit 1
}

$Content = (Get-Content $VerifyFile -Raw).Replace("`r", "").Trim()
if ($Content -ne $Expected) {
  Write-Error "$VerifyFile content does not match expected token"
  Write-Host "Expected: $Expected"
  Write-Host "Current:  $Content"
  exit 1
}

@("robots.txt", "sitemap.xml", "VERSION.json", "index.html") | ForEach-Object {
  if (Test-Path $_) {
    Write-Host "OK: $_ found"
  } else {
    Write-Warning "$_ not found in project root"
  }
}

Write-Host "OK: Google verification file is ready"
Write-Host "After deploy, test: https://levante-tls.pages.dev/googlebf14d2205ce8e958.html"
