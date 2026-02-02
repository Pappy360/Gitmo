let hunger = 50;
let happiness = 50;
let energy = 50;

// Update stat bars and pet mood
function updateStats() {
  document.getElementById("hunger-bar").style.width = hunger + "%";
  document.getElementById("happiness-bar").style.width = happiness + "%";
  document.getElementById("energy-bar").style.width = energy + "%";

  document.getElementById("hunger-bar").style.background = hunger > 70 ? "#f44336" : "#4caf50";
  document.getElementById("happiness-bar").style.background = happiness < 30 ? "#f44336" : "#4caf50";
  document.getElementById("energy-bar").style.background = energy < 30 ? "#2196f3" : "#4caf50";

  updateMood();
}

// Update mood and image
function updateMood() {
  const petContainer = document.getElementById('pet-container');
  const pet = document.getElementById('pet');

  if (energy <= 20) {
    petContainer.className = "sleepy";
    pet.src = 'images/sleepy.png';
  } else if (happiness >= 70 && hunger <= 50 && energy >= 50) {
    petContainer.className = "happy";
    pet.src = 'images/happy.png';
  } else if (happiness <= 30 || hunger >= 70 || energy <= 30) {
    petContainer.className = "sad";
    pet.src = 'images/sad.png';
  } else {
    petContainer.className = "neutral";
    pet.src = 'images/neutral.png';
  }
}

// Actions
function feedPet() {
  hunger = Math.max(hunger - 10, 0);
  energy = Math.min(energy + 5, 100);
  updateStats();
}

function playPet() {
  happiness = Math.min(happiness + 10, 100);
  energy = Math.max(energy - 10, 0);
  hunger = Math.min(hunger + 5, 100);
  updateStats();
}

function sleepPet() {
  energy = Math.min(energy + 20, 100);
  hunger = Math.min(hunger + 5, 100);
  updateStats();
}

// Blinking
function blinkPet() {
  const pet = document.getElementById('pet');
  const originalSrc = pet.src;

  pet.src = 'images/blink.png'; // eyes closed
  setTimeout(() => {
    pet.src = originalSrc;
  }, 200);
}

// Blink every 5-7 seconds
setInterval(() => {
  blinkPet();
}, Math.random() * 2000 + 5000);

// Stat decay
setInterval(() => {
  hunger = Math.min(hunger + 1, 100);
  happiness = Math.max(happiness - 1, 0);
  energy = Math.max(energy - 1, 0);
  updateStats();
}, 5000);

// Initial load
updateStats();
