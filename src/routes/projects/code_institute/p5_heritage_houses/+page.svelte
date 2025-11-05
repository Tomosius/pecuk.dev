<!-- src/routes/projects/code_institute/heritage_houses_p5/+page.svelte -->
<div class="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
	<header class="space-y-3">
		<p class="text-sm uppercase tracking-wide text-white/50">Project</p>
		<h1 class="text-3xl font-bold tracking-tight">Heritage Houses — Full-Stack Django App</h1>
		<p class="text-white/70">Code Institute Milestone 5 · Full-Stack Project</p>
	</header>

	<!-- Hero / preview -->
	<section class="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
		<img
			src="/images/projects/code_institute/p5_heritage_housing.jpg"
			alt="Heritage Houses project preview"
			class="aspect-[16/9] w-full object-cover"
		/>
	</section>

	<!-- Overview -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Overview</h2>
		<p class="leading-relaxed text-white/80">
			Heritage Houses is a full-stack Django application for showcasing, managing, and preserving
			heritage properties. It gives authenticated users the ability to propose or manage entries,
			and presents visitors with a clean, structured way to browse houses and their details.
		</p>
		<p class="leading-relaxed text-white/80">
			The project follows Code Institute’s project structure, uses Django for the backend, templates
			for the UI, and integrates authentication so that only logged-in users can access protected
			actions. It also focuses on accessibility and responsive layouts.
		</p>
	</section>

	<!-- Tech + Tags -->
	<section class="grid gap-4 sm:grid-cols-2">
		<div class="rounded-xl border border-white/10 bg-white/5 p-4">
			<h3 class="text-sm font-semibold uppercase tracking-wide text-white/60">Tech</h3>
			<div class="mt-2 flex flex-wrap gap-2">
				<span class="rounded-lg bg-white/10 px-3 py-1 text-sm">Python</span>
				<span class="rounded-lg bg-white/10 px-3 py-1 text-sm">Django</span>
				<span class="rounded-lg bg-white/10 px-3 py-1 text-sm">HTML</span>
				<span class="rounded-lg bg-white/10 px-3 py-1 text-sm">CSS</span>
			</div>
		</div>

		<div class="rounded-xl border border-white/10 bg-white/5 p-4">
			<h3 class="text-sm font-semibold uppercase tracking-wide text-white/60">Features</h3>
			<div class="mt-2 flex flex-wrap gap-2 text-sm">
				<span class="rounded-lg bg-white/10 px-3 py-1">CRUD</span>
				<span class="rounded-lg bg-white/10 px-3 py-1">Auth</span>
				<span class="rounded-lg bg-white/10 px-3 py-1">Responsive</span>
				<span class="rounded-lg bg-white/10 px-3 py-1">Accessibility</span>
			</div>
		</div>
	</section>

	<!-- Links -->
	<section class="space-y-3">
		<h2 class="text-xl font-semibold">Links</h2>
		<div class="flex flex-wrap gap-3">
			<!-- If you later have a live URL, add it here the same way as other pages -->
			<a
				href="https://github.com/Tomosius/heritage_houses_p5"
				class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
				target="_blank"
				rel="noreferrer"
			>
				Source code
			</a>
		</div>
	</section>
</div>
