<script lang="ts">
	// basic state
	let count = $state(0);

	// derived value
	const doubled = $derived(count * 2);

	// this must be let, because we reassign it later
	let notes = $state<string[]>(['Welcome to SvelteKit 5', 'This is a dummy page']);

	function increment() {
		count += 1;
	}

	function addNote() {
		notes = [...notes, `Note #${notes.length + 1}`];
	}
</script>

<div class="mx-auto max-w-2xl px-4 py-10 space-y-8">
	<header>
		<h1 class="text-3xl font-bold">Dummy page</h1>
		<p class="opacity-70 mt-2">Just here so the route builds without errors.</p>
	</header>

	<section class="space-y-3">
		<h2 class="text-xl font-semibold">Counter</h2>
		<p>Count: {count}</p>
		<p>Doubled (derived): {doubled}</p>
		<button
			type="button"
			onclick={increment}
			class="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/15 transition"
		>
			+1
		</button>
	</section>

	<section class="space-y-3">
		<h2 class="text-xl font-semibold">Notes</h2>
		<ul class="space-y-1">
			{#each notes as note (note)}
				<li class="rounded-md bg-white/5 px-3 py-2">{note}</li>
			{/each}
		</ul>
		<button
			type="button"
			onclick={addNote}
			class="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/15 transition"
		>
			Add note
		</button>
	</section>
</div>