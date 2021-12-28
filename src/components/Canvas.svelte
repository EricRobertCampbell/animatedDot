<script lang="ts">
	import { onMount } from "svelte";
	import { Dot, MousePointerAnimation } from "./classes";

	// types
	import type { CanvasObject } from "./types";

	export let height: number;
	export let width: number;

	let canvas;
	let ctx;
	let stuffToDraw: Array<CanvasObject> = [];

	let animate;
	let okToAnimate: boolean = false;

	onMount(() => {
		if (!canvas) {
			return;
		}
		canvas.width = canvas.scrollWidth;
		canvas.height = canvas.scrollHeight;

		ctx = canvas.getContext("2d");

		animate = function (timestamp: number): void {
			if (!ctx) {
				console.log("Unable to find context");
				return;
			}

			ctx.clearRect(0, 0, width, height);
			console.log("in animate", stuffToDraw);
			stuffToDraw.forEach((thingToDraw) => thingToDraw.draw(timestamp));
			requestAnimationFrame(animate);
			update();
		};

		stuffToDraw.push(new Dot(ctx, canvas.width, canvas.height));
	});

	function handleCanvasClick(e): void {
		const target = e.target;

		const offsetLeft = target.offsetLeft;
		const offsetTop = target.offsetTop;

		const x = e.clientX - offsetLeft;
		const y = e.clientY - offsetTop;

		stuffToDraw.push(new MousePointerAnimation(ctx, width, height, x, y));
	}

	function update() {
		stuffToDraw = stuffToDraw.filter((obj) => !obj.okToRemove);
	}
</script>

<button
	type="button"
	on:click={() => {
		okToAnimate = !okToAnimate;
		if (okToAnimate) {
			animate();
		}
	}}>Toggle Animation</button
>
<canvas bind:this={canvas} {height} {width} on:click={handleCanvasClick} />

<style>
	canvas {
		border: solid 1px black;
	}
</style>
