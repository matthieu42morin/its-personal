import { getProject, listProjects } from '$content/projects';
import type { PageLoad } from './$types';

export const entries = () => listProjects().map((post) => ({ slug: post.slug }));

export const load: PageLoad = async ({ params }) => {
	return await getProject(params.slug);
};
