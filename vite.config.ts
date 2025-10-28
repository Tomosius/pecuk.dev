// vite.config.ts
import { defineConfig, type PluginOption } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(() => {
	const plugins: PluginOption[] = [tailwindcss(), sveltekit()];

	if (process.env.VISUALIZE) {
		plugins.push(
			visualizer({
				filename: 'build/stats.html',
				open: true,
				gzipSize: true,
				brotliSize: true
			}) as unknown as PluginOption // visualizer is a Rollup plugin; cast for Vite types
		);
	}

	return { plugins };
});
