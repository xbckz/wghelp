// Disable number input arrows cross-browser
document.querySelectorAll('input[type=number]').forEach(input => {
  input.addEventListener('wheel', e => e.preventDefault());
  input.style.MozAppearance = 'textfield';
  input.style.WebkitAppearance = 'none';
});

// === Load and save Owned values ===
document.querySelectorAll('input[id^="owned-"]').forEach(input => {
  const key = input.id; 
  const storedValue = localStorage.getItem(key);
  input.value = storedValue !== null ? storedValue : 0;

  input.addEventListener('input', () => {
    localStorage.setItem(key, input.value);
  });
});

// === Sheet toggle ===
const toggleImg = document.getElementById('sheet-toggle');
let sheetVisible = true;
if(toggleImg) {
  toggleImg.addEventListener('click', () => {
    const sheet = document.querySelector('.sheet-container');
    sheetVisible = !sheetVisible;
    sheet.style.display = sheetVisible ? 'block' : 'none';
    toggleImg.src = sheetVisible ? 'success.png' : 'fail.png';
  });
}

// === Unlock/lock logic ===
const totalBuildings = 10;
for (let i = 1; i <= totalBuildings; i++) {
  const toggle = document.getElementById(`unlock-${i}`);
  if (toggle) {
    const savedState = localStorage.getItem(`unlockState-${i}`) || "locked";
    toggle.dataset.state = savedState;
    toggle.src = savedState === "unlocked" ? "success.png" : "fail.png";

    toggle.addEventListener('click', () => {
      const isUnlocked = toggle.dataset.state === "unlocked";
      toggle.dataset.state = isUnlocked ? "locked" : "unlocked";
      toggle.src = isUnlocked ? "fail.png" : "success.png";
      localStorage.setItem(`unlockState-${i}`, toggle.dataset.state);

      if (isUnlocked) {
        for (let j = i + 1; j <= totalBuildings; j++) {
          const higher = document.getElementById(`unlock-${j}`);
          if (higher) {
            higher.dataset.state = "locked";
            higher.src = "fail.png";
            localStorage.setItem(`unlockState-${j}`, "locked");
          }
        }
      } else {
        for (let j = 1; j < i; j++) {
          const lower = document.getElementById(`unlock-${j}`);
          if (lower) {
            lower.dataset.state = "unlocked";
            lower.src = "success.png";
            localStorage.setItem(`unlockState-${j}`, "unlocked");
          }
        }
      }
    });
  }
}

// === Defense data ===
const defenses = [
  { name: "Barbed Wire", base_price: 238000, delta: 59500, def_points: 70 },
  { name: "Concrete Wall", base_price: 400000, delta: 100000, def_points: 100 },
  { name: "Small Cannon", base_price: 650000, delta: 162500, def_points: 135 },
  { name: "Watchtower", base_price: 1190000, delta: 297500, def_points: 170 },
  { name: "Stationary Artillery", base_price: 2125000, delta: 531250, def_points: 200 },
  { name: "Bunker", base_price: 5950000, delta: 1487500, def_points: 270 },
  { name: "Large Cannon", base_price: 13600000, delta: 3400000, def_points: 340 },
  { name: "Laser Network", base_price: 74800000, delta: 18700000, def_points: 540 },
  { name: "Mine Belt", base_price: 180000000, delta: 45000000, def_points: 710 },
  { name: "Ion Shield", base_price: 325000000, delta: 81250000, def_points: 990 }
];

// === Load owned values from localStorage ===
defenses.forEach((d, i) => {
  const stored = localStorage.getItem(`owned-${i+1}`);
  d.owned = stored ? parseInt(stored) : 0;
  d.bought = 0;
});

