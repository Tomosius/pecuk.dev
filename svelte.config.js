import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev'); // true for `npm run dev`
const base = process.env.BASE_PATH ?? (dev ? '' : '/pecuk.dev');
// ^ Default to /pecuk.dev only for production builds if BASE_PATH isn't provided.

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			// GitHub Pages serves 404.html for unknown routes; use it as SPA fallback
			fallback: '404.html'
		}),
		paths: {
			base
			// If you ever need truly relative URLs (e.g., opening files from disk),
			// you can add: relative: true
		},
		prerender: { entries: ['*'] }
	}
};

export default config;