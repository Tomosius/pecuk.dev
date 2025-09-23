#!/usr/bin/env node
/**
 * Generate a URL list for Lighthouse CI from your static build.
 *
 * Scans `build/**/index.html` produced by adapter-static and writes a newline-
 * separated list of paths (/, /foo/, /foo/bar/) into `.lighthouseci/urls.txt`.
 *
 * You can extend this to add “extra” routes that aren’t represented as plain
 * index.html files by pushing manual entries into `urls` before writing.
 */
import fs from 'node:fs';
import path from 'node:path';

const BUILD_DIR = path.resolve('build');
const OUT_DIR = path.resolve('.lighthouseci');
const OUT_FILE = path.join(OUT_DIR, 'urls.txt');

const urls = new Set();

/** Walk build dir and grab every index.html to infer its route */
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name === 'index.html') {
      const rel = path.relative(BUILD_DIR, full); // e.g. "", "calculus/index.html"
      const route = '/' + rel.replace(/index\.html$/, '').replace(/\\/g, '/'); // keep trailing slash
      urls.add(route === '//' ? '/' : route);
    }
  }
}

if (!fs.existsSync(BUILD_DIR)) {
  console.error('Build directory not found. Run `npm run build` first.');
  process.exit(1);
}

walk(BUILD_DIR);

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, [...urls].sort().join('\n') + '\n', 'utf8');
console.log(`Wrote ${urls.size} URL(s) to ${OUT_FILE}`);