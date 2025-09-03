<script lang="ts">
	import { base } from '$app/paths';
	import type { PostListItem } from '$lib/blog/content';
	export let data: { posts: PostListItem[] };

	let q = '';
	let selected: string[] = [];

	const allTags = Array.from(new Set(data.posts.flatMap((p) => p.meta.tags ?? []))).sort();

	function toggleTag(t: string) {
		selected = selected.includes(t) ? selected.filter((x) => x !== t) : [...selected, t];
	}

	$: filtered = data.posts
		.filter((p) =>
			!q
				? true
				: (
					`${p.meta.title} ${p.meta.summary ?? ''} ${(p.meta.tags ?? []).join(' ')}`
				)
					.toLowerCase()
					.includes(q.toLowerCase())
		)
		.filter(
			(p) => selected.length === 0 || (p.meta.tags ?? []).some((t) => selected.includes(t))
		);
</script>

<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
	<h1 class="pt-10 text-4xl font-bold tracking-tight">Blog</h1>

	<!-- filters -->
	<div class="mt-6 flex flex-wrap items-center gap-3">
		<input
			placeholder="Search posts…"
			bind:value={q}
			class="rounded-xl border border-white/10 bg-white/10 px-4 py-2 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
		/>

		<div class="flex flex-wrap gap-2">
			{#each allTags as t (t)}
				<button
					type="button"
					aria-pressed={selected.includes(t)}
					class="rounded-lg border px-2 py-1 text-sm {selected.includes(t)
            ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10'
            : 'border-white/10 bg-white/5'}"
					on:click={() => toggleTag(t)}
				>
					{t}
				</button>
			{/each}

			{#if selected.length}
				<button type="button" class="text-sm opacity-80 underline" on:click={() => (selected = [])}>
					Clear
				</button>
			{/if}
		</div>
	</div>

	<!-- list -->
	<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each filtered as p (p.slug)}
			<a
				class="block rounded-2xl border border-white/12 bg-white/[0.06] p-5 hover:bg-white/[0.08] transition"
				href={`${base}/blog/${p.slug}`}
			>
				<h2 class="text-lg font-semibold">{p.meta.title}</h2>
				{#if p.meta.date}
					<p class="mt-1 text-sm opacity-70">{p.meta.date}</p>
				{/if}
				{#if p.meta.summary}
					<p class="mt-3 opacity-85">{p.meta.summary}</p>
				{/if}
				{#if p.meta.tags?.length}
					<div class="mt-3 flex flex-wrap gap-1.5 text-xs opacity-80">
						{#each p.meta.tags as t (t)}
							<span class="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5">{t}</span>
						{/each}
					</div>
				{/if}
			</a>
		{/each}
	</div>
</div>