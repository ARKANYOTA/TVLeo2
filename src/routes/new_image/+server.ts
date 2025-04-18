import prisma from '$lib/server/prisma';

export async function POST({ request }){
	  const data = await request.json();
		if (!data) return new Response(JSON.stringify({message: "Pas de data"}), {status: 200})
		const {pixels, name, description } = data;
		let {nb_frames} = data;
		nb_frames = nb_frames ?? 1;

		if (!pixels || !name || !description) return new Response(JSON.stringify({message: "Pas les bon inputs"}), {status: 200})

		const out = await prisma.image.create({
			data: {
				name,
				description,
				bytes: pixels
			}
		})

	return new Response(JSON.stringify({message: "ok"}), {status: 200})
}