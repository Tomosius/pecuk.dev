<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { get } from 'svelte/store';

	// remove unused export (to silence the warning)
	// export let logo = 'pecuk.dev';

	const path = (p = '') => `${base}${p}`;

	export let links: { href: string; label: string }[] = [
		{ href: path('/'), label: 'Home' },
		{ href: path('/projects'), label: 'Projects' },
		{ href: path('/blog'), label: 'Blog' },
		{ href: path('/about'), label: 'About' },
		{ href: path('/contact'), label: 'Contact' }
	];

	let open = false;

	function isActive(href: string) {
		const p = get(page).url.pathname;
		return p === href || p.startsWith(href + '/');
	}
</script>

<div class="sticky top-4 z-50 mb-4">
	<div class="mx-auto max-w-6xl px-4">
		<div
			class="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset] backdrop-blur-md md:px-4"
		>
			<!-- Logo (served from /static and prefixed with base) -->
			<a
				href={path('/')}
				class="flex shrink-0 items-center rounded-xl border border-white/15 bg-white/10 px-3 py-1.5"
			>
				<img src={`${base}/brand/logo.png`} alt="pecuk.dev logo" class="h-8 w-auto" />
			</a>

			<!-- Desktop links -->
			<nav class="ml-1 hidden items-center gap-1 md:flex">
				{#each links as l, i (l.href + '-' + i)}
					<a
						href={l.href}
						class="rounded-xl border px-3 py-1.5 transition {isActive(l.href)
							? 'border-white/25 bg-white/15'
							: 'border-transparent hover:bg-white/10'}"
						aria-current={isActive(l.href) ? 'page' : undefined}
					>
						{l.label}
					</a>
				{/each}
			</nav>

			<div class="ml-auto flex items-center gap-2">
				<button
					class="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 transition hover:bg-white/10 md:hidden"
					onclick={() => (open = !open)}
					aria-label="Toggle menu"
				>
					☰
				</button>
			</div>
		</div>

		{#if open}
			<div
				class="mt-2 rounded-2xl border border-white/15 bg-white/5 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset] backdrop-blur-md md:hidden"
			>
				{#each links as l, i (l.href + '-' + i)}
					<a
						href={l.href}
						class="block rounded-xl px-3 py-2 transition {isActive(l.href)
							? 'bg-white/15'
							: 'hover:bg-white/10'}"
						onclick={() => (open = false)}
					>
						{l.label}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
