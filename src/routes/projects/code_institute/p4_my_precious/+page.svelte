<!-- src/routes/projects/code_institute/my_precious/+page.svelte -->
<div class="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
	<header class="space-y-3">
		<p class="text-sm uppercase tracking-wide text-white/50">Project</p>
		<h1 class="text-3xl font-bold tracking-tight">My Precious — Collection Tracker</h1>
		<p class="text-white/70">Full-stack project · Code Institute</p>
	</header>

	<section class="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
		<img
			src="/images/projects/code_institute/p4_my_precious_small.jpg"
			alt="My Precious app preview"
			class="aspect-[16/9] w-full object-cover"
		/>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Overview</h2>
		<p class="leading-relaxed text-white/80">
			My Precious is a web application for keeping track of valuable or meaningful items — things
			you don’t want to lose track of. Users can view entries, add new items, update details, and
			remove items they no longer need.
		</p>
		<p class="leading-relaxed text-white/80">
			The project shows structuring a Django-based app with authentication, forms, and a clean UI,
			making it a good Code Institute portfolio piece.
		</p>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Features</h2>
		<ul class="space-y-2 leading-relaxed text-white/75">
			<li>• User login before accessing the app.</li>
			<li>• Create, read, update, delete items (full CRUD).</li>
			<li>• Nicely structured item detail pages.</li>
			<li>• Responsive layout for mobile/desktop.</li>
		</ul>
	</section>

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
			<h3 class="text-sm font-semibold uppercase tracking-wide text-white/60">Tags</h3>
			<div class="mt-2 flex flex-wrap gap-2 text-sm">
				<span class="rounded-lg bg-white/10 px-3 py-1">CRUD</span>
				<span class="rounded-lg bg-white/10 px-3 py-1">Auth</span>
				<span class="rounded-lg bg-white/10 px-3 py-1">Responsive</span>
				<span class="rounded-lg bg-white/10 px-3 py-1">Portfolio</span>
			</div>
		</div>
	</section>

	<section class="space-y-3">
		<h2 class="text-xl font-semibold">Links</h2>
		<div class="flex flex-wrap gap-3">
			<a
				href="https://project-4-django-my-precious-180ebe0871af.herokuapp.com/users/user_login/?next=/"
				class="bg-[var(--accent)]/20 border-[var(--accent)]/30 hover:bg-[var(--accent)]/30 rounded-xl border px-4 py-2 text-sm font-medium transition"
				target="_blank"
				rel="noreferrer"
			>
				Live site →
			</a>
			<a
				href="https://github.com/Tomosius/My_Precious"
				class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
				target="_blank"
				rel="noreferrer"
			>
				Source code
			</a>
		</div>
		<p class="text-xs text-white/50">Note: the live app goes to the login page first.</p>
	</section>
</div>
