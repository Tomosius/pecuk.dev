<script lang="ts">
	import '../app.css';
	import Head from '$lib/components/Head.svelte';
	import { themeStore } from '$lib/theme';
	import Navbar from '$lib/components/Navbar.svelte';
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
    --accent: {$themeStore.accent};
    --accent-soft: {$themeStore.accentSoft};
  "
>
	<!-- ONE background layer with multiple images (top-most first) -->
	<div
		class="pointer-events-none absolute inset-0 -z-10"
		style="
      background-image:
        /* top dome (wider, fades earlier; blended in OKLCH) */
        radial-gradient(1200px 700px at 50% 0%,
          color-mix(in oklch, var(--glow-top) 35%, transparent),
          transparent 78%),
        /* left glow */
        radial-gradient(640px 640px at 0% 45%,
          color-mix(in oklch, var(--glow-side) 30%, transparent),
          transparent 72%),
        /* right glow */
        radial-gradient(640px 640px at 100% 45%,
          color-mix(in oklch, var(--glow-side) 30%, transparent),
          transparent 72%),
        /* vertical base (weighted midpoint to keep it dark) */
        linear-gradient(
          to bottom,
          var(--bg-top) 0%,
          color-mix(in oklch, var(--bg-top) 70%, var(--bg-mid) 30%) 50%,
          var(--bg-bottom) 100%
        );
      background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
      background-size: cover, cover, cover, cover;
      background-position: center, center, center, center;
    "
	></div>

	<!-- content -->
	<div class="pt-6 md:pt-8">
		<Navbar logo="Logo" />
	</div>
	<slot />
</div>