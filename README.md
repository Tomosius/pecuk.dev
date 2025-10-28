# My Website — SvelteKit + Tailwind 4 “Ultimate” Quality Pipeline

A production‑ready SvelteKit starter with a **very opinionated** quality bar:
TypeScript + Svelte diagnostics, ESLint (TS/Svelte/JSON/YAML), Stylelint (authoring & built CSS),
HTML validation, link checking, Playwright e2e + axe, Lighthouse CI, dead‑code checks,
spellcheck, bundle analysis, and more.

> Node **>= 20** required.

---

## Quick start

```bash
# 1) Install
npm i

# 2) Dev server
npm run dev

# 3) Type & Svelte diagnostics (watch)
npm run check:watch

# 4) Build & preview
npm run build
npm run preview
```

---

## Scripts overview

### Core dev/build

| Script          | What it does                                                 |
| --------------- | ------------------------------------------------------------ |
| `dev`           | Vite dev server                                              |
| `build`         | Production build (`vite build`)                              |
| `preview`       | Preview production build                                     |
| `serve:build`   | Serve `build/` on port 4173 (used by link checks)            |
| `prepare`       | Runs `svelte-kit sync` after install                         |
| `typecheck`     | `svelte-check --tsconfig ./tsconfig.json --fail-on-warnings` |
| `typecheck:tsc` | Bare `tsc -p tsconfig.json --noEmit`                         |

### Formatting

| Script         | What it does                                        |
| -------------- | --------------------------------------------------- |
| `format`       | Prettier write over repo (Svelte + Tailwind plugin) |
| `format:check` | Prettier check only                                 |

### Linters (source)

| Script         | What it does                                                     |
| -------------- | ---------------------------------------------------------------- |
| `lint:ts`      | ESLint for `.ts` and `.svelte` (type‑aware)                      |
| `lint:css`     | Stylelint for authoring CSS & `<style>` in Svelte                |
| `lint:css:fix` | Stylelint auto‑fix where safe                                    |
| `lint`         | Runs `lint:ts`, `lint:css`, `lint:json`, `lint:yaml` in parallel |
| `lint:json`    | ESLint for JSON / JSONC                                          |
| `lint:yaml`    | ESLint for YAML / YML                                            |

### Validate built output

| Script                 | What it does                                                            |
| ---------------------- | ----------------------------------------------------------------------- |
| `lint:html`            | `html-validate` over `build/**/*.html`                                  |
| `validate:html`        | W3C Nu HTML checker (`vnu`) for `build/`                                |
| `validate:links`       | Starts preview, then `linkinator` against `http://localhost:4173`       |
| `validate:css`         | Stylelint over compiled CSS in `build/_app/**/*.css`                    |
| `validate:css:grammar` | **Structural** CSS validation via `css-tree` parser                     |
| `validate`             | Build once, then `lint:html` + `validate:html` + `validate:css:grammar` |

### Tests & audits

| Script        | What it does                                               |
| ------------- | ---------------------------------------------------------- |
| `test:e2e`    | Playwright tests (config at `config/playwright.config.ts`) |
| `test:e2e:ui` | Playwright in UI mode                                      |
| `audit:seo`   | Lighthouse CI (LHCI) autorun                               |

### QA / CI bundles

| Script      | What it does                                                  |
| ----------- | ------------------------------------------------------------- |
| `lint:all`  | Source linters + build + HTML lint                            |
| `qa`        | Typecheck → lint → validate (built) → Playwright → Lighthouse |
| `ci`        | Convenience CI bundle using `npm-run-all`                     |
| `ci:strict` | `ci` + dep audit + deadcode + spellcheck                      |

### Extras

| Script             | What it does                                                        |
| ------------------ | ------------------------------------------------------------------- |
| `optimize:svg`     | SVGO over `static/` (recursive)                                     |
| `analyze`          | Build with rollup visualizer (bundle treemap at `build/stats.html`) |
| `dep:audit`        | `npm audit --omit=dev` (non‑fatal)                                  |
| `dep:updates`      | Show available dependency updates via `npm-check-updates`           |
| `deadcode:exports` | `ts-prune` to find unused TS exports                                |
| `deadcode:files`   | `knip` to find unused files/deps                                    |
| `spellcheck`       | `cspell` over sources                                               |
| `check:links:prod` | `linkinator` against your live site (`https://pecuk.dev`)           |

