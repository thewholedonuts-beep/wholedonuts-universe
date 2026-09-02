const links=[...document.querySelectorAll('[data-branch]')];
const store=document.querySelector('#branch-store');
const navigationStatus=document.querySelector('#table-navigation-status');
const launchWindowStatus=document.querySelector('#launch-window-status');
const launchWindowReset=document.querySelector('#reset-launch-window');
const launchWindowKey='plusu-launch-window';
const launchWindowLimit=1000;
const launchWindowDuration=12*60*60*1000;
const stores={
  awd:['Explore Whole Donuts','#awd'],
  tnc:['Explore The Nurtured Chef','#tnc']
};
const memoryStore=new Map();
const journeyOfferTitle=document.querySelector('#journey-offers-title');
const journeyOfferCopy=document.querySelector('#journey-offers-copy');
const virtualStoreTitle=document.querySelector('#virtual-store-title');
const virtualStoreCopy=document.querySelector('#virtual-store-copy');
const featuredProductTitle=document.querySelector('#featured-product-title');
const featuredProductCopy=document.querySelector('#featured-product-copy');
const templateLibraryCopy=document.querySelector('#template-library-copy');
const storefrontStatus=document.querySelector('#storefront-status');
const storefrontActions=document.querySelector('#storefront-actions');
const storefrontConfig=window.WHNUTZ_STOREFRONT_CONFIG||{};
const dashboard=document.querySelector('#plusu-dashboard');
const dashboardProgress=document.querySelector('#dashboard-progress');
const dashboardUnlocks=document.querySelector('#dashboard-unlocks');
const dashboardReset=document.querySelector('#reset-dashboard');
const dashboardAccessories=[...document.querySelectorAll('[data-accessory]')];
const dashboardKey='plusu-dashboard-progress';
const dashboardAccessoryNames={
  scarf:'Welcome scarf',
  notebook:'Course notebook',
  pin:'Community pin',
  compass:'Protocol compass',
  ribbon:'Invitation ribbon'
};

function validStorefrontUrl(value){
  if(typeof value!=='string'||!value.trim())return null;
  try{
    const url=new URL(value.trim());
    return url.protocol==='https:'&&url.hostname&&!url.username&&!url.password?url.href:null;
  }catch(e){return null}
}

function renderStorefrontHandoff(){
  if(!storefrontStatus||!storefrontActions)return;
  const storefrontUrl=validStorefrontUrl(storefrontConfig.storefrontUrl);
  if(!storefrontUrl)return;
  storefrontStatus.textContent='The Made by +U, 4 ALL shop is open in our separate storefront. Products, shipping, taxes, refunds, and checkout are handled there. Voluntary Cash App support remains separate and does not purchase merchandise.';
  const storefrontCta=document.createElement('a');
  storefrontCta.className='button primary';
  storefrontCta.href=storefrontUrl;
  storefrontCta.target='_blank';
  storefrontCta.rel='noopener noreferrer';
  storefrontCta.textContent='Shop Made by +U, 4 ALL ↗';
  storefrontActions.append(storefrontCta);
}
renderStorefrontHandoff();

function dashboardState(){
  const saved=safeGet(dashboardKey);
  if(!saved)return [];
  try{
    const parsed=JSON.parse(saved);
    if(!parsed||parsed.v!==1||!Array.isArray(parsed.unlocks))return [];
    return parsed.unlocks.filter(accessory=>Object.prototype.hasOwnProperty.call(dashboardAccessoryNames,accessory));
  }catch(e){return []}
}

function saveDashboardState(unlocks){
  safeSet(dashboardKey,JSON.stringify({v:1,unlocks}));
}

function renderDashboard(){
  const unlocks=dashboardState();
  if(dashboard)dashboard.hidden=false;
  dashboardAccessories.forEach(accessory=>accessory.hidden=!unlocks.includes(accessory.dataset.accessory));
  if(dashboardProgress)dashboardProgress.textContent=unlocks.length+' of '+Object.keys(dashboardAccessoryNames).length+' optional accessories shown through voluntary exploration.';
  if(dashboardUnlocks){
    dashboardUnlocks.replaceChildren();
    unlocks.forEach(accessory=>{
      const item=document.createElement('li');
      item.textContent=dashboardAccessoryNames[accessory];
      dashboardUnlocks.append(item);
    });
  }
}

