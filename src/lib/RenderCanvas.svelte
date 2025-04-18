<script lang="ts">
	import { onMount } from 'svelte';
	import { colors, pixelHeight, pixelSize, pixelWidth, eraserColor, indexs } from "$lib/consts";
	let bytes: string = "0".repeat(pixelWidth * pixelHeight);

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	export function change_bytes (newBytes: string) {
		bytes = newBytes;
		load_pixels();
	}

	function load_pixels(){
		// Remplir le tableau de pixels avec des valeurs aléatoires
		for (let i = 0; i < pixelHeight; i++) {
			for (let j = 0; j < pixelWidth; j++) {
				// pixels[i][j] = Math.floor(Math.random() * 2);

				const currentByte = bytes.charAt(i * pixelWidth + j) || "0";
				const current_pixels = indexs.findIndex((b) => b === currentByte);

				ctx.fillStyle = colors[current_pixels];
				ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
			}
		}
	}

	onMount(() => {
		canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
		ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

		load_pixels();
	});

</script>

<canvas id="main-canvas" width={pixelWidth * pixelSize} height={pixelHeight * pixelSize}>
</canvas>
<button id="load_pixels" on:click={load_pixels}>Load Pixels</button>
<style>
	canvas {
		border: 1px solid black;
	}
</style>