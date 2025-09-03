export type PostMeta = {
	slug: string;
	title: string;
	date: string;       // ISO
	tags: string[];
	summary: string;
	cover?: string;     // e.g. images/blog/hello-world/cover.jpg (relative to /static)
};

export type LoadedPost = PostMeta & {
	component: unknown; // the compiled Svelte component from MD
};