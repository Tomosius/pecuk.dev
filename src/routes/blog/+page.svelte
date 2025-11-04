<script lang="ts">
	import { onMount } from 'svelte';
	import { getByType, type ContentItem } from '$lib/content';
	import ContentCard from '$lib/components/ContentCard.svelte';

	let posts: ContentItem[] = [];

	onMount(async () => {
		// this will read /search-index.json through your helper
		posts = await getByType('blog');
	});
</script>

{#if posts.length === 0}
	<p>No blog posts yet.</p>
{:else}
	<div class="grid gap-4 md:grid-cols-2">
		{#each posts as post (post.url)}
			<ContentCard item={post} />
		{/each}
	</div>
{/if}