// src/lib/seo.ts
export type SiteConfig = {
	title: string;
	description: string;
	url: string; // absolute origin, no trailing slash
	type: 'website' | 'article';
	siteName: string;
	locale: string;
	image: {
		url: string; // absolute or root-relative
		alt: string;
		width: number;
		height: number;
	};
	twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player';
	twitterSite?: string;
	twitterCreator?: string;
	keywords: string[];
	author: string;
	robots: string;
	canonical?: string; // optional global fallback
};

export const siteConfig: SiteConfig = {
	// Basic
	title: 'pecuk.dev',
	description:
		'Personal website of Tomas Pecukevicius — projects, blog, and thoughts on web development.',
	url: 'https://pecuk.dev',

	// Open Graph
	type: 'website',
	siteName: 'pecuk.dev',
	locale: 'en_GB',
	image: {
		// static/og-image.jpeg -> served at /og-image.jpeg
		url: '/og-image.jpeg',
		alt: 'Preview of pecuk.dev',
		width: 1200,
		height: 630
	},

	// Twitter Card
	twitterCard: 'summary_large_image',
	twitterSite: '',
	twitterCreator: '',

	// SEO helpers
	keywords: [
		'Tomas Pecukevicius',
		'pecuk.dev',
		'personal website',
		'portfolio',
		'Svelte developer',
		'web development'
	],
	author: 'Tomas Pecukevicius',

	// Robots
	robots: 'index, follow',

	// Canonical URL (global fallback; page-specific canonicals are better)
	canonical: 'https://pecuk.dev'
};
