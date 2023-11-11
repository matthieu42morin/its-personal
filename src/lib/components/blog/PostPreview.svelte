<script lang="ts">
	import { isAnExternalLink } from '$lib/utils/helpers';
	import type { BlogPost } from '$lib/types/blog';

	export let post: BlogPost;
	export let type: 'blog';
	export let published: boolean;
	export let headlineOrder: 'h3' | '' = '';
	export let badge: string = '';
	export let textWidth: string = '';

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
	class="card"
	data-analytics={`{"context":"grid","variant":"preview"}`}
>
	<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 gap-4">
		<!-- Detailed -->
		<a
			class="card bg-gradient-to-br variant-gradient-tertiary-primary card-hover overflow-hidden"
			href="/blog/{post.slug}"
		>
			<header>
				<img
					src="/images/blog/{post.slug}/{post.image}"
					class="bg-black/50 w-full aspect-[21/9]"
					alt="Post"
				/>
			</header>
			<div class="p-4 space-y-4">
				<h6 class="text-2" data-toc-ignore>
					<div class="items-center flex gap-2">
						{#if post.tags}
							{#each post.tags as tag}
								<span class="chip variant-ghost-surface">{tag}</span>
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
			</div>
			<hr class="opacity-50" />
			<footer class="p-4 flex justify-start items-center space-x-4">
				<div class="flex-auto flex justify-between items-center">
					<h6 class="font-bold" data-toc-ignore>By Matt</h6>
					<small>
						{#if post.date}
							<span class="date text-p-small ml-macro">
								{displayDate}
							</span>
						{/if}
					</small>
				</div>
			</footer>
		</a>
	</div>
</a>
