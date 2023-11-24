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

<a
	{href}
	{target}
	data-sveltekit-preload-data="hover"
	class="card bg-gradient-to-br variant-gradient-primary-tertiary card-hover overflow-hidden flex flex-col space-y-4"
	data-analytics={`{"context":"grid","variant":"preview"}`}
>
	<div class="flex flex-col justify-between auto-rows-auto w-full h-full text-token">
		<header>
			<img
				src="/images/blog/{post.slug}/{post.image}"
				class="bg-black/200 w-full aspect-[3/2]"
				alt="Post"
			/>
		</header>
		<section class="p-4 space-y-4">
			<h2 class="h2" data-toc-ignore>{post.title}</h2>
			<article>
				<p>
					<!-- cspell:disable -->
					{post.excerpt}
					<!-- cspell:enable -->
				</p>
			</article>
		</section>
		<section>
			<hr class="opacity-30 bg-tertiary-500" />
			<footer class="p-4 flex justify-between">
				<div class="flex flex-wrap gap-2">
					{#if post.tags && post.tags.length > 0}
						<small>tags: </small>
						{#each post.tags as tag}
							<a
								data-sveltekit-preload-data="hover"
								href="/blog?{new URLSearchParams({ tag }).toString()}"
							>
								<h6 class="chip variant-filled-tertiary text-token">{tag}</h6>
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
		</section>
	</div>
</a>

<style lang="postcss">
</style>
