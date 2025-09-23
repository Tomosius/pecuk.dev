// src/lib/tech.ts

/** Where a tech generally lives/what it is */
export type TechKind =
	| 'language'
	| 'framework'
	| 'library'
	| 'runtime'
	| 'ui'
	| 'style'
	| 'tool'
	| 'service'
	| 'platform'
	| 'database'
	| 'message-broker'
	| 'search'
	| 'protocol'
	| 'api'
	| 'auth'
	| 'vcs'
	| 'ci-cd'
	| 'container'
	| 'orchestration'
	| 'testing'
	| 'monitoring'
	| 'analytics'
	| 'design'
	| 'methodology'
	| 'other';

/** Broad areas it’s used in (multi-select) */
export type TechScope =
	| 'frontend'
	| 'backend'
	| 'fullstack'
	| 'data'
	| 'ml'
	| 'devops'
	| 'design'
	| 'mobile'
	| 'desktop'
	| 'cloud';

/** One row in the global dictionary */
export type TechInfo = {
	label: string;
	kind: TechKind;
	url?: string;
	icon?: string;
	color?: string;
	scopes?: TechScope[];
	tags?: string[];
	aliases?: string[];
	description?: string;
	vendor?: string;
	license?: string;
	maturity?: 'experimental' | 'stable' | 'deprecated';
};

