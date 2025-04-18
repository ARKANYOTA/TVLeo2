import { colors, pixelHeight, pixelSize, pixelWidth, eraserColor, indexs } from "$lib/consts";
import {createCanvas } from "canvas";


export function create_image(bytes: string){
	// Console log the received data
	const canvas = createCanvas(pixelWidth, pixelHeight);
	// createCanvas(pixelWidth, pixelHeight);
	const ctx = canvas.getContext("2d");

	ctx.fillStyle = "white";
	ctx.fillRect(0,0, pixelWidth, pixelHeight);

	for (let i = 0; i < bytes.length; i++) {
		const c = bytes.charAt(i);
		const index = indexs.indexOf(c);
		ctx.fillStyle = colors[index];

		var y = Math.floor(i / pixelWidth);
		var x = i % pixelWidth;
		ctx.fillRect(x, y, 1,1);
	}
	return canvas.toBuffer("image/png");

	/*Array.from(bytes).forEach((elem, index) => {
		if(!chars.includes(elem)){
			return;
		}
		ctx.fillStyle = colordict[elem];
		var y = Math.floor(index / 55);
		var x = index % 55;
		ctx.fillRect(x, y, 1, 1);
	});
	var d = await JSON.parse(await Deno.readTextFile(filePath));
	const id = crypto.randomBytes(20).toString('hex');

	await Deno.writeFile(id+".png", canvas.toBuffer());
	d[id] = {"name": data.name, "imgname": data.imgname, "imgpath": id+".png", "approved": false, "locked": false}

	await Deno.writeTextFile(filePath, JSON.stringify(d))

	console.log("image saved");

	if (typeof data === "object" && data !== null) {
		res.status(200).json({
			message: "Image data received successfully",
			receivedData: data,
		});
	} else {
		return res.status(400).json({ message: "Invalid data format" });
	}
*/
}