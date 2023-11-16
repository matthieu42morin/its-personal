<script lang="ts">
	import PostLayout from './PostLayout.svelte';

	import type { BlogPost } from '$lib/types/blog';

	export let post: BlogPost;
</script>

<PostLayout {...post} imagesDirectoryName="blog">
	<slot />
</PostLayout>
