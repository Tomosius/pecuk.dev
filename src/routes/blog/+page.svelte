<script lang="ts">
	import { base } from '$app/paths';
	import { loadIndex, query, type Item } from '$lib/content-search';

	// state
	let q = $state('');
	let selectedTech = $state<string[]>([]);
	let selectedKeywords = $state<string[]>([]);
	let loading = $state(true);

	// data
	let allPosts: Item[] = [];
	let results = $state<Item[]>([]);
	let allTech = $state<string[]>([]);
	let allKeywords = $state<string[]>([]);

	// load once
	$effect(async () => {
		const { items } = await loadIndex();
		allPosts = items.filter((i) => i.type === 'blog');

		// tech chips
		{
			const set = new Set<string>();
			for (const it of allPosts) for (const t of it.tech ?? []) set.add(t);
			allTech = Array.from(set).sort();
		}
		// keyword chips
		{
			const set = new Set<string>();
			for (const it of allPosts) for (const k of it.keywords ?? []) set.add(k);
			allKeywords = Array.from(set).sort();
		}

		results = allPosts;
		loading = false;
	});

	// recompute on changes
	$effect(() => {
		results = query(allPosts, {
			q,
			filter: {
				type: 'blog',
				techAny: selectedTech.length ? selectedTech : undefined,
				keywordAny: selectedKeywords.length ? selectedKeywords : undefined
			},
			sortBy: 'date',
			sortDir: 'desc'
		});
	});

	function toggle(list: string[], value: string) {
		const next = list.slice();
		const i = next.indexOf(value);
		i >= 0 ? next.splice(i, 1) : next.push(value);
		return next;
	}

	function toggleTech(t: string) {
		selectedTech = toggle(selectedTech, t);
	}
	function toggleKeyword(k: string) {
		selectedKeywords = toggle(selectedKeywords, k);
	}
	function clearFilters() {
		q = '';
		selectedTech = [];
		selectedKeywords = [];
	}

	const coverUrl = (p?: string | null) => (p ? `${base}${p}` : undefined);
</script>

<div class="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
	<header class="mb-6 pt-10">
		<h1 class="text-4xl font-bold tracking-tight">Blog</h1>
		<p class="mt-1 opacity-80">
			{loading ? 'Loading…' : `${results.length} post${results.length === 1 ? '' : 's'}`}
		</p>
	</header>

	<!-- Search + filters -->
	<div class="flex flex-col gap-4">
		<div class="flex flex-wrap items-center gap-3">
			<input
				placeholder="Search posts…"
				bind:value={q}
				class="rounded-xl border border-white/10 bg-white/10 px-4 py-2 placeholder-white/40 focus:ring-2 focus:ring-[var(--accent)] focus:outline-none"
			/>

			{#if selectedTech.length || selectedKeywords.length}
				<button class="text-sm underline opacity-80" onclick={clearFilters}>Clear</button>
			{/if}
		</div>

		<!-- Tech chips -->
		{#if allTech.length}
			<div class="flex flex-wrap items-center gap-2">
				<span class="mr-2 text-sm opacity-70">Tech:</span>
				{#each allTech as t (t)}
					<button
						class="rounded-lg border px-2 py-1 text-sm transition
							{selectedTech.includes(t)
							? 'border-[var(--accent)]/40 bg-[var(--accent)]/15'
							: 'border-white/10 bg-white/5 hover:bg-white/10'}"
						onclick={() => toggleTech(t)}
						title={t}>{t}</button
					>
				{/each}
			</div>
		{/if}

		<!-- Keyword chips -->
		{#if allKeywords.length}
			<div class="flex flex-wrap items-center gap-2">
				<span class="mr-2 text-sm opacity-70">Keywords:</span>
				{#each allKeywords as k (k)}
					<button
						class="rounded-lg border px-2 py-1 text-sm transition
							{selectedKeywords.includes(k)
							? 'border-[var(--accent)]/40 bg-[var(--accent)]/15'
							: 'border-white/10 bg-white/5 hover:bg-white/10'}"
						onclick={() => toggleKeyword(k)}
						title={k}>{k}</button
					>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Grid -->
	<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each results as it (it.slug)}
			<a
				href={`${base}/blog/${it.slug}`}
				class="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
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
					{#if it.date}<p class="mt-0.5 text-xs opacity-70">{it.date}</p>{/if}
					{#if it.summary}<p class="mt-1 line-clamp-3 text-sm opacity-80">{it.summary}</p>{/if}

					<!-- Badges -->
					{#if it.tech?.length}
						<div class="mt-3 flex flex-wrap gap-1.5">
							{#each it.tech.slice(0, 4) as t (t)}
								<span
									class="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-xs"
									>{t}</span
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
