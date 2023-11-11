<script>
	import Scene from './Scene.svelte';
	import { Canvas } from '@threlte/core';
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container h-full mx-auto flex-col justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h1 class="h1">I make the wheels turn.</h1>
		<!-- Animated Logo -->
		<figure>
			<section class="img-bg" />
			<img src="/images/profile-pic.png" class="w-8 h-8 md:h-[200px] md:w-[200px]" />
		</figure>
		<!-- / -->

		<div class="flex justify-center space-x-2">
			<a class="btn variant-filled" href="/blog" target="_blank" rel="noreferrer">
				Look at my blog
			</a>
		</div>
		<img
			src="/animations/infinity-loop-icon.svg"
			alt="Icon"
			class="w-16 md:w-32 lg:w-48 h-full rounded-full"
		/>
		<h2 class="h2">My github contributions</h2>
	</div>

	<div class="scene w-full">
		<Canvas>
			<Scene />
		</Canvas>
	</div>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite, glow 5s linear infinite;
	}
	.scene {
		@apply relative inset-1 w-[100%vw] h-[150px] md:h-[400px] lg:h-[600px];
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
