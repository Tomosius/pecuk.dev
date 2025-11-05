<!-- src/routes/projects/code_institute/p2_hangman/+page.svelte -->
<div class="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
	<header class="space-y-3">
		<p class="text-sm uppercase tracking-wide text-white/50">Project</p>
		<h1 class="text-3xl font-bold tracking-tight">HangMan — Word Guessing Game</h1>
		<p class="text-white/70">Interactive JavaScript Game · 2024</p>
	</header>

	<section class="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
		<img
			src="/images/projects/code_institute/p2_hangman.jpg"
			alt="HangMan project preview"
			class="aspect-[16/9] w-full object-cover"
		/>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Overview</h2>
		<p class="leading-relaxed text-white/80">
			HangMan is a browser-based word guessing game where the player tries to uncover a hidden word
			by guessing letters. Each wrong guess brings the hangman closer to being completed, so the
			goal is to solve it in as few mistakes as possible.
		</p>
		<p class="leading-relaxed text-white/80">
			This project was built to practice DOM manipulation, game state management in JavaScript, and
			responsive UI styling with HTML/CSS. It also focuses on clear feedback for the player (correct
			/ incorrect guesses, remaining attempts) and overall accessibility.
		</p>
	</section>

	<section class="grid gap-4 sm:grid-cols-2">
		<div class="rounded-xl border border-white/10 bg-white/5 p-4">
			<h3 class="text-sm font-semibold uppercase tracking-wide text-white/60">Tech</h3>
			<div class="mt-2 flex flex-wrap gap-2">
				<span class="rounded-lg bg-white/10 px-3 py-1 text-sm">HTML</span>
				<span class="rounded-lg bg-white/10 px-3 py-1 text-sm">CSS</span>
				<span class="rounded-lg bg-white/10 px-3 py-1 text-sm">JavaScript</span>
			</div>
		</div>

		<div class="rounded-xl border border-white/10 bg-white/5 p-4">
			<h3 class="text-sm font-semibold uppercase tracking-wide text-white/60">Tags</h3>
			<div class="mt-2 flex flex-wrap gap-2 text-sm">
				<span class="rounded-lg bg-white/10 px-3 py-1">Game</span>
				<span class="rounded-lg bg-white/10 px-3 py-1">DOM</span>
				<span class="rounded-lg bg-white/10 px-3 py-1">Responsive</span>
			</div>
		</div>
	</section>

	<section class="space-y-3">
		<h2 class="text-xl font-semibold">Links</h2>
		<div class="flex flex-wrap gap-3">
			<!-- if you publish to GitHub Pages, this is probably the URL -->
			<a
				href="https://tomosius.github.io/P2-HangMan"
				class="bg-[var(--accent)]/20 border-[var(--accent)]/30 hover:bg-[var(--accent)]/30 rounded-xl border px-4 py-2 text-sm font-medium transition"
				target="_blank"
				rel="noreferrer"
			>
				Live site →
			</a>
			<a
				href="https://github.com/Tomosius/P2-HangMan"
				class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
				target="_blank"
				rel="noreferrer"
			>
				Source code
			</a>
		</div>
	</section>
</div>
