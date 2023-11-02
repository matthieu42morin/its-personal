import type { BlogPost } from '$lib/types/blog';
import type { MarkdownMetadata } from '$lib/contents/types';
import type { MdsvexImport } from './types';
import { parseReadContent } from '../../content/utils';
import { error } from '@sveltejs/kit';


export function listBlogPosts() {
	const posts = import.meta.glob<BlogPost>('./blog/*.md', {
		eager: true,
		import: 'metadata'
	});

	return parseReadContent(posts);
}

export async function getBlogPostMetadata(slug: string) {
	const { post } = await getBlogPost(slug);
	return post;
}

export async function getBlogPost(slug: string) {
	try {
		const data: MdsvexImport<BlogPost & MarkdownMetadata> = await import(`./blog/${slug}.md`);

		return {
			post: { ...data.metadata, slug },
			Component: data.default
		};
	} catch {
		throw error(404, `Unable to find blog post "${slug}"`);
	}
}
