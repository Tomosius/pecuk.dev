import { test, expect } from '@playwright/test';

function isRecord(v: unknown): v is Record<string, unknown> {
	return v !== null && typeof v === 'object' && !Array.isArray(v);
}

test('JSON-LD exists and has @context/@type', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' });

	// Grab all JSON-LD scripts
	const rawBlocks = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
		nodes.map((n) => n.textContent ?? '').filter(Boolean)
	);

	expect(rawBlocks.length, 'No JSON-LD found').toBeGreaterThan(0);

	for (const raw of rawBlocks) {
		let data: unknown;
		try {
			data = JSON.parse(raw);
		} catch {
			throw new Error('Invalid JSON-LD JSON');
		}

		const items = Array.isArray(data) ? data : [data];

		for (const item of items) {
			if (!isRecord(item)) {
				throw new Error('JSON-LD item is not an object');
			}

			const ctx = item['@context']; // unknown
			const type = item['@type']; // unknown

			expect(typeof ctx).toBe('string');
			expect(String(ctx)).toMatch(/^https?:\/\/schema\.org\/?$/i);
			expect(Boolean(type)).toBe(true);
		}
	}
});
