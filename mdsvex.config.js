import { defineMDSveXConfig as defineConfig } from 'mdsvex';

export default defineConfig({
	extensions: ['.md', '.svx'],
	smartypants: true,
	highlight: { highlighter: (code) => code } // keep simple; add shiki/prism later if you like
});
