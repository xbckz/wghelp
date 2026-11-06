# WG Helper

WG Helper is a static site built with HTML, CSS, and JavaScript. GitHub Pages serves its section pages from folders, so public links stay extensionless, such as `/soldiers/` and `/best_army/`.

## Run locally

From this folder, start a static server:

```powershell
python -m http.server 8000
```

Open `http://localhost:8000/`.

## Layout

```text
index.html                 Home page
about/                     About page
soldiers/                  Extensionless section pages
assets/css/                Shared stylesheets
assets/images/items/       Numbered game artwork
assets/images/ui/          Site and interface images
assets/js/                 Site scripts and calculators
tests/                     Calculator validation tools
.github/workflows/         GitHub Actions workflows
```

The root `*.html` files are small redirects for old links; the folder `index.html` pages are canonical. Keep links between pages extensionless.
