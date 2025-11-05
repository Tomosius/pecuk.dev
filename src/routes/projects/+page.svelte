<script lang="ts">
	import { onMount } from 'svelte';
	import { getByType, type ContentItem } from '$lib/content';
	import ContentCard from '$lib/components/ContentCard.svelte';

	let q = '';
	let selected: string[] = [];
	let allTags: string[] = [];

	let all: ContentItem[] = [];
	let filtered: ContentItem[] = [];

	// runtime flexsearch instance (if available)
	let flex: unknown = null;

	onMount(async () => {
		const items = await getByType('project');

		all = items;
		filtered = items;

		// collect tags from all projects
		allTags = Array.from(new Set(items.flatMap((p) => p.tags ?? []))).sort();

		// try to build flexsearch index
		try {
			const { Document } = await import('flexsearch');
			const doc = new Document({
				document: {
					id: 'url',
					index: ['title', 'description', 'tags']
				}
			});

			for (const item of items) {
				doc.add({
					...item,
					tags: (item.tags ?? []).join(' ')
				});
			}

			flex = doc;
		} catch (err) {
			console.warn('flexsearch not available, using simple filter', err);
		}
	});

	function toggleTag(tag: string) {
		selected = selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag];
	}

	// apply tag + text filters
	$: {
		let base = all;

		// tag filter
		if (selected.length) {
			base = base.filter((item) => (item.tags ?? []).some((t) => selected.includes(t)));
		}

		const query = q.trim();
		if (query) {
			// if flexsearch is ready, use it
			if (flex && typeof (flex as { search: unknown }).search === 'function') {
				const doc = flex as {
					search: (
						q: string,
						opts?: { enrich?: boolean }
					) => Array<{ result: Array<{ id: string }> }>;
				};
				const res = doc.search(query, { enrich: true });

				// collect ids into a plain array to avoid Set lint
				const hitIds: string[] = [];
				for (const group of res) {
					for (const r of group.result) {
						if (!hitIds.includes(r.id)) {
							hitIds.push(r.id);
						}
					}
				}

				base = base.filter((item) => hitIds.includes(item.url));
			} else {
				// fallback simple search
				const ql = query.toLowerCase();
				base = base.filter((item) => {
					const haystack = [item.title, item.description ?? '', ...(item.tags ?? [])]
						.join(' ')
						.toLowerCase();
					return haystack.includes(ql);
				});
			}
		}

		filtered = base;
	}
</script>

<div class="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
	<h1 class="pt-10 text-4xl font-bold tracking-tight">Projects</h1>

	<!-- search + tags -->
	<div class="mt-6 flex flex-wrap items-center gap-3">
		<input
			aria-label="projects-search"
			type="search"
			placeholder="Search projects…"
			bind:value={q}
			class="rounded-xl border border-white/10 bg-white/10 px-4 py-2 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
		/>

		<div class="flex flex-wrap gap-2">
			{#each allTags as t (t)}
				<button
					type="button"
					class={`rounded-lg border px-2 py-1 text-sm ${
						selected.includes(t)
							? 'border-[var(--accent)]/40 bg-[var(--accent)]/10'
							: 'border-white/10 bg-white/5'
					}`}
					on:click={() => toggleTag(t)}
				>
					{t}
				</button>
			{/each}

			{#if selected.length}
				<button type="button" class="text-sm underline opacity-80" on:click={() => (selected = [])}>
					Clear
				</button>
			{/if}
		</div>
	</div>

	<!-- grid -->
	{#if filtered.length === 0}
		<p class="mt-8 text-white/60">No projects match your filters.</p>
	{:else}
		<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each filtered as item (item.url)}
				<ContentCard {item} />
			{/each}
		</div>
	{/if}
</div>
