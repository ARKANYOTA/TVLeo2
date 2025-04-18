import type { localsType } from '$lib/types';
import prisma from '$lib/server/prisma';

export async function POST({locals, request}: {locals: localsType, request: Request}){
	if(!locals.admin) return new Response(JSON.stringify({error: "not admin"}), {status: 403});

	const data = await request.json();
	// On vera si on fait des matchs

	const liste = await prisma.image.findMany({
		select: {
			id: true,
			name: true,
			description: true,
			approved: true,
		}
	});

	return new Response(JSON.stringify({liste}), {status: 200});
}