const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/js/best_army.js'), 'utf8');

function loadCalculator(extra = {}) {
  const context = vm.createContext({ self: {}, ...extra });
  vm.runInContext(source, context, { filename: 'assets/js/best_army.js' });
  return vm.runInContext(`({ unitData, UNIT_TYPES, UNIT_PURCHASE_PRICES,
    calculateBestArmy, calculateSlotLimits, optimizeArmyItems, seedSearch,
    removeDominatedItems, parseArmyNumber, getAvailableUnits, getUnitValue,
    displayResults, calculateInWorker, buildArmyResult, exactArmyRelaxation, self })`, context);
}

// Independent exhaustive enumeration. No dominance removal, baseline
// transformation, greedy incumbent, relaxation, or pruning from production.
function enumerateItems(items, slots, budget) {
  let best = 0;
  const counts = Array(items.length).fill(0);
  function visit(index, remaining, value) {
    if (index === items.length) {
      best = Math.max(best, value);
      return;
    }
    const item = items[index];
    for (let count = 0; count <= slots[item.type] && count * item.cost <= remaining; count++) {
      slots[item.type] -= count;
      counts[index] = count;
      visit(index + 1, remaining - count * item.cost, value + count * item.value);
      slots[item.type] += count;
    }
  }
  visit(0, budget, 0);
  return best;
}

function randomGenerator(seed) {
  let state = seed >>> 0;
  return max => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return Math.floor((state / 4294967296) * max);
  };
}

// A separate minimum-cost dynamic program over raw attack/defense totals.
// Each transition chooses one actual troop for one combat slot. This deliberately
// does not use the production optimizer's incremental values or pruning.
function armyOracle(data, level, alliance, goal, filter = 'all') {
  const members = Math.min(alliance, level * 5);
  const slots = { infantry: members * 10, vehicles: members * 3, aircraft: members };
  let costs = new Float64Array([0]);
  for (const type of Object.keys(slots)) {
    if (filter !== 'all' && filter !== type) continue;
    const units = data[type].filter(unit => unit.unlock_lvl <= level).map(unit => ({
      value: goal === 'attack' ? unit.attack : goal === 'defense' ? unit.defense : unit.attack + unit.defense,
      cost: unit.upkeep
    }));
    const maximum = Math.max(...units.map(unit => unit.value));
    for (let slot = 0; slot < slots[type]; slot++) {
      const next = new Float64Array(costs.length + maximum).fill(Infinity);
      for (let value = 0; value < costs.length; value++) {
        if (!Number.isFinite(costs[value])) continue;
        for (const unit of units) {
          const cost = costs[value] + unit.cost;
          if (cost < next[value + unit.value]) next[value + unit.value] = cost;
        }
      }
      costs = next;
    }
  }
  return budget => {
    for (let value = costs.length - 1; value >= 0; value--) {
      if (costs[value] <= budget) return value;
    }
    throw new Error('Reference army is infeasible');
  };
}

function checkArmy(assert, calc, result, level, budget, alliance, goal, filter = 'all') {
  const members = Math.min(alliance, level * 5);
  const slots = { infantry: members * 10, vehicles: members * 3, aircraft: members };
  const labels = { Infantry: 'infantry', Vehicles: 'vehicles', Aircraft: 'aircraft' };
  const used = { infantry: 0, vehicles: 0, aircraft: 0 };
  let attack = 0, defense = 0, upkeep = 0, price = 0;
  const names = new Set();
  for (const unit of result.army) {
    const type = labels[unit.type];
    assert.ok(type, 'Recognized unit category');
    assert.ok(filter === 'all' || filter === type, 'Category filter is respected');
    const raw = calc.unitData[type].find(candidate => candidate.name === unit.name);
    assert.ok(raw && raw.unlock_lvl <= level, 'Only unlocked regular units');
    assert.ok(Number.isSafeInteger(unit.quantity) && unit.quantity > 0, 'Positive integer quantities');
    assert.ok(!names.has(`${type}:${unit.name}`), 'No duplicate result rows');
    names.add(`${type}:${unit.name}`);
    assert.equal(unit.attack, raw.attack);
    assert.equal(unit.defense, raw.defense);
    assert.equal(unit.upkeep, raw.upkeep);
    assert.equal(unit.price, calc.UNIT_PURCHASE_PRICES[type][unit.name]);
    assert.equal(unit.totalAttack, unit.quantity * raw.attack);
    assert.equal(unit.totalDefense, unit.quantity * raw.defense);
    assert.equal(unit.totalUpkeep, unit.quantity * raw.upkeep);
    assert.equal(unit.maxSlots, slots[type]);
    used[type] += unit.quantity;
    attack += unit.quantity * raw.attack;
    defense += unit.quantity * raw.defense;
    upkeep += unit.quantity * raw.upkeep;
    price += unit.quantity * calc.UNIT_PURCHASE_PRICES[type][unit.name];
  }
  for (const type of Object.keys(slots)) {
    assert.equal(result.slotLimits[type], slots[type]);
    assert.equal(used[type], filter === 'all' || filter === type ? slots[type] : 0);
  }
  assert.ok(upkeep <= budget, 'Shared budget is respected');
  assert.equal(result.totalAttack, attack);
  assert.equal(result.totalDefense, defense);
  assert.equal(result.totalPrice, price);
  assert.equal(result.totalUpkeep, upkeep);
  assert.equal(result.remainingUpkeep, budget - upkeep);
  assert.equal(result.activeAllianceMembers, members);
  assert.equal(result.allianceSize, alliance);
  assert.equal(result.optimizeType, goal);
  assert.equal(result.exact, true);
  return goal === 'attack' ? attack : goal === 'defense' ? defense : attack + defense;
}

module.exports = { root, source, loadCalculator, enumerateItems, randomGenerator, armyOracle, checkArmy };
