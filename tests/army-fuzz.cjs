const assert = require('node:assert/strict');
const { loadCalculator, enumerateItems, randomGenerator } = require('./army-test-helpers.cjs');
const calc = loadCalculator();
const random = randomGenerator(0x5a17c0de);
const cases = Number(process.env.ARMY_FUZZ_CASES || 30000);
let searched = 0;
for (let trial = 0; trial < cases; trial++) {
  const scale = trial % 4 === 0 ? 100000000003 : 1;
  const slots = { infantry: random(4), vehicles: random(4), aircraft: random(3) };
  const items = Array.from({ length: 1 + random(8) }, () => {
    const cost = (1 + random(25)) * scale;
    const value = (1 + random(60)) * (trial % 5 === 0 ? 100000000007 : 1) + random(2);
    return { type: calc.UNIT_TYPES[random(3)], cost, value, ratio: value / cost };
  });
  const budget = random(100) * scale + (scale > 1 ? random(3) - 1 : 0);
  if (budget < 0) continue;
  const expected = enumerateItems(items, { ...slots }, budget);
  const result = calc.optimizeArmyItems(items, slots, budget);
  const actualValue = result.counts.reduce((sum, count, i) => sum + count * items[i].value, 0);
  const actualCost = result.counts.reduce((sum, count, i) => sum + count * items[i].cost, 0);
  const actualSlots = Object.fromEntries(calc.UNIT_TYPES.map(type => [type,
    result.counts.reduce((sum, count, i) => sum + (items[i].type === type ? count : 0), 0)]));
  try {
    assert.equal(result.value, expected);
    assert.equal(actualValue, result.value);
    assert.ok(actualCost <= budget);
    assert.ok(result.counts.every(count => Number.isSafeInteger(count) && count >= 0));
    for (const type of calc.UNIT_TYPES) assert.ok(actualSlots[type] <= slots[type]);
  } catch (error) {
    console.error(JSON.stringify({ trial, items, slots, budget, expected, result, actualValue, actualCost, actualSlots }, null, 2));
    throw error;
  }
  if (result.nodesVisited > 0) searched++;
  if ((trial + 1) % 50000 === 0) console.log(`${trial + 1} independent exhaustive comparisons passed (${searched} exercised search)`);
}
console.log(`Passed ${cases} generated optimizer cases; ${searched} exercised branch-and-bound.`);
