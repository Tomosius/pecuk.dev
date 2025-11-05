// src/routes/projects/code_institute/p3_battleship/+page.ts
import type { PageLoad } from './$types';
import type { MetaTags } from '$lib';

export const _indexEntry = {
	type: 'project',
	title: 'Battleship — Browser Strategy Game',
	description:
		'A browser-based recreation of the classic Battleship game with turn-based player vs CPU, grid rendering, and clear hit/miss feedback.',
	tags: ['HTML', 'CSS', 'JavaScript', 'Game', 'DOM'],
	image: '/images/projects/code_institute/p3_battleship.jpg'
};

const TITLE = 'Battleship — Browser Strategy Game';
const DESCRIPTION =
	'A browser-based recreation of the classic Battleship game with turn-based player vs CPU, grid rendering, and responsive UI.';
const CANONICAL = 'https://pecuk.dev/projects/code_institute/p3_battleship';
const IMAGE = 'https://pecuk.dev/images/projects/code_institute/p3_battleship.jpg';

export const load: PageLoad = async ({ parent }) => {
	const { metaTags: baseMeta } = await parent();

	const pageMetaTags: MetaTags = {
		...baseMeta,
		title: TITLE,
		description: DESCRIPTION,
		canonical: CANONICAL,
		openGraph: {
			...(baseMeta.openGraph ?? {}),
			type: 'website',
			title: TITLE,
			description: DESCRIPTION,
			url: CANONICAL,
			image: IMAGE,
			site_name: 'pecuk.dev'
		},
		twitter: {
			...(baseMeta.twitter ?? {}),
			card: 'summary_large_image',
			title: TITLE,
			description: DESCRIPTION,
			image: IMAGE
		}
	};

	const pageJsonLd = [
		// 1) the project itself
		{
			'@context': 'https://schema.org',
			'@type': 'CreativeWork',
			headline: TITLE,
			alternativeHeadline: 'JavaScript Battleship Game',
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
			// put real dates later
			datePublished: '2025-10-15',
			dateModified: '2025-10-20',
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': CANONICAL
			}
		},
		// 2) breadcrumb: Projects → Code Institute → Battleship
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
					name: 'Code Institute Projects',
					item: 'https://pecuk.dev/projects/code_institute'
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: TITLE,
					item: CANONICAL
				}
			]
		}
	];

	return { pageMetaTags, pageJsonLd };
};
