import type { LayoutLoad } from './$types';
import type { MetaTags } from '$lib';

export const load: LayoutLoad = async ({ parent }) => {
	const { baseMetaTags, seoMetaStack = [], seoJsonLdStack = [] } = await parent();

	const metaOverrides: Partial<MetaTags> = {
		title: 'Blog | pecuk.dev',
		description: 'Insights, guides, and experiments by Tomas Pecukevicius.',
		openGraph: {
			type: 'blog',
			title: 'Blog | pecuk.dev',
			description: 'Software development thoughts and experiments.'
		}
	};

	const metaTags: MetaTags = {
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
	};

	const blogJsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'Blog',
			name: 'pecuk.dev Blog',
			description: 'Software development articles and personal notes.',
			url: 'https://pecuk.dev/blog'
		}
	];

	const jsonLd = blogJsonLd;

	return {
		metaTags,
		jsonLd,
		seoMetaStack: [...seoMetaStack, metaOverrides],
		seoJsonLdStack: [...seoJsonLdStack, ...blogJsonLd]
	};
};
