// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import eslintPlugin from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),

		eslintPlugin({
			// Lint app sources + scripts, skip generated/build folders
			include: ['src/**/*.{js,ts,svelte}', 'scripts/**/*.{js,mjs,ts}'],
			exclude: ['node_modules', '.svelte-kit', 'build', '.lighthouseci'],
			// Don’t kill dev:
			emitWarning: true,
			emitError: false,
			// These two are redundant when emitError=false, safe to keep or drop:
			failOnWarning: false,
			failOnError: false,
			// Optional: run once at server start too (handy)
			// @ts-expect-error - not typed in some versions
			lintOnStart: true
		}),

		checker({
			typescript: true,
			overlay: false
		})
	]
});
