import { promises as fs } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import JSON5 from 'json5';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const SRC_DIR = join(root, 'src', 'routes');
const TECH_TS = join(root, 'src', 'lib', 'tech.ts');
const OUT = join(root, 'static', 'content-index.json');

// Content folders
const FOLDERS = [
	{ dir: 'projects', type: 'project' },
	{ dir: 'blog', type: 'blog' }
];

// Flags
const DEBUG = process.argv.includes('--debug') || process.env.DEBUG_CONTENT_INDEX === '1';
const WITH_MAPS = process.argv.includes('--maps');
const STRICT = process.argv.includes('--strict'); // exit non-zero on unknown tech

const log = (...args) => DEBUG && console.log('[content-index]', ...args);
const warn = (...args) => console.warn('[content-index]', ...args);

/* ------------------------------- utilities ------------------------------- */

async function walk(dir) {
	const out = [];
	try {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		for (const e of entries) {
			const p = join(dir, e.name);
			if (e.isDirectory()) out.push(...(await walk(p)));
			else out.push(p);
		}
	} catch {
		log('walk: skip dir (may not exist):', dir);
	}
	return out;
}

/** Extract JSON from <!-- CONTENT_META ... CONTENT_META --> */
function extractFromComment(source) {
	const start = source.indexOf('<!-- CONTENT_META');
	if (start === -1) return null;
	const end = source.indexOf('CONTENT_META -->', start);
	if (end === -1) return null;
	const raw = source.slice(start + '<!-- CONTENT_META'.length, end).trim();
	try {
		return JSON.parse(raw);
	} catch (e) {
		log('extractFromComment: JSON parse failed:', e.message);
		return null;
	}
}

/**
 * Extract the first object literal passed as arg#1 to one of:
 *   withRouteMeta({ ... })  or  defineMeta({ ... })
 */
function extractFromCall(source, fnNames = ['withRouteMeta', 'defineMeta']) {
	for (const name of fnNames) {
		const i = source.indexOf(name);
		if (i === -1) continue;
		let j = source.indexOf('(', i);
		if (j === -1) continue;
		let k = source.indexOf('{', j);
		if (k === -1) continue;

		let depth = 0,
			inStr = false,
			quote = '',
			prev = '';
		for (let p = k; p < source.length; p++) {
			const ch = source[p];
			if (inStr) {
				if (ch === quote && prev !== '\\') inStr = false;
				prev = ch;
				continue;
			}
			if (ch === '"' || ch === "'" || ch === '`') {
				inStr = true;
				quote = ch;
				prev = ch;
				continue;
			}

			if (ch === '{') depth++;
			else if (ch === '}') {
				depth--;
				if (depth === 0) {
					let objText = source.slice(k, p + 1);
					objText = objText.replace(/:\s*undefined\b/g, ': null');
					try {
						return JSON5.parse(objText);
					} catch (e) {
						log(`extractFromCall(${name}): JSON5.parse failed:`, e.message);
						break;
					}
				}
			}
			prev = ch;
		}
	}
	return null;
}

/** Normalize + fill defaults */
function normalize(item, inferredType, filePath, baseTypeDir) {
	const type = item.type || inferredType;
	let slug = item.slug || '';

	if (!slug) {
		// derive slug: routes/<typeDir>/<slug>/+page.svelte
		const rel = relative(baseTypeDir, filePath);
		const segs = rel.split(sep).filter(Boolean);
		if (segs.length >= 2) slug = segs[0];
	}

	const title = item.title || 'Untitled';
	const summary = item.summary || '';
	const date = item.date || null;
	const cover = item.cover || null;
	const links = item.links || {};
	const tech = Array.isArray(item.tech) ? item.tech : [];
	const keywords = Array.isArray(item.keywords)
		? item.keywords
		: typeof item.keywords === 'string'
			? [item.keywords]
			: [];

	return { type, slug, title, summary, date, cover, links, tech, keywords };
}

/* ------------------------- tech dictionary reader ------------------------ */

/**
 * Reads src/lib/tech.ts and returns:
 *  - canonicalIds: Set<string>
 *  - aliasToCanonical: Map<string, string>  (lowercased)
 *  - lookupLower: Map<string, string>       (canonical+aliases in lower-case -> canonical)
 */
async function loadTechDictionary() {
	const src = await fs.readFile(TECH_TS, 'utf8');
	const marker = 'export const TECHNOLOGIES';
	const i = src.indexOf(marker);
	if (i === -1) throw new Error('TECH_TS: cannot find "export const TECHNOLOGIES"');

	let j = src.indexOf('{', i);
	if (j === -1) throw new Error('TECH_TS: missing "{" after TECHNOLOGIES');
	let depth = 0,
		inStr = false,
		quote = '',
		prev = '';
	let end = -1;
	for (let p = j; p < src.length; p++) {
		const ch = src[p];
		if (inStr) {
			if (ch === quote && prev !== '\\') inStr = false;
			prev = ch;
			continue;
		}
		if (ch === '"' || ch === "'" || ch === '`') {
			inStr = true;
			quote = ch;
			prev = ch;
			continue;
		}
		if (ch === '{') depth++;
		else if (ch === '}') {
			depth--;
			if (depth === 0) {
				end = p;
				break;
			}
		}
		prev = ch;
	}
	if (end === -1) throw new Error('TECH_TS: could not match closing "}" for TECHNOLOGIES');

	// Object literal text (including braces)
	let objText = src.slice(j, end + 1);
	// JSON5 can handle comments, trailing commas, single quotes, unquoted identifiers
	const obj = JSON5.parse(objText);

	const canonicalIds = new Set(Object.keys(obj));
	const aliasToCanonical = new Map();
	const lookupLower = new Map();

	for (const [id, info] of Object.entries(obj)) {
		lookupLower.set(id.toLowerCase(), id);
		if (Array.isArray(info?.aliases)) {
			for (const a of info.aliases) {
				aliasToCanonical.set(String(a).toLowerCase(), id);
				lookupLower.set(String(a).toLowerCase(), id);
			}
		}
	}

	return { canonicalIds, aliasToCanonical, lookupLower };
}

