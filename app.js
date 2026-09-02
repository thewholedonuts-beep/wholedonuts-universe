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
const reviewQueueList=document.querySelector('#review-queue-list');
const reviewQueueExclusions=document.querySelector('#review-queue-exclusions');
const reviewQueueFilter=document.querySelector('#review-queue-filter');
const reviewQueueStatus=document.querySelector('#review-queue-status');
const reviewQueueManifest=Array.isArray(window.WHNUTZ_REVIEW_QUEUE_MANIFEST)?window.WHNUTZ_REVIEW_QUEUE_MANIFEST:[];
const reviewQueueExclusionManifest=Array.isArray(window.WHNUTZ_REVIEW_QUEUE_EXCLUSIONS)?window.WHNUTZ_REVIEW_QUEUE_EXCLUSIONS:[];
const reviewQueueCategories=['draft','image','crumb'];
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

function validReviewCandidate(candidate){
  return candidate
    &&typeof candidate.title==='string'
    &&typeof candidate.source==='string'
    &&reviewQueueCategories.includes(candidate.category)
    &&typeof candidate.provenance==='string'
    &&typeof candidate.rights==='string'
    &&typeof candidate.reviewStatus==='string'
    &&typeof candidate.nextStep==='string';
}

function reviewQueueDetail(label,value){
  const detail=document.createElement('p');
  const heading=document.createElement('strong');
  heading.textContent=label+': ';
  detail.append(heading,value);
  return detail;
}

function renderReviewQueue(){
  if(!reviewQueueList)return;
  const category=reviewQueueFilter?reviewQueueFilter.value:'all';
  const candidates=reviewQueueManifest.filter(validReviewCandidate).filter(candidate=>category==='all'||candidate.category===category);
  reviewQueueList.replaceChildren();
  candidates.forEach(candidate=>{
    const card=document.createElement('article');
    const title=document.createElement('h4');
    title.textContent=candidate.title;
    card.className='review-candidate';
    card.append(
      title,
      reviewQueueDetail('Source reference',candidate.source),
      reviewQueueDetail('Category',candidate.category),
      reviewQueueDetail('Provenance',candidate.provenance),
      reviewQueueDetail('Rights status',candidate.rights),
      reviewQueueDetail('Review status',candidate.reviewStatus),
      reviewQueueDetail('Manual next step',candidate.nextStep)
    );
    reviewQueueList.append(card);
  });
  if(reviewQueueStatus)reviewQueueStatus.textContent=candidates.length+' review-only '+(candidates.length===1?'candidate is':'candidates are')+' shown. No action is automatic.';
}

function renderReviewQueueExclusions(){
  if(!reviewQueueExclusions)return;
  const exclusions=reviewQueueExclusionManifest.filter(item=>item&&typeof item.source==='string'&&typeof item.reviewStatus==='string'&&typeof item.reason==='string');
  reviewQueueExclusions.replaceChildren();
  exclusions.forEach(item=>{
    const card=document.createElement('article');
    const title=document.createElement('h4');
    title.textContent=item.source;
    card.className='review-candidate review-candidate-excluded';
    card.append(
      title,
      reviewQueueDetail('Source status',item.reviewStatus),
      reviewQueueDetail('Reason',item.reason)
    );
    reviewQueueExclusions.append(card);
  });
}

if(reviewQueueFilter)reviewQueueFilter.addEventListener('change',renderReviewQueue);
renderReviewQueue();
renderReviewQueueExclusions();

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
  resetDashboard();
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
  return ['awd','tnc','donuts-new-school','onboarding','plusu-dashboard','template-library','crumb-workshop','ambassador-path','community-counter'].includes(id);
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
  const id=location.hash.slice(1);
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

const onboardingKey='plusu-entry-onboarding';
const onboarding=document.querySelector('#onboarding');
const onboardingSteps=[...document.querySelectorAll('[data-onboarding-step]')];
const onboardingProgress=document.querySelector('#onboarding-progress');
const onboardingRewards=document.querySelector('#onboarding-rewards');
const onboardingRewardCopy=document.querySelector('#onboarding-reward-copy');
const avatarReward=document.querySelector('#avatar-reward');
const expressionReward=document.querySelector('#expression-reward');
const onboardingBack=document.querySelector('#onboarding-back');
const finishOnboarding=document.querySelector('#finish-onboarding');
const skipOnboarding=document.querySelector('#skip-onboarding');
const onboardingSkipActions=document.querySelector('.onboarding-skip');
const resetOnboarding=document.querySelector('#reset-onboarding');
const interestInputs=[...document.querySelectorAll('.interest-options input')];
const onboardingChoices={ageRange:null,avatar:null,expression:null,interests:[]};
const allowedAgeRanges=['Under 13','13 to 17','18 or older','Rather not say'];
const allowedAvatars=['standing','reaching','seated'];
const allowedExpressions=['smile','calm','curious'];
const expressionMarks={smile:':)',calm:'—',curious:'?'};

function savedOnboardingChoices(){
  const saved=safeGet(onboardingKey);
  if(!saved)return null;
  try{
    const choices=JSON.parse(saved);
    if(!choices||choices.v!==1||!allowedAgeRanges.includes(choices.ageRange)||!allowedAvatars.includes(choices.avatar)||!allowedExpressions.includes(choices.expression)||!Array.isArray(choices.interests))return null;
    const interests=choices.interests.filter(interest=>interestInputs.some(input=>input.value===interest));
    if(!interests.length)return null;
    return {
      ageRange:choices.ageRange,
      avatar:choices.avatar,
      expression:choices.expression,
      interests
    };
  }catch(e){return null}
}

