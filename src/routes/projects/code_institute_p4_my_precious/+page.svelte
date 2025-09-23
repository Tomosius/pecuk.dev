<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	import { withRouteMeta } from '$lib/route-meta';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';

	const meta = withRouteMeta(
		{
			// inferred: type & slug
			title: 'My Precious',
			summary:
				'Community-driven lost & found platform: user auth, CRUD posts with photos & location, and private messaging.',
			// add your local cover image path when you copy one into your project
			cover: '/images/projects/my-precious/cover.jpg',
			links: {
				repo: 'https://github.com/Tomosius/My_Precious',
				demo: 'https://project-4-django-my-precious-180ebe0871af.herokuapp.com'
			},
			// keep to tech IDs you’ve registered; add Django/SQL/etc later if you like
			tech: [
				'python',
				'html',
				'css',
				'github',
				'git',
				'javascript',
				'django',
				'jinja2',
				'ajax',
				'postgresql',
				'sql',
				'sqlalchemy',
				'altair'
			],
			keywords: [
				'django',
				'lost-and-found',
				'crud',
				'authentication',
				'messaging',
				'heroku',
				'sql',
				'cloudinary'
			]
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
				<strong>My Precious</strong> helps people reunite with lost items. Authenticated users can create
				posts (lost or found), add photos and locations, browse &amp; search posts, and chat via private
				messages.
			</p>

			<h3>Features</h3>
			<ul>
				<li>User accounts with authentication &amp; profiles</li>
				<li>CRUD for posts with images and location</li>
				<li>Search &amp; filters for lost/found listings</li>
				<li>Private messaging between users</li>
				<li>Deployed to Heroku; assets via Cloudinary; DB hosted on ElephantSQL</li>
			</ul>

			<h3>Notes</h3>
			<p>
				Tech list above only includes IDs already in your <code>TECHNOLOGIES</code> map (<code
					>python</code
				>, <code>html</code>, <code>css</code>). If you add entries for
				<em>Django, JavaScript, Bootstrap, SQL, Heroku, Cloudinary, Google Maps API</em>, you can
				move them from <code>keywords</code> into <code>tech</code> for full badges/links.
			</p>
		</section>
	{/snippet}
</ContentPage>
