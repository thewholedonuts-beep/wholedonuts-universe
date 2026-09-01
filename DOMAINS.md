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
ecosystem without replacing the distinct subject domains. It remains a staged
Universe cutover while its current live attachment is hosted by the legacy
`wholedonuts-sunshine` GitHub Pages site. Do not create sites for the remaining
reserved domains or change their DNS as part of this project.

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
- **Status:** Live on legacy Pages; Universe cutover pending
- **Registrar:** Porkbun
- **Purpose:** Public +U entry at the repository root
- **Subdomains:** `www` as required by the GitHub Pages configuration
- **DNS Provider:** Porkbun (to be configured for GitHub Pages)
- **Repository configuration:** Root `CNAME` declares this domain; it does not
  confirm that Pages or DNS is enabled.

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
- **Status:** Pending GitHub Pages configuration
- **Registrar:** GitHub Pages
- **Purpose:** Repository Pages endpoint before the custom domain cutover
- **Subdomains:** Not assigned
- **DNS Provider:** GitHub Pages
- **Repository configuration:** Enable publication from `main` at the
  repository root in GitHub Settings before treating this endpoint as live.

## Domain Registry

| Domain | TLD | Status | Registrar | Purpose | Subdomains |
|--------|-----|--------|-----------|---------|-----------|
| wholedonuts | .org | Active | Porkbun | Primary Brand | Multiple |
| wholedonuts | .buzz | Active | Porkbun | Marketing Funnel | Multiple |
| wholedonuts | .app | Inactive | Porkbun | Application Domain | None |
| wenevergonnaclose | .com | Pending Pages/DNS cutover | Porkbun | Public +U entry | `www` pending configuration |
| thenurturedchef | .com | Inactive | Porkbun | Brand Domain | None |
| thenurturedchef | .foundation | Inactive | Porkbun | Foundation Domain | None |
| thenutur3dchef | .com | Active | Porkbun | Content Funnel | Multiple |
| thewholedonuts-beep | .github.io | Inactive | GitHub Pages | Owner Site | None |
| thewholedonuts-beep.github.io/wholedonuts-universe | N/A | Pending Pages configuration | GitHub Pages | Repository Pages endpoint | None |

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
- [ ] GitHub Pages enabled for the `main` branch repository root
- [ ] Custom domain verified in GitHub Pages and DNS
- [ ] All subdomains mapped
- [ ] DNS configurations synced
- [ ] Funnel system validated
- [x] Manual GitHub Pages deployment workflow committed (not run)

## Safe Pages cutover

1. Set Universe Pages to use GitHub Actions and run the manual Pages workflow.
2. Validate the generated Universe Pages URL and its public static artifact.
3. Add or confirm the GitHub-provided TXT verification record for the custom domain.
4. Detach the domain from `wholedonuts-sunshine` and immediately attach it to Universe.
5. Verify HTTPS and the canonical custom-domain redirect, then retire the legacy Pages deployment.

## Next Steps
1. Map subdomain routing for the newly documented domains
2. Map all subdomain routing
3. Set up automated deployment
4. Configure monitoring and alerts
