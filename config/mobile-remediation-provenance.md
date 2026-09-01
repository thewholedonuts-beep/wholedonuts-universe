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

- Original Movement trifold image files remain unrecovered.
- No canonical mobile-first source layout was recovered; the PR changes only
  the confirmed rail reservation and root overflow defect.
- Branch-hosted after-captures, measured mobile bounds, and a controlled
  post-deploy version-marker check are required before release approval.

## Release boundary

Archive, deployment, DNS, domain, payment, vendor, social, identity, and
external-service actions are outside this remediation. A release may proceed
only after the branch evidence demonstrates the target artifact and an owner
approves the result.
