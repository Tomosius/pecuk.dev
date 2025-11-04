// src/routes/projects/code_institute/p1_vampyre/+page.ts
import type { PageLoad } from './$types';
import type { MetaTags } from '$lib';

export const _indexEntry = {
	type: 'project',
	title: 'Vampyre — A Vampire History Site',
	description:
		'This project was built to demonstrate clean semantic HTML, responsive design, image handling, a 404 page, and accessibility features.',
	tags: ['HTML', 'CSS', 'Accessibility', 'Responsive'],
	image: '/images/projects/code_institute/p1_vampyre_small.jpg'
	// you can add "date" or "slug" later
};

const DESCRIPTION =
	'This project was built to demonstrate clean semantic HTML, responsive design, image handling, a 404 page, and accessibility features.';
const CANONICAL = 'https://pecuk.dev/projects/code_institute/p1_vampyre';
const IMAGE = 'https://pecuk.dev/images/projects/code_institute/p1_vampyre.jpg';
const TITLE = 'Vampyre — A Vampire History Site';

export const load: PageLoad = async ({ parent }) => {
	const { metaTags: baseMeta } = await parent();

	const pageMetaTags: MetaTags = {
		...baseMeta,
		title: TITLE,
		description: DESCRIPTION,
		canonical: CANONICAL,
		openGraph: {
			...baseMeta.openGraph,
			type: 'website',
			title: TITLE,
			description: DESCRIPTION,
			url: CANONICAL,
			image: IMAGE,
			site_name: 'pecuk.dev'
		},
		twitter: {
			card: 'summary_large_image',
			title: TITLE,
			description: DESCRIPTION,
			image: IMAGE
		}
	};

	const pageJsonLd = [
		// 1) the actual project
		{
			'@context': 'https://schema.org',
			'@type': 'CreativeWork',
			headline: TITLE,
			alternativeHeadline: 'HTML & CSS Showcase Project',
			description: DESCRIPTION,
			image: IMAGE,
			author: {
				'@type': 'Person',
				name: 'Tomas Pecukevicius',
				url: 'https://pecuk.dev/about'
			},
			publisher: {
				'@type': 'Organization',
				name: 'pecuk.dev',
				url: 'https://pecuk.dev',
				logo: {
					'@type': 'ImageObject',
					url: 'https://pecuk.dev/brand/logo.png'
				}
			},
			// you can change to real dates later
			datePublished: '2025-10-15',
			dateModified: '2025-10-20',
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': CANONICAL
			}
		},
		// 2) breadcrumb for this project
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: 'Projects',
					item: 'https://pecuk.dev/projects'
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: TITLE,
					item: CANONICAL
				}
			]
		},
		// 3) describe the projects collection page (this was the missing bit)
		{
			'@context': 'https://schema.org',
			'@type': 'CollectionPage',
			name: 'pecuk.dev Projects',
			description: 'Projects made by Tomas Pecukevicius',
			url: 'https://pecuk.dev/projects'
		}
	];

	return { pageMetaTags, pageJsonLd };
};