function unlockDashboardAccessory(accessory){
  if(!dashboard||dashboard.hidden||!Object.prototype.hasOwnProperty.call(dashboardAccessoryNames,accessory))return;
  const unlocks=dashboardState();
  if(!unlocks.includes(accessory)){
    unlocks.push(accessory);
    saveDashboardState(unlocks);
  }
  renderDashboard();
}

function beginDashboard(){
  if(!dashboard)return;
  if(!dashboardState().includes('scarf'))saveDashboardState(['scarf']);
  renderDashboard();
}

function resetDashboard(){
  safeRemove(dashboardKey);
  safeRemove('plusu-welcome');
  if(dashboard)dashboard.hidden=true;
}

if(dashboardReset)dashboardReset.addEventListener('click',()=>{
  resetDashboard();
  resetWelcome();
});
document.querySelectorAll('[data-dashboard-effort]').forEach(element=>element.addEventListener('click',()=>unlockDashboardAccessory(element.dataset.dashboardEffort)));

const donationPurposeInputs=[...document.querySelectorAll('input[name="donation-purpose"]')];
const donationDisclosure=document.querySelector('#donation-disclosure');
const donationConfirmation=document.querySelector('#donation-confirmation');
const revealDonationLink=document.querySelector('#reveal-donation-link');
const donationExit=document.querySelector('#donation-exit');
const donationExitCopy=document.querySelector('#donation-exit-copy');
const donationProcessorLink=document.querySelector('#donation-processor-link');
const donationStatus=document.querySelector('#donation-status');
const donationProcessorUrl='https://cash.app/$wholedonuts';
const chimeSign='$wholedonuts';
const copyChimeSignButton=document.querySelector('#copy-chime-sign');
const chimeCopyStatus=document.querySelector('#chime-copy-status');
const shareInvitationButton=document.querySelector('#share-invitation');
const copyInvitationButton=document.querySelector('#copy-invitation');
const shareInvitationStatus=document.querySelector('#share-invitation-status');
const invitationUrl='https://wenevergonnaclose.com/';

function selectedDonationPurpose(){
  const selected=donationPurposeInputs.find(input=>input.checked);
  return selected?selected.value:null;
}

function resetDonationExit(){
  if(donationExit)donationExit.hidden=true;
  if(donationProcessorLink)donationProcessorLink.removeAttribute('href');
  if(copyChimeSignButton)copyChimeSignButton.disabled=true;
  if(chimeCopyStatus)chimeCopyStatus.textContent='';
}

function syncDonationHub(){
  const purpose=selectedDonationPurpose();
  if(donationDisclosure)donationDisclosure.hidden=!purpose;
  if(donationConfirmation)donationConfirmation.checked=false;
  if(revealDonationLink)revealDonationLink.disabled=true;
  resetDonationExit();
  if(donationStatus)donationStatus.textContent=purpose
    ?'You selected '+purpose+'. Review the payee and affirm the final action to reveal the optional payment link.'
    :'Choose a purpose to review the optional payment details.';
}

donationPurposeInputs.forEach(input=>input.addEventListener('change',syncDonationHub));
if(donationConfirmation)donationConfirmation.addEventListener('change',()=>{
  if(revealDonationLink)revealDonationLink.disabled=!donationConfirmation.checked||!selectedDonationPurpose();
  resetDonationExit();
});
if(revealDonationLink)revealDonationLink.addEventListener('click',()=>{
  const purpose=selectedDonationPurpose();
  if(!purpose||!donationConfirmation||!donationConfirmation.checked){
    if(donationStatus)donationStatus.textContent='Choose a purpose and affirm the final action before continuing.';
    return;
  }
  if(donationProcessorLink)donationProcessorLink.href=donationProcessorUrl;
  if(donationExit)donationExit.hidden=false;
  if(copyChimeSignButton)copyChimeSignButton.disabled=false;
  if(donationExitCopy)donationExitCopy.textContent='You selected '+purpose+'. Cash App and Chime to $wholedonuts are optional manual choices shown before you leave this site.';
  if(donationStatus)donationStatus.textContent='The optional manual choices are ready. Nothing has been paid, transferred, or scheduled.';
  if(donationProcessorLink)donationProcessorLink.focus();
});

