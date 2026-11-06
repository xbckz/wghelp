const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { Worker } = require('node:worker_threads');
const { root, source, loadCalculator, enumerateItems, armyOracle, checkArmy } = require('./army-test-helpers.cjs');
const calc = loadCalculator();

test('all 97 regular troop records match the published guides', () => {
  let checked = 0;
  for (const [type, file] of Object.entries({ infantry: 'soldiers/index.html', vehicles: 'machinery/index.html', aircraft: 'aeroplanes/index.html' })) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const headers = [...html.matchAll(/class="headline-wrapper"[^]*?<span[^>]*>([\s\S]*?)<\/span>/g)];
    const records = new Map(headers.map((match, index) => [match[1].trim(),
      html.slice(match.index, headers[index + 1]?.index ?? html.length)]));
    for (const unit of calc.unitData[type]) {
      const record = records.get(unit.name);
      assert.ok(record, `${file}: ${unit.name} exists`);
      const stat = label => Number((record.match(new RegExp(`${label}:[\\s\\S]*?<strong>([\\d,]+)<`))?.[1] ?? '0').replace(/,/g, ''));
      assert.equal(unit.attack, stat('Attack'), `${unit.name} attack`);
      assert.equal(unit.defense, stat('Defence'), `${unit.name} defense`);
      assert.equal(unit.upkeep, stat('Upkeep'), `${unit.name} upkeep`);
      assert.equal(unit.unlock_lvl, stat('Unlock lvl'), `${unit.name} unlock`);
      assert.ok(Number.isSafeInteger(calc.UNIT_PURCHASE_PRICES[type][unit.name]) && calc.UNIT_PURCHASE_PRICES[type][unit.name] > 0);
      checked++;
    }
    assert.deepEqual(Object.keys(calc.UNIT_PURCHASE_PRICES[type]).sort(), Array.from(calc.unitData[type], unit => unit.name).sort());
  }
  assert.equal(checked, 97);
});

test('every unlock boundary includes a troop exactly when unlocked', () => {
  for (const type of calc.UNIT_TYPES) {
    for (const unit of calc.unitData[type]) {
      if (unit.unlock_lvl > 0) assert.ok(!calc.getAvailableUnits(unit.unlock_lvl - 1, type).some(entry => entry.name === unit.name));
      assert.ok(calc.getAvailableUnits(Math.max(1, unit.unlock_lvl), type).some(entry => entry.name === unit.name));
    }
  }
});

test('all 350 levels obey alliance caps and zero/saturated budgets', () => {
  for (let level = 1; level <= 350; level++) {
    for (const alliance of [1, level * 5 - 1, level * 5, level * 5 + 1, Number.MAX_SAFE_INTEGER]) {
      for (const goal of ['attack', 'defense', 'balanced']) {
        for (const budget of [0, Number.MAX_SAFE_INTEGER]) {
          const result = calc.calculateBestArmy(level, budget, alliance, goal);
          const actual = checkArmy(assert, calc, result, level, budget, alliance, goal);
          let expected = 0;
          for (const type of calc.UNIT_TYPES) {
            const units = calc.unitData[type].filter(unit => unit.unlock_lvl <= level && (budget > 0 || unit.upkeep === 0));
            expected += result.slotLimits[type] * Math.max(...units.map(unit => goal === 'attack' ? unit.attack : goal === 'defense' ? unit.defense : unit.attack + unit.defense));
          }
          assert.equal(actual, expected);
          assert.equal(result.nodesVisited, 0);
        }
      }
    }
  }
});

test('invalid API inputs are rejected before any army is returned', () => {
  const invalid = [NaN, Infinity, -Infinity, undefined, null, '', '10', -1, 0.5, Number.MAX_SAFE_INTEGER + 1];
  for (const value of [...invalid, 0, 351]) assert.throws(() => calc.calculateBestArmy(value, 100, 1, 'attack'), /level/);
  for (const value of invalid) assert.throws(() => calc.calculateBestArmy(10, value, 1, 'attack'), /budget/);
  for (const value of [...invalid, 0]) assert.throws(() => calc.calculateBestArmy(10, 100, value, 'attack'), /alliance/);
  for (const goal of ['attak', '', null, 42]) assert.throws(() => calc.calculateBestArmy(10, 100, 1, goal), /choose attack/);
  for (const filter of ['soldiers', '', null, 42]) assert.throws(() => calc.calculateBestArmy(10, 100, 1, 'attack', filter), /unit type/);
  checkArmy(assert, calc, calc.calculateBestArmy(10, 100, 1), 10, 100, 1, 'balanced');
});

test('numeric parsing accepts decimal and grouped input without accepting alternate number syntax', () => {
  for (const [input, expected] of [['0', 0], ['1,234,567', 1234567], [' 350 ', 350], ['+12', 12], ['12.5', 12.5], ['.5', 0.5], ['-1', -1]]) {
    assert.equal(calc.parseArmyNumber(input), expected);
  }
  for (const input of ['', ' ', null, undefined, 'abc', '1e3', '0x10', 'Infinity', 'NaN', '1.2.3']) {
    assert.ok(Number.isNaN(calc.parseArmyNumber(input)));
  }
});

