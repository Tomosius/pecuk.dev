// src/lib/content.ts
import { getTech, type TechId } from '$lib/tech';

export type ContentType = 'project' | 'blog';

export type ContentLinks = {
	repo?: string;
	demo?: string;
	docs?: string;
};

export type ContentMeta = {
	type: ContentType;
	slug: string;
	title: string;
	summary: string;
	date?: string; // ISO (YYYY-MM-DD)
	cover?: string; // image path or absolute URL
	links?: ContentLinks;
	tech: TechId[]; // validated by your TechId union
	keywords?: string[];
};

/** Helper to get strong typing + nice inference in pages */
export function defineMeta<T extends ContentMeta>(m: T): T {
	return m;
}

/** Convenience: turn meta.tech into full entries (label/url/icon/…) */
export function techEntries(meta: Pick<ContentMeta, 'tech'>) {
	return meta.tech.map(getTech);
}

/** (Optional) Tiny runtime validator if you want hard errors during dev */
export function validateMeta(meta: ContentMeta) {
	if (!meta.type) throw new Error('meta.type is required');
	if (!meta.slug) throw new Error('meta.slug is required');
	if (!meta.title) throw new Error('meta.title is required');
	if (!Array.isArray(meta.tech)) throw new Error('meta.tech must be an array');
	return meta;
}
