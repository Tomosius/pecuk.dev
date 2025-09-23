// src/lib/route-meta.ts
import { defineMeta, type ContentMeta } from '$lib/content';

export type InferredType = 'project' | 'blog' | 'unknown';

const TYPE_MAP: Record<string, InferredType> = {
  projects: 'project',
  project: 'project',
  blog: 'blog',
  posts: 'blog',
  articles: 'blog'
};

function stripBase(pathname: string, base = ''): string {
  if (!base) return pathname;
  return pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
}

/** Infer type + slug from a URL pathname (e.g. "/projects/my-slug"). */
export function inferMetaFromPath(pathname: string, base = ''): {
  type: InferredType;
  slug?: string;
  segments: string[];
  path: string;
} {
  const clean = stripBase(pathname, base);
  const segs = clean.split('/').filter(Boolean); // remove "", trailing slash
  const root = segs[0] ?? '';
  const type = TYPE_MAP[root] ?? 'unknown';
  const slug = segs.length > 1 ? decodeURIComponent(segs[1]) : undefined;
  return { type, slug, segments: segs, path: clean };
}

/**
 * Merge inferred route meta into your page meta.
 * Lets you omit `type` and/or `slug` in pages; they’ll be filled from the URL.
 * If inference fails, defaults to type "project" and empty slug (so you notice).
 */
export function withRouteMeta(
  init: Omit<ContentMeta, 'type' | 'slug'> & Partial<Pick<ContentMeta, 'type' | 'slug'>>,
  pathname: string,
  base = ''
): ContentMeta {
  const inferred = inferMetaFromPath(pathname, base);
  const type = init.type ?? (inferred.type === 'unknown' ? 'project' : inferred.type);
  const slug = init.slug ?? (inferred.slug ?? '');
  return defineMeta({ ...init, type, slug });
}