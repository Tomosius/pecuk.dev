<script lang="ts">
	import '../app.css';
	import { Head } from '$lib';

	let { children } = $props();
</script>

<!-- Global head metadata -->
<Head />

<!-- Background layer -->
<div class="min-h-dvh bg-app text-white">
	<!-- Page content -->
	{@render children?.()}
</div>
