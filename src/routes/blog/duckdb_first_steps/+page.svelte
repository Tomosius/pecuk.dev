<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	import { withRouteMeta } from '$lib/route-meta';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';
	const pathname = get(page).url.pathname;

	const meta = withRouteMeta(
		{
			title: 'DuckDB: First Steps',
			summary: 'Playground notes: reading CSV/Parquet locally and simple analytics queries.',
			date: '2024-11-12',
			cover: '/images/blog/duckdb-first-steps/cover.jpg',
			tech: ['duckdb', 'python', 'pandas'],
			keywords: ['duckdb', 'analytics', 'sql', 'parquet', 'csv']
		},
		pathname,
		base
	);
</script>

<ContentPage {meta}>
	{#snippet children()}
		<article class="prose max-w-none prose-invert">
			<h2>Reading data</h2>
			<p>CSV vs Parquet, when to choose which, and handy DuckDB functions.</p>
			<h3>Example queries</h3>
			<pre><code>SELECT COUNT(*) FROM 'data.parquet';</code></pre>
		</article>
	{/snippet}
</ContentPage>
