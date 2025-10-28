<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import Head from '$lib/components/Head.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	import { themeStore } from '$lib/theme';
	import { get } from 'svelte/store';

	// Svelte 5 runes: get children from $props()
	let { children } = $props();

	// Local reactive theme snapshot (subscribe with $effect)
	let theme = $state(get(themeStore));
	$effect(() => {
		const un = themeStore.subscribe((v) => (theme = v));
		return un;
	});
</script>

<!-- Head now reads from $page.data, so no props -->
<Head />

<div
	class="relative min-h-screen overflow-x-hidden text-white"
	style={`--bg-top:${theme.bgTop}; --bg-mid:${theme.bgMid}; --bg-bottom:${theme.bgBottom}; --glow-top:${theme.glowTop}; --glow-side:${theme.glowSide}; --accent:${theme.accent}; --accent-soft:${theme.accentSoft};`}
>
	<!-- One fixed background layer -->
	<div
		class="pointer-events-none absolute inset-0 -z-10"
		style="
			background-image:
				radial-gradient(1200px 700px at 50% 0%,
					color-mix(in oklch, var(--glow-top) 35%, transparent),
					transparent 78%),
				radial-gradient(640px 640px at 0% 45%,
					color-mix(in oklch, var(--glow-side) 30%, transparent),
					transparent 72%),
				radial-gradient(640px 640px at 100% 45%,
					color-mix(in oklch, var(--glow-side) 30%, transparent),
					transparent 72%),
				linear-gradient(
					to bottom,
					var(--bg-top) 0%,
					color-mix(in oklch, var(--bg-top) 70%, var(--bg-mid) 30%) 50%,
					var(--bg-bottom) 100%
				);
			background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
			background-position: center, center, center, center;
			background-size: cover, cover, cover, cover;

		"
	></div>

	<!-- content -->
	<div class="pt-6 md:pt-8">
		<Navbar />
	</div>

	{@render children?.()}
</div>
