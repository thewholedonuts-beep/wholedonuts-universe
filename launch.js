(function() {
  'use strict';
  const config = window.WholeDonutsLaunchConfig;
  const core = window.WholeDonutsLaunch;
  const byId = id => document.getElementById(id);
  const status = message => { byId('status').textContent = message; };
  const value = core.validateDonationUrl(config.donationUrl);
  let qrSvg = '';
  function download(name, text, type) {
    const url = URL.createObjectURL(new Blob([text], {type}));
    const a = document.createElement('a'); a.href = url; a.download = name;
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function copy(text, field) {
    try { await navigator.clipboard.writeText(text); status('Copied. Paste into your chosen app; nothing has been sent.'); return true; }
    catch (_) {
      if (field) { field.focus(); field.select(); }
      status(field ? 'Clipboard access is unavailable. Select and copy the text manually.' : 'Clipboard access is unavailable. Enter $wholedonuts manually in the official Chime app.'); return false;
    }
  }
  function render() {
    const a = core.assets(config, value);
    byId('donation-url').value = value;
    for (const [id, url] of Object.entries({'launch-x':a.x,'launch-facebook':a.facebook,'launch-linkedin':a.linkedin,'request-email':a.requestEmail,'outreach-email':a.outreachEmail})) {
      const link = byId(id); link.setAttribute('aria-disabled', String(!value));
      if (value) link.href = url; else link.removeAttribute('href');
      if (id.startsWith('launch-')) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    }
    byId('request-copy').value = value ? a.request : '';
    byId('outreach-copy').value = value ? a.outreach : '';
    byId('launch-copy').value = value ? a.launch : '';
    byId('support-link').value = value;
    document.querySelectorAll('[data-copy],#native-share,#download-donor').forEach(el => {el.disabled = !value;});
    byId('support-qr').replaceChildren(); qrSvg = '';
    if (value && typeof qrcode === 'function') {
      const qr = qrcode(0, 'M'); qr.addData(value); qr.make(); qrSvg = qr.createSvgTag({cellSize:5,margin:20,scalable:true});
      // SVG comes only from the bundled generator with the exact owner-confirmed Cash App URL.
      byId('support-qr').innerHTML = qrSvg;
    }
    byId('download-qr').disabled = !qrSvg;
    status('All ten launch steps are ready. Cash App and Chime only. No message has been posted or sent.');
  }
  byId('verify-link').addEventListener('click', () => {
    core.validateDonationUrl(config.donationUrl);
    status('Verified: the shared destination is https://cash.app/$wholedonuts. Chime uses $wholedonuts in the official app.');
  });
  byId('copy-chime').addEventListener('click', () => copy(config.chimeSign));

  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', () => {
    const field = byId(button.dataset.copy); copy(field.value, field);
  }));
  byId('native-share').addEventListener('click', async () => {
    const a = core.assets(config, value);
    if (navigator.share) {
      try {await navigator.share({title:'Whole Donuts LLC · +U',text:a.launch,url:a.ecosystemUrl}); status('Share sheet completed. Delivery depends on the app you selected.'); return;}
      catch (error) {if (error.name === 'AbortError') {status('Sharing canceled. Nothing was marked as sent.'); return;}}
    }
    await copy(a.launch, byId('launch-copy'));
  });
  byId('download-donor').addEventListener('click', () => {download('whole-donuts-donor.html',core.donorPage(config,value),'text/html'); status('Donor page download requested. It contains the saved link as a snapshot.');});
  byId('download-qr').addEventListener('click', () => download('whole-donuts-support-qr.svg',qrSvg,'image/svg+xml'));
  render();
})();
