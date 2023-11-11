<script lang="ts">
	import PostContentLayout from './PostLayout.svelte';

	import type { BlogPost } from '$lib/types/blog';

	export let post: BlogPost;
</script>

<PostContentLayout {...post} imagesDirectoryName="blog">
	<slot />
</PostContentLayout>
