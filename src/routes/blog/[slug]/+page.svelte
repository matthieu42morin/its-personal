<script lang="ts">
	import BlogContentLayout from '$lib/components/blog/BlogLayout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- <svelte:head>
	<title>{data.post.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.post.title} />
</svelte:head> -->

<BlogContentLayout post={data.post}>
	<svelte:component this={data.Component} />
</BlogContentLayout>
