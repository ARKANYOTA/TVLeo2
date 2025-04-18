import { ADMIN_PASSWORD } from '$env/static/private';

import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies, request }) => {
			const data = await request.formData();
			const password = data.get('password');
			if (!password) return fail(400, { message: "invalid" });

			if(password === ADMIN_PASSWORD){
				cookies.set("admin_password", password, {
					path: '/'
				})
				return {success: true};
			}
			return fail(400, { message: "invalid" });

	},
};
/*
export async function POST({request, cookies}){
	const { password } = await request.json();

	if (!password) return new Response(JSON.stringify({error: "no password"}), { status: 400 });

	if(password === ADMIN_PASSWORD){
		cookies.set("admin_password", password, {
			path: '/'
		})
		return new Response(JSON.stringify({success: true}), { status: 200 });
	}
	return new Response(JSON.stringify({error: "wrong password"}), { status: 401 });


}*/
