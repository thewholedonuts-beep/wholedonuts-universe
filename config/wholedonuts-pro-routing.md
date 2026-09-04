# wholedonuts.pro routing

`https://wenevergonnaclose.com/pro/` is the canonical Whole Donuts Professional
workspace. `wholedonuts.pro` is only its proposed memorable invitation entrance.
It must first route to the canonical +U gateway at
`https://wenevergonnaclose.com/?u=professional`; the gateway then offers the
professional workspace as a deliberate onward path.

As of September 4, 2026, the apex and `www` use registrar forwarding but point
to the obsolete insecure destination
`http://wenevergonnaclose.com/#awd`. DNS records cannot perform a path redirect
by themselves.

## Required external configuration

1. In the registrar account for `wholedonuts.pro`, open the existing URL
   forwarding configuration for both the apex and `www`. Preserve any
   provider-required forwarding records.
2. Update the registrar's HTTPS URL-forwarding service, or another reviewed
   redirect service, for both the apex and `www`.
3. Use a permanent `301` redirect to
   `https://wenevergonnaclose.com/?u=professional`.
4. Disable frame or masking mode so the canonical destination remains visible.
5. Confirm the forwarding service provisions a valid TLS certificate.
6. Test HTTP and HTTPS, apex and `www`, on desktop and mobile.
7. Keep `wenevergonnaclose.com` as the only GitHub Pages custom domain and
   canonical URL.

The professional inquiry, any prior purchase, and any voluntary support payment
do not create partnership authorization. An authorized Whole Donuts reviewer
must separately verify organizational authority, rights, safety, and fit.

Do not point a second custom domain directly at the same GitHub Pages site:
GitHub Pages supports one configured custom domain for this repository, and a
second direct mapping would weaken canonical behavior.
