// src/lib/blog/content.ts
// Collects md/svx posts and exposes helpers to list/find them.

export type PostMeta = {
	title: string;
	summary?: string;
	date?: string;       // ISO like "2025-09-03"
	tags?: string[];
	draft?: boolean;
	cover?: string;
};

export type PostListItem = {
	slug: string;        // e.g. "my-first-post"
	path: string;        // virtual module path
	meta: PostMeta;
};

type MdModule = {
	// mdsvex/SvelteKit typically exposes "metadata" for frontmatter
	metadata?: PostMeta;
	// some setups expose "frontmatter" instead – we’ll read either:
	frontmatter?: PostMeta;
	// default Svelte component, not needed for list view
	default: unknown;
};

// import every .md/.svx under /src/lib/blog/posts/** (eager for simplicity)
const modules = import.meta.glob<MdModule>(
	'/src/lib/blog/posts/**/*.{md,svx}',
	{ eager: true }
);

// turn file path into slug: ".../my-first-post.md" -> "my-first-post"
function pathToSlug(path: string): string {
	const name = path.split('/').pop() || '';
	return name.replace(/\.(md|svx)$/, '');
}

// Prefer `metadata`, fallback to `frontmatter`
function readMeta(m: MdModule): PostMeta | undefined {
	return m?.metadata ?? m?.frontmatter;
}

export function getAll(): PostListItem[] {
	const items: PostListItem[] = Object.entries(modules)
		.map(([path, mod]) => {
			const meta = readMeta(mod);
			if (!meta || meta.draft) return null; // hide drafts or missing meta
			return {
				slug: pathToSlug(path),
				path,
				meta
			} as PostListItem;
		})
		.filter(Boolean) as PostListItem[];

	// newest first when dates are present
	items.sort((a, b) => {
		const ad = a.meta.date ? Date.parse(a.meta.date) : 0;
		const bd = b.meta.date ? Date.parse(b.meta.date) : 0;
		return bd - ad;
	});

	return items;
}

export function getBySlug(slug: string): PostListItem | undefined {
	return getAll().find((p) => p.slug === slug);
}