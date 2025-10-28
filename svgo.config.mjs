export default {
	multipass: true,
	js2svg: { pretty: true },
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					// keep accessibility
					removeTitle: false,
					removeDesc: false,
					// keep viewBox so SVGs remain responsive
					removeViewBox: false
				}
			}
		},
		'sortAttrs',
		'removeOffCanvasPaths'
	]
};