---

## Tech stack (high level)

- **SvelteKit** 2 + **Svelte 5**
- **Tailwind CSS 4** (via `@tailwindcss/vite`) + PostCSS (`autoprefixer`, `postcss-preset-env`)
- **TypeScript** with strict settings
- **ESLint (flat)**: `typescript-eslint`, `eslint-plugin-svelte`, `eslint-plugin-jsonc`, `eslint-plugin-yml`, + Prettier compatibility
- **Stylelint** for authoring (Svelte `<style>` & CSS) and **built CSS** (separate dist config)
- **HTML validation**: `html-validate` + **Nu HTML Checker** (`vnu`)
- **Links**: `linkinator` (local & prod)
- **E2E**: Playwright (+ axe-core in tests)
- **Performance / SEO**: Lighthouse CI
- **Sitemap**: `config/generate-sitemap.mjs` (runs on `postbuild`)
- **Extras**: SVGO, bundle visualizer, `ts-prune`, `knip`, `cspell`

---

## Configuration highlights

### Browserslist

Defined in `package.json` to drive PostCSS and Stylelint’s compatibility checks:

```json
{
	"browserslist": [
		"Chrome >= 112",
		"Edge >= 122",
		"Firefox >= 113",
		"Safari >= 16.4",
		"iOS >= 16.4",
		"not op_mini all",
		"ios_saf >= 16.4"
	]
}
```

### Sitemap / robots

- Set `SITE_URL` in the environment or `config/site.json` (`{ "siteUrl": "https://example.com" }`).
- On `postbuild`, `config/generate-sitemap.mjs` scans `build/` and writes `build/sitemap.xml` and `build/robots.txt`.

### Bundle analysis

Build with the treemap visualizer:

```bash
npm run analyze
# opens build/stats.html (gzip + brotli sizes)
```

### Playwright

- Config at `config/playwright.config.ts`
- Tests live in `tests/` and can include a11y assertions (`@axe-core/playwright`).

---

## Typical workflows

### 1) All the checks before a commit

```bash
npm run format
npm run typecheck
npm run lint
npm run validate
npm run test:e2e
npm run audit:seo
```

Or simply:

```bash
npm run qa
```

### 2) Continuous integration (CI)

```bash
npm run ci
# or the maximal flavor
npm run ci:strict
```

---

## Project structure (common bits)

```
.
├─ src/                      # SvelteKit app
│  ├─ routes/               # +page.svelte etc.
│  └─ app.css               # Tailwind entry (if used)
├─ tests/                    # Playwright tests
├─ config/
│  ├─ playwright.config.ts
│  ├─ html-validate.json
│  ├─ lighthouserc.json
│  └─ site.json             # optional { "siteUrl": "…" }
├─ scripts/
│  └─ validate-css-grammar.mjs
├─ build/                    # production output (gitignored)
├─ .svelte-kit/              # generated (gitignored)
├─ eslint.config.js
├─ .stylelintrc.cjs          # authoring CSS rules
├─ .stylelintrc.dist.cjs     # compiled CSS rules
└─ tsconfig.json
```

---

## Notes on CSS validation

- `validate:css` lints the **compiled** CSS (in `build/_app/**`) for browser compatibility and common mistakes.
- `validate:css:grammar` parses CSS values with `css-tree` and will flag truly invalid values.  
  If you use **CSS custom properties** heavily, this step can be noisy (variables obscure value shapes).
  You can keep it as a “warning gate” in CI or temporarily skip it by omitting the script from your `validate` chain.

---

## Troubleshooting

- **ESLint says**: _“file was not found by the project service”_  
  Ensure `tsconfig.eslint.json` includes the file patterns you lint, and that `eslint.config.js` points its
  `parserOptions.project` to that file for your TypeScript blocks.

- **PostCSS/Tailwind 4 error**:  
  Use `@tailwindcss/vite` (already configured). For PostCSS, prefer `@tailwindcss/postcss` if you wire Tailwind through PostCSS.

- **Nu HTML Checker (vnu) fails on non‑HTML**:  
  We pass `--skip-non-html` in `validate:html`.

---

## License

MIT (or your company license)
