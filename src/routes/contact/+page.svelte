<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let sending = false;
	let ok = false;
	let err = '';

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		err = '';
		ok = false;
		sending = true;

		const form = e.currentTarget as HTMLFormElement;
		const data = new FormData(form);

		try {
			const res = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				body: data
			});
			const json = await res.json();

			if (json.success) {
				ok = true;
				form.reset();
				// redirect home after a short “thank you” pause
				setTimeout(() => goto(`${base}/`), 1500);
			} else {
				err = json.message ?? 'Something went wrong.';
			}
		} catch (e) {
			console.error(e);
			err = 'Network error. Please try again.';
		} finally {
			sending = false;
		}
	}
</script>

<div class="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
	<h1 class="text-center text-4xl font-bold tracking-tight">
		Get in <span class="text-[var(--accent)]">touch</span>
	</h1>
	<p class="mt-4 text-center opacity-80">
		Have a project, idea, or question? Drop me a message and I’ll get back to you.
	</p>

	<!-- fallback if JS disabled -->
	<form
		action="https://api.web3forms.com/submit"
		method="POST"
		on:submit={submit}
		class="mt-10 space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md"
	>
		<!-- required Web3Forms access key -->
		<input type="hidden" name="access_key" value="0a556be0-722b-4a30-a445-3c77176a6956" />

		<!-- optional: honeypot to reduce spam -->
		<input type="checkbox" name="botcheck" tabindex="-1" class="hidden" aria-hidden="true" />

		<div>
			<label for="name" class="block text-sm font-medium opacity-90">Name</label>
			<input
				id="name"
				name="name"
				type="text"
				placeholder="Your name"
				required
				class="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder-white/40 focus:ring-2 focus:ring-[var(--accent)] focus:outline-none"
			/>
		</div>

		<div>
			<label for="email" class="block text-sm font-medium opacity-90">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				placeholder="you@example.com"
				required
				class="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder-white/40 focus:ring-2 focus:ring-[var(--accent)] focus:outline-none"
			/>
		</div>

		<div>
			<label for="message" class="block text-sm font-medium opacity-90">Message</label>
			<textarea
				id="message"
				name="message"
				rows="5"
				placeholder="Tell me a bit about your project..."
				required
				class="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder-white/40 focus:ring-2 focus:ring-[var(--accent)] focus:outline-none"
			></textarea>
		</div>

		<div class="text-center">
			<button
				type="submit"
				disabled={sending}
				class="rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-6 py-2.5 font-semibold transition hover:bg-[var(--accent)]/15 disabled:opacity-60"
			>
				{sending ? 'Sending…' : 'Send message'}
			</button>
		</div>

		{#if err}
			<p class="mt-3 text-center text-red-300">{err}</p>
		{/if}
	</form>

	<!-- Direct email fallback -->
	<div class="mt-12 text-center opacity-80">
		<p>You can also reach me directly at:</p>
		<p class="mt-2 font-medium text-[var(--accent)]">
			<a class="underline" href="mailto:contact@pecuk.dev">contact@pecuk.dev</a>
		</p>
	</div>
</div>

<!-- Simple popup modal -->
{#if ok}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
		<div
			class="rounded-2xl border border-white/15 bg-white/10 px-6 py-5 text-center backdrop-blur-md"
		>
			<h2 class="text-xl font-semibold">Thanks!</h2>
			<p class="mt-2 opacity-85">Your message was sent. Redirecting…</p>
		</div>
	</div>
{/if}
