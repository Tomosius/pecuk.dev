import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',   // where HTML ends up
			assets: 'build',  // where static assets go
			fallback: '404.html' // SPA fallback so /routes work on Pages/Apache
		}),
		prerender: { entries: ['*'] } // make the whole site static
	}
};

export default config;