<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/stores';
	import type { Pathname, RouteId } from '$app/types';

	type InternalLink = { href: Pathname; label: string; external?: false };
	type ExternalLink = { href: string; label: string; external: true };
	type Link = InternalLink | ExternalLink;

	// Keep UNRESOLVED app-relative paths here
	const defaultLinks: InternalLink[] = [
		{ href: '/' as Pathname,         label: 'Home' },
		{ href: '/projects' as Pathname, label: 'Projects' },
		{ href: '/blog' as Pathname,     label: 'Blog' },
		{ href: '/about' as Pathname,    label: 'About' },
		{ href: '/contact' as Pathname,  label: 'Contact' }
	];

	let { links = defaultLinks } = $props<{ links?: Link[] }>();

	let open = $state(false);
	let pathname = $state('');

	$effect(() => {
		const un = page.subscribe(($p) => (pathname = $p.url.pathname));
		return un;
	});

	const emptyParams = {} as Record<string, string>;

	const isExternalHref = (to: string) =>
		/^(https?:)?\/\//.test(to) || to.startsWith('#') || to.startsWith('mailto:') || to.startsWith('tel:');

	const resolvePath = (path: Pathname) => resolve(path as unknown as RouteId, emptyParams);

	const isExternal = (link: Link): link is ExternalLink =>
		link.external === true || isExternalHref(link.href);

	const isActive = (to: Pathname) => {
		const target = resolvePath(to);
		return pathname === target || pathname.startsWith(target + '/');
	};
</script>

<div class="sticky top-4 z-50">
	<div class="mx-auto max-w-6xl px-4">
		<div class="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset] px-3 py-2 md:px-4">
			<!-- Logo -->
			<a
				href={resolve('/' as unknown as RouteId, emptyParams)}
				class="shrink-0 flex items-center rounded-xl px-3 py-1.5 bg-white/10 border border-white/15"
			>
				<img src={asset('/brand/logo.png')} alt="pecuk.dev logo" class="h-8 w-auto" />
			</a>

			<!-- Desktop nav -->
			<nav class="hidden md:flex items-center gap-1 ml-1">
				{#each links as l, i (l.href + '-' + i)}
						{#if isExternal(l)}
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								href={l.href}
								class="px-3 py-1.5 rounded-xl border transition hover:bg-white/10 border-transparent"
								rel="noreferrer"
							>
								{l.label}
							</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
					{:else}
						{@const resolved = resolve(l.href as unknown as RouteId, emptyParams)}
						<a
							href={resolved}
							class="px-3 py-1.5 rounded-xl border transition {isActive(l.href) ? 'bg-white/15 border-white/25' : 'hover:bg-white/10 border-transparent'}"
							aria-current={isActive(l.href) ? 'page' : undefined}
						>
							{l.label}
						</a>
					{/if}
				{/each}
			</nav>

			<!-- Mobile toggle -->
			<div class="ml-auto flex items-center">
				<button
					class="md:hidden px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
					onclick={() => (open = !open)}
					aria-label="Toggle menu"
					aria-expanded={open}
				>
					☰
				</button>
			</div>
		</div>

		{#if open}
			<div class="mt-2 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset] p-2 md:hidden">
				{#each links as l, i (l.href + '-' + i)}
						{#if isExternal(l)}
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								href={l.href}
								class="block px-3 py-2 rounded-xl transition hover:bg-white/10"
								onclick={() => (open = false)}
								rel="noreferrer"
							>
								{l.label}
							</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
					{:else}
						{@const resolved = resolve(l.href as unknown as RouteId, emptyParams)}
						<a
							href={resolved}
							class="block px-3 py-2 rounded-xl transition {isActive(l.href) ? 'bg-white/15' : 'hover:bg-white/10'}"
							onclick={() => (open = false)}
							aria-current={isActive(l.href) ? 'page' : undefined}
						>
							{l.label}
						</a>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>
