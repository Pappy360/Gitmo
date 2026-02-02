let hunger = 50;
let happiness = 50;
let energy = 50;

function updateStats() {
  document.getElementById("hunger").textContent = hunger;
  document.getElementById("happiness").textContent = happiness;
  document.getElementById("energy").textContent = energy;
}

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

setInterval(() => {
  hunger = Math.min(hunger + 1, 100);
  happiness = Math.max(happiness - 1, 0);
  energy = Math.max(energy - 1, 0);
  updateStats();
}, 5000);

updateStats();
