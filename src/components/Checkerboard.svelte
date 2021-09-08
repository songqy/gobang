<script lang="ts">
	import { onMount } from 'svelte';

	export let title: string;

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas?.getContext('2d');
		console.log('ctx', ctx);
	});
</script>

<div>
	<div>{title}</div>
	<canvas id="board" width="800" height="800" bind:this={canvas} />
</div>
