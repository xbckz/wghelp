const assert = require('node:assert/strict');
const { loadCalculator, randomGenerator, armyOracle, checkArmy } = require('./army-test-helpers.cjs');
const calc = loadCalculator();
const random = randomGenerator(0xa17ca1c);
let comparisons = 0;
let searched = 0;
for (let level = 1; level <= 350; level++) {
  for (const goal of ['attack', 'defense', 'balanced']) {
    for (const filter of ['all', ...calc.UNIT_TYPES]) {
      const oracle = armyOracle(calc.unitData, level, 1, goal, filter);
      const units = (filter === 'all' ? calc.UNIT_TYPES : [filter])
        .flatMap(type => calc.unitData[type].filter(unit => unit.unlock_lvl <= level));
      const budgets = new Set([0, 1, 39, 40, 449, 450, 869, 870,
        9999, 10000, 10001, 100000, 1000000, 10000000, Number.MAX_SAFE_INTEGER]);
      // Include both sides of every newly unlocked troop's upkeep threshold.
      for (const unit of units.filter(unit => unit.unlock_lvl === level && unit.upkeep > 0)) {
        budgets.add(unit.upkeep - 1);
        budgets.add(unit.upkeep);
        budgets.add(unit.upkeep + 1);
      }
      for (let i = 0; i < 4; i++) budgets.add(random(16000000));
      let prior = -Infinity;
      for (const budget of [...budgets].sort((a, b) => a - b)) {
        const result = calc.calculateBestArmy(level, budget, 1, goal, filter);
        const actual = checkArmy(assert, calc, result, level, budget, 1, goal, filter);
        assert.equal(actual, oracle(budget), `level=${level} budget=${budget} goal=${goal} filter=${filter}`);
        assert.ok(actual >= prior, 'More budget cannot worsen the chosen objective');
        prior = actual;
        if (result.nodesVisited > 0) searched++;
        comparisons++;
      }
    }
  }
  if (level % 25 === 0) console.log(`Levels 1-${level}: ${comparisons} independent DP comparisons passed`);
}
// Larger small armies catch allocation interactions across more combat slots.
for (const level of [10, 15, 22, 43, 86, 115, 185, 224, 350]) {
  for (const goal of ['attack', 'defense', 'balanced']) {
    const oracle = armyOracle(calc.unitData, level, 2, goal);
    for (let i = 0; i < 15; i++) {
      const budget = random(30000000);
      const result = calc.calculateBestArmy(level, budget, 2, goal);
      const actual = checkArmy(assert, calc, result, level, budget, 2, goal);
      assert.equal(actual, oracle(budget), `two-member army: level=${level} budget=${budget} goal=${goal}`);
      comparisons++;
    }
  }
}
console.log(`Passed ${comparisons} real-data optimum comparisons; ${searched} exercised branch-and-bound.`);
