<script lang="ts">
  import { Head } from '$lib';
  import type { ContentMeta } from '$lib/content';

  let { meta } = $props<{ meta: ContentMeta }>();
  const niceDate = $derived(meta.date ? new Date(meta.date).toLocaleDateString('en-GB') : '');
</script>

<!-- SEO -->
<Head title={meta.title} description={meta.summary} image={meta.cover} />

<header class="space-y-2">
  <h1 class="text-3xl font-bold">{meta.title}</h1>
  <p class="opacity-80">{meta.summary}</p>
  {#if niceDate}<p class="text-sm opacity-70">{niceDate}</p>{/if}
  {#if meta.cover}
    <img src={meta.cover} alt={meta.title} class="mt-2 w-full rounded-xl border border-white/10" />
  {/if}
  {#if meta.links}
    <div class="mt-2 flex flex-wrap gap-2">
      {#if meta.links.repo}
        <a href={meta.links.repo} target="_blank" rel="noreferrer"
           class="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 hover:bg-white/15 transition">Repo</a>
      {/if}
      {#if meta.links.demo}
        <a href={meta.links.demo} target="_blank" rel="noreferrer"
           class="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 hover:bg-white/15 transition">Live demo</a>
      {/if}
      {#if meta.links.docs}
        <a href={meta.links.docs} target="_blank" rel="noreferrer"
           class="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 hover:bg-white/15 transition">Docs</a>
      {/if}
    </div>
  {/if}
</header>