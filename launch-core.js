(function(root) {
  'use strict';
  function validateDonationUrl(value) {
    const text = String(value || '').trim();
    if (!text) return '';
    if (text !== 'https://cash.app/$wholedonuts') throw new Error('Only the owner-confirmed Cash App route https://cash.app/$wholedonuts is allowed. Chime uses $wholedonuts manually in the official app.');
    return text;
  }
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function assets(config, value) {
    const donationUrl = validateDonationUrl(value);
    const ecosystemUrl = config.ecosystemUrl;
    const launch = `Bring one piece. Join the +U movement from Whole Donuts LLC: ${ecosystemUrl}` + (donationUrl ? ` Voluntary support: ${donationUrl} · Chime: $wholedonuts (official app)` : '');
    const request = `Hello,\n\nI’m preparing for surgery and asking for voluntary support as I continue building Whole Donuts LLC and the +U movement. Any amount, a share, or a useful connection is appreciated.\n\nSupport via Cash App: ${donationUrl}\nOr open the official Chime app and enter $wholedonuts.\nExplore +U: ${ecosystemUrl}\n\nSupport is voluntary, is not a merchandise purchase, and is not represented as a charitable or tax-deductible donation. Thank you for being part of the whole.\n\nWhole Donuts LLC\nthewholedonuts@gmail.com`;
    const outreach = `Hello,\n\nI’m reaching out from Whole Donuts LLC to invite you to +U: a place for practical guides, creative exploration, and useful community connections.\n\nStart here: ${ecosystemUrl}\nExplore TNC: ${ecosystemUrl}#tnc\nExplore AWD: ${ecosystemUrl}#awd\nVoluntary support: ${donationUrl} · Chime: $wholedonuts (official app)\n\nWould you share the movement or connect us with someone who could contribute a skill, resource, or opportunity? Support is optional and separate from merchandise purchases; it is not represented as a charitable or tax-deductible donation.\n\nThank you,\nWhole Donuts LLC\nthewholedonuts@gmail.com`;
    return {donationUrl, ecosystemUrl, launch, request, outreach,
      x: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(launch),
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(ecosystemUrl),
      linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(ecosystemUrl),
      requestEmail: 'mailto:?subject=' + encodeURIComponent('A voluntary support request before surgery — Whole Donuts LLC') + '&body=' + encodeURIComponent(request),
      outreachEmail: 'mailto:?subject=' + encodeURIComponent('An invitation to +U — Whole Donuts LLC') + '&body=' + encodeURIComponent(outreach)};
  }
  function donorPage(config, value) {
    const a = assets(config, value);
    if (!a.donationUrl) throw new Error('Save your Cash App link first.');
    return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Support Whole Donuts LLC · +U</title><style>body{font:18px/1.6 system-ui;max-width:720px;margin:4rem auto;padding:1.5rem;background:#f5f0e6;color:#15130f}a{color:#245238}nav{display:flex;gap:1rem;flex-wrap:wrap}.support{display:inline-block;padding:1rem;background:#15130f;color:white;border-radius:.5rem}</style><main><nav><a href="${escape(a.ecosystemUrl)}">+U home</a><a href="${escape(a.ecosystemUrl)}#tnc">TNC</a><a href="${escape(a.ecosystemUrl)}#awd">AWD</a></nav><h1>Bring one piece.</h1><h2>Support Whole Donuts LLC</h2><p>Your voluntary support helps keep the +U movement growing. A share, skill, resource, or connection also matters.</p><p>Whole Donuts LLC is not a nonprofit. Support is optional, separate from store purchases, and not represented as a charitable or tax-deductible donation. No charitable tax receipt, investment return, or automatic reward is offered.</p><p>Review the recipient and terms on Cash App before paying. For Chime, open the official Chime app and enter $wholedonuts. No Chime payment link is generated. This page does not process or schedule payments.</p><a class="support" href="${escape(a.donationUrl)}" rel="noopener noreferrer" target="_blank">Review and support on Cash App ↗</a><p>${escape(a.donationUrl)}</p><p><a href="mailto:thewholedonuts@gmail.com">Contact Whole Donuts LLC</a></p></main></html>`;
  }
  const api = {validateDonationUrl, assets, donorPage};
  if (typeof module === 'object') module.exports = api; else root.WholeDonutsLaunch = api;
})(typeof window === 'object' ? window : globalThis);
