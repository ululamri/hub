#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const blockers = [];
const warnings = [];
const checked = [];

function exists(path) {
  try {
    statSync(path);
    return true;
  } catch {
    return false;
  }
}

function read(path) {
  const full = join(root, path);
  statSync(full);
  checked.push(path);
  return readFileSync(full, 'utf8');
}

function walk(dir, files = []) {
  if (!exists(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (/\.svelte$|\.ts$|\.js$|\.mjs$/.test(entry)) files.push(full);
  }
  return files;
}

const packageText = read('package.json');
const configText = read('svelte.config.js');
const layoutText = read('src/routes/+layout.svelte');

if (!packageText.includes('"packageManager": "pnpm')) blockers.push('Hub packageManager must stay pnpm.');
if (!packageText.includes('audit:hub-paths')) blockers.push('package.json must expose audit:hub-paths.');
if (!configText.includes('PUBLIC_HUB_BASE_PATH')) blockers.push('svelte.config.js must support PUBLIC_HUB_BASE_PATH.');
if (!configText.includes('paths') || !configText.includes('base: hubBasePath')) blockers.push('SvelteKit paths.base must be wired to Hub base path.');
if (!layoutText.includes("$lib/config/hub-paths") || !layoutText.includes('hubPath')) blockers.push('Hub layout must use hubPath for internal navigation.');

for (const file of walk(join(root, 'src/routes'))) {
  const rel = relative(root, file);
  const text = readFileSync(file, 'utf8');
  const rawInternalHref = [...text.matchAll(/href="\/(resources|missions)(#[^"]*)?"/g)];
  for (const match of rawInternalHref) blockers.push(`${rel} contains raw base-path-unsafe href: ${match[0]}`);
  if (/grant|pendanaan/i.test(text)) blockers.push(`${rel} mentions grant/funding strategy in public UI copy.`);
}

for (const file of walk(join(root, 'src/scripts'))) {
  const text = readFileSync(file, 'utf8');
  if (text.charCodeAt(0) === 92) blockers.push(`${relative(root, file)} starts with a leading backslash.`);
}

console.log('Karyra Hub path audit');
console.log('======================');
console.log(`Files checked: ${checked.length}`);
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
