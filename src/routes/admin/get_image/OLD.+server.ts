import type { localsType } from '$lib/types';
import prisma from '$lib/server/prisma';

export async function POST({locals, request}: {locals: localsType, request: Request}){
	if(!locals.admin) return new Response(JSON.stringify({error: "not admin"}), {status: 403});

	const data = await request.json();
	const {id} = data;
	if (!id) return new Response(JSON.stringify({error: "no id"}), {status: 400});

	const liste = await prisma.image.findMany({
		where: {
			id: id
		},
		select: {
			id: true,
			name: true,
			description: true,
			bytes: true,
		}
	});

	return new Response(JSON.stringify({liste}), {status: 200});
}