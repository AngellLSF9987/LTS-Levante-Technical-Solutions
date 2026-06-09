#!/usr/bin/env bash
set -e
VERIFY_FILE="googlebf14d2205ce8e958.html"
EXPECTED="google-site-verification: googlebf14d2205ce8e958.html"

echo "TLS v0.4.5 Search Console readiness check"

if [ ! -f "$VERIFY_FILE" ]; then
  echo "ERROR: Missing $VERIFY_FILE in project root"
  exit 1
fi

CONTENT="$(tr -d '\r' < "$VERIFY_FILE" | sed 's/[[:space:]]*$//')"
if [ "$CONTENT" != "$EXPECTED" ]; then
  echo "ERROR: $VERIFY_FILE content does not match expected token"
  echo "Expected: $EXPECTED"
  echo "Current:  $CONTENT"
  exit 1
fi

for f in robots.txt sitemap.xml VERSION.json index.html; do
  if [ ! -f "$f" ]; then
    echo "WARNING: $f not found in project root"
  else
    echo "OK: $f found"
  fi
done

echo "OK: Google verification file is ready"
echo "After deploy, test: https://levante-tls.pages.dev/googlebf14d2205ce8e958.html"
