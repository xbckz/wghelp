// Unit data
const unitData = {
  "infantry": [
    {"name": "Recruit", "attack": 1, "defense": 0, "upkeep": 0, "unlock_lvl": 0},
    {"name": "Guard", "attack": 0, "defense": 1, "upkeep": 0, "unlock_lvl": 0},
    {"name": "Foot Soldier", "attack": 3, "defense": 1, "upkeep": 0, "unlock_lvl": 0},
    {"name": "Militia", "attack": 3, "defense": 3, "upkeep": 0, "unlock_lvl": 4},
    {"name": "Infantryman", "attack": 4, "defense": 3, "upkeep": 0, "unlock_lvl": 6},
    {"name": "Guardman", "attack": 2, "defense": 5, "upkeep": 0, "unlock_lvl": 8},
    {"name": "Grenadier", "attack": 6, "defense": 5, "upkeep": 40, "unlock_lvl": 10},
    {"name": "Lance Corporal", "attack": 9, "defense": 5, "upkeep": 100, "unlock_lvl": 14},
    {"name": "Paratrooper", "attack": 14, "defense": 7, "upkeep": 180, "unlock_lvl": 15},
    {"name": "Flamethrower", "attack": 15, "defense": 8, "upkeep": 250, "unlock_lvl": 18},
    {"name": "Military Police", "attack": 17, "defense": 11, "upkeep": 300, "unlock_lvl": 22},
    {"name": "Frogman Marine", "attack": 19, "defense": 10, "upkeep": 400, "unlock_lvl": 25},
    {"name": "Artillerist", "attack": 20, "defense": 10, "upkeep": 500, "unlock_lvl": 27},
    {"name": "Partisan", "attack": 22, "defense": 11, "upkeep": 600, "unlock_lvl": 31},
    {"name": "Sniper", "attack": 25, "defense": 12, "upkeep": 750, "unlock_lvl": 34},
    {"name": "Mountain Infantry", "attack": 25, "defense": 13, "upkeep": 1000, "unlock_lvl": 36},
    {"name": "Mechanised Infantry", "attack": 32, "defense": 16, "upkeep": 1500, "unlock_lvl": 43},
    {"name": "Commando Unit", "attack": 33, "defense": 17, "upkeep": 2100, "unlock_lvl": 47},
    {"name": "Combat Engineer", "attack": 36, "defense": 20, "upkeep": 2600, "unlock_lvl": 52},
    {"name": "Special Forces Unit", "attack": 38, "defense": 19, "upkeep": 3200, "unlock_lvl": 58},
    {"name": "Mobile Infantry", "attack": 45, "defense": 22, "upkeep": 3500, "unlock_lvl": 61},
    {"name": "Elite", "attack": 50, "defense": 25, "upkeep": 4800, "unlock_lvl": 66},
    {"name": "Commander", "attack": 53, "defense": 27, "upkeep": 5000, "unlock_lvl": 73},
    {"name": "Officer", "attack": 56, "defense": 28, "upkeep": 6200, "unlock_lvl": 76},
    {"name": "Hi-tech Soldier", "attack": 63, "defense": 31, "upkeep": 7500, "unlock_lvl": 82},
    {"name": "Super Warrior", "attack": 68, "defense": 34, "upkeep": 9000, "unlock_lvl": 86},
    {"name": "Drone Pilot", "attack": 89, "defense": 43, "upkeep": 12000, "unlock_lvl": 98},
    {"name": "Pathfinder TX", "attack": 98, "defense": 47, "upkeep": 15000, "unlock_lvl": 107},
    {"name": "Bomb Disposal", "attack": 101, "defense": 70, "upkeep": 18000, "unlock_lvl": 115},
    {"name": "Field Mechanic", "attack": 119, "defense": 65, "upkeep": 23000, "unlock_lvl": 128},
    {"name": "Jetpack Pilot", "attack": 127, "defense": 72, "upkeep": 26000, "unlock_lvl": 133},
    {"name": "Infiltrator", "attack": 130, "defense": 80, "upkeep": 33000, "unlock_lvl": 146},
    {"name": "Exoskeleton", "attack": 140, "defense": 85, "upkeep": 36000, "unlock_lvl": 151},
    {"name": "Cyborg Veteran", "attack": 144, "defense": 80, "upkeep": 42000, "unlock_lvl": 161},
    {"name": "Chem Berserker", "attack": 147, "defense": 82, "upkeep": 50000, "unlock_lvl": 174},
    {"name": "Lamprey", "attack": 153, "defense": 85, "upkeep": 58000, "unlock_lvl": 182},
    {"name": "Arctic Wolf", "attack": 159, "defense": 86, "upkeep": 72000, "unlock_lvl": 198},
    {"name": "Aquanaut", "attack": 163, "defense": 84, "upkeep": 80000, "unlock_lvl": 207},
    {"name": "D-800", "attack": 165, "defense": 86, "upkeep": 89000, "unlock_lvl": 215},
    {"name": "Gen Soldier", "attack": 167, "defense": 88, "upkeep": 96000, "unlock_lvl": 223}
  ],
  "vehicles": [
    {"name": "Motorbike", "attack": 2, "defense": 1, "upkeep": 0, "unlock_lvl": 0},
    {"name": "Jeep", "attack": 3, "defense": 3, "upkeep": 0, "unlock_lvl": 0},
    {"name": "Truck", "attack": 4, "defense": 5, "upkeep": 0, "unlock_lvl": 4},
    {"name": "M113", "attack": 10, "defense": 11, "upkeep": 0, "unlock_lvl": 7},
    {"name": "Reconnaissance Drone", "attack": 16, "defense": 14, "upkeep": 330, "unlock_lvl": 9},
    {"name": "B1 Centauro", "attack": 34, "defense": 17, "upkeep": 470, "unlock_lvl": 11},
    {"name": "Light Artillery", "attack": 38, "defense": 19, "upkeep": 730, "unlock_lvl": 13},
    {"name": "Hovercraft", "attack": 50, "defense": 25, "upkeep": 870, "unlock_lvl": 15},
    {"name": "Luchs", "attack": 52, "defense": 26, "upkeep": 1330, "unlock_lvl": 19},
    {"name": "Anti-air Weaponry", "attack": 58, "defense": 29, "upkeep": 1580, "unlock_lvl": 23},
    {"name": "Weaponised Drones", "attack": 65, "defense": 32, "upkeep": 2170, "unlock_lvl": 26},
    {"name": "Howitzer", "attack": 72, "defense": 36, "upkeep": 2500, "unlock_lvl": 30},
    {"name": "M-84", "attack": 74, "defense": 37, "upkeep": 4830, "unlock_lvl": 35},
    {"name": "ZBD97", "attack": 94, "defense": 47, "upkeep": 7330, "unlock_lvl": 38},
    {"name": "Multiple Rocket Launcher", "attack": 104, "defense": 52, "upkeep": 8830, "unlock_lvl": 45},
    {"name": "Corvette", "attack": 122, "defense": 61, "upkeep": 11670, "unlock_lvl": 50},
    {"name": "T-90", "attack": 126, "defense": 63, "upkeep": 12670, "unlock_lvl": 58},
    {"name": "Short-range Ballistic Missile", "attack": 138, "defense": 69, "upkeep": 15670, "unlock_lvl": 65},
    {"name": "M1 Abrams", "attack": 152, "defense": 76, "upkeep": 17000, "unlock_lvl": 67},
    {"name": "SDI Laser", "attack": 168, "defense": 84, "upkeep": 21670, "unlock_lvl": 74},
    {"name": "Railgun", "attack": 178, "defense": 89, "upkeep": 24670, "unlock_lvl": 80},
    {"name": "Gauss Tank", "attack": 188, "defense": 94, "upkeep": 27330, "unlock_lvl": 84},
    {"name": "Camotransporter", "attack": 209, "defense": 109, "upkeep": 41000, "unlock_lvl": 100},
    {"name": "Microwave Tank", "attack": 253, "defense": 127, "upkeep": 53000, "unlock_lvl": 110},
    {"name": "EMP Sensor", "attack": 271, "defense": 143, "upkeep": 65000, "unlock_lvl": 120},
    {"name": "Battle Walker", "attack": 291, "defense": 161, "upkeep": 81000, "unlock_lvl": 130},
    {"name": "Drone Swarm", "attack": 312, "defense": 158, "upkeep": 95000, "unlock_lvl": 138},
    {"name": "Commando Tank", "attack": 333, "defense": 171, "upkeep": 110000, "unlock_lvl": 145},
    {"name": "Mech Titan", "attack": 389, "defense": 179, "upkeep": 130000, "unlock_lvl": 157},
    {"name": "Canis Cursor", "attack": 400, "defense": 220, "upkeep": 155000, "unlock_lvl": 167},
    {"name": "Nano Krill", "attack": 419, "defense": 270, "upkeep": 200000, "unlock_lvl": 185},
    {"name": "Aqua Hunter", "attack": 445, "defense": 251, "upkeep": 210000, "unlock_lvl": 187},
    {"name": "Kraken Bomb", "attack": 481, "defense": 241, "upkeep": 230000, "unlock_lvl": 194},
    {"name": "Hammerhead Shark Transporter", "attack": 530, "defense": 265, "upkeep": 290000, "unlock_lvl": 214},
    {"name": "Manta Ray", "attack": 569, "defense": 249, "upkeep": 310000, "unlock_lvl": 220}
  ],
  "aircraft": [
    {"name": "MiG-23", "attack": 35, "defense": 25, "upkeep": 0, "unlock_lvl": 0},
    {"name": "Phantom", "attack": 30, "defense": 44, "upkeep": 0, "unlock_lvl": 0},
    {"name": "AWACS", "attack": 48, "defense": 32, "upkeep": 0, "unlock_lvl": 5},
    {"name": "F-16", "attack": 70, "defense": 50, "upkeep": 450, "unlock_lvl": 12},
    {"name": "Jak-38", "attack": 147, "defense": 73, "upkeep": 3000, "unlock_lvl": 16},
    {"name": "Mirage", "attack": 300, "defense": 150, "upkeep": 10000, "unlock_lvl": 22},
    {"name": "Harrier", "attack": 333, "defense": 167, "upkeep": 20000, "unlock_lvl": 27},
    {"name": "MiG-29", "attack": 360, "defense": 180, "upkeep": 38000, "unlock_lvl": 35},
    {"name": "Hornet", "attack": 413, "defense": 207, "upkeep": 70000, "unlock_lvl": 38},
    {"name": "Apache", "attack": 453, "defense": 227, "upkeep": 100000, "unlock_lvl": 43},
    {"name": "Eurofighter", "attack": 487, "defense": 243, "upkeep": 130000, "unlock_lvl": 50},
    {"name": "Nighthawk", "attack": 647, "defense": 323, "upkeep": 200000, "unlock_lvl": 55},
    {"name": "F-35 Lightning II", "attack": 700, "defense": 350, "upkeep": 320000, "unlock_lvl": 62},
    {"name": "Gunship", "attack": 800, "defense": 400, "upkeep": 680000, "unlock_lvl": 76},
    {"name": "MH-53E", "attack": 1001, "defense": 467, "upkeep": 1200000, "unlock_lvl": 105},
    {"name": "Boeing V-22", "attack": 1147, "defense": 610, "upkeep": 1500000, "unlock_lvl": 116},
    {"name": "Ikarus S.U.I.T.", "attack": 1337, "defense": 663, "upkeep": 2700000, "unlock_lvl": 140},
    {"name": "Orbital Headquarters", "attack": 1479, "defense": 735, "upkeep": 3700000, "unlock_lvl": 155},
    {"name": "Orbital Troop Transporter", "attack": 1560, "defense": 780, "upkeep": 4250000, "unlock_lvl": 162},
    {"name": "Ion Cannon", "attack": 1680, "defense": 840, "upkeep": 5250000, "unlock_lvl": 175},
    {"name": "Sunspear", "attack": 1950, "defense": 930, "upkeep": 7880000, "unlock_lvl": 199},
    {"name": "Orbital Missile Defence", "attack": 2222, "defense": 1000, "upkeep": 11220000, "unlock_lvl": 224}
  ]
};

