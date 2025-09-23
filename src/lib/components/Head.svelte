<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$lib';

	type ImageLike = string | { url: string; alt?: string; width?: number; height?: number };

	// ✅ defaults make every prop optional to callers (<Head /> is valid)
	let {
		title = undefined,
		description = undefined,
		image = undefined,
		type = undefined as 'website' | 'article' | undefined,
		robots = undefined,
		keywords = undefined as string[] | string | undefined,
		canonical = undefined
	} = $props();

	function toAbsolute(urlOrPath: string): string {
		try {
			return new URL(urlOrPath).href;
		} catch {
			const root = siteConfig.url.replace(/\/$/, '');
			const path = urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
			return `${root}${path}`;
		}
	}

	// ✅ simple, unambiguous runes state
	let pageTitle = $state(siteConfig.title);
	let desc = $state(siteConfig.description);
	let kind = $state<'website' | 'article'>(siteConfig.type);
	let robotsContent = $state(siteConfig.robots);
	let kw = $state<string[]>(siteConfig.keywords);
	let img = $state<{ url: string; alt: string; width: number; height: number }>({
		url: toAbsolute(siteConfig.image.url),
		alt: siteConfig.image.alt,
		width: siteConfig.image.width,
		height: siteConfig.image.height
	});
	let canonicalHref = $state(`${siteConfig.url.replace(/\/$/, '')}${$page.url.pathname}`);

	// ✅ one place to derive everything
	$effect(() => {
		pageTitle = title ?? siteConfig.title;
		desc = description ?? siteConfig.description;
		kind = type ?? siteConfig.type;
		robotsContent = robots ?? siteConfig.robots;

		kw = Array.isArray(keywords)
			? keywords
			: typeof keywords === 'string'
				? [keywords]
				: siteConfig.keywords;

		const src: ImageLike = image ?? siteConfig.image;
		img =
			typeof src === 'string'
				? {
						url: toAbsolute(src),
						alt: siteConfig.image.alt,
						width: siteConfig.image.width,
						height: siteConfig.image.height
					}
				: {
						url: toAbsolute(src.url),
						alt: src.alt ?? siteConfig.image.alt,
						width: src.width ?? siteConfig.image.width,
						height: src.height ?? siteConfig.image.height
					};

		canonicalHref = canonical
			? toAbsolute(canonical)
			: `${siteConfig.url.replace(/\/$/, '')}${$page.url.pathname}`;
	});
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
