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

const statusFile = read('src/lib/starknet/starknet-rpc-status.ts');
const component = read('src/lib/components/StarknetRpcLiveCard.svelte');
const home = read('src/routes/+page.svelte');
const appCss = read('src/app.css');
const pkg = JSON.parse(read('package.json') || '{}');

for (const method of ['starknet_chainId', 'starknet_blockNumber', 'starknet_syncing']) {
  if (!statusFile.includes(method)) blockers.push(`starknet-rpc-status.ts must call ${method}.`);
}

for (const forbidden of ['requestAccounts', 'enable(', 'connect(', 'privateKey', 'seed phrase']) {
  if (statusFile.includes(forbidden)) blockers.push(`starknet-rpc-status.ts must not include wallet/private action: ${forbidden}`);
}

for (const needle of ['Live Starknet RPC', 'RPC method', 'Latest block', 'Latency', 'Cek ulang RPC']) {
  if (!component.includes(needle)) blockers.push(`StarknetRpcLiveCard must show visible field: ${needle}`);
}

if (!component.includes('Tidak ada wallet connect')) {
  blockers.push('StarknetRpcLiveCard must clearly state wallet/signature/transaction are not requested.');
}

if (!home.includes("import StarknetRpcLiveCard")) {
  blockers.push('Home page must import StarknetRpcLiveCard.');
}

if (!home.includes('<StarknetRpcLiveCard />')) {
  blockers.push('Home page must render StarknetRpcLiveCard.');
}

if (!appCss.includes('Pass 69D') || !appCss.includes('.starknet-rpc-live-card')) {
  blockers.push('src/app.css must include Pass 69D Starknet RPC styles.');
}

if (!pkg.scripts?.['audit:pass69d']) {
  blockers.push('package.json must include script audit:pass69d.');
}

if (blockers.length) {
  console.error('PASS 69D live Starknet RPC audit failed:');
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log('PASS 69D live Starknet RPC audit OK.');
