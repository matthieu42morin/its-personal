import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';
import path from 'path';
import { mdsvex } from 'mdsvex';
import headings from 'remark-autolink-headings';
import remarkExternalLinks from 'remark-external-links';
import slug from 'remark-slug';
import remarkSetImagePath from './src/lib/utils/remark-set-image-path.js';
import remarkEmbedVideo from './src/lib/utils/remark-embed-video.js';
import remarkLinkWithImageAsOnlyChild from './src/lib/utils/remark-link-with-image-as-only-child.js';
import remarkHeadingsPermaLinks from './src/lib/utils/remark-headings-permalinks.js';
import { toString } from 'mdast-util-to-string';
import rehypeWrap from 'rehype-wrap-all';
import rehypeImgSize from 'rehype-img-size';
import { highlightCode } from './src/lib/utils/highlight.js';
import { mdsvexGlobalComponents } from './src/lib/utils/mdsvex-global-components.js';
import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import getHeadings from './src/lib/utils/get-headings.js';

const mdsvexOptions = {
		extensions: ['.md'],
		highlight: {
			highlighter: highlightCode,
		},
		rehypePlugins: [
			[
				rehypeWrap,
				{ selector: 'table', wrapper: 'div.overflow-auto' },
			],
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
				},
			],
		],
		remarkPlugins: [
			[
				remarkExternalLinks,
				{
					target: '_blank',
				},
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
								ariaLabel: toString(node) + ' permalink',
							}),
						];
					},
				},
			],
			remarkSetImagePath,
			remarkLinkWithImageAsOnlyChild,
			remarkHeadingsPermaLinks,
			getHeadings,
			[
				remarkEmbedVideo,
				{
					width: 800,
					height: 400,
					noIframeBorder: true,
				},
			],
		],
	};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [ 
		vitePreprocess(),
		preprocess({
			postcss: true
		}),
		mdsvexGlobalComponents({
			dir: `$lib/components`,
			list: [['CodeFence', 'code-fence.svelte']],
			extensions: ['.md'],
		}),
		mdsvex(mdsvexOptions)
	],
	
	vitePlugin: {
		inspector: true,
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.

		adapter: adapter({
			runtime: 'nodejs18.x'
		}),
		alias: {
			$lib: path.resolve('src', 'lib'),
			$root: path.resolve('/'),
			$src: path.resolve('src'),
			$routes: path.resolve('src', 'routes'),
			$content: path.resolve('src', 'content')
		},
		prerender: {
            handleHttpError: ({ path, referrer, message }) => {
                // ignore deliberate link to shiny 404 page
                if (path === '/not-found' && referrer === '/404') {
                    return;
                }

                // otherwise fail the build
                throw new Error(message);
            }
        }
	}
};
export default config;