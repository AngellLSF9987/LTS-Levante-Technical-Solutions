# -*- coding: utf-8 -*-
from pathlib import Path
import sys

verify_file = Path("googlebf14d2205ce8e958.html")
expected = "google-site-verification: googlebf14d2205ce8e958.html"

print("TLS v0.4.5 Search Console readiness check")

if not verify_file.exists():
    print(f"ERROR: Missing {verify_file} in project root")
    sys.exit(1)

content = verify_file.read_text(encoding="utf-8").replace("\r", "").strip()
if content != expected:
    print(f"ERROR: {verify_file} content does not match expected token")
    print(f"Expected: {expected}")
    print(f"Current:  {content}")
    sys.exit(1)

for filename in ["robots.txt", "sitemap.xml", "VERSION.json", "index.html"]:
    path = Path(filename)
    if path.exists():
        print(f"OK: {filename} found")
    else:
        print(f"WARNING: {filename} not found in project root")

print("OK: Google verification file is ready")
print("After deploy, test: https://levante-tls.pages.dev/googlebf14d2205ce8e958.html")
