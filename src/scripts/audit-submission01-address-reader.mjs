#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blockers = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    blockers.push(`Missing file: ${relativePath}`);
    return '';
  }
  return fs.readFileSync(fullPath, 'utf8');
}

const reader = read('src/lib/starknet/starknet-address-reader.ts');
const config = read('src/lib/starknet/starknet-rpc-config.ts');
const component = read('src/lib/components/StarknetAddressReader.svelte');
const home = read('src/routes/+page.svelte');
const appCss = read('src/app.css');
const pkg = JSON.parse(read('package.json') || '{}');

for (const needle of ['validateAndParseAddress', 'RpcProvider', 'getClassHashAt', "'latest'"]) {
  if (!reader.includes(needle)) blockers.push(`Address reader must include ${needle}.`);
}

for (const forbidden of ['requestAccounts', '.enable(', 'wallet.connect', 'execute(', 'privateKey']) {
  if (reader.includes(forbidden)) blockers.push(`Address reader must not include wallet/write action: ${forbidden}`);
}

for (const text of [
  'Starknet Sepolia Address Reader',
  'Address checked',
  'Account / contract presence',
  'Latest checked time',
  'No wallet connection',
  'No signature request',
  'No transaction',
  'private key or seed phrase'
]) {
  if (!component.includes(text)) blockers.push(`Address reader card must show: ${text}`);
}

if (!home.includes("import StarknetAddressReader")) blockers.push('Home page must import StarknetAddressReader.');
if (!home.includes('<StarknetAddressReader />')) blockers.push('Home page must render StarknetAddressReader.');
if (!config.includes('PUBLIC_STARKNET_RPC_URL')) blockers.push('Reader must reuse public Starknet RPC configuration.');
if (!config.includes("const FALLBACK_RPC_URL = 'https://starknet-sepolia")) {
  blockers.push('Default RPC configuration must use a public Starknet Sepolia endpoint.');
}
if (!appCss.includes('PASS SUBMISSION-01') || !appCss.includes('.starknet-address-reader-card')) {
  blockers.push('src/app.css must include scoped address reader styles.');
}
if (!pkg.scripts?.['audit:submission01']) blockers.push('package.json must include audit:submission01.');

if (blockers.length) {
  console.error('PASS SUBMISSION-01 Starknet address reader audit failed:');
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log('PASS SUBMISSION-01 Starknet address reader audit OK.');