const UNIT_TYPES = ['infantry', 'vehicles', 'aircraft'];
const UNIT_TYPE_LABELS = {
  infantry: 'Infantry',
  vehicles: 'Vehicles',
  aircraft: 'Aircraft'
};

// Get the value of one unit for the selected objective.
function getUnitValue(unit, optimizeType) {
  if (optimizeType === 'attack') return unit.attack;
  if (optimizeType === 'defense') return unit.defense;
  return unit.attack + unit.defense;
}

// Kept as a public helper for callers that used the old calculator script.
function calculateEfficiency(unit, optimizeType) {
  const upkeep = unit.upkeep === 0 ? 1 : unit.upkeep;
  return getUnitValue(unit, optimizeType) / upkeep;
}

// Get units unlocked by the player's level. Special war-loot units are not in
// unitData because they have no level unlock and are not guaranteed by a budget.
function getAvailableUnits(playerLevel, unitType) {
  return unitData[unitType].filter(unit => unit.unlock_lvl <= playerLevel);
}

// The game allows five alliance members per player level, and each member
// contributes 10 infantry, 3 vehicles and 1 aircraft slots.
function calculateSlotLimits(playerLevel, allianceSize) {
  const allianceMembers = Math.max(0, Math.min(allianceSize, playerLevel * 5));
  return {
    allianceMembers,
    infantry: allianceMembers * 10,
    vehicles: allianceMembers * 3,
    aircraft: allianceMembers
  };
}