test('result validation stops inconsistent, fractional, duplicate, over-budget, and over-slot armies', () => {
  const result = calc.calculateBestArmy(10, 100, 1, 'attack');
  for (const corrupt of [
    army => { army[0].quantity += 0.5; },
    army => { army[0].totalAttack++; },
    army => { army[0].totalDefense++; },
    army => { army[0].totalUpkeep++; },
    army => { army.push({ ...army[0] }); },
    army => { army[0].type = 'unknown'; },
    army => { army[0].quantity += 20; army[0].totalAttack = army[0].quantity * army[0].attack; army[0].totalDefense = army[0].quantity * army[0].defense; army[0].totalUpkeep = army[0].quantity * army[0].upkeep; }
  ]) {
    const army = JSON.parse(JSON.stringify(result.army));
    corrupt(army);
    assert.throws(() => calc.buildArmyResult(army, result.slotLimits, 100, 1, 'attack', 0), /calculated army/);
  }
  assert.throws(() => calc.buildArmyResult(result.army, result.slotLimits, 79, 1, 'attack', 0), /budget/);
});

test('balanced maximizes the sum of attack and defense', () => {
  const oracle = armyOracle(calc.unitData, 1, 1, 'balanced');
  const result = calc.calculateBestArmy(1, 0, 1, 'balanced');
  assert.equal(result.totalAttack + result.totalDefense, oracle(0));
  assert.equal(result.army.find(unit => unit.type === 'Aircraft').name, 'Phantom');
});

test('dominance only removes strictly inferior troops within the same slot pool', () => {
  const items = [
    { type: 'infantry', cost: 10, value: 5 },
    { type: 'infantry', cost: 10, value: 5 },
    { type: 'infantry', cost: 11, value: 4 },
    { type: 'vehicles', cost: 11, value: 4 },
    { type: 'infantry', cost: 12, value: 7 }
  ];
  const kept = calc.removeDominatedItems(items);
  assert.equal(kept.length, 4);
  assert.ok(!kept.includes(items[2]));
  assert.ok(kept.includes(items[3]));
});

test('optimizer handles ties, absent slot pools, unaffordable upgrades, and integer thresholds', () => {
  for (const slots of [{ infantry: 0, vehicles: 0, aircraft: 0 }, { infantry: 3, vehicles: 2, aircraft: 1 }]) {
    const items = [
      { type: 'infantry', cost: 7, value: 11 },
      { type: 'infantry', cost: 7, value: 11 },
      { type: 'infantry', cost: 11, value: 18 },
      { type: 'vehicles', cost: 5, value: 9 },
      { type: 'aircraft', cost: 19, value: 38 }
    ].map(item => ({ ...item, ratio: item.value / item.cost }));
    for (let budget = 0; budget <= 100; budget++) {
      const result = calc.optimizeArmyItems(items, slots, budget);
      assert.equal(result.value, enumerateItems(items, { ...slots }, budget));
      assert.equal(result.counts.reduce((sum, count, i) => sum + count * items[i].value, 0), result.value);
    }
  }
  assert.equal(calc.optimizeArmyItems([], { infantry: 10, vehicles: 3, aircraft: 1 }, 100).value, 0);
});

test('single-unit armies agree with direct arithmetic at large integer boundaries', () => {
  for (const cost of [1, 3, 7, 100000000003, 900719925474099]) {
    for (const value of [1, 31, 99999999999]) {
      const item = { type: 'infantry', cost, value, ratio: value / cost };
      for (let quantity = 1; quantity <= 5; quantity++) {
        for (const offset of [-1, 0, 1]) {
          const budget = quantity * cost + offset;
          const result = calc.optimizeArmyItems([item], { infantry: 5, vehicles: 0, aircraft: 0 }, budget);
          assert.equal(result.value, Math.min(5, Math.floor(budget / cost)) * value);
        }
      }
    }
  }
});

function browserHarness(options = {}) {
  const elements = {};
  const alerts = [];
  const workers = [];
  const label = { textContent: 'Calculate Best Army' };
  for (const [id, value] of Object.entries({ 'player-level': '10', 'upkeep-budget': '100', 'alliance-size': '1', 'optimize-type': 'attack', calculate: '' , results: '', 'results-content': '' })) {
    elements[id] = { value, style: {}, innerHTML: '', disabled: false, listeners: {},
      addEventListener(event, callback) { this.listeners[event] = callback; },
      querySelector: () => label,
      querySelectorAll: () => [] };
  }
  const document = { getElementById: id => elements[id], querySelectorAll: () => [] };
  class MockWorker {
    constructor(url) { this.url = url; this.terminated = false; workers.push(this); }
    postMessage(params) { this.params = params; }
    terminate() { this.terminated = true; }
  }
  const browser = loadCalculator({ document, Worker: options.noWorker ? undefined : MockWorker, alert: message => alerts.push(message) });
  return { browser, elements, alerts, workers, label, click: () => elements.calculate.listeners.click() };
}

