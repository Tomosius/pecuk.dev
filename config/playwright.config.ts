import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	// point to ../tests from the config/ folder
	testDir: path.resolve(__dirname, '../tests'),
	// (optional, makes discovery explicit)
	testMatch: /.*\.(spec|test)\.(ts|js|mts|cts|mjs|cjs)$/,

	timeout: 30_000,
	use: { baseURL: 'http://localhost:4173' },

	webServer: {
		command: 'npm run serve:build',
		url: 'http://localhost:4173',
		reuseExistingServer: !process.env.CI
	},

	projects: [
		{ name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
		{ name: 'WebKit', use: { ...devices['Desktop Safari'] } }
	]
});
