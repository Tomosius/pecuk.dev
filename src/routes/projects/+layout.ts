// src/routes/projects/+layout.ts
import type { LayoutLoad } from './$types';
import { SITE_URL, type MetaTags } from '$lib';

const PROJECTS_URL = `${SITE_URL}/projects`;

export const load: LayoutLoad = async ({ parent }) => {
	const { baseMetaTags, seoMetaStack = [], seoJsonLdStack = [] } = await parent();

	const metaOverrides: Partial<MetaTags> = {
		title: 'Projects | pecuk.dev',
		description: 'Projects made by Tomas Pecukevicius.',
		canonical: PROJECTS_URL,
		openGraph: {
			...(baseMetaTags.openGraph ?? {}),
			type: 'website',
			title: 'Projects | pecuk.dev',
			description: 'Projects made by Tomas Pecukevicius.',
			url: PROJECTS_URL
		},
		twitter: {
			...(baseMetaTags.twitter ?? {}),
			title: 'Projects | pecuk.dev',
			description: 'Projects made by Tomas Pecukevicius.'
		}
	};

	// JSON-LD for the whole projects section
	const projectsJsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'CollectionPage',
			name: 'pecuk.dev Projects',
			description: 'Projects made by Tomas Pecukevicius.',
			url: PROJECTS_URL
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: 'Projects',
					item: PROJECTS_URL
				}
			]
		}
	];

	return {
		// still expose a merged “current level” meta if pages want it
		metaTags: {
			...baseMetaTags,
			...metaOverrides,
			openGraph: {
				...(baseMetaTags.openGraph ?? {}),
				...(metaOverrides.openGraph ?? {})
			},
			twitter: {
				...(baseMetaTags.twitter ?? {}),
				...(metaOverrides.twitter ?? {})
			}
		},
		// push onto stacks so deeper routes inherit
		seoMetaStack: [...seoMetaStack, metaOverrides],
		seoJsonLdStack: [...seoJsonLdStack, ...projectsJsonLd]
	};
};
