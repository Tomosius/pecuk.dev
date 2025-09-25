<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	import { withRouteMeta } from '$lib/route-meta';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';

	// Pull the current path once (fine for prerender + normal pages)
	const pathname = get(page).url.pathname;

	const meta = withRouteMeta(
		{
			title: 'Battleship — Python Terminal Game',
			summary:
				'Terminal Battleship with adjustable map & fleet, simple AI, and deployment via Code Institute Heroku template.',
			date: '2023-10-16',
			cover: 'images/projects/code_institute_p4_battleship/img.png',
			links: {
				repo: 'https://github.com/Tomosius/Battleship-Portfolio-3',
				demo: 'https://battleship-p3-8833f01f29b3.herokuapp.com/'
			},
			tech: ['python', 'git', 'github'],
			keywords: [
				'battleship',
				'terminal',
				'game',
				'heroku',
				'code institute',
				'ai',
				'maps',
				'fleet'
			]
			// no slug/type here — they’ll be inferred from the path
		},
		pathname,
		base
	);
</script>

<ContentPage {meta}>
	<section class="prose max-w-none prose-invert">
		<h2>Overview</h2>
		<p>…</p>
	</section>
</ContentPage>
