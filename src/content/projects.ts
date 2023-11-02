import type { MarkdownMetadata, MdsvexImport } from './types';
import { parseReadContent } from './utils';
import { error } from '@sveltejs/kit';

export interface Project extends MarkdownMetadata {
	title: string;
	excerpt: string;
	slug: string;
	image: string;
	date: string;
	pageTitle: string;
	pageDescription: string;
	keywords: string;
}

/**
 * Gets all the projects metadata
 */
export function listProjects() {
	const projects = import.meta.glob<Project>('./projects/*.md', {
		eager: true,
		import: 'metadata'
	});

	return parseReadContent(projects);
}

export async function getProject(slug: string) {
	try {
		const data: MdsvexImport<Project> = await import(`./projects/${slug}.md`);

		return {
			post: { ...data.metadata, slug },
			Component: data.default
		};
	} catch {
		throw error(404, `Unable to find project "${slug}"`);
	}
}