test('browser rejects blank, malformed, fractional, negative, and unsafe inputs', () => {
  for (const [id, invalid] of Object.entries({
    'player-level': ['', 'abc', '0', '-1', '1.5', 'Infinity'],
    'upkeep-budget': ['', 'abc', '-1', '1.5', 'Infinity', '9007199254740992'],
    'alliance-size': ['', 'abc', '0', '-1', '1.5', 'Infinity', '9007199254740992']
  })) {
    for (const value of invalid) {
      const harness = browserHarness();
      harness.elements[id].value = value;
      harness.click();
      assert.equal(harness.workers.length, 0, `${id}=${value} did not start a worker`);
      assert.equal(harness.alerts.length, 1);
      assert.equal(harness.elements.calculate.disabled, false);
    }
  }
});

test('formatted inputs retain their exact values and level is capped at 350', () => {
  const harness = browserHarness();
  harness.elements['upkeep-budget'].value = '1,234,567';
  harness.elements['alliance-size'].value = '1,800';
  harness.elements['player-level'].value = '351';
  harness.click();
  assert.deepEqual(JSON.parse(JSON.stringify(harness.workers[0].params)), {
    playerLevel: 350, upkeepBudget: 1234567, allianceSize: 1800, optimizeType: 'attack', unitTypeFilter: 'all'
  });
  assert.equal(harness.elements['player-level'].value, '350');
  assert.equal(harness.elements.calculate.disabled, true);
});

test('worker errors, unsupported workers, and successes restore the calculate button', () => {
  for (const mode of ['unsupported', 'message-error', 'runtime-error', 'success']) {
    const harness = browserHarness({ noWorker: mode === 'unsupported' });
    harness.click();
    if (mode === 'message-error') harness.workers[0].onmessage({ data: { type: 'error', message: 'Invalid calculation' } });
    if (mode === 'runtime-error') harness.workers[0].onerror({ message: 'Worker failed' });
    if (mode === 'success') harness.workers[0].onmessage({ data: { type: 'result', result: calc.calculateBestArmy(10, 100, 1, 'attack') } });
    assert.equal(harness.elements.calculate.disabled, false);
    assert.equal(harness.label.textContent, 'Calculate Best Army');
    if (mode !== 'unsupported') assert.equal(harness.workers[0].terminated, true);
    if (mode !== 'success') assert.ok(!harness.elements['results-content'].innerHTML.includes('Searching'));
    else assert.ok(harness.elements['results-content'].innerHTML.includes('Total Attack:</strong> 122'));
  }
});

test('worker constructor and message cloning failures return errors and release resources', () => {
  for (const mode of ['construct', 'post']) {
    let terminated = false;
    const browser = loadCalculator({ Worker: class {
      constructor() { if (mode === 'construct') throw new Error('Constructor failed'); }
      postMessage() { throw new Error('Message failed'); }
      terminate() { terminated = true; }
    } });
    let error;
    const worker = browser.calculateInWorker({}, () => assert.fail('Unexpected result'), message => { error = message; });
    assert.equal(worker, null);
    assert.match(error, /failed/);
    assert.equal(terminated, mode === 'post');
  }
});

test('the extensionless route and its worker load the same calculator version', () => {
  const routeHtml = fs.readFileSync(path.join(root, 'best_army/index.html'), 'utf8');
  const workerUrl = source.match(/new Worker\('([^']+)'\)/)[1];
  assert.ok(routeHtml.includes(`src="${workerUrl}"`));
  assert.ok(routeHtml.includes('<base href="../">'));
});

test('real background worker returns identical results and structured validation errors', async () => {
  const workerSource = `const { parentPort, workerData } = require('node:worker_threads');
    const vm = require('node:vm');
    const context = vm.createContext({ self: { postMessage: value => parentPort.postMessage(value) } });
    vm.runInContext(workerData, context);
    parentPort.on('message', data => context.self.onmessage({ data }));`;
  const worker = new Worker(workerSource, { eval: true, workerData: source });
  try {
    for (const params of [
      { playerLevel: 1, upkeepBudget: 0, allianceSize: 1, optimizeType: 'balanced' },
      { playerLevel: 22, upkeepBudget: 123456, allianceSize: 2, optimizeType: 'attack' },
      { playerLevel: 350, upkeepBudget: Number.MAX_SAFE_INTEGER, allianceSize: 1751, optimizeType: 'defense' },
      { playerLevel: 10, upkeepBudget: -1, allianceSize: 1, optimizeType: 'attack' }
    ]) {
      const response = await new Promise((resolve, reject) => {
        worker.once('message', resolve);
        worker.once('error', reject);
        worker.postMessage(params);
      });
      if (params.upkeepBudget < 0) {
        assert.equal(response.type, 'error');
        assert.match(response.message, /budget/);
      } else {
        assert.equal(response.type, 'result');
        const expected = calc.calculateBestArmy(params.playerLevel, params.upkeepBudget, params.allianceSize, params.optimizeType);
        assert.deepEqual(response.result, JSON.parse(JSON.stringify(expected)));
      }
    }
  } finally {
    await worker.terminate();
  }
});
