const readline = require('node:readline');
const vm = require('node:vm');
const { source } = require('./army-test-helpers.cjs');
const context = vm.createContext({ self: {} });
vm.runInContext(source, context);
readline.createInterface({ input: process.stdin }).on('line', line => {
  const params = JSON.parse(line);
  context.params = params;
  const started = performance.now();
  try {
    const result = vm.runInContext('calculateBestArmy(...params)', context, { timeout: 60000 });
    process.stdout.write(JSON.stringify({ result, milliseconds: performance.now() - started }) + '\n');
  } catch (error) {
    process.stdout.write(JSON.stringify({ error: error.message, params }) + '\n');
  }
});
