<script lang="ts">
	type Props = { params: { path?: string } };
	const { params } = $props<Props>();

	const current = $derived(params.path ?? '');
	let clicks = $state(0);
	const doubled = $derived(clicks * 2);

	function inc() {
		clicks++;
	}
</script>

<h1 class="text-2xl font-bold text-accent">
	SPA {current ? `— /${current}` : '— home'}
</h1>

<p class=" mt-4">
	Clicks: <span class="font-mono">{clicks}</span>
	<span class="ml-2 text-sm text-slate-500">(x2 = {doubled})</span>
</p>

<button
	class="mt-4 rounded bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700 focus:ring focus:outline-none"
	onclick={inc}
>
	Increment
</button>

<!-- Quick visual check block -->
<div class="mt-6 rounded border border-dashed border-blue-400 p-4">
	If you see a dashed blue border and emerald button hover, Tailwind works ✅
</div>
