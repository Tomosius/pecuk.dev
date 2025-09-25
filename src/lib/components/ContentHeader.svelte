<script lang="ts">
	import { Head } from '$lib';
	import type { ContentMeta } from '$lib/content';
	import { base } from '$app/paths';
	import { techLabel, isTechId, type TechId } from '$lib/tech';

	let { meta, showKeywords = true } = $props<{ meta: ContentMeta; showKeywords?: boolean }>();

	const niceDate = $derived(
		meta.date
			? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date(meta.date))
			: ''
	);

	const coverUrl = $derived.by<string | null>(() => {
		const p = meta.cover;
		if (!p) return null;
		if (p.startsWith('http') || p.startsWith('/_app/') || p.startsWith('data:')) return p;
		if (p.startsWith('/')) return `${base}${p}`;
		return `${base}/${p}`;
	});

	const pageKeywords = $derived<string[]>(
		Array.from(
			new Set<string>([
				...(meta.keywords ?? []),
				...(meta.tech ?? []).map((t: TechId | string) => (isTechId(t) ? techLabel(t) : String(t)))
			])
		)
	);

	const headType = $derived(meta.type === 'blog' ? 'article' : 'website');
	const hasLinks = $derived(
		!!meta.links && (meta.links.repo || meta.links.demo || meta.links.docs)
	);
</script>

<Head
	title={meta.title}
	description={meta.summary}
	image={coverUrl ?? undefined}
	type={headType}
	keywords={pageKeywords}
/>

<header class="space-y-2">
	<h1 class="text-3xl font-bold">{meta.title}</h1>
	{#if meta.summary}<p class="opacity-80">{meta.summary}</p>{/if}
	{#if niceDate}<p class="text-sm opacity-70">{niceDate}</p>{/if}

	{#if coverUrl}
		<!-- If purely decorative, prefer: alt="" aria-hidden="true" -->
		<img
			src={coverUrl}
			alt={meta.title}
			class="mt-2 w-full rounded-xl border border-white/10"
			loading="lazy"
			decoding="async"
		/>
	{/if}

	{#if hasLinks}
		<nav class="mt-2 flex flex-wrap gap-2" aria-label={`External links for ${meta.title}`}>
			{#if meta.links?.repo}
				<a
					href={meta.links.repo}
					target="_blank"
					rel="external noopener noreferrer"
					class="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 transition hover:bg-white/15"
					>Repo</a
				>
			{/if}
			{#if meta.links?.demo}
				<a
					href={meta.links.demo}
					target="_blank"
					rel="external noopener noreferrer"
					class="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 transition hover:bg-white/15"
					>Live demo</a
				>
			{/if}
			{#if meta.links?.docs}
				<a
					href={meta.links.docs}
					target="_blank"
					rel="external noopener noreferrer"
					class="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 transition hover:bg-white/15"
					>Docs</a
				>
			{/if}
		</nav>
	{/if}

	{#if showKeywords && pageKeywords.length}
		<!-- Use a semantic list instead of aria-label on a bare div -->
		<ul class="mt-2 flex flex-wrap gap-1.5">
			{#each pageKeywords as k (k)}
				<li
					class="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-xs"
				>
					{k}
				</li>
			{/each}
		</ul>
	{/if}
</header>
