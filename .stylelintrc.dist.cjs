/** @type {import('stylelint').Config} */
module.exports = {
	// Only check built CSS here
	ignoreFiles: ['node_modules/**', '.svelte-kit/**'],

	// Minimal plugins suitable for compiled CSS
	plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-high-performance-animation'],

	rules: {
		/* Keep browser compatibility notes as warnings (from Browserslist) */
		'plugin/no-unsupported-browser-features': [
			true,
			{
				severity: 'warning',
				ignorePartialSupport: true
			}
		],

		/* Don’t fail on common Tailwind transitions in build CSS */
		'plugin/no-low-performance-animation-properties': [
			true,
			{
				// These are frequently transitioned by Tailwind/utilities
				ignoreProperties: [
					'color',
					'background-color',
					'border-color',
					'outline-color',
					'box-shadow',
					'filter',
					// `display` transitions don’t apply anyway; silence the false positives
					'display'
				],
				severity: 'warning'
			}
		],

		/* Disable style/formatting rules that don’t make sense on minified CSS */
		'no-duplicate-selectors': null,
		'selector-attribute-quotes': null,
		'selector-pseudo-element-colon-notation': null,
		'declaration-block-single-line-max-declarations': null,
		'custom-property-pattern': null,
		'hue-degree-notation': null,
		'media-feature-range-notation': null,

		/* Vendor prefixes & odd selectors will appear in compiled CSS */
		'property-no-vendor-prefix': null,
		'selector-no-vendor-prefix': null,

		/* Some escaped selectors/properties in the build can confuse this rule */
		'property-no-unknown': null
	},
	'plugin/no-unsupported-browser-features': [
		true,
		{
			severity: 'warning',
			ignorePartialSupport: true,
			ignore: [
				'css-variables', // Tailwind uses many custom properties
				'css-lch-lab', // modern color spaces Tailwind emits
				'css-logical-props', // logical props in resets/utilities
				'css-matches-pseudo' // :is/:where equivalents in some builds
			]
		}
	]
};
