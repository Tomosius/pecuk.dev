import { test, expect } from '@playwright/test';

test('robots.txt exists and is text/plain', async ({ request, baseURL }) => {
	const res = await request.get(`${baseURL}/robots.txt`);
	expect(res.ok()).toBeTruthy();
	expect((res.headers()['content-type'] || '').includes('text')).toBeTruthy();
	const body = await res.text();
	expect(body).toMatch(/User-agent:/i);
	// Optional: assert a Sitemap line once you add it
	// expect(body).toMatch(/Sitemap:\s*https?:\/\//i);
});

test('sitemap is valid-ish XML (urlset or sitemapindex)', async ({ request, baseURL }) => {
	const res = await request.get(`${baseURL}/sitemap.xml`);
	expect(res.ok()).toBeTruthy();
	const text = await res.text();
	expect(text).toMatch(/<(urlset|sitemapindex)\b/i);
});
