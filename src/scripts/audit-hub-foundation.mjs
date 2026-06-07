#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'package.json',
  '.npmrc',
  'src/routes/+page.svelte',
  'src/routes/resources/+page.svelte',
  'src/routes/missions/+page.svelte',
  'src/lib/data/hub-content.ts'
];

const requiredTerms = [
  'Starknet',
  'Wallet Safety',
  'Community',
  'Builder later',
  'Cairo',
  'Scarb',
  'Starknet Foundry',
  'Dojo',
  'Public goods',
  'Passport',
  'Local Use Cases'
];

const forbiddenPublicTerms = [
  /Scope Grant/i,
  /grant-ready/i,
  /grant scope/i,
  /\/grant\b/i,
  /docs\/grant/i,
  /HUB_GRANT_SCOPE/i
];

const blockers = [];
const warnings = [];

function walk(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (['node_modules', '.svelte-kit', 'build', '.git', '.pass-backups'].includes(entry)) continue;
      walk(full, files);
    } else if (/\.(svelte|ts|js|mjs|md|json|css|npmrc)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

function walkPublicUiFiles() {
  return [join(root, 'src/routes'), join(root, 'src/lib/data')].flatMap((dir) => walk(dir));
}

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) blockers.push(`Missing required file: ${file}`);
}

if (existsSync(join(root, 'src/routes/grant'))) blockers.push('Public /grant route must not exist in the Hub repo.');
if (existsSync(join(root, 'docs/grant'))) blockers.push('Public docs/grant directory must not exist in the Hub repo.');

const allFiles = walk(root);
const publicFiles = walkPublicUiFiles();

for (const file of allFiles) {
  const text = readFileSync(file, 'utf8');
  const rel = relative(root, file);
  // Avoid fragile backslash string escaping in generated installers/zips.
  if (text.charCodeAt(0) === 92) blockers.push(`${rel} starts with a leading backslash.`);
  if (/https?:\/\/localhost:\d+/.test(text)) blockers.push(`${rel} contains localhost URL.`);
}

for (const file of publicFiles) {
  const text = readFileSync(file, 'utf8');
  const rel = relative(root, file);
  if (/sesi backend|evidence root|proof event ledger|sync queue|local-state/i.test(text)) {
    warnings.push(`${rel} contains internal/system copy candidate.`);
  }
  for (const pattern of forbiddenPublicTerms) {
    if (pattern.test(text)) blockers.push(`${rel} contains forbidden public grant term: ${pattern}`);
  }
}

const combined = allFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
for (const term of requiredTerms) {
  if (!combined.includes(term)) blockers.push(`Missing Hub ecosystem scope term: ${term}`);
}

const packagePath = join(root, 'package.json');
if (existsSync(packagePath)) {
  const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));
  if (!String(pkg.packageManager ?? '').startsWith('pnpm@')) blockers.push('package.json must declare packageManager pnpm@...');
  if (!pkg.devDependencies?.['@types/node']) warnings.push('package.json should include @types/node for SvelteKit check stability.');
}

console.log('Karyra Hub foundation audit');
console.log('============================');
console.log(`Files scanned: ${allFiles.length}`);
console.log(`Public UI files scanned: ${publicFiles.length}`);

if (warnings.length) {
  console.log('\nWarnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
} else {
  console.log('\nWarnings: none');
}

if (blockers.length) {
  console.error('\nBlockers:');
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log('\nNo hard blockers found.');
