import { getBlogPost, listBlogPosts } from '$content/blog.js';
import type { PageLoad } from './$types';

export const entries = async () => {
    const posts = await listBlogPosts();
    return posts
        .filter((post) => post.slug !== undefined)
        .map((post) => ({ slug: post.slug as string }));
};

export const load: PageLoad = async ({ params, parent }) => {
    await parent();
    return await getBlogPost(params.slug);
};
