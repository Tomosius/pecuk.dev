<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { getByType, type ContentItem } from '$lib/content';
	import ContentCard from '$lib/components/ContentCard.svelte';

	const capabilities = [
		{
			title: 'SQL & data modelling',
			desc: 'Relational schemas, normalization and performant queries in Postgres, SQLite and DuckDB.',
			icon: '🗄️'
		},
		{
			title: 'Data science & ML',
			desc: 'Feature prep, classical ML, evaluation and small inference services for real products.',
			icon: '📈'
		},
		{
			title: 'API / backend systems',
			desc: 'Django / FastAPI backends, auth, pagination and endpoints for dashboards or CRMs.',
			icon: '🧩'
		},
		{
			title: 'Internal / analytical tooling',
			desc: 'Admin views, reporting layers and data-explorer UIs on top of a clean model.',
			icon: '🛠️'
		}
	];

	const tech = [
		'Python',
		'SQL',
		'Postgres',
		'SQLite / DuckDB',
		'Pandas / Polars',
		'Machine Learning',
		'Django',
		'FastAPI',
		'SvelteKit',
		'TypeScript'
	];

	let projects: ContentItem[] = [];
	let hasProjects = false;

	onMount(async () => {
		const items = await getByType('project');
		projects = items;
		hasProjects = items.length > 0;
	});
</script>

<div class="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
	<!-- HERO -->
	<section class="pt-16 sm:pt-20 md:pt-28">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm opacity-90"
		>
			<span aria-hidden="true">📊</span>
			<span>SQL · Machine Learning · Data Engineering · Backend</span>
		</div>

		<div class="mt-6">
			<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
				I design data-first applications.
			</h1>
			<p class="mt-5 leading-relaxed text-white/80">
				From schema and SQL to ML features and the API layer. I make sure your product or internal
				tool has reliable, well-structured data behind it.
			</p>
		</div>

		<div class="mt-8 flex flex-wrap gap-3">
			<a
				href={resolve('/projects', {})}
				class="border-[var(--accent)]/40 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/15 rounded-xl border px-5 py-2.5 font-semibold transition"
			>
				View projects
			</a>
			<a
				href={resolve('/contact', {})}
				class="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 transition hover:bg-white/10"
			>
				Get in touch
			</a>
		</div>

		<!-- tech strip -->
		<div class="mt-8 flex flex-wrap gap-2">
			{#each tech as t (t)}
				<span class="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm opacity-90">
					{t}
				</span>
			{/each}
		</div>
	</section>

	<!-- RECENT PROJECTS -->
	<section class="mt-14 md:mt-16">
		<div class="flex items-center justify-between gap-4">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Selected work</h2>
				<p class="mt-1 text-white/60">Real projects with schemas, APIs and UIs.</p>
			</div>
			<a
				href={resolve('/projects', {})}
				class="text-sm underline-offset-4 opacity-80 hover:underline hover:opacity-100"
			>
				All projects →
			</a>
		</div>
		class="mt-4 inline-flex items-center gap-1 text-sm text-white/90 hover:text-white
		underline-offset-4 hover:underline"

		{#if hasProjects}
			<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each projects.slice(0, 3) as item (item.url)}
					<ContentCard {item} />
				{/each}
			</div>
		{:else}
			<p class="mt-6 text-sm text-white/50">No projects indexed yet.</p>
		{/if}
	</section>

	<!-- CAPABILITIES -->
	<section class="mt-16 md:mt-20">
		<div class="flex items-center justify-center">
			<span class="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-sm opacity-90">
				What I deliver
			</span>
		</div>

		<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each capabilities as cap (cap.title)}
				<article
					class="border-white/12 rounded-2xl border bg-white/[0.06] p-5 backdrop-blur-md transition hover:bg-white/[0.08]"
				>
					<div class="flex items-center gap-3">
						<div class="text-2xl" aria-hidden="true">{cap.icon}</div>
						<h3 class="text-lg font-semibold">{cap.title}</h3>
					</div>
					<p class="mt-3 text-sm opacity-85">{cap.desc}</p>
					<a
						href={resolve('/contact', {})}
						class="mt-4 inline-flex items-center gap-1 text-sm text-white/90 underline-offset-4 hover:text-white hover:underline"
					>
						<span>Tell me about yours</span>
						<span aria-hidden="true">→</span>
					</a>
				</article>
			{/each}
		</div>
	</section>

	<!-- PROCESS -->
	<section class="mt-16 md:mt-20">
		<div class="rounded-3xl border border-white/10 bg-white/5 p-1">
			<div class="grid gap-6 rounded-2xl bg-black/30 p-6 md:grid-cols-3 md:p-10">
				<div class="md:col-span-1">
					<h2 class="text-xl font-semibold tracking-tight">Structured, not improvised.</h2>
					<p class="mt-3 text-sm leading-relaxed text-white/70">
						Start with the data model, expose it through APIs, then add ML where it makes sense.
						That way your frontends always have a stable contract.
					</p>
				</div>
				<div class="grid gap-4 sm:grid-cols-3 md:col-span-2">
					<div class="rounded-xl border border-white/10 bg-black/20 p-4">
						<h3 class="text-sm font-semibold">1. Model & SQL</h3>
						<p class="mt-2 text-xs text-white/70">Entities, relationships, indexes.</p>
					</div>
					<div class="rounded-xl border border-white/10 bg-black/20 p-4">
						<h3 class="text-sm font-semibold">2. ML / analytics</h3>
						<p class="mt-2 text-xs text-white/70">Feature prep, scoring, reports.</p>
					</div>
					<div class="rounded-xl border border-white/10 bg-black/20 p-4">
						<h3 class="text-sm font-semibold">3. Delivery</h3>
						<p class="mt-2 text-xs text-white/70">APIs, internal UI, SvelteKit.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="mt-16 md:mt-20">
		<div
			class="border-white/12 rounded-3xl border bg-gradient-to-b from-white/10 to-white/[0.06] p-1"
		>
			<div class="rounded-2xl bg-black/30 p-6 text-center md:p-10">
				<h3 class="text-2xl font-bold tracking-tight sm:text-3xl">Need a data/ML-focused build?</h3>
				<p class="mx-auto mt-3 max-w-2xl text-white/70">
					Share the data sources and the outcome — we can map the schema, the pipeline and the
					UI/API in one go.
				</p>
				<div class="mt-6">
					<a
						href={resolve('/contact', {})}
						class="border-[var(--accent)]/40 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/15 rounded-xl border px-5 py-2.5 font-semibold transition"
					>
						Contact
					</a>
				</div>
			</div>
		</div>
	</section>
</div>
