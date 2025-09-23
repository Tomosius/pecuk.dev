<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	import { defineMeta } from '$lib/content';

	const meta = defineMeta({
		type: 'project',
		slug: 'code_institutte_p5_house_price_prediction',
		title: 'House Price Prediction',
		summary: 'Regression on housing data with feature engineering.',
		date: '2025-03-10',
		cover: '/images/projects/house/cover.jpg',
		links: { repo: 'https://github.com/you/house-price' },
		tech: ['python', 'pandas', 'numpy', 'scikit-learn'],
		keywords: ['ml', 'regression', 'kaggle']
	} as const);
</script>

<ContentPage {meta}>
	{#snippet children()}
		<section class="prose max-w-none prose-invert">
			<h2>Overview</h2>
			<p>Your write-up goes here.</p>
		</section>
	{/snippet}
</ContentPage>
