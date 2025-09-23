<script lang="ts">
	import { base } from '$app/paths';
	import { loadIndex, query, type Item } from '$lib/content-search';

	// UI state (use let with $state if you'll reassign)
	let q = $state('');
	let selectedTech = $state<string[]>([]);
	let loading = $state(true);

	// data
	let allProjects: Item[] = [];
	let results = $state<Item[]>([]);
	let allTech = $state<string[]>([]); // unique tech list for chips

	// load once
	$effect(async () => {
		const { items } = await loadIndex();
		allProjects = items.filter((i) => i.type === 'project');

		// build unique tech list
		const set = new Set<string>();
		for (const it of allProjects) for (const t of it.tech) set.add(t);
		allTech = Array.from(set).sort();

		// initial view
		results = allProjects;
		loading = false;
	});

	// recompute whenever q / selectedTech changes
	$effect(() => {
		results = query(allProjects, {
			q,
			filter: {
				type: 'project',
				techAny: selectedTech.length ? selectedTech : undefined
			},
			sortBy: 'date',
			sortDir: 'desc'
		});
	});

	function toggleTech(t: string) {
		const next = selectedTech.slice();
		const i = next.indexOf(t);
		if (i >= 0) next.splice(i, 1);
		else next.push(t);
		selectedTech = next;
	}

	function clearFilters() {
		q = '';
		selectedTech = [];
	}

	// helper for cover paths
	const coverUrl = (p?: string | null) => (p ? `${base}${p}` : undefined);
</script>

<div class="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
	<header class="mb-6 pt-10">
		<h1 class="text-4xl font-bold tracking-tight">Projects</h1>
		<p class="mt-1 opacity-80">
			{loading ? 'Loading…' : `${results.length} item${results.length === 1 ? '' : 's'}`}
		</p>
	</header>

	<!-- Filters -->
	<div class="flex flex-wrap items-center gap-3">
		<input
			placeholder="Search projects…"
			bind:value={q}
			class="rounded-xl border border-white/10 bg-white/10 px-4 py-2 placeholder-white/40
             focus:ring-2 focus:ring-[var(--accent)] focus:outline-none"
		/>

		<div class="flex flex-wrap gap-2">
			{#each allTech as t (t)}
				<button
					class="rounded-lg border px-2 py-1 text-sm transition
                 {selectedTech.includes(t)
						? 'border-[var(--accent)]/40 bg-[var(--accent)]/15'
						: 'border-white/10 bg-white/5 hover:bg-white/10'}"
					onclick={() => toggleTech(t)}
				>
					{t}
				</button>
			{/each}

			{#if selectedTech.length}
				<button class="text-sm underline opacity-80" onclick={clearFilters}> Clear </button>
			{/if}
		</div>
	</div>

	<!-- Grid -->
	<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each results as it (it.slug)}
			<a
				href={`${base}/projects/${it.slug}`}
				class="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5
               shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-sm transition
               hover:border-white/20 hover:bg-white/10"
			>
				<!-- Cover -->
				{#if it.cover}
					<img src={coverUrl(it.cover)} alt="" class="h-40 w-full object-cover" />
				{:else}
					<div class="h-40 w-full bg-gradient-to-b from-white/10 to-white/5"></div>
				{/if}

				<!-- Body -->
				<div class="p-4">
					<h2 class="text-lg font-semibold">{it.title}</h2>
					{#if it.summary}
						<p class="mt-1 line-clamp-3 text-sm opacity-80">{it.summary}</p>
					{/if}

					<!-- Tech badges -->
					{#if it.tech?.length}
						<div class="mt-3 flex flex-wrap gap-1.5">
							{#each it.tech.slice(0, 4) as t (t)}
								<span
									class="inline-flex items-center rounded-full border border-white/10 bg-white/10
                              px-2 py-0.5 text-xs">{t}</span
								>
							{/each}
							{#if it.tech.length > 4}
								<span class="text-xs opacity-70">+{it.tech.length - 4} more</span>
							{/if}
						</div>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>