function showOnboardingStep(stepNumber,{focus=false}={}){
  onboardingSteps.forEach(step=>step.hidden=Number(step.dataset.onboardingStep)!==stepNumber);
  if(onboardingRewards)onboardingRewards.hidden=true;
  if(onboardingSkipActions)onboardingSkipActions.hidden=false;
  if(onboardingProgress)onboardingProgress.textContent='OPTIONAL WELCOME · '+stepNumber+' OF 4';
  if(focus){
    const step=onboardingSteps.find(item=>Number(item.dataset.onboardingStep)===stepNumber);
    const button=step?step.querySelector('button,input'):null;
    if(button)button.focus();
  }
}

function renderChoiceStates(){
  document.querySelectorAll('[data-age-range]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.ageRange===onboardingChoices.ageRange)));
  document.querySelectorAll('[data-avatar]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.avatar===onboardingChoices.avatar)));
  document.querySelectorAll('[data-expression]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.expression===onboardingChoices.expression)));
  interestInputs.forEach(input=>input.checked=onboardingChoices.interests.includes(input.value));
}

function renderOnboardingRewards({focus=false}={}){
  onboardingSteps.forEach(step=>step.hidden=true);
  if(onboardingRewards)onboardingRewards.hidden=false;
  if(onboardingSkipActions)onboardingSkipActions.hidden=true;
  if(onboardingProgress)onboardingProgress.textContent='OPTIONAL WELCOME · COMPLETE';
  if(onboardingRewardCopy)onboardingRewardCopy.textContent='Your '+onboardingChoices.avatar+' figure and '+onboardingChoices.expression+' expression unlocked these three local visual rewards. Interests selected: '+onboardingChoices.interests.join(', ')+'.';
  if(avatarReward)avatarReward.dataset.avatar=onboardingChoices.avatar;
  if(expressionReward)expressionReward.textContent=expressionMarks[onboardingChoices.expression];
  if(focus&&document.querySelector('#browse-table'))document.querySelector('#browse-table').focus();
}

function saveOnboardingChoices(){
  safeSet(onboardingKey,JSON.stringify({v:1,...onboardingChoices}));
}

function finishEntryOnboarding(){
  if(!onboardingChoices.interests.length){
    if(navigationStatus)navigationStatus.textContent='Choose at least one interest, or use Skip to browse without saving choices.';
    if(interestInputs[0])interestInputs[0].focus();
    return;
  }
  saveOnboardingChoices();
  document.body.classList.add('entered');
  renderOnboardingRewards({focus:true});
  if(navigationStatus)navigationStatus.textContent='Your browser-local welcome rewards are ready. You can browse or clear them at any time.';
}

function resetWelcome(){
  safeRemove(onboardingKey);
  onboardingChoices.ageRange=null;
  onboardingChoices.avatar=null;
  onboardingChoices.expression=null;
  onboardingChoices.interests=[];
  renderChoiceStates();
  showOnboardingStep(1);
  document.body.classList.remove('entered');
  if(navigationStatus)navigationStatus.textContent='Local welcome choices and rewards were cleared. Nothing was sent anywhere.';
  if(onboarding){
    onboarding.scrollIntoView({behavior:'smooth',block:'start'});
    const firstChoice=document.querySelector('[data-age-range]');
    if(firstChoice)firstChoice.focus({preventScroll:true});
  }
}

document.querySelectorAll('[data-age-range]').forEach(button=>button.addEventListener('click',()=>{
  onboardingChoices.ageRange=button.dataset.ageRange;
  renderChoiceStates();
  showOnboardingStep(2,{focus:true});
}));
document.querySelectorAll('[data-avatar]').forEach(button=>button.addEventListener('click',()=>{
  onboardingChoices.avatar=button.dataset.avatar;
  renderChoiceStates();
  showOnboardingStep(3,{focus:true});
}));
document.querySelectorAll('[data-expression]').forEach(button=>button.addEventListener('click',()=>{
  onboardingChoices.expression=button.dataset.expression;
  renderChoiceStates();
  showOnboardingStep(4,{focus:true});
}));
interestInputs.forEach(input=>input.addEventListener('change',()=>{
  onboardingChoices.interests=interestInputs.filter(item=>item.checked).map(item=>item.value);
}));
if(onboardingBack)onboardingBack.addEventListener('click',()=>showOnboardingStep(3,{focus:true}));
if(finishOnboarding)finishOnboarding.addEventListener('click',finishEntryOnboarding);
if(skipOnboarding)skipOnboarding.addEventListener('click',()=>{
  document.body.classList.add('entered');
  if(navigationStatus)navigationStatus.textContent='Browsing without saving welcome choices.';
  location.hash='table';
});
if(resetOnboarding)resetOnboarding.addEventListener('click',resetWelcome);

if(menuButtons.length)openCourse('bits');
const savedChoices=savedOnboardingChoices();
if(savedChoices){
  Object.assign(onboardingChoices,savedChoices);
  renderChoiceStates();
  document.body.classList.add('entered');
  renderOnboardingRewards();
}else{
  showOnboardingStep(1);
}

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
syncBranch({focus:location.hash.length>1});