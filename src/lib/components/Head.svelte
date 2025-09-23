<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$lib';

	type ImageLike = string | { url: string; alt?: string; width?: number; height?: number };

	type Props = {
		title?: string;
		description?: string;
		image?: ImageLike;
		type?: 'website' | 'article';
		robots?: string;
		keywords?: string[] | string;
		canonical?: string;
	};

	const { title, description, image, type, robots, keywords, canonical } = $props<Props>();

	// Derived values
	const pageTitle = $derived(title ?? siteConfig.title);
	const desc = $derived(description ?? siteConfig.description);
	const kind = $derived(type ?? siteConfig.type);
	const robotsContent = $derived(robots ?? siteConfig.robots);

	const kw = $derived(() => {
		if (Array.isArray(keywords)) return keywords;
		if (typeof keywords === 'string') return [keywords];
		return siteConfig.keywords;
	});

	function toAbsolute(urlOrPath: string): string {
		try {
			return new URL(urlOrPath).href;
		} catch {
			const root = siteConfig.url.replace(/\/$/, '');
			const path = urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
			return `${root}${path}`;
		}
	}

	const img = $derived(() => {
		const src: ImageLike = image ?? siteConfig.image;
		if (typeof src === 'string') {
			return {
				url: toAbsolute(src),
				alt: siteConfig.image.alt,
				width: siteConfig.image.width,
				height: siteConfig.image.height
			};
		}
		return {
			url: toAbsolute(src.url),
			alt: src.alt ?? siteConfig.image.alt,
			width: src.width ?? siteConfig.image.width,
			height: src.height ?? siteConfig.image.height
		};
	});

	const canonicalHref = $derived(() =>
		canonical ? toAbsolute(canonical) : `${siteConfig.url.replace(/\/$/, '')}${$page.url.pathname}`
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<link rel="canonical" href={canonicalHref} />

	<meta name="description" content={desc} />
	{#if kw.length}<meta name="keywords" content={kw.join(', ')} />{/if}
	<meta name="author" content={siteConfig.author} />
	<meta name="robots" content={robotsContent} />

	<!-- Open Graph -->
	<meta property="og:type" content={kind} />
	<meta property="og:site_name" content={siteConfig.siteName} />
	<meta property="og:locale" content={siteConfig.locale} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={desc} />
	<meta property="og:url" content={`${siteConfig.url.replace(/\/$/, '')}${$page.url.pathname}`} />
	<meta property="og:image" content={img.url} />
	<meta property="og:image:alt" content={img.alt} />
	<meta property="og:image:width" content={String(img.width)} />
	<meta property="og:image:height" content={String(img.height)} />

	<!-- Twitter -->
	<meta name="twitter:card" content={siteConfig.twitterCard} />
	{#if siteConfig.twitterSite}<meta name="twitter:site" content={siteConfig.twitterSite} />{/if}
	{#if siteConfig.twitterCreator}<meta
			name="twitter:creator"
			content={siteConfig.twitterCreator}
		/>{/if}
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={desc} />
	<meta name="twitter:image" content={img.url} />
</svelte:head>
