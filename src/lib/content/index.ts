// src/lib/content/index.ts
export type ContentType = 'blog' | 'project' | 'study';

export interface ContentItem {
	url: string;
	type: ContentType;
	slug?: string;
	title: string;
	description?: string;
	tags?: string[];
	image?: string;
}

let loaded = false;
let items: ContentItem[] = [];

export async function ensureContentLoaded(): Promise<void> {
	if (loaded) return;

	const res = await fetch('/content-index.json');
	const json = await res.json();

	items = Array.isArray(json)
		? json.filter(
				(x): x is ContentItem =>
					!!x &&
					typeof x.url === 'string' &&
					typeof x.title === 'string' &&
					typeof x.type === 'string'
			)
		: [];

	loaded = true;
}

export async function getAll(): Promise<ContentItem[]> {
	await ensureContentLoaded();
	return items;
}

export async function getByType(type: ContentType): Promise<ContentItem[]> {
	await ensureContentLoaded();
	return items.filter((i) => i.type === type);
}

export async function search(query: string): Promise<ContentItem[]> {
	await ensureContentLoaded();
	const q = query.trim().toLowerCase();
	if (!q) return items;

	return items.filter((item) => {
		const inTitle = item.title.toLowerCase().includes(q);
		const inDesc = (item.description ?? '').toLowerCase().includes(q);
		const inTags = (item.tags ?? []).some((t) => t.toLowerCase().includes(q));
		return inTitle || inDesc || inTags;
	});
}
