<script lang="ts">
	import type { BlogTag } from '$lib/types/blog';
	export let selected: BlogTag;
	let className = '';
	export { className as class };
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let options: BlogTag[] = ['Projects', 'Blog', 'Updates'];

	const clickHandler = (value: BlogTag) => {
		if (value === selected) {
			goto(`/blog`, { keepFocus: true, noScroll: true });
			selected = '';
			return;
		}
		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set('tag', value);
		goto(`?${query.toString()}`, { keepFocus: true, noScroll: true });
		selected = value;
	};
</script>

<section class="flex justify-center flex-col items-center {className}">
	<p class="text-semibold mb-2 md:mb-4">Sort by category</p>
	<ul class="flex flex-wrap justify-center gap-2">
		{#each options as option}
			<li>
				<button
					class="btn btn-md variant-filled-primary"
					on:click={() => clickHandler(option)}
				>
					{option}
				</button>
			</li>
		{/each}
	</ul>
</section>
