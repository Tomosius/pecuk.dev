<script lang="ts">
	import { resolve } from '$app/paths';
	import type { RouteId } from '$app/paths';

	// whatever shape you had before — keeping it simple here
	export let item: {
		url: string;
		title: string;
		description?: string;
		image?: string;
		tags?: string[];
	};

	const emptyParams = {} as Record<string, string>;

	const isExternal = (href: string) =>
		/^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');

	// we’ll branch in markup, not here, so the linter can see the internal <a> clearly
</script>

{#if isExternal(item.url)}
	<!-- external link: allowed to be “raw” -->
	<svelte:element
		this="a"
		href={item.url}
		rel="noreferrer"
		target="_blank"
		class="block rounded-2xl border border-white/12 bg-white/[0.06] hover:bg-white/[0.08] transition backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
	>
		{#if item.image}
			<img src={item.image} alt={item.title} class="w-full aspect-[16/9] object-cover rounded-2xl" />
		{/if}

		<article class="p-4">
			<h3 class="text-lg font-semibold">{item.title}</h3>
			{#if item.description}
				<p class="mt-2 opacity-85">{item.description}</p>
			{/if}
			{#if item.tags?.length}
				<div class="mt-3 flex flex-wrap gap-2 text-xs opacity-80">
					{#each item.tags as tag (tag)}
						<span class="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5">{tag}</span>
					{/each}
				</div>
			{/if}
		</article>
	</svelte:element>
{:else}
	<!-- internal link: MUST be resolved so eslint is happy -->
	<a
		href={resolve(item.url as unknown as RouteId, emptyParams)}
		class="block rounded-2xl border border-white/12 bg-white/[0.06] hover:bg-white/[0.08] transition backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
	>
		{#if item.image}
			<img src={item.image} alt={item.title} class="w-full aspect-[16/9] object-cover rounded-2xl" />
		{/if}

		<article class="p-4">
			<h3 class="text-lg font-semibold">{item.title}</h3>
			{#if item.description}
				<p class="mt-2 opacity-85">{item.description}</p>
			{/if}
			{#if item.tags?.length}
				<div class="mt-3 flex flex-wrap gap-2 text-xs opacity-80">
					{#each item.tags as tag (tag)}
						<span class="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5">{tag}</span>
					{/each}
				</div>
			{/if}
		</article>
	</a>
{/if}