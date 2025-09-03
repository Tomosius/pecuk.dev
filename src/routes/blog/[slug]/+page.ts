// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getBySlug } from '$lib/blog/content';

// Statically discover all md/svx posts at build time
const modules = import.meta.glob('../../../lib/blog/posts/*.{md,svx}');

export const load: PageLoad = async ({ params }) => {
	const post = getBySlug(params.slug);
	if (!post) throw error(404, 'Post not found');

	const keyMd = `../../../lib/blog/posts/${params.slug}.md`;
	const keySvx = `../../../lib/blog/posts/${params.slug}.svx`;
	const loader = modules[keyMd] ?? modules[keySvx];

	if (!loader) throw error(404, 'Post component not found');

	const mod = (await loader()) as { default: unknown };
	return {
		slug: post.slug,
		meta: post.meta,
		component: mod.default
	};
};