function compareUnitsForTieBreak(a, b, optimizeType) {
  const aValue = getUnitValue(a, optimizeType);
  const bValue = getUnitValue(b, optimizeType);
  if (aValue !== bValue) return bValue - aValue;
  if (a.upkeep !== b.upkeep) return a.upkeep - b.upkeep;
  return a.name.localeCompare(b.name);
}

function bestUnit(units, optimizeType) {
  return units.reduce((best, unit) => (
    !best || compareUnitsForTieBreak(best, unit, optimizeType) > 0 ? unit : best
  ), null);
}

// Remove items that can never be part of an optimum: another unit in the same
// slot pool costs no more and adds at least as much objective value. There is
// no inventory limit on a unit, so replacing a dominated item is always valid.
function removeDominatedItems(items) {
  return items.filter((item, index) => !items.some((other, otherIndex) => {
    if (index === otherIndex || item.type !== other.type) return false;
    const noMoreExpensive = other.cost <= item.cost;
    const noLessValuable = other.value >= item.value;
    const strictlyBetter = other.cost < item.cost || other.value > item.value;
    return noMoreExpensive && noLessValuable && strictlyBetter;
  }));
}

function seedSearch(items, slotLimits, budget) {
  const orders = [
    items,
    [...items].sort((a, b) => b.value - a.value || a.cost - b.cost),
    [...items].sort((a, b) => a.cost - b.cost || b.value - a.value)
  ];
  let best = { value: 0, counts: Array(items.length).fill(0) };

  // Start from the free baseline and greedily apply bulk upgrades. A simple
  // one-pass fill would consume every slot with the first cheap troop and
  // leave no room to upgrade, which is a very poor incumbent for large armies.
  const upgradeCounts = Array(items.length).fill(0);
  const currentByType = {};
  for (const type of UNIT_TYPES) {
    currentByType[type] = [{ cost: 0, value: 0, count: slotLimits[type], itemIndex: -1 }];
  }
  let remainingBudget = budget;
  let upgradeValue = 0;
  let upgradeSteps = 0;

  while (upgradeSteps < items.length * UNIT_TYPES.length * 2) {
    let bestUpgrade = null;
    for (const target of items) {
      const sources = currentByType[target.type];
      for (const source of sources) {
        if (source.count <= 0 || target.value <= source.value) continue;
        const cost = target.cost - source.cost;
        const value = target.value - source.value;
        if (cost < 0 || cost > remainingBudget) continue;
        const ratio = cost === 0 ? Number.POSITIVE_INFINITY : value / cost;
        if (!bestUpgrade || ratio > bestUpgrade.ratio ||
            (ratio === bestUpgrade.ratio && value > bestUpgrade.value)) {
          bestUpgrade = { target, source, cost, value, ratio };
        }
      }
    }
    if (!bestUpgrade) break;

    const quantity = bestUpgrade.cost === 0
      ? bestUpgrade.source.count
      : Math.min(
        bestUpgrade.source.count,
        Math.floor(remainingBudget / bestUpgrade.cost)
      );
    if (quantity <= 0) break;

    bestUpgrade.source.count -= quantity;
    if (bestUpgrade.source.itemIndex >= 0) {
      upgradeCounts[bestUpgrade.source.itemIndex] -= quantity;
    }
    const targetState = currentByType[bestUpgrade.target.type].find(
      state => state.cost === bestUpgrade.target.cost && state.value === bestUpgrade.target.value
    );
    if (targetState) targetState.count += quantity;
    else currentByType[bestUpgrade.target.type].push({
      cost: bestUpgrade.target.cost,
      value: bestUpgrade.target.value,
      count: quantity,
      itemIndex: items.indexOf(bestUpgrade.target)
    });
    const itemIndex = items.indexOf(bestUpgrade.target);
    upgradeCounts[itemIndex] += quantity;
    remainingBudget -= quantity * bestUpgrade.cost;
    upgradeValue += quantity * bestUpgrade.value;
    upgradeSteps += 1;
  }

  best = { value: upgradeValue, counts: upgradeCounts };

  for (const order of orders) {
    const counts = Array(items.length).fill(0);
    const remainingSlots = { ...slotLimits };
    let remainingBudget = budget;
    let value = 0;

    for (const item of order) {
      const itemIndex = items.indexOf(item);
      const quantity = Math.min(
        remainingSlots[item.type],
        Math.floor(remainingBudget / item.cost)
      );
      if (quantity <= 0) continue;
      counts[itemIndex] = quantity;
      remainingSlots[item.type] -= quantity;
      remainingBudget -= quantity * item.cost;
      value += quantity * item.value;
    }

    if (value > best.value) best = { value, counts };
  }

  return best;
}

