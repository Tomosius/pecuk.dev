<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	import { withRouteMeta } from '$lib/route-meta';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';

	const meta = withRouteMeta(
		{
			title: 'Hangman — Web Game',
			summary:
				'Browser-based Hangman with difficulty levels, on-screen letter buttons, timer, and responsive UI.',
			cover: '/images/projects/hangman/cover.jpg',
			links: {
				repo: 'https://github.com/Tomosius/P2-HangMan',
				demo: 'https://tomosius.github.io/P2-HangMan/'
			},
			// If you have a 'javascript' entry in TECHNOLOGIES, include it here too.
			tech: ['html', 'css', 'javascript', 'git', 'github'],
			keywords: ['hangman', 'javascript', 'game', 'github pages', 'ui']
		},
		get(page).url.pathname,
		base
	);
</script>

<ContentPage {meta}>
	{#snippet children()}
		<section class="prose max-w-none prose-invert">
			<h2>Overview</h2>
			<p>
				A web version of <em>Hangman</em> built with vanilla HTML/CSS/JS. Choose a difficulty, start
				the game, and guess letters via on-screen buttons while a timer runs. The hangman image updates
				on mistakes, and the layout adapts for mobile.
			</p>
			<ul>
				<li>Difficulty slider (beginner → legendary)</li>
				<li>Clickable alphabet &amp; hidden-word reveal</li>
				<li>Timer and action log</li>
				<li>Deployed to GitHub Pages</li>
			</ul>
		</section>
	{/snippet}
</ContentPage>
