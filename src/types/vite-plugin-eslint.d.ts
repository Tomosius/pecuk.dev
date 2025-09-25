declare module 'vite-plugin-eslint' {
	import type { PluginOption } from 'vite';
	export interface Options {
		cache?: boolean;
		include?: string | string[];
		exclude?: string | string[];
		formatter?: string;
		emitWarning?: boolean;
		emitError?: boolean;
		failOnWarning?: boolean;
		failOnError?: boolean;
		fix?: boolean;
	}
	export default function eslintPlugin(options?: Options): PluginOption;
}
