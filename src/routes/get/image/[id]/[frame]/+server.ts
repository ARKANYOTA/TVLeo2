import prisma from '$lib/server/prisma';
import { create_image } from '$lib/image/create';

export async function GET({params}) {
	const { id, frame } = params;

	if (!id || !frame) return new Response(JSON.stringify({error: "no id or frame"}), {status: 400});

	const image = await prisma.image.findFirst({
		where: {
			approved: true,
			id: id,
		}
	});

	if (!image) return new Response(JSON.stringify({error: "no image"}), {status: 400});

	const { bytes } = image;
	const frameIndex = parseInt(frame);
	if (frameIndex < 0 || frameIndex >= bytes.length) return new Response(JSON.stringify({error: "no frame"}), {status: 400});
	const pngBuffer = create_image(bytes[frameIndex]);
	return new Response(pngBuffer, {
		status: 200,
		headers: {
			'Content-Type': 'image/png',
			'Content-Length': pngBuffer.length.toString(),
			'Cache-Control': 'no-store',
		},
	});

	/*
	if (!image) return new Response(JSON.stringify({error: "no image"}), {status: 400});

	const { id, name, description } = image;
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