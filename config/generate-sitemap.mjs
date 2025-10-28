import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const buildDir = path.join(root, 'build');
const cfgPath = path.join(root, 'config', 'site.json');

// read siteUrl (env wins)
const rawCfg = JSON.parse(await fs.readFile(cfgPath, 'utf8'));
const siteUrl = (process.env.SITE_URL || rawCfg.siteUrl || '').replace(/\/+$/, '');
if (!/^https?:\/\//i.test(siteUrl)) {
	console.warn(
		'[sitemap] WARNING: siteUrl is missing or not http(s). Set config/site.json or SITE_URL.'
	);
}

const urls = [];

/** Walk the build dir and collect .html routes */
async function walk(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	for (const e of entries) {
		if (e.name.startsWith('_app')) continue; // skip client assets
		const full = path.join(dir, e.name);

		if (e.isDirectory()) {
			await walk(full);
			continue;
		}

		if (!e.isFile() || !e.name.endsWith('.html')) continue;
		const rel = path.relative(buildDir, full).replace(/\\/g, '/');

		// ignore 404.html (not part of sitemap)
		if (rel === '404.html') continue;

		// map build path to URL path
		let urlPath;
		if (e.name === 'index.html') {
			const dirRel = path.dirname(rel);
			urlPath = dirRel === '.' ? '/' : `/${dirRel}/`;
		} else {
			// rarely used by SvelteKit, but supported
			urlPath = `/${rel}`;
		}

		const stat = await fs.stat(full);
		urls.push({
			loc: `${siteUrl}${urlPath}`,
			lastmod: stat.mtime.toISOString()
		});
	}
}

await walk(buildDir);
urls.sort((a, b) => a.loc.localeCompare(b.loc));

// build XML
const xml =
	`<?xml version="1.0" encoding="UTF-8"?>\n` +
	`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
	urls
		.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`)
		.join('\n') +
	`\n</urlset>\n`;

await fs.writeFile(path.join(buildDir, 'sitemap.xml'), xml, 'utf8');

// robots.txt (points to the sitemap)
const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl || 'https://example.com'}/sitemap.xml
`;
await fs.writeFile(path.join(buildDir, 'robots.txt'), robots, 'utf8');

console.log(
	`[sitemap] Generated ${urls.length} URL(s) → build/sitemap.xml and robots.txt using ${siteUrl || '(unset siteUrl)'}`
);
