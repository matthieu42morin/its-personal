<!-- <script lang="ts">
	import CategoryFilter from './../../lib/components/blog/CategoryFilter.svelte';
	import { formatDate } from '$src/content/utils.js';
	import { BlogPost } from '$lib/components/blog';
	import * as config from '$lib/config';

	export let data;
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

 <section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href={post.slug} class="title"></a>
				<p class="date">{formatDate(post.date, 'full', 'en')}</p>
				<p class="description"></p>
			</li>
		{/each}
	</ul>
	<div class="flex w-3/4">
		<BlogPost />
		<div>Some shit</div>
	</div>
</section> 
<section class="flex max-w-[600px]">
	{#each data.posts as post}
		<li class="posts">
			<a href={post.slug}>
				<BlogPost>
					<svelte:fragment slot="header">{post.title}</svelte:fragment>
					<p class="date" />

					<svelte:fragment slot="footer"
						>{formatDate(post.date)}, {post.description}</svelte:fragment
					>
				</BlogPost>
			</a>
		</li>
	{/each}
</section> -->

<script lang="ts">
	import PostPreview from '$lib/components/blog/PostPreview.svelte';
	import CategoryFilter from '$lib/components/blog/CategoryFilter.svelte';
	import type { PageData } from './$types';
	import type { BlogTag } from '$lib/types/blog';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let data: PageData;

	let filter: BlogTag | null = null;

	$: posts = data.posts.filter((post) => (filter ? post.tags?.includes(filter) : true));

	onMount(() => {
		const tagParam = $page.url.searchParams.get('tag');

		if (!filter && typeof tagParam == 'string') {
			filter = tagParam as BlogTag;
		}
	});

	const displayAmount = 12;
</script>

<div>
	<div class="space-y-8">
		<header class="flex flex-col justify-center items-center">
			<h1 class="h1 m-4">Blog</h1>
			<CategoryFilter class="mb-2 md:mb-4" bind:selected={filter} />
		</header>
		<div
			class="grid m-auto max-w-7xl w-full gap-6 grid-cols-none justify-center md:grid-cols-2 lg:grid-cols-3"
		>
			{#each posts.slice(0, displayAmount) as post}
				<div class="flex justify-center min-w-[20rem] max-w-sm">
					<PostPreview {post} type="blog" isMostRecent />
				</div>
			{/each}
		</div>
	</div>

	{#if posts.slice(displayAmount).length > 0}
		<div>
			<h2 class="mb-4 text-center">Previous posts</h2>
			<div
				class="previous grid m-auto max-w-7xl w-full gap-6 grid-cols-none justify-center md:grid-cols-2 lg:grid-cols-3"
			>
				{#each posts.slice(displayAmount) as post}
					<div class="flex justify-center min-w-[20rem] max-w-sm">
						<PostPreview {post} type="blog" />
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
</style>
