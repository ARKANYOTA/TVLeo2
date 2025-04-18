<script lang="ts">

	export let onUpdate: (bytes: string) => void;

	import { createCanvas } from 'canvas';
	import { pixelHeight, pixelWidth } from '$lib/consts';
	import { indexs } from '$lib/consts.js';
	import { closestColorIndex } from '$lib/colors/utils';

	async function upload(){
		console.log("upload");
		const fileInput = document.getElementById('fileInput') as HTMLInputElement;
		if (fileInput.files && fileInput.files.length > 0) {
			const file = fileInput.files[0];
			const blob = new Blob([file], { type: file.type });

			const canvas = document.getElementById('canvas') as HTMLCanvasElement;
			if (!canvas) {
				console.error("Canvas not found");
				return;
			}
			const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

				const img = new Image();
				img.src = URL.createObjectURL(blob);
				img.crossOrigin = "Anonymous"; // This is important for CORS
				img.onerror = function() {
					console.error("Error loading image");
				};
				console.log("upload", img);
				img.addEventListener('load', () => {
					console.log("Image loaded");
					// Resize the canvas to match the image size
					canvas.width = img.width;
					canvas.height = img.height;
					// Draw the image on the canvas
					ctx.drawImage(img, 0, 0, img.width, img.height);
					const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
					const data = imageData.data;
					let bytes = "";

					for (let i = 0; i < data.length; i += 4) {
						const r = data[i];
						const g = data[i + 1];
						const b = data[i + 2];
						const Colorindex = closestColorIndex([r, g, b]);

						bytes += indexs[Colorindex];
						onUpdate(bytes);
					}
				});



			// 	console.log("upload");
			// 	for (let i = 0; i < data.length; i += 4) {
			// 		const r = data[i];
			// 		const g = data[i + 1];
			// 		const b = data[i + 2];
			// 		const a = data[i + 3];
			// 		bytes += (r << 16) | (g << 8) | b;
			// 	}
			// 	console.log(bytes);

				console.log("upload2");

		}
	}

</script>

<form>
	<input type="file" accept="image/*" id="fileInput" />
	<button type="button" id="uploadButton" onclick={upload}>Upload</button>

	<canvas id="canvas" width={pixelWidth} height={pixelHeight}></canvas>
</form>

<style>
	#canvas {
		border: 1px solid black;
	}
	#uploadButton {
		margin-top: 10px;
	}
</style>