// vitest.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./tests/vitest.setup.ts'], // if this file is at root
		include: ['src/**/*.{test,spec}.{ts,js}', 'tests/**/*.{test,spec}.{ts,js}'],
		css: true,
		coverage: {
			provider: 'v8', // since you're using @vitest/coverage-v8
			reporter: ['text', 'html', 'lcov']
		}
	}
});
