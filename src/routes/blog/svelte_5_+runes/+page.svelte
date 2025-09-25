<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	import { withRouteMeta } from '$lib/route-meta';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';

	const pathname = get(page).url.pathname;

	const meta = withRouteMeta(
		{
			title: 'Svelte 5 + Tailwind: a Lean Setup',
			summary: 'Minimal, fast setup notes for Svelte 5 (runes) with Tailwind v4 and Vite.',
			date: '2025-02-05',
			links: { repo: 'https://github.com/Tomosius/your-repo' },
			tech: ['svelte', 'sveltekit', 'tailwindcss', 'vite', 'nodejs'],
			keywords: ['svelte 5', 'runes', 'tailwind', 'setup', 'vite']
		},
		pathname,
		base
	);
</script>

<ContentPage {meta}>
	<article class="prose max-w-none prose-invert">
		<h2>Why this stack</h2>
		<p>Notes on Svelte 5 runes, Tailwind v4, and a few tips for keeping things fast and simple.</p>

		<h3>Steps</h3>
		<ol>
			<li>Initialize SvelteKit.</li>
			<li>Add Tailwind v4 and plugins.</li>
			<li>Keep global CSS lean; move patterns to components.</li>
		</ol>
	</article>
</ContentPage>
