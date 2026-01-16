const surahSelect = document.getElementById("surah-select");
const ayahsDiv = document.getElementById("ayahs");

// Load Surah list
fetch("https://api.alquran.cloud/v1/surah")
  .then(res => res.json())
  .then(data => {
    data.data.forEach(surah => {
      const option = document.createElement("option");
      option.value = surah.number;
      option.textContent = `${surah.number}. ${surah.englishName}`;
      surahSelect.appendChild(option);
    });
    loadSurah(1); // Load Al-Fatiha by default
  });

// Load Surah content
function loadSurah(number) {
  fetch(`https://api.alquran.cloud/v1/surah/${number}`)
    .then(res => res.json())
    .then(data => {
      ayahsDiv.innerHTML = "";
      data.data.ayahs.forEach(ayah => {
        const p = document.createElement("p");
        p.innerHTML = `${ayah.text} <span>﴿${ayah.numberInSurah}﴾</span>`;
        ayahsDiv.appendChild(p);
      });
    });
}

surahSelect.addEventListener("change", e => {
  loadSurah(e.target.value);
});
