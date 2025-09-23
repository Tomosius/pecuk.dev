<script lang="ts">
	import type { ContentMeta } from '$lib/content';
	import ContentHeader from './ContentHeader.svelte';
	import TechStack from './TechStack.svelte';

	let { meta, children } = $props<{ meta: ContentMeta; children?: () => any }>();
</script>

<article class="mx-auto max-w-3xl space-y-6">
	<ContentHeader {meta} />
	<TechStack ids={meta.tech} />
	{@render children?.()}
</article>