// Exact integer branch-and-bound search across all three slot pools and the
// one shared upkeep budget. The upper bound is deliberately conservative:
// one bound ignores slot limits, another ignores the budget, and their minimum
// is still guaranteed to be at least as large as every feasible completion.
function optimizeArmyItems(items, slotLimits, budget, options = {}) {
  const bestSeed = seedSearch(items, slotLimits, budget);
  let bestValue = bestSeed.value;
  let bestCounts = bestSeed.counts;
  const currentCounts = Array(items.length).fill(0);
  const categories = Object.keys(slotLimits).filter(type => UNIT_TYPES.includes(type));
  let nodesVisited = 0;
  let searchAborted = false;
  const deadline = Number.isFinite(options.deadline) ? options.deadline : 0;

  // Precompute suffix maxima so each search node can evaluate its upper bound
  // in constant time instead of rescanning all remaining units.
  const suffixMaxValue = Object.fromEntries(
    categories.map(type => [type, Array(items.length + 1).fill(0)])
  );
  const suffixMaxDensity = Object.fromEntries(
    categories.map(type => [type, Array(items.length + 1).fill(0)])
  );
  for (let index = items.length - 1; index >= 0; index -= 1) {
    for (const type of categories) {
      suffixMaxValue[type][index] = suffixMaxValue[type][index + 1];
      suffixMaxDensity[type][index] = suffixMaxDensity[type][index + 1];
    }
    const item = items[index];
    suffixMaxValue[item.type][index] = Math.max(
      suffixMaxValue[item.type][index], item.value
    );
    suffixMaxDensity[item.type][index] = Math.max(
      suffixMaxDensity[item.type][index], item.ratio
    );
  }

  function upperBound(startIndex, remainingBudget, remainingSlots) {
    if (remainingBudget <= 0 || startIndex >= items.length) return 0;

    const activeItemsByType = Object.fromEntries(categories.map(type => [type, []]));
    for (let index = startIndex; index < items.length; index += 1) {
      const item = items[index];
      if (remainingSlots[item.type] <= 0) continue;
      activeItemsByType[item.type].push(item);
    }

    const maxDensity = categories.reduce((max, type) => (
      remainingSlots[type] > 0
        ? Math.max(max, suffixMaxDensity[type][startIndex])
        : max
    ), 0);
    if (maxDensity === 0) return 0;
    const budgetBound = remainingBudget * maxDensity;
    const slotBound = categories.reduce(
      (sum, type) => sum + (remainingSlots[type] || 0) * suffixMaxValue[type][startIndex],
      0
    );
    const perCategoryBound = categories.reduce((sum, type) => {
      const slots = remainingSlots[type] || 0;
      const categoryDensity = suffixMaxDensity[type][startIndex];
      const categoryValue = suffixMaxValue[type][startIndex];
      return sum + Math.min(slots * categoryValue, remainingBudget * categoryDensity);
    }, 0);

    const relaxedBound = lambda => {
      let bound = lambda * remainingBudget;
      for (const type of categories) {
        const slots = remainingSlots[type] || 0;
        let bestRelaxedValue = 0;
        for (const item of activeItemsByType[type]) {
          bestRelaxedValue = Math.max(bestRelaxedValue, item.value - lambda * item.cost);
        }
        bound += slots * bestRelaxedValue;
      }
      return bound;
    };

    let lambdaLow = 0;
    let lambdaHigh = maxDensity;
    for (let iteration = 0; iteration < 20; iteration += 1) {
      const lambda = (lambdaLow + lambdaHigh) / 2;
      let selectedCost = 0;
      for (const type of categories) {
        const slots = remainingSlots[type] || 0;
        let bestNetValue = 0;
        let bestCost = 0;
        for (const item of activeItemsByType[type]) {
          const netValue = item.value - lambda * item.cost;
          if (netValue > bestNetValue) {
            bestNetValue = netValue;
            bestCost = item.cost;
          }
        }
        selectedCost += slots * bestCost;
      }
      if (remainingBudget > selectedCost) lambdaHigh = lambda;
      else lambdaLow = lambda;
    }
    const lagrangianBound = Math.min(relaxedBound(lambdaLow), relaxedBound(lambdaHigh));

    return Math.min(budgetBound, slotBound, perCategoryBound, lagrangianBound);
  }

  function search(index, remainingBudget, remainingSlots, value) {
    if (searchAborted) return;
    if (deadline && Date.now() >= deadline) {
      searchAborted = true;
      return;
    }
    nodesVisited += 1;
    if (index >= items.length) {
      if (value > bestValue) {
        bestValue = value;
        bestCounts = [...currentCounts];
      }
      return;
    }

    if (value + upperBound(index, remainingBudget, remainingSlots) <= bestValue) return;

    const item = items[index];
    const maximum = Math.min(
      remainingSlots[item.type] || 0,
      Math.floor(remainingBudget / item.cost)
    );

    for (let quantity = maximum; quantity >= 0; quantity -= 1) {
      if (deadline && Date.now() >= deadline) {
        searchAborted = true;
        break;
      }
      currentCounts[index] = quantity;
      remainingSlots[item.type] -= quantity;
      search(
        index + 1,
        remainingBudget - quantity * item.cost,
        remainingSlots,
        value + quantity * item.value
      );
      remainingSlots[item.type] += quantity;
    }
    currentCounts[index] = 0;
  }

  search(0, budget, { ...slotLimits }, 0);
  return { value: bestValue, counts: bestCounts, nodesVisited, exact: !searchAborted };
}

