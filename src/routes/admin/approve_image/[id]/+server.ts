import type { localsType } from '$lib/types';
import prisma from '$lib/server/prisma';

export async function POST({locals, request, params} : {locals: localsType, request: Request, params: {id: string}} ){
	if(!locals.admin) return new Response(JSON.stringify({error: "not admin"}), {status: 403});

	// const data = await request.json();
	const { id } = params;
	if (!id) return new Response(JSON.stringify({error: "no id"}), {status: 400});

	const image = await prisma.image.update({
		where: {
			id,
		},
		data: {
			approved: true,
		}
	});

	return new Response(JSON.stringify({image}), {status: 200});
}