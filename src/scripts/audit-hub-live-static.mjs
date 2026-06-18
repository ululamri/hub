#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const checks = [
  ['package.json', 'build:live'],
  ['package.json', 'PUBLIC_HUB_BASE_PATH=/hub'],
  ['svelte.config.js', "fallback: 'spa.html'"],
  ['svelte.config.js', 'base: hubBasePath'],
  ['src/routes/+layout.ts', "trailingSlash = 'always'"],
  ['README.md', '/opt/karyra/hub/build'],
  ['README.md', 'handle_path /hub*']
];

const blockers = [];
for (const [file, needle] of checks) {
  const text = readFileSync(file, 'utf8');
  if (!text.includes(needle)) blockers.push(`${file} missing ${needle}`);
}

console.log('Karyra Hub live static audit');
if (blockers.length) {
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}
console.log('No live static blockers found.');