if(copyChimeSignButton)copyChimeSignButton.addEventListener('click',async()=>{
  if(copyChimeSignButton.disabled)return;
  if(!navigator.clipboard||!navigator.clipboard.writeText){
    if(chimeCopyStatus)chimeCopyStatus.textContent='Copy is unavailable in this browser. Enter $wholedonuts manually in the official Chime app. Copying does not initiate a payment or transfer.';
    return;
  }
  try{
    await navigator.clipboard.writeText(chimeSign);
    if(chimeCopyStatus)chimeCopyStatus.textContent='$wholedonuts copied for manual entry in the official Chime app. Copying does not initiate a payment or transfer.';
  }catch(e){
    if(chimeCopyStatus)chimeCopyStatus.textContent='The ChimeSign could not be copied. Enter $wholedonuts manually in the official Chime app. Copying does not initiate a payment or transfer.';
  }
});

function setShareInvitationStatus(message){
  if(shareInvitationStatus)shareInvitationStatus.textContent=message;
}

async function copyInvitation(){
  if(!navigator.clipboard||!navigator.clipboard.writeText){
    setShareInvitationStatus('Copy is unavailable in this browser. You can share https://wenevergonnaclose.com/ directly.');
    return;
  }
  try{
    await navigator.clipboard.writeText(invitationUrl);
    setShareInvitationStatus('Invitation link copied. It contains no personal or referral information.');
  }catch(e){
    setShareInvitationStatus('The invitation link could not be copied. You can share https://wenevergonnaclose.com/ directly.');
  }
}

if(copyInvitationButton)copyInvitationButton.addEventListener('click',()=>{
  unlockDashboardAccessory('ribbon');
  copyInvitation();
});
if(shareInvitationButton)shareInvitationButton.addEventListener('click',async()=>{
  unlockDashboardAccessory('ribbon');
  if(!navigator.share){
    setShareInvitationStatus('Native sharing is unavailable in this browser. Use Copy invitation link instead.');
    return;
  }
  try{
    await navigator.share({
      title:'+U Movement',
      text:'Every crumb becomes part of the whole. Join the +U table.',
      url:invitationUrl
    });
    setShareInvitationStatus('Invitation shared. No recipient, referral, reward, or payment record was created.');
  }catch(e){
    setShareInvitationStatus('Sharing was closed. No invitation, payment, referral, or reward record was created.');
  }
});

function safeGet(key){
  try{return localStorage.getItem(key)}catch(e){return memoryStore.has(key)?memoryStore.get(key):null}
}
function safeSet(key,value){
  try{localStorage.setItem(key,value)}catch(e){memoryStore.set(key,String(value))}
}
function safeRemove(key){
  try{localStorage.removeItem(key)}catch(e){memoryStore.delete(key)}
}

function launchWindowState(){
  const saved=safeGet(launchWindowKey);
  if(!saved)return null;
  try{
    const state=JSON.parse(saved);
    const startedAt=Date.parse(state.startedAt);
    if(!state||state.v!==1||!Number.isFinite(startedAt)||!Number.isInteger(state.count)||state.count<0||state.count>launchWindowLimit)return null;
    return state;
  }catch(e){return null}
}

function localMidnightAfter(startedAt){
  const midnight=new Date(startedAt);
  midnight.setHours(24,0,0,0);
  return midnight.getTime();
}

function renderLaunchWindow(state=launchWindowState()){
  if(!launchWindowStatus)return;
  if(!state){
    launchWindowStatus.textContent='No local Launch Window is active until you choose an eligible exploration step.';
    return;
  }
  launchWindowStatus.textContent=state.count+' of '+launchWindowLimit+' completed local exploration steps in this browser. This local window resets at the earliest of 12 hours, local midnight, or the next eligible step after '+launchWindowLimit+'.';
}

function resetLaunchPresentation(message){
  safeRemove(launchWindowKey);
  resetWelcome();
  donationPurposeInputs.forEach(input=>input.checked=false);
  syncDonationHub();
  history.replaceState(null,'','#home');
  focusRouteTarget('home');
  if(navigationStatus)navigationStatus.textContent=message;
  renderLaunchWindow();
}

function prepareLaunchInteraction(){
  const now=Date.now();
  let state=launchWindowState();
  if(state&&(now-Date.parse(state.startedAt)>=launchWindowDuration||now>=localMidnightAfter(Date.parse(state.startedAt))||state.count>=launchWindowLimit)){
    resetLaunchPresentation('Fresh Launch reset locally. Start the anonymous welcome again; your device-local +U pass was kept.');
    return false;
  }
  if(!state){
    state={v:1,startedAt:new Date(now).toISOString(),count:0};
    safeSet(launchWindowKey,JSON.stringify(state));
    renderLaunchWindow(state);
  }
  return true;
}

function completeLaunchInteraction(){
  const state=launchWindowState();
  if(!state)return;
  state.count+=1;
  safeSet(launchWindowKey,JSON.stringify(state));
  renderLaunchWindow(state);
}

