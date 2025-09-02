<script lang="ts">
	import '../app.css';
	import Head from '$lib/components/Head.svelte';
	import { themeStore } from '$lib/theme'; // use $themeStore in markup
</script>
<!-- Global head -->
<Head title="pecuk.dev" description="My website built with SvelteKit + Tailwind" />

<!-- Page wrapper with dynamic CSS variables from the store -->
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

	<!-- Layer 2: hero glow (top-center) -->
	<div class="pointer-events-none absolute inset-0 -z-10
              bg-[radial-gradient(1000px_500px_at_50%_0%,var(--glow-top),transparent_65%)]"></div>

	<!-- Layer 3: side glow (left edge) -->
	<div class="pointer-events-none absolute inset-0 -z-10
              bg-[radial-gradient(700px_700px_at_0%_50%,var(--glow-side),transparent_60%)]"></div>

	<!-- Optional stars/noise -->
	<div class="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]
              bg-[radial-gradient(2px_2px_at_20%_30%,#fff,transparent_40%),
                  radial-gradient(1.5px_1.5px_at_70%_60%,#fff,transparent_40%),
                  radial-gradient(1.5px_1.5px_at_40%_80%,#fff,transparent_40%)]"></div>

	<!-- Page content -->

	<slot />

</div>