#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';

const requiredFiles = [
  'src/routes/+layout.svelte',
  'src/routes/+layout.ts',
  'src/routes/+page.svelte',
  'src/routes/resources/+page.svelte',
  'src/routes/missions/+page.svelte',
  'src/app.css',
  'src/lib/data/hub-content.ts'
];

const failures = [];
const warnings = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) failures.push(`Missing ${file}`);
}

function read(file) {
  return readFileSync(file, 'utf8');
}

if (existsSync('src/app.css')) {
  const css = read('src/app.css');
  for (const token of ['color-scheme: dark', '--bg: #020617', '.hub-mobile-nav', '.hub-nav-link.active', '@media (max-width: 640px)']) {
    if (!css.includes(token)) failures.push(`src/app.css missing dark/mobile UX token: ${token}`);
  }
  if (css.includes(':global(')) failures.push('src/app.css must not use Svelte :global() syntax.');
}

if (existsSync('src/routes/+layout.svelte')) {
  const layout = read('src/routes/+layout.svelte');
  for (const token of ['hubPath', 'Jelajahi Resource', 'Ikuti Misi', 'Lanjutkan di Spark', 'hub-mobile-nav']) {
    if (!layout.includes(token)) failures.push(`src/routes/+layout.svelte missing navigation token: ${token}`);
  }
}

if (existsSync('src/routes/+layout.ts')) {
  const layoutTs = read('src/routes/+layout.ts');
  if (!layoutTs.includes('prerender = true')) warnings.push('src/routes/+layout.ts should prerender Hub pages for stronger public presentation.');
}

for (const file of ['src/routes/+page.svelte', 'src/routes/resources/+page.svelte', 'src/routes/missions/+page.svelte']) {
  if (!existsSync(file)) continue;
  const text = read(file);
  if (!text.includes('hubPath(')) failures.push(`${file} should use hubPath() for internal Hub links.`);
  if (/grant/i.test(text)) failures.push(`${file} must not expose grant strategy in public UI.`);
}

if (existsSync('src/lib/data/hub-content.ts')) {
  const data = read('src/lib/data/hub-content.ts');
  for (const token of ['Wallet Safety', 'Starknet Basics', 'Builder later', 'Local Public Goods', 'Guided ecosystem discovery']) {
    if (!data.includes(token)) failures.push(`hub-content missing Starknet scope token: ${token}`);
  }
}

if (existsSync('Dockerfile.staging')) {
  const docker = read('Dockerfile.staging');
  const duplicate = (docker.match(/pnpm add -g sirv-cli/g) ?? []).length;
  if (duplicate !== 1) failures.push('Dockerfile.staging should install sirv-cli exactly once.');
}

console.log('Karyra Hub UX audit');
console.log('====================');
if (warnings.length) {
  console.log('\nWarnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
} else {
  console.log('\nWarnings: none');
}

if (failures.length) {
  console.error('\nBlockers:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('\nHub dark web3 UX, navigation, and Starknet scope checks passed.');
