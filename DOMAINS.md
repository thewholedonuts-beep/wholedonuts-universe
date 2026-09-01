# WholeDonut Domains Management

## Overview
Centralized management system for all WholeDonut domains and subdomains.

- **Documented Domains:** 9
- **Total Subdomains:** Hundreds
- **Registrars:** Porkbun, GitHub Pages
- **Account:** wholedonuts

## Operating model

The complete 28-domain registry is private operational data. Keep it in an
access-controlled system and do not commit registrar credentials, DNS record
values, private IP addresses, or verification tokens here. This repository
documents only the public-safe inventory and the state definitions:

| State | Meaning |
|---|---|
| Live | A domain is serving its approved public destination. |
| Reserved | Held for a future approved use; no public destination is created. |
| Redirect | Deliberately forwards to an approved Live domain or route. |
| Parked | Intentionally has no active public experience. |

`wenevergonnaclose.com` is the permanent +U/Table entry that unifies the
ecosystem without replacing the distinct subject domains. It is live on the
Universe GitHub Pages site; the former Sunshine Pages repository was archived
after the controlled cutover. Do not create sites for the remaining reserved
domains or change their DNS as part of this project.

The `active` and `inactive` values in the legacy funnel configuration describe
funnel operations, not these registry states.

## Documented Domains

### wholedonuts.org
- **Status:** Active
- **Registrar:** Porkbun
- **Purpose:** Primary brand domain
- **Subdomains:** Multiple (funnel system)
- **DNS Provider:** Porkbun
- **Last Updated:** 2026-08-14

### wholedonuts.buzz
- **Status:** Active
- **Registrar:** Porkbun
- **Purpose:** Marketing & promotional funnel
- **Subdomains:** Multiple (funnel system)
- **DNS Provider:** Porkbun
- **Last Updated:** 2026-08-14

### wholedonuts.app
- **Status:** Inactive
- **Registrar:** Porkbun
- **Purpose:** Application domain
- **Subdomains:** Not assigned
- **DNS Provider:** Porkbun
- **Last Updated:** 2026-08-28

### wenevergonnaclose.com
- **Status:** Live on Universe GitHub Pages
- **Registrar:** Porkbun
- **Purpose:** Public +U entry at the repository root
- **Subdomains:** `www` as required by the GitHub Pages configuration
- **DNS Provider:** Porkbun
- **Repository configuration:** Root `CNAME` declares the domain; the active
  custom-domain association is managed in Universe **Settings -> Pages**.

### thenurturedchef.com
- **Status:** Inactive
- **Registrar:** Porkbun
- **Purpose:** Nurtured Chef brand domain
- **Subdomains:** Not assigned
- **DNS Provider:** Porkbun
- **Last Updated:** 2026-08-28

### thenurturedchef.foundation
- **Status:** Inactive
- **Registrar:** Porkbun
- **Purpose:** Nurtured Chef foundation domain
- **Subdomains:** Not assigned
- **DNS Provider:** Porkbun
- **Last Updated:** 2026-08-28

### thenutur3dchef.com
- **Status:** Active
- **Registrar:** Porkbun
- **Purpose:** Content & resource funnel
- **Subdomains:** Multiple (funnel system)
- **DNS Provider:** Porkbun
- **Last Updated:** 2026-08-14

### thewholedonuts-beep.github.io
- **Status:** Inactive
- **Registrar:** GitHub Pages
- **Purpose:** Owner GitHub Pages site
- **Subdomains:** Not assigned
- **DNS Provider:** GitHub Pages
- **Last Updated:** 2026-08-28

### thewholedonuts-beep.github.io/wholedonuts-universe
- **Status:** Universe GitHub Pages deployment endpoint
- **Registrar:** GitHub Pages
- **Purpose:** Repository Pages endpoint before the custom domain cutover
- **Subdomains:** Not assigned
- **DNS Provider:** GitHub Pages
- **Repository configuration:** Publication is managed by the manual GitHub
  Actions Pages workflow; the custom domain is the public canonical entry.

## Domain Registry

| Domain | TLD | Status | Registrar | Purpose | Subdomains |
|--------|-----|--------|-----------|---------|-----------|
| wholedonuts | .org | Active | Porkbun | Primary Brand | Multiple |
| wholedonuts | .buzz | Active | Porkbun | Marketing Funnel | Multiple |
| wholedonuts | .app | Inactive | Porkbun | Application Domain | None |
| wenevergonnaclose | .com | Live on Universe Pages | Porkbun | Public +U entry | `www` |
| thenurturedchef | .com | Inactive | Porkbun | Brand Domain | None |
| thenurturedchef | .foundation | Inactive | Porkbun | Foundation Domain | None |
| thenutur3dchef | .com | Active | Porkbun | Content Funnel | Multiple |
| thewholedonuts-beep | .github.io | Inactive | GitHub Pages | Owner Site | None |
| thewholedonuts-beep.github.io/wholedonuts-universe | N/A | Pages deployment endpoint | GitHub Pages | Repository Pages endpoint | None |

## Subdomain Structure

### wholedonuts.org Subdomains
| Subdomain | Purpose | Status |
|-----------|---------|--------|
| www | Main website | Active |
| api | API endpoints | Active |
| mail | Email routing | Configured |
| | | |

### wholedonuts.buzz Subdomains
| Subdomain | Purpose | Status |
|-----------|---------|--------|
| www | Marketing page | Active |
| | | |

### thenutur3dchef.com Subdomains
| Subdomain | Purpose | Status |
|-----------|---------|--------|
| www | Main content | Active |
| | | |

## Configuration Files
- See `domains/` directory for individual domain configurations
- See `subdomains/` directory for subdomain mappings
- See `dns/` directory for DNS records and routing

## Deployment Status
- [x] Documented domains catalogued
- [x] `wenevergonnaclose.com` declared in the repository root `CNAME`
- [x] GitHub Pages enabled through GitHub Actions
- [x] Custom domain attached to Universe Pages with HTTPS enabled
- [ ] All subdomains mapped
- [ ] DNS configurations synced
- [ ] Funnel system validated
- [x] Manual GitHub Pages deployment workflow used for the controlled cutover

## Completed Pages cutover record

Universe Pages was enabled and validated first without the custom domain. After
GitHub ownership verification, `wenevergonnaclose.com` was detached from
`wholedonuts-sunshine`, attached to Universe Pages, and deployed with the
source `CNAME` included. HTTPS and the apex/www canonical behavior were then
verified before Sunshine was re-archived. Future changes to this attachment or
DNS are separate reviewed production operations.

## Next Steps
1. Map subdomain routing for the newly documented domains
2. Map all subdomain routing
3. Set up automated deployment
4. Configure monitoring and alerts
