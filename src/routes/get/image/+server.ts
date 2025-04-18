import prisma from '$lib/server/prisma';
import { create_image, create_images } from '$lib/image/create';

export async function GET(){
	const nb_images = await prisma.image.count({
		where: {
			approved: true,
		}
	});

	const random = Math.floor(Math.random() * nb_images);

	const image = await prisma.image.findFirst({
		where: {
			approved: true,
		},
		skip: random,
	});

	if (!image) return new Response(JSON.stringify({error: "no image"}), {status: 400});

	const { bytes } = image;


	const pngBuffer = create_images(bytes);

	return new Response(pngBuffer, {
		status: 200,
		headers: {
			'Content-Type': 'image/png',
			'Content-Length': pngBuffer.length.toString(),
			'Cache-Control': 'no-store',
		},
	})

	/*
	const bytes = image.bytes;
	const out = {
		id,
		name,
		description,
		bytes,
	};
	const pngBuffer = create_image(bytes[0]);

	return new Response(pngBuffer, {
		status: 200,
		headers: {
			'Content-Type': 'image/png',
			'Content-Length': pngBuffer.length.toString(),
			'Cache-Control': 'no-store',
		},
	})
	// return new Response(JSON.stringify({img: create_image(bytes)}), {status: 200});*/
}