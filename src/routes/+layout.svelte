<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import MainFooter from '$lib/components/MainFooter.svelte';
	import MainHeader from '$lib/components/MainHeader.svelte';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	//Cookie, Identifiers and store
	import Cookies from 'js-cookie';
	import { cookies } from '$lib/constants';
	import { page } from '$app/stores';
	import { isEurope, removeTrailingSlash } from '$lib/utils/helpers';

	onMount(() => {
		Cookies.set(cookies.NECESSARY, 'true', {
			expires: 365,
			domain: '.mattmor.in'
		});

		if (Cookies.get(cookies.ANALYTICAL) !== 'false' && !isEurope()) {
			Cookies.set(cookies.ANALYTICAL, 'true', {
				expires: 365,
				domain: '.mattmor.in'
			});
		}

		if (Cookies.get(cookies.ANALYTICAL) === 'true') {
			Cookies.set(cookies.VISITED, 'true', {
				expires: 365,
				domain: '.mattmor.in'
			});
		}
	});

	// Scroll to anchor
	$: if ($page.url.pathname) {
		// Workaround until https://github.com/sveltejs/kit/issues/2664 is fixed
		if (typeof window !== 'undefined' && window.location.hash) {
			const deepLinkedElement = document.getElementById(window.location.hash.substring(1));
			if (deepLinkedElement) {
				deepLinkedElement.scrollIntoView();
			}
		}
	}

	// View-Transition
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		//@ts-expect-error - startViewTransition of View Transitions API, types don’t exist yet.
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			//@ts-expect-error - startViewTransition of View Transitions API, types don’t exist yet.
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// Highlight JS
	import hljs from 'highlight.js';
	import 'highlight.js/styles/nord.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	storeHighlightJs.set(hljs);
</script>

<svelte:head>
	<link
		rel="canonical"
		href={removeTrailingSlash(`https://www.mattmor.in&#x24;{&#x24;page.url.pathname}`)}
	/>
</svelte:head>

<!-- <Analytics />
 -->
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<MainHeader />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="pageFooter">
		<MainFooter />
	</svelte:fragment>
</AppShell>
<!-- <CookieConsent />

<Segment /> -->
