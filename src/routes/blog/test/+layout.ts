import type { LayoutLoad } from './$types';
import type { MetaTags } from '$lib';

export const load: LayoutLoad = async ({ parent }) => {
	// ✅ explicitly type the parent data so TS knows what it returns
	const { baseMetaTags } = (await parent()) as { baseMetaTags: MetaTags };

	const metaTags: MetaTags = {
		...baseMetaTags,
		title: '🔥 Blog Zone | pecuk.dev',
		description: 'All the latest dev experiments and spicy thoughts from Tomas Pecukevicius.',
		canonical: 'https://pecuk.dev/blog',
		openGraph: {
			...baseMetaTags.openGraph,
			type: 'article',
			title: '🔥 Blog Zone | pecuk.dev',
			description: 'Deep dives, hot takes, and code experiments from the dev world.',
			url: 'https://pecuk.dev/blog',
			site_name: 'pecuk.dev Blog Experiments'
		},
		twitter: {
			card: 'summary',
			title: '🔥 Blog Zone | pecuk.dev',
			description: 'Exploring the bleeding edge of web tech and SvelteKit.'
		}
	};

	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'Blog',
			name: 'pecuk.dev Blog (Test)',
			description: 'A blog dedicated to coding experiments, tutorials, and open-source thoughts.',
			url: 'https://pecuk.dev/blog',
			inLanguage: 'en-GB',
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
					url: 'https://pecuk.dev/logo-test.png'
				}
			}
		}
	];

	return { metaTags, jsonLd };
};
