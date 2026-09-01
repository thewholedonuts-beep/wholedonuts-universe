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

Additional controlled Edge checks passed:

- keyboard emulation focused `Learn` after Tab navigation; the normal
  keydown/character/keyup Enter sequence revealed question two and focused
  `Whole Donuts`;
- direct `#awd` and `#tnc` routes on a 1280x800 layout entered and focused
  their requested targets;
- emulated reduced motion computed `scroll-behavior:auto` and a zero-second
  skip-link transition;
- when every `Storage` get/set/remove method was injected to throw a
  `SecurityError`, selecting `Learn` still revealed question two through the
  in-memory fallback;
- a 568x320 landscape layout and a 1280x800 desktop layout had no horizontal
  overflow. The initial entry hides the rail at desktop by design until entry
  is complete.
- with `api.qrserver.com` blocked in Edge DevTools before the user requested a
  QR, the existing pass control showed `QR image unavailable right now. Use
  your private +U link instead.`; no request reached the QR provider;
- with the controlled browser's Clipboard write unavailable, `Copy invitation
  link` visibly reported `The invitation link could not be copied. You can
  share https://wenevergonnaclose.com/ directly.` without preventing entry.
- with Edge DevTools emulating cellular 3G (750ms latency, 50KB/s download,
  25KB/s upload), the local static snapshot reached `document.readyState` of
  `complete` in 3,629ms; CSS and app entry controls were loaded and DevTools
  recorded no loading failures.

This is actual Windows Edge execution against the immutable PR snapshot, with
automated keyboard and touch emulation. It is not physical-device, iOS,
Android, macOS, ChromeOS, Linux, real-carrier network, or live-domain evidence.

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
