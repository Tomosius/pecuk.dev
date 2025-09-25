<script lang="ts">
	import { getTechMany, type TechId } from '$lib/tech';

	let { ids = [] } = $props<{ ids?: TechId[] }>();
	const entries = $derived(getTechMany(ids));
</script>

{#if entries.length}
	<section class="space-y-2">
		<h2 class="text-lg font-semibold">Tech stack</h2>
		<div class="flex flex-wrap gap-2">
			{#each entries as t (t.id)}
				{#if t.url}
					<a
						href={t.url}
						target="_blank"
						rel="noreferrer"
						class="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-sm transition hover:bg-white/15"
						title={t.description ?? t.label}
					>
						{#if t.icon}<span aria-hidden="true">{t.icon}</span>{/if}
						<span>{t.label}</span>
					</a>
				{:else}
					<span
						class="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-sm opacity-80"
						aria-disabled="true"
					>
						{#if t.icon}<span aria-hidden="true">{t.icon}</span>{/if}
						<span>{t.label}</span>
					</span>
				{/if}
			{/each}
		</div>
	</section>
{/if}
