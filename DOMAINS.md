# WholeDonut Domains Management

## Overview
Centralized management system for all WholeDonut domains and subdomains.

- **Documented Domains:** 9
- **Total Subdomains:** Hundreds
- **Registrars:** Porkbun, GitHub Pages
- **Account:** wholedonuts

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
- **Status:** Pending GitHub Pages and DNS cutover
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
- [ ] CI/CD pipeline configured

## Next Steps
1. Map subdomain routing for the newly documented domains
2. Map all subdomain routing
3. Set up automated deployment
4. Configure monitoring and alerts
