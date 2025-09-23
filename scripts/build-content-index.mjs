import { promises as fs } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const SRC_DIR = join(root, 'src', 'routes');
const OUT = join(root, 'static', 'content-index.json');

const folders = ['projects', 'blog'];

async function walk(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const res = [];
	for (const e of entries) {
		const p = join(dir, e.name);
		if (e.isDirectory()) res.push(...(await walk(p)));
		else res.push(p);
	}
	return res;
}

function extractMeta(source) {
	const start = source.indexOf('<!-- CONTENT_META');
	const end = source.indexOf('CONTENT_META -->', start);
	if (start === -1 || end === -1) return null;
	const json = source.slice(start + '<!-- CONTENT_META'.length, end).trim();
	return JSON.parse(json);
}

function normalize(item, inferredType) {
	const type = item.type || inferredType;
	const slug = item.slug || '';
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
	const tokens = new Set(
		[
			...title.toLowerCase().split(/\W+/),
			...summary.toLowerCase().split(/\W+/),
			...keywords.map((k) => String(k).toLowerCase()),
			...tech.map((t) => String(t).toLowerCase())
		].filter(Boolean)
	);
	return {
		type,
		slug,
		title,
		summary,
		date,
		cover,
		links,
		tech,
		keywords,
		tokens: Array.from(tokens)
	};
}

const items = [];
for (const folder of folders) {
	const base = join(SRC_DIR, folder);
	try {
		const files = (await walk(base)).filter((f) => f.endsWith('+page.svelte'));
		for (const file of files) {
			const src = await fs.readFile(file, 'utf8');
			const meta = extractMeta(src);
			if (!meta) continue;
			const inferredType = folder === 'blog' ? 'blog' : 'project';
			const norm = normalize(meta, inferredType);
			if (!norm.slug) {
				// default slug from path: routes/blog/my-post/+page.svelte -> 'my-post'
				const rel = relative(base, file);
				const maybe = rel.split('/')[0];
				norm.slug = maybe || '';
			}
			items.push(norm);
		}
	} catch {
		// folder may not exist yet
	}
}

// Build quick lookups
const byType = items.reduce((m, it) => ((m[it.type] ??= []).push(it.slug), m), {});
const byTech = {};
for (const it of items) for (const t of it.tech) (byTech[t] ??= []).push(it.slug);
const byKeyword = {};
for (const it of items) for (const k of it.keywords) (byKeyword[k] ??= []).push(it.slug);

const index = {
	generatedAt: new Date().toISOString(),
	counts: {
		total: items.length,
		projects: byType.project?.length || 0,
		blog: byType.blog?.length || 0
	},
	items: items.sort((a, b) => (b.date || '').localeCompare(a.date || '')),
	byType,
	byTech,
	byKeyword
};

await fs.mkdir(dirname(OUT), { recursive: true });
await fs.writeFile(OUT, JSON.stringify(index, null, 2), 'utf8');
console.log(`[content-index] wrote ${OUT} (${items.length} entries)`);
