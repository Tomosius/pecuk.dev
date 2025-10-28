import {
	SITE_URL,
	SITE_NAME,
	AUTHOR,
	DEFAULT_DESCRIPTION,
	THEME_COLOR,
	SOCIALS,
	type MetaTags
} from '$lib';

export const prerender = true;

export const load = () => {
	const baseMetaTags: MetaTags = {
		title: SITE_NAME,
		description: DEFAULT_DESCRIPTION,
		author: AUTHOR,
		robots: 'index, follow',
		themeColor: THEME_COLOR,
		canonical: SITE_URL,
		openGraph: {
			type: 'website',
			site_name: SITE_NAME,
			locale: 'en_GB',
			title: SITE_NAME,
			description: DEFAULT_DESCRIPTION,
			url: SITE_URL
		},
		twitter: { card: 'summary_large_image' }
	};

	const baseJsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			url: SITE_URL,
			name: SITE_NAME
		},
		{
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: AUTHOR,
			url: SITE_URL,
			sameAs: [SOCIALS.github, SOCIALS.linkedin]
		}
	];

	return {
		baseMetaTags,
		baseJsonLd,
		siteUrl: SITE_URL,
		seoMetaStack: [baseMetaTags],
		seoJsonLdStack: [...baseJsonLd]
	};
};
