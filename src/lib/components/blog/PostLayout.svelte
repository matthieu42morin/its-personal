<script lang="ts">
	import { formatDate } from '$content/utils';
	import '$lib/assets/prism-nord.css';

	export let imagesDirectoryName: string;

	export let date: string = '';
	export let slug: string = '';
	export let title: string;
	export let image: string;
	export let tags: string[] = [];
</script>

<article class="flex justify-center mt-4 mb-8">
	<div class=" w-full lg:w-[50rem] leading-[177.7%]">
		<header>
			<img
				src="/images/{imagesDirectoryName}/{slug}/{image}"
				alt={`${title}`}
				class=" bg-black/50 w-full aspect-[21/9] max-h-[540px] rounded-t-[1.3rem]"
			/>
		</header>
		<div class="flex-auto flex justify-between items-center">
			{#if tags && tags.length > 0}
				<div class="flex mb-2 items-center gap-2">
					tags: {#each tags as tag}
						<a
							data-sveltekit-preload-data="hover"
							href="/blog?{new URLSearchParams({ tag }).toString()}"
						>
							<span class="chip variant-ghost-surface">{tag}</span>
						</a>
					{/each}
				</div>
			{/if}
			<small>On {formatDate(date)}</small>
		</div>
		<div class="space-y-4 text-token">
			<h2 class="h2" data-toc-ignore>{title}</h2>
			<div class="prose max-w-none text-token">
				<slot />
			</div>
		</div>
	</div>
	<hr class="opacity-50" />
	<footer class="p-4 flex justify-start items-center space-x-4" />
</article>

<style lang="postcss">
	.prose :global(nav.toc) {
		@apply hidden;
	}
</style>
