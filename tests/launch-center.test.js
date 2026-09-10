const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const core = require('../launch-core.js');
const config = require('../launch-config.js');
const root = path.join(__dirname, '..');

test('only the exact owner-confirmed Cash App recipient is accepted', () => {
  assert.equal(core.validateDonationUrl(config.donationUrl), 'https://cash.app/$wholedonuts');
  for (const bad of ['https://cash.app/$other', 'https://cash.app.evil.test/$wholedonuts', 'javascript:alert(1)', 'https://ko-fi.com/wholedonuts', 'https://buy.stripe.com/example', config.donationUrl+'?redirect=evil', 'https://chime.com/pay/wholedonuts']) assert.throws(() => core.validateDonationUrl(bad));
});
test('all outbound messages inherit the shared destination, manual Chime and ecosystem', () => {
  const a = core.assets(config, config.donationUrl);
  for (const message of [a.launch,a.request,a.outreach]) {
    assert.ok(message.includes(config.donationUrl)); assert.ok(message.includes(config.ecosystemUrl)); assert.ok(message.includes('Chime')); assert.ok(message.includes('$wholedonuts'));
  }
  assert.equal(new URL(a.x).searchParams.get('text'), a.launch);
  assert.ok(a.launch.length <= 280);
  assert.equal(new URL(a.facebook).searchParams.get('u'), config.ecosystemUrl);
  assert.equal(new URL(a.linkedin).searchParams.get('url'), config.ecosystemUrl);
  assert.equal(new URL(a.requestEmail).searchParams.get('body'),a.request);
  assert.equal(new URL(a.outreachEmail).searchParams.get('body'),a.outreach);
});
test('donor download is standalone, escaped, and contains only approved payment routes', () => {
  const html = core.donorPage(config,config.donationUrl);
  assert.ok(html.includes(config.donationUrl)); assert.match(html,/official Chime app/); assert.match(html,/#tnc/); assert.match(html,/#awd/);
  assert.doesNotMatch(html,/<script|ko-fi|stripe/i);
  assert.match(core.donorPage({...config,ecosystemUrl:'https://example.test/"<unsafe>'},config.donationUrl),/&quot;&lt;unsafe&gt;/);
  assert.throws(() => core.donorPage(config,''));
});
function browser(navigator = {}) {
  const html = fs.readFileSync(path.join(root,'launch.html'),'utf8');
  const elements = new Map(); const downloads = []; const blobs = [];
  function element(id) {return {id, value:'',disabled:true,dataset:{},handlers:{},attributes:{},addEventListener(type,fn){this.handlers[type]=fn;},setAttribute(k,v){this.attributes[k]=v;},removeAttribute(k){delete this.attributes[k];},replaceChildren(){this.innerHTML='';},focus(){this.focused=true;},select(){this.selected=true;},click(){downloads.push(this.download);},remove(){}};}
  for(const match of html.matchAll(/\bid="([^"]+)"/g)) elements.set(match[1],element(match[1]));
  const copies = [...html.matchAll(/data-copy="([^"]+)"/g)].map(match => {const el=element('copy');el.dataset.copy=match[1];return el;});
  const document = {getElementById:id=>elements.get(id),querySelectorAll:selector=>selector==='[data-copy]'?copies:[...copies,elements.get('native-share'),elements.get('download-donor')],createElement:()=>element('download'),body:{append(){}}};
  const window = {WholeDonutsLaunchConfig:config,WholeDonutsLaunch:core};
  const context = {window,document,navigator,Blob,URL:{createObjectURL(blob){blobs.push(blob);return 'blob:test';},revokeObjectURL(){}},setTimeout:fn=>fn()};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root,'vendor/qrcode.js'),'utf8'),context);
  vm.runInContext(fs.readFileSync(path.join(root,'launch.js'),'utf8'),context);
  return {elements,downloads,blobs,copies,click:id=>elements.get(id).handlers.click()};
}
test('initial render wires all ten steps, message fields, QR and actual downloads', async () => {
  const b=browser();
  assert.equal(b.elements.get('support-link').value,config.donationUrl);
  assert.match(b.elements.get('support-qr').innerHTML,/<svg/);
  for(const id of ['launch-x','launch-facebook','launch-linkedin','request-email','outreach-email']) assert.ok(b.elements.get(id).href);
  b.click('verify-link'); assert.match(b.elements.get('status').textContent,/Verified/);
  b.click('download-donor'); b.click('download-qr');
  assert.deepEqual(b.downloads,['whole-donuts-donor.html','whole-donuts-support-qr.svg']);
  assert.ok((await b.blobs[0].text()).includes(config.donationUrl)); assert.match(await b.blobs[1].text(),/<svg/);
});
test('native share succeeds without claiming a public post', async () => {
  let shared; const b=browser({share:async data=>{shared=data;}});
  await b.click('native-share'); assert.ok(shared.text.includes(config.donationUrl)); assert.match(b.elements.get('status').textContent,/Delivery depends/);
});
test('unsupported and failed sharing copy the message; cancellation does not copy', async () => {
  for(const navigator of [{},{share:async()=>{throw new Error('unsupported');}}]) {
    let copied; navigator.clipboard={writeText:async value=>{copied=value;}};
    const b=browser(navigator); await b.click('native-share'); assert.ok(copied.includes(config.donationUrl));
  }
  let copied=false;const b=browser({share:async()=>{throw Object.assign(new Error(),{name:'AbortError'});},clipboard:{writeText:async()=>{copied=true;}}});
  await b.click('native-share'); assert.equal(copied,false);assert.match(b.elements.get('status').textContent,/canceled/);
});
test('clipboard denial offers selectable manual text and Chime copy never pays', async () => {
  const b=browser(); await b.click('native-share'); assert.equal(b.elements.get('launch-copy').selected,true);
  let value;const c=browser({clipboard:{writeText:async text=>{value=text;}}});await c.click('copy-chime');assert.equal(value,'$wholedonuts');
});
test('every local launch asset exists and is staged by Pages, with no forbidden providers in shipped code', () => {
  const html=fs.readFileSync(path.join(root,'launch.html'),'utf8');const workflow=fs.readFileSync(path.join(root,'.github/workflows/deploy-pages.yml'),'utf8');
  assert.equal((html.match(/<li>/g)||[]).length,10);
  for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    if(/^[a-z]+:/i.test(match[1])) continue;
    const file=match[1].split('#')[0];assert.ok(fs.existsSync(path.join(root,file)),file);
  }
  for(const file of ['launch.html','launch.css','launch.js','launch-core.js','launch-config.js','vendor/qrcode.js']) {
    assert.ok(workflow.includes(file));assert.doesNotMatch(fs.readFileSync(path.join(root,file),'utf8'),/ko-fi|stripe/i);
  }
  const app=fs.readFileSync(path.join(root,'app.js'),'utf8');assert.match(app,/WholeDonutsLaunchConfig.donationUrl/);assert.match(app,/activeCampaign.sensitive/);
});
