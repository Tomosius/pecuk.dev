<script lang="ts">
	import '../app.css';
	import Head from '$lib/components/Head.svelte';

	let { children } = $props();
</script>

<Head /> <!-- only once here -->
{@render children?.()}