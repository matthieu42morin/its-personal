import { listBlogPosts } from '$content/blog';
import RSS from 'rss';

export const GET = async () => {
	const posts = listBlogPosts();

	/*
    The RSS feed is a JavaScript object that contains information about the blog feed.
    It has a title, description, copyright, and other properties.
    It also has an array of categories that can be used to filter the blog feed.
    The pubDate property indicates when the feed was last updated.
    */

	const feed = new RSS({
		title: "Matt's C4vern",
		description: "Matt's personal blog about ventures in tech.",
		copyright: `Copyright © ${new Date().getFullYear()} Matt Morin. All rights reserved`,
		ttl: 1800,
		feed_url: 'https://www.mattmor.in/blog',
		site_url: 'https://www.mattmor.in',
		image_url: 'https://www.mattmor.in/favicon192.png',
		language: 'en',
		categories: ["Matt's C4vern updates", 'Tech', 'Disruption', 'DevOps', 'Ventures'],
		pubDate: new Date().toUTCString(),
		generator: 'Matt Morin'
	});

	// This code creates an RSS feed. It does so by iterating over all posts and
	// adding each post to the feed.

	posts.forEach((post: any) => {
		feed.item({
			title: post.title,
			description: post.excerpt,
			url: `https://www.mattmor.in/blog/${post.slug}`,
			guid: `https://www.mattmor.in/blog/${post.slug}`,
			categories: post.tags,
			date: post.date,
			enclosure: {
				url: `https://www.mattmor.in/images/blog/${post.slug}/${post.image}`,
				type: 'image/webp'
			},
			author: post.author
		});
	});

	return new Response(feed.xml(), {
		headers: {
			'Cache-Control': 'max-age=0, s-max-age=3600',
			'Content-Type': 'application/xml'
		}
	});
};
