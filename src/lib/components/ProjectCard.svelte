<script lang="ts">
	import { base } from '$app/paths';
	import type { Project } from '$lib/projects/data';
	export let p: Project;
</script>

<article class="rounded-2xl border border-white/12 bg-white/[0.06] hover:bg-white/[0.08] transition backdrop-blur-md">
	{#if p.cover}
		<img src={p.cover} alt={p.title} class="w-full aspect-[16/9] object-cover rounded-2xl" />
	{/if}

	<div class="p-4">
		<h3 class="text-lg font-semibold">{p.title}</h3>
		{#if p.year}<p class="mt-1 text-sm opacity-70">{p.year}</p>{/if}
		<p class="mt-2 opacity-85">{p.summary}</p>

		<div class="mt-3 flex flex-wrap gap-2 text-xs opacity-80">
			{#each p.tags as t (t)}
				<span class="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5">{t}</span>
			{/each}
		</div>

		<div class="mt-4 flex items-center gap-3">
			<a href={`${base}/projects/${p.slug}`} class="text-[var(--accent)] text-sm">Details →</a>
			{#if p.links}
				{#each p.links as l (l.href)}
					<a href={l.href} target="_blank" rel="noreferrer" class="text-sm opacity-90 hover:opacity-100">{l.label}</a>
				{/each}
			{/if}
		</div>
	</div>
</article>