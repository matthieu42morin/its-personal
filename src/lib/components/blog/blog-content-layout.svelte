<script lang="ts">

	import PostContentLayout from './post-content-layout.svelte';

	import type { BlogPost } from '$lib/types/blog';


	export let post: BlogPost;
</script>

<PostContentLayout
	{...post}
	imagesDirectoryName="blog"
	baseUrl="https://www.mattmor.in/blog/"
>
	<slot />
</PostContentLayout>

