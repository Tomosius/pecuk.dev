<script lang="ts">
	import type { Project } from '$lib/projects/data';
	import { base, assets } from '$app/paths';

	// comes from +page.ts
	export let data: { p: Project };

	const url = (v?: string) => (v ? `${assets}/${v}` : undefined);
</script>

<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-24">
	<a href={`${base}/projects`} class="text-sm opacity-80 hover:opacity-100">← All projects</a>

	<h1 class="mt-4 text-4xl font-bold tracking-tight">{data.p.title}</h1>
	{#if data.p.period}<p class="mt-1 opacity-70">{data.p.period}</p>{/if}

	{#if data.p.cover}
		<img
			class="mt-6 w-full rounded-2xl border border-white/10"
			src={url(data.p.cover)}
			alt={data.p.title}
		/>
	{/if}

	<p class="mt-6 opacity-85">{data.p.summary}</p>

	<div class="mt-4 flex flex-wrap gap-2 text-xs opacity-80">
		{#each data.p.tags ?? [] as t (t)}
			<span class="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5">{t}</span>
		{/each}
	</div>

	{#if data.p.links?.length}
		<div class="mt-6 flex flex-wrap gap-3">
			{#each data.p.links as l (l.href)}
				<a
					href={l.href}
					target="_blank"
					rel="noreferrer"
					class="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
				>
					{l.label}
				</a>
			{/each}
		</div>
	{/if}

	{#if data.p.gallery?.length}
		<div class="grid grid-cols-2 gap-3 mt-8">
			{#each data.p.gallery as g (g)}
				<img src={url(g)} alt={`${data.p.title} screenshot`} class="rounded-lg" />
			{/each}
		</div>
	{/if}
</div>