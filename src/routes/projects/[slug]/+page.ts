import { error } from '@sveltejs/kit';
import { getBySlug } from '$lib/projects/data';

export const prerender = true;

export function load({ params }) {
	const p = getBySlug(params.slug);
	if (!p) throw error(404, 'Project not found');
	return { p };
}