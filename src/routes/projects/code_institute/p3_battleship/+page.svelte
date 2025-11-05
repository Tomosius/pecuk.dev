<!-- src/routes/projects/code_institute/p3_battleship/+page.svelte -->
<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 space-y-10">
  <header class="space-y-3">
    <p class="text-sm uppercase tracking-wide text-white/50">Project</p>
    <h1 class="text-3xl font-bold tracking-tight">
      Battleship — Browser Strategy Game
    </h1>
    <p class="text-white/70">JavaScript Game Project · 2024</p>
  </header>

  <section
    class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
  >
    <img
      src="/images/projects/code_institute/p3_battleship.jpg"
      alt="Battleship project preview"
      class="w-full aspect-[16/9] object-cover"
    />
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-semibold">Overview</h2>
    <p class="text-white/80 leading-relaxed">
      This project recreates the classic Battleship game in the browser. The user places ships on
      a grid and plays against a computer opponent, taking turns to guess positions and sink all
      enemy ships.
    </p>
    <p class="text-white/80 leading-relaxed">
      It was built to practice DOM-driven UIs, game state management in JavaScript, and responsive
      layout so the board stays usable on smaller screens. The UI aims to stay accessible and clear
      with good feedback for hits, misses, and game over.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-semibold">Key features</h2>
    <ul class="space-y-2 text-white/80 leading-relaxed list-disc list-inside">
      <li>Player vs computer turn-based gameplay</li>
      <li>Grid-based board rendering in the browser</li>
      <li>Hit / miss feedback and win condition</li>
      <li>Responsive layout with a glassy UI to match the rest of the site</li>
    </ul>
  </section>

  <section class="grid gap-4 sm:grid-cols-2">
    <div class="rounded-xl border border-white/10 bg-white/5 p-4">
      <h3 class="text-sm font-semibold uppercase tracking-wide text-white/60">Tech</h3>
      <div class="mt-2 flex gap-2 flex-wrap">
        <span class="rounded-lg bg-white/10 px-3 py-1 text-sm">HTML</span>
        <span class="rounded-lg bg-white/10 px-3 py-1 text-sm">CSS</span>
        <span class="rounded-lg bg-white/10 px-3 py-1 text-sm">JavaScript</span>
      </div>
    </div>

    <div class="rounded-xl border border-white/10 bg-white/5 p-4">
      <h3 class="text-sm font-semibold uppercase tracking-wide text-white/60">Tags</h3>
      <div class="mt-2 flex gap-2 flex-wrap text-sm">
        <span class="rounded-lg bg-white/10 px-3 py-1">Game</span>
        <span class="rounded-lg bg-white/10 px-3 py-1">DOM</span>
        <span class="rounded-lg bg-white/10 px-3 py-1">Responsive</span>
      </div>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-xl font-semibold">Links</h2>
    <div class="flex gap-3 flex-wrap">
      <a
        href="https://tomosius.github.io/Battleship-Portfolio-3"
        class="rounded-xl bg-[var(--accent)]/20 border border-[var(--accent)]/30 px-4 py-2 text-sm font-medium hover:bg-[var(--accent)]/30 transition"
        target="_blank"
        rel="noreferrer"
      >
        Live site →
      </a>
      <a
        href="https://github.com/Tomosius/Battleship-Portfolio-3"
        class="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium hover:bg-white/10 transition"
        target="_blank"
        rel="noreferrer"
      >
        Source code
      </a>
    </div>
  </section>
</div>