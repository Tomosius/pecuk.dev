// src/routes/blog/+page.ts
import type { PageLoad } from './$types';
import { getAll } from '$lib/blog/content';

export const load: PageLoad = async () => {
	const posts = getAll();
	return { posts };
};