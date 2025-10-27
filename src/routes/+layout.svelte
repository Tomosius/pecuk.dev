<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import Head from '$lib/components/Head.svelte'; // ✅ make sure path is correct

	let { data, children } = $props();
</script>

<Head {data} />
<!-- ✅ pass data to Head -->
{@render children?.()}
