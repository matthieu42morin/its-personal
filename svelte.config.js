import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';
import path from 'path';

// import { mdsvexGlobalComponents } from './src/lib/utils/mdsvexGlobalComponents.js/index.js';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
/* Not using 
// import { mdsvexGlobalComponents } from './src/lib/utils/mdsvex-global-components.js';



/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...(mdsvexConfig.extensions || [])],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		}),
		// No neeed rn unless using mdsvex highlighter with svelte components
		//mdsvexGlobalComponents({
		// 	dir: `$lib/components/blog`,
		// 	list: ['CodeFence.svelte'],
		// 	extensions: ['.md']
		// }),
		mdsvex(mdsvexConfig)
	],

	vitePlugin: {
		inspector: true
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.

		adapter: adapter({}),
		// sometimes problems with
		alias: {
			$lib: path.resolve('src', 'lib'),
			$root: path.resolve('/'),
			$src: path.resolve('src'),
			$routes: path.resolve('src', 'routes'),
			$content: path.resolve('src', 'content')
		},
		// TODO: FIX Banning external malware scripts for security and privacy of users, threw errors,
		// csp: {
		// 	directives: {
		// 		'script-src': ['self']
		// 	},
		// 	reportOnly: {
		// 		'script-src': ['self']
		// 	}
		// },
		csrf: {
			checkOrigin: process.env.NODE_ENV === 'development' ? false : true
		},
		prerender: {
			crawl: true,
			handleMissingId: 'warn',
			handleHttpError: (details) => {
				// Handle blog trying to prerender relative links that it can't
				if (
					details.status == 404 &&
					details.path.startsWith('/blog') &&
					details.referenceType == 'linked'
				) {
					console.warn(`PRERENDER ignored route ${details.path}`);
					return;
				}

				throw new Error(`${details.status} ${details.path} from ${details.referrer}`);
			}
		}
	}
};

export default config;
