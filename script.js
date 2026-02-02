// Stats
let hunger = 50, happiness = 50, energy = 50;
let xp = 0, level = 1;

// Unlockables
const outfits = [
  { level: 2, src: "images/hat.png", message: "New Hat Unlocked! 🎩" },
  { level: 5, src: "images/bow.png", message: "New Bow Unlocked! 🎀" },
  { level: 8, src: "images/cape.png", message: "Super Cape Unlocked! 🦸‍♂️" }
];

const backgrounds = [
  { level: 1, src: "images/room.png" },
  { level: 3, src: "images/park.png" },
  { level: 6, src: "images/night.png" }
];

// Update stats bars and mood
function updateStats() {
  document.getElementById("hunger-bar").style.width = hunger+"%";
  document.getElementById("happiness-bar").style.width = happiness+"%";
  document.getElementById("energy-bar").style.width = energy+"%";

  document.getElementById("hunger-bar").style.background = hunger>70?"#f44336":"#4caf50";
  document.getElementById("happiness-bar").style.background = happiness<30?"#f44336":"#4caf50";
  document.getElementById("energy-bar").style.background = energy<30?"#2196f3":"#4caf50";

  updateMood();
}

// Mood images
function updateMood() {
  const pet = document.getElementById('pet');
  if(energy<=20) pet.src='images/sleepy.png';
  else if(happiness>=70 && hunger<=50 && energy>=50) pet.src='images/happy.png';
  else if(happiness<=30 || hunger>=70 || energy<=30) pet.src='images/sad.png';
  else pet.src='images/neutral.png';
}

// Messages
function showMessage(text,color="#333"){
  const msg=document.getElementById('message');
  msg.textContent=text; msg.style.color=color;
  setTimeout(()=>msg.textContent='',2000);
}

// XP & Level
function updateXP(amount){
  xp+=amount;
  if(xp>=100){ xp-=100; level+=1; showMessage(`Level Up! 🎉 Now Level ${level}`,"#ffeb3b"); unlockReward(level);}
  updateXPBar();
}

function updateXPBar(){ 
  document.getElementById('xp-bar').style.width=xp+"%";
  document.getElementById('level').textContent=`Level ${level}`;
}

function unlockReward(lvl){
  const acc=document.getElementById('accessory'), bg=document.getElementById('background');
  outfits.forEach(o=>{ if(lvl===o.level){ acc.src=o.src; acc.classList.remove('hidden'); showMessage(o.message,"#ffeb3b"); } });
  backgrounds.forEach(b=>{ if(lvl===b.level){ bg.style.backgroundImage=`url(${b.src})`; showMessage("New background unlocked!","#4caf50"); } });
}

// Actions
function feedPet(){
  hunger=Math.max(hunger-10,0); energy=Math.min(energy+5,100); updateStats();
  showMessage("Yum! Thanks for the food!","#4caf50");
  document.getElementById('feed-sound').play();
  updateXP(10);
}

function playPet(){
  if(energy<10){ showMessage("I'm too tired to play!","#f44336"); return; }
  happiness=Math.min(happiness+10,100); energy=Math.max(energy-10,0); hunger=Math.min(hunger+5,100);
  updateStats(); showMessage("Yay! Let's play!","#ff9800"); document.getElementById('play-sound').play();
  const pet=document.getElementById('pet'); pet.style.animation="dance 0.5s"; setTimeout(()=>pet.style.animation="bounce 2s infinite",500);
  updateXP(15);
}

function sleepPet(){
  energy=Math.min(energy+20,100); hunger=Math.min(hunger+5,100); updateStats();
  showMessage("Zzz... Time to rest.","#2196f3"); document.getElementById('sleep-sound').play();
  updateXP(12);
}

// Blinking
function blinkPet(){ const pet=document.getElementById('pet'); const src=pet.src; pet.src='images/blink.png'; setTimeout(()=>{pet.src=src;},200);}
setInterval(()=>{ blinkPet(); }, Math.random()*2000+5000);

// Stat decay
setInterval(()=>{
  hunger=Math.min(hunger+1,100); happiness=Math.max(happiness-1,0); energy=Math.max(energy-1,0); updateStats();
},5000);

// Random mini-events
function randomEvent(){
  const events=[
    ()=>{ happiness=Math.min(happiness+5,100); showMessage("I found a toy! 🎾","#ff9800"); updateXP(5); },
    ()=>{ const pet=document.getElementById('pet'); pet.style.animation="dance 0.5s"; setTimeout(()=>pet.style.animation="bounce 2s infinite",500); showMessage("Look at me dance! 💃","#ff69b4"); updateXP(8); },
    ()=>{ showMessage("Achoo! 🤧","#2196f3"); document.getElementById('sneeze-sound').play(); updateXP(3); },
    ()=>{ if(level>=2){ const outfit=outfits[Math.floor(Math.random()*outfits.length)]; const acc=document.getElementById('accessory'); acc.src=outfit.src; acc.classList.remove('hidden'); showMessage(`I found a ${outfit.message.split(' ')[1]}! ✨`,"#ffeb3b"); updateXP(10); } }
  ];
  events[Math.floor(Math.random()*events.length)]();
}
setInterval(()=>{ randomEvent(); }, Math.random()*10000+15000);

// Auto messages
function autoMessages(){
  if(hunger>=80) showMessage("I'm starving!","#f44336");
  else if(energy<=20) showMessage("I'm sleepy...","#2196f3");
  else if(happiness<=20) showMessage("I'm bored!","#ff9800");
}
setInterval(autoMessages,10000);

// Initial load
updateStats();
updateXPBar();
