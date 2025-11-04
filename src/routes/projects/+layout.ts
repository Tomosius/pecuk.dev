// src/routes/projects/+layout.ts
import type { LayoutLoad } from './$types';
import type { MetaTags } from '$lib';

export const load: LayoutLoad = async ({ parent }) => {
	const {
		baseMetaTags,
		seoMetaStack = [],
		seoJsonLdStack = []
	} = await parent();

	const metaOverrides: Partial<MetaTags> = {
		title: 'Projects | pecuk.dev',
		description: 'Projects made by Tomas Pecukevicius.',
		openGraph: {
			type: 'website',
			title: 'Projects | pecuk.dev',
			description: 'Projects made by Tomas Pecukevicius.'
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

	return {
		metaTags,
		// keep stacks going but don't add a CollectionPage here
		seoMetaStack: [...seoMetaStack, metaOverrides],
		seoJsonLdStack
	};
};