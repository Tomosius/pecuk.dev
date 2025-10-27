// src/routes/+layout.ts
export const prerender = true;

const SITE_URL = 'https://pecuk.dev';

export const load = () => {
	return {
		// Defaults for <MetaTags />
		baseMetaTags: {
			// Use "My Website" if you want your current Playwright test to pass
			title: 'My Website',
			description: 'Personal website of Tomas Pecukevicius — software developer.',
			author: 'Tomas Pecukevicius',
			robots: 'index, follow',
			themeColor: '#0ea5e9',
			canonical: SITE_URL,

			openGraph: {
				type: 'website',
				site_name: 'pecuk.dev',
				locale: 'en_GB',
				title: 'pecuk.dev',
				description: 'Personal website of Tomas Pecukevicius — software developer.',
				url: SITE_URL
			},

			twitter: {
				card: 'summary_large_image'
			}
		},

		// Defaults for <JsonLd /> (note: separate from baseMetaTags)
		baseJsonLd: [
			{
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				url: SITE_URL,
				name: 'pecuk.dev'
			},
			{
				'@context': 'https://schema.org',
				'@type': 'Person',
				name: 'Tomas Pecukevicius',
				url: SITE_URL,
				sameAs: [
					'https://github.com/Tomosius',
					'https://www.linkedin.com/in/tomas-pecukevicius-a9837652/'
				]
			}
		]
	};
};