/** Single source of truth */
export const TECHNOLOGIES = {
	/* ────────────────────────────── Core web/app ────────────────────────────── */
	html: { label: 'HTML', kind: 'language', scopes: ['frontend'], tags: ['markup'] },
	css: { label: 'CSS', kind: 'style', scopes: ['frontend'] },
	javascript: {
		label: 'JavaScript',
		kind: 'language',
		scopes: ['frontend', 'backend'],
		aliases: ['js']
	},
	typescript: {
		label: 'TypeScript',
		kind: 'language',
		scopes: ['frontend', 'backend'],
		aliases: ['ts']
	},
	svelte: {
		label: 'Svelte',
		kind: 'framework',
		url: 'https://svelte.dev',
		icon: '🧡',
		scopes: ['frontend'],
		tags: ['runes']
	},
	sveltekit: {
		label: 'SvelteKit',
		kind: 'framework',
		url: 'https://kit.svelte.dev',
		scopes: ['fullstack']
	},
	vite: {
		label: 'Vite',
		kind: 'tool',
		url: 'https://vitejs.dev',
		scopes: ['frontend'],
		tags: ['bundler', 'devserver']
	},
	'vite-plugin-svelte': {
		label: 'vite-plugin-svelte',
		kind: 'tool',
		url: 'https://github.com/sveltejs/vite-plugin-svelte',
		scopes: ['frontend'],
		tags: ['vite-plugin']
	},
	'sveltekit-adapter-static': {
		label: 'Adapter Static',
		kind: 'tool',
		url: 'https://github.com/sveltejs/kit/tree/main/packages/adapter-static',
		scopes: ['fullstack'],
		tags: ['adapter', 'prerender']
	},

	/* ───────────────────────────── UI / styling ─────────────────────────────── */
	tailwindcss: {
		label: 'Tailwind CSS',
		kind: 'style',
		url: 'https://tailwindcss.com',
		scopes: ['frontend'],
		tags: ['utility-first']
	},
	'@tailwindcss/forms': {
		label: '@tailwindcss/forms',
		kind: 'library',
		url: 'https://github.com/tailwindlabs/tailwindcss-forms',
		scopes: ['frontend'],
		tags: ['tailwind-plugin']
	},
	'@tailwindcss/typography': {
		label: '@tailwindcss/typography',
		kind: 'library',
		url: 'https://github.com/tailwindlabs/tailwindcss-typography',
		scopes: ['frontend'],
		tags: ['tailwind-plugin']
	},
	'tailwindcss-palette-generator': {
		label: 'Tailwind Palette Generator',
		kind: 'tool',
		url: 'https://www.npmjs.com/package/tailwindcss-palette-generator',
		scopes: ['frontend'],
		tags: ['colors']
	},
	skeleton: {
		label: 'Skeleton',
		kind: 'ui',
		url: 'https://www.skeleton.dev',
		scopes: ['frontend'],
		tags: ['component-library']
	},

	/* ────────────────────────────── Content / meta ──────────────────────────── */
	mdsvex: {
		label: 'mdsvex',
		kind: 'library',
		url: 'https://mdsvex.pngwn.io/',
		scopes: ['frontend'],
		tags: ['markdown']
	},
	markdown: {
		label: 'Markdown',
		kind: 'other',
		scopes: ['frontend', 'backend', 'data'],
		tags: ['docs', 'markup'],
		aliases: ['md']
	},
	'svelte-meta-tags': {
		label: 'svelte-meta-tags',
		kind: 'library',
		url: 'https://github.com/metonym/svelte-meta-tags',
		scopes: ['frontend'],
		tags: ['seo']
	},

	/* ───────────────────────────── Python & ML stack ────────────────────────── */
	python: {
		label: 'Python',
		kind: 'language',
		url: 'https://python.org',
		icon: '🐍',
		scopes: ['data', 'backend']
	},
	cython: {
		label: 'Cython',
		kind: 'library',
		url: 'https://cython.org',
		scopes: ['backend', 'data'],
		tags: ['acceleration', 'c-extensions']
	},
	numba: {
		label: 'Numba',
		kind: 'library',
		url: 'https://numba.pydata.org',
		scopes: ['data', 'ml'],
		tags: ['jit', 'acceleration']
	},
	numpy: {
		label: 'NumPy',
		kind: 'library',
		url: 'https://numpy.org',
		scopes: ['data', 'ml'],
		aliases: ['numy'] // common typo
	},
	scipy: {
		label: 'SciPy',
		kind: 'library',
		url: 'https://scipy.org',
		scopes: ['data', 'ml']
	},
	pandas: {
		label: 'Pandas',
		kind: 'library',
		url: 'https://pandas.pydata.org',
		scopes: ['data'],
		tags: ['etl']
	},
	polars: {
		label: 'Polars',
		kind: 'library',
		url: 'https://pola.rs',
		scopes: ['data'],
		tags: ['dataframe', 'rust']
	},
	'scikit-learn': {
		label: 'scikit-learn',
		kind: 'library',
		url: 'https://scikit-learn.org',
		scopes: ['ml'],
		aliases: ['sklearn', 'scikit', 'sckitkit'] // catch misspellings
	},
	xgboost: {
		label: 'XGBoost',
		kind: 'library',
		url: 'https://xgboost.ai',
		scopes: ['ml'],
		tags: ['gbdt']
	},
	lightgbm: {
		label: 'LightGBM',
		kind: 'library',
		url: 'https://lightgbm.readthedocs.io',
		scopes: ['ml'],
		tags: ['gbdt']
	},
	catboost: {
		label: 'CatBoost',
		kind: 'library',
		url: 'https://catboost.ai',
		scopes: ['ml'],
		tags: ['gbdt']
	},
	tensorflow: {
		label: 'TensorFlow',
		kind: 'library',
		url: 'https://www.tensorflow.org',
		scopes: ['ml'],
		tags: ['deep-learning']
	},
	keras: {
		label: 'Keras',
		kind: 'library',
		url: 'https://keras.io',
		scopes: ['ml'],
		tags: ['deep-learning']
	},
	pytorch: {
		label: 'PyTorch',
		kind: 'library',
		url: 'https://pytorch.org',
		scopes: ['ml'],
		tags: ['deep-learning']
	},
	jax: {
		label: 'JAX',
		kind: 'library',
		url: 'https://jax.readthedocs.io',
		scopes: ['ml'],
		tags: ['autograd', 'xla']
	},
	mlx: {
		label: 'MLX',
		kind: 'library',
		url: 'https://github.com/ml-explore/mlx',
		scopes: ['ml'],
		tags: ['apple', 'array']
	},
	statsmodels: {
		label: 'Statsmodels',
		kind: 'library',
		url: 'https://www.statsmodels.org',
		scopes: ['data', 'ml'],
		tags: ['statistics', 'econometrics']
	},

	/* ────────────────────────────── Viz / plotting ──────────────────────────── */
	matplotlib: {
		label: 'Matplotlib',
		kind: 'library',
		url: 'https://matplotlib.org',
		scopes: ['data'],
		tags: ['plotting']
	},
	seaborn: {
		label: 'Seaborn',
		kind: 'library',
		url: 'https://seaborn.pydata.org',
		scopes: ['data'],
		tags: ['plotting']
	},
	plotly: {
		label: 'Plotly',
		kind: 'library',
		url: 'https://plotly.com/python/',
		scopes: ['data'],
		tags: ['interactive', 'plotting'],
		aliases: ['plotlit'] // catch typo
	},
	altair: {
		label: 'Altair',
		kind: 'library',
		url: 'https://altair-viz.github.io',
		scopes: ['data'],
		tags: ['vega-lite', 'plotting']
	},
	bokeh: {
		label: 'Bokeh',
		kind: 'library',
		url: 'https://bokeh.org',
		scopes: ['data'],
		tags: ['interactive', 'plotting']
	},
	plotnine: {
		label: 'plotnine',
		kind: 'library',
		url: 'https://plotnine.readthedocs.io',
		scopes: ['data'],
		tags: ['ggplot', 'plotting']
	},

	/* ─────────────────────────────── Data stores ────────────────────────────── */
	sql: {
		label: 'SQL',
		kind: 'language',
		scopes: ['backend', 'data']
	},
	sqlite: {
		label: 'SQLite',
		kind: 'database',
		url: 'https://sqlite.org',
		scopes: ['backend', 'data']
	},
	duckdb: {
		label: 'DuckDB',
		kind: 'database',
		url: 'https://duckdb.org',
		scopes: ['data'],
		tags: ['olap', 'embedded']
	},
	mysql: {
		label: 'MySQL',
		kind: 'database',
		url: 'https://www.mysql.com',
		scopes: ['backend', 'data']
	},
	postgresql: {
		label: 'PostgreSQL',
		kind: 'database',
		url: 'https://www.postgresql.org',
		scopes: ['backend', 'data'],
		aliases: ['postgres', 'postgresql']
	},

	/* ─────────────────────────────── Python web ─────────────────────────────── */
	django: {
		label: 'Django',
		kind: 'framework',
		url: 'https://www.djangoproject.com',
		scopes: ['backend', 'fullstack'],
		tags: ['orm', 'auth', 'admin']
	},
	flask: {
		label: 'Flask',
		kind: 'framework',
		url: 'https://flask.palletsprojects.com',
		scopes: ['backend']
	},
	fastapi: {
		label: 'FastAPI',
		kind: 'framework',
		url: 'https://fastapi.tiangolo.com',
		scopes: ['backend'],
		tags: ['async', 'openapi']
	},
	starlette: {
		label: 'Starlette',
		kind: 'framework',
		url: 'https://www.starlette.io',
		scopes: ['backend'],
		tags: ['asgi']
	},
	pydantic: {
		label: 'Pydantic',
		kind: 'library',
		url: 'https://docs.pydantic.dev',
		scopes: ['backend', 'data'],
		tags: ['validation', 'typing']
	},
	sqlalchemy: {
		label: 'SQLAlchemy',
		kind: 'library',
		url: 'https://www.sqlalchemy.org',
		scopes: ['backend', 'data'],
		tags: ['orm', 'db']
	},
	uvicorn: {
		label: 'Uvicorn',
		kind: 'tool',
		url: 'https://www.uvicorn.org',
		scopes: ['backend'],
		tags: ['asgi', 'server']
	},
	gunicorn: {
		label: 'Gunicorn',
		kind: 'tool',
		url: 'https://gunicorn.org',
		scopes: ['backend'],
		tags: ['wsgi', 'server']
	},
	requests: {
		label: 'Requests',
		kind: 'library',
		url: 'https://requests.readthedocs.io',
		scopes: ['backend'],
		tags: ['http']
	},

	/* ─────────────────────────── Notebooks / platforms ─────────────────────── */
	jupyter: {
		label: 'Jupyter',
		kind: 'tool',
		url: 'https://jupyter.org',
		scopes: ['data', 'ml'],
		tags: ['notebook']
	},
	jupyterlab: {
		label: 'JupyterLab',
		kind: 'tool',
		url: 'https://jupyterlab.readthedocs.io',
		scopes: ['data', 'ml'],
		tags: ['ide', 'notebook']
	},
	ipython: {
		label: 'IPython',
		kind: 'tool',
		url: 'https://ipython.org',
		scopes: ['data', 'ml'],
		tags: ['shell']
	},
	kaggle: {
		label: 'Kaggle',
		kind: 'platform',
		url: 'https://www.kaggle.com',
		scopes: ['data', 'ml']
	},
	// --- Front-end technique / Web APIs ---
	ajax: {
		label: 'AJAX',
		kind: 'api',
		url: 'https://developer.mozilla.org/docs/Web/Guide/AJAX',
		scopes: ['frontend'],
		tags: ['xhr', 'fetch', 'async'],
		aliases: ['xmlhttprequest', 'xhr'] // common ways people write it
	},

	// --- Python templating ---
	jinja2: {
		label: 'Jinja2',
		kind: 'library',
		url: 'https://jinja.palletsprojects.com/',
		scopes: ['backend'],
		tags: ['templating'],
		aliases: ['jinja'] // catch “jinja”
	},

	// --- Python utils for caching/parallelism used a lot with sklearn ---
	joblib: {
		label: 'joblib',
		kind: 'library',
		url: 'https://joblib.readthedocs.io/',
		scopes: ['ml', 'data'],
		tags: ['caching', 'parallelism', 'serialization']
	},

	/* ───────────────────────── Dev tooling / quality ───────────────────────── */
	prettier: {
		label: 'Prettier',
		kind: 'tool',
		url: 'https://prettier.io',
		scopes: ['frontend', 'backend']
	},
	svm: {
		label: 'SVM (Support Vector Machines)',
		kind: 'other', // keep types unchanged
		url: 'https://scikit-learn.org/stable/modules/svm.html',
		scopes: ['ml'],
		tags: ['algorithm', 'classification', 'regression', 'kernel'],
		aliases: [
			'support-vector-machine',
			'support vector machine',
			'support-vector-machines',
			'support vector machines',
			'svc',
			'svr'
		]
	},
	'prettier-plugin-svelte': {
		label: 'prettier-plugin-svelte',
		kind: 'tool',
		url: 'https://github.com/sveltejs/prettier-plugin-svelte',
		scopes: ['frontend']
	},
	'prettier-plugin-tailwindcss': {
		label: 'prettier-plugin-tailwindcss',
		kind: 'tool',
		url: 'https://github.com/tailwindlabs/prettier-plugin-tailwindcss',
		scopes: ['frontend']
	},
	eslint: {
		label: 'ESLint',
		kind: 'tool',
		url: 'https://eslint.org',
		scopes: ['frontend', 'backend']
	},
	'typescript-eslint': {
		label: 'typescript-eslint',
		kind: 'tool',
		url: 'https://typescript-eslint.io',
		scopes: ['frontend', 'backend']
	},
	'svelte-check': {
		label: 'svelte-check',
		kind: 'tool',
		url: 'https://github.com/sveltejs/language-tools/tree/master/packages/svelte-check',
		scopes: ['frontend'],
		tags: ['type-check']
	},
	black: {
		label: 'Black',
		kind: 'tool',
		url: 'https://black.readthedocs.io',
		scopes: ['backend', 'data'],
		tags: ['formatter']
	},
	isort: {
		label: 'isort',
		kind: 'tool',
		url: 'https://pycqa.github.io/isort/',
		scopes: ['backend', 'data'],
		tags: ['imports']
	},
	ruff: {
		label: 'Ruff',
		kind: 'tool',
		url: 'https://docs.astral.sh/ruff/',
		scopes: ['backend', 'data'],
		tags: ['linter']
	},
	mypy: {
		label: 'mypy',
		kind: 'tool',
		url: 'http://mypy-lang.org',
		scopes: ['backend', 'data'],
		tags: ['type-check']
	},
	pytest: {
		label: 'pytest',
		kind: 'testing',
		url: 'https://docs.pytest.org',
		scopes: ['backend', 'data', 'ml']
	},

	/* ─────────────── Accessibility / validation / performance / SEO ─────────── */
	'axe-core-cli': {
		label: 'axe-core/cli',
		kind: 'testing',
		url: 'https://github.com/dequelabs/axe-core-npm/tree/develop/packages/cli',
		scopes: ['frontend'],
		tags: ['a11y']
	},
	'html-validate': {
		label: 'html-validate',
		kind: 'testing',
		url: 'https://html-validate.org',
		scopes: ['frontend']
	},
	linkinator: {
		label: 'linkinator',
		kind: 'testing',
		url: 'https://github.com/JustinBeckwith/linkinator',
		scopes: ['frontend'],
		tags: ['links']
	},
	remark: {
		label: 'remark',
		kind: 'tool',
		url: 'https://remark.js.org',
		scopes: ['frontend'],
		tags: ['markdown', 'lint']
	},
	'remark-lint-no-dead-urls': {
		label: 'remark-lint-no-dead-urls',
		kind: 'tool',
		url: 'https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-dead-urls',
		scopes: ['frontend']
	},
	cspell: {
		label: 'cspell',
		kind: 'tool',
		url: 'https://cspell.org',
		scopes: ['frontend', 'backend'],
		tags: ['spellcheck']
	},
	'nu-html-checker': {
		label: 'Nu HTML Checker (vnu-jar)',
		kind: 'testing',
		url: 'https://validator.github.io/validator/',
		scopes: ['frontend'],
		aliases: ['w3c', 'w3c-validator', 'w3c-html-validator']
	},
	'lighthouse-ci': {
		label: 'Lighthouse CI',
		kind: 'ci-cd',
		url: 'https://github.com/GoogleChrome/lighthouse-ci',
		scopes: ['frontend'],
		tags: ['performance']
	},

	/* ─────────────────────────── VCS / CI / hosting ─────────────────────────── */
	git: {
		label: 'Git',
		kind: 'vcs',
		url: 'https://git-scm.com',
		scopes: ['devops']
	},
	github: {
		label: 'GitHub',
		kind: 'service',
		url: 'https://github.com',
		scopes: ['devops']
	},
	'github-actions': {
		label: 'GitHub Actions',
		kind: 'ci-cd',
		url: 'https://github.com/features/actions',
		scopes: ['devops'],
		tags: ['ci']
	},
	'github-pages': {
		label: 'GitHub Pages',
		kind: 'platform',
		url: 'https://pages.github.com',
		scopes: ['frontend', 'devops'],
		tags: ['static-hosting']
	},

	/* ───────────────────────── Runtime / packaging / env ────────────────────── */
	nodejs: {
		label: 'Node.js',
		kind: 'runtime',
		url: 'https://nodejs.org',
		scopes: ['frontend', 'backend', 'devops']
	},
	pip: {
		label: 'pip',
		kind: 'tool',
		url: 'https://pip.pypa.io',
		scopes: ['backend', 'data']
	},
	poetry: {
		label: 'Poetry',
		kind: 'tool',
		url: 'https://python-poetry.org',
		scopes: ['backend', 'data'],
		tags: ['packaging', 'venv']
	},

	/* ───────────────────────────── Containers / ops ─────────────────────────── */
	docker: {
		label: 'Docker',
		kind: 'container',
		url: 'https://www.docker.com',
		scopes: ['devops']
	},

	/* ───────────────────────────── Methodology / misc ───────────────────────── */
	agile: {
		label: 'Agile',
		kind: 'methodology',
		tags: ['scrum', 'kanban']
	}
} as const;

