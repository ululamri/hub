import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'src/lib/starknet/starknet-readiness.ts',
  'src/lib/starknet/wallet-detection.ts',
  'src/lib/components/StarknetReadinessPanel.svelte',
  'src/lib/components/StarknetWalletPreview.svelte',
  'examples/starknet/hello_readiness/Scarb.toml',
  'examples/starknet/hello_readiness/src/lib.cairo'
];

const blockers = [];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) blockers.push(`Missing required Starknet alpha file: ${file}`);
}

const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
if (!pkg.dependencies?.starknet) blockers.push('package.json must include dependency "starknet".');
if (!pkg.scripts?.['audit:starknet-minimal']) blockers.push('package.json must include script audit:starknet-minimal.');

const readinessPath = path.join(root, 'src/lib/starknet/starknet-readiness.ts');
const readiness = fs.existsSync(readinessPath) ? fs.readFileSync(readinessPath, 'utf8') : '';
if (readiness.includes('$env/static/public')) {
  blockers.push('starknet-readiness.ts must use $env/dynamic/public so missing optional env values do not break svelte-check.');
}
if (!readiness.includes("from '$env/dynamic/public'")) {
  blockers.push('starknet-readiness.ts must import env from $env/dynamic/public.');
}

const layout = fs.existsSync(path.join(root, 'src/routes/+layout.svelte'))
  ? fs.readFileSync(path.join(root, 'src/routes/+layout.svelte'), 'utf8')
  : '';
if (!layout.includes('Karyra Spark + Hub Beta 0.1')) blockers.push('Hub layout must show explicit beta/alpha signal.');

const home = fs.existsSync(path.join(root, 'src/routes/+page.svelte'))
  ? fs.readFileSync(path.join(root, 'src/routes/+page.svelte'), 'utf8')
  : '';
for (const needle of ['StarknetReadinessPanel', 'StarknetWalletPreview', 'Cairo/Scarb']) {
  if (!home.includes(needle)) blockers.push(`Hub home must include ${needle}.`);
}

if (blockers.length) {
  console.error('Starknet minimal integration audit failed:');
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log('Starknet minimal integration audit OK.');
