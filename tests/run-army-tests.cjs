const { spawnSync } = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const env = { ...process.env };
if (process.argv.includes('--stress') && !env.ARMY_FUZZ_CASES) env.ARMY_FUZZ_CASES = '1000000';
for (const args of [['--test', 'tests/best-army.test.cjs'], ['tests/army-matrix.cjs'], ['tests/army-fuzz.cjs']]) {
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit', env });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log('All army correctness suites passed.');
