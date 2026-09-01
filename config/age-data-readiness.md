# Age and optional data readiness

This private operational document is not part of the Pages artifact. The public
landing gate uses only a current-browser, in-memory adult/youth mode. A youth
birth date is calculated locally and immediately cleared; it is not stored,
transmitted, verified, attached to a pass, or attached to a profile.

## Current public boundary

- Adult 18+ is a self-selection, not age verification.
- Youth 13-17 is a low-data path with no payment, store, account, member,
  ambassador, or optional email/save-journey solicitation.
- Under-13 visitors do not continue into member or account flows and receive
  only the local guardian-oriented stop state.
- Direct public resources retain their existing routes and do not collect age
  or identity information.

## Future adult-only optional email or saved journey gate

Do not add a field, endpoint, tracking event, QR identity link, or account
until a human-approved design provides all of the following:

1. Exact field definitions and a documented purpose for every field.
2. Age, consent, guardian, and jurisdiction policy reviewed for the intended
   audience.
3. A secure backend with least-privilege access control, encryption, audit
   controls, and incident handling.
4. Retention, deletion, access, correction, export, and withdrawal processes.
5. Separate consent from essential access, plus clear public disclosures.
6. A data-flow review confirming no payment, vendor, referral, pass, or
   analytics identifier is joined to the record.
7. Accessibility, abuse-prevention, and human release approval.

Until every item is approved, the ecosystem remains anonymous by default and
the client stores only the existing documented local exploration state.
