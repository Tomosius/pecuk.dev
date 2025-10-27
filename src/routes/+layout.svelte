<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';

	import { page } from '$app/state';
	import { MetaTags, JsonLd, deepMerge } from 'svelte-meta-tags';

	let { data, children } = $props();

	const toArr = (v: unknown) => (Array.isArray(v) ? v : v ? [v] : []);

	// merge only the known meta fields
	let metaTags = $derived(deepMerge(data.baseMetaTags ?? {}, page.data.pageMetaTags ?? {}));

	// keep JSON-LD separate (deepMerge drops unknown keys like jsonLd)
	type JsonLdBlock = Record<string, unknown>;
	const schemas: JsonLdBlock[] = $derived([
		...(toArr(data.baseJsonLd) as JsonLdBlock[]),
		...(toArr(page.data.pageJsonLd) as JsonLdBlock[])
	]);

	const schemaKey = (s: JsonLdBlock, i: number) =>
		String(
			(s['@id'] as string) ??
				(s['url'] as string) ??
				(s['name'] as string) ??
				(s['@type'] as string) ??
				i
		);
</script>

<MetaTags {...metaTags} />

{#each schemas as schema, i (schemaKey(schema, i))}
	<JsonLd {schema} />
{/each}

{@render children?.()}
