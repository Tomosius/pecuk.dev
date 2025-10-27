<script>
	let { data } = $props();
	const { baseMetaTags, baseJsonLd = [] } = data;
</script>

<svelte:head>
	<title>{baseMetaTags.title}</title>
	<meta name="description" content={baseMetaTags.description} />
	<meta name="author" content={baseMetaTags.author} />
	<meta name="robots" content={baseMetaTags.robots} />
	<meta name="theme-color" content={baseMetaTags.themeColor} />
	<link rel="canonical" href={baseMetaTags.canonical} />

	<!-- Open Graph -->
	<meta property="og:type" content={baseMetaTags.openGraph.type} />
	<meta property="og:site_name" content={baseMetaTags.openGraph.site_name} />
	<meta property="og:locale" content={baseMetaTags.openGraph.locale} />
	<meta property="og:title" content={baseMetaTags.openGraph.title} />
	<meta property="og:description" content={baseMetaTags.openGraph.description} />
	<meta property="og:url" content={baseMetaTags.openGraph.url} />

	<!-- Twitter -->
	<meta name="twitter:card" content={baseMetaTags.twitter.card} />
	<meta name="twitter:title" content={baseMetaTags.openGraph.title} />
	<meta name="twitter:description" content={baseMetaTags.openGraph.description} />

	<!-- JSON-LD -->
	{#each baseJsonLd as item, i (i)}
		<script type="application/ld+json">
{JSON.stringify(item).replace(/</g, '\\u003c')}
		</script>
	{/each}
</svelte:head>