function isLaunchEligibleRoute(id){
  return ['awd','tnc','donuts-new-school','welcome-gate','plusu-dashboard','template-library','crumb-workshop','ambassador-path','community-counter'].includes(id);
}
function isYouthRestrictedRoute(id){
  return ['awd','tnc','ambassador-path','donation-access-hub','plusu-dashboard'].includes(id);
}

if(launchWindowReset)launchWindowReset.addEventListener('click',()=>{
  resetLaunchPresentation('Fresh Launch reset locally. Start the anonymous welcome again; your device-local +U pass was kept.');
});

function focusRouteTarget(id){
  const target=document.getElementById(id);
  if(!target)return;
  target.tabIndex=-1;
  target.scrollIntoView({behavior:'smooth',block:'start'});
  target.focus({preventScroll:true});
}

function syncBranch({focus=false}={}){
  let id=location.hash.slice(1);
  if((ageMode==='youth'||ageMode==='under13')&&isYouthRestrictedRoute(id)){
    id='table';
    history.replaceState(null,'','#table');
    if(navigationStatus)navigationStatus.textContent='This youth path stays with the low-data community table.';
  }
  if(id&&id!=='home'&&id!=='age-gate')document.body.classList.add('entered');
  if(focus&&isLaunchEligibleRoute(id)&&!prepareLaunchInteraction())return;
  links.forEach(a=>a.classList.toggle('active',a.dataset.branch===id));
  if(store){store.textContent='Return to the +U gateway';store.href='#home'}
  if((id==='donation-access-hub'||id==='donuts-new-school')&&counter){
    counter.hidden=false;
    if(id==='donation-access-hub')openCourse('bombs');
  }
  if(stores[id])unlockDashboardAccessory('pin');
  if(focus&&id){
    focusRouteTarget(id);
    if(navigationStatus)navigationStatus.textContent=stores[id]
      ?'Opened the '+stores[id][0]+' section.'
      :id==='donuts-new-school'
        ?'Opened Donuts New School: Visionaries & Pioneers.'
      :'Opened the requested table section.';
    if(isLaunchEligibleRoute(id))completeLaunchInteraction();
  }
}

function openGatewayRoute(id,message){
  if(isLaunchEligibleRoute(id)&&!prepareLaunchInteraction())return;
  if(location.hash.slice(1)===id){
    focusRouteTarget(id);
    if(navigationStatus)navigationStatus.textContent=message;
    completeLaunchInteraction();
    return;
  }
  location.hash=id;
  if(navigationStatus)navigationStatus.textContent=message;
}

const menuButtons=[...document.querySelectorAll('[data-menu]')];
const menuPanels=[...document.querySelectorAll('[data-course]')];
function openCourse(id,{focus=false,recordEffort=false}={}){
  menuButtons.forEach(button=>{
    const active=button.dataset.menu===id;
    button.classList.toggle('active',active);
    button.setAttribute('aria-selected',String(active));
    button.tabIndex=active?0:-1;
    if(active&&focus)button.focus();
  });
  menuPanels.forEach(panel=>panel.hidden=panel.dataset.course!==id);
  if(recordEffort)unlockDashboardAccessory('notebook');
}
menuButtons.forEach(button=>button.addEventListener('click',()=>{
  if(!prepareLaunchInteraction())return;
  openCourse(button.dataset.menu,{recordEffort:true});
  completeLaunchInteraction();
}));
menuButtons.forEach((button,index)=>button.addEventListener('keydown',event=>{
  const {key}=event;
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(key))return;
  event.preventDefault();
  if(!prepareLaunchInteraction())return;
  let nextIndex=index;
  if(key==='Home')nextIndex=0;
  else if(key==='End')nextIndex=menuButtons.length-1;
  else if(key==='ArrowLeft')nextIndex=(index-1+menuButtons.length)%menuButtons.length;
  else nextIndex=(index+1)%menuButtons.length;
  openCourse(menuButtons[nextIndex].dataset.menu,{focus:true,recordEffort:true});
  completeLaunchInteraction();
}));

const dateLabel=document.querySelector('#daily-date');
if(dateLabel)dateLabel.textContent=new Intl.DateTimeFormat(undefined,{weekday:'long',month:'long',day:'numeric'}).format(new Date());

