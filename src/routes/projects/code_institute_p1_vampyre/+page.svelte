<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	import { withRouteMeta } from '$lib/route-meta';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';

	const meta = withRouteMeta(
		{
			title: 'Vampyre — HTML/CSS Site',
			summary:
				'Multi-page responsive site about vampire lore, showcasing semantic HTML, custom CSS, accessibility and a simple 404.',
			// drop in your local cover path (you had one previously):
			cover: 'images/projects/code_institute_p1_vampyre/img.png',
			links: {
				repo: 'https://github.com/Tomosius/Vampyre',
				demo: 'https://tomosius.github.io/Vampyre/'
			},
			tech: ['html', 'css', 'git', 'github'],
			keywords: [
				'vampires',
				'portfolio',
				'responsive',
				'accessibility',
				'google fonts',
				'font awesome',
				'code institute'
			]
			// date: 'YYYY-MM-DD' // optional if you want it shown
		},
		get(page).url.pathname,
		base
	);
</script>

<ContentPage {meta}>
	<section class="prose max-w-none prose-invert">
		<h2>Overview</h2>
		<p>
			A small multi-page site (<em>Home</em>, <em>Brief History</em>, <em>Contact</em>) built with
			vanilla HTML/CSS to practice layout, responsiveness and basic accessibility.
		</p>

		<h3>Features</h3>
		<ul>
			<li>Linear gradient theme (white → <code>#880808</code> “blood” tone).</li>
			<li>Alternating article image layout via <code>article:nth-child(odd|even)</code>.</li>
			<li>Mobile rules at ≤ 600px (stacked layout, intro text repositioning).</li>
			<li>Nav links + footer with external links (LinkedIn, source, README).</li>
			<li>Contact form with basic required-field validation.</li>
			<li>404 page for incorrect routes.</li>
			<li>
				Accessibility touches: <code>aria-label</code> on links, <code>alt</code> text, structured headings.
			</li>
			<li>Google Fonts &amp; Font Awesome assets.</li>
		</ul>

		<h3>Notes</h3>
		<p>
			The live build is on GitHub Pages. Replace the cover path to match your static assets folder
			if needed.
		</p>
	</section>
</ContentPage>
