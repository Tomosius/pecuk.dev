<script lang="ts">
	export let title: string = 'My Site';
	export let description: string = 'Default site description';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Example: Open Graph / Twitter cards -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>