function calculateBestArmy(
  playerLevel,
  upkeepBudget,
  allianceSize,
  optimizeType,
  unitTypeFilter,
  searchOptions = {}
) {
  const slotLimits = calculateSlotLimits(playerLevel, allianceSize);
  const typesToInclude = unitTypeFilter === 'all' ? UNIT_TYPES : [unitTypeFilter];
  const categoryInfo = [];
  let baselineObjective = 0;
  let baselineUpkeep = 0;
  let fullArmyCost = 0;
  const items = [];

  for (const unitType of typesToInclude) {
    const availableUnits = getAvailableUnits(playerLevel, unitType);
    const maxSlots = slotLimits[unitType];
    if (!availableUnits.length || maxSlots <= 0) continue;

    const freeUnits = availableUnits.filter(unit => unit.upkeep === 0);
    const baseUnit = bestUnit(freeUnits.length ? freeUnits : availableUnits, optimizeType);
    const strongestUnit = bestUnit(availableUnits, optimizeType);
    const baseValue = getUnitValue(baseUnit, optimizeType);
    baselineObjective += maxSlots * baseValue;
    baselineUpkeep += maxSlots * baseUnit.upkeep;
    fullArmyCost += maxSlots * strongestUnit.upkeep;

    categoryInfo.push({ unitType, maxSlots, baseUnit, strongestUnit });

    for (const unit of availableUnits) {
      const incrementalValue = getUnitValue(unit, optimizeType) - baseValue;
      if (unit.upkeep > 0 && incrementalValue > 0) {
        items.push({
          type: unitType,
          unit,
          cost: unit.upkeep,
          value: incrementalValue,
          ratio: incrementalValue / unit.upkeep
        });
      }
    }
  }

  // Once the best unlocked unit fills every slot, no other composition can
  // improve the selected metric. This also avoids searching needlessly large
  // budgets.
  if (upkeepBudget >= fullArmyCost) {
    const army = categoryInfo.map(info => ({
      ...info.strongestUnit,
      type: UNIT_TYPE_LABELS[info.unitType],
      quantity: info.maxSlots,
      maxSlots: info.maxSlots,
      totalUpkeep: info.maxSlots * info.strongestUnit.upkeep,
      totalAttack: info.maxSlots * info.strongestUnit.attack,
      totalDefense: info.maxSlots * info.strongestUnit.defense
    }));
    return buildArmyResult(army, slotLimits, upkeepBudget, allianceSize, optimizeType, 0);
  }

  const reducedItems = removeDominatedItems(items)
    .sort((a, b) => b.ratio - a.ratio || b.value - a.value || a.cost - b.cost);
  const searchResult = optimizeArmyItems(
    reducedItems,
    slotLimits,
    Math.max(0, upkeepBudget - baselineUpkeep),
    searchOptions
  );
  const quantities = new Map();
  const paidSlotsByType = Object.fromEntries(UNIT_TYPES.map(type => [type, 0]));

  reducedItems.forEach((item, index) => {
    const quantity = searchResult.counts[index] || 0;
    if (quantity > 0) {
      quantities.set(`${item.type}:${item.unit.name}`, quantity);
      paidSlotsByType[item.type] += quantity;
    }
  });
  for (const info of categoryInfo) {
    quantities.set(
      `${info.unitType}:${info.baseUnit.name}`,
      info.maxSlots - paidSlotsByType[info.unitType]
    );
  }

  const army = [];
  for (const info of categoryInfo) {
    const categoryUnits = [info.baseUnit, ...reducedItems
      .filter(item => item.type === info.unitType)
      .map(item => item.unit)];
    for (const unit of categoryUnits) {
      const quantity = quantities.get(`${info.unitType}:${unit.name}`) || 0;
      if (quantity <= 0) continue;
      army.push({
        ...unit,
        type: UNIT_TYPE_LABELS[info.unitType],
        quantity,
        maxSlots: info.maxSlots,
        totalUpkeep: quantity * unit.upkeep,
        totalAttack: quantity * unit.attack,
        totalDefense: quantity * unit.defense
      });
    }
  }

  return buildArmyResult(
    army,
    slotLimits,
    upkeepBudget,
    allianceSize,
    optimizeType,
    searchResult.nodesVisited,
    searchResult.exact
  );
}

