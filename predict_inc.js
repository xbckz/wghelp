// === Income Calculation Script (non-destructive, visual output like Best Value) ===

// Income building data (11-25)
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

const incomeImages = incomes.reduce((acc, b, idx) => {
  acc[b.name] = `${11 + idx}.jpg`;
  return acc;
}, {});

function readSavedOwned() {
  return incomes.map((b, i) => {
    const stored = localStorage.getItem(`owned-${i + 11}`);
    return stored ? parseInt(stored, 10) : 0;
  });
}

function simulatePredict(targetIncome, bonusPercent) {
  const bonusMultiplier = 1 + (Number(bonusPercent) || 0) / 100;
  const savedOwned = readSavedOwned();

  const working = incomes.map((b, i) => ({
    name: b.name,
    base_price: b.base_price,
    delta: b.delta,
    income: b.income,
    owned: savedOwned[i] || 0,
    bought: 0
  }));

  const currentIncomeNoBonus = working.reduce((s, w) => s + w.income * w.owned, 0);
  const currentIncomeWithBonus = currentIncomeNoBonus * bonusMultiplier;

  let neededIncome = Number(targetIncome) - currentIncomeWithBonus;
  if (neededIncome <= 0) {
    return {
      achieved: true,
      message: "Your current income is already higher than the target",
      boughtList: [],
      totalCost: 0,
      totalNew: 0,
      totalOwnedBefore: currentIncomeNoBonus,
      totalOwnedAfter: currentIncomeNoBonus,
      bonusPercent,
      bonusMultiplier
    };
  }

  let totalCost = 0;
  while (neededIncome > 0) {
    working.forEach(w => {
      w.next_price = w.base_price + w.delta * w.owned;
      w.value = (w.income * bonusMultiplier) / w.next_price;
    });

    const best = working.reduce((a, b) => (a.value > b.value ? a : b));
    totalCost += best.next_price;
    best.owned++;
    best.bought++;
    neededIncome -= best.income * bonusMultiplier;

    if (!isFinite(totalCost) || totalCost > 1e18) break;
  }

  const boughtList = working.filter(w => w.bought > 0);
  const totalNew = working.reduce((s, w) => s + (w.bought || 0) * w.income, 0);
  const totalOwnedBefore = currentIncomeNoBonus;
  const totalOwnedAfter = currentIncomeNoBonus + totalNew;

  return {
    achieved: false,
    boughtList,
    totalCost,
    totalNew,
    totalOwnedBefore,
    totalOwnedAfter,
    bonusPercent,
    bonusMultiplier
  };
}

function renderPrediction(result) {
  const resDiv = document.getElementById("best-plan-content");
  if (!resDiv) return;
  resDiv.innerHTML = "";

  if (result.achieved) {
    resDiv.innerHTML = `<p style="color:white; margin:0">${result.message}</p>`;
    return;
  }

  const bought = result.boughtList;
  let output = "";

  if (bought.length > 0) {
    output += `<div style="display:grid; grid-template-columns: repeat(2, auto); gap:6px 8px; justify-content:start;">`;
    bought.forEach(b => {
      const img = incomeImages[b.name] || "11.jpg";
      output += `
        <div style="background-color: rgba(0,0,0,0.3); border-radius:8px; padding:3px; width:85px; height:95px; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <img src="${img}" alt="${b.name}" style="width:58px; height:58px; object-fit:contain; margin-bottom:3px;">
          <span style="color:white; font-size:12px; font-weight:bold;">${b.bought}x</span>
        </div>
      `;
    });
    output += `</div>`;
  } else {
    output += `<p style="color:white;">No buildings need buying to reach target.</p>`;
  }

  const totalNewBonus = result.totalNew * result.bonusMultiplier;
  const totalFinalBonus = result.totalOwnedAfter * result.bonusMultiplier;
  const percent = result.totalOwnedBefore > 0
    ? ((result.totalNew / result.totalOwnedBefore) * 100).toFixed(2)
    : "0.00";

  output += `
    <div style="margin-top:12px; padding:10px; border:2px solid rgba(255,255,255,0.2); border-radius:8px; background: rgba(0,0,0,0.25); display:flex; flex-direction:column; gap:8px; width:fit-content;">
      <div style="display:flex; align-items:center; gap:8px;">
        <img src="income.png" style="width:20px; height:20px;">
        <p style="color:white; margin:0; font-size:13px;">
          <strong>Income added (with ${result.bonusPercent}% bonus):</strong>
          <span style="color:#white;">${totalNewBonus.toLocaleString()}</span>
        </p>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <img src="income.png" style="width:20px; height:20px;">
        <p style="color:white; margin:0; font-size:13px;">
          <strong>Final income (with ${result.bonusPercent}% bonus):</strong>
          <span style="color:white;">${totalFinalBonus.toLocaleString()}</span>
        </p>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <img src="money.png" style="width:20px; height:20px;">
        <p style="color:white; margin:0; font-size:13px;">
          <strong>Total Cost to Reach Target:</strong> ${result.totalCost.toLocaleString()}
        </p>
      </div>
    </div>
  `;

  resDiv.innerHTML = output;
}

// hook up calculate button
const calcBtn = document.getElementById("calculate");
if (calcBtn) {
  calcBtn.addEventListener("click", () => {
    const targetIncome = parseFloat(document.getElementById("target-income").value) || 0;
    const bonus = parseFloat(document.getElementById("bonus").value) || 0;
    const result = simulatePredict(targetIncome, bonus);
    renderPrediction(result);
  });
} else {
  console.warn("Calculate button (#calculate) not found in DOM.");
}
