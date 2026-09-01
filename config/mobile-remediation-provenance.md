# Mobile remediation provenance

This private record supports PR #14 and is excluded from the Pages artifact.

| Item | Verified source | Status |
|---|---|---|
| Public entry bundle | WHNutz `main`: `index.html`, `styles.css`, `app.js`, `world/`, `templates/`, `CRUMB_PROTOCOL.md`, `WHOLE_DONUTS_GUIDE.md` | Integrated in Universe prior to PR #14. |
| Active entry deployment | Universe commit `b6ff8d6004c1fbd47410aafdbe9c0fbac0ed7f96`, Pages workflow run `33534962213` | Served artifact audited for mobile defect. |
| Current repository baseline | Universe `main` commit `f492294a996349abcd9b2f643ed7e2120a671851` | PR #14 base. |
| Mobile correction | Universe `styles.css` mobile rail and root-shell rules | PR #14 changes only layout behavior; no wording, assets, routes, or data flow are replaced. |
| Deployment integrity | Universe `.github/workflows/deploy-pages.yml` | PR #14 adds a non-sensitive `deploy-version.txt` artifact marker. |

## Verified gaps

- **Canonical identity:** `WholeDonuts` is
  `thewholedonuts-beep/wholedonuts-sunshine` in the desktop application.
  Treat Sunshine and WholeDonuts as one preserve-first source system; do not
  duplicate-count, separately import, or assign contradictory ownership to
  its history. Its application, data, infrastructure, and operational
  dependencies remain archive-preserved pending disposition.
- Original Movement trifold image files remain unrecovered.
- No canonical mobile-first source layout was recovered; the PR changes only
  the confirmed rail reservation and root overflow defect.
- The post-deploy custom-domain comparison cannot be exercised without a
  release, which remains held. The live custom domain still cannot be used as
  evidence for this PR until it serves the merged commit marker.

## Controlled PR snapshot evidence

On 2026-09-01, GitHub API archive content at PR #14 head
`0dc84213a15a0f04899feef468bc80166681a47a` was served locally without
modifying a repository or production. Edge `152.0.4191.53` (DevTools Protocol
1.3) used mobile device metrics and one-point touch emulation.

| Viewport | Root width | Rail geometry | Four scrolled targets | Four touch paths | DevTools errors |
|---|---:|---|---|---|---:|
| 320x568 | 320 / 320 | `display:none`, 0x0 | in bounds and center-hittable | each revealed question 2 and focused Whole Donuts | 0 |
| 360x800 | 360 / 360 | `display:none`, 0x0 | in bounds and center-hittable | each revealed question 2 and focused Whole Donuts | 0 |
| 390x844 | 390 / 390 | `display:none`, 0x0 | in bounds and center-hittable | each revealed question 2 and focused Whole Donuts | 0 |
| 412x915 | 412 / 412 | `display:none`, 0x0 | in bounds and center-hittable | each revealed question 2 and focused Whole Donuts | 0 |

The animated entry backdrop reported `pointer-events:none`. The four figure
controls are 105px to 132px high after ordinary vertical scrolling. At 320px,
the first figure begins at y=470 and the remaining three are below the initial
viewport; this is normal vertical document scrolling, not horizontal clipping,
and all four were exercised after scroll. Controlled first-paint captures and
machine-readable measurements are retained in the private session evidence
set, not the Pages artifact.

This is actual Edge execution against the immutable PR snapshot, with
automated touch emulation. It is not physical-device, iOS, Android, macOS,
ChromeOS, Linux, desktop-layout, keyboard-only, direct-route, reduced-motion,
storage-denied, or live-domain evidence.

## Controlled marker staging

The Pages staging allowlist was reproduced from the PR workflow with the
expected head SHA. `deploy-version.txt` contained exactly
`0dc84213a15a0f04899feef468bc80166681a47a`; all staged public files were
present. CNAME was absent by design because `include_cname` was not enabled in
this non-deployment control. The workflow's custom-domain polling check
remains unverified against a real release and therefore remains a release
blocker.

## Release boundary

Archive, deployment, DNS, domain, payment, vendor, social, identity, and
external-service actions are outside this remediation. A release may proceed
only after the branch evidence demonstrates the target artifact and an owner
approves the result.