function buildArmyResult(
  army,
  slotLimits,
  upkeepBudget,
  allianceSize,
  optimizeType,
  nodesVisited,
  exact = true
) {
  const totalUpkeep = army.reduce((sum, unit) => sum + unit.totalUpkeep, 0);
  return {
    army,
    slotLimits,
    allianceSize,
    activeAllianceMembers: slotLimits.allianceMembers,
    remainingUpkeep: upkeepBudget - totalUpkeep,
    totalAttack: army.reduce((sum, unit) => sum + unit.totalAttack, 0),
    totalDefense: army.reduce((sum, unit) => sum + unit.totalDefense, 0),
    totalUpkeep,
    upkeepBudget,
    optimizeType,
    nodesVisited,
    exact
  };
}


// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Display results
function displayResults(result) {
  const resultsSection = document.getElementById('results');
  const resultsContent = document.getElementById('results-content');
  
  // Show the results section
  resultsSection.style.display = 'block';
  
  if (result.army.length === 0) {
    resultsContent.innerHTML = '<div style="color: white;">No units available with the given parameters.</div>';
    return;
  }
  
  // Map unit names to image files
  const getUnitImage = (unitName, unitType) => {
    const infantryMap = {
      "Recruit": "101.jpg", "Guard": "102.jpg", "Foot Soldier": "103.jpg", "Militia": "104.jpg",
      "Infantryman": "105.jpg", "Guardman": "106.jpg", "Grenadier": "107.jpg", "Lance Corporal": "108.jpg",
      "Paratrooper": "109.jpg", "Flamethrower": "110.jpg", "Military Police": "111.jpg", "Frogman Marine": "112.jpg",
      "Artillerist": "113.jpg", "Partisan": "114.jpg", "Sniper": "115.jpg", "Mountain Infantry": "116.jpg",
      "Mechanised Infantry": "117.jpg", "Commando Unit": "118.jpg", "Combat Engineer": "119.jpg",
      "Special Forces Unit": "120.jpg", "Mobile Infantry": "121.jpg", "Elite": "122.jpg", "Commander": "123.jpg",
      "Officer": "124.jpg", "Hi-tech Soldier": "125.jpg", "Super Warrior": "126.jpg", "Drone Pilot": "127.jpg",
      "Pathfinder TX": "128.jpg", "Bomb Disposal": "129.jpg", "Field Mechanic": "130.jpg", "Jetpack Pilot": "131.jpg",
      "Infiltrator": "132.jpg", "Exoskeleton": "133.jpg", "Cyborg Veteran": "134.jpg", "Chem Berserker": "135.jpg",
      "Lamprey": "136.jpg", "Arctic Wolf": "137.jpg", "Aquanaut": "138.jpg", "D-800": "139.jpg", "Gen Soldier": "140.jpg"
    };
    
    const vehiclesMap = {
      "Motorbike": "1001.jpg", "Jeep": "1002.jpg", "Truck": "1003.jpg", "M113": "1004.jpg",
      "Reconnaissance Drone": "1005.jpg", "B1 Centauro": "1006.jpg", "Light Artillery": "1007.jpg",
      "Hovercraft": "1008.jpg", "Luchs": "1009.jpg", "Anti-air Weaponry": "1010.jpg",
      "Weaponised Drones": "1011.jpg", "Howitzer": "1012.jpg", "M-84": "1013.jpg", "ZBD97": "1014.jpg",
      "Multiple Rocket Launcher": "1015.jpg", "Corvette": "1016.jpg", "T-90": "1017.jpg",
      "Short-range Ballistic Missile": "1018.jpg", "M1 Abrams": "1019.jpg", "SDI Laser": "1020.jpg",
      "Railgun": "1021.jpg", "Gauss Tank": "1022.jpg", "Camotransporter": "1023.jpg",
      "Microwave Tank": "1024.jpg", "EMP Sensor": "1025.jpg", "Battle Walker": "1026.jpg",
      "Drone Swarm": "1027.jpg", "Commando Tank": "1028.jpg", "Mech Titan": "1029.jpg",
      "Canis Cursor": "1030.jpg", "Nano Krill": "1031.jpg", "Aqua Hunter": "1032.jpg",
      "Kraken Bomb": "1033.jpg", "Hammerhead Shark Transporter": "1034.jpg", "Manta Ray": "1035.jpg"
    };
    
    const aircraftMap = {
      "MiG-23": "2001.jpg", "Phantom": "2002.jpg", "AWACS": "2003.jpg", "F-16": "2004.jpg",
      "Jak-38": "2005.jpg", "Mirage": "2006.jpg", "Harrier": "2007.jpg", "MiG-29": "2008.jpg",
      "Hornet": "2009.jpg", "Apache": "2010.jpg", "Eurofighter": "2011.jpg", "Nighthawk": "2012.jpg",
      "F-35 Lightning II": "2013.jpg", "Gunship": "2014.jpg", "MH-53E": "2115.jpg", "Boeing V-22": "2116.jpg",
      "Ikarus S.U.I.T.": "2117.jpg", "Orbital Headquarters": "2118.jpg", "Orbital Troop Transporter": "2119.jpg",
      "Ion Cannon": "2120.jpg", "Sunspear": "2121.jpg", "Orbital Missile Defence": "2122.jpg"
    };
    
    if (unitType === "Infantry") return infantryMap[unitName] || "101.jpg";
    if (unitType === "Vehicles") return vehiclesMap[unitName] || "1001.jpg";
    if (unitType === "Aircraft") return aircraftMap[unitName] || "2001.jpg";
    return "101.jpg";
  };
  
  let html = '';
  
  // Units grid
  if (result.army.length > 0) {
    html += `<div style="display:grid; grid-template-columns: repeat(2, 92px); gap:6px 8px; justify-content:start;">`;
    result.army.forEach(unit => {
      const imgSrc = getUnitImage(unit.name, unit.type);
      html += `
        <div title="${unit.name}" style="background-color: rgba(0,0,0,0.3); border-radius:8px; padding:3px; width:85px; min-height:112px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
          <img src="${imgSrc}" alt="${unit.name}" style="width:58px; height:58px; object-fit:contain; margin-bottom:3px;" />
          <span style="color:white; font-size:12px; font-weight:bold;">${formatNumber(unit.quantity)}x</span>
          <span style="color:#ddd; font-size:10px; line-height:11px; margin-top:2px;">${unit.name}</span>
        </div>
      `;
    });
    html += `</div>`;
  }
  
  // Summary stats box
  html += `
    <div style="margin-top:12px; padding:10px; border:2px solid rgba(255,255,255,0.2); border-radius:8px; background: rgba(0,0,0,0.25); display:flex; flex-direction:column; gap:5px; width:fit-content;">
      <div style="display:flex; align-items:center; gap:6px;">
        <img src="att.png" style="width:20px; height:20px;" />
        <span style="color:white; margin:0; font-size:13px;"><strong>Total Attack:</strong> ${formatNumber(result.totalAttack)}</span>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <img src="def.png" style="width:20px; height:20px;" />
        <span style="color:white; margin:0; font-size:13px;"><strong>Total Defense:</strong> ${formatNumber(result.totalDefense)}</span>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <img src="upkeep.png" style="width:20px; height:20px;" />
        <span style="color:white; margin:0; font-size:13px;"><strong>Total Upkeep:</strong> ${formatNumber(result.totalUpkeep)}</span>
      </div>
      <div style="color:white; font-size:13px;"><strong>Budget remaining:</strong> ${formatNumber(result.remainingUpkeep)}</div>
      <div style="color:white; font-size:13px;"><strong>Alliance used:</strong> ${formatNumber(result.activeAllianceMembers)} of ${formatNumber(result.allianceSize)} (level cap)</div>
      <div style="color:white; font-size:13px;"><strong>Slots:</strong> ${formatNumber(result.slotLimits.infantry)} infantry · ${formatNumber(result.slotLimits.vehicles)} vehicles · ${formatNumber(result.slotLimits.aircraft)} aircraft</div>
    </div>
  `;

  if (result.exact === false) {
    html += `
      <div style="margin-top:10px; color:#ffd27a; font-size:12px; max-width:320px;">
        Best safe result found before the calculation limit. Try a smaller budget for a fully exact search.
      </div>
    `;
  }
  
  resultsContent.innerHTML = html;
}

