<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { quadInOut } from 'svelte/easing';
	import { T } from '@threlte/core';
	import { Align, Grid, OrbitControls } from '@threlte/extras';
	import type { Contributions } from '$lib/types/contributions';

	let contributions: Contributions[] = [];

	onMount(async () => {
		const response = await fetch('/api/matthieu42morin/2023');
		contributions = await response.json();
		console.log(contributions);
	});

	const colorMap = ['#0e0e0e', '#00442a', '#006d35', '#00a648', '#00d35c'];

	// function to normalize the height of the cubes
	function normalize(count: number, base = 4, offset = 6) {
		switch (true) {
			case count === 0:
				return base;
			case count > 40:
				return count;
			default:
				return count * (base * offset);
		}
	}

	// tweened value to animate the Z scale of the cubes
	const scaleZ = tweened(0, { duration: 2000, easing: quadInOut });

	onMount(() => {
		$scaleZ = 1;
	});
</script>

<T.PerspectiveCamera makeDefault position={[10, 100, 600]} fov={50}>
	<OrbitControls enableDamping autoRotate />
</T.PerspectiveCamera>

<T.AmbientLight color="#fff" intensity={0.4} />
<T.DirectionalLight position={[0, 200, 200]} intensity={2} color="#fff" />
<T.DirectionalLight position={[0, 200, -200]} intensity={2} color="#fff" />

<Align auto>
	<Grid infiniteGrid sectionColor="#4a4b4a" sectionSize={40} cellSize={40} fadeDistance={800} />
	{#if Array.isArray(contributions) && contributions.length > 0}
		{#each contributions as row, i}
			{#each row as contribution, j}
				{#if contribution !== null}
					{@const z = normalize(contribution.level)}
					<T.Group position={[0, 0, 12 * i]} scale.z={$scaleZ}>
						<T.Mesh position={[12 * j, z / 2, 0]}>
							<T.BoxGeometry args={[10, z, 10]} />
							<T.MeshStandardMaterial color={colorMap[contribution.level]} />
						</T.Mesh>
					</T.Group>
				{/if}
			{/each}
		{/each}
	{/if}
</Align>
