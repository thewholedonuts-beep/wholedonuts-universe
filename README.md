# Whole Donuts Universe

This repository is the consolidated home for the Whole Donuts Universe.

## Public site

The repository root contains the static GitHub Pages bundle for
`wenevergonnaclose.com`:

- `index.html`, `styles.css`, and `app.js` provide the +U experience.
- `CNAME` declares `wenevergonnaclose.com` as the custom domain.
- The public site keeps its welcome choices, +U pass, and last-visit data in
  the visitor's browser. A valid `?u=` link can restore a pass, and QR images
  are requested only when the visitor explicitly asks for one.

The custom domain is declared in this repository, but it is not evidence that
GitHub Pages or DNS is already active. The manual
[`deploy-pages` workflow](.github/workflows/deploy-pages.yml) stages only the
public static files; it excludes Go operations configuration and local
credentials. Its `include_cname` input defaults to `false`, so the first
Universe Pages deployment is URL-only. `CNAME` remains in source for the final
cutover and is included only when that input is explicitly enabled after the
domain has moved to Universe. GitHub Actions deployments manage custom domains
in **Settings -> Pages**, not from the artifact's `CNAME` file.

To prepare and cut over, set **Settings -> Pages** to **GitHub Actions**, run
the workflow with `include_cname: false` to validate the Universe Pages URL,
set and verify `wenevergonnaclose.com` in Pages, and configure the DNS records
GitHub Pages displays. Do not detach the current legacy attachment until the
Universe URL and GitHub TXT verification are ready. After the transfer, run the
workflow with `include_cname: true` if the deployed artifact should retain the
source declaration. Enable HTTPS enforcement only after GitHub verifies the
domain.

## Operations tooling

The Go 1.21 funnel and domain operations project remains in `cmd/`, `pkg/`,
`config/`, `workflows/`, and `projects/`. It is separate from the static Pages
site. See [SETUP.md](SETUP.md) and [README_FUNNELS.md](README_FUNNELS.md) for
operational setup; keep credentials in local environment files or GitHub
Actions secrets, never in the repository.