const gate=document.querySelector('#welcome-gate');
const counter=document.querySelector('#community-counter');
const steps=[...document.querySelectorAll('[data-question]')];
const welcomeResult=document.querySelector('#welcome-result');
const outcomePrimary=document.querySelector('#outcome-primary');
const outcomeNext=document.querySelector('#outcome-next');
const ageResultConfirmation=document.querySelector('#age-result-confirmation');
const ageResultStatus=document.querySelector('#age-result-status');
const continueToOutcome=document.querySelector('#continue-to-outcome');
const ageGate=document.querySelector('#age-gate');
const ageGateStatus=document.querySelector('#age-gate-status');
const ageEligibility=document.querySelector('#age-eligibility');
const youthAgeForm=document.querySelector('#age-eligibility-form');
const youthBirthDate=document.querySelector('#youth-birth-date');
const under13Notice=document.querySelector('#under-13-notice');
const youthPathNote=document.querySelector('#youth-path-note');
const positivePath=document.querySelector('#positive-path');
const beginPositivePath=document.querySelector('#begin-positive-path');
const welcomeAnswers={};
let ageMode=null;

const counterCourses={
  learn:'bites',
  share:'bites',
  help:'biggies',
  explore:'bits'
};
const tableOutcomes={
  learn:{
    href:'#template-library',
    action:'Open the +U Library',
    detail:'Begin with the existing next-step template and guide.'
  },
  share:{
    href:'#crumb-workshop',
    action:'Open the reviewed Crumb Saver path',
    detail:'Begin with the protocol, contribution template, and public contact guidance. This static site does not submit a crumb.'
  },
  help:{
    href:'#ambassador-path',
    action:'Open the Ambassador Path',
    detail:'Begin with the existing community, skill, and project guidance without a promise of enrollment or benefit.'
  },
  explore:{
    href:'world/',
    action:'Open the Figure Studio',
    detail:'Begin with the existing +U world and return to the table when ready.'
  }
};
const youthTableOutcomes={
  learn:tableOutcomes.learn,
  share:{
    href:'#template-library',
    action:'Open the +U Library',
    detail:'Begin with the existing share-a-crumb template. This youth path does not collect a submission.'
  },
  help:{
    href:'#community-counter',
    action:'Open the Community Counter',
    detail:'Begin with the existing guided community learning menu without a payment or member path.'
  },
  explore:tableOutcomes.explore
};
const branchNext={
  awd:{href:'#awd',label:'Next: open Whole Donuts'},
  tnc:{href:'#tnc',label:'Next: open The Nurtured Chef'},
  table:{href:'#donuts-new-school',label:'Next: open Donuts New School'}
};

function showAgeGate(message=''){
  ageMode=null;
  document.body.classList.remove('adult-mode','youth-mode','entered');
  if(ageGate)ageGate.hidden=false;
  if(gate)gate.hidden=true;
  steps.forEach(step=>step.hidden=true);
  if(positivePath)positivePath.hidden=true;
  if(ageEligibility)ageEligibility.hidden=true;
  if(youthAgeForm)youthAgeForm.hidden=false;
  if(under13Notice)under13Notice.hidden=true;
  if(youthBirthDate)youthBirthDate.value='';
  if(youthPathNote)youthPathNote.hidden=true;
  if(ageGateStatus)ageGateStatus.textContent=message;
}
function beginWelcome(){
  if(ageGate)ageGate.hidden=true;
  if(gate)gate.hidden=false;
  if(youthPathNote)youthPathNote.hidden=true;
  showQuestion(1);
  focusQuestion(1);
}
function showAgeEligibility(){
  if(gate)gate.hidden=true;
  if(ageEligibility)ageEligibility.hidden=false;
  if(under13Notice)under13Notice.hidden=true;
  if(youthBirthDate)youthBirthDate.value='';
  if(ageGateStatus)ageGateStatus.textContent='';
  if(youthBirthDate)youthBirthDate.focus();
}
function ageFromDate(value){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return null;
  const [year,month,day]=value.split('-').map(Number);
  const date=new Date(year,month-1,day);
  if(date.getFullYear()!==year||date.getMonth()!==month-1||date.getDate()!==day)return null;
  const today=new Date();
  let age=today.getFullYear()-year;
  if(today.getMonth()<month-1||(today.getMonth()===month-1&&today.getDate()<day))age-=1;
  return age>=0?age:null;
}
document.querySelectorAll('[data-entry-choice]').forEach(button=>button.addEventListener('click',()=>{
  welcomeAnswers.intent=button.dataset.entryChoice;
  if(ageGate)ageGate.hidden=true;
  if(gate)gate.hidden=false;
  showQuestion(2);
  focusQuestion(2);
}));
if(youthAgeForm)youthAgeForm.addEventListener('submit',event=>{
  event.preventDefault();
  const age=ageFromDate(youthBirthDate?youthBirthDate.value:'');
  if(youthBirthDate){
    youthBirthDate.value='';
    youthBirthDate.blur();
  }
  if(age===null){
    if(ageGateStatus)ageGateStatus.textContent='Enter a valid birth date to calculate eligibility. It was not kept.';
    return;
  }
  if(age<13){
    ageMode='under13';
    youthAgeForm.hidden=true;
    if(under13Notice)under13Notice.hidden=false;
    if(ageGateStatus)ageGateStatus.textContent='The birth date was used only for this local calculation and was cleared.';
    return;
  }
  ageMode=age>17?'adult':'youth';
  document.body.classList.toggle('adult-mode',ageMode==='adult');
  document.body.classList.toggle('youth-mode',ageMode==='youth');
  if(ageEligibility)ageEligibility.hidden=true;
  if(youthPathNote)youthPathNote.hidden=ageMode!=='youth';
  finishWelcome({ageConfirmed:true});
});
const restartAgeGate=document.querySelector('#restart-age-gate');
if(restartAgeGate)restartAgeGate.addEventListener('click',()=>showAgeGate());