/** Levenshtein distance for suggestion */
function levenshtein(a, b) {
	a = a.toLowerCase();
	b = b.toLowerCase();
	const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
	for (let j = 1; j <= b.length; j++) dp[0][j] = j;
	for (let i = 1; i <= a.length; i++) {
		for (let j = 1; j <= b.length; j++) {
			dp[i][j] = Math.min(
				dp[i - 1][j] + 1,
				dp[i][j - 1] + 1,
				dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
			);
		}
	}
	return dp[a.length][b.length];
}

function suggest(input, candidates) {
	let best = null,
		bestScore = Infinity;
	for (const c of candidates) {
		const d = levenshtein(input, c);
		if (d < bestScore) {
			best = c;
			bestScore = d;
		}
	}
	// Only suggest when reasonably close
	return bestScore <= 3 ? best : null;
}

/* --------------------------------- main ---------------------------------- */

const { canonicalIds, aliasToCanonical, lookupLower } = await loadTechDictionary();

const items = [];
const unknowns = []; // { file, slug, tech }

for (const { dir, type } of FOLDERS) {
	const base = join(SRC_DIR, dir);
	log('scan folder:', base, `(type=${type})`);

	const files = (await walk(base)).filter((f) => f.endsWith('+page.svelte'));
	log('found +page.svelte files:', files.length);
	if (DEBUG) files.forEach((f) => log('  -', relative(root, f)));

	for (const file of files) {
		const src = await fs.readFile(file, 'utf8');
		const meta = extractFromCall(src) ?? extractFromComment(src);
		if (!meta) {
			log('  skip (no meta found):', relative(root, file));
			continue;
		}

		const norm = normalize(meta, type, file, base);
		if (!norm.slug) {
			log('  skip (no slug after normalize):', relative(root, file));
			continue;
		}

		// Validate/massage tech list: map aliases/typos to canonical; collect unknowns
		const canonicalTech = [];
		for (const raw of norm.tech) {
			const key = String(raw).toLowerCase();
			const mapped = lookupLower.get(key);
			if (mapped) {
				// If it was an alias, emit an informational note
				if (!canonicalIds.has(key) && aliasToCanonical.has(key)) {
					log(`  note: mapped alias "${raw}" -> "${mapped}" (${relative(root, file)})`);
				}
				canonicalTech.push(mapped);
			} else {
				// Unknown — collect and warn with a suggestion
				const rel = relative(root, file);
				const suggestion = suggest(key, Array.from(lookupLower.keys()));
				unknowns.push({ file: rel, slug: norm.slug, tech: raw, suggestion });
				const hint = suggestion ? ` — did you mean "${suggestion}"?` : '';
				warn(`unknown tech "${raw}" in ${rel} (slug=${norm.slug})${hint}`);
			}
		}
		norm.tech = canonicalTech;

		log('  add:', norm.type, norm.slug, `tech=${norm.tech.length}`, `kw=${norm.keywords.length}`);
		items.push(norm);
	}
}

// Sort newest first (if dates exist)
items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

// Output
let index;
if (WITH_MAPS) {
	const byType = items.reduce((m, it) => ((m[it.type] ??= []).push(it.slug), m), {});
	const byTech = {};
	for (const it of items) for (const t of it.tech) (byTech[t] ??= []).push(it.slug);
	const byKeyword = {};
	for (const it of items) for (const k of it.keywords) (byKeyword[k] ??= []).push(it.slug);

	index = {
		generatedAt: new Date().toISOString(),
		counts: {
			total: items.length,
			projects: byType.project?.length || 0,
			blog: byType.blog?.length || 0
		},
		items,
		byType,
		byTech,
		byKeyword
	};
} else {
	index = { generatedAt: new Date().toISOString(), items };
}

await fs.mkdir(dirname(OUT), { recursive: true });
await fs.writeFile(OUT, JSON.stringify(index, null, 2), 'utf8');

console.log(`[content-index] wrote ${OUT} (${items.length} entries)`);

// Summary & exit code in strict mode
if (unknowns.length) {
	console.log(
		`\n[content-index] ${unknowns.length} unknown tech entr${unknowns.length === 1 ? 'y' : 'ies'} found:`
	);
	for (const u of unknowns) {
		const hint = u.suggestion ? ` (suggestion: ${u.suggestion})` : '';
		console.log(` - ${u.tech}  @ ${u.file}  [slug=${u.slug}]${hint}`);
	}
	if (STRICT) {
		console.error('\n[content-index] Failing due to --strict and unknown tech.');
		process.exit(1);
	}
} else if (DEBUG) {
	console.log('[content-index] no unknown tech ids.');
}
