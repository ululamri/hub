#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';

const dockerfile = 'Dockerfile.staging';
const blockers = [];

if (!existsSync(dockerfile)) {
  blockers.push('Missing Dockerfile.staging');
} else {
  const text = readFileSync(dockerfile, 'utf8');
  if (!text.includes('ENV PNPM_HOME=')) blockers.push('Dockerfile.staging must define PNPM_HOME before pnpm global install.');
  if (!text.includes('ENV PATH=')) blockers.push('Dockerfile.staging must add PNPM_HOME to PATH before pnpm global install.');
  if (text.includes('pnpm add -g') && !text.includes('PNPM_HOME')) {
    blockers.push('pnpm global install found without PNPM_HOME configuration.');
  }
  if (!text.includes('sirv-cli')) blockers.push('Dockerfile.staging should install sirv-cli for static runtime serving.');
  if (!text.includes('CMD ["sirv", "build"')) blockers.push('Dockerfile.staging should serve the static build with sirv.');
}

console.log('Hub Docker runtime audit');
console.log('========================');

if (blockers.length) {
  console.error('Blockers:');
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log('No Docker runtime blockers found.');
