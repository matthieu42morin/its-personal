<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import * as config from '$lib/config';
</script>

<AppBar>
	<!-- Left-side Header -->
	<svelte:fragment slot="lead">
		<a href="/">
			<div class="items-center align-middle flex gap-2">
				<img src="/images/Logo.png" alt="Logo" class="w-8 h-8" />

				<strong class="text-3xl uppercase">{config.title}</strong>
			</div>
		</a>
	</svelte:fragment>

	<!-- Right-side Header -->
	<svelte:fragment slot="trail">
		<!-- Links -->
		<a href="/blog">Blog</a>
		<a href="/projects">Projects</a>
		<a href="/about">About</a>
		<!-- Social -->
		<section class="hidden sm:inline-flex space-x-1">
			<a
				class="btn-icon hover:variant-soft-primary"
				href="https://github.com/matthieu42morin"
				target="_blank"
				rel="noreferrer"
			>
				<i class="fa-brands fa-github text-lg" />
			</a>
			<a
				class="btn-icon hover:variant-soft-primary"
				href="https://discord.gg/EXqV7W8MtY"
				target="_blank"
				rel="noreferrer"
			>
				<i class="fa-brands fa-linkedin text-lg" />
			</a>
		</section>
		<LightSwitch />
	</svelte:fragment>
</AppBar>