function showQuestion(number){
  steps.forEach(step=>step.hidden=Number(step.dataset.question)!==number);
  const progress=document.querySelector('#welcome-progress');
  if(progress)progress.textContent=number<=4?'Touch '+number+' of 4':'Your positive path is ready';
}
function focusQuestion(number){
  const step=steps.find(item=>Number(item.dataset.question)===number);
  const button=step&&step.querySelector('button');
  if(button)button.focus();
}
function finishWelcome({scroll=true,ageConfirmed=false}={}){
  const branch=welcomeAnswers.branch;
  const intent=welcomeAnswers.intent||'explore';
  const entry=welcomeAnswers.entry||'counter';
  const youth=ageMode==='youth';
  const course=counterCourses[intent]||'bits';
  const outcome=entry==='counter'
    ?{
      href:'#community-counter',
      action:'Open the guided Counter',
      detail:'Begin the existing '+course.toUpperCase()+' menu course for '+intent+'.'
    }
    :(youth?youthTableOutcomes:tableOutcomes)[intent];
  openCourse(course);
  if(youth)safeRemove('plusu-welcome');else saveJourney();
  gate.classList.add('complete');
  steps.forEach(step=>step.hidden=true);
  welcomeResult.hidden=false;
  counter.hidden=false;
  if(youth){
    if(dashboard)dashboard.hidden=true;
  }else beginDashboard();
  document.body.classList.add('entered');
  const branchWords=branch==='awd'?'Whole Donuts':branch==='tnc'?'The Nurtured Chef':'the shared community table';
  welcomeResult.querySelector('strong').textContent=outcome.action+'.';
  welcomeResult.querySelector('span').textContent=outcome.detail+' Your selected experience: '+branchWords+'.';
  if(outcomePrimary){
    outcomePrimary.href=outcome.href;
    outcomePrimary.textContent=outcome.action;
  }
  if(outcomeNext){
    const next=youth
      ?{href:'#table',label:'Next: stay with the shared community table'}
      :(branchNext[branch]||branchNext.table);
    outcomeNext.href=next.href;
    outcomeNext.textContent=next.label;
    outcomeNext.hidden=false;
  }
  if(ageResultConfirmation)ageResultConfirmation.hidden=!ageConfirmed;
  if(ageResultStatus&&ageConfirmed)ageResultStatus.textContent='Age path selected locally. Your birth date was cleared and your selected path is ready.';
  showQuestion(5);
  if(scroll){
    welcomeResult.scrollIntoView({behavior:'smooth',block:'center'});
    focusRenderedOutcome();
  }
}
function focusRenderedOutcome(){
  const target=outcomePrimary&&outcomePrimary.isConnected&&!outcomePrimary.hidden&&!outcomePrimary.matches(':disabled')?outcomePrimary:null;
  const fallback=continueToOutcome&&continueToOutcome.isConnected&&!continueToOutcome.hidden&&!continueToOutcome.disabled?continueToOutcome:null;
  const focus=()=>{
    if(target)target.focus({preventScroll:true});
    if(target&&document.activeElement===target)return;
    if(fallback)fallback.focus({preventScroll:true});
  };
  requestAnimationFrame(()=>requestAnimationFrame(focus));
  setTimeout(focus,0);
  setTimeout(focus,50);
}
if(continueToOutcome)continueToOutcome.addEventListener('click',()=>{
  if(outcomePrimary&&outcomePrimary.isConnected&&!outcomePrimary.hidden&&!outcomePrimary.matches(':disabled')){
    outcomePrimary.focus({preventScroll:true});
    outcomePrimary.click();
  }
});
function saveJourney(){
  const journey={
    branch:welcomeAnswers.branch||'table',
    course:counterCourses[welcomeAnswers.intent]||'bits',
    intent:welcomeAnswers.intent||'explore'
  };
  safeSet('plusu-welcome',JSON.stringify(journey));
  renderJourneyOffers(journey);
  dispatchEvent(new CustomEvent('plusu:journey',{detail:journey}));
}
function renderJourneyOffers(journey){
  if(!journeyOfferTitle||!journeyOfferCopy)return;
  const branch=journey.branch==='awd'?'Whole Donuts':journey.branch==='tnc'?'The Nurtured Chef':'+U';
  const intent={
    learn:'a practical resource to explore',
    share:'a reviewed way to carry useful knowledge forward',
    help:'a way to support the community',
    explore:'room to look around at your own pace'
  }[journey.intent]||'a next step that fits today';
  journeyOfferTitle.textContent=branch+' picks, made for your '+journey.course+' appetite.';
  journeyOfferCopy.textContent='Try something, keep what helps, and choose what is next. Start with '+intent+' whenever you are; nothing is required.';
  renderVirtualStore(journey,branch,intent);
}
function renderVirtualStore(journey,branch,intent){
  if(!virtualStoreTitle||!virtualStoreCopy||!featuredProductTitle||!featuredProductCopy)return;
  const featured={
    learn:['Open Water Poster','A calm wall piece for keeping a good question close.'],
    share:['Table Tote','For tools, notes, and the work you are ready to make real.'],
    help:['4 ALL Everyday Tee','A soft, simple way to show that there is room at the table.'],
    explore:['Counter Mug','For slow starts, fresh air, and finding your next step at your own pace.']
  }[journey.intent]||['Everyday Tee','Soft, simple, and ready for the long way home.'];
  virtualStoreTitle.textContent='Made by +U, 4 ALL - a little '+branch+' for your '+journey.course+' appetite.';
  virtualStoreCopy.textContent='Since you came here for '+intent+', we pulled a few gentle ideas toward that direction. Browse at your own pace; this is a future Shopify + Printful collection, with no merchandise order or payment collected here.';
  featuredProductTitle.textContent=featured[0];
  featuredProductCopy.textContent=featured[1];
  if(templateLibraryCopy){
    templateLibraryCopy.textContent='You said you came for '+intent+'. Start with a guide, make it your own, and keep only what helps. The library grows as the community leaves useful crumbs.';
  }
}
document.querySelectorAll('[data-answer]').forEach(button=>{
  button.addEventListener('click',()=>{
    if(!prepareLaunchInteraction())return;
    const step=button.closest('[data-question]');
    welcomeAnswers[step.dataset.key]=button.dataset.answer;
    const next=Number(step.dataset.question)+1;
    if(next>4){
      steps.forEach(step=>step.hidden=true);
      if(positivePath)positivePath.hidden=false;
      if(beginPositivePath)beginPositivePath.focus();
    }
    else{
      showQuestion(next);
      focusQuestion(next);
    }
    completeLaunchInteraction();
  });
});

