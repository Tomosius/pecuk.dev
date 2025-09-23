<script lang="ts">
	import { Head } from '$lib';
	import type { ContentMeta } from '$lib/content';
	import { base } from '$app/paths';
	import { techLabel, isTechId } from '$lib/tech';

	let { meta, showKeywords = true } = $props<{ meta: ContentMeta; showKeywords?: boolean }>();

	// pretty date
	const niceDate = $derived(
		meta.date
			? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date(meta.date))
			: ''
	);

	// cover with base (subpath friendly)
	const coverUrl = $derived(meta.cover ? `${base}${meta.cover}` : null);

	// page-level keywords = meta.keywords + tech labels (deduped)
	const pageKeywords = $derived(() => {
		const kws = meta.keywords ?? [];
		const techWords = (meta.tech ?? []).map((t) => (isTechId(t) ? techLabel(t) : String(t)));
		return Array.from(new Set([...kws, ...techWords]));
	});

	// og:type
	const headType = $derived(meta.type === 'blog' ? 'article' : 'website');

	const hasLinks = $derived(
		!!meta.links && (meta.links.repo || meta.links.demo || meta.links.docs)
	);
</script>

<!-- SEO: pass merged, page-specific keywords; Head will combine with site defaults -->
<Head
	title={meta.title}
	description={meta.summary}
	image={meta.cover}
	type={headType}
	keywords={pageKeywords}
/>

<header class="space-y-2">
	<h1 class="text-3xl font-bold">{meta.title}</h1>
	{#if meta.summary}<p class="opacity-80">{meta.summary}</p>{/if}
	{#if niceDate}<p class="text-sm opacity-70">{niceDate}</p>{/if}

	{#if coverUrl}
		<img
			src={coverUrl}
			alt={meta.title}
			class="mt-2 w-full rounded-xl border border-white/10"
			loading="lazy"
			decoding="async"
		/>
	{/if}

	{#if hasLinks}
		<nav class="mt-2 flex flex-wrap gap-2" aria-label="External links">
			{#if meta.links?.repo}
				<a
					href={meta.links.repo}
					target="_blank"
					rel="noreferrer"
					class="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 transition hover:bg-white/15"
					aria-label="Repository">Repo</a
				>
			{/if}
			{#if meta.links?.demo}
				<a
					href={meta.links.demo}
					target="_blank"
					rel="noreferrer"
					class="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 transition hover:bg-white/15"
					aria-label="Live demo">Live demo</a
				>
			{/if}
			{#if meta.links?.docs}
				<a
					href={meta.links.docs}
					target="_blank"
					rel="noreferrer"
					class="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 transition hover:bg-white/15"
					aria-label="Documentation">Docs</a
				>
			{/if}
		</nav>
	{/if}

	{#if showKeywords && pageKeywords.length}
		<div class="mt-2 flex flex-wrap gap-1.5" aria-label="Keywords">
			{#each pageKeywords as k (k)}
				<span
					class="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-xs"
					>{k}</span
				>
			{/each}
		</div>
	{/if}
</header>
