<script lang="ts">
	import type { BlogTag } from '$lib/types/blog';
	export let selected: BlogTag;
	let className = '';
	export { className as class };
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let options: BlogTag[] = ['DevOps', 'AI', 'Updates'];

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
	<h3 class="h3 mb-2 md:mb-3">Sort by category</h3>
	<ul class="flex flex-wrap justify-center gap-2">
		{#each options as option}
			<li>
				<button
					class="chip {option === selected
						? 'variant-filled-tertiary'
						: 'variant-soft-primary'}"
					on:click={() => clickHandler(option)}
				>
					{option}
				</button>
			</li>
		{/each}
	</ul>
</section>
