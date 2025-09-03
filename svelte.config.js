// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev'); // true for `npm run dev`
const base = process.env.BASE_PATH ?? (dev ? '' : '/pecuk.dev'); // set this to your repo name for GH Pages

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig), preprocess()],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			// GitHub Pages serves 404.html for unknown routes; use it as SPA fallback
			fallback: '404.html'
		}),
		paths: {
			base,
			// important when using $app/paths.assets on GitHub Pages
			// If you ever need truly relative URLs, you can add: relative: true
		},
		prerender: { entries: ['*'] }
	}
};

export default config;