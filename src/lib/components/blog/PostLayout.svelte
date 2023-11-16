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

<article class="text-token">
	<div class="flex justify-center mt-4 mb-8">
		<div class="w-full lg:w-[50rem] leading-[177.7%]">
			<header>
				<img
					src="/images/{imagesDirectoryName}/{slug}/{image}"
					alt={`${title}`}
					class=" bg-black/50 w-full aspect-[21/9] max-h-[540px] rounded-tr-[1.3rem]"
				/>
			</header>
			<div class="p-4 space-y-4">
				<h3 class="h3" data-toc-ignore>{title}</h3>
				<div class="prose max-w-none text-base">
					<slot />
				</div>
			</div>
		</div>
	</div>
	<hr class="opacity-50" />
	<footer class="p-4 flex justify-start items-center space-x-4">
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
	</footer>
</article>

<style lang="postcss">
	.prose :global(nav.toc) {
		@apply hidden;
	}
</style>