export type TechId = keyof typeof TECHNOLOGIES;
export type TechEntry = Readonly<TechInfo> & { readonly id: TechId };

/** 1) Fast display: id -> label (string) */
export function techLabel(id: TechId): string {
	return TECHNOLOGIES[id]?.label ?? String(id);
}

/** 2) Full dictionary: id -> entry (object) */
export function getTech(id: TechId): TechEntry {
	const e = TECHNOLOGIES[id];
	return { id, ...e };
}

/** Extras */
export function isTechId(x: unknown): x is TechId {
	return typeof x === 'string' && x in TECHNOLOGIES;
}
export function techLabels(ids: readonly TechId[]): string[] {
	return ids.map(techLabel);
}
export function getTechMany(ids: readonly TechId[]): TechEntry[] {
	return ids.map(getTech);
}

/** Handy grouping helpers */
export function groupByKind(ids: readonly TechId[]) {
	const m = new Map<TechKind, TechId[]>();
	for (const id of ids) {
		const k = TECHNOLOGIES[id].kind;
		(m.get(k) ?? m.set(k, []).get(k)!).push(id);
	}
	return m;
}
export function groupByScope(ids: readonly TechId[]) {
	const m = new Map<TechScope, TechId[]>();
	for (const id of ids) {
		for (const s of TECHNOLOGIES[id].scopes ?? []) {
			(m.get(s) ?? m.set(s, []).get(s)!).push(id);
		}
	}
	return m;
}
