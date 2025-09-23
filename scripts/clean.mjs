#!/usr/bin/env node
/**
 * Remove build artifacts, reports, and (optionally) caches/node_modules.
 * Usage:
 *   node scripts/clean.mjs                  -> build + reports
 *   node scripts/clean.mjs --build-only     -> just build artifacts
 *   node scripts/clean.mjs --reports-only   -> just Lighthouse reports
 *   node scripts/clean.mjs --cache          -> add common caches
 *   node scripts/clean.mjs --all            -> also node_modules + package-lock.json
 */
import fs from 'node:fs';
import path from 'node:path';

const groups = {
  build: ['build', '.svelte-kit'],
  reports: ['.lighthouseci'],
  cache: ['.vite', '.cache', '.eslintcache', '.parcel-cache', '.turbo']
};

const args = new Set(process.argv.slice(2));
let targets = [];

if (args.has('--build-only')) targets.push(...groups.build);
else if (args.has('--reports-only')) targets.push(...groups.reports);
else targets.push(...groups.build, ...groups.reports); // default

if (args.has('--cache')) targets.push(...groups.cache);
if (args.has('--all')) targets.push('node_modules', 'package-lock.json');

const rm = (p) => {
  try {
    fs.rmSync(path.resolve(p), { recursive: true, force: true });
    console.log(`removed ${p}`);
  } catch (e) {
    console.warn(`skip ${p}: ${e.message}`);
  }
};

[...new Set(targets)].forEach(rm);