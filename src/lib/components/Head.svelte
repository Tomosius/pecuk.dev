<script lang="ts">
	import { page } from '$app/stores';
	import type { MetaTags } from '$lib';

	type HeadData = {
		seoMetaStack?: Partial<MetaTags>[];
		seoJsonLdStack?: unknown[];
		baseMetaTags?: Partial<MetaTags>;
		metaTags?: Partial<MetaTags>;
		pageMetaTags?: Partial<MetaTags>;
		baseJsonLd?: unknown[];
		jsonLd?: unknown[];
		pageJsonLd?: unknown[];
	};

	let data: HeadData = {};
	let metaStack: Partial<MetaTags>[] = [];
	let meta: Partial<MetaTags> = {};
	let jsonLd: unknown[] = [];
	const scriptTag = 'script';

	$: data = ($page.data as HeadData) ?? {};

	const mergeMetaLayers = (layers: Partial<MetaTags>[]) =>
		layers.reduce<Partial<MetaTags>>((acc, layer) => {
			if (!layer) return acc;
			const next: Partial<MetaTags> = { ...acc, ...layer };

			if (layer.openGraph || acc.openGraph) {
				next.openGraph = { ...(acc.openGraph ?? {}), ...(layer.openGraph ?? {}) };
			}

			if (layer.twitter || acc.twitter) {
				next.twitter = { ...(acc.twitter ?? {}), ...(layer.twitter ?? {}) };
			}

			return next;
		}, {});

	const collectMetaLayers = () => {
		const stack = (data.seoMetaStack ?? []).filter(Boolean);
		const fallback = [data.baseMetaTags, data.metaTags, data.pageMetaTags].filter(
			(entry): entry is Partial<MetaTags> => Boolean(entry)
		);

		const layers = stack.length ? [...stack] : [...fallback];

		if (stack.length) {
			if (data.metaTags) layers.push(data.metaTags);
			if (data.pageMetaTags) layers.push(data.pageMetaTags);
		}

		return layers;
	};

	$: {
		metaStack = collectMetaLayers();
		meta = mergeMetaLayers(metaStack);
	}

	$: {
		const stack = (data.seoJsonLdStack ?? []).filter(Boolean);
		const fallback = [
			...(data.baseJsonLd ?? []),
			...(data.jsonLd ?? []),
			...(data.pageJsonLd ?? [])
		].filter(Boolean);

		let combined: unknown[] = stack.length ? [...stack] : [...fallback];

		if (stack.length) {
			if (data.jsonLd) combined = combined.concat(data.jsonLd);
			if (data.pageJsonLd) combined = combined.concat(data.pageJsonLd);
		}

		const seen: Record<string, boolean> = {};
		jsonLd = combined.filter((item) => {
			if (!item) return false;
			const key = typeof item === 'string' ? item : JSON.stringify(item);
			if (seen[key]) return false;
			seen[key] = true;
			return true;
		});
	}
</script>

<svelte:head>
	<title>{meta.title}</title>

	{#if meta.description}<meta name="description" content={meta.description} />{/if}
	{#if meta.author}<meta name="author" content={meta.author} />{/if}
	{#if meta.robots}<meta name="robots" content={meta.robots} />{/if}
	{#if meta.themeColor}<meta name="theme-color" content={meta.themeColor} />{/if}
	{#if meta.canonical}<link rel="canonical" href={meta.canonical} />{/if}

	<!-- Open Graph -->
	{#if meta.openGraph}
		{#if meta.openGraph.type}<meta property="og:type" content={meta.openGraph.type} />{/if}
		{#if meta.openGraph.site_name}<meta
				property="og:site_name"
				content={meta.openGraph.site_name}
			/>{/if}
		{#if meta.openGraph.locale}<meta property="og:locale" content={meta.openGraph.locale} />{/if}
		{#if meta.openGraph.title}<meta property="og:title" content={meta.openGraph.title} />{/if}
		{#if meta.openGraph.description}<meta
				property="og:description"
				content={meta.openGraph.description}
			/>{/if}
		{#if meta.openGraph.url}<meta property="og:url" content={meta.openGraph.url} />{/if}
	{/if}

	<!-- Twitter -->
	{#if meta.twitter}
		{#if meta.twitter.card}<meta name="twitter:card" content={meta.twitter.card} />{/if}
		{#if meta.twitter.title}<meta name="twitter:title" content={meta.twitter.title} />{/if}
		{#if meta.twitter.description}<meta
				name="twitter:description"
				content={meta.twitter.description}
			/>{/if}
	{/if}

	<!-- JSON-LD -->
	{#each jsonLd as item, i (i)}
		<svelte:element this={scriptTag} type="application/ld+json">
			{JSON.stringify(item).replace(/</g, '\\u003c')}
		</svelte:element>
	{/each}
</svelte:head>
