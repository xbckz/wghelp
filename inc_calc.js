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

// === Unlock/lock logic for buildings 11-25 ===
const firstBuilding = 11;
const lastBuilding = 25;

for (let i = firstBuilding; i <= lastBuilding; i++) {
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
        // Lock all higher-numbered buildings
        for (let j = i + 1; j <= lastBuilding; j++) {
          const higher = document.getElementById(`unlock-${j}`);
          if (higher) {
            higher.dataset.state = "locked";
            higher.src = "fail.png";
            localStorage.setItem(`unlockState-${j}`, "locked");
          }
        }
      } else {
        // Unlock all lower-numbered buildings
        for (let j = firstBuilding; j < i; j++) {
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

// === Income buildings data (11-25) ===
const incomes = [
  { name: "Water Supply Well", base_price: 1750, delta: 175, income: 50 },
  { name: "Schools", base_price: 8000, delta: 800, income: 200 },
  { name: "Water Supplies", base_price: 45000, delta: 4500, income: 1000 },
  { name: "Sewage Disposal", base_price: 225000, delta: 22500, income: 4500 },
  { name: "Streets", base_price: 660000, delta: 66000, income: 11000 },
  { name: "Petrol Stations", base_price: 1035000, delta: 101500, income: 14500 },
  { name: "Electrical Supply", base_price: 4800000, delta: 480000, income: 60000 },
  { name: "Broadcasting System", base_price: 10450000, delta: 1045000, income: 110000 },
  { name: "Warehousing", base_price: 19500000, delta: 1950000, income: 150000 },
  { name: "Healthcare System", base_price: 49500000, delta: 4950000, income: 275000 },
  { name: "Internet", base_price: 82500000, delta: 8250000, income: 375000 },
  { name: "Metro", base_price: 120000000, delta: 12000000, income: 500000 },
  { name: "Biospheres", base_price: 325000000, delta: 32500000, income: 1250000 },
  { name: "Underwater Farm", base_price: 600000000, delta: 60000000, income: 2000000 },
  { name: "Deep Sea Power Station", base_price: 1020000000, delta: 102000000, income: 3000000 }
];

// Load owned values from localStorage
incomes.forEach((b, i) => {
  const stored = localStorage.getItem(`owned-${i + 11}`);
  b.owned = stored ? parseInt(stored) : 0;
  b.bought = 0;
});

// Map income name -> image file (11.jpg to 25.jpg)
const incomeImages = incomes.reduce((acc, b, idx) => {
  acc[b.name] = (11 + idx) + ".jpg";
  return acc;
}, {});

// === Calculate button logic ===
document.getElementById("calculate").addEventListener("click", () => {
  let budget = parseFloat(document.getElementById("budget").value) || 0;

  // Refresh owned and locked states
  incomes.forEach((b, i) => {
    b.owned = parseInt(localStorage.getItem(`owned-${i + 11}`)) || 0;
    b.bought = 0;

    const unlocked = localStorage.getItem(`unlockState-${i + 11}`) || "locked";
    b.locked = unlocked !== "unlocked";
  });

  // Best value calculation
  while (true) {
    incomes.forEach(b => {
      b.next_price = b.base_price + b.delta * b.owned;
      b.value = b.income / b.next_price;
    });

    const affordable = incomes.filter(b => !b.locked && b.next_price <= budget);
    if (affordable.length === 0) break;

    const best = affordable.reduce((a, b) => a.value > b.value ? a : b);
    budget -= best.next_price;
    best.owned++;
    best.bought++;
  }

  // Save owned values & update inputs
  incomes.forEach((b, i) => {
    localStorage.setItem(`owned-${i + 11}`, b.owned);
    const input = document.getElementById(`owned-${i + 11}`);
    if (input) input.value = b.owned;
  });

  // Render Best Plan output
  const resDiv = document.getElementById("best-plan-content");
  if (!resDiv) return;

  const boughtIncomes = incomes.filter(b => b.bought > 0);
  let output = "";

  if (boughtIncomes.length > 0) {
    output += `<div style="display:grid; grid-template-columns: repeat(2, auto); gap:6px 8px; justify-content:start;">`;
    boughtIncomes.forEach(b => {
      output += `
        <div style="background-color: rgba(0,0,0,0.3); border-radius:8px; padding:3px; width:85px; height:95px; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <img src="${incomeImages[b.name]}" style="width:58px; height:58px; object-fit:contain; margin-bottom:3px;" />
          <span style="color:white; font-size:12px; font-weight:bold;">${b.bought}x</span>
        </div>
      `;
    });
    output += `</div>`;
  } else {
    output += `<p style="color:white;">No buildings can be bought with this budget.</p>`;
  }

  // Income summary
  let totalNew = 0, totalOwned = 0;
  incomes.forEach(b => {
    totalNew += (b.bought || 0) * b.income;
    totalOwned += (b.owned || 0) * b.income;
  });

  const before = totalOwned - totalNew;
  const percent = before > 0 ? (totalNew / before * 100).toFixed(2) : 0;

  output += `
    <div style="margin-top:12px; padding:10px; border:2px solid rgba(255,255,255,0.2); border-radius:8px; background: rgba(0,0,0,0.25); display:flex; flex-direction:column; gap:5px; width:fit-content;">
      <div style="display:flex; align-items:center; gap:6px;">
        <img src="income.png" style="width:20px; height:20px;" />
        <p style="color:white; margin:0; font-size:13px;"><strong>Income added:</strong> ${totalNew.toLocaleString()}</p>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <img src="income.png" style="width:20px; height:20px;" />
        <p style="color:white; margin:0; font-size:13px;"><strong>Total Income (Without Bonus):</strong> ${totalOwned.toLocaleString()} (+${percent}%)</p>
      </div>
    </div>
  `;

  resDiv.innerHTML = output;
});