// === Map building name -> image file ===
const buildingImages = {
  "Barbed Wire": "1.jpg",
  "Concrete Wall": "2.jpg",
  "Small Cannon": "3.jpg",
  "Watchtower": "4.jpg",
  "Stationary Artillery": "5.jpg",
  "Bunker": "6.jpg",
  "Large Cannon": "7.jpg",
  "Laser Network": "8.jpg",
  "Mine Belt": "9.jpg",
  "Ion Shield": "10.jpg"
};

// === Calculate button ===
document.getElementById("calculate").addEventListener("click", () => {
  let budget = parseFloat(document.getElementById("budget").value) || 0;

  // Refresh owned and locked states
  defenses.forEach((d, i) => {
    d.owned = parseInt(localStorage.getItem(`owned-${i+1}`)) || 0;
    d.bought = 0;
    const unlocked = localStorage.getItem(`unlockState-${i+1}`) || "locked";
    d.locked = unlocked !== "unlocked";
  });

  // Best value calculation
  while (true) {
    defenses.forEach(d => {
      d.next_price = d.base_price + d.delta * d.owned;
      d.value = d.def_points / d.next_price;
    });

    const affordable = defenses.filter(d => !d.locked && d.next_price <= budget);
    if (affordable.length === 0) break;

    const best = affordable.reduce((a, b) => a.value > b.value ? a : b);
    budget -= best.next_price;
    best.owned++;
    best.bought++;
  }

  // Save owned values and update inputs live
defenses.forEach((d, i) => {
  localStorage.setItem(`owned-${i+1}`, d.owned);
  const input = document.getElementById(`owned-${i+1}`);
  if (input) input.value = d.owned; // instantly reflect in the text fields
});


  // Output to Best Plan section using images
  (function renderBestPlan() {
  const resDiv = document.getElementById("best-plan-content");
  if (!resDiv) return;

  const boughtDefenses = defenses
    .map((d, idx) => ({ ...d, imgId: idx + 1 }))
    .filter(d => d.bought > 0);

  let output = "";

  if (boughtDefenses.length > 0) {
    const imgSrcPrefix = ""; // add folder path if needed (e.g. "images/")
    output += `
      <div style="
        display: grid;
        grid-template-columns: repeat(2, auto);
        gap: 6px 8px;
        justify-content: start;
      ">
    `;

    boughtDefenses.forEach(d => {
      output += `
        <div style="
          background-color: rgba(0,0,0,0.3);
          border-radius: 8px;
          padding: 3px;
          width: 85px;
          height: 95px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        ">
          <img src="${imgSrcPrefix}${d.imgId}.jpg"
               alt=""
               style="width:58px; height:58px; object-fit:contain; margin-bottom:3px;" />
          <span style="color:white; font-size:12px; font-weight:bold;">
            ${d.bought}x
          </span>
        </div>
      `;
    });

    output += `</div>`;
  } else {
    output += `<p style="color:white;">No buildings can be bought with this budget.</p>`;
  }

  // Defense summary calculations
  let totalNew = 0, totalOwned = 0;
  defenses.forEach(d => {
    totalNew += (d.bought || 0) * d.def_points;
    totalOwned += (d.owned || 0) * d.def_points;
  });

  const before = totalOwned - totalNew;
  const percent = before > 0 ? (totalNew / before * 100).toFixed(2) : 0;

  output += `
    <div style="
      margin-top:12px;
      padding: 10px;
      border: 2px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      background: rgba(0,0,0,0.25);
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: fit-content;
    ">
      <div style="display:flex; align-items:center; gap:6px;">
        <img src="def.png" alt="def" style="width:20px; height:20px;">
        <p style="color:white; margin:0; font-size:13px;">
          <strong>Defense added:</strong> ${totalNew.toLocaleString()}
        </p>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <img src="def.png" alt="def" style="width:20px; height:20px;">
        <p style="color:white; margin:0; font-size:13px;">
          <strong>Total Defense:</strong> ${totalOwned.toLocaleString()} (+${percent}%)
        </p>
      </div>
    </div>
  `;

  resDiv.innerHTML = output;
})();

});
