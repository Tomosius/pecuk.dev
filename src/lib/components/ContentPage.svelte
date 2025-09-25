<script lang="ts">
	import type { ContentMeta } from '$lib/content';
	import ContentHeader from './ContentHeader.svelte';
	import TechStack from './TechStack.svelte';
	import type { Snippet } from 'svelte';

	// children is a Svelte 5 Snippet (not () => any)
	let { meta, children } = $props<{ meta: ContentMeta; children?: Snippet }>();
</script>

<article class="mx-auto max-w-3xl space-y-6">
	<ContentHeader {meta} />
	<TechStack ids={meta.tech} />
	{@render children?.()}
</article>
