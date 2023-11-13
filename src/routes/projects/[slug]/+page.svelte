<script lang="ts">
	import ProjectsContentLayout from '$lib/components/projects/projects-content-layout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ProjectsContentLayout projects={data.projects} {...data.post}>
	<svelte:component this={data.Component} />
</ProjectsContentLayout>
