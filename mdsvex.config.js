import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import headings from 'remark-autolink-headings';
import remarkExternalLinks from 'remark-external-links';
import slug from 'remark-slug';
import remarkSetImagePath from './src/lib/utils/remark-set-image-path.js';
import remarkLinkWithImageAsOnlyChild from './src/lib/utils/remark-link-with-image-as-only-child.js';
import remarkHeadingsPermaLinks from './src/lib/utils/remark-headings-permalinks.js';
import { toString } from 'mdast-util-to-string';
import rehypeWrap from 'rehype-wrap-all';
import rehypeImgSize from 'rehype-img-size';
import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import remarkToc from 'remark-toc';
import getHeadings from './src/lib/utils/get-headings.js';
// import { highlightCode } from './src/lib/utils/highlighter.js';

/** @type {import('mdsvex').MdsvexOptions} */
const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],
	smartypants: {
		dashes: 'oldschool'
	},
	// Wait for skeleton to implement Prismjs, for now use <CodeBlock /> in .md files
	// highlight: {},
	// layout: {
	// 	blog: './src/lib/components/blog/_blog-layout.svelte',
	// 	project: './src/lib/components/projects/_project-layout.svelte',
	// 	_: './src/lib/components/fallback/_layout.svelte'
	// },
	rehypePlugins: [
		[rehypeWrap, { selector: 'table', wrapper: 'div.overflow-auto' }],
		[rehypeImgSize, { dir: './static' }],
		[
			/** Custom rehype plugin to add loading="lazy" to all images */
			() => {
				return (tree) => {
					visit(tree, 'element', (node) => {
						if (node.tagName === 'img') {
							node.properties.loading = 'lazy';
						}
					});
				};
			}
		]
	],
	remarkPlugins: [
		[remarkToc, { maxDepth: 3, tight: true }][
			(remarkExternalLinks,
			{
				target: '_blank'
			})
		],
		slug,
		[
			headings,
			{
				behavior: 'append',
				linkProperties: {},
				content: function (node) {
					return [
						h('span.icon.icon-link header-anchor', {
							ariaLabel: toString(node) + ' permalink'
						})
					];
				}
			}
		],
		remarkSetImagePath,
		remarkLinkWithImageAsOnlyChild,
		remarkHeadingsPermaLinks,
		getHeadings
	]
});

export default config;
