<script lang="ts">
	import { isAnExternalLink } from '$lib/utils/helpers';
	import type { BlogPost } from '$lib/types/blog';

	export let isMostRecent: boolean = false;
	export let type: 'blog' | 'projects';
	export let layout: 'row' | 'column' = 'column';
	export let post: BlogPost;
	// export let published: boolean;
	// export let headlineOrder: 'h3' | '' = '';
	// export let badge: string = '';
	// export let textWidth: string = '';

	const generateURL = (href?: string, slug?: string) => {
		if (href) return href;
		return `/${type}/${slug}`;
	};

	$: href = generateURL(post['href'], post.slug);

	$: target = post && post['href'] && isAnExternalLink(post['href']) ? '_blank' : undefined;

	const displayDate = new Date(Date.parse(post.date)).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
</script>

<div class="grid auto-rows-auto w-full h-full text-token">
	<a
		{href}
		{target}
		data-sveltekit-preload-data="hover"
		class="card bg-gradient-to-br variant-gradient-primary-secondary card-hover overflow-hidden flex flex-col space-y-4"
		data-analytics={`{"context":"grid","variant":"preview"}`}
	>
		<!-- Detailed -->
		<!-- <a
				class="card "
				href="/blog/{post.slug}"
			> -->
		<header>
			<img
				src="/images/blog/{post.slug}/{post.image}"
				class="bg-black/50 w-full aspect-[3/2]"
				alt="Post"
			/>
		</header>
		<section class="p-4 space-y-4">
			<h6 class="text-2" data-toc-ignore>
				<div class="items-center flex gap-2">
					{#if post.tags}
						{#each post.tags as tag}
							<span class="chip variant-ghost-tertiary">{tag}</span>
						{/each}
					{/if}
				</div>
			</h6>
			<h3 class="h3" data-toc-ignore>{post.title}</h3>
			<article>
				<p>
					<!-- cspell:disable -->
					{post.excerpt}
					<!-- cspell:enable -->
				</p>
			</article>
		</section>
		<hr class="opacity-50" />
		<footer class="p-4 flex justify-between">
			<div class="flex flex-wrap gap-2">
				{#if post.tags && post.tags.length > 0}
					<small>tags: </small>
					{#each post.tags as tag}
						<a
							data-sveltekit-preload-data="hover"
							href="/blog?{new URLSearchParams({ tag }).toString()}"
						>
							<h6 class="chip variant-ghost-surface">{tag}</h6>
						</a>
					{/each}
				{/if}
			</div>
			<div class="mt-auto">
				<small>
					{#if post.date}
						<span class="text-sm ml-4">
							{displayDate}
						</span>
					{/if}
				</small>
			</div>
		</footer>
	</a>
</div>

<style lang="postcss">
</style>
