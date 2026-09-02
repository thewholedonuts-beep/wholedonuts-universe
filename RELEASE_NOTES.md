# Whole Donuts Universe release notes

Use this format for each meaningful public update. Keep the first visit simple:
publish only what is available, link to the relevant guide, and leave every
suggestion optional.

## Unreleased

### Whole Donuts entry

**What changed:** The public entry is now a progressive four-tap +U gateway:
choose a broad Youth or Adult side, a face-only feeling, a bounded need, and
an available on-site destination. It presents 14 original visual-only
stick-figure companions per side and routes directly to The Table, The Counter,
or the +U Library.

**Why it matters:** Visitors get a personal-feeling, legible starting point
without an account, demographic profile, rewards system, persistent choices,
or an unverified external destination.

**Optional next choices:** Open a guide, explore the World, visit a community
path, or return later. No action is required.

### Pages delivery

**What changed:** The Pages workflow deploys the reviewed static bundle only
after a maintainer manually dispatches it, retaining
`wenevergonnaclose.com` in the deployed `CNAME`.

**Why it matters:** The public site has one deployable source of truth.

**Optional next choices:** A maintainer can dispatch and review the workflow
run after a human-reviewed merge. Visitors do not need to do anything.

### Operations reliability

**What changed:** Funnel creation now validates a parsed domain before use, and
network activation or deactivation logs an individual funnel failure while
continuing the remaining funnels.

**Why it matters:** A malformed domain cannot cause a runtime index failure,
and one unavailable funnel does not stop the rest of a network operation.

**Optional next choices:** Operators can correct the reported funnel and rerun
the intended operation.