if(menuButtons.length)openCourse('bits');
showAgeGate();

function resetWelcome(){
  safeRemove('plusu-welcome');
  safeRemove(dashboardKey);
  Object.keys(welcomeAnswers).forEach(key=>delete welcomeAnswers[key]);
  welcomeResult.hidden=true;
  counter.hidden=true;
  if(dashboard)dashboard.hidden=true;
  gate.classList.remove('complete');
  showAgeGate();
  ageGate.scrollIntoView({behavior:'smooth'});
}
const restart=document.querySelector('#restart-welcome');
if(restart)restart.addEventListener('click',resetWelcome);

const passButton=document.querySelector('#make-pass');
const passCard=document.querySelector('#pass-card');
const passImage=document.querySelector('#pass-qr');
const passName=document.querySelector('#pass-name');
const passLink=document.querySelector('#open-pass-link');
const copyPassLink=document.querySelector('#copy-pass-link');
const passHelp=document.querySelector('#pass-help');
const passFallback=document.querySelector('#pass-fallback');
let displayedPass=null;
// +U passes use the generated format +U-<STAMP>-<4 CHAR SUFFIX>, where STAMP is a timestamp-derived base36 token.
function validPass(value){
  return typeof value==='string'&&/^\+U-[A-Z0-9]{1,32}-[A-Z0-9]{4}$/.test(value);
}
function passUrl(pass){
  return 'https://wenevergonnaclose.com/?u='+encodeURIComponent(pass);
}
function syncPassFromQuery(){
  const params=new URLSearchParams(location.search);
  const incoming=params.get('u');
  if(!incoming)return 'none';
  // A +U pass is only a device-local return link and must never become a target identifier.
  const robots=document.querySelector('#page-robots');
  if(robots)robots.content='noindex,nofollow';
  const pass=incoming.trim();
  if(!validPass(pass))return 'invalid';
  const existing=safeGet('plusu-pass');
  let current=existing;
  if(current&&!validPass(current)){
    safeRemove('plusu-pass');
    current=null;
  }
  if(current&&current!==pass){
    console.info('Ignoring incoming +U pass because this browser already has a different saved pass.');
    return 'kept-existing';
  }
  safeSet('plusu-pass',pass);
  safeSet('plusu-last-visit',new Date().toISOString());
  return 'restored';
}
const passRestoreState=syncPassFromQuery();
function getPass(){
  let pass=safeGet('plusu-pass');
  if(pass&&!validPass(pass)){
    safeRemove('plusu-pass');
    pass=null;
  }
  if(!pass){
    const stamp=Date.now().toString(36).toUpperCase();
    const spice=Math.random().toString(36).slice(2,6).toUpperCase();
    pass='+U-'+stamp+'-'+spice;
    safeSet('plusu-pass',pass);
  }
  return pass;
}
function renderPass(renderQr){
  if(!passCard||!passImage||!passName)return;
  const pass=getPass();
  const url=passUrl(pass);
  displayedPass=pass;
  passName.textContent=pass;
  if(passLink)passLink.href=url;
  passCard.hidden=false;
  if(renderQr){
    passImage.hidden=false;
    passImage.src='https://api.qrserver.com/v1/create-qr-code/?size=720x720&data='+encodeURIComponent(url);
    passImage.alt='Your private +U QR for '+pass;
  }else{
    passImage.hidden=true;
    passImage.removeAttribute('src');
    passImage.alt='Your private +U QR is ready when requested';
  }
  if(passButton)passButton.textContent=renderQr?'Refresh your +U QR':'Show your +U QR';
  if(copyPassLink)copyPassLink.textContent='Copy my private +U link';
  if(passHelp){
    passHelp.textContent=passRestoreState==='restored'
      ?'This browser restored your +U pass from a private link. Request a QR only if you want one on screen.'
      :passRestoreState==='kept-existing'
        ?'This browser kept its existing +U pass. Request a QR only if you want one on screen.'
        :'The QR image is requested from a third-party QR service only after you ask for it.';
  }
  if(passFallback)passFallback.hidden=true;
  safeSet('plusu-last-visit',new Date().toISOString());
  if(passRestoreState==='restored'&&counter&&!counter.hidden){
    passCard.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
}
if(passButton)passButton.addEventListener('click',()=>renderPass(true));
if(validPass(safeGet('plusu-pass')))renderPass(false);
if(passImage&&passFallback){
  passImage.addEventListener('error',()=>{
    if(!passImage.hidden&&passImage.getAttribute('src'))passFallback.hidden=false;
  });
  passImage.addEventListener('load',()=>{passFallback.hidden=true});
}
if(copyPassLink)copyPassLink.addEventListener('click',async()=>{
  if(!displayedPass)renderPass(false);
  if(!displayedPass){
    copyPassLink.textContent='Copy unavailable';
    return;
  }
  const pass=displayedPass;
  const url=passUrl(pass);
  try{
    if(navigator.clipboard&&navigator.clipboard.writeText){
      await navigator.clipboard.writeText(url);
      copyPassLink.textContent='Link copied';
    }else{
      copyPassLink.textContent='Copy unavailable';
    }
  }catch(e){
    copyPassLink.textContent='Copy unavailable';
  }
});

addEventListener('hashchange',()=>syncBranch({focus:true}));
if(beginPositivePath)beginPositivePath.addEventListener('click',showAgeEligibility);
syncBranch({focus:location.hash.length>1});