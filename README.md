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
GitHub Pages or DNS is already active. To cut over, configure **Settings ->
Pages** to publish from the `main` branch repository root, set
`wenevergonnaclose.com` as the custom domain, and then configure the DNS
records GitHub Pages displays for that domain. Enable HTTPS enforcement only
after GitHub verifies the domain.

## Operations tooling

The Go 1.21 funnel and domain operations project remains in `cmd/`, `pkg/`,
`config/`, `workflows/`, and `projects/`. It is separate from the static Pages
site. See [SETUP.md](SETUP.md) and [README_FUNNELS.md](README_FUNNELS.md) for
operational setup; keep credentials in local environment files or GitHub
Actions secrets, never in the repository.