<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/stores';
	import type { Pathname, RouteId } from '$app/types';

	type InternalLink = { href: Pathname; label: string; external?: false };
	type ExternalLink = { href: string; label: string; external: true };
	type Link = InternalLink | ExternalLink;

	const defaultLinks: InternalLink[] = [
		{ href: '/' as Pathname, label: 'Home' },
		{ href: '/projects' as Pathname, label: 'Projects' },
		{ href: '/blog' as Pathname, label: 'Blog' },
		{ href: '/about' as Pathname, label: 'About' },
		{ href: '/contact' as Pathname, label: 'Contact' }
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
		/^(https?:)?\/\//.test(to) ||
		to.startsWith('#') ||
		to.startsWith('mailto:') ||
		to.startsWith('tel:');

	const resolvePath = (path: Pathname) => {
		const resolved = resolve(path as unknown as RouteId, emptyParams);
		return resolved.startsWith('/') ? resolved : `/${resolved}`;
	};

	// 👇 do the TS cast here, not in the template
	const homeHref = resolvePath('/' as Pathname);

	const isExternal = (link: Link): link is ExternalLink =>
		link.external === true || isExternalHref(link.href);

	const isActive = (to: Pathname) => {
		const target = resolvePath(to);
		return pathname === target || pathname.startsWith(target + '/');
	};
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<div class="sticky top-4 z-50">
	<div class="mx-auto max-w-6xl px-4">
		<div
			class="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset] backdrop-blur-md md:px-4"
		>
			<!-- Logo -->
			<a
				href={homeHref}
				class="flex shrink-0 items-center rounded-xl border border-white/15 bg-white/10 px-3 py-1.5"
			>
				<img src={asset('/brand/logo.png')} alt="pecuk.dev logo" class="h-8 w-auto" />
			</a>

			<!-- Desktop nav -->
			<nav class="ml-1 hidden items-center gap-1 md:flex">
				{#each links as l, i (l.href + '-' + i)}
					{#if isExternal(l)}
						<a
							href={l.href}
							class="rounded-xl border border-transparent px-3 py-1.5 transition hover:bg-white/10"
							rel="noreferrer"
						>
							{l.label}
						</a>
					{:else}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a
							href={resolvePath(l.href)}
							class="rounded-xl border px-3 py-1.5 transition {isActive(l.href)
								? 'border-white/25 bg-white/15'
								: 'border-transparent hover:bg-white/10'}"
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
					class="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 transition hover:bg-white/10 md:hidden"
					onclick={() => (open = !open)}
					aria-label="Toggle menu"
					aria-expanded={open}
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
					{#if isExternal(l)}
						<a
							href={l.href}
							class="block rounded-xl px-3 py-2 transition hover:bg-white/10"
							onclick={() => (open = false)}
							rel="noreferrer"
						>
							{l.label}
						</a>
					{:else}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a
							href={resolvePath(l.href)}
							class="block rounded-xl px-3 py-2 transition {isActive(l.href)
								? 'bg-white/15'
								: 'hover:bg-white/10'}"
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
<!-- eslint-enable svelte/no-navigation-without-resolve -->
