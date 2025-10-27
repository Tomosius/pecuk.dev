// src/lib/seo.ts

export const SITE_URL = 'https://pecuk.dev';
export const SITE_NAME = 'pecuk.dev';
export const AUTHOR = 'Tomas Pecukevicius';
export const THEME_COLOR = '#0ea5e9';
export const DEFAULT_DESCRIPTION =
	'Personal website of Tomas Pecukevicius — software developer.';

export const SOCIALS = {
	github: 'https://github.com/Tomosius',
	linkedin: 'https://www.linkedin.com/in/tomas-pecukevicius-a9837652/'
};

// --- types below ---
export interface OpenGraph {
	type?: string;
	site_name?: string;
	locale?: string;
	title?: string;
	description?: string;
	url?: string;
	image?: string;
}

export interface Twitter {
	card?: string;
	title?: string;
	description?: string;
	image?: string;
}

export interface MetaTags {
	title: string;
	description: string;
	author?: string;
	robots?: string;
	themeColor?: string;
	canonical?: string;
	openGraph?: OpenGraph;
	twitter?: Twitter;
}