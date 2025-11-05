<script lang="ts">
	import { resolve } from '$app/paths';

	// local RouteId-ish type so TS is happy
	type RouteId = `/${string}`;

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

	// we’ll use this in <svelte:element this={anchor}>
	const anchor = 'a';

	// derive everything the template needs
	const external = isExternal(item.url);

	// final href the linter can see
	const href = external ? item.url : resolve(item.url as RouteId, emptyParams);

	const rel = external ? 'noreferrer' : undefined;
	const target = external ? '_blank' : undefined;
</script>

<svelte:element
	this={anchor}
	{href}
	{rel}
	{target}
	class="border-white/12 block rounded-2xl border bg-white/[0.06] backdrop-blur-md transition hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
>
	{#if item.image}
		<img src={item.image} alt={item.title} class="aspect-[16/9] w-full rounded-2xl object-cover" />
	{/if}

	<article class="p-4">
		<h3 class="text-lg font-semibold">{item.title}</h3>

		{#if item.description}
			<p class="mt-2 opacity-85">{item.description}</p>
		{/if}

		{#if item.tags?.length}
			<div class="mt-3 flex flex-wrap gap-2 text-xs opacity-80">
				{#each item.tags as tag (tag)}
					<span class="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</article>
</svelte:element>
