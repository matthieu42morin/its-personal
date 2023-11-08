<!-- This page handles any error encountered by the site. -->
<script>
	import { page } from '$app/stores';
</script>

{#if $page.status === 404}
	<div class="flex flex-col items-center">
		<div
			class="relative mb-[3.33vh] flex h-96 w-96 items-center justify-center rounded-full bg-404"
		>
			<h1 class="h1 absolute text-h1 leading-[5rem]">404</h1>
		</div>
		<h2 class="h4 mb-x-small">You just hit a route that doesn't exist</h2>
	</div>
{:else}
	<h2>{$page.status}</h2>

	{#if $page.error}
		<p class="subhead">{$page.error.message}</p>
	{/if}

	<p><strong>Sorry!</strong> Maybe try one of these links?</p>
	<ul>
		<li><a href="/">Home</a></li>
	</ul>
{/if}
