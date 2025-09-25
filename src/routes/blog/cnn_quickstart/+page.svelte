<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	import { withRouteMeta } from '$lib/route-meta';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';
	const pathname = get(page).url.pathname;

	const meta = withRouteMeta(
		{
			title: 'Cats vs Dogs: a Tiny CNN',
			summary: 'Quick baseline with Keras: data augmentation, small CNN, and validation curves.',
			date: '2024-10-01',
			tech: ['python', 'tensorflow', 'keras', 'numpy'],
			keywords: ['cnn', 'image-classification', 'keras', 'augmentation']
		},
		pathname,
		base
	);
</script>

<ContentPage {meta}>
	<article class="prose max-w-none prose-invert">
		<h2>Baseline</h2>
		<p>Start with a tiny model, overfit a batch, then add augmentation and regularization.</p>
		<h3>Notes</h3>
		<ul>
			<li>Use early stopping.</li>
			<li>Track learning curves.</li>
		</ul>
	</article>
</ContentPage>
