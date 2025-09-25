<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	import { withRouteMeta } from '$lib/route-meta';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';

	const meta = withRouteMeta(
		{
			// no type/slug here — they’ll be inferred from the route
			title: 'House Price Prediction',
			summary: 'Regression on housing data with feature engineering.',
			date: '2025-03-10',
			cover: 'images/projects/code_institute_p5_heritage_houses/img.png',
			links: { repo: 'https://github.com/you/house-price' },
			tech: [
				'python',
				'pandas',
				'numpy',
				'scikit-learn',
				'jupyter',
				'plotly',
				'matplotlib',
				'seaborn',
				'statsmodels',
				'scipy',
				'git',
				'github',
				'joblib',
				'catboost',
				'xgboost',
				'lightgbm',
				'svm',
				'lightgbm'
			],
			keywords: ['ml', 'regression', 'kaggle']
		},
		get(page).url.pathname,
		base
	);
</script>

<ContentPage {meta}>
	<section class="prose max-w-none prose-invert">
		<h2>Overview</h2>
		<p>Your write-up goes here.</p>
	</section>
</ContentPage>
