<script lang="ts">
	import '../app.css';
	import Head from '$lib/components/Head.svelte';
	import { themeStore } from '$lib/theme'; // use $themeStore in markup
</script>

<Head title="pecuk.dev" description="My website built with SvelteKit + Tailwind" />

<div
	class="relative min-h-screen text-white overflow-x-hidden"
	style="
    --bg-top: {$themeStore.bgTop};
    --bg-mid: {$themeStore.bgMid};
    --bg-bottom: {$themeStore.bgBottom};
    --glow-top: {$themeStore.glowTop};
    --glow-side: {$themeStore.glowSide};
  "
>
	<!-- Layer 1: vertical gradient -->
	<div class="pointer-events-none absolute inset-0 -z-10
              bg-[linear-gradient(to_bottom,var(--bg-top),var(--bg-mid),var(--bg-bottom))]"></div>

	<!-- Layer 2: wide hero glow (top-center, spills left & right more) -->
	<div class="pointer-events-none absolute inset-0 -z-10
              bg-[radial-gradient(1200px_650px_at_50%_0%,var(--glow-top),transparent_70%)]"></div>

	<!-- Layer 3: left edge glow -->
	<div class="pointer-events-none absolute inset-0 -z-10
              bg-[radial-gradient(720px_720px_at_0%_45%,var(--glow-side),transparent_62%)]"></div>

	<!-- (optional) right edge glow to balance -->
	<div class="pointer-events-none absolute inset-0 -z-10
              bg-[radial-gradient(720px_720px_at_100%_45%,var(--glow-side),transparent_62%)]"></div>

	<!-- Subtle stars/noise -->
	<div class="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]
              bg-[radial-gradient(2px_2px_at_20%_30%,#fff,transparent_40%),
                  radial-gradient(1.5px_1.5px_at_70%_60%,#fff,transparent_40%),
                  radial-gradient(1.5px_1.5px_at_40%_80%,#fff,transparent_40%)]"></div>

	<slot />
</div>