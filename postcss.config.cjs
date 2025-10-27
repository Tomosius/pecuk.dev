const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	plugins: [
		require('@tailwindcss/postcss'),
		require('postcss-preset-env')({
			stage: 3,
			autoprefixer: {
				overrideBrowserslist: ['>0.5%', 'last 2 versions', 'not dead', 'not op_mini all']
			},
			features: {
				'lab-function': { preserve: false },
				'oklab-function': { preserve: false }
			}
		}),
		...(isProd ? [require('cssnano')({ preset: 'default' })] : [])
	]
};
