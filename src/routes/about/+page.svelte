<script lang="ts">
	import { resolve } from '$app/paths';
	import type { RouteId } from '$app/types';

	const skills = [
		'FullStack Development',
		'Data Engineering',
		'Machine Learning',
		'Databases (Postgres, DuckDB, MongoDB, MySQL)',
		'APIs (FastAPI, Django, Node.js)',
		'Frontend (SvelteKit, React)',
		'Python ML (scikit-learn, Pandas, Polars, JAX, NumPy)',
		'Data Visualisation (Plotly, Seaborn, Matplotlib)'
	];

	const softSkills = [
		'Problem Solving',
		'Team Collaboration',
		'Adaptability',
		'Detail-Oriented',
		'Strong Work Ethic'
	];

	// eslint rule wants resolve()
	const emptyParams = {} as Record<string, string>;
	const contactHref = resolve('/contact' as unknown as RouteId, emptyParams);
</script>

<div class="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
	<h1 class="text-center text-4xl font-bold tracking-tight">
		About <span class="text-[var(--accent)]">Me</span>
	</h1>

	<p class="mt-6 text-center text-lg leading-relaxed opacity-85">
		Hi, I’m Tomas Pecukevicius — a <span class="text-[var(--accent)]">FullStack Developer</span>
		with a background in engineering and over 20 years of experience in customer service and problem-solving.
		I recently earned my Diploma in Full Stack Software Development from the Code Institute and have
		been building projects that connect
		<strong>data, machine learning, and web applications</strong>.
	</p>

	<section class="mt-12">
		<h2 class="text-2xl font-semibold tracking-tight">Technical Skills</h2>
		<div class="mt-4 flex flex-wrap gap-2">
			{#each skills as skill (skill)}
				<span class="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm">
					{skill}
				</span>
			{/each}
		</div>
	</section>

	<section class="mt-10">
		<h2 class="text-2xl font-semibold tracking-tight">Soft Skills</h2>
		<div class="mt-4 flex flex-wrap gap-2">
			{#each softSkills as skill (skill)}
				<span class="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm">
					{skill}
				</span>
			{/each}
		</div>
	</section>

	<section class="mt-12">
		<h2 class="text-2xl font-semibold tracking-tight">Experience</h2>
		<div class="mt-6 space-y-6">
			<div>
				<h3 class="font-bold">Technical Manager – Apex Brick Cutters (2022 – Present)</h3>
				<p class="mt-1 opacity-80">
					Liaised with clients, created AutoCAD technical drawings, and solved complex project
					requirements while leading customer and internal communications.
				</p>
			</div>

			<div>
				<h3 class="font-bold">Director – Onyx Building Products (2021)</h3>
				<p class="mt-1 opacity-80">
					Managed operations, site visits, and technical designs while leading a team and
					maintaining strong client relationships.
				</p>
			</div>

			<div>
				<h3 class="font-bold">Software Projects (2019 – Present)</h3>
				<p class="mt-1 opacity-80">
					Built and deployed web apps, interactive games, CRMs, and ML-powered tools using Python,
					Django, SvelteKit, FastAPI, and databases like Postgres & DuckDB.
				</p>
			</div>
		</div>
	</section>

	<section class="mt-14 text-center">
		<h2 class="text-xl font-semibold">Want to collaborate?</h2>
		<p class="mt-2 opacity-80">
			I’m open to freelance projects, collaborations, or full-time opportunities where I can apply
			my skills in
			<span class="text-[var(--accent)]">data, ML, and full-stack development</span>.
		</p>
		<a
			href={contactHref}
			class="border-[var(--accent)]/40 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/15 mt-5 inline-block rounded-xl border px-6 py-2.5 font-semibold transition"
		>
			Get in touch
		</a>
	</section>
</div>
