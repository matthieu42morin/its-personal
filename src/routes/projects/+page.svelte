<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="projects-layout">
	{data.projects}
</div>

<style lang="postcss">
</style>
