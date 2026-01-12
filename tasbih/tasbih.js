let count = localStorage.getItem('tasbihCount') ? parseInt(localStorage.getItem('tasbihCount')) : 0;
const phrases = ["SubhanAllah", "Alhamdulillah", "Allahu Akbar", "La ilaha illa Allah"];
let phraseIndex = 0;

const counterDisplay = document.getElementById('counter');
const tapBtn = document.getElementById('tap-btn');
const resetBtn = document.getElementById('reset-btn');
const changeBtn = document.getElementById('change-btn');
const dhikrText = document.getElementById('dhikr-text');

// Initialize display
counterDisplay.innerText = count;

// Tap functionality
tapBtn.addEventListener('click', () => {
    count++;
    counterDisplay.innerText = count;
    localStorage.setItem('tasbihCount', count);
    
    // Add a tiny vibration feel
    tapBtn.style.transform = "scale(0.95)";
    setTimeout(() => tapBtn.style.transform = "scale(1)", 100);
});

// Reset functionality
resetBtn.addEventListener('click', () => {
    if(confirm("Do you want to reset your count?")) {
        count = 0;
        counterDisplay.innerText = count;
        localStorage.setItem('tasbihCount', count);
    }
});

// Change Dhikr phrase
changeBtn.addEventListener('click', () => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    dhikrText.innerText = phrases[phraseIndex];
});