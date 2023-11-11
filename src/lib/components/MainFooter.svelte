<script lang="ts">
	import SocialsCloud from './SocialsCloud.svelte';
	// Social Icons
	const socialLinks = [
		{ title: 'GitHub', href: 'https://github.com/skeletonlabs/skeleton', icon: 'fa-github' },
		{ title: 'Discord', href: 'https://discord.gg/EXqV7W8MtY', icon: 'fa-discord' },
		{ title: 'X (Twitter)', href: 'https://x.com/SkeletonUI', icon: 'fa-x-twitter' },
		{ title: 'YouTube', href: 'https://www.youtube.com/@skeletonlabs', icon: 'fa-youtube' }
	];
</script>

<footer
	class="page-footer bg-surface-50 dark:bg-surface-900 border-t border-surface-500/10 text-xs mt-4 md:text-base"
>
	<div
		class="w-full max-w-7xl mx-auto p-4 py-8 md:py-12 space-y-10 flex items-center justify-center"
	>
		<!-- <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col"> -->
		<a class="flex items-center md:justify-start justify-center" href="/">
			<img class="w-4 h-4 md:w-8 md:h-8" src="\images\Logo.png" />
			<p class="sm:pl-4 text-base sm:py-2 sm:mt-0 mt-4">© 2023 Matthieu Morin</p>
		</a>
	</div>
	<hr class="opacity-20" />
	<SocialsCloud />
</footer>
