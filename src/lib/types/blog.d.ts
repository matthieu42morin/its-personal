import type { MarkdownMetadata } from '../../../src/content/types';

export type BlogTag = 'DevOps' | 'AI' | 'Updates' | '';

export interface BlogPost extends MarkdownMetadata {
	author?: string;
	date?: string;
	excerpt: string;
	image: string;
	slug?: string;
	href?: string;
	tags?: BlogTag[];
	subtitle?: string;
	teaserImage: string;
	title: string;
	isNotAnActualPost?: boolean;
	type?: string;
}
