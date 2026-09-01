# Blocked and gap register

This private register is excluded from the Pages artifact.

| Area | Status | Evidence or required owner decision |
|---|---|---|
| Mobile remediation | Partially evidenced; blocked from release | An immutable PR #14 snapshot was exercised in Edge touch emulation at 320x568, 360x800, 390x844, and 412x915: no horizontal overflow; rail 0x0; backdrop non-intercepting; all four controls worked after normal scroll. Remaining keyboard, direct-route, reduced-motion, physical-device, landscape, and desktop evidence is required. |
| Served-version verification | Blocked from release | Validate `deploy-version.txt` against the merged commit through the custom domain in a controlled post-deploy procedure. |
| Movement trifold assets | Missing | `MovementTrifoldOUTSIDE.png` and `MovementTrifoldINSIDE.png` are not in reachable source; owner-provided rights-reviewed originals are required. |
| Crumb Saver runtime | Unavailable | Public auth configuration has no runtime values; no submission may be enabled without approved credentials, data policy, and backend review. |
| Merchandise | Planned only | Product artwork, rights records, vendor mapping, pricing, fulfillment, and customer data flow are not approved. |
| WholeDonuts source | Preserve-first | WholeDonuts is Sunshine; retain its application, data, infrastructure, and operational history as one source system pending owner-approved disposition. |
| External operations | Owner-controlled | DNS, Pages configuration, domains, payment, vendor, social, and account changes require explicit authorization. |

## Compatibility evidence rules

Support baseline is current evergreen browsers available on iOS, Android,
Windows, macOS, ChromeOS, and Linux. Do not claim an unavailable or obsolete
environment as supported.

| Evidence area | Status | Required record |
|---|---|---|
| Windows Edge portrait captures | Executed before remediation | Edge headless captures at 320x568, 360x800, 390x844, and 412x915 prove the deployed overflow defect. |
| Branch mobile after-evidence | Partially executed | Edge 152.0.4191.53 actual execution with automated one-point touch emulation: all four required portrait widths had `scrollWidth == clientWidth`, zero DevTools errors, a zero-size hidden rail, non-intercepting backdrop, and 4/4 scrolled bounds/touch transitions. Keyboard, hash/direct-route, assets under constraint, and reduced-motion remain blocked. |
| Landscape and desktop layouts | Unknown | Execute only where layout behavior differs; record viewport and browser. |
| iOS, Android, macOS, ChromeOS, Linux | Unknown | Current evergreen browser evidence is required before marking support pass. |
| Clipboard, localStorage, QR fallback | Partially simulated | Confirm visible fallback/status and storage-denied/private-mode behavior without blocking anonymous entry. |

Record actual browser execution separately from automated DOM simulation.
Untestable items remain blocked; they cannot be promoted to a release pass.
