<script lang="ts">
	import { formatDate } from '$src/content/utils.js';

	export let baseUrl: string;
	export let imagesDirectoryName: string;

	export let date: string = '';
	export let author: string = '';
	export let slug: string = '';
	export let title: string;
	export let image: string;
	export let teaserImage: string;
	export let excerpt: string;
	export let tags: string[] = [];
	
</script>

<article>
	<div class="flex justify-center mt-4 mb-8">
		<div class="w-full lg:w-[50rem] leading-[177.7%]">
			<img
				src="/images/{imagesDirectoryName}/{slug}/{teaserImage || image}"
				alt={`${title}`}
				class="max-h-[540px] rounded-tl-2xl rounded-tr-[1.3rem]"
			/>
			<div
				class="content-blog prose prose-img:rounded-tl-2xl prose-img:rounded-tr-[1.3rem] max-w-none text-body"
			>
				<p
					class="{tags && tags.length > 0
						? '!mb-2'
						: '!mb-2'} mt-[1.875rem] text-body text-white"
				>
					{formatDate(date)}
				</p>
				{#if tags && tags.length > 0}
					<div class="flex mb-2 items-center gap-2">
						{#each tags as tag}
							<a
								data-sveltekit-preload-data="hover"
								href="/blog?{new URLSearchParams({tag}).toString()}"
							>
								<span class="chip variant-ghost-surface text-white">{tag}</span>
							</a>
						{/each}
					</div>
				{/if}
				<slot />
			</div>
		</div>
	</div>
</article>

<style lang="postcss">
	.prose :global(nav.toc) {
		@apply hidden;
	}
</style>
