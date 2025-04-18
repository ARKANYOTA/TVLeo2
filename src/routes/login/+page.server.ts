import { ADMIN_PASSWORD } from '$env/static/private';

import { fail, redirect } from '@sveltejs/kit';
import type { localsType } from '$lib/types';

export const load = async ({ locals }: {locals: localsType}) => {
	if (locals.admin) {
		return {
			isAdmin: true,
		};
	}
	return {
		isAdmin: false,
	};
}

/*
export const actions = {
	default: async ({ cookies, request }) => {
		console.log("login");
			const data = await request.formData();
			const password = data.get('password');
			if (!password) return fail(400, { message: "invalid" });

			if(password === ADMIN_PASSWORD){
				cookies.set("admin_password", password, {
					path: '/'
				})
				return redirect(302, '/admin');
				// return {success: true};
			}
			return fail(400, { message: "invalid" });

	},
};*/
/**
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


}
*/