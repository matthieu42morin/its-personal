import type { MarkdownMetadata } from '$lib/contents/types';

export type BlogTag = 'Projects' | 'Ideas' | 'Updates' | '';

export interface BlogPost extends MarkdownMetadata {
	date?: string;
	excerpt: string;
	image: string;
	slug?: string;
	href?: string;
	tags?: BlogTag[];
	subtitle?: string;
	title: string;
	published: boolean;
}
