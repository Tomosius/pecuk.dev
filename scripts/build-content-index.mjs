// scripts/build-content-index.mjs
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const ROUTES_DIR = path.join(ROOT, 'src', 'routes');
const OUT_FILE = path.join(ROOT, 'static', 'content-index.json');

function routePathFromFile(file) {
	let rel = path.relative(ROUTES_DIR, file);
	rel = rel.replace(/\/\+page\.(ts|js)$/, '');
	if (!rel || rel === '.') return '/';
	return '/' + rel.replace(/\\/g, '/');
}

async function main() {
	const files = await glob('**/+page.@(ts|js)', {
		cwd: ROUTES_DIR,
		absolute: true
	});

	const entries = [];

	for (const file of files) {
		const fileUrl = pathToFileURL(file).href;
		let mod;

		try {
			mod = await import(fileUrl);
		} catch (err) {
			// most common case: page imports `$lib` (Vite alias) which Node can't resolve here
			if (
				err &&
				(err.code === 'ERR_MODULE_NOT_FOUND' || err.message?.includes('Cannot find package')) &&
				err.message?.includes('$lib')
			) {
				console.warn(
					`⚠️  skipping ${path.relative(ROOT, file)} (uses $lib alias not available in node)`
				);
				continue;
			}

			// if it's some other error, still skip — we don't want prebuild to die because of one page
			console.warn(`⚠️  skipping ${path.relative(ROOT, file)} (${err.message})`);
			continue;
		}

		// support both `_indexEntry` (your current pattern) and `indexEntry`
		const rawEntry = mod._indexEntry ?? mod.indexEntry;
		if (!rawEntry) continue;

		const url = routePathFromFile(file);

		const entry = {
			url,
			...rawEntry
		};

		// infer type if missing
		if (!entry.type) {
			if (url.startsWith('/blog')) entry.type = 'blog';
			else if (url.startsWith('/projects')) entry.type = 'project';
			else if (url.startsWith('/studies')) entry.type = 'study';
			else entry.type = 'page';
		}

		entries.push(entry);
	}

	await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
	await fs.writeFile(OUT_FILE, JSON.stringify(entries, null, 2), 'utf8');

	console.log(`✅ wrote ${entries.length} items to ${path.relative(ROOT, OUT_FILE)}`);
}

main().catch((err) => {
	console.error('❌ build-content-index failed:', err);
	process.exit(1);
});
