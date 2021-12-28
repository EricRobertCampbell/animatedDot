<script lang="ts">
	import { onMount } from "svelte";
	import { Dot } from "./Dot";

	export let height: number;
	export let width: number;

	let canvas;
	let dot;

	onMount(() => {
		if (!canvas) {
			return;
		}
		canvas.width = canvas.scrollWidth;
		canvas.height = canvas.scrollHeight;

		const ctx = canvas.getContext("2d");

		dot = new Dot(ctx, canvas.width, canvas.height);
	});
</script>

<button type="button" on:click={() => dot && dot.animate()}>Animate</button>
<canvas bind:this={canvas} {height} {width} />

<style>
	canvas {
		border: solid 1px black;
	}
</style>
