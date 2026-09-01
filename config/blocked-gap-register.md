# Blocked and gap register

This private register is excluded from the Pages artifact.

| Area | Status | Evidence or required owner decision |
|---|---|---|
| Mobile remediation | Partially evidenced; blocked from release | An immutable PR #14 snapshot was exercised in Edge touch/keyboard emulation at 320x568, 360x800, 390x844, and 412x915: no horizontal overflow; rail 0x0; backdrop non-intercepting; all four controls worked after normal scroll. Hash/direct routes, reduced motion, landscape, desktop, and storage-denied core entry have controlled Edge evidence. Physical-device and cross-engine evidence remains required. |
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
| Branch mobile after-evidence | Partially executed | Edge 152.0.4191.53 actual execution with automated one-point touch/keyboard emulation: all four required portrait widths had `scrollWidth == clientWidth`, zero DevTools errors, a zero-size hidden rail, non-intercepting backdrop, 4/4 scrolled bounds/touch transitions, keyboard focus/Enter progression, #awd/#tnc routes, reduced-motion styles, and a 750ms/50KB/s emulated-3G local asset load with no failure. Physical-device/network evidence remains blocked. |
| Landscape and desktop layouts | Unknown | Execute only where layout behavior differs; record viewport and browser. |
| iOS, Android, macOS, ChromeOS, Linux | Unknown | Current evergreen browser evidence is required before marking support pass. |
| Clipboard, localStorage, QR fallback | Controlled Edge evidence | Injected Storage `SecurityError` preserved core entry; unavailable Clipboard write showed a direct-share message; blocked QR request showed the private-link fallback. Physical-device/private-mode coverage remains unknown. |

Record actual browser execution separately from automated DOM simulation.
Untestable items remain blocked; they cannot be promoted to a release pass.
