<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';                 // ensures links respect paths.base
	import { themeStore, indigoTheme, tealTheme } from '$lib/theme';
	import { get } from 'svelte/store';

	export let logo = 'pecuk.dev';

	// helper to prefix all internal routes with base
	const path = (p = '') => `${base}${p}`;

	export let links: { href: string; label: string }[] = [
		{ href: path('/'),         label: 'Home' },
		{ href: path('/projects'), label: 'Projects' },
		{ href: path('/about'),    label: 'About' },
		{ href: path('/contact'),  label: 'Contact' }
	];

	let open = false;

	function isActive(href: string) {
		const p = get(page).url.pathname;
		return p === href || p.startsWith(href + '/');
	}

	function toggleTheme() {
		const cur = get(themeStore);
		themeStore.set(cur === indigoTheme ? tealTheme : indigoTheme);
	}
</script>

<!-- Sticky wrapper so the nav stays on top -->
<div class="sticky top-4 z-50">
	<div class="mx-auto max-w-6xl px-4">
		<div
			class="flex items-center gap-3 rounded-2xl border border-white/15
                   bg-white/5 backdrop-blur-md
                   shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset]
                   px-3 py-2 md:px-4"
		>
			<!-- Logo -->
			<a
				href={path('/')}
				class="shrink-0 rounded-xl px-3 py-1.5
                       bg-white/10 border border-white/15
                       font-semibold tracking-tight"
			>
				{logo}
			</a>

			<!-- Desktop links -->
			<nav class="hidden md:flex items-center gap-1 ml-1">
				{#each links as l, i (l.href + '-' + i)}
					<a
						href={l.href}
						class="px-3 py-1.5 rounded-xl border transition
                               {isActive(l.href)
                                 ? 'bg-white/15 border-white/25'
                                 : 'hover:bg-white/10 border-transparent'}"
						aria-current={isActive(l.href) ? 'page' : undefined}
					>
						{l.label}
					</a>
				{/each}
			</nav>

			<div class="ml-auto flex items-center gap-2">
				<!-- Language placeholder -->
				<button
					class="hidden sm:inline-flex px-3 py-1.5 rounded-xl
                           border border-white/15 bg-white/5
                           hover:bg-white/10 transition"
					title="Language"
				>
					EN
				</button>

				<!-- Theme toggle -->
				<button
					class="px-3 py-1.5 rounded-xl border border-white/15
                           bg-white/5 hover:bg-white/10 transition"
					on:click={toggleTheme}
					title="Toggle theme"
				>
					Theme
				</button>

				<!-- Mobile menu toggle -->
				<button
					class="md:hidden px-3 py-1.5 rounded-xl border border-white/15
                           bg-white/5 hover:bg-white/10 transition"
					on:click={() => (open = !open)}
					aria-label="Toggle menu"
				>
					☰
				</button>
			</div>
		</div>

		<!-- Mobile dropdown -->
		{#if open}
			<div
				class="mt-2 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md
                       shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset] p-2 md:hidden"
			>
				{#each links as l, i (l.href + '-' + i)}
					<a
						href={l.href}
						class="block px-3 py-2 rounded-xl transition
                               {isActive(l.href)
                                 ? 'bg-white/15'
                                 : 'hover:bg-white/10'}"
						on:click={() => (open = false)}
					>
						{l.label}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>