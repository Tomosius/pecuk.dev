import { test, expect } from '@playwright/test';

test('has web manifest with basics', async ({ request, baseURL }) => {
	const res = await request.get(`${baseURL}/manifest.webmanifest`);
	expect(res.ok(), 'manifest.webmanifest missing').toBeTruthy();
	const json = await res.json();
	expect(json.name || json.short_name).toBeTruthy();
	expect(Array.isArray(json.icons)).toBeTruthy();
	expect(json.start_url).toBeTruthy();
	expect(json.display).toBeTruthy();
});

test('service worker registers', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' });
	// Give registration a moment if your app registers on load
	const sw = await page.evaluate(async () => {
		if (!('serviceWorker' in navigator)) return false;
		const regs = await navigator.serviceWorker.getRegistrations();
		return regs.length > 0;
	});
	expect(sw).toBeTruthy();
});
