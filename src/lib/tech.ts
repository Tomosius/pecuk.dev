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
	label: string; // human readable
	kind: TechKind; // what it is
	url?: string; // official/docs
	icon?: string; // emoji or icon name
	color?: string; // optional badge color
	scopes?: TechScope[]; // where it’s used
	tags?: string[]; // 'etl','orm','rest','agile', ...
	aliases?: string[]; // alternate names for search
	description?: string; // short blurb
	vendor?: string; // e.g. PostgreSQL Global Dev Group
	license?: string; // MIT, Apache-2.0, …
	maturity?: 'experimental' | 'stable' | 'deprecated';
};

/** Single source of truth */
export const TECHNOLOGIES = {
	python: {
		label: 'Python',
		kind: 'language',
		url: 'https://python.org',
		icon: '🐍',
		scopes: ['data', 'backend']
	},
	pandas: {
		label: 'Pandas',
		kind: 'library',
		url: 'https://pandas.pydata.org',
		scopes: ['data'],
		tags: ['etl']
	},
	numpy: { label: 'NumPy', kind: 'library', url: 'https://numpy.org', scopes: ['data'] },
	'scikit-learn': {
		label: 'scikit-learn',
		kind: 'library',
		url: 'https://scikit-learn.org',
		scopes: ['ml']
	},
	html: { label: 'HTML', kind: 'language', scopes: ['frontend'] },
	css: { label: 'CSS', kind: 'style', scopes: ['frontend'] },
	typescript: { label: 'TypeScript', kind: 'language', scopes: ['frontend', 'backend'] },
	svelte: {
		label: 'Svelte',
		kind: 'framework',
		url: 'https://svelte.dev',
		icon: '🧡',
		scopes: ['frontend']
	},
	sveltekit: {
		label: 'SvelteKit',
		kind: 'framework',
		url: 'https://kit.svelte.dev',
		scopes: ['fullstack']
	},
	tailwindcss: {
		label: 'Tailwind CSS',
		kind: 'style',
		url: 'https://tailwindcss.com',
		scopes: ['frontend'],
		tags: ['utility-first']
	},
	skeleton: {
		label: 'Skeleton',
		kind: 'ui',
		url: 'https://www.skeleton.dev',
		scopes: ['frontend'],
		tags: ['component-library']
	},
	vite: {
		label: 'Vite',
		kind: 'tool',
		url: 'https://vitejs.dev',
		scopes: ['frontend'],
		tags: ['bundler', 'devserver']
	}

	// add more any time (no type churn):
	// postgresql: { label:'PostgreSQL', kind:'database', scopes:['backend','data'] },
	// duckdb: { label:'DuckDB', kind:'database', scopes:['data'], tags:['olap','embedded'] },
	// git: { label:'Git', kind:'vcs', url:'https://git-scm.com', scopes:['devops'] },
	// github: { label:'GitHub', kind:'service', scopes:['devops'], tags:['vcs','ci-cd'] },
	// docker: { label:'Docker', kind:'container', scopes:['devops'] },
	// agile: { label:'Agile', kind:'methodology', tags:['scrum','kanban'] },
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
