<script lang="ts">
	//Current Dark/Light Mode
	import { modeCurrent } from '@skeletonlabs/skeleton';
	console.log(modeCurrent);
	let iconGitHub: string;

	$: {
		iconGitHub = $modeCurrent ? '/logos/GitHub_Logo.png' : '/logos/GitHub_Logo_White.png';
	}
</script>

<div class="flex sm:flex-row flex-col LogoCloud grid-cols-1 lg:!grid-cols-2 gap-1 max-h-[128px]">
	<a
		class="logo-item"
		href="https://www.linkedin.com/in/matthieu-morin-7524731a9/"
		target="_blank"
		rel="noreferrer"
	>
		<img class="max-h-[64px]" src="/logos/LI-Logo.png" alt="Matt's LinkedIn Acount" />
	</a>
	<a class="logo-item" href="https://github.com/matthieu42morin" target="_blank" rel="noreferrer">
		<img class="max-h-[64px]" src={iconGitHub} alt="Github account" />
	</a>
</div>

<style>
	.LogoCloud {
		display: grid;

		border-radius: var(--theme-rounded-container);
	}
</style>
