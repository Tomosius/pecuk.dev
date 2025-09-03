<script lang="ts">
	import { projects } from '$lib/projects/data';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { assets } from '$app/paths';

	let q = '';
	let selected = new Set<string>(); // filter by tags

	const allTags = Array.from(new Set(projects.flatMap((p) => p.tags ?? []))).sort();

	$: filtered = projects
		.filter((p) =>
			!q
				? true
				: (p.title + ' ' + p.summary + ' ' + (p.tags ?? []).join(' '))
					.toLowerCase()
					.includes(q.toLowerCase())
		)
		.filter((p) => selected.size === 0 || (p.tags ?? []).some((t) => selected.has(t)));

	// image url helper for child (optional, if your ProjectCard uses assets internally you can drop this)
	const url = (p: string) => `${assets}/${p}`;

	function toggleTag(t: string) {
		const next = new Set(selected);
		next.has(t) ? next.delete(t) : next.add(t);
		selected = next; // <- reassign so Svelte updates
	}
</script>

<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
	<h1 class="pt-10 text-4xl font-bold tracking-tight">Projects</h1>

	<!-- filters -->
	<div class="mt-6 flex flex-wrap items-center gap-3">
		<input
			placeholder="Search projects…"
			bind:value={q}
			class="rounded-xl border border-white/10 bg-white/10 px-4 py-2 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]" />

		<div class="flex flex-wrap gap-2">
			{#each allTags as t (t)}
				<button
					class="rounded-lg border px-2 py-1 text-sm
                 {selected.has(t) ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10' : 'border-white/10 bg-white/5'}"
					on:click={() => toggleTag(t)}
				>{t}</button>
			{/each}

			{#if selected.size}
				<button class="text-sm opacity-80 underline" on:click={() => (selected = new Set())}>Clear</button>
			{/if}
		</div>
	</div>

	<!-- grid -->
	<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each filtered as p (p.slug)}
			<!-- If your ProjectCard handles assets itself, just pass {p}. Otherwise pass coverUrl as well -->
			<ProjectCard {p} coverUrl={p.cover ? url(p.cover) : undefined} />
		{/each}
	</div>
</div>