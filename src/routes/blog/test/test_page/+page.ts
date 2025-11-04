import type { PageLoad } from './$types';
import type { MetaTags } from '$lib';


export const _indexEntry = {
	type: 'blog', // or 'project' | 'study'
	slug: 'future-of-sveltekit',
	title: 'Tomosius',
	description: 'A deep dive into SvelteKit 5, the Runes API...',
	tags: ['sveltekit', 'runes', 'frontend'],
	image: '/og-images/future-of-sveltekit.png'
	// date: '2025-10-15'
};


export const load: PageLoad = async ({ parent }) => {
	// Get SEO base data from the parent (blog layout)
	const { metaTags: blogMeta } = await parent();

	const pageMetaTags: MetaTags = {
		...blogMeta,
		title: '🚀 The Future of SvelteKit | pecuk.dev',
		description:
			'A deep dive into SvelteKit 5, the Runes API, and the evolution of modern web development by Tomas Pecukevicius.',
		canonical: 'https://pecuk.dev/blog/future-of-sveltekit',
		openGraph: {
			...blogMeta.openGraph,
			type: 'article',
			title: '🚀 The Future of SvelteKit | pecuk.dev',
			description:
				'Discover what makes SvelteKit 5 and the Runes API revolutionary for developers building next-gen web apps.',
			url: 'https://pecuk.dev/blog/future-of-sveltekit',
			image: 'https://pecuk.dev/og-images/future-of-sveltekit.png',
			site_name: 'pecuk.dev Articles'
		},
		twitter: {
			card: 'summary_large_image',
			title: '🚀 The Future of SvelteKit | pecuk.dev',
			description: 'Exploring how SvelteKit 5 and the Runes API redefine the developer experience.',
			image: 'https://pecuk.dev/og-images/future-of-sveltekit.png'
		}
	};

	const pageJsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: 'The Future of SvelteKit',
			alternativeHeadline: 'Why the Runes API changes everything',
			description:
				'An in-depth exploration of how SvelteKit 5 and the Runes API transform frontend development.',
			image: 'https://pecuk.dev/og-images/future-of-sveltekit.png',
			author: {
				'@type': 'Person',
				name: 'Tomas Pecukevicius',
				url: 'https://pecuk.dev/about'
			},
			publisher: {
				'@type': 'Organization',
				name: 'pecuk.dev Labs',
				url: 'https://pecuk.dev',
				logo: {
					'@type': 'ImageObject',
					url: 'https://pecuk.dev/logo.png'
				}
			},
			datePublished: '2025-10-15',
			dateModified: '2025-10-20',
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': 'https://pecuk.dev/blog/future-of-sveltekit'
			}
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: 'Blog',
					item: 'https://pecuk.dev/blog'
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: 'The Future of SvelteKit',
					item: 'https://pecuk.dev/blog/future-of-sveltekit'
				}
			]
		}
	];

	// ✅ return only new data layer for this page
	return { pageMetaTags, pageJsonLd };
};
