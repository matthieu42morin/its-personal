import type { MarkdownMetadata } from '$lib/contents/types';

export type BlogTag = 'Projects' | 'Blog' | 'Updates' | '';

export interface BlogPost extends MarkdownMetadata {
	title: string;
	subtitle?: string;
	tags?: BlogTag[];
	modified?: string;
	date?: string;
	excerpt: string;
	image: string;
	slug?: string;
	href?: string;
	published: boolean;
}
