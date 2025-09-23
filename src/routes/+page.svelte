<script lang="ts">
	import { base } from '$app/paths';

	const stats = [
		{ value: '5+', label: 'Data-driven builds' },
		{ value: '5+', label: 'Team collaborations' },
		{ value: '—', label: 'Blog (coming soon)' }
	];

	const services = [
		{
			title: 'Data Engineering & Databases',
			desc: 'Pipelines (ETL/ELT), warehousing and pragmatic schemas. Postgres/SQLite, DuckDB, and tidy data models that scale.',
			icon: '🗄️'
		},
		{
			title: 'AI & Machine Learning',
			desc: 'Data prep, feature engineering, and lightweight inference services for automation and smarter workflows.',
			icon: '🤖'
		},
		{
			title: 'Internal Tools / CRM / ERP',
			desc: 'Dashboards, admin panels and custom CRM/ERP flows. Auth/roles, audit trails and fast APIs wired to clean data.',
			icon: '📊'
		},
		{
			title: 'Web Apps from Provided Designs',
			desc: 'You supply the UI (Figma etc.); I implement it in SvelteKit/Tailwind with solid backends (FastAPI/Django/Node).',
			icon: '💻'
		}
	];

	// Tech chips (unique strings -> safe as keys)
	const tech = [
		'Postgres',
		'DuckDB',
		'Pandas/Polars',
		'AI',
		'Machine Learning',
		'FastAPI',
		'Django',
		'Node.js',
		'SvelteKit',
		'React',
		'HTML',
		'CSS',
		'TypeScript'
	];

	// Placeholder tiles with unique numeric keys
	const placeholders = Array.from({ length: 18 }, (_, i) => i);
</script>

<!-- page container -->
<div class="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
	<!-- HERO -->
	<section class="pt-16 text-center sm:pt-20 md:pt-28">
		<p
			class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm opacity-90"
		>
			<span aria-hidden="true">🧠</span>
			<span>Data • ML • Backends • CRM/ERP • Web apps (from your designs)</span>
		</p>

		<h1 class="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
			<span class="opacity-90">Make your data</span>
			<span class="text-[var(--accent)]"> work.</span>
		</h1>

		<p class="mx-auto mt-5 max-w-2xl leading-relaxed text-balance opacity-85">
			I build the backbone of products: pipelines, databases, ML features and internal tools/CRM.
			Have a UI already? I’ll implement it end-to-end without the design guesswork.
		</p>

		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<a
				href={`${base}/contact`}
				class="rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-5 py-2.5 font-semibold transition hover:bg-[var(--accent)]/15"
			>
				Discuss your data
			</a>
			<a
				href={`${base}/projects`}
				class="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 transition hover:bg-white/10"
			>
				See projects
			</a>
		</div>

		<!-- Tech strip -->
		<div class="mt-8 flex flex-wrap justify-center gap-2 text-sm opacity-80">
			{#each tech as t (t)}
				<span class="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1">{t}</span>
			{/each}
		</div>
	</section>

	<!-- “HERO ART” PLACEHOLDER -->
	<section class="mt-12 md:mt-16" aria-label="Visual showcase">
		<div
			class="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-1"
		>
			<div class="rounded-2xl bg-black/30 p-6 md:p-10">
				<div class="grid grid-cols-3 gap-3 opacity-80 sm:grid-cols-6">
					{#each placeholders as i (i)}
						<div
							class="aspect-square rounded-xl border border-white/10 bg-white/[0.04]"
							aria-hidden="true"
						></div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- INTRO -->
	<section class="mt-14 md:mt-20">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">Data-first, product-focused</h2>
			<p class="mt-4 opacity-85">
				I focus on the core: entities, pipelines, APIs, and the ML that adds leverage. I also
				implement the UI you provide, so everything connects from database to browser without
				endless handoffs.
			</p>
		</div>

		<!-- stats -->
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			{#each stats as s (s.label)}
				<div
					class="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center"
					aria-label={s.label}
				>
					<div class="text-xl font-semibold text-[var(--accent-soft)]">{s.value}</div>
					<div class="text-sm opacity-80">{s.label}</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- SERVICES -->
	<section class="mt-16 md:mt-20">
		<div class="flex items-center justify-center">
			<span class="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-sm opacity-90"
				>Services</span
			>
		</div>

		<h3 class="mt-5 text-center text-3xl font-bold tracking-tight">What I build</h3>

		<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each services as item (item.title)}
				<article
					class="rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-md transition hover:bg-white/[0.08]"
				>
					<div class="flex items-center gap-3">
						<div class="text-2xl" aria-hidden="true">{item.icon}</div>
						<h4 class="text-lg font-semibold">{item.title}</h4>
					</div>
					<p class="mt-3 opacity-85">{item.desc}</p>
					<a
						href={`${base}/contact`}
						class="mt-4 inline-flex items-center gap-2 text-sm text-[var(--accent)] opacity-90 hover:opacity-100"
					>
						<span>Let’s talk</span> <span aria-hidden="true">→</span>
					</a>
				</article>
			{/each}
		</div>
	</section>

	<!-- CTA -->
	<section class="mt-16 md:mt-20">
		<div
			class="rounded-3xl border border-white/12 bg-gradient-to-b from-white/10 to-white/[0.06] p-1"
		>
			<div class="rounded-2xl bg-black/30 p-6 text-center md:p-10">
				<h3 class="text-2xl font-bold tracking-tight sm:text-3xl">Have data, need outcomes?</h3>
				<p class="mt-3 opacity-85">
					Let’s map your pipeline, model the core entities, and ship a useful tool.
				</p>
				<div class="mt-6">
					<a
						href={`${base}/contact`}
						class="rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-5 py-2.5 font-semibold transition hover:bg-[var(--accent)]/15"
					>
						Get in touch
					</a>
				</div>
			</div>
		</div>
	</section>
</div>
