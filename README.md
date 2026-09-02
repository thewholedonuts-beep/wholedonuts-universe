# Whole Donuts Universe

This repository is the consolidated home for the Whole Donuts Universe.

## Public site

The repository root contains the static GitHub Pages bundle for
`wenevergonnaclose.com`:

- `index.html`, `guide.html`, `styles.css`, and `app.js` provide the public
  Whole Donuts entry, optional ecosystem guide, and +U experience.
- `CNAME` declares `wenevergonnaclose.com` as the custom domain.
- The public site keeps its welcome choices, +U pass, and last-visit data in
  the visitor's browser. A valid `?u=` link can restore a pass, and QR images
  are requested only when the visitor explicitly asks for one.

  The Fresh Launch Window stores only a versioned local start timestamp and
  completed anonymous interaction count: `{"v":1,"startedAt":"...","count":0}`.
  It counts successful local exploration steps, not visits, identities, page
  loads, pass values, recipients, sharing outcomes, support, payment, or
  purchase actions. Before the next eligible interaction at 12 hours, local
  midnight, or 1,000 local interactions, it resets the welcome and Dashboard
  presentation without removing the device-local +U pass. This is a per-browser
  limit, never a global public metric.

  The `?u=` value is a private device-local +U return link only. It does not
  authenticate an operator, grant access, identify a person, activate a target,
  count a contribution, or carry SEO data. Daily SEO and learning targets remain
  outside the public site in access-controlled operations and require explicit
  human activation and release review.

  The public SEO Crumb Saver treats deliberate public pages, guides, templates,
  and canonical invitations as discovery entry points for reviewed knowledge. It
  does not collect a visitor profile or submit material from this static site.
  The root uses canonical, robots, sitemap, social-preview, and factual WebSite
  metadata; `?u=` pass URLs change to `noindex,nofollow` in the browser and retain
  the canonical root. The non-deployed [SEO Crumb Saver operating model](config/seo-crumb-saver-operating-model.md)
  requires human review of aggregate visibility and prohibits tracking, scraping,
  credentials, rank manipulation, and automatic publishing.

The [`deploy-pages` workflow](.github/workflows/deploy-pages.yml) publishes
the reviewed public bundle after changes merge to `main`, or when dispatched
manually. It stages only named public static files, including the exact
`CNAME`, and excludes Go operations configuration and local credentials. In
**Settings -> Pages**, select **GitHub Actions** as the source and set the
custom domain to `wenevergonnaclose.com`; GitHub provides the required DNS and
verification instructions. The workflow verifies the deployed revision through
the GitHub Pages URL, so custom-domain DNS propagation does not make a valid
deployment look failed. Any future domain or DNS change requires a separate
reviewed operational change.

## Operations tooling

The Go 1.21 funnel and domain operations project remains in `cmd/`, `pkg/`,
`config/`, `workflows/`, and `projects/`. It is separate from the static Pages
site. See [SETUP.md](SETUP.md) and [README_FUNNELS.md](README_FUNNELS.md) for
operational setup; keep credentials in local environment files or GitHub
Actions secrets, never in the repository.

## Donation Access Hub and Rewards Center

The public Donation Access Hub is an interface and policy, not a payment
processor, wallet, fund-transfer system, automatic billing system, or
automatic allocation system. A visitor must select a voluntary support purpose,
review the processor and payee, and affirm a final action before an external
payment link is revealed. Store purchases remain separate merchant
transactions, not donations. The Share & Invitation Protocol creates a
non-sensitive ecosystem link only when a visitor explicitly shares or copies
it; it does not track recipients or create referral, payment, or reward records.
Cash App and Chime to `$wholedonuts` are the only allowed manual provider
routes. Cash App is the consent-gated optional external exit. Chime has no
universal public payment URL, so the same gate reveals only an instruction to
open the official Chime app, enter the ChimeSign, and optionally copy it;
copying never initiates a payment or transfer. No other provider is part of
this model.

Real accounting, charity or tax treatment, refunds, merchant-of-record
responsibilities, and reward eligibility require decisions by the responsible
entity and configured providers. See the non-deployed
[Donation Access Hub operating model](config/donation-access-operating-model.md)
for operational constraints.

The public Crumb Saver protocol and contribution template remain available, but
the current static Pages configuration contains no approved submission runtime.
Its form is visibly unavailable and accepts no text, so it cannot discard a
submission. Do not link a separate Crumb Saver endpoint unless its owner
supplies and verifies it.

## Consolidation and learning

Universe is the verified system of record for material that has completed
intake; it does not claim that all legacy or private material has migrated.
The non-deployed [consolidation and learning model](config/consolidation-learning-model.md)
defines classification, preserve-before-remove provenance, reviewed learning
loops, and staged legacy retirement. It prohibits automatic publishing,
deletion, payment, credential import, and private-data import.

## Anonymous +U Dashboard

After the voluntary three-question welcome flow, the public entry can display
an abstract, faceless +U figure. It stores only a minimal anonymous local
accessory record in that browser and unlocks accessories through non-financial
exploration of the entry experience. It does not create a sign-in, profile,
unique identifier, server record, payment record, recipient tracking, or
reward entitlement. Resetting the Dashboard removes that local progress and
restarts the welcome flow; a +U pass remains a device-local return link, not an
identity.
