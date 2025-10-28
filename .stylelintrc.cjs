/** @type {import('stylelint').Config} */
// Lints authoring files (CSS + <style> inside .svelte). Tailwind/Svelte directives allowed.
module.exports = {
	customSyntax: 'postcss-html',
	ignoreFiles: [
		'node_modules/**',
		'.svelte-kit/**',
		'.lighthouseci/**',
		'test-results/**',
		'build/**'
	],
	extends: [
		'stylelint-config-standard',
		'stylelint-config-recess-order',
		'stylelint-config-tailwindcss'
	],
	plugins: [
		'stylelint-no-unsupported-browser-features',
		'stylelint-high-performance-animation',
		'stylelint-declaration-strict-value'
	],
	rules: {
		// Svelte/Tailwind at-rules & pseudos
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['tailwind', 'apply', 'layer', 'responsive', 'screen', 'theme', 'plugin']
			}
		],
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'deep'] }],
		'no-empty-source': null,

		// Browser compat (uses package.json "browserslist")
		'plugin/no-unsupported-browser-features': [
			true,
			{
				severity: 'warning',
				ignorePartialSupport: true
			}
		],

		// Performance
		'plugin/no-low-performance-animation-properties': [true, { ignore: ['filter'] }],

		// Token discipline (encourage variables/tokens for key props)
		'scale-unlimited/declaration-strict-value': [
			['color', 'background-color', 'border-color', 'outline-color', 'fill', 'stroke'],
			{
				ignoreValues: ['transparent', 'inherit', 'currentColor', 'initial', 'unset']
			}
		],

		// Modern notation & consistency (optional nudge rules)
		'color-function-notation': 'modern',
		'alpha-value-notation': 'percentage',
		'hue-degree-notation': 'number',

		// Prefer relative units
		'declaration-property-unit-allowed-list': {
			'font-size': ['rem'],
			'letter-spacing': ['em']
		},

		// Complexity guardrails
		'max-nesting-depth': 2,
		'selector-max-compound-selectors': 3,
		'selector-no-qualifying-type': true,
		'declaration-no-important': true,

		// Let build tools handle vendor prefixes
		'property-no-vendor-prefix': null
	},
	overrides: [{ files: ['**/*.css', '**/*.svelte'] }]
};
