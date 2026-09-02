const links=[...document.querySelectorAll('[data-branch]')];
const store=document.querySelector('#branch-store');
const stores={
  awd:['Explore Whole Donuts','#awd'],
  tnc:['Explore The Nurtured Chef','#tnc']
};
const reviewQueueList=document.querySelector('#review-queue-list');
const reviewQueueExclusions=document.querySelector('#review-queue-exclusions');
const reviewQueueFilter=document.querySelector('#review-queue-filter');
const reviewQueueStatus=document.querySelector('#review-queue-status');
const reviewQueueManifest=Array.isArray(window.WHNUTZ_REVIEW_QUEUE_MANIFEST)?window.WHNUTZ_REVIEW_QUEUE_MANIFEST:[];
const reviewQueueExclusionManifest=Array.isArray(window.WHNUTZ_REVIEW_QUEUE_EXCLUSIONS)?window.WHNUTZ_REVIEW_QUEUE_EXCLUSIONS:[];
const reviewQueueCategories=['draft','image','crumb'];

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
  copyInvitation();
});
if(shareInvitationButton)shareInvitationButton.addEventListener('click',async()=>{
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

const journeySteps=[...document.querySelectorAll('[data-journey-step]')];
const journeyTitle=document.querySelector('#entry-journey-title');
const journeyProgress=document.querySelector('#entry-progress');
const journeyBack=document.querySelector('#journey-back');
const journeyRestart=document.querySelector('#journey-restart');
const journeyCompanions=[...document.querySelectorAll('.journey-companion')];
const characterGroups=document.querySelector('#character-groups');
const entryRouteTitle=document.querySelector('#entry-route-title');
const entryRouteCopy=document.querySelector('#entry-route-copy');
const entryRouteLink=document.querySelector('#entry-route-link');
const counter=document.querySelector('#community-counter');
const journeyTitles={
  1:'Choose a stick figure for today.',
  2:'What would help most right now?',
  3:'Here is a useful first route.'
};
const journeyCharacters={
  youth:[
    ['curious','Curious','style-curious'],['bright','Bright','style-bright'],['brave','Brave','style-brave'],['playful','Playful','style-playful'],['inventive','Inventive','style-inventive'],['steady','Steady','style-steady'],['hopeful','Hopeful','style-hopeful'],['friendly','Friendly','style-friendly'],['focused','Focused','style-focused'],['growing','Growing','style-growing'],['open','Open','style-open'],['gentle','Gentle','style-gentle'],['ready','Ready','style-ready'],['explorer','Explorer','style-explorer']
  ],
  adult:[
    ['grounded','Grounded','style-grounded'],['reflective','Reflective','style-reflective'],['resourceful','Resourceful','style-resourceful'],['creative','Creative','style-creative'],['patient','Patient','style-patient'],['capable','Capable','style-capable'],['courageous','Courageous','style-courageous'],['welcoming','Welcoming','style-welcoming'],['practical','Practical','style-practical'],['forward','Forward','style-forward'],['prepared','Prepared','style-prepared'],['determined','Determined','style-determined'],['connected','Connected','style-connected'],['purposeful','Purposeful','style-purposeful']
  ]
};
const journeyRoutes={
  'next-step':{
    title:'Start with the free +U course.',
    copy:'Use the print-ready next-step, share-what-helped, and build-your-table worksheets at your own pace.',
    href:'course.html',
    linkText:'Open the free +U course'
  },
  'make-something':{
    title:'Make something in +U World.',
    copy:'Use the optional visual studio to explore a pose and color, then return to The Table whenever you want.',
    href:'world/',
    linkText:'Open +U World'
  },
  'shared-guide':{
    title:'Start with the +U Library.',
    copy:'Choose an editable public guide for a next step, a useful crumb, or a small community table.',
    href:'#template-library',
    linkText:'Open the +U Library'
  }
};
const journeyState={side:null,character:null,variant:null,need:null,step:1};

function setJourneyCompanion(){
  const variant=journeyState.variant||'';
  journeyCompanions.forEach(companion=>companion.className='journey-companion entry-variant '+variant);
}

function createJourneyFigure(){
  const figure=document.createElement('span');
  figure.className='entry-figure';
  figure.setAttribute('aria-hidden','true');
  ['figure-head','figure-body','figure-limb arm-left','figure-limb arm-right','figure-limb leg-left','figure-limb leg-right'].forEach(className=>{
    const part=document.createElement('span');
    part.className=className;
    figure.append(part);
  });
  return figure;
}

function buildCharacterChoices(){
  if(!characterGroups)return;
  characterGroups.replaceChildren();
  Object.entries(journeyCharacters).forEach(([side,characters])=>{
    const group=document.createElement('section');
    group.className='character-group character-group-'+side;
    const title=document.createElement('h3');
    title.textContent=side==='youth'?'Youth figures':'Adult figures';
    const description=document.createElement('p');
    description.textContent='Choose a visual starting point. This is not an age or identity record.';
    const grid=document.createElement('div');
    grid.className='character-grid';
    characters.forEach(([id,label,variant])=>{
      const button=document.createElement('button');
      button.type='button';
      button.className='character-choice '+variant;
      button.dataset.entryCharacter=id;
      button.dataset.entrySide=side;
      button.dataset.entryVariant=variant;
      button.setAttribute('aria-pressed','false');
      button.setAttribute('aria-label',(side==='youth'?'Youth figure: ':'Adult figure: ')+label);
      const visual=document.createElement('span');
      visual.className='entry-variant';
      visual.append(createJourneyFigure());
      const text=document.createElement('span');
      text.className='character-choice-label';
      text.textContent=label;
      button.append(visual,text);
      grid.append(button);
    });
    group.append(title,description,grid);
    characterGroups.append(group);
  });
}

function selectJourneyCharacter(button){
  journeyState.side=button.dataset.entrySide;
  journeyState.character=button.dataset.entryCharacter;
  journeyState.variant=button.dataset.entryVariant;
  document.querySelectorAll('[data-entry-character]').forEach(choice=>choice.setAttribute('aria-pressed',String(choice===button)));
  setJourneyCompanion();
  showJourneyStep(2,{focus:true});
}

function showJourneyRoute(){
  const route=journeyRoutes[journeyState.need];
  if(!route)return;
  if(entryRouteTitle)entryRouteTitle.textContent=route.title;
  if(entryRouteCopy)entryRouteCopy.textContent=route.copy;
  if(entryRouteLink){
    entryRouteLink.href=route.href;
    entryRouteLink.textContent=route.linkText;
  }
}

function showJourneyStep(step,{focus=false}={}){
  journeyState.step=step;
  journeySteps.forEach(item=>item.hidden=Number(item.dataset.journeyStep)!==step);
  if(journeyProgress)journeyProgress.textContent='STEP '+step+' OF 3';
  if(journeyTitle)journeyTitle.textContent=journeyTitles[step];
  if(journeyBack)journeyBack.hidden=step===1;
  setJourneyCompanion();
  if(focus){
    const activeStep=journeySteps.find(item=>Number(item.dataset.journeyStep)===step);
    const choice=activeStep?activeStep.querySelector('button,a'):null;
    if(choice)choice.focus();
  }
}

function restartJourney({focus=false}={}){
  journeyState.side=null;
  journeyState.character=null;
  journeyState.variant=null;
  journeyState.need=null;
  document.querySelectorAll('[data-entry-character]').forEach(choice=>choice.setAttribute('aria-pressed','false'));
  if(entryRouteTitle)entryRouteTitle.textContent='';
  if(entryRouteCopy)entryRouteCopy.textContent='';
  if(entryRouteLink){
    entryRouteLink.removeAttribute('href');
    entryRouteLink.textContent='Choose an answer first';
  }
  showJourneyStep(1,{focus});
}

document.querySelectorAll('[data-entry-need]').forEach(button=>button.addEventListener('click',()=>{
  if(!journeyState.character){
    restartJourney({focus:true});
    return;
  }
  journeyState.need=button.dataset.entryNeed;
  showJourneyRoute();
  showJourneyStep(3,{focus:true});
}));
if(journeyBack)journeyBack.addEventListener('click',()=>{
  if(journeyState.step===2){
    journeyState.side=null;
    journeyState.character=null;
    journeyState.variant=null;
    document.querySelectorAll('[data-entry-character]').forEach(choice=>choice.setAttribute('aria-pressed','false'));
  }
  if(journeyState.step===3)journeyState.need=null;
  showJourneyStep(journeyState.step-1,{focus:true});
});
if(journeyRestart)journeyRestart.addEventListener('click',()=>restartJourney({focus:true}));
document.querySelectorAll('.journey-actions a').forEach(link=>link.addEventListener('click',()=>restartJourney()));
document.querySelectorAll('[data-skip-gateway]').forEach(link=>link.addEventListener('click',()=>{
  restartJourney();
  if(counter)counter.hidden=false;
}));
buildCharacterChoices();
document.querySelectorAll('[data-entry-character]').forEach(button=>button.addEventListener('click',()=>selectJourneyCharacter(button)));
showJourneyStep(1);

function focusRouteTarget(id){
  const target=document.getElementById(id);
  if(!target)return;
  target.tabIndex=-1;
  target.scrollIntoView({behavior:'smooth',block:'start'});
  target.focus({preventScroll:true});
}

function syncBranch({focus=false}={}){
  const id=location.hash.slice(1);
  if(id)restartJourney();
  links.forEach(a=>a.classList.toggle('active',a.dataset.branch===id));
  if(store){store.textContent='Return to the +U gateway';store.href='#gateway'}
  if((id==='donation-access-hub'||id==='donuts-new-school')&&counter){
    counter.hidden=false;
    if(id==='donation-access-hub')openCourse('bombs');
  }
  if(focus&&id){
    focusRouteTarget(id);
  }
}

const menuButtons=[...document.querySelectorAll('[data-menu]')];
const menuPanels=[...document.querySelectorAll('[data-course]')];
function openCourse(id,{focus=false}={}){
  menuButtons.forEach(button=>{
    const active=button.dataset.menu===id;
    button.classList.toggle('active',active);
    button.setAttribute('aria-selected',String(active));
    button.tabIndex=active?0:-1;
    if(active&&focus)button.focus();
  });
  menuPanels.forEach(panel=>panel.hidden=panel.dataset.course!==id);
}
menuButtons.forEach(button=>button.addEventListener('click',()=>{
  openCourse(button.dataset.menu);
}));
menuButtons.forEach((button,index)=>button.addEventListener('keydown',event=>{
  const {key}=event;
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(key))return;
  event.preventDefault();
  let nextIndex=index;
  if(key==='Home')nextIndex=0;
  else if(key==='End')nextIndex=menuButtons.length-1;
  else if(key==='ArrowLeft')nextIndex=(index-1+menuButtons.length)%menuButtons.length;
  else nextIndex=(index+1)%menuButtons.length;
  openCourse(menuButtons[nextIndex].dataset.menu,{focus:true});
}));

const dateLabel=document.querySelector('#daily-date');
if(dateLabel)dateLabel.textContent=new Intl.DateTimeFormat(undefined,{weekday:'long',month:'long',day:'numeric'}).format(new Date());

if(menuButtons.length)openCourse('bits');

addEventListener('hashchange',()=>syncBranch({focus:true}));
syncBranch({focus:location.hash.length>1});