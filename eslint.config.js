// eslint.config.js (flat config for ESLint 9)
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import { fileURLToPath } from 'node:url';

const tsconfigRootDir = fileURLToPath(new URL('.', import.meta.url));

export default [
	// Ignore generated/build stuff
	{
		ignores: ['.svelte-kit/**', 'build/**', 'node_modules/**', '.lighthouseci/**']
	},

	// Svelte files
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tseslint.parser, // delegate <script> to TS parser
				extraFileExtensions: ['.svelte'],
				ecmaVersion: 'latest',
				sourceType: 'module',
				projectService: true,
				tsconfigRootDir
			},
			globals: { ...globals.browser, ...globals.node }
		},
		plugins: { svelte: sveltePlugin },
		rules: {
			...sveltePlugin.configs['flat/recommended'].rules,

			// You’re intentionally using children snippets; don’t let this block dev
			'svelte/no-useless-children-snippet': 'off'
		}
	},

	// TypeScript (non-Svelte) files – keep this non type-checked to avoid “await-thenable” noise
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				projectService: false, // not doing type-aware lint here
				tsconfigRootDir
			},
			globals: { ...globals.browser, ...globals.node }
		},
		plugins: { '@typescript-eslint': tseslint.plugin },
		rules: {
			...tseslint.configs.recommended.rules // NOT the type-checked preset
		}
	},

	// Plain JS / scripts
	{
		files: ['**/*.{js,mjs,cjs}'],
		languageOptions: {
			parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
			globals: { ...globals.node, ...globals.browser }
		},
		rules: {
			...js.configs.recommended.rules
		}
	},

	// Keep Prettier last to turn off conflicting stylistic rules
	prettier
];
