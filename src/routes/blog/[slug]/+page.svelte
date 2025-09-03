<script lang="ts">
	import { base } from '$app/paths';

	export let data: {
		slug: string;
		meta: {
			title: string;
			summary?: string;
			date?: string;
			tags?: string[];
			cover?: string;   // if you add cover to frontmatter
		};
		component: unknown; // compiled md component from mdsvex
	};

	const Post = data.component as any;
</script>

<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-24">
	<a href={`${base}/blog`} class="text-sm opacity-80 hover:opacity-100">← All posts</a>

	<h1 class="mt-4 text-4xl font-bold tracking-tight">{data.meta.title}</h1>
	{#if data.meta.date}
		<p class="mt-1 opacity-70">{data.meta.date}</p>
	{/if}

	{#if data.meta.tags?.length}
		<div class="mt-3 flex flex-wrap gap-1.5 text-xs opacity-80">
			{#each data.meta.tags as t (t)}
				<span class="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5">{t}</span>
			{/each}
		</div>
	{/if}

	<!-- Optional cover image from frontmatter (served from /static, so prefix with base) -->
	{#if data.meta.cover}
		<img
			src={`${base}/${data.meta.cover}`}
			alt={data.meta.title}
			class="mt-6 w-full rounded-2xl border border-white/10"
		/>
	{/if}

	<article class="prose prose-invert max-w-none mt-8">
		<Post />
	</article>
</div>