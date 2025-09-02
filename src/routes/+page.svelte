<script>
	let count = 0;
</script>

<!-- Page wrapper -->
<div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white">

	<h1 class="text-4xl font-bold mb-4">🚀 Hello from Svelte + Tailwind!</h1>

	<p class="mb-6 text-lg">
		If you can see this styled page, your <span class="font-semibold">SvelteKit + Tailwind</span> setup is working on GitHub Pages.
	</p>

	<button
		on:click={() => count++}
		class="px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl shadow hover:bg-gray-100 transition"
	>
		Clicked {count} {count === 1 ? 'time' : 'times'}
	</button>

	<p class="mt-6 text-sm opacity-75">Custom domain: pecuk.dev</p>
</div>