function parseArmyNumber(value) {
  const normalized = String(value ?? '').replace(/,/g, '').trim();
  if (!normalized) return NaN;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function calculateInWorker(params, onResult, onError) {
  if (typeof Worker !== 'function') {
    onResult(calculateBestArmy(
      params.playerLevel,
      params.upkeepBudget,
      params.allianceSize,
      params.optimizeType,
      params.unitTypeFilter,
      { deadline: Date.now() + 1000 }
    ));
    return null;
  }

  let worker;
  try {
    worker = new Worker('best_army.js');
  } catch (error) {
    onError(error?.message || 'The army calculation could not be started.');
    return null;
  }
  worker.onmessage = event => {
    if (event.data?.type === 'error') onError(event.data.message);
    else onResult(event.data.result);
    worker.terminate();
  };
  worker.onerror = event => {
    worker.terminate();
    onError(event.message || 'The army calculation could not be completed.');
  };
  worker.postMessage({ ...params, timeLimitMs: 5000 });
  return worker;
}

if (typeof document === 'undefined' && typeof self !== 'undefined') {
  self.onmessage = event => {
    try {
      const params = event.data || {};
      const timeLimitMs = Number.isFinite(params.timeLimitMs)
        ? Math.max(250, Math.min(params.timeLimitMs, 10000))
        : 5000;
      const result = calculateBestArmy(
        params.playerLevel,
        params.upkeepBudget,
        params.allianceSize,
        params.optimizeType,
        params.unitTypeFilter || 'all',
        { deadline: Date.now() + timeLimitMs }
      );
      self.postMessage({ type: 'result', result });
    } catch (error) {
      self.postMessage({
        type: 'error',
        message: error?.message || 'The army calculation could not be completed.'
      });
    }
  };
} else {
  let activeWorker = null;
  const calculateButton = document.getElementById('calculate');

  calculateButton.addEventListener('click', function() {
    const playerLevel = Math.floor(parseArmyNumber(document.getElementById('player-level').value) || 0);
    const upkeepBudget = Math.floor(parseArmyNumber(document.getElementById('upkeep-budget').value) || 0);
    const allianceSize = Math.floor(parseArmyNumber(document.getElementById('alliance-size').value) || 0);
    const optimizeType = document.getElementById('optimize-type').value;
    const unitTypeFilter = 'all';

    if (playerLevel <= 0 || playerLevel > 250) {
      alert('Please enter a valid player level (1-250).');
      return;
    }

    if (upkeepBudget < 0) {
      alert('Please enter a valid upkeep budget (0 or higher).');
      return;
    }

    if (allianceSize <= 0) {
      alert('Please enter a valid alliance size (1 or higher).');
      return;
    }

    if (activeWorker) activeWorker.terminate();
    calculateButton.disabled = true;
    const buttonLabel = calculateButton.querySelector('span');
    if (buttonLabel) buttonLabel.textContent = 'Calculating...';

    activeWorker = calculateInWorker(
      { playerLevel, upkeepBudget, allianceSize, optimizeType, unitTypeFilter },
      result => {
        displayResults(result);
        calculateButton.disabled = false;
        if (buttonLabel) buttonLabel.textContent = 'Calculate Best Army';
        activeWorker = null;
      },
      message => {
        alert(message);
        calculateButton.disabled = false;
        if (buttonLabel) buttonLabel.textContent = 'Calculate Best Army';
        activeWorker = null;
      }
    );
  });
}
