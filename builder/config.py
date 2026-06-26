from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
PARTIALS=ROOT/"partials"
OUTPUT=ROOT/"index.html"
TEMPLATE=ROOT/"index.template.html"
PARTS={
"HEAD":"head.html",
"HEADER":"header.html",
"HERO":"hero.html",
"SERVICES":"services-grid.html",
"CONTACT":"contact-area.html",
"FOOTER":"footer.html",
}
