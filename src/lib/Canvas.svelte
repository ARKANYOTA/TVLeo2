<script lang="ts">
	import { onMount } from 'svelte';
	import { colors, pixelHeight, pixelSize, pixelWidth, eraserColor, indexs } from "$lib/consts";

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let selectedColor = 1;

	let brushSize = 1;

	let currentFrame = 0;
	let frames = 1;

	// Crée un tableau de pixels
	const pixels: number[][][] = [[]];
	for (let i = 0; i < pixelHeight; i++) {
		pixels[currentFrame][i] = [];
		for (let j = 0; j < pixelWidth; j++) {
			pixels[currentFrame][i][j] = 0;
		}
	}

	function new_frame() {
		// Crée un tableau de pixels
		pixels[frames] = [];
		for (let i = 0; i < pixelHeight; i++) {
			pixels[frames][i] = [];
			for (let j = 0; j < pixelWidth; j++) {
				pixels[frames][i][j] = 0;
			}
		}
		frames++;
		currentFrame = frames - 1;
		load_pixels();
	}

	function copy_frame() {
		// Crée un tableau de pixels
		pixels[frames] = [];
		for (let i = 0; i < pixelHeight; i++) {
			pixels[frames][i] = [];
			for (let j = 0; j < pixelWidth; j++) {
				pixels[frames][i][j] = pixels[currentFrame][i][j];
			}
		}
		frames++;
		currentFrame = frames - 1;
		load_pixels();
	}

	function drawListener(e: MouseEvent) {
		const leftButton = e.type === "mousemove" ? e.buttons === 1 : e.button === 0;
		const rightButton = e.type === "mousemove" ? e.buttons === 2 : e.button === 2;
		if(!leftButton && !rightButton) return; // Only draw when mouse is pressed
		const x = Math.floor(e.offsetX / pixelSize);
		const y = Math.floor(e.offsetY / pixelSize);
		if(leftButton) {
			// Click gauche
			ctx.fillStyle = colors[selectedColor];
		} else if (rightButton) {
			// Click droit
			ctx.fillStyle = colors[eraserColor];
		}
		if(brushSize === 1){
			if (x < 0 || x >= pixelWidth || y < 0 || y >= pixelHeight) return;
			ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
			if(leftButton) {

				pixels[currentFrame][y][x] = selectedColor;
			} else if (rightButton) {
				pixels[currentFrame][y][x] = 0;
			}
		} else {
			for (let i = -Math.floor(brushSize / 2); i <= Math.floor(brushSize / 2); i++) {
				for (let j = -Math.floor(brushSize / 2); j <= Math.floor(brushSize / 2); j++) {
					if(x + i < 0 || x + i >= pixelWidth || y + j < 0 || y + j >= pixelHeight) continue;
					ctx.fillRect((x + i) * pixelSize, (y + j) * pixelSize, pixelSize, pixelSize);
					if(leftButton) {
						pixels[currentFrame][y+j][x+i] = selectedColor;
					} else if (rightButton) {
						pixels[currentFrame][y+j][x+i] = 0;
					}
				}
			}
		}
		return;
	};

	function load_pixels(){
		// Remplir le tableau de pixels avec des valeurs aléatoires
		for (let i = 0; i < pixelHeight; i++) {
			for (let j = 0; j < pixelWidth; j++) {
				// pixels[i][j] = Math.floor(Math.random() * 2);
				ctx.fillStyle = colors[pixels[currentFrame][i][j]];
				ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
			}
		}
	}

	onMount(() => {
		canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
		ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

		canvas.addEventListener('mousemove', drawListener);
		canvas.addEventListener('mousedown', drawListener);

		// Desactiver le click gauche (du navigateur)
		canvas.addEventListener("contextmenu", (e) => {
			e.preventDefault();
		});

		document.getElementById('myRange')?.addEventListener('input', (e) => {
			brushSize = parseInt((e.target as HTMLInputElement).value);
			ctx.lineWidth = brushSize;
		});


	});

	function upload_image() {
		let pixels_str = pixels.map(frame => frame.map(row => row.map(pixel => indexs[pixel]).join("")).join(""));
		fetch("/new_image", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: (document.getElementById("name") as HTMLInputElement).value,
				description: (document.getElementById("imgname") as HTMLInputElement).value,
				pixels: pixels_str
			})
		}).then(response => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		}).then(data => {
			console.log(data);
		}).catch(error => {
			console.error("There was a problem with the fetch operation:", error);
		});
		alert("Image uploaded");
	}
</script>

<canvas id="main-canvas" width={pixelWidth * pixelSize} height={pixelHeight * pixelSize}>
</canvas>
<input type="range" min="1" max="10" value="1" class="slider" id="myRange">
<button id="load_pixels" on:click={load_pixels}>Load Pixels</button>
<div>
	{#each colors as color, index}
		<button on:click={() => selectedColor = index} style="background-color: {color}; width: 20px; height: 20px;">C</button>
	{/each}
</div>
<form on:submit|preventDefault={upload_image}>
		<input type="text" id="name" name="name" placeholder="Your name: (For credits)"/>
		<input type="text" id="imgname" name="name" placeholder="Image Name: (For the database)"/>
	<button type="submit">upload</button>
</form>
	<label for="brushSize">Brush Size:</label>
	<input type="number" id="brushSize" bind:value={brushSize} min="1" max="10">

<br />
{#each { length: frames } as _, i}
	<button on:click={() => {
		currentFrame = i;
		load_pixels();
	}}
					class={currentFrame === i ? "selected" : ""}
	>Frame {i}</button>
{/each}

	<button on:click={new_frame}>New Frame</button>
  <button on:click={copy_frame}>copy current frame</button>
<style>
	canvas {
		border: 1px solid black;
	}

	.selected {
		background-color: #ccc;
	}
</style>