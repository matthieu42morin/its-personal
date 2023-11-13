import { listProjects } from '$content/projects';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	return {
		projects: listProjects()